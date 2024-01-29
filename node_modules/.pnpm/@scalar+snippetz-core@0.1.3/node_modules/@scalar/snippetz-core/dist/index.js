function c(o) {
  return o.reduce((n, r) => (n[r.name] = r.value, n), {});
}
function y(o) {
  return /\s|-/.test(o);
}
function a(o, n = 0) {
  let r = [], l = " ".repeat(n), s = " ".repeat(n + 2);
  for (const [f, e] of Object.entries(o)) {
    let $ = y(f) ? `'${f}'` : f;
    if (Array.isArray(e)) {
      const u = e.map((t) => typeof t == "string" ? `'${t}'` : t && typeof t == "object" ? a(t, n + 2) : t).join(`, ${s}`);
      r.push(`${s}${$}: [${u}]`);
    } else if (e && typeof e == "object")
      r.push(
        `${s}${$}: ${a(
          e,
          n + 2
        )}`
      );
    else if (typeof e == "string") {
      let u = `${e}`;
      if (e.startsWith("JSON.stringify")) {
        const t = e.split(`
`);
        t.length > 1 && (u = t.map((i, p) => p === 0 ? i : `${s}${i}`).join(`
`));
      } else
        u = `'${e}'`;
      r.push(`${s}${$}: ${u}`);
    } else
      r.push(`${s}${$}: ${e}`);
  }
  return `{
${r.join(`,
`)}
${l}}`;
}
export {
  c as arrayToObject,
  y as isKeyNeedsQuotes,
  a as objectToString
};
