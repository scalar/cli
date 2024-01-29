function d(a) {
  return a.reduce((t, e) => (t[e.name] = e.value, t), {});
}
function l(a) {
  return /\s|-/.test(a);
}
function h(a, t = 0) {
  let e = [], $ = " ".repeat(t), s = " ".repeat(t + 2);
  for (const [f, o] of Object.entries(a)) {
    let i = l(f) ? `'${f}'` : f;
    if (Array.isArray(o)) {
      const n = o.map((r) => typeof r == "string" ? `'${r}'` : r && typeof r == "object" ? h(r, t + 2) : r).join(`, ${s}`);
      e.push(`${s}${i}: [${n}]`);
    } else if (o && typeof o == "object")
      e.push(
        `${s}${i}: ${h(
          o,
          t + 2
        )}`
      );
    else if (typeof o == "string") {
      let n = `${o}`;
      if (o.startsWith("JSON.stringify")) {
        const r = o.split(`
`);
        r.length > 1 && (n = r.map((u, c) => c === 0 ? u : `${s}${u}`).join(`
`));
      } else
        n = `'${o}'`;
      e.push(`${s}${i}: ${n}`);
    } else
      e.push(`${s}${i}: ${o}`);
  }
  return `{
${e.join(`,
`)}
${$}}`;
}
function p(a) {
  var i, n;
  const t = {
    method: "GET",
    ...a
  };
  t.method = t.method.toUpperCase();
  const e = {
    method: t.method === "GET" ? void 0 : t.method
  }, $ = new URLSearchParams(
    t.queryString ? d(t.queryString) : void 0
  ), s = $.size ? `?${$.toString()}` : "";
  (i = t.headers) != null && i.length && (e.headers = {}, t.headers.forEach((r) => {
    e.headers[r.name] = r.value;
  })), (n = t.cookies) != null && n.length && (e.headers = e.headers || {}, t.cookies.forEach((r) => {
    e.headers["Set-Cookie"] = e.headers["Set-Cookie"] ? `${e.headers["Set-Cookie"]}; ${r.name}=${r.value}` : `${r.name}=${r.value}`;
  })), Object.keys(e).forEach((r) => {
    e[r] === void 0 && delete e[r];
  }), t.postData && (e.body = t.postData.text, t.postData.mimeType === "application/json" && (e.body = `JSON.stringify(${h(
    JSON.parse(e.body)
  )})`));
  const f = Object.keys(e).length ? `, ${h(e)}` : "";
  return {
    target: "js",
    client: "fetch",
    code: `fetch('${t.url}${s}'${f})`
  };
}
export {
  p as fetch
};
