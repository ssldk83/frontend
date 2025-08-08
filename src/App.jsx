import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bolt, Thermometer, Factory, BatteryCharging, Flame, Waves,
  CircleDollarSign, Gauge, Settings2, Plus, Play, Download, Save, Search,
  LineChart as LineChartIcon, Beaker,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import {
  ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar,
} from "recharts";

const componentsLib = [
  { key: "hp", name: "Heat Pump", icon: <Thermometer className="w-4 h-4" />, tag: "thermal" },
  { key: "hx", name: "Heat Exchanger", icon: <Waves className="w-4 h-4" />, tag: "thermal" },
  { key: "elx", name: "Electrolyser (PEM)", icon: <Beaker className="w-4 h-4" />, tag: "hydrogen" },
  { key: "grid", name: "Power Grid", icon: <Bolt className="w-4 h-4" />, tag: "electrical" },
  { key: "tank", name: "Tank", icon: <BatteryCharging className="w-4 h-4" />, tag: "storage" },
  { key: "pipe", name: "Pipe", icon: <Waves className="w-4 h-4" />, tag: "hydraulic" },
  { key: "hx2", name: "Condenser", icon: <Flame className="w-4 h-4" />, tag: "thermal" },
];

function KPI({ label, value, icon }:{label:string; value:string; icon:React.ReactNode}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gray-100">{icon}</div>
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function LibraryItem({ name, icon, tag }:{name:string; icon:React.ReactNode; tag:string}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="flex items-center justify-between p-3 rounded-xl border bg-white hover:shadow-sm cursor-grab">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{name}</span>
      </div>
      <Badge variant="secondary" className="capitalize">{tag}</Badge>
    </motion.div>
  );
}

const apiBase = import.meta.env.VITE_API_URL as string;

