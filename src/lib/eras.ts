export type Era = {
  id: string;
  name: string;
  color: string;
  from: number;
  to: number;
};

// Nhóm 24 bài học thành các giai đoạn lớn (theo id bài).
export const eras: Era[] = [
  { id: "dung-nuoc", name: "Thuở dựng nước", color: "#C99A1E", from: 1, to: 2 },
  { id: "bac-thuoc", name: "Bắc thuộc và giành tự chủ", color: "#5E6B8E", from: 3, to: 6 },
  { id: "doc-lap", name: "Các triều đại độc lập đầu tiên", color: "#B2371F", from: 7, to: 11 },
  { id: "ho-tay-son", name: "Từ nhà Hồ đến Tây Sơn", color: "#2F6B4C", from: 12, to: 17 },
  { id: "nguyen-phap", name: "Nhà Nguyễn và thời Pháp thuộc", color: "#8A5A2B", from: 18, to: 19 },
  { id: "hien-dai", name: "Từ Cách mạng đến hiện đại", color: "#2F4A8A", from: 20, to: 24 },
];

export function eraOf(lessonId: number): Era {
  return eras.find((e) => lessonId >= e.from && lessonId <= e.to) ?? eras[0];
}
