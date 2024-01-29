function h(a) {
  return a.reduce((t, e) => (t[e.name] = e.value, t), {});
}
function l(a) {
  return /\s|-/.test(a);
}
function $(a, t = 0) {
  let e = [], d = " ".repeat(t), n = " ".repeat(t + 2);
  for (const [u, o] of Object.entries(a)) {
    let i = l(u) ? `'${u}'` : u;
    if (Array.isArray(o)) {
      const s = o.map((r) => typeof r == "string" ? `'${r}'` : r && typeof r == "object" ? $(r, t + 2) : r).join(`, ${n}`);
      e.push(`${n}${i}: [${s}]`);
    } else if (o && typeof o == "object")
      e.push(
        `${n}${i}: ${$(
          o,
          t + 2
        )}`
      );
    else if (typeof o == "string") {
      let s = `${o}`;
      if (o.startsWith("JSON.stringify")) {
        const r = o.split(`
`);
        r.length > 1 && (s = r.map((c, f) => f === 0 ? c : `${n}${c}`).join(`
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
${d}}`;
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
  }, d = new URLSearchParams(
    t.queryString ? h(t.queryString) : void 0
  ), n = d.size ? `?${d.toString()}` : "";
  (i = t.headers) != null && i.length && (e.headers = {}, t.headers.forEach((r) => {
    e.headers[r.name] = r.value;
  })), (s = t.cookies) != null && s.length && (e.headers = e.headers || {}, t.cookies.forEach((r) => {
    e.headers["Set-Cookie"] = e.headers["Set-Cookie"] ? `${e.headers["Set-Cookie"]}; ${r.name}=${r.value}` : `${r.name}=${r.value}`;
  })), Object.keys(e).forEach((r) => {
    e[r] === void 0 && delete e[r];
  }), t.postData && (e.body = t.postData.text, t.postData.mimeType === "application/json" && (e.body = `JSON.stringify(${$(JSON.parse(e.body))})`));
  const u = Object.keys(e).length ? `, ${$(e)}` : "";
  return {
    target: "node",
    client: "undici",
    code: `import { request } from 'undici'

const { statusCode, body } = await request('${t.url}${n}'${u})`
  };
}
export {
  p as undici
};
