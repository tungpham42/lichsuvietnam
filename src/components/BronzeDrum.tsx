// Mặt trống đồng Đông Sơn vẽ bằng SVG. `lit` là số vòng còn sáng (tối đa 6),
// các vòng tắt dần từ ngoài vào trong. Dùng làm hình chính ở trang chủ
// và làm thước đo lượt chơi ở trang câu đố.

export const DRUM_RINGS = 6;

const C = 200;

function pt(r: number, deg: number): [string, string] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [(C + r * Math.cos(a)).toFixed(2), (C + r * Math.sin(a)).toFixed(2)];
}

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

function Sun() {
  return (
    <>
      {range(14).map((i) => {
        const a = (360 / 14) * i;
        const [x1, y1] = pt(33, a - 7);
        const [x2, y2] = pt(56, a);
        const [x3, y3] = pt(33, a + 7);
        return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="currentColor" />;
      })}
      <circle cx={C} cy={C} r={27} fill="var(--color-hoe)" stroke="currentColor" strokeWidth={2.5} />
    </>
  );
}

function Feathers() {
  return (
    <>
      <circle cx={C} cy={C} r={64} fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx={C} cy={C} r={84} fill="none" stroke="currentColor" strokeWidth={2} />
      {range(28).map((i) => {
        const a = (360 / 28) * i;
        const [x1, y1] = pt(69, a);
        const [x2, y2] = pt(79, a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={2} />;
      })}
    </>
  );
}

function Dots() {
  return (
    <>
      <circle cx={C} cy={C} r={94} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <circle cx={C} cy={C} r={112} fill="none" stroke="currentColor" strokeWidth={1.5} />
      {range(36).map((i) => {
        const [x, y] = pt(103, i * 10);
        return <circle key={i} cx={x} cy={y} r={2.3} fill="currentColor" />;
      })}
    </>
  );
}

function Birds() {
  return (
    <>
      <circle cx={C} cy={C} r={122} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <circle cx={C} cy={C} r={154} fill="none" stroke="currentColor" strokeWidth={1.5} />
      {range(10).map((i) => {
        const a = i * 36;
        const [x, y] = pt(138, a);
        const rad = (a * Math.PI) / 180;
        const hx = (Number(x) + 18 * Math.cos(rad)).toFixed(2);
        const hy = (Number(y) + 18 * Math.sin(rad)).toFixed(2);
        return (
          <g key={i}>
            <ellipse
              cx={x}
              cy={y}
              rx={15}
              ry={4.5}
              transform={`rotate(${a} ${x} ${y})`}
              fill="none"
              stroke="var(--color-son)"
              strokeWidth={2.5}
            />
            <circle cx={hx} cy={hy} r={3} fill="var(--color-son)" />
          </g>
        );
      })}
    </>
  );
}

function Teeth() {
  return (
    <>
      {range(36).map((i) => {
        const a = i * 10;
        const [x1, y1] = pt(160, a - 4.5);
        const [x2, y2] = pt(177, a);
        const [x3, y3] = pt(160, a + 4.5);
        return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="currentColor" />;
      })}
    </>
  );
}

function Rim() {
  return (
    <>
      <circle cx={C} cy={C} r={185} fill="none" stroke="currentColor" strokeWidth={2.5} />
      <circle cx={C} cy={C} r={195} fill="none" stroke="currentColor" strokeWidth={2.5} />
      {range(72).map((i) => {
        const [x1, y1] = pt(187.5, i * 5);
        const [x2, y2] = pt(192.5, i * 5);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={1} />;
      })}
    </>
  );
}

const rings = [Sun, Feathers, Dots, Birds, Teeth, Rim];

type Props = {
  lit?: number;
  animate?: boolean;
  className?: string;
  label?: string;
};

export default function BronzeDrum({ lit = DRUM_RINGS, animate = false, className, label }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`text-cham ${className ?? ""}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rings.map((Ring, i) => (
        <g
          key={i}
          className={animate ? "drum-ring" : undefined}
          style={{
            opacity: i < lit ? 1 : 0.12,
            transition: "opacity 400ms ease",
            ...(animate ? { animationDelay: `${i * 130}ms` } : null),
          }}
        >
          <Ring />
        </g>
      ))}
    </svg>
  );
}