export default function EnergyApp() {
  const [capex, setCapex] = useState(900000);
  const [powerPrice, setPowerPrice] = useState(65);
  const [cop, setCop] = useState(3.25);
  const [heatDuty, setHeatDuty] = useState(10);
  const [utilization, setUtilization] = useState(85);
  const [kpis, setKpis] = useState<{cop:number; lcoa:number; npv:number}|null>(null);
  const [cashflow, setCashflow] = useState<{year:number; cash:number}[]>([]);
  const [tornado, setTornado] = useState<{name:string; value:number}[]>([]);
  const quick = useMemo(()=>({ lcoa: kpis?.lcoa ?? 36, npv: kpis?.npv ?? 1.2 }), [kpis]);

  async function runModel() {
    const res = await fetch(`${apiBase}/api/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        capex, powerPrice, cop, heatDuty, utilization: utilization/100
      }),
    });
    const data = await res.json();
    setKpis(data.kpis);
    setCashflow(data.charts.cashflow);
    setTornado(data.charts.tornado);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div initial={{ rotate: -8, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 180 }} className="p-2 rounded-xl bg-gray-100">
              <Factory className="w-5 h-5" />
            </motion.div>
            <div className="font-bold text-lg tracking-tight">G4iE Energy Lab</div>
            <Badge className="ml-2" variant="secondary">v1 Demo</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary"><Plus className="w-4 h-4 mr-2"/>New Project</Button>
            <Button variant="outline"><Save className="w-4 h-4 mr-2"/>Save</Button>
            <Button onClick={runModel}><Play className="w-4 h-4 mr-2"/>Run</Button>
          </div>
        </div>
      </div>

      {/* Hero / KPIs */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Your super energy feasibility studio</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-gray-600">
            Sketch systems, simulate physics, and get instant LCOX. Drag components, connect ports, and press <strong>Run</strong>.
          </CardContent>
        </Card>
        <KPI label="COP" value={kpis ? String(kpis.cop) : "3.25"} icon={<Gauge className="w-4 h-4" />} />
        <KPI label="LCOA" value={kpis ? `€${kpis.lcoa}/MWh` : "€36/MWh"} icon={<CircleDollarSign className="w-4 h-4" />} />
        <KPI label="NPV" value={kpis ? `€${kpis.npv}M` : "+€1.2M"} icon={<LineChartIcon className="w-4 h-4" />} />
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Library */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><Settings2 className="w-4 h-4"/> Component Library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Input placeholder="Search components…" className="text-sm" />
                <Button variant="secondary" size="icon"><Search className="w-4 h-4"/></Button>
              </div>
              <div className="grid gap-2">
                {componentsLib.map((c) => <LibraryItem key={c.key} {...c} />)}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-base">Presets</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["Industrial HP","PEM Electrolyser","DH Substation","Biogas Upgrade"].map((p) =>
                <Badge key={p} variant="outline" className="cursor-pointer">{p}</Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-6">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Bolt className="w-4 h-4"/> System Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[460px] rounded-xl border border-dashed bg-white grid place-items-center">
                <div className="text-center text-gray-500">
                  <div className="font-medium">Drag components here</div>
                  <div className="text-xs">Connect typed ports to form an acausal network</div>
                </div>
                <motion.div drag dragConstraints={{ left: -200, right: 200, top: -150, bottom: 150 }} className="absolute top-24 left-16 p-3 rounded-xl border bg-card shadow-sm">
                  <div className="text-xs mb-1 text-gray-500">Source</div>
                  <div className="flex items-center gap-2"><Bolt className="w-4 h-4"/><span className="text-sm font-medium">Grid</span></div>
                </motion.div>
                <motion.div drag dragConstraints={{ left: -200, right: 200, top: -150, bottom: 150 }} className="absolute top-40 left-56 p-3 rounded-xl border bg-card shadow-sm">
                  <div className="text-xs mb-1 text-gray-500">Converter</div>
                  <div className="flex items-center gap-2"><Thermometer className="w-4 h-4"/><span className="text-sm font-medium">Heat Pump</span></div>
                </motion.div>
                <motion.div drag dragConstraints={{ left: -200, right: 200, top: -150, bottom: 150 }} className="absolute top-40 right-24 p-3 rounded-xl border bg-card shadow-sm">
                  <div className="text-xs mb-1 text-gray-500">Sink</div>
                  <div className="flex items-center gap-2"><Factory className="w-4 h-4"/><span className="text-sm font-medium">DH Loop</span></div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspector */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Settings2 className="w-4 h-4"/> Inspector</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs">Selected component</Label>
                <Select defaultValue="hp">
                  <SelectTrigger className="w-full"><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hp">Heat Pump</SelectItem>
                    <SelectItem value="elx">Electrolyser (PEM)</SelectItem>
                    <SelectItem value="hx">Heat Exchanger</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="design">
                <TabsList className="grid grid-cols-3 gap-1">
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="ops">Ops</TabsTrigger>
                  <TabsTrigger value="cost">Cost</TabsTrigger>
                </TabsList>

                <TabsContent value="design" className="space-y-4 pt-3">
                  <div>
                    <Label className="text-xs">Heat duty (MW)</Label>
                    <Input defaultValue={heatDuty} onChange={(e)=>setHeatDuty(Number(e.target.value))} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">COP</Label>
                    <Slider defaultValue={[cop]} min={1.5} max={5} step={0.05} className="mt-3" onChange={setCop} />
                  </div>
                  <div>
                    <Label className="text-xs">Supply / Return (°C)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Input defaultValue={70} />
                      <Input defaultValue={40} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ops" className="space-y-4 pt-3">
                  <div>
                    <Label className="text-xs">Utilization (%)</Label>
                    <Slider defaultValue={[utilization]} min={10} max={100} step={1} className="mt-3" onChange={setUtilization} />
                  </div>
                  <div>
                    <Label className="text-xs">Power price (€/MWh)</Label>
                    <Input defaultValue={powerPrice} onChange={(e)=>setPowerPrice(Number(e.target.value))} className="mt-1" />
                  </div>
                </TabsContent>

                <TabsContent value="cost" className="space-y-4 pt-3">
                  <div>
                    <Label className="text-xs">CAPEX (€)</Label>
                    <Input defaultValue={capex} onChange={(e)=>setCapex(Number(e.target.value))} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">O&M (% of CAPEX/yr)</Label>
                    <Slider defaultValue={[3]} min={0} max={10} step={0.5} className="mt-3" />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={runModel}><Play className="w-4 h-4 mr-2"/>Run</Button>
                <Button variant="outline" className="flex-1"><Download className="w-4 h-4 mr-2"/>Export</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><LineChartIcon className="w-4 h-4"/> KPIs</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl border bg-card">
                <div className="text-xs text-gray-500">LCOA</div>
                <div className="text-lg font-semibold">€{quick.lcoa}/MWh</div>
              </div>
              <div className="p-3 rounded-xl border bg-card">
                <div className="text-xs text-gray-500">NPV (10y)</div>
                <div className="text-lg font-semibold">€{quick.npv}M</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="max-w-7xl mx-auto px-4 pb-14 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Cashflow (10 years)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashflow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cash" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Sensitivity (Tornado)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tornado} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip />
                <Bar dataKey="value" barSize={18} radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} G4iE • Super energy feasibility studio</div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:underline">Docs</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
