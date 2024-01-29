function d(a) {
  return a.reduce((t, e) => (t[e.name] = e.value, t), {});
}
function l(a) {
  return /\s|-/.test(a);
}
function h(a, t = 0) {
  let e = [], $ = " ".repeat(t), n = " ".repeat(t + 2);
  for (const [f, o] of Object.entries(a)) {
    let i = l(f) ? `'${f}'` : f;
    if (Array.isArray(o)) {
      const s = o.map((r) => typeof r == "string" ? `'${r}'` : r && typeof r == "object" ? h(r, t + 2) : r).join(`, ${n}`);
      e.push(`${n}${i}: [${s}]`);
    } else if (o && typeof o == "object")
      e.push(
        `${n}${i}: ${h(
          o,
          t + 2
        )}`
      );
    else if (typeof o == "string") {
      let s = `${o}`;
      if (o.startsWith("JSON.stringify")) {
        const r = o.split(`
`);
        r.length > 1 && (s = r.map((u, c) => c === 0 ? u : `${n}${u}`).join(`
`));
      } else
        s = `'${o}'`;
      e.push(`${n}${i}: ${s}`);
    } else
      e.push(`${n}${i}: ${o}`);
  }
  return `{
${e.join(`,
`)}
${$}}`;
}
function p(a) {
  var i, s;
  const t = {
    method: "GET",
    ...a
  };
  t.method = t.method.toUpperCase();
  const e = {
    method: t.method === "GET" ? void 0 : t.method
  }, $ = new URLSearchParams(
    t.queryString ? d(t.queryString) : void 0
  ), n = $.size ? `?${$.toString()}` : "";
  (i = t.headers) != null && i.length && (e.headers = {}, t.headers.forEach((r) => {
    e.headers[r.name] = r.value;
  })), (s = t.cookies) != null && s.length && (e.headers = e.headers || {}, t.cookies.forEach((r) => {
    e.headers["Set-Cookie"] = e.headers["Set-Cookie"] ? `${e.headers["Set-Cookie"]}; ${r.name}=${r.value}` : `${r.name}=${r.value}`;
  })), Object.keys(e).forEach((r) => {
    e[r] === void 0 && delete e[r];
  }), t.postData && (e.body = t.postData.text, t.postData.mimeType === "application/json" && (e.body = `JSON.stringify(${h(
    JSON.parse(e.body)
  )})`));
  const f = Object.keys(e).length ? `, ${h(e)}` : "";
  return {
    target: "node",
    client: "fetch",
    code: `fetch('${t.url}${n}'${f})`
  };
}
export {
  p as fetch
};
