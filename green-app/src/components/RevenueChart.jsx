// ================================================
// LETAK FILE: src/components/RevenueChart.jsx
// ================================================

function LineChart() {
    const data = [2, 5, 8, 6, 12, 10, 14, 11, 16, 13, 18, 20];
    const labels = ["1 Mei","6 Mei","11 Mei","16 Mei","21 Mei","26 Mei","31 Mei"];
    const w = 600, h = 160, padL = 40, padB = 30, padR = 20, padT = 10;
    const chartW = w - padL - padR;
    const chartH = h - padB - padT;
    const maxVal = 22;

    const toX = (i) => padL + (i / (data.length - 1)) * chartW;
    const toY = (v) => padT + chartH - (v / maxVal) * chartH;

    const pathD = data.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
    const areaD = `${pathD} L ${toX(data.length - 1)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`;

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[0, 5, 10, 15, 20].map(v => (
                <g key={v}>
                    <line x1={padL} x2={w - padR} y1={toY(v)} y2={toY(v)} stroke="#f1f5f9" strokeWidth="1" />
                    <text x={padL - 5} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{v}jt</text>
                </g>
            ))}
            {labels.map((l, i) => (
                <text key={l} x={padL + (i / (labels.length - 1)) * chartW} y={h - 5} textAnchor="middle" fontSize="9" fill="#94a3b8">{l}</text>
            ))}
            <path d={areaD} fill="url(#areaGrad)" />
            <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="5" fill="#2563eb" />
        </svg>
    );
}

export default function RevenueChart() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-gray-800 text-base">Grafik Pendapatan</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">Rp 18.450.000</p>
                    <p className="text-success text-xs font-medium mt-0.5">↑ 12.5% dari bulan lalu</p>
                </div>
                <select className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 outline-none text-gray-600">
                    <option>Bulan Ini</option>
                    <option>Bulan Lalu</option>
                    <option>3 Bulan</option>
                </select>
            </div>
            <LineChart />
        </div>
    );
}