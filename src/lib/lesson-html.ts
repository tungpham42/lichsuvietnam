export type TocItem = { id: string; text: string };

// Nội dung bài học là HTML có sẵn trong dữ liệu. Bỏ tiêu đề h4 đầu tiên
// (trùng với tiêu đề trang) và gắn id cho các mục h5 để làm mục lục.
export function prepareLesson(html: string): { body: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let n = 0;
  const body = html
    .replace(/^\s*<h4>[\s\S]*?<\/h4>/, "")
    .replace(/<h5>([\s\S]*?)<\/h5>/g, (_m, inner: string) => {
      n += 1;
      const id = `muc-${n}`;
      toc.push({ id, text: inner.replace(/<[^>]+>/g, "").trim() });
      return `<h5 id="${id}">${inner}</h5>`;
    });
  return { body, toc };
}
