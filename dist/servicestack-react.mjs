import { lastRightPart as Bt, leftPart as Hn, map as tt, toDate as Nt, mapGet as we, toCamelCase as Pa, toDateTime as Oa, chop as ja, apiValue as Ea, isDate as zn, dateFmt as Va, fromXsdDuration as gs, timeFmt12 as Ha, omit as Lt, appendQueryString as Yt, enc as ur, indexOfAny as za, createBus as Ba, toKebabCase as ss, ApiResult as it, nameOf as qa, lastLeftPart as ps, setQueryString as Ua, toTime as Qa, ResponseStatus as Rn, ResponseError as ir, sanitize as Wa, errorResponseExcept as Ka, humanize as ze, toPascalCase as ht, errorResponse as Mt, uniqueKeys as fr, humanify as vs, delaySet as ys, HttpMethods as Lr, rightPart as Fn, queryString as mr, combinePaths as Za, trimEnd as _a, omitEmpty as Ga, each as Ja } from "@servicestack/client";
import et, { createContext as Bn, useContext as Ct, useState as F, useRef as _e, useEffect as pe, useMemo as c, forwardRef as yt, useImperativeHandle as bt, useCallback as C } from "react";
import { jsx as t, jsxs as i, Fragment as pn } from "react/jsx-runtime";
import { Link as qn } from "react-router-dom";
const bs = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), ws = {
  img: "png,jpg,jpeg,gif,svg,webp,png,jpg,jpeg,gif,bmp,tif,tiff,webp,ai,psd,ps".split(","),
  vid: "avi,m4v,mov,mp4,mpg,mpeg,wmv,webm".split(","),
  aud: "mp3,mpa,ogg,wav,wma,mid,webm".split(","),
  ppt: "key,odp,pps,ppt,pptx".split(","),
  xls: "xls,xlsm,xlsx,ods,csv,tsv".split(","),
  doc: "doc,docx,pdf,rtf,tex,txt,md,rst,xls,xlsm,xlsx,ods,key,odp,pps,ppt,pptx".split(","),
  zip: "zip,tar,gz,7z,rar,gzip,deflate,br,iso,dmg,z,lz,lz4,lzh,s7z,apl,arg,jar,war".split(","),
  exe: "exe,bat,sh,cmd,com,app,msi,run,vb,vbs,js,ws,wsh".split(","),
  att: "bin,oct,dat".split(",")
  //attachment
}, as = Object.keys(ws), kt = (e, n) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${n}</svg>`, Pn = {
  img: kt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: kt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: kt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: kt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: kt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: kt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: kt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: kt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: kt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, Xa = /[\r\n%#()<>?[\\\]^`{|}]/g, ls = 1024, Ya = ["Bytes", "KB", "MB", "GB", "TB"], el = (() => {
  const e = "application/", n = e + "vnd.openxmlformats-officedocument.", r = "image/", s = "text/", a = "audio/", l = "video/", o = {
    jpg: r + "jpeg",
    tif: r + "tiff",
    svg: r + "svg+xml",
    ico: r + "x-icon",
    ts: s + "typescript",
    py: s + "x-python",
    sh: s + "x-sh",
    mp3: a + "mpeg3",
    mpg: l + "mpeg",
    ogv: l + "ogg",
    xlsx: n + "spreadsheetml.sheet",
    xltx: n + "spreadsheetml.template",
    docx: n + "wordprocessingml.document",
    dotx: n + "wordprocessingml.template",
    pptx: n + "presentationml.presentation",
    potx: n + "presentationml.template",
    ppsx: n + "presentationml.slideshow",
    mdb: e + "vnd.ms-access"
  };
  function u(m, p) {
    m.split(",").forEach((L) => o[L] = p);
  }
  function d(m, p) {
    m.split(",").forEach((L) => o[L] = p(L));
  }
  return d("jpeg,gif,png,tiff,bmp,webp", (m) => r + m), d("jsx,csv,css", (m) => s + m), d("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (m) => a + m), d("3gpp,avi,dv,divx,ogg,mp4,webm", (m) => l + m), d("rtf,pdf", (m) => e + m), u("htm,html,shtm", s + "html"), u("js,mjs,cjs", s + "javascript"), u("yml,yaml", e + "yaml"), u("bat,cmd", e + "bat"), u("xml,csproj,fsproj,vbproj", s + "xml"), u("txt,ps1", s + "plain"), u("qt,mov", l + "quicktime"), u("doc,dot", e + "msword"), u("xls,xlt,xla", e + "excel"), u("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), u("cer,crt,der", e + "x-x509-ca-cert"), u("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), u("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), o;
})();
let hr = [];
function xs(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(Xa, encodeURIComponent);
}
function Mr(e) {
  return "data:image/svg+xml;utf8," + xs(e);
}
function ks(e) {
  let n = URL.createObjectURL(e);
  return hr.push(n), n;
}
function Cs() {
  hr.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (n) {
      console.error("URL.revokeObjectURL", n);
    }
  }), hr = [];
}
function Sr(e) {
  if (!e) return null;
  let n = Hn(e, "?");
  return Bt(n, "/");
}
function vn(e) {
  let n = Sr(e);
  return n == null || n.indexOf(".") === -1 ? null : Bt(n, ".").toLowerCase();
}
function Tr(e) {
  let n = vn(e.name);
  return n && bs.indexOf(n) >= 0 ? ks(e) : Et(e.name);
}
function Ar(e) {
  if (!e) return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let n = vn(e);
  return n && bs.indexOf(n) >= 0 || !1;
}
function Et(e) {
  if (!e) return null;
  let n = vn(e);
  return n == null || Ar(e) ? e : dn(n) || Mr(Pn.doc);
}
function dn(e) {
  let n = Ns(e);
  return n && Mr(n) || null;
}
function Ns(e) {
  if (Pn[e])
    return Pn[e];
  for (let n = 0; n < as.length; n++) {
    let r = as[n];
    if (ws[r].indexOf(e) >= 0)
      return Pn[r];
  }
  return null;
}
function Rr(e, n = 2) {
  if (e === 0) return "0 Bytes";
  const r = n < 0 ? 0 : n, s = Math.floor(Math.log(e) / Math.log(ls));
  return parseFloat((e / Math.pow(ls, s)).toFixed(r)) + " " + Ya[s];
}
function tl(e) {
  return e.files && Array.from(e.files).map((n) => ({ fileName: n.name, contentLength: n.size, filePath: Tr(n) }));
}
function Un(e, n) {
  e.onerror = null, e.src = $r(e.src, n) || "";
}
function $r(e, n) {
  return dn(Bt(e, ".").toLowerCase()) || (n ? dn(n) || n : null) || dn("doc");
}
function gr(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const n = Bt(e, ".").toLowerCase();
  return el[n] || "application/" + n;
}
function nl() {
  return {
    extSvg: Ns,
    extSrc: dn,
    getExt: vn,
    encodeSvg: xs,
    canPreview: Ar,
    getFileName: Sr,
    getMimeType: gr,
    formatBytes: Rr,
    filePathUri: Et,
    svgToDataUri: Mr,
    fileImageUri: Tr,
    objectUrl: ks,
    flush: Cs,
    inputFiles: tl,
    iconOnError: Un,
    iconFallbackSrc: $r
  };
}
class rl {
  view;
  includeTypes;
  constructor(n) {
    Object.assign(this, n);
  }
  getTypeName() {
    return "MetadataApp";
  }
  getMethod() {
    return "GET";
  }
  createResponse() {
    return {};
  }
}
const Ir = Bn(void 0), Qn = Bn(void 0), Wn = Bn(void 0), en = "/metadata/app.json", sl = {
  Boolean: "checkbox",
  DateTime: "date",
  DateOnly: "date",
  DateTimeOffset: "date",
  TimeSpan: "time",
  TimeOnly: "time",
  Byte: "number",
  Short: "number",
  Int64: "number",
  Int32: "number",
  UInt16: "number",
  UInt32: "number",
  UInt64: "number",
  Single: "number",
  Double: "number",
  Decimal: "number",
  String: "text",
  Guid: "text",
  Uri: "text"
}, al = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, pr = {
  Byte: "byte",
  Int16: "short",
  Int32: "int",
  Int64: "long",
  UInt16: "ushort",
  Unt32: "uint",
  UInt64: "ulong",
  Single: "float",
  Double: "double",
  Decimal: "decimal"
};
[...Object.keys(pr), ...Object.values(pr)];
const ll = {
  String: "string",
  Boolean: "bool",
  ...pr
};
function $n(e) {
  return ll[e] || e;
}
function Ls(e, n) {
  return e ? (n || (n = []), e === "Nullable`1" ? $n(n[0]) + "?" : e.endsWith("[]") ? `List<${$n(e.substring(0, e.length - 2))}>` : n.length === 0 ? $n(e) : Hn($n(e), "`") + "<" + n.join(",") + ">") : "";
}
function ol(e) {
  return e && Ls(e.name, e.genericArgs);
}
class qt {
  Query;
  QueryInto;
  Create;
  Update;
  Patch;
  Delete;
  get AnyQuery() {
    return this.Query || this.QueryInto;
  }
  get AnyUpdate() {
    return this.Patch || this.Update;
  }
  get dataModel() {
    return this.AnyQuery?.dataModel;
  }
  toArray() {
    return [this.Query, this.QueryInto, this.Create, this.Update, this.Patch, this.Delete].filter((r) => !!r).map((r) => r);
  }
  get empty() {
    return !this.Query && !this.QueryInto && !this.Create && !this.Update && !this.Patch && !this.Delete;
  }
  add(n) {
    Ye.isQueryInto(n) && !this.QueryInto ? this.QueryInto = n : Ye.isQuery(n) && !this.Query ? this.Query = n : Ye.isCreate(n) && !this.Create ? this.Create = n : Ye.isUpdate(n) && !this.Update ? this.Update = n : Ye.isPatch(n) && !this.Patch ? this.Patch = n : Ye.isDelete(n) && !this.Delete && (this.Delete = n);
  }
  static from(n) {
    const r = new qt();
    return n.forEach((s) => {
      r.add(s);
    }), r;
  }
  static forType(n, r) {
    let s = new qt();
    if (q.config.apisResolver && n) {
      const a = q.config.apisResolver(n, r);
      a && (s.Query = a.Query, s.QueryInto = a.QueryInto, s.Create = a.Create, s.Update = a.Update, s.Patch = a.Patch, s.Delete = a.Delete);
    }
    return n && (r ??= q.metadata?.api, r?.operations.forEach((a) => {
      a.dataModel?.name == n && s.add(a);
    })), s;
  }
}
const Ye = {
  Create: "ICreateDb`1",
  Update: "IUpdateDb`1",
  Patch: "IPatchDb`1",
  Delete: "IDeleteDb`1",
  AnyRead: ["QueryDb`1", "QueryDb`2"],
  AnyWrite: ["ICreateDb`1", "IUpdateDb`1", "IPatchDb`1", "IDeleteDb`1"],
  isAnyQuery: (e) => tt(e.request.inherits, (n) => Ye.AnyRead.indexOf(n.name) >= 0),
  isQuery: (e) => tt(e.request.inherits, (n) => n.name === "QueryDb`1"),
  isQueryInto: (e) => tt(e.request.inherits, (n) => n.name === "QueryDb`2"),
  isCrud: (e) => e.request.implements?.some((n) => Ye.AnyWrite.indexOf(n.name) >= 0),
  isCreate: (e) => In(e, Ye.Create),
  isUpdate: (e) => In(e, Ye.Update),
  isPatch: (e) => In(e, Ye.Patch),
  isDelete: (e) => In(e, Ye.Delete),
  model: (e) => e ? tt(e.inherits, (n) => Ye.AnyRead.indexOf(n.name) >= 0) ? e.inherits?.genericArgs[0] : e.implements?.find((n) => Ye.AnyWrite.indexOf(n.name) >= 0)?.genericArgs[0] : null
};
function il(e) {
  return e.input?.type || Kn(Dr(e));
}
function Ms(e) {
  return e.endsWith("?") ? ja(e, 1) : e;
}
function Kn(e) {
  return sl[Ms(e)];
}
function cl(e) {
  return e && al[e] || "String";
}
function Dr(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function vr(e) {
  return e && Kn(e) == "number" || !1;
}
function Ss(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function dl(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function Ts(e) {
  if (!e?.type) return !1;
  const n = Dr(e);
  return e.isValueType && n.indexOf("`") == -1 || e.isEnum ? !1 : Kn(e.type) == null;
}
function As(e) {
  if (!e?.type) return !1;
  const n = Dr(e);
  if (e.isValueType && n.indexOf("`") == -1 || e.isEnum) return !0;
  const r = e.input?.type;
  return r && (r == "hidden" || r == "file" || r == "tag" || r == "combobox" || q.components?.[r]) ? !0 : Kn(e.type) != null;
}
function mn(e, n) {
  let r = typeof e == "string" ? Zn(e) : e;
  r || (console.warn(`Metadata not found for: ${e}`), r = { request: { name: e } });
  let s = (
    /** @class */
    /* @__PURE__ */ (function() {
      return function(l) {
        Object.assign(this, l);
      };
    })()
  ), a = (
    /** @class */
    (function() {
      function l(o) {
        Object.assign(this, o);
      }
      return l.prototype.createResponse = function() {
        return r.returnsVoid ? void 0 : new s();
      }, l.prototype.getTypeName = function() {
        return r.request.name;
      }, l.prototype.getMethod = function() {
        return r.method || "POST";
      }, l;
    })()
  );
  return new a(n);
}
function ul(e, n, r = {}) {
  let s = (
    /** @class */
    /* @__PURE__ */ (function() {
      return function(l) {
        Object.assign(this, l);
      };
    })()
  ), a = (
    /** @class */
    (function() {
      function l(o) {
        Object.assign(this, o);
      }
      return l.prototype.createResponse = function() {
        return typeof r.createResponse == "function" ? r.createResponse() : new s();
      }, l.prototype.getTypeName = function() {
        return e;
      }, l.prototype.getMethod = function() {
        return r.method || "POST";
      }, l;
    })()
  );
  return new a(n);
}
function un(e, n) {
  return e ? (Object.keys(e).forEach((r) => {
    let s = e[r];
    typeof s == "string" ? s.startsWith("/Date") && (e[r] = Xn(Nt(s))) : s != null && typeof s == "object" && (Array.isArray(s) ? e[r] = Array.from(s) : e[r] = Object.assign({}, s));
  }), e) : {};
}
function fl(e, n) {
  let r = {};
  return Array.from(e.elements).forEach((s) => {
    let a = s;
    if (!a.id || a.value == null || a.value === "") return;
    const l = a.id.toLowerCase(), o = n && n.find((p) => p.name.toLowerCase() == l);
    let u = o?.type, d = o?.genericArgs?.[0], m = a.type === "checkbox" ? a.checked : a.value;
    vr(u) ? m = Number(m) : u === "List`1" && typeof m == "string" && (m = m.split(",").map((p) => vr(d) ? Number(p) : p)), r[a.id] = m;
  }), r;
}
function Fr(e) {
  return e?.api?.operations && e.api.operations.length > 0;
}
function ml(e) {
  if (!Pr() && e?.assert && !q.metadata)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return q.metadata;
}
function hn(e) {
  return e && Fr(e) ? (e.date = Oa(/* @__PURE__ */ new Date()), q.metadata = e, typeof localStorage < "u" && localStorage.setItem(en, JSON.stringify(e)), !0) : !1;
}
function hl() {
  q.metadata = null, typeof localStorage < "u" && localStorage.removeItem(en);
}
function Pr() {
  if (q.metadata != null) return !0;
  let e = globalThis.Server;
  if (Fr(e))
    hn(e);
  else {
    const n = typeof localStorage < "u" ? localStorage.getItem(en) : null;
    if (n)
      try {
        hn(JSON.parse(n));
      } catch {
        console.error(`Could not JSON.parse ${en} from localStorage`);
      }
  }
  return q.metadata != null;
}
async function os(e, n) {
  let r = n ? await n() : await fetch(e);
  if (r.ok) {
    let s = await r.text();
    hn(JSON.parse(s));
  } else
    console.error(`Could not download ${n ? "AppMetadata" : e}: ${r.statusText}`);
  Fr(q.metadata) || console.warn("AppMetadata is not available");
}
async function gl(e) {
  const { olderThan: n, resolvePath: r, resolve: s, client: a } = e || {};
  let l = Pr() && n !== 0;
  if (l && n) {
    let o = Nt(q.metadata?.date);
    (!o || (/* @__PURE__ */ new Date()).getTime() - o.getTime() > n) && (l = !1);
  }
  if (!l) {
    if ((r || s) && (await os(r || en, s), q.metadata != null))
      return;
    if (a != null) {
      const o = await a.api(new rl());
      o.succeeded && hn(o.response);
    }
    if (q.metadata != null) return;
    await os(en);
  }
  return q.metadata;
}
function wt(e, n) {
  if (q.config.typeResolver) {
    let o = q.config.typeResolver(e, n);
    if (o) return o;
  }
  let r = q.metadata?.api;
  if (!r || !e) return null;
  let s = r.types.find((o) => o.name.toLowerCase() === e.toLowerCase() && (!n || o.namespace == n));
  if (s) return s;
  let a = Zn(e);
  if (a) return a.request;
  let l = r.operations.find((o) => o.response && o.response.name.toLowerCase() === e.toLowerCase() && (!n || o.response.namespace == n));
  return l ? l.response : null;
}
function Zn(e) {
  if (q.config.apiResolver) {
    const s = q.config.apiResolver(e);
    if (s) return s;
  }
  let n = q.metadata?.api;
  return n ? n.operations.find((s) => s.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function pl({ dataModel: e }) {
  const n = q.metadata?.api;
  if (!n) return [];
  let r = n.operations;
  if (e) {
    const s = typeof e == "string" ? wt(e) : e;
    r = r.filter((a) => Rs(a.dataModel, s));
  }
  return r;
}
function Or(e) {
  return e ? wt(e.name, e.namespace) : null;
}
function Rs(e, n) {
  return e && n && e.name === n.name && (!e.namespace || !n.namespace || e.namespace === n.namespace);
}
function vl(e, n) {
  let r = wt(e);
  return r && r.properties && r.properties.find((a) => a.name.toLowerCase() === n.toLowerCase());
}
function $s(e) {
  return Is(wt(e));
}
function Is(e) {
  if (e && e.isEnum && e.enumNames != null) {
    let n = {};
    for (let r = 0; r < e.enumNames.length; r++) {
      const s = (e.enumDescriptions ? e.enumDescriptions[r] : null) || e.enumNames[r], a = (e.enumValues != null ? e.enumValues[r] : null) || e.enumNames[r];
      n[a] = s;
    }
    return n;
  }
  return null;
}
function Ds(e) {
  if (!e) return null;
  let n = {}, r = e.input && e.input.allowableEntries;
  if (r) {
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      n[l.key] = l.value;
    }
    return n;
  }
  let s = e.allowableValues || (e.input ? e.input.allowableValues : null);
  if (s) {
    for (let a = 0; a < s.length; a++) {
      let l = s[a];
      n[l] = l;
    }
    return n;
  }
  if (e.isEnum) {
    const a = e.genericArgs && e.genericArgs.length == 1 ? e.genericArgs[0] : e.type, l = wt(a);
    if (l)
      return Is(l);
  }
  return null;
}
function jr(e) {
  if (!e) return;
  const n = [];
  return Object.keys(e).forEach((r) => n.push({ key: r, value: e[r] })), n;
}
function yl(e, n) {
  const s = ((a, l) => Object.assign({
    id: a,
    name: a,
    type: l
  }, n))(e.name, n?.type || il(e) || "text");
  return e.isEnum && (s.type = "select", s.allowableEntries = jr(Ds(e))), s;
}
function bl(e) {
  let n = [];
  if (e) {
    const r = ft(e), s = Zn(e.name), a = Or(s?.dataModel);
    r.forEach((l) => {
      if (!As(l)) return;
      const o = yl(l, l.input);
      if (o.id = Pa(o.id), o.type == "file" && l.uploadTo && !o.accept) {
        const u = q.metadata?.plugins.filesUpload?.locations.find((d) => d.name == l.uploadTo);
        u && !o.accept && u.allowExtensions && (o.accept = u.allowExtensions.map((d) => d.startsWith(".") ? d : `.${d}`).join(","));
      }
      if (a) {
        const u = a.properties?.find((d) => d.name == l.name);
        l.ref || (l.ref = u?.ref);
      }
      if (o.options)
        try {
          const u = {
            input: o,
            $typeFields: r.map((m) => m.name),
            $dataModelFields: a ? ft(a).map((m) => m.name) : [],
            ...q.config.scopeWhitelist
          }, d = er(o.options, u);
          Object.keys(d).forEach((m) => {
            o[m] = d[m];
          });
        } catch {
          console.error(`failed to evaluate '${o.options}'`);
        }
      n.push(o);
    });
  }
  return n;
}
function Er(e, n) {
  if (!n.type)
    return console.error("enumDescriptions missing {type:'EnumType'} options"), [`${e}`];
  const r = wt(n.type);
  if (!r?.enumValues)
    return console.error(`Could not find metadata for ${n.type}`), [`${e}`];
  const s = [];
  for (let a = 0; a < r.enumValues.length; a++) {
    const l = parseInt(r.enumValues[a]);
    l > 0 && (l & e) === l && s.push(r.enumDescriptions?.[a] || r.enumNames?.[a] || `${e}`);
  }
  return s;
}
function Fs(e) {
  return (n) => typeof n == "number" ? Er(n, { type: e }) : n;
}
function ft(e) {
  if (!e) return [];
  let n = [], r = {};
  function s(a) {
    a.forEach((l) => {
      r[l.name] || (r[l.name] = 1, n.push(l));
    });
  }
  for (; e; )
    e.properties && s(e.properties), e = e.inherits ? Or(e.inherits) : null;
  return n.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function In(e, n) {
  return e.request.implements?.some((r) => r.name === n) || !1;
}
function rn(e) {
  return e ? Ps(e, ft(e)) : null;
}
function Ps(e, n) {
  let r = n.find((l) => l.name.toLowerCase() === "id");
  if (r && r.isPrimaryKey) return r;
  let a = n.find((l) => l.isPrimaryKey) || r;
  if (!a) {
    let l = Ye.model(e);
    if (l)
      return tt(wt(l), (o) => rn(o));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function wl(e, n) {
  return tt(rn(e), (r) => we(n, r.name));
}
function Os(e, n, r) {
  return e && e.valueType === "none" ? "" : r.key === "%In" || r.key === "%Between" ? `(${r.value})` : xl(n, r.value);
}
function xl(e, n) {
  return e ? (e = Ms(e), vr(e) || e === "Boolean" ? n : dl(e) ? `[${n}]` : `'${n}'`) : n;
}
function Rt(e, n) {
  return { name: e, value: n };
}
const kl = [
  Rt("=", "%"),
  Rt("!=", "%!"),
  Rt(">=", ">%"),
  Rt(">", "%>"),
  Rt("<=", "%<"),
  Rt("<", "<%"),
  Rt("In", "%In"),
  Rt("Between", "%Between"),
  { name: "Starts With", value: "%StartsWith", types: "string" },
  { name: "Contains", value: "%Contains", types: "string" },
  { name: "Ends With", value: "%EndsWith", types: "string" },
  { name: "Exists", value: "%IsNotNull", valueType: "none" },
  { name: "Not Exists", value: "%IsNull", valueType: "none" }
];
function dt() {
  const e = Ct(Qn);
  return Pr(), {
    loadMetadata: (r) => gl({ ...r, client: e }),
    getMetadata: ml,
    setMetadata: hn,
    clearMetadata: hl,
    metadataApp: q.metadata?.app || null,
    metadataApi: q.metadata?.api || null,
    filterDefinitions: q.metadata?.plugins?.autoQuery?.viewerConventions || kl,
    typeOf: wt,
    typeOfRef: Or,
    typeEquals: Rs,
    apiOf: Zn,
    findApis: pl,
    typeName: ol,
    typeName2: Ls,
    property: vl,
    enumOptions: $s,
    propertyOptions: Ds,
    createFormLayout: bl,
    typeProperties: ft,
    supportsProp: As,
    Crud: Ye,
    Apis: qt,
    getPrimaryKey: rn,
    getPrimaryKeyByProps: Ps,
    getId: wl,
    createDto: mn,
    makeDto: ul,
    toFormValues: un,
    formValues: fl,
    isComplexProp: Ts,
    asKvps: jr,
    expandEnumFlags: Er,
    enumFlagsConverter: Fs
  };
}
class ot {
  static Lookup = {};
  static async getOrFetchValue(n, r, s, a, l, o, u) {
    const d = ot.getValue(s, u, l);
    return d ?? (await ot.fetchLookupIds(n, r, s, a, l, o, [u]), ot.getValue(s, u, l));
  }
  static getValue(n, r, s) {
    const a = ot.Lookup[n];
    if (a) {
      const l = a[r];
      if (l)
        return s = s.toLowerCase(), l[s];
    }
  }
  static setValue(n, r, s, a) {
    const l = ot.Lookup[n] ?? (ot.Lookup[n] = {}), o = l[r] ?? (l[r] = {});
    s = s.toLowerCase(), o[s] = a;
  }
  static setRefValue(n, r) {
    const s = we(r, n.refId);
    if (s == null || n.refLabel == null)
      return null;
    const a = we(r, n.refLabel);
    return ot.setValue(n.model, s, n.refLabel, a), a;
  }
  static async fetchLookupIds(n, r, s, a, l, o, u) {
    const d = r.operations.find((m) => Ye.isAnyQuery(m) && m.dataModel?.name == s);
    if (d) {
      const m = ot.Lookup[s] ?? (ot.Lookup[s] = {}), p = [];
      Object.keys(m).forEach((I) => {
        const j = m[I];
        we(j, l) && p.push(I);
      });
      const L = u.filter((I) => !p.includes(I));
      if (L.length == 0)
        return;
      const v = o ? null : `${a},${l}`, b = {
        [a + "In"]: L.join(",")
      };
      v && (b.fields = v);
      const S = mn(d, b), w = await n.api(S, { jsconfig: "edv,eccn" });
      if (w.succeeded)
        (we(w.response, "results") || []).forEach((j) => {
          if (!we(j, a)) {
            console.error(`result[${a}] == null`, j);
            return;
          }
          const y = `${we(j, a)}`, x = we(j, l);
          l = l.toLowerCase();
          const h = m[y] ?? (m[y] = {});
          h[l] = `${x}`;
        });
      else {
        console.error(`Failed to call ${d.request.name}`);
        return;
      }
    }
  }
}
let yr = () => (/* @__PURE__ */ new Date()).getTime(), Cl = ["/", "T", ":", "-"], pt = {
  //locale: null,
  assumeUtc: !0,
  //number: null,
  date: {
    method: "Intl.DateTimeFormat",
    options: "{dateStyle:'medium'}"
  },
  maxFieldLength: 150,
  maxNestedFields: 2,
  maxNestedFieldLength: 30
}, Nl = new Intl.RelativeTimeFormat(pt.locale, {}), is = 1440 * 60 * 1e3 * 365, cr = {
  year: is,
  month: is / 12,
  day: 1440 * 60 * 1e3,
  hour: 3600 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, Vt = {
  currency: Es,
  bytes: Vs,
  link: Hs,
  linkTel: zs,
  linkMailTo: Bs,
  icon: qs,
  iconRounded: Us,
  attachment: Qs,
  hidden: Ws,
  time: Ks,
  relativeTime: Hr,
  relativeTimeFromMs: Gn,
  enumFlags: _s,
  formatDate: sn,
  formatNumber: Vr
};
"iconOnError" in globalThis || (globalThis.iconOnError = Un);
class Ll {
  static currency = { method: "currency" };
  static bytes = { method: "bytes" };
  static link = { method: "link" };
  static linkTel = { method: "linkTel" };
  static linkMailTo = { method: "linkMailTo" };
  static icon = { method: "icon" };
  static iconRounded = { method: "iconRounded" };
  static attachment = { method: "attachment" };
  static time = { method: "time" };
  static relativeTime = { method: "relativeTime" };
  static relativeTimeFromMs = { method: "relativeTimeFromMs" };
  static date = { method: "formatDate" };
  static number = { method: "formatNumber" };
  static hidden = { method: "hidden" };
  static enumFlags = { method: "enumFlags" };
}
function Ml(e) {
  pt = Object.assign({}, pt, e);
}
function Sl(e) {
  Object.keys(e || {}).forEach((n) => {
    typeof e[n] == "function" && (Vt[n] = e[n]);
  });
}
function js() {
  return Vt;
}
function yn(e, n) {
  return n ? vt("span", e, n) : e;
}
function Es(e, n) {
  const r = Lt(n, ["currency"]);
  return yn(new Intl.NumberFormat(void 0, { style: "currency", currency: n?.currency || "USD" }).format(e), r);
}
function Vs(e, n) {
  return yn(Rr(e), n);
}
function Hs(e, n) {
  return vt("a", e, Yn({ ...n, href: e }));
}
function zs(e, n) {
  return vt("a", e, Yn({ ...n, href: `tel:${e}` }));
}
function Bs(e, n) {
  n || (n = {});
  let { subject: r, body: s } = n, a = Lt(n, ["subject", "body"]), l = {};
  return r && (l.subject = r), s && (l.body = s), vt("a", e, Yn({ ...a, href: `mailto:${Yt(e, l)}` }));
}
function qs(e, n) {
  return vt("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Xt(e), onerror: "iconOnError(this)" }, n));
}
function Us(e, n) {
  return vt("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Xt(e), onerror: "iconOnError(this)" }, n));
}
function Qs(e, n) {
  let r = Sr(e), a = vn(r) == null || Ar(e) ? Xt(e) : $r(e);
  const l = Xt(a);
  let o = n && (n["icon-class"] || n.iconClass), u = vt("img", void 0, Object.assign({ class: "w-6 h-6", src: l, onerror: "iconOnError(this,'att')" }, o ? { class: o } : null)), d = `<span class="pl-1">${r}</span>`;
  return vt("a", u + d, Object.assign({ class: "flex", href: Xt(e), title: e }, n ? Lt(n, ["icon-class", "iconClass"]) : null));
}
function Ws(e) {
  return "";
}
function Ks(e, n) {
  let r = typeof e == "string" ? new Date(gs(e) * 1e3) : zn(e) ? Nt(e) : null;
  return yn(r ? Ha(r) : e, n);
}
function sn(e, n) {
  if (e == null) return "";
  let r = typeof e == "number" ? new Date(e) : typeof e == "string" ? Nt(e) : e;
  if (!zn(r))
    return console.warn(`${r} is not a Date value`), e == null ? "" : `${e}`;
  let s = pt.date ? Jn(pt.date) : null;
  return yn(typeof s == "function" ? s(r) : Va(r), n);
}
function Vr(e, n) {
  if (typeof e != "number") return e;
  let r = pt.number ? Jn(pt.number) : null, s = typeof r == "function" ? r(e) : `${e}`;
  return s === "" && (console.warn(`formatNumber(${e}) => ${s}`, r), s = `${e}`), yn(s, n);
}
function On(e) {
  const n = Math.floor(e / 1e3), r = Math.floor(n / 60), s = Math.floor(r / 60), a = Math.floor(s / 24);
  return a > 0 ? `${a}d ${On(e - a * 24 * 60 * 6e4)}` : s > 0 ? `${s}h ${On(e - s * 60 * 6e4)}` : r > 0 ? `${r}m ${On(e - r * 6e4)}` : n > 0 ? `${n}s` : `${e}ms`;
}
function Tl(e) {
  return e >= 1e9 ? (e / 1e9).toFixed(1) + "b" : e >= 1e6 ? (e / 1e6).toFixed(1) + "m" : e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toLocaleString();
}
function Zs(e, n, r) {
  let s = Ea(e), a = n ? Jn(n) : null;
  if (typeof a == "function") {
    let o = r;
    if (n?.options)
      try {
        o = er(n.options, r);
      } catch (u) {
        console.error(`Could not evaluate '${n.options}'`, u, ", with scope:", r);
      }
    return a(e, o);
  }
  let l = s != null ? zn(s) ? sn(s, r) : typeof s == "number" ? Vr(s, r) : s : null;
  return l ?? "";
}
function _n(e, n, r) {
  return Ut(e) ? Zs(e, n, r) : Dl(e, n, r);
}
function Al(e) {
  if (e == null) return NaN;
  if (typeof e == "number")
    return e;
  if (zn(e))
    return e.getTime() - yr();
  if (typeof e == "string") {
    let n = Number(e);
    if (!isNaN(n))
      return n;
    if (e[0] === "P" || e.startsWith("-P"))
      return gs(e) * 1e3 * -1;
    if (za(e, Cl) >= 0)
      return Nt(e).getTime() - yr();
  }
  return NaN;
}
function Gn(e, n) {
  for (let r in cr)
    if (Math.abs(e) > cr[r] || r === "second")
      return (n || Nl).format(Math.round(e / cr[r]), r);
}
function Hr(e, n) {
  let r = Al(e);
  return isNaN(r) ? "" : Gn(r, n);
}
function Rl(e, n) {
  return Gn(e.getTime() - (n ? n.getTime() : yr()));
}
function _s(e, n) {
  return Er(e, n).join(", ");
}
function Jn(e) {
  if (!e) return null;
  let { method: n, options: r } = e, s = `${n}(${r})`, a = Vt[s] || Vt[n];
  if (typeof a == "function") return a;
  let l = e.locale || pt.locale;
  if (n.startsWith("Intl.")) {
    let o = l ? `'${l}'` : "undefined", u = `return new ${n}(${o},${r || "undefined"})`;
    try {
      let d = Function(u)();
      return a = n === "Intl.DateTimeFormat" ? (m) => d.format(Nt(m)) : n === "Intl.NumberFormat" ? (m) => d.format(Number(m)) : n === "Intl.RelativeTimeFormat" ? (m) => Hr(m, d) : (m) => d.format(m), Vt[s] = a;
    } catch (d) {
      console.error(`Invalid format: ${u}`, d);
    }
  } else {
    let o = globalThis[n];
    if (typeof o == "function") {
      let u = r != null ? Function("return " + r)() : void 0;
      return a = (d) => o(d, u, l), Vt[s] = a;
    }
    console.error(`No '${n}' function exists`, Object.keys(Vt));
  }
  return null;
}
function Gs(e, n) {
  return e ? e.length > n ? e.substring(0, n) + "..." : e : "";
}
function Js(e) {
  return e.substring(0, 6) === "/Date(" ? sn(Nt(e)) : e;
}
function $l(e) {
  return zr(tn(e)).replace(/"/g, "");
}
function Xs(e) {
  if (e == null || e === "") return "";
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      console.warn("couldn't parse as JSON", e);
    }
  return e;
}
function zr(e, n = 4) {
  return e = Xs(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, n);
}
function Il(e) {
  return e = Xs(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = tn(e), zr(e));
}
function tn(e) {
  if (e == null) return null;
  if (typeof e == "string") return Js(e);
  if (Ut(e)) return e;
  if (e instanceof Date) return sn(e);
  if (Array.isArray(e)) return e.map(tn);
  if (typeof e == "object") {
    let n = {};
    return Object.keys(e).forEach((r) => {
      r != "__type" && (n[r] = tn(e[r]));
    }), n;
  }
  return e;
}
function Dl(e, n, r) {
  let s = e;
  if (Array.isArray(e)) {
    if (Ut(e[0]))
      return s.join(",");
    e[0] != null && (s = e[0]);
  }
  if (s == null) return "";
  if (s instanceof Date) return sn(s, r);
  let a = Object.keys(s), l = [];
  for (let o = 0; o < Math.min(pt.maxNestedFields, a.length); o++) {
    let u = a[o], d = `${tn(s[u])}`;
    l.push(`<b class="font-medium">${u}</b>: ${ur(Gs(Js(d), pt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && l.push("..."), vt("span", "{ " + l.join(", ") + " }", Object.assign({ title: ur($l(e)) }, r));
}
function go() {
  return {
    Formats: Ll,
    setDefaultFormats: Ml,
    getFormatters: js,
    setFormatters: Sl,
    formatValue: _n,
    formatter: Jn,
    dateInputFormat: Xn,
    currency: Es,
    bytes: Vs,
    link: Hs,
    linkTel: zs,
    linkMailTo: Bs,
    icon: qs,
    iconRounded: Us,
    attachment: Qs,
    hidden: Ws,
    time: Ks,
    relativeTime: Hr,
    relativeTimeFromDate: Rl,
    relativeTimeFromMs: Gn,
    enumFlags: _s,
    formatDate: sn,
    formatNumber: Vr,
    humanifyMs: On,
    humanifyNumber: Tl,
    indentJson: zr,
    prettyJson: Il,
    scrub: tn,
    truncate: Gs,
    apiValueFmt: Zs,
    iconOnError: Un
  };
}
function Fl({ to: e = "/", children: n, ...r }) {
  return /* @__PURE__ */ t(qn, { to: e, title: e, ...r, children: n });
}
class Pl {
  callbacks = {};
  register(n, r) {
    this.callbacks[n] = r;
  }
  has(n) {
    return !!this.callbacks[n];
  }
  invoke(n, r) {
    const s = this.callbacks[n];
    typeof s == "function" && s(n, r);
  }
}
class Ol {
  get length() {
    return typeof localStorage > "u" ? 0 : localStorage.length;
  }
  getItem(n) {
    return typeof localStorage > "u" ? null : localStorage.getItem(n);
  }
  setItem(n, r) {
    typeof localStorage > "u" || localStorage.setItem(n, r);
  }
  removeItem(n) {
    typeof localStorage > "u" || localStorage.removeItem(n);
  }
  clear() {
    typeof localStorage > "u" || localStorage.clear();
  }
  key(n) {
    return typeof localStorage > "u" ? null : localStorage.key(n);
  }
}
let cs = null, ds = null, Dn = /* @__PURE__ */ new Set();
class q {
  static config = {
    redirectSignIn: "/signin",
    redirectSignOut: "/auth/logout",
    navigate: (n) => location.href = n,
    assetsPathResolver: (n) => n,
    fallbackPathResolver: (n) => n,
    storage: new Ol(),
    tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
    scopeWhitelist: {
      enumFlagsConverter: Fs,
      ...js()
    }
  };
  static autoQueryGridDefaults = {
    deny: [],
    hide: [],
    toolbarButtonClass: void 0,
    tableStyle: "stripedRows",
    take: 25,
    maxFieldLength: 150
  };
  static events = Ba();
  static get user() {
    return cs;
  }
  static set user(n) {
    cs = n, Dn.forEach((r) => r());
  }
  static get metadata() {
    return ds;
  }
  static set metadata(n) {
    ds = n, Dn.forEach((r) => r());
  }
  static subscribe(n) {
    return Dn.add(n), () => Dn.delete(n);
  }
  static components = {
    RouterLink: Fl
  };
  static component(n) {
    const r = q.components[n];
    if (r) return r;
    const s = ss(n), a = Object.keys(q.components).find((l) => ss(l) === s);
    return a && q.components[a] || null;
  }
  static interceptors = new Pl();
}
function jl(e) {
  q.config = Object.assign(q.config, e);
}
function El(e) {
  q.autoQueryGridDefaults = Object.assign(q.autoQueryGridDefaults, e);
}
function $t(e) {
  return e && q.config.assetsPathResolver ? q.config.assetsPathResolver(e) : e;
}
function br(e) {
  return e && q.config.fallbackPathResolver ? q.config.fallbackPathResolver(e) : e;
}
function Vl(e, n) {
  q.interceptors.register(e, n);
}
function bn() {
  const e = q.events;
  return {
    config: q.config,
    setConfig: jl,
    events: e,
    autoQueryGridDefaults: q.autoQueryGridDefaults,
    setAutoQueryGridDefaults: El,
    assetsPathResolver: $t,
    fallbackPathResolver: br,
    registerInterceptor: Vl
  };
}
function Xn(e) {
  if (e == null || typeof e == "object") return "";
  const n = Nt(e);
  return n == null || n.toString() == "Invalid Date" ? "" : n.toISOString().substring(0, 10) ?? "";
}
function Ys(e) {
  if (e == null || typeof e == "object") return "";
  const n = Nt(e);
  return n == null || n.toString() == "Invalid Date" ? "" : n.toISOString().substring(0, 19) ?? "";
}
function ea(e) {
  return e == null ? "" : Qa(e);
}
function wr(e, n) {
  return q.config.inputValue ? q.config.inputValue(e, n) : e === "date" ? Xn(n) : e === "datetime-local" ? Ys(n) : e === "time" ? ea(n) : e === "number" || e === "range" ? n == null ? "" : Number(n) : n;
}
function Hl(e, n) {
  typeof e == "function" ? e(n) : e.current = n;
}
function Gt(e) {
  return { ...e };
}
function wn(e, n, r) {
  r ? (n(e.entering.cls + " " + e.entering.from), setTimeout(() => n(e.entering.cls + " " + e.entering.to), 0)) : (n(e.leaving.cls + " " + e.leaving.from), setTimeout(() => n(e.leaving.cls + " " + e.leaving.to), 0));
}
function jn(e) {
  if (typeof document > "u") return;
  let n = e?.after || document.activeElement, r = n && n.form;
  if (r) {
    let s = ':not([disabled]):not([tabindex="-1"])', a = r.querySelectorAll(`a:not([disabled]), button${s}, input[type=text]${s}, [tabindex]${s}`), l = Array.prototype.filter.call(
      a,
      (u) => u.offsetWidth > 0 || u.offsetHeight > 0 || u === n
    ), o = l.indexOf(n);
    o > -1 && (l[o + 1] || l[0]).focus();
  }
}
function It(e) {
  if (!e) return null;
  if (typeof e == "string")
    return e;
  const n = typeof e == "function" ? new e() : typeof e == "object" ? e : null;
  if (!n)
    throw new Error(`Invalid DTO Type '${typeof e}'`);
  if (typeof n.getTypeName != "function")
    throw new Error(`${JSON.stringify(n)} is not a Request DTO`);
  const r = n.getTypeName();
  if (!r)
    throw new Error("DTO Required");
  return r;
}
function vt(e, n, r) {
  r || (r = {});
  let s = r.cls || r.className || r.class;
  return s && (r = Lt(r, ["cls", "class", "className"]), r.class = s), n == null ? `<${e}` + xr(r) + "/>" : `<${e}` + xr(r) + `>${n || ""}</${e}>`;
}
function xr(e) {
  return Object.keys(e).reduce((n, r) => `${n} ${r}="${ur(e[r])}"`, "");
}
function Yn(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function Xt(e) {
  return $t(e);
}
let zl = ["string", "number", "boolean", "null", "undefined"];
function Ut(e) {
  return zl.indexOf(typeof e) >= 0 || e instanceof Date;
}
function gn(e) {
  return !Ut(e);
}
function En(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function Br(e, n) {
  if (typeof history < "u") {
    const r = n ? Yt(ps(location.href, "?"), e) : Ua(location.href, e);
    history.pushState({}, "", r);
  }
}
function er(e, n) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const s = Object.assign(
    Object.keys(globalThis).reduce((a, l) => (a[l] = void 0, a), {}),
    n
  );
  return new Function("with(this) { return (" + e + ") }").call(s);
}
function kr(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function qr(e) {
  const n = q.config.storage.getItem(e);
  return n ? JSON.parse(n) : null;
}
function tr(e, n) {
  return Yt(`swr.${qa(e)}`, n ? Object.assign({}, e, n) : e);
}
function Bl(e) {
  if (e.request) {
    const n = tr(e.request, e.args);
    q.config.storage.removeItem(n);
  }
}
async function ta(e, n, r, s, a) {
  const l = tr(n, s);
  r(new it({ response: qr(l) }));
  const o = await e.api(n, s, a);
  if (o.succeeded && o.response) {
    o.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const u = JSON.stringify(o.response);
    q.config.storage.setItem(l, u), r(o);
  }
  return o;
}
function na(e, n) {
  let r = null;
  return (...s) => {
    r && clearTimeout(r), r = setTimeout(() => {
      e(...s);
    }, n || 100);
  };
}
function Ht(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function zt(e, n) {
  const r = Ht(n);
  return e.reduce((s, a) => (s[a] = !r.includes(a), s), {});
}
function ql(e) {
  return new Promise((n) => setTimeout(n, e));
}
function ra(e) {
  const n = [], r = [];
  for (const s of e) {
    const a = s.toLowerCase();
    r.includes(a) || (n.push(s), r.push(a));
  }
  return n;
}
function po() {
  return {
    dateInputFormat: Xn,
    dateTimeInputFormat: Ys,
    timeInputFormat: ea,
    textInputValue: wr,
    setRef: Hl,
    unRefs: Gt,
    transition: wn,
    focusNextElement: jn,
    getTypeName: It,
    htmlTag: vt,
    htmlAttrs: xr,
    linkAttrs: Yn,
    toAppUrl: Xt,
    isPrimitive: Ut,
    isComplexType: gn,
    pushState: Br,
    scopedExpr: er,
    copyText: kr,
    fromCache: qr,
    swrCacheKey: tr,
    swrClear: Bl,
    swrApi: ta,
    asStrings: Ht,
    asOptions: zt,
    createDebounce: na,
    delay: ql,
    uniqueIgnoreCase: ra
  };
}
function xn(e) {
  const [n, r] = F(!1), [s, a] = F(), [l, o] = F(), u = Ct(Qn), d = e ?? u;
  function m({ message: y, errorCode: x, fieldName: h, errors: k }) {
    x || (x = "Exception"), k || (k = []);
    const V = h ? new Rn({
      errorCode: x,
      message: y,
      errors: [new ir({ fieldName: h, errorCode: x, message: y })]
    }) : new Rn({ errorCode: x, message: y, errors: k });
    return a(V), V;
  }
  function p({ fieldName: y, message: x, errorCode: h }) {
    h || (h = "Exception"), a((k) => {
      if (k) {
        let V = new Rn(k);
        return V.errors = [
          ...(V.errors || []).filter((H) => H.fieldName?.toLowerCase() !== y?.toLowerCase()),
          new ir({ fieldName: y, message: x, errorCode: h })
        ], V;
      } else
        return new Rn({
          errorCode: h,
          message: x,
          errors: [new ir({ fieldName: y, errorCode: h, message: x })]
        });
    });
  }
  async function L(y, x, h) {
    r(!0);
    let k = await d.api(Gt(y), x, h);
    return r(!1), o(k.response), a(k.error), k;
  }
  async function v(y, x, h) {
    r(!0);
    let k = await d.apiVoid(Gt(y), x, h);
    return r(!1), o(k.response), a(k.error), k;
  }
  async function b(y, x, h, k) {
    r(!0);
    let V = await d.apiForm(Gt(y), x, h, k);
    return r(!1), o(V.response), a(V.error), V;
  }
  async function S(y, x, h, k) {
    r(!0);
    let V = await d.apiFormVoid(Gt(y), x, h, k);
    return r(!1), o(V.response), a(V.error), V;
  }
  async function w(y, x, h, k) {
    return ta(d, y, x, h, k);
  }
  function I(y, x) {
    const [h, k] = F(new it()), V = _e(na(async (H) => {
      const A = await d.api(H);
      k(A);
    }, x?.delayMs));
    return pe(() => {
      const H = y(), A = qr(tr(H));
      A && k(new it({ response: A })), x?.delayMs === 0 ? d.api(H).then((le) => k(le)) : V.current(H);
    }, [y, x?.args, x?.method, x?.delayMs]), pe(() => {
      d.api(y(), x?.args, x?.method).then((H) => k(H));
    }, []), h;
  }
  return { setError: m, addFieldError: p, loading: n, error: s, api: L, apiVoid: v, apiForm: b, apiFormVoid: S, swr: w, swrEffect: I, unRefs: Gt };
}
function sa(e) {
  return e && e.SessionId ? Wa(e) : e;
}
function Ul(e) {
  q.user = sa(e), q.events.publish("signIn", e);
}
function Ql() {
  q.user = null, q.events.publish("signOut", null);
}
const Ur = (e) => e?.roles || [], Qr = (e) => e?.permissions || [];
function aa(e) {
  return Ur(q.user).indexOf(e) >= 0;
}
function Wl(e) {
  return Qr(q.user).indexOf(e) >= 0;
}
function Wr() {
  return aa("Admin");
}
function fn(e) {
  if (!e) return !1;
  if (!e.requiresAuth)
    return !0;
  const n = q.user;
  if (!n)
    return !1;
  if (Wr())
    return !0;
  let [r, s] = [Ur(n), Qr(n)], [a, l, o, u] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((d) => r.indexOf(d) >= 0) || o.length > 0 && !o.some((d) => r.indexOf(d) >= 0) || !l.every((d) => s.indexOf(d) >= 0) || u.length > 0 && !u.every((d) => s.indexOf(d) >= 0));
}
function Kl(e) {
  if (!e || !e.requiresAuth) return null;
  const n = q.user;
  if (!n)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Wr())
    return null;
  let [r, s] = [Ur(n), Qr(n)], [a, l, o, u] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], d = a.filter((p) => r.indexOf(p) < 0);
  if (d.length > 0)
    return `Requires ${d.map((p) => "<b>" + p + "</b>").join(", ")} Role` + (d.length > 1 ? "s" : "");
  let m = l.filter((p) => s.indexOf(p) < 0);
  return m.length > 0 ? `Requires ${m.map((p) => "<b>" + p + "</b>").join(", ")} Permission` + (m.length > 1 ? "s" : "") : o.length > 0 && !o.some((p) => r.indexOf(p) >= 0) ? `Requires any ${o.filter((p) => r.indexOf(p) < 0).map((p) => "<b>" + p + "</b>").join(", ")} Role` + (d.length > 1 ? "s" : "") : u.length > 0 && !u.every((p) => s.indexOf(p) >= 0) ? `Requires any ${u.filter((p) => s.indexOf(p) < 0).map((p) => "<b>" + p + "</b>").join(", ")} Permission` + (m.length > 1 ? "s" : "") : null;
}
function Kr() {
  const [, e] = F(0);
  pe(() => {
    const s = q.subscribe(() => e((a) => a + 1));
    return () => {
      s();
    };
  }, []);
  const n = c(() => q.user || null, [q.user]), r = c(() => q.user != null, [q.user]);
  return { signIn: Ul, signOut: Ql, user: n, toAuth: sa, isAuthenticated: r, hasRole: aa, hasPermission: Wl, isAdmin: Wr, canAccess: fn, invalidAccessMessage: Kl };
}
function lt(e, n) {
  return Array.isArray(e) ? e.indexOf(n) >= 0 : e == n || e.includes(n);
}
const Vn = {
  blue: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
  purple: "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200",
  red: "text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200",
  green: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
  sky: "text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200",
  cyan: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200",
  indigo: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
}, mt = {
  base: "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none",
  invalid: "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
  valid: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600"
}, cn = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, Jt = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, Cr = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, We = {
  panelClass(e = "slideOver") {
    return e == "card" ? cn.panelClass : Jt.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? cn.formClass : Jt.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? cn.headingClass : Jt.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? cn.subHeadingClass : Jt.subHeadingClass;
  },
  buttonsClass: "px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between",
  legendClass: "text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"
}, he = {
  getGridClass(e = "stripedRows") {
    return he.gridClass;
  },
  getGrid2Class(e = "stripedRows") {
    return lt(e, "fullWidth") ? "overflow-x-auto" : he.grid2Class;
  },
  getGrid3Class(e = "stripedRows") {
    return lt(e, "fullWidth") ? "inline-block min-w-full py-2 align-middle" : he.grid3Class;
  },
  getGrid4Class(e = "stripedRows") {
    return lt(e, "whiteBackground") ? "" : lt(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black/5" : he.grid4Class;
  },
  getTableClass(e = "stripedRows") {
    return lt(e, "fullWidth") || lt(e, "verticalLines") ? "min-w-full divide-y divide-gray-300" : he.tableClass;
  },
  getTheadClass(e = "stripedRows") {
    return lt(e, "whiteBackground") ? "" : he.theadClass;
  },
  getTheadRowClass(e = "stripedRows") {
    return he.theadRowClass + (lt(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  getTheadCellClass(e = "stripedRows") {
    return he.theadCellClass + (lt(e, "uppercaseHeadings") ? " uppercase" : "");
  },
  getTbodyClass(e = "stripedRows") {
    return (lt(e, "whiteBackground") || lt(e, "verticalLines") ? "divide-y divide-gray-200 dark:divide-gray-800" : he.tableClass) + (lt(e, "verticalLines") ? " bg-white" : "");
  },
  getTableRowClass(e = "stripedRows", n, r, s) {
    return (s ? "cursor-pointer " : "") + (r ? "bg-indigo-100 dark:bg-blue-800" : (s ? "hover:bg-yellow-50 dark:hover:bg-blue-900 " : "") + (lt(e, "stripedRows") ? n % 2 == 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black")) + (lt(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  gridClass: "flex flex-col",
  //original -margins + padding forces scroll bars when parent is w-full for no clear benefits?
  //original: -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8
  grid2Class: "",
  //original: inline-block min-w-full py-2 align-middle md:px-6 lg:px-8
  grid3Class: "inline-block min-w-full py-2 align-middle",
  grid4Class: "overflow-hidden shadow ring-1 ring-black/5 md:rounded-lg",
  tableClass: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
  theadClass: "bg-gray-50 dark:bg-gray-900",
  tableCellClass: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
  theadRowClass: "select-none",
  theadCellClass: "px-6 py-4 text-left text-sm font-medium tracking-wider whitespace-nowrap",
  toolbarButtonClass: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"
}, Zl = {
  colspans: "col-span-3 sm:col-span-3"
};
function Dt(e, n, r) {
  const s = e.filter((a) => a).join(" ");
  return r ??= q.config.filterInputClass == null ? void 0 : (a) => q.config.filterInputClass(a, n), r ? r(s) : s;
}
const vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: Vn,
  card: cn,
  dummy: Zl,
  filterClass: Dt,
  form: We,
  grid: he,
  input: mt,
  modal: Cr,
  slideOver: Jt
}, Symbol.toStringTag, { value: "Module" }));
function la({ type: e = "warn", hideIcon: n, className: r, children: s }) {
  const a = e === "info" ? "bg-blue-50 dark:bg-blue-200" : e === "error" ? "bg-red-50 dark:bg-red-200" : e === "success" ? "bg-green-50 dark:bg-green-200" : "bg-yellow-50 dark:bg-yellow-200", l = e === "info" ? "border-blue-400" : e === "error" ? "border-red-400" : e === "success" ? "border-green-400" : "border-yellow-400", o = e === "info" ? "text-blue-700" : e === "error" ? "text-red-700" : e === "success" ? "text-green-700" : "text-yellow-700";
  return /* @__PURE__ */ t("div", { className: `${a} ${l} border-l-4 p-4 ${r || ""}`, children: /* @__PURE__ */ i("div", { className: "flex items-center", children: [
    !n && /* @__PURE__ */ i("div", { className: "flex-shrink-0 mr-3", children: [
      e === "warn" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
      e === "error" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z", clipRule: "evenodd" }) }),
      e === "info" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-blue-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }) }),
      e === "success" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-green-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }) })
    ] }),
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("p", { className: `${o} text-sm`, children: s }) })
  ] }) });
}
function yo({ message: e, children: n }) {
  const [r, s] = F(!1);
  return r ? null : /* @__PURE__ */ t("div", { className: "rounded-md bg-green-50 dark:bg-green-200 p-4", role: "alert", children: /* @__PURE__ */ i("div", { className: "flex", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-green-400 dark:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) }),
    /* @__PURE__ */ t("div", { className: "ml-3", children: /* @__PURE__ */ t("h3", { className: "text-sm font-medium text-green-800", children: e ? /* @__PURE__ */ t("span", { children: e }) : n }) }),
    /* @__PURE__ */ t("div", { className: "ml-auto pl-3", children: /* @__PURE__ */ t("div", { className: "-mx-1.5 -my-1.5", children: /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        className: "inline-flex rounded-md bg-green-50 dark:bg-green-200 p-1.5 text-green-500 dark:text-green-600 hover:bg-green-100 dark:hover:bg-green-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-50 dark:ring-offset-green-900",
        onClick: () => s(!0),
        children: [
          /* @__PURE__ */ t("span", { className: "sr-only", children: "Dismiss" }),
          /* @__PURE__ */ t("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" }) })
        ]
      }
    ) }) })
  ] }) });
}
function nr({ status: e, except: n, className: r }) {
  const s = Ct(Ir), a = c(() => {
    const l = e || s?.error.value;
    return l ? Ka.call({ responseStatus: l }, n ?? []) : null;
  }, [e, s, n]);
  return a ? /* @__PURE__ */ t("div", { className: `bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${r || ""}`, children: /* @__PURE__ */ i("div", { className: "flex", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" }) }) }),
    /* @__PURE__ */ t("div", { className: "ml-3", children: /* @__PURE__ */ t("p", { className: "text-sm text-red-700 dark:text-red-200", children: a }) })
  ] }) }) : null;
}
function bo({ id: e, description: n }) {
  return n ? /* @__PURE__ */ t(
    "div",
    {
      className: "mt-2 text-sm text-gray-500",
      id: `${e}-description`,
      "aria-describedby": `${e}-description`,
      children: /* @__PURE__ */ t("div", { children: n })
    }
  ) : null;
}
function kn({ image: e, svg: n, src: r, alt: s, type: a, className: l }) {
  let o = e;
  if (a) {
    const { typeOf: m } = dt(), p = m(a);
    p || console.warn(`Type ${a} does not exist`), p?.icon ? o = p?.icon : console.warn(`Type ${a} does not have a [Svg] icon`);
  }
  let u = n || o?.svg || "";
  if (u.startsWith("<svg ")) {
    let p = Hn(u, ">").indexOf("class="), L = `${o?.cls || ""} ${l || ""}`;
    if (p == -1)
      u = `<svg class="${L}" ${u.substring(4)}`;
    else {
      const v = p + 6 + 1;
      u = `${u.substring(0, v) + L} ${u.substring(v)}`;
    }
    return /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: u } });
  } else
    return /* @__PURE__ */ t(
      "img",
      {
        className: `${o?.cls || ""} ${l || ""}`,
        src: $t(r || o?.uri),
        alt: s,
        onError: (m) => Un(m.target)
      }
    );
}
function oa({ imageClass: e = "w-6 h-6", className: n, children: r }) {
  return /* @__PURE__ */ t("div", { className: `text-2xl font-semibold text-gray-900 dark:text-gray-300 ${n || ""}`, children: /* @__PURE__ */ i("div", { className: "flex", children: [
    /* @__PURE__ */ i(
      "svg",
      {
        className: `self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 ${e}`,
        role: "status",
        viewBox: "0 0 100 101",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ t("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }),
          /* @__PURE__ */ t("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })
        ]
      }
    ),
    /* @__PURE__ */ t("span", { children: r })
  ] }) });
}
const wo = ({
  type: e = "submit",
  href: n,
  onClick: r,
  children: s,
  ...a
}) => {
  const l = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black";
  return n ? /* @__PURE__ */ t(qn, { to: n, children: /* @__PURE__ */ t("button", { type: "button", className: l, onClick: r, ...a, children: s }) }) : /* @__PURE__ */ t("button", { type: e, className: l, onClick: r, ...a, children: s });
}, an = ({
  type: e = "submit",
  color: n = "indigo",
  href: r,
  onClick: s,
  children: a,
  ...l
}) => {
  const o = {
    blue: "focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    purple: "focus:ring-purple-500 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:hover:bg-purple-400 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
    red: "focus:ring-red-500 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:hover:bg-red-400 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500",
    green: "focus:ring-green-500 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:hover:bg-green-400 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500",
    sky: "focus:ring-sky-500 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-500",
    cyan: "focus:ring-cyan-500 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500",
    indigo: "focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
  }, u = c(
    () => "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black text-white " + (o[n] || o.indigo),
    [n]
  );
  return r ? /* @__PURE__ */ t(qn, { to: r, children: /* @__PURE__ */ t("button", { type: "button", className: u, onClick: s, ...l, children: a }) }) : /* @__PURE__ */ t("button", { type: e, className: u, onClick: s, ...l, children: a });
}, Qt = ({
  type: e = "button",
  href: n,
  onClick: r,
  children: s,
  ...a
}) => {
  const l = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black";
  return n ? /* @__PURE__ */ t(qn, { to: n, children: /* @__PURE__ */ t("button", { type: e, className: l, onClick: r, ...a, children: s }) }) : /* @__PURE__ */ t("button", { type: e, className: l, onClick: r, ...a, children: s });
}, xo = ({
  color: e = "blue",
  children: n,
  href: r,
  ...s
}) => {
  const a = c(
    () => (Vn[e] || Vn.blue) + (r ? "" : " cursor-pointer"),
    [e, r]
  );
  return /* @__PURE__ */ t("a", { className: a, href: r, ...s, children: n });
};
function ko({
  homeHref: e = "/",
  homeLabel: n = "Home",
  children: r
}) {
  return /* @__PURE__ */ t("nav", { className: "flex", "aria-label": "Breadcrumb", children: /* @__PURE__ */ i("ol", { role: "list", className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("div", { children: /* @__PURE__ */ i("a", { href: e, className: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400", title: n, children: [
      /* @__PURE__ */ t("svg", { className: "h-6 w-6 flex-shrink-0", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ t("span", { className: "sr-only", children: n })
    ] }) }) }),
    r
  ] }) });
}
function Co({ href: e, title: n, children: r }) {
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ i("div", { className: "flex items-center", children: [
    /* @__PURE__ */ t("svg", { className: "h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clipRule: "evenodd" }) }),
    e ? /* @__PURE__ */ t("a", { href: e, className: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300", title: n, children: r }) : /* @__PURE__ */ t("span", { className: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300", title: n, children: r })
  ] }) });
}
function No({ title: e, children: n }) {
  return /* @__PURE__ */ i("div", { children: [
    e && /* @__PURE__ */ t("h2", { className: "text-base font-semibold text-gray-500 dark:text-gray-400", children: e }),
    /* @__PURE__ */ t("ul", { role: "list", className: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800", children: n })
  ] });
}
function Lo({
  title: e,
  href: n,
  icon: r,
  iconSvg: s,
  iconSrc: a,
  iconAlt: l,
  children: o
}) {
  return /* @__PURE__ */ i("li", { className: "relative flex items-start space-x-4 py-6", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: /* @__PURE__ */ t("span", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900", children: /* @__PURE__ */ t(kn, { className: "w-6 h-6 text-indigo-700 dark:text-indigo-300", image: r, src: a, svg: s, alt: l }) }) }),
    /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ t("h3", { className: "text-base font-medium text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ t("span", { className: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2", children: /* @__PURE__ */ i("a", { href: n, className: "focus:outline-none", children: [
        /* @__PURE__ */ t("span", { className: "absolute inset-0", "aria-hidden": "true" }),
        e
      ] }) }) }),
      /* @__PURE__ */ t("p", { className: "text-base text-gray-500", children: o })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-shrink-0 self-center", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clipRule: "evenodd" }) }) })
  ] });
}
function ia({ invalidAccess: e, alertClass: n, children: r }) {
  const { isAuthenticated: s } = Kr(), { config: a } = bn(), l = () => {
    let u = location.href.substring(location.origin.length) || "/";
    const d = Yt(a.redirectSignIn, { redirect: u });
    a.navigate(d);
  }, o = () => {
    let u = location.href.substring(location.origin.length) || "/";
    const d = Yt(a.redirectSignOut, { ReturnUrl: u });
    a.navigate(d);
  };
  return e ? /* @__PURE__ */ i("div", { children: [
    /* @__PURE__ */ t(la, { className: n, children: /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: e } }) }),
    /* @__PURE__ */ t("div", { className: "md:p-4", children: s ? /* @__PURE__ */ t(Qt, { onClick: o, children: "Sign Out" }) : /* @__PURE__ */ t(Qt, { onClick: l, children: "Sign In" }) })
  ] }) : null;
}
function Cn({
  buttonClass: e = "bg-white dark:bg-black",
  title: n = "Close",
  onClose: r
}) {
  return /* @__PURE__ */ t("div", { className: "absolute top-0 right-0 pt-4 pr-4", children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: r,
      title: n,
      className: `${e} cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black`,
      children: [
        /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ t(
          "svg",
          {
            className: "h-6 w-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })
          }
        )
      ]
    }
  ) });
}
function _l(e, n, r) {
  r ? (n(e.entering.cls + " " + e.entering.from), setTimeout(() => n(e.entering.cls + " " + e.entering.to), 0)) : (n(e.leaving.cls + " " + e.leaving.from), setTimeout(() => n(e.leaving.cls + " " + e.leaving.to), 0));
}
function Gl({
  id: e = "SlideOver",
  title: n,
  subtitle: r,
  contentClass: s = "relative mt-6 flex-1 px-4 sm:px-6",
  children: a,
  onDone: l
}) {
  const [o, u] = F(!1), [d, m] = F(""), p = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  }, L = () => u(!1);
  return pe(() => {
    if (_l(p, m, o), !o) {
      const v = setTimeout(() => l?.(), 700);
      return () => clearTimeout(v);
    }
  }, [o, l]), pe(() => {
    u(!0);
  }, []), pe(() => {
    const v = (b) => {
      b.key === "Escape" && L();
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, []), /* @__PURE__ */ i(
    "div",
    {
      id: e,
      className: "relative z-10",
      "aria-labelledby": e + "-title",
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
        /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: L, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t(
          "div",
          {
            onMouseDown: (v) => v.stopPropagation(),
            className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10",
            children: /* @__PURE__ */ t("div", { className: `panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${d}`, children: /* @__PURE__ */ t("div", { className: "flex h-full flex-col bg-white dark:bg-black shadow-xl", children: /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ i("div", { className: "flex-1", children: [
              /* @__PURE__ */ t("div", { className: "relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ i("div", { className: "flex items-start justify-between space-x-3", children: [
                /* @__PURE__ */ i("div", { className: "space-y-1", children: [
                  n && (typeof n == "string" ? /* @__PURE__ */ t("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-50", id: e + "-title", children: n }) : /* @__PURE__ */ t("div", { children: n })),
                  r && /* @__PURE__ */ t("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: r })
                ] }),
                /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Cn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: L }) })
              ] }) }),
              /* @__PURE__ */ t("div", { className: s, children: a })
            ] }) }) }) })
          }
        ) }) })
      ]
    }
  );
}
function us({
  title: e,
  subtitle: n,
  invalidAccess: r,
  alertClass: s,
  onDone: a
}) {
  return r ? /* @__PURE__ */ t(
    Gl,
    {
      title: e,
      subtitle: n,
      onDone: a,
      contentClass: "relative flex-1",
      children: /* @__PURE__ */ t(ia, { alertClass: s, invalidAccess: r })
    }
  ) : null;
}
const Zr = (e) => {
  const {
    status: n,
    id: r,
    value: s,
    inputClass: a,
    filterClass: l,
    label: o,
    labelClass: u,
    options: d,
    values: m,
    entries: p,
    onChange: L,
    className: v,
    ...b
  } = e, S = o ?? ze(ht(r)), w = c(
    () => Mt.call({ responseStatus: n }, r),
    [n, r]
  ), I = c(() => p || (m ? m.map((x) => ({ key: x, value: x })) : d ? Object.keys(d).map((x) => ({ key: x, value: d[x] })) : []), [p, m, d]), j = c(
    () => Dt(
      [
        "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none",
        w ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "shadow-sm border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
        a
      ],
      "SelectInput",
      l
    ),
    [w, a, l]
  ), y = (x) => {
    L && L(x.target.value);
  };
  return /* @__PURE__ */ i("div", { className: v, children: [
    S && /* @__PURE__ */ t(
      "label",
      {
        htmlFor: r,
        className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${u ?? ""}`,
        children: S
      }
    ),
    /* @__PURE__ */ t(
      "select",
      {
        id: r,
        name: r,
        className: j,
        value: s ?? "",
        onChange: y,
        "aria-invalid": w != null,
        "aria-describedby": `${r}-error`,
        ...Lt(b, ["class"]),
        children: I.map((x) => /* @__PURE__ */ t("option", { value: x.key, children: x.value }, x.key))
      }
    ),
    w && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${r}-error`, children: w })
  ] });
};
Zr.displayName = "SelectInput";
const _r = yt(
  (e, n) => {
    const {
      status: r,
      id: s,
      type: a = "text",
      inputClass: l,
      filterClass: o,
      label: u,
      labelClass: d,
      help: m,
      placeholder: p,
      value: L,
      onChange: v,
      className: b,
      ...S
    } = e, w = _e(null);
    bt(n, () => ({
      focus: () => {
        w.current?.focus();
      }
    }));
    const I = a || "text", j = u ?? ze(ht(s)), y = p ?? j, x = (H) => a === "range" ? H.replace("shadow-sm ", "") : H, h = c(
      () => Mt.call({ responseStatus: r }, s),
      [r, s]
    ), k = c(
      () => Dt(
        [mt.base, h ? mt.invalid : x(mt.valid), l],
        "TextInput",
        o
      ),
      [h, l, o, a]
    ), V = (H) => {
      if (v) {
        const A = wr(I, H.target.value);
        v(A);
      }
    };
    return /* @__PURE__ */ i("div", { className: b, children: [
      j && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: s,
          className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${d ?? ""}`,
          children: j
        }
      ),
      /* @__PURE__ */ i("div", { className: x("mt-1 relative"), children: [
        /* @__PURE__ */ t(
          "input",
          {
            ref: w,
            type: I,
            name: s,
            id: s,
            className: k,
            placeholder: y,
            value: wr(I, L),
            onChange: V,
            "aria-invalid": h != null,
            "aria-describedby": `${s}-error`,
            step: "any",
            ...Lt(S, ["class", "value"])
          }
        ),
        h && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ t(
          "svg",
          {
            className: "h-5 w-5 text-red-500",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ t(
              "path",
              {
                fillRule: "evenodd",
                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                clipRule: "evenodd"
              }
            )
          }
        ) })
      ] }),
      h ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${s}-error`, children: h }) : m ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${s}-description`, children: m }) : null
    ] });
  }
);
_r.displayName = "TextInput";
function ca({
  definitions: e,
  column: n,
  topLeft: r,
  onDone: s,
  onSave: a
}) {
  const l = _e(null), [o, u] = F(""), [d, m] = F(""), [p, L] = F([]), [v, b] = F({ filters: [] }), S = c(() => n.meta.isEnum === !0, [n.meta.isEnum]), w = c(
    () => wt(n.meta.type === "Nullable`1" ? n.meta.genericArgs[0] : n.meta.type),
    [n.meta.type, n.meta.genericArgs]
  ), I = c(
    () => n.meta.isEnum === !0 ? jr($s(w.name)) : [],
    [n.meta.isEnum, w]
  ), j = c(
    () => x(n.type)?.map((T) => ({ key: T.value, value: T.name })) || [],
    [n.type]
  ), y = c(() => v.filters, [v.filters]);
  pe(() => {
    b(Object.assign({}, n.settings, {
      filters: Array.from(n.settings.filters)
    }));
  }, [n.settings]), pe(() => {
    let T = n.settings.filters?.[0]?.value?.split(",") || [];
    if (T.length > 0 && w?.isEnumInt) {
      const R = T[0] && parseInt(T[0]) || 0;
      T = w.enumValues?.filter((M) => (R & parseInt(M)) > 0) || [];
    }
    L(T);
  }, [n.settings.filters, w]), pe(() => {
    u("%"), l.current?.focus();
  }, []);
  function x(T) {
    let R = e;
    return Ss(T) || (R = R.filter((M) => M.types !== "string")), R;
  }
  function h(T, R) {
    return x(T).find((M) => M.value === R);
  }
  function k() {
    if (!o) return;
    let T = h(n.type, o)?.name;
    T && (b((R) => ({
      ...R,
      filters: [...R.filters, { key: o, name: T, value: d }]
    })), u(""), m(""));
  }
  function V(T) {
    b((R) => ({
      ...R,
      filters: R.filters.filter((M, $) => $ !== T)
    }));
  }
  function H(T) {
    return Os(h(n.type, T.key), n.type, T);
  }
  function A() {
    s?.();
  }
  function le() {
    if (d && k(), S) {
      let T = Object.values(p).filter((M) => M);
      const R = {
        ...v,
        filters: T.length > 0 ? w?.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: T.map((M) => parseInt(M)).reduce((M, $) => M + $, 0).toString() }] : [{ key: "%In", name: "In", value: T.join(",") }] : []
      };
      b(R), a?.(R);
    } else
      a?.(v);
    s?.();
  }
  function G(T) {
    const R = {
      ...v,
      sort: T === v.sort ? void 0 : T
    };
    b(R), setTimeout(() => {
      a?.(R), s?.();
    }, 0);
  }
  const _ = (T, R) => {
    L((M) => R ? [...M, T] : M.filter(($) => $ !== T));
  };
  return /* @__PURE__ */ t("div", { className: "fixed z-20 inset-0 overflow-y-auto", onClick: A, children: /* @__PURE__ */ t("div", { className: "absolute", style: { top: `${r.y}px`, left: `${r.x}px` }, onClick: (T) => T.stopPropagation(), children: /* @__PURE__ */ i("div", { className: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80", children: [
    /* @__PURE__ */ i("div", { className: "p-4", children: [
      /* @__PURE__ */ t("h3", { className: "text-base font-medium mb-3 dark:text-gray-100", children: "Sort" }),
      /* @__PURE__ */ i("div", { className: "flex w-full justify-center", children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            title: "Sort Ascending",
            onClick: () => G("ASC"),
            className: `${v.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
            children: [
              /* @__PURE__ */ t("svg", { className: "w-6 h-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ i("g", { fill: "currentColor", children: [
                /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" }),
                /* @__PURE__ */ t("path", { d: "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" })
              ] }) }),
              /* @__PURE__ */ t("span", { children: "ASC" })
            ]
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            title: "Sort Descending",
            onClick: () => G("DESC"),
            className: `${v.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
            children: [
              /* @__PURE__ */ t("svg", { className: "w-6 h-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ i("g", { fill: "currentColor", children: [
                /* @__PURE__ */ t("path", { d: "M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" }),
                /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" }),
                /* @__PURE__ */ t("path", { d: "M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" })
              ] }) }),
              /* @__PURE__ */ t("span", { children: "DESC" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t("h3", { className: "text-base font-medium mt-4 mb-2", children: "Filter" }),
      S ? /* @__PURE__ */ t("div", { children: I.map((T) => /* @__PURE__ */ i("div", { className: "flex items-center", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            id: T.key,
            value: T.key,
            checked: p.includes(T.key),
            onChange: (R) => _(T.key, R.target.checked),
            className: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          }
        ),
        /* @__PURE__ */ t("label", { htmlFor: T.key, className: "ml-3", children: T.value })
      ] }, T.key)) }) : /* @__PURE__ */ i("div", { children: [
        y.map((T, R) => /* @__PURE__ */ t("div", { className: "mb-2", children: /* @__PURE__ */ i("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700", children: [
          n.name,
          " ",
          T.name,
          " ",
          H(T),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => V(R),
              className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white",
              children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
            }
          )
        ] }) }, R)),
        /* @__PURE__ */ i("div", { className: "flex", children: [
          /* @__PURE__ */ t(
            Zr,
            {
              id: "filterRule",
              inputClass: "w-32 mr-1",
              value: o,
              entries: j,
              label: "",
              onChange: (T) => u(T)
            }
          ),
          h(n.type, o)?.valueType !== "none" && /* @__PURE__ */ t(
            _r,
            {
              ref: l,
              id: "filterValue",
              inputClass: "w-32 mr-1",
              type: "text",
              value: d,
              onChange: (T) => m(T),
              label: "",
              placeholder: ""
            }
          ),
          /* @__PURE__ */ t("div", { className: "pt-1", children: /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: k,
              className: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: /* @__PURE__ */ t("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) })
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
      /* @__PURE__ */ t(an, { onClick: le, color: "red", className: "ml-2", children: "Save" }),
      /* @__PURE__ */ t(Qt, { onClick: A, children: "Cancel" })
    ] })
  ] }) }) });
}
function da({ definitions: e, columns: n, className: r, onDone: s, onChange: a }) {
  const l = c(
    () => n.filter((b) => b.settings.filters.length > 0),
    [n]
  );
  function o(b) {
    return b?.[0]?.value?.split(",");
  }
  function u(b) {
    let S = e;
    return Ss(b) || (S = S.filter((w) => w.types !== "string")), S;
  }
  function d(b, S) {
    return u(b).find((w) => w.value === S);
  }
  function m(b, S) {
    return Os(d(b.type, S.value), b.type, S);
  }
  function p(b) {
    b.settings.filters = [], a?.(b);
  }
  function L(b, S) {
    b.settings.filters.splice(S, 1), a?.(b);
  }
  function v() {
    n.forEach((b) => {
      b.settings.filters = [], a?.(b);
    }), s?.();
  }
  return /* @__PURE__ */ i("div", { className: `px-4 sm:px-6 lg:px-8 text-sm ${r || ""}`, children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap", children: l.map((b) => /* @__PURE__ */ i("fieldset", { className: "group pr-4 sm:pr-6 lg:pr-8", children: [
      /* @__PURE__ */ i("legend", { className: "flex justify-between w-full font-medium", children: [
        /* @__PURE__ */ t("span", { children: ze(b.name) }),
        /* @__PURE__ */ t("span", { className: "w-6 flex justify-end", children: /* @__PURE__ */ t("span", { className: "hidden group-hover:inline", children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => p(b),
            title: `Clear all ${ze(b.name)} filters`,
            className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white",
            children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
          }
        ) }) })
      ] }),
      b.meta.isEnum ? /* @__PURE__ */ t("div", { className: "pt-2", children: o(b.settings.filters)?.map((S) => /* @__PURE__ */ t("div", { className: "flex items-center", children: /* @__PURE__ */ t("label", { className: "ml-2", children: S }) }, S)) }) : /* @__PURE__ */ t("div", { children: b.settings.filters.map((S, w) => /* @__PURE__ */ t("div", { className: "pt-2", children: /* @__PURE__ */ i("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700", children: [
        b.name,
        " ",
        S.name,
        " ",
        m(b, S),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => L(b, w),
            className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white",
            children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
          }
        )
      ] }) }, w)) })
    ] }, b.name)) }),
    /* @__PURE__ */ t("div", { className: "flex justify-center pt-4", children: /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: v,
        className: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        children: /* @__PURE__ */ t("span", { children: "Clear All" })
      }
    ) })
  ] });
}
const Jl = et.lazy(() => Promise.resolve().then(() => to)), Xl = Bn(null);
function fs(e, n, r) {
  r ? (n(e.entering.cls + " " + e.entering.from), setTimeout(() => n(e.entering.cls + " " + e.entering.to), 0)) : (n(e.leaving.cls + " " + e.leaving.from), setTimeout(() => n(e.leaving.cls + " " + e.leaving.to), 0));
}
function ua({
  id: e = "ModalDialog",
  modalClass: n = Cr.modalClass,
  sizeClass: r = Cr.sizeClass,
  closeButtonClass: s = "bg-white dark:bg-black cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
  configureField: a,
  children: l,
  onDone: o
}) {
  const [u, d] = F(!1), [m, p] = F(""), [L, v] = F(""), [b, S] = F(), [w, I] = F(), j = {
    entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
    leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
  }, y = {
    entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
    leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
  }, x = () => d(!1);
  pe(() => {
    if (fs(j, p, u), fs(y, v, u), !u) {
      const H = setTimeout(() => o?.(), 200);
      return () => clearTimeout(H);
    }
  }, [u]), pe(() => {
    d(!0);
  }, []), pe(() => {
    const H = (A) => {
      A.key === "Escape" && x();
    };
    return window.addEventListener("keydown", H), () => window.removeEventListener("keydown", H);
  }, []);
  function h(H, A) {
    S(H), I(() => A);
  }
  async function k(H) {
    w && w(H), S(void 0), I(void 0);
  }
  const V = {
    openModal: h
  };
  return /* @__PURE__ */ t(Xl.Provider, { value: V, children: /* @__PURE__ */ i(
    "div",
    {
      id: e,
      "data-transition-for": e,
      onMouseDown: x,
      className: "relative z-10",
      "aria-labelledby": `${e}-title`,
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ t("div", { className: `fixed inset-0 bg-gray-500/75 transition-opacity ${m}` }),
        /* @__PURE__ */ t("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ t(
          "div",
          {
            className: `${n} ${r} ${L}`,
            onMouseDown: (H) => H.stopPropagation(),
            children: /* @__PURE__ */ i("div", { children: [
              /* @__PURE__ */ t("div", { className: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10", children: /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  onClick: x,
                  className: s,
                  title: "Close",
                  children: [
                    /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" }),
                    /* @__PURE__ */ t(
                      "svg",
                      {
                        className: "h-6 w-6",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ t(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M6 18L18 6M6 6l12 12"
                          }
                        )
                      }
                    )
                  ]
                }
              ) }),
              l
            ] })
          }
        ) }) }),
        b?.name === "ModalLookup" && b.ref && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
          Jl,
          {
            refInfo: b.ref,
            onDone: k,
            configureField: a
          }
        ) })
      ]
    }
  ) });
}
function fa({
  id: e = "QueryPrefs",
  columns: n,
  prefs: r,
  maxLimit: s,
  onDone: a,
  onSave: l
}) {
  const { autoQueryGridDefaults: o } = bn(), [u, d] = F({}), m = [10, 25, 50, 100, 250, 500, 1e3];
  pe(() => {
    d(Object.assign({
      take: o.take,
      selectedColumns: []
    }, r));
  }, [r, o.take]);
  function p() {
    a?.();
  }
  function L() {
    l?.(u);
  }
  const v = (w) => {
    d((I) => ({ ...I, take: parseInt(w.target.value) }));
  }, b = () => {
    d((w) => ({ ...w, selectedColumns: [] }));
  }, S = (w, I) => {
    d((j) => {
      const y = j.selectedColumns || [];
      return I ? { ...j, selectedColumns: [...y, w] } : { ...j, selectedColumns: y.filter((x) => x !== w) };
    });
  };
  return /* @__PURE__ */ i(ua, { id: e, onDone: p, sizeClass: "w-full sm:max-w-prose", children: [
    /* @__PURE__ */ t("div", { className: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: /* @__PURE__ */ t("div", { className: "", children: /* @__PURE__ */ i("div", { className: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left", children: [
      /* @__PURE__ */ t("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100", children: "Query Preferences" }),
      /* @__PURE__ */ i("div", { className: "mt-4", children: [
        /* @__PURE__ */ t("label", { htmlFor: `${e}-take`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Results per page" }),
        /* @__PURE__ */ t(
          "select",
          {
            id: `${e}-take`,
            value: u.take,
            onChange: v,
            className: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
            children: m.filter((w) => s == null || w <= s).map((w) => /* @__PURE__ */ t("option", { value: w, children: w }, w))
          }
        )
      ] }),
      /* @__PURE__ */ i("div", { className: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            id: `${e}-allColumns`,
            onClick: b,
            checked: (u.selectedColumns?.length || 0) === 0,
            className: "focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
          }
        ),
        /* @__PURE__ */ t("label", { className: "ml-3 block text-gray-700 dark:text-gray-300", htmlFor: `${e}-allColumns`, children: "View all columns" })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-4", children: /* @__PURE__ */ t("div", { className: "pb-2 px-4", children: /* @__PURE__ */ t("div", { className: "", children: n.map((w) => /* @__PURE__ */ i("div", { className: "flex items-center", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            id: w.name,
            value: w.name,
            checked: u.selectedColumns?.includes(w.name) || !1,
            onChange: (I) => S(w.name, I.target.checked),
            className: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
          }
        ),
        /* @__PURE__ */ t("label", { htmlFor: w.name, className: "ml-3", children: w.name })
      ] }, w.name)) }) }) })
    ] }) }) }),
    /* @__PURE__ */ i("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
      /* @__PURE__ */ t(an, { onClick: L, color: "red", className: "ml-2", children: "Save" }),
      /* @__PURE__ */ t(Qt, { onClick: p, children: "Cancel" })
    ] })
  ] });
}
const ma = (e) => {
  const {
    value: n,
    status: r,
    id: s,
    inputClass: a,
    filterClass: l,
    label: o,
    labelClass: u,
    help: d,
    onChange: m,
    className: p,
    ...L
  } = e, v = o ?? ze(ht(s)), b = c(
    () => Mt.call({ responseStatus: r }, s),
    [r, s]
  ), S = c(
    () => Dt(
      [
        "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800",
        a
      ],
      "CheckboxInput",
      l
    ),
    [a, l]
  ), w = (I) => {
    m && m(I.target.checked);
  };
  return /* @__PURE__ */ i("div", { className: `relative flex items-start ${p ?? ""}`, children: [
    /* @__PURE__ */ t("div", { className: "flex items-center h-5", children: /* @__PURE__ */ t(
      "input",
      {
        id: s,
        name: s,
        type: "checkbox",
        checked: n ?? !1,
        onChange: w,
        className: S,
        ...Lt(L, ["class"])
      }
    ) }),
    /* @__PURE__ */ i("div", { className: "ml-3 text-sm", children: [
      /* @__PURE__ */ t(
        "label",
        {
          htmlFor: s,
          className: `font-medium text-gray-700 dark:text-gray-300 ${u ?? ""}`,
          children: v
        }
      ),
      b ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${s}-error`, children: b }) : d ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${s}-description`, children: d }) : null
    ] })
  ] });
};
ma.displayName = "CheckboxInput";
const ha = (e) => {
  const {
    status: n,
    id: r,
    inputClass: s,
    filterClass: a,
    label: l,
    labelClass: o,
    help: u,
    placeholder: d,
    value: m,
    onChange: p,
    className: L,
    ...v
  } = e, b = l ?? ze(ht(r)), S = d ?? b, w = c(
    () => Mt.call({ responseStatus: n }, r),
    [n, r]
  ), I = c(
    () => Dt(
      [
        "shadow-sm " + mt.base,
        w ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + mt.valid,
        s
      ],
      "TextareaInput",
      a
    ),
    [w, s, a]
  ), j = (y) => {
    p && p(y.target.value);
  };
  return /* @__PURE__ */ i("div", { className: L, children: [
    b && /* @__PURE__ */ t(
      "label",
      {
        htmlFor: r,
        className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${o ?? ""}`,
        children: b
      }
    ),
    /* @__PURE__ */ t("div", { className: "mt-1 relative", children: /* @__PURE__ */ t(
      "textarea",
      {
        name: r,
        id: r,
        className: I,
        placeholder: S,
        value: m ?? "",
        onChange: j,
        "aria-invalid": w != null,
        "aria-describedby": `${r}-error`,
        ...Lt(v, ["class"])
      }
    ) }),
    w ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${r}-error`, children: w }) : u ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${r}-description`, children: u }) : null
  ] });
};
ha.displayName = "TextareaInput";
const ga = ({ input: e, value: n, api: r, onChange: s }) => {
  const a = c(() => e.type || "text", [e.type]), l = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), o = c(() => Lt(e, l), [e]), [u, d] = F(
    a === "file" ? null : n[e.id]
  );
  pe(() => {
    const v = { ...n };
    v[e.id] = u, s?.(v);
  }, [u]), c(() => {
    const v = n[e.id];
    if (e.type !== "file" || !v) return [];
    if (typeof v == "string") return [{ filePath: v, fileName: Bt(v, "/") }];
    if (!Array.isArray(v) && typeof v == "object") return v;
    if (Array.isArray(v)) {
      const b = [];
      return v.forEach((S) => {
        typeof S == "string" ? b.push({ filePath: S, fileName: Bt(S, "/") }) : typeof S == "object" && b.push(S);
      }), b;
    }
    return [];
  }, [n, e.id, e.type]);
  const m = (v) => {
    d(v);
  }, p = {
    id: e.id,
    value: u,
    onChange: m,
    status: r?.error,
    inputClass: e.css?.input,
    labelClass: e.css?.label,
    ...o
  }, L = q.component(a);
  if (L)
    return /* @__PURE__ */ t(L, { ...p });
  switch (a) {
    case "select":
      return /* @__PURE__ */ t(
        Zr,
        {
          ...p,
          entries: e.allowableEntries,
          values: e.allowableValues
        }
      );
    case "checkbox":
      return /* @__PURE__ */ t(ma, { ...p });
    case "tag":
      return /* @__PURE__ */ t("div", { children: "TagInput component not yet converted to React" });
    case "combobox":
      return /* @__PURE__ */ t("div", { children: "Combobox component not yet converted to React" });
    case "file":
      return /* @__PURE__ */ t("div", { children: "FileInput component not yet converted to React" });
    case "textarea":
      return /* @__PURE__ */ t(ha, { ...p });
    case "MarkdownInput":
      return /* @__PURE__ */ t("div", { children: "MarkdownInput component not yet converted to React" });
    default:
      return /* @__PURE__ */ t(
        _r,
        {
          type: a,
          ...p
        }
      );
  }
};
ga.displayName = "DynamicInput";
const pa = ({
  id: e,
  status: n,
  input: r,
  metadataType: s,
  value: a,
  label: l,
  labelClass: o,
  help: u,
  onChange: d
}) => {
  const { config: m } = bn(), { metadataApi: p, typeOf: L, typeProperties: v } = dt(), b = Ct(Ir), S = Ct(Qn), w = Ct(Wn), [I, j] = F(""), [y, x] = F(""), h = c(() => e || r.id, [e, r.id]), k = c(() => l ?? ze(ht(h)), [l, h]), V = c(
    () => Mt.call({ responseStatus: n ?? b?.error }, h),
    [n, b, h]
  ), H = c(() => we(a, h), [a, h]), A = c(
    () => v(s).find((M) => M.name.toLowerCase() === h.toLowerCase()),
    [s, h]
  ), le = c(
    () => L(A?.ref?.model)?.icon || m.tableIcon,
    [A, m]
  );
  function G(M) {
    return M ? r.options ? Object.assign({}, M, er(r.options, {
      input: r,
      $typeFields: v(s).map(($) => $.name),
      ...q.config.scopeWhitelist
    })) : M : null;
  }
  const _ = c(
    () => G(A?.ref ?? (r.type === "lookup" ? {
      model: s.name,
      refId: rn(s)?.name ?? "id",
      refLabel: s.properties?.find((M) => M.type === "String" && !M.isPrimaryKey)?.name
    } : null)),
    [A, r.type, s]
  );
  function T(M) {
    if (M) {
      if (w == null) {
        console.warn("No ModalProvider required by LookupInput");
        return;
      }
      w.openModal({ name: "ModalLookup", ref: M }, ($) => {
        if (console.debug("openModal", I, " -> ", $, ot.setRefValue(M, $), M), $) {
          const B = we($, M.refId);
          j(ot.setRefValue(M, $) || B);
          const N = { ...a };
          N[h] = B, d?.(N);
        }
      });
    }
  }
  function R() {
    const M = { ...a };
    M[h] = null, d?.(M), j("");
  }
  return pe(() => {
    async function M() {
      const $ = a;
      a[h] || (a[h] = null);
      const B = A, N = _;
      if (!B || !N) {
        console.warn(`No RefInfo for property '${h}'`);
        return;
      }
      j("");
      let Z = N.selfId == null ? we($, B.name) : we($, N.selfId);
      if (gn(Z) && (Z = we($, N.refId)), Z == null)
        return;
      const W = p?.operations.find((ie) => ie.dataModel?.name === N.model);
      if (console.debug("LookupInput queryOp", W), W != null) {
        const ie = we($, B.name);
        if (gn(ie)) return;
        if (j(`${ie}`), x(B.name), N.refLabel != null) {
          const ue = v(s).filter((X) => X.type === N.model);
          ue.length || console.warn(`Could not find ${N.model} Property on ${s.name}`);
          const J = ue.map((X) => we($, X.name)).filter((X) => !!X), ye = J.length <= 1 ? J[0] : J.find((X) => X[N.refId ?? "id"] === Z);
          if (ye != null) {
            let X = we(ye, N.refLabel);
            X && (j(`${X}`), ot.setValue(N.model, Z, N.refLabel, X));
          } else {
            const X = B.attributes?.some((ce) => ce.name === "Computed") === !0;
            if (S && p) {
              let ce = await ot.getOrFetchValue(
                S,
                p,
                N.model,
                N.refId,
                N.refLabel,
                X,
                Z
              );
              j(ce || `${N.model}: ${I}`);
            }
          }
        }
      }
    }
    M();
  }, []), /* @__PURE__ */ i("div", { className: "lookup-field", children: [
    /* @__PURE__ */ t("input", { type: "hidden", name: h, value: H || "" }),
    k && /* @__PURE__ */ i("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ t(
        "label",
        {
          htmlFor: h,
          className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${o ?? ""}`,
          children: k
        }
      ),
      H && /* @__PURE__ */ i("div", { className: "flex items-center", children: [
        /* @__PURE__ */ t("span", { className: "text-sm text-gray-500 dark:text-gray-400 pr-1", children: H }),
        /* @__PURE__ */ i(
          "button",
          {
            onClick: R,
            type: "button",
            title: "clear",
            className: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black",
            children: [
              /* @__PURE__ */ t("span", { className: "sr-only", children: "Clear" }),
              /* @__PURE__ */ t(
                "svg",
                {
                  className: "h-4 w-4",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: "1.5",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
                }
              )
            ]
          }
        )
      ] })
    ] }),
    _ && /* @__PURE__ */ t("div", { className: "mt-1 relative", children: /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        className: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
        onClick: () => T(_),
        "aria-haspopup": "listbox",
        "aria-expanded": "true",
        "aria-labelledby": "listbox-label",
        children: [
          /* @__PURE__ */ t("span", { className: "w-full inline-flex truncate", children: /* @__PURE__ */ i("span", { className: "text-blue-700 dark:text-blue-300 flex cursor-pointer", children: [
            /* @__PURE__ */ t(kn, { className: "mr-1 w-5 h-5", image: le }),
            /* @__PURE__ */ t("span", { children: I })
          ] }) }),
          /* @__PURE__ */ t("span", { className: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none", children: /* @__PURE__ */ t(
            "svg",
            {
              className: "h-5 w-5 text-gray-400 dark:text-gray-500",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ t(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
                  clipRule: "evenodd"
                }
              )
            }
          ) })
        ]
      }
    ) }),
    V ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${h}-error`, children: V }) : u ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${h}-description`, children: u }) : null
  ] });
};
pa.displayName = "LookupInput";
const nn = yt(({
  value: e,
  type: n,
  metaType: r,
  api: s,
  formLayout: a,
  configureField: l,
  configureFormLayout: o,
  hideSummary: u = !1,
  flexClass: d = "flex flex-1 flex-col justify-between",
  divideClass: m = "divide-y divide-gray-200 px-4 sm:px-6",
  spaceClass: p = "space-y-6 pt-6 pb-5",
  fieldsetClass: L = "grid grid-cols-12 gap-6",
  onChange: v
}, b) => {
  const { metadataApi: S, apiOf: w, typeOf: I, typeOfRef: j, createFormLayout: y, Crud: x } = dt(), h = c(() => n || It(e), [n, e]), k = c(() => r ?? I(h), [r, h, I]), V = c(
    () => j(S?.operations.find((R) => R.request.name == h)?.dataModel) || k,
    [S, h, k, j]
  ), H = C(() => {
    const R = k;
    if (!R) {
      if (a) {
        const Y = a.map((W) => {
          const ie = { name: W.id, type: cl(W.type) }, ue = Object.assign({ prop: ie }, W);
          return l && l(ue), ue;
        });
        return o && o(Y), Y;
      }
      throw new Error(`MetadataType for ${h} not found`);
    }
    const M = ft(R), $ = V, B = a ? Array.from(a) : y(R), N = [], Z = w(R.name);
    return B.forEach((Y) => {
      const W = M.find((J) => J.name == Y.name);
      if (Y.ignore) return;
      const ie = $?.properties?.find((J) => J.name.toLowerCase() == Y.name?.toLowerCase()) ?? W, ue = Object.assign({ prop: ie, op: Z }, Y);
      l && l(ue), N.push(ue);
    }), o && o(N), N;
  }, [k, a, h, ft, V, y, w, l, o]), A = c(() => H(), [H]), le = C(
    () => A.filter((R) => R.type != "hidden").map((R) => R.id),
    [A]
  ), G = C((R, M) => {
    const $ = { ...e };
    $[R] = M, v?.($);
  }, [e, v]), _ = C((R, M) => {
    G(R.id, we(M, R.id));
  }, [G]), T = C(() => {
    v?.({ ...e });
  }, [e, v]);
  return bt(b, () => ({
    forceUpdate: T,
    props: {
      value: e,
      type: n,
      metaType: r,
      api: s,
      formLayout: a,
      configureField: l,
      configureFormLayout: o,
      hideSummary: u,
      flexClass: d,
      divideClass: m,
      spaceClass: p,
      fieldsetClass: L,
      onChange: v
    },
    updateValue: G
  }), [T, e, n, r, s, a, l, o, u, d, m, p, L, v, G]), /* @__PURE__ */ i(pn, { children: [
    !u && /* @__PURE__ */ t(nr, { status: s?.error, except: le() }),
    /* @__PURE__ */ t("div", { className: d, children: /* @__PURE__ */ t("div", { className: m, children: /* @__PURE__ */ t("div", { className: p, children: /* @__PURE__ */ t("fieldset", { className: L, children: A.map((R) => /* @__PURE__ */ t(
      "div",
      {
        className: [
          "w-full",
          R.css?.field ?? (R.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (R.type == "checkbox" ? " flex items-center" : "")),
          R.type == "hidden" ? "hidden" : ""
        ].join(" "),
        children: R.type === "lookup" || R.prop?.ref != null && R.type != "file" && !R.prop.isPrimaryKey ? /* @__PURE__ */ t(
          pa,
          {
            metadataType: V,
            input: R,
            value: e,
            onChange: (M) => _(R, M),
            status: s?.error
          }
        ) : /* @__PURE__ */ t(
          ga,
          {
            input: R,
            value: e,
            onChange: v,
            api: s
          }
        )
      },
      R.id
    )) }) }) }) })
  ] });
});
nn.displayName = "AutoFormFields";
const rr = ({ icon: e = !0, text: n = "loading..." }) => /* @__PURE__ */ i("div", { className: "flex", title: "loading...", children: [
  e && /* @__PURE__ */ i("svg", { xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "24px", height: "30px", viewBox: "0 0 24 30", children: [
    /* @__PURE__ */ i("rect", { x: "0", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
      /* @__PURE__ */ t("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0s", dur: "0.6s", repeatCount: "indefinite" })
    ] }),
    /* @__PURE__ */ i("rect", { x: "8", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
      /* @__PURE__ */ t("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" })
    ] }),
    /* @__PURE__ */ i("rect", { x: "16", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
      /* @__PURE__ */ t("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" })
    ] })
  ] }),
  /* @__PURE__ */ t("span", { className: "ml-2 mt-1 text-gray-400", children: n })
] });
function Yl(e) {
  const { typeOf: n } = dt();
  function r(w) {
    return w?.format ? w.format : w?.type === "TimeSpan" || w?.type === "TimeOnly" ? { method: "time" } : null;
  }
  const s = r(e.propType), a = we(e.value, e.propType.name), l = c(() => _n(a, s, e), [a, s, e]), o = /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: l } }), u = c(() => gn(a) && Array.isArray(a) ? /* @__PURE__ */ i("span", { children: [
    /* @__PURE__ */ t("span", { className: "mr-2", children: a.length }),
    o
  ] }) : o, [a, o]), d = e.propType?.ref;
  if (!d)
    return u;
  const p = ft(e.type).find((w) => w.type === d.model);
  if (!p)
    return u;
  const L = we(e.value, p.name), v = L && d.refLabel && we(L, d.refLabel);
  if (!v)
    return u;
  const S = n(d.model)?.icon;
  return /* @__PURE__ */ i("span", { className: "flex", title: `${d.model} ${a}`, children: [
    S && /* @__PURE__ */ t(kn, { image: S, className: "w-5 h-5 mr-1" }),
    v
  ] });
}
function eo(e) {
  const {
    value: n,
    format: r,
    includeIcon: s = !0,
    includeCount: a = !0,
    maxFieldLength: l = 150,
    maxNestedFields: o = 2,
    maxNestedFieldLength: u = 30,
    ...d
  } = e, m = c(() => Array.isArray(n), [n]), p = c(() => _n(n, r, {
    includeIcon: s,
    includeCount: a,
    maxFieldLength: l,
    maxNestedFields: o,
    maxNestedFieldLength: u,
    ...d
  }), [n, r, s, a, l, o, u, d]);
  return gn(n) ? /* @__PURE__ */ i("span", { children: [
    a && m && /* @__PURE__ */ t("span", { className: "mr-2", children: n.length }),
    /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: p } })
  ] }) : /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: p } });
}
function va({
  id: e = "DataGrid",
  items: n = [],
  tableStyle: r = "stripedRows",
  type: s,
  selectedColumns: a,
  className: l,
  gridClass: o,
  grid2Class: u,
  grid3Class: d,
  grid4Class: m,
  tableClass: p,
  theadClass: L,
  tbodyClass: v,
  theadRowClass: b,
  theadCellClass: S,
  isSelected: w,
  headerTitle: I,
  headerTitles: j,
  visibleFrom: y,
  rowClass: x,
  rowStyle: h,
  onHeaderSelected: k,
  onRowSelected: V,
  children: H
}) {
  const A = _e(null), { typeOf: le, typeProperties: G } = dt(), _ = c(() => It(s), [s]), T = c(() => le(_), [_, le]), R = c(() => G(T), [T, G]), M = c(() => {
    const g = {};
    return et.Children.forEach(H, (z) => {
      et.isValidElement(z) && z.props.slot && (g[z.props.slot] = z);
    }), g;
  }, [H]), $ = (g) => {
    const z = g.toLowerCase() + "-header";
    return Object.keys(M).find((te) => te.toLowerCase() === z);
  }, B = (g) => Object.keys(M).find((z) => z.toLowerCase() === g.toLowerCase()), N = c(
    () => fr(n).filter((g) => !!(M[g] || M[g + "-header"])),
    [n, M]
  );
  function Z(g) {
    const z = j && we(j, g) || g;
    return I ? I(z) : vs(z);
  }
  function Y(g) {
    const z = g.toLowerCase();
    return R.find((te) => te.name.toLowerCase() === z);
  }
  function W(g) {
    const z = Y(g);
    return z?.format ? z.format : z?.type === "TimeSpan" || z?.type === "TimeOnly" ? { method: "time" } : null;
  }
  const ie = {
    xs: "xs:table-cell",
    sm: "sm:table-cell",
    md: "md:table-cell",
    lg: "lg:table-cell",
    xl: "xl:table-cell",
    "2xl": "2xl:table-cell",
    never: ""
  };
  function ue(g) {
    const z = y && we(y, g);
    return z && tt(ie[z], (te) => `hidden ${te}`);
  }
  const J = c(() => o ?? he.getGridClass(r), [o, r]), ye = c(() => u ?? he.getGrid2Class(r), [u, r]), X = c(() => d ?? he.getGrid3Class(r), [d, r]), ce = c(() => m ?? he.getGrid4Class(r), [m, r]), Ce = c(() => p ?? he.getTableClass(r), [p, r]), Me = c(() => v ?? he.getTbodyClass(v), [v]), ee = c(() => L ?? he.getTheadClass(r), [L, r]), be = c(() => b ?? he.getTheadRowClass(r), [b, r]), f = c(() => S ?? he.getTheadCellClass(r), [S, r]);
  function E(g, z) {
    return x ? x(g, z) : he.getTableRowClass(r, z, !!(w && w(g)), w != null);
  }
  function de(g, z) {
    return h ? h(g, z) : void 0;
  }
  const Se = c(() => {
    const g = (typeof a == "string" ? a.split(",") : a) || (N.length > 0 ? N : fr(n)), z = R.reduce((te, ne) => (te[ne.name.toLowerCase()] = ne.format, te), {});
    return g.filter((te) => z[te.toLowerCase()]?.method !== "hidden");
  }, [a, N, n, R]), P = (g, z) => {
    k && k(g, z);
  }, K = (g, z, te) => {
    V && V(z, te);
  };
  return n.length ? /* @__PURE__ */ t("div", { ref: A, className: `${J} ${l || ""}`, children: /* @__PURE__ */ t("div", { className: ye, children: /* @__PURE__ */ t("div", { className: X, children: /* @__PURE__ */ t("div", { className: ce, children: /* @__PURE__ */ i("table", { className: Ce, children: [
    /* @__PURE__ */ t("thead", { className: ee, children: /* @__PURE__ */ t("tr", { className: be, children: Se.map((g) => {
      const z = $(g);
      return /* @__PURE__ */ t(
        "td",
        {
          className: `${ue(g)} ${f} text-gray-500 dark:text-gray-400`,
          children: /* @__PURE__ */ t("div", { onClick: (te) => P(g, te), children: M[g + "-header"] ? M[g + "-header"] : z && M[z] ? M[z] : M.header ? et.cloneElement(M.header, { column: g, label: Z(g) }) : /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ t("span", { className: "mr-1 select-none", children: Z(g) }) }) })
        },
        g
      );
    }) }) }),
    /* @__PURE__ */ t("tbody", { className: Me, children: n.map((g, z) => /* @__PURE__ */ t(
      "tr",
      {
        className: E(g, z),
        style: de(g, z),
        onClick: (te) => K(z, g, te),
        children: Se.map((te) => {
          const ne = B(te);
          return /* @__PURE__ */ t(
            "td",
            {
              className: `${ue(te)} ${he.tableCellClass}`,
              children: M[te] ? et.cloneElement(M[te], g) : ne && M[ne] ? et.cloneElement(M[ne], g) : Y(te) ? /* @__PURE__ */ t(Yl, { type: T, propType: Y(te), value: g }) : /* @__PURE__ */ t(eo, { value: we(g, te), format: W(te) })
            },
            te
          );
        })
      },
      z
    )) })
  ] }) }) }) }) }) : null;
}
const dr = (e) => typeof e == "string" ? e.split(",") : e || [];
function sr({
  id: e = "ModalLookup",
  refInfo: n,
  skip: r = 0,
  prefs: s,
  selectedColumns: a,
  allowFiltering: l = !0,
  showPreferences: o = !0,
  showPagingNav: u = !0,
  showPagingInfo: d = !0,
  showResetPreferences: m = !0,
  showFiltersView: p = !0,
  toolbarButtonClass: L,
  canFilter: v,
  modelTitle: b,
  newButtonLabel: S,
  configureField: w,
  onDone: I
}) {
  const { config: j } = bn(), { metadataApi: y, filterDefinitions: x } = dt(), h = _e(window.client).current, k = j.storage, [V, H] = F({ take: 25 }), [A, le] = F(new it()), [G, _] = F(r), [T, R] = F(!1), [M, $] = F(null), [B, N] = F([]), [Z, Y] = F(!1), [W, ie] = F(null), [ue, J] = F(!1), ye = _e(null), X = c(
    () => L ?? he.toolbarButtonClass,
    [L]
  ), ce = c(() => x, [x]), Ce = 25, Me = c(() => wt(n.model), [n.model]), ee = c(() => {
    const ae = Ge().map((Re) => Re.toLowerCase()), Ne = ft(Me);
    return ae.length > 0 ? ae.map((Re) => Ne.find((qe) => qe.name.toLowerCase() === Re)).filter((Re) => Re != null) : Ne;
  }, [Me, a]), be = c(() => {
    const Q = ee.map((Ne) => Ne.name), ae = dr(V.selectedColumns).map((Ne) => Ne.toLowerCase());
    return ae.length > 0 ? Q.filter((Ne) => ae.includes(Ne.toLowerCase())) : Q;
  }, [ee, V.selectedColumns]), f = c(() => V.take ?? Ce, [V.take]), E = c(
    () => (A.response ? we(A.response, "results") : null) ?? [],
    [A.response]
  ), de = c(
    () => A.response?.total ?? E.length ?? 0,
    [A.response, E]
  ), Se = c(() => G > 0, [G]), P = c(() => G > 0, [G]), K = c(() => E.length >= f, [E, f]), g = c(() => E.length >= f, [E, f]), z = c(
    () => B.some((Q) => Q.settings.filters.length > 0 || !!Q.settings.sort),
    [B]
  ), te = c(
    () => B.map((Q) => Q.settings.filters.length).reduce((Q, ae) => Q + ae, 0),
    [B]
  ), ne = c(() => rn(Me), [Me]), Ae = c(
    () => y?.operations.find(
      (Q) => Q.dataModel?.name == n.model && Ye.isAnyQuery(Q)
    ),
    [y, n.model]
  ), Le = c(() => It(n.model), [n.model]), me = c(() => qt.forType(Le, y), [Le, y]), re = c(() => Le || Ae?.dataModel.name, [Le, Ae]), ge = c(() => b || re, [b, re]), Te = c(() => S || `New ${ge}`, [S, ge]), Pe = c(() => fn(me.Create), [me]);
  function Ge() {
    const Q = dr(a);
    return Q.length > 0 ? Q : [];
  }
  function Fe(Q, ae) {
    return he.getTableRowClass("fullWidth", ae, !1, !0);
  }
  const je = () => `${e}/ApiPrefs/${n.model}`, nt = (Q) => `Column/${e}:${n.model}.${Q}`;
  async function ve(Q) {
    let ae = G + Q;
    ae < 0 && (ae = 0);
    const Ne = Math.floor(de / f) * f;
    ae > Ne && (ae = Ne), _(ae), await De();
  }
  async function xe(Q, ae) {
    I?.(Q);
  }
  function Ke() {
    I?.(null);
  }
  function Je(Q, ae) {
    const Ne = ae.target;
    if (Ne?.tagName !== "TD") {
      const Re = Ne?.closest("TABLE")?.getBoundingClientRect(), qe = B.find((Xe) => Xe.name.toLowerCase() == Q.toLowerCase());
      if (qe && Re) {
        const Ve = (ae.target?.tagName === "DIV" ? ae.target : ae.target?.closest("DIV")).getBoundingClientRect();
        ie({
          column: qe,
          topLeft: {
            x: Math.max(Math.floor(Ve.x + 25), 343),
            y: Math.floor(115)
          }
        });
      }
    }
  }
  function $e() {
    ie(null);
  }
  async function Ee(Q) {
    const ae = W?.column;
    ae && (ae.settings = Q, k.setItem(nt(ae.name), JSON.stringify(ae.settings)), await De()), ie(null);
  }
  async function Oe(Q) {
    k.setItem(nt(Q.name), JSON.stringify(Q.settings)), await De();
  }
  async function Ue(Q) {
    Y(!1), H(Q), k.setItem(je(), JSON.stringify(Q)), await De();
  }
  async function De() {
    await O(se());
  }
  async function O(Q) {
    const ae = Ae;
    if (!ae) {
      console.error(`No Query API was found for ${n.model}`);
      return;
    }
    const Ne = mn(ae, Q), Re = ys((Ze) => {
      le((Ve) => ({ ...Ve, response: void 0, error: void 0 })), R(Ze);
    }), qe = await h.api(Ne);
    Re(), le(qe);
    const Xe = we(qe.response, "results") || [];
    !qe.succeeded || Xe.length == 0;
  }
  function se() {
    const Q = {
      include: "total",
      take: f
    }, ae = dr(V.selectedColumns || a);
    if (ae.length > 0) {
      const Re = ne;
      Re && ae.includes(Re.name) && ae.unshift(Re.name), Q.fields = ae.join(",");
    }
    const Ne = [];
    return B.forEach((Re) => {
      Re.settings.sort && Ne.push((Re.settings.sort === "DESC" ? "-" : "") + Re.name), Re.settings.filters.forEach((qe) => {
        const Xe = qe.key.replace("%", Re.name);
        Q[Xe] = qe.value;
      });
    }), typeof Q.skip > "u" && G > 0 && (Q.skip = G), Ne.length > 0 && (Q.orderBy = Ne.join(",")), Q;
  }
  async function Ie() {
    B.forEach((Q) => {
      Q.settings = { filters: [] }, k.removeItem(nt(Q.name));
    }), N([...B]), await De();
  }
  function ct() {
    J(!0);
  }
  function Be() {
    J(!1);
  }
  async function ke(Q) {
    Be(), I?.(Q);
  }
  return pe(() => {
    const Q = s || En(k.getItem(je()));
    Q && H(Q), N(ee.map((ae) => ({
      name: ae.name,
      type: ae.type,
      meta: ae,
      settings: Object.assign(
        { filters: [] },
        En(k.getItem(nt(ae.name)))
      )
    }))), isNaN(r) || _(r), De();
  }, []), n ? /* @__PURE__ */ i(ua, { id: e, onDone: Ke, configureField: w, children: [
    /* @__PURE__ */ i("div", { className: "pt-2 overflow-auto", style: { minHeight: "620px" }, children: [
      /* @__PURE__ */ i("div", { className: "mt-3 pl-5 flex flex-wrap items-center", children: [
        /* @__PURE__ */ i("h3", { className: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3", children: [
          "Select ",
          /* @__PURE__ */ t("span", { className: "hidden md:inline", children: ze(n.model) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex pb-1 sm:pb-0", children: [
          o && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
              title: `${n.model} Preferences`,
              onClick: () => Y(!Z),
              children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("g", { strokeWidth: "1.5", fill: "none", children: /* @__PURE__ */ t("path", { d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18", stroke: "currentColor" }) }) })
            }
          ),
          u && /* @__PURE__ */ i(pn, { children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${Se ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "First page",
                disabled: !Se,
                onClick: () => ve(-de),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${P ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Previous page",
                disabled: !P,
                onClick: () => ve(-f),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${K ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Next page",
                disabled: !K,
                onClick: () => ve(f),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${g ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Last page",
                disabled: !g,
                onClick: () => ve(de),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z", fill: "currentColor" }) })
              }
            )
          ] })
        ] }),
        d && /* @__PURE__ */ t("div", { className: "flex pb-1 sm:pb-0", children: /* @__PURE__ */ i("div", { className: "px-4 text-lg text-black dark:text-white", children: [
          T && /* @__PURE__ */ t("span", { children: "Querying..." }),
          E.length > 0 && /* @__PURE__ */ i("span", { children: [
            /* @__PURE__ */ t("span", { className: "hidden xl:inline", children: "Showing Results " }),
            G + 1,
            " - ",
            Math.min(G + E.length, de),
            " ",
            /* @__PURE__ */ i("span", { children: [
              " of ",
              de
            ] })
          ] }),
          !T && E.length === 0 && A.completed && /* @__PURE__ */ t("span", { children: "No Results" })
        ] }) }),
        me.Create && Pe && /* @__PURE__ */ i("div", { className: "pl-2 mt-1", children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: ct,
              title: ge,
              className: he.toolbarButtonClass,
              children: [
                /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", fill: "currentColor" }) }),
                /* @__PURE__ */ t("span", { className: "whitespace-nowrap", children: Te })
              ]
            }
          ),
          ue && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
            Gr,
            {
              ref: ye,
              type: me.Create.request.name,
              configureField: w,
              onDone: Be,
              onSave: ke
            }
          ) })
        ] }),
        z && m && /* @__PURE__ */ t("div", { className: "pl-2", children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: Ie,
            title: "Reset Preferences & Filters",
            className: X,
            children: /* @__PURE__ */ t("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" }) })
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "flex pb-1 sm:pb-0", children: p && te > 0 && /* @__PURE__ */ t("div", { className: "pl-2", children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => $(M == "filters" ? null : "filters"),
            className: X,
            "aria-expanded": "false",
            children: [
              /* @__PURE__ */ t("svg", { className: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ i("span", { className: "mr-1", children: [
                te,
                " ",
                te == 1 ? "Filter" : "Filters"
              ] }),
              M != "filters" ? /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) }) : /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" }) })
            ]
          }
        ) }) })
      ] }),
      M == "filters" && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
        da,
        {
          className: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: ce,
          columns: B,
          onDone: () => $(null),
          onChange: Oe
        }
      ) }),
      W && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
        ca,
        {
          definitions: ce,
          column: W.column,
          topLeft: W.topLeft,
          onDone: $e,
          onSave: Ee
        }
      ) }),
      A.error ? /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(nr, { status: A.error }) }) : T ? /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(oa, {}) }) : /* @__PURE__ */ t("div", { children: E.length > 0 && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
        va,
        {
          id: e,
          items: E,
          type: n.model,
          selectedColumns: be,
          tableStyle: "fullWidth",
          rowClass: Fe,
          onRowSelected: xe,
          onHeaderSelected: Je
        }
      ) }) })
    ] }),
    Z && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
      fa,
      {
        columns: ee,
        prefs: V,
        onDone: () => Y(!1),
        onSave: Ue
      }
    ) })
  ] }) : null;
}
const to = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sr
}, Symbol.toStringTag, { value: "Module" })), Gr = yt((e, n) => {
  const {
    type: r,
    formStyle: s = "slideOver",
    panelClass: a,
    formClass: l,
    headingClass: o,
    subHeadingClass: u,
    buttonsClass: d,
    heading: m,
    subHeading: p,
    autosave: L = !0,
    showLoading: v = !0,
    showCancel: b = !0,
    configureField: S,
    configureFormLayout: w,
    onDone: I,
    onSave: j,
    onError: y,
    // Slots
    heading: x,
    subheading: h,
    header: k,
    footer: V,
    children: H
  } = e, A = _e(null), [le, G] = F(1), [_, T] = F(), [R, M] = F(), { typeOf: $, typeProperties: B, Crud: N, createDto: Z, formValues: Y } = dt(), W = c(() => It(r), [r]), ie = c(() => $(W), [W, $]), ue = C(
    () => typeof r == "string" ? Z(r) : r ? new r() : null,
    [r, Z]
  ), [J, ye] = F(ue()), X = C(() => {
    G((ve) => ve + 1), A.current?.forceUpdate?.();
  }, []), ce = C((ve) => {
    ye((xe) => ({ ...xe, ...ve })), X();
  }, [X]), Ce = C((ve) => {
  }, []), Me = C((ve, xe) => {
    T(ve), M(() => xe);
  }, []), ee = C(async (ve) => {
    R && R(ve), T(void 0), M(void 0);
  }, [R]), be = c(() => ({
    openModal: Me
  }), [Me]), f = c(() => a || We.panelClass(s), [a, s]), E = c(() => l || We.formClass(s), [l, s]), de = c(() => o || We.headingClass(s), [o, s]), Se = c(() => u || We.subHeadingClass(s), [u, s]), P = c(() => d || We.buttonsClass, [d]), K = c(() => N.model(ie), [ie, N]), g = c(
    () => m || $(W)?.description || (K ? `New ${ze(K)}` : ze(W)),
    [m, W, $, K]
  ), [z, te] = F(new it()), ne = xn(), Ae = c(() => ne.loading, [ne.loading]);
  pe(() => {
    q.interceptors.has("AutoCreateForm.new") && q.interceptors.invoke("AutoCreateForm.new", { props: e, model: J });
  }, []);
  const Le = C(async (ve) => {
    ve.preventDefault();
    const xe = ve.target;
    if (!L) {
      j?.(new J.constructor(Y(xe, B(ie))));
      return;
    }
    let Ke = tt(J?.getMethod, (Ee) => typeof Ee == "function" ? Ee() : null) || "POST", Je = tt(J?.createResponse, (Ee) => typeof Ee == "function" ? Ee() : null) == null, $e;
    if (Lr.hasRequestBody(Ke)) {
      let Ee = new J.constructor(), Oe = new FormData(xe);
      Je ? $e = await ne.apiFormVoid(Ee, Oe, { jsconfig: "eccn" }) : $e = await ne.apiForm(Ee, Oe, { jsconfig: "eccn" });
    } else {
      let Ee = Y(xe, B(ie)), Oe = new J.constructor(Ee);
      Je ? $e = await ne.apiVoid(Oe, { jsconfig: "eccn" }) : $e = await ne.api(Oe, { jsconfig: "eccn" });
    }
    te($e), $e.succeeded ? (xe.reset(), j?.($e.response)) : y?.($e.error);
  }, [L, J, ne, ie, B, Y, j, y]), me = C(() => {
    I?.();
  }, [I]), [re, ge] = F(!1), [Te, Pe] = F(""), Ge = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  pe(() => {
    if (wn(Ge, { value: Te }, re), !re) {
      const ve = setTimeout(me, 700);
      return () => clearTimeout(ve);
    }
  }, [re, me]), pe(() => {
    ge(!0);
  }, []);
  const Fe = C(() => {
    s === "slideOver" ? ge(!1) : me();
  }, [s, me]);
  pe(() => {
    const ve = (xe) => {
      xe.key === "Escape" && Fe();
    };
    return window.addEventListener("keydown", ve), () => window.removeEventListener("keydown", ve);
  }, [Fe]), bt(n, () => ({
    forceUpdate: X,
    props: e,
    setModel: ce,
    formFields: A.current,
    model: J
  }), [X, e, ce, J]);
  const je = c(() => ({
    forceUpdate: X,
    props: e,
    setModel: ce,
    formFields: A.current,
    model: J
  }), [X, e, ce, J]);
  if (!ie)
    return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ i("p", { className: "text-red-700", children: [
      "Could not create form for unknown ",
      /* @__PURE__ */ t("b", { children: "type" }),
      " ",
      W
    ] }) });
  const nt = (ve) => /* @__PURE__ */ i("form", { onSubmit: Le, className: ve ? E : void 0, children: [
    !ve && /* @__PURE__ */ i("div", { className: E, children: [
      /* @__PURE__ */ i("div", { children: [
        x || /* @__PURE__ */ t("h3", { className: de, children: g }),
        h || p && /* @__PURE__ */ t("p", { className: Se, children: p }),
        !h && !p && ie?.notes && /* @__PURE__ */ t("p", { className: `notes ${Se}`, dangerouslySetInnerHTML: { __html: ie.notes } })
      ] }),
      k?.({ formInstance: je, model: J }),
      /* @__PURE__ */ t(
        nn,
        {
          ref: A,
          value: J,
          onChange: Ce,
          api: z,
          configureField: S,
          configureFormLayout: w
        },
        le
      ),
      V?.({ formInstance: je, model: J })
    ] }),
    ve && /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ i("div", { className: "flex-1", children: [
      /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ i("div", { className: "flex items-start justify-between space-x-3", children: [
        /* @__PURE__ */ i("div", { className: "space-y-1", children: [
          x || /* @__PURE__ */ t("h3", { className: de, children: g }),
          h || p && /* @__PURE__ */ t("p", { className: Se, children: p }),
          !h && !p && ie?.notes && /* @__PURE__ */ t("p", { className: `notes ${Se}`, dangerouslySetInnerHTML: { __html: ie.notes } })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Cn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: Fe }) })
      ] }) }),
      k?.({ formInstance: je, model: J }),
      /* @__PURE__ */ t(
        nn,
        {
          ref: A,
          value: J,
          onChange: Ce,
          api: z,
          configureField: S,
          configureFormLayout: w
        },
        le
      ),
      V?.({ formInstance: je, model: J })
    ] }) }),
    /* @__PURE__ */ i("div", { className: P, children: [
      /* @__PURE__ */ t("div", { children: v && Ae && /* @__PURE__ */ t(rr, {}) }),
      /* @__PURE__ */ i("div", { className: "flex justify-end", children: [
        b && /* @__PURE__ */ t(Qt, { onClick: Fe, disabled: Ae, children: "Cancel" }),
        /* @__PURE__ */ t(an, { type: "submit", className: "ml-4", disabled: Ae, children: "Save" })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ t(Wn.Provider, { value: be, children: /* @__PURE__ */ i("div", { children: [
    s === "card" ? /* @__PURE__ */ t("div", { className: f, children: nt(!1) }) : /* @__PURE__ */ i("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: Fe, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (ve) => ve.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${Te}`, children: nt(!0) }) }) }) })
    ] }),
    _?.name === "ModalLookup" && _.ref && /* @__PURE__ */ t(sr, { refInfo: _.ref, onDone: ee, configureField: S })
  ] }) });
});
Gr.displayName = "AutoCreateForm";
const ya = ({
  onDelete: e,
  children: n = "Delete",
  className: r,
  ...s
}) => {
  const [a, l] = F(!1), o = (d) => {
    d.preventDefault(), a && e && e();
  }, u = [
    "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
    a ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400",
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ i(pn, { children: [
    /* @__PURE__ */ t(
      "input",
      {
        id: "confirmDelete",
        type: "checkbox",
        className: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        checked: a,
        onChange: (d) => l(d.target.checked)
      }
    ),
    /* @__PURE__ */ t("label", { htmlFor: "confirmDelete", className: "ml-2 mr-2 select-none", children: "confirm" }),
    /* @__PURE__ */ t("span", { onClick: o, className: u, ...s, children: n })
  ] });
}, ba = yt((e, n) => {
  const {
    type: r,
    value: s,
    formStyle: a = "slideOver",
    panelClass: l,
    formClass: o,
    headingClass: u,
    subHeadingClass: d,
    buttonsClass: m,
    heading: p,
    subHeading: L,
    autosave: v = !0,
    showLoading: b = !0,
    showCancel: S,
    configureField: w,
    configureFormLayout: I,
    deleteType: j,
    onDone: y,
    onSave: x,
    onDelete: h,
    onError: k,
    // Slots
    heading: V,
    subheading: H,
    header: A,
    footer: le,
    children: G
  } = e, _ = _e(null), [T, R] = F(1), [M, $] = F(), [B, N] = F(), { typeOf: Z, apiOf: Y, typeProperties: W, createFormLayout: ie, getPrimaryKey: ue, Crud: J, createDto: ye, formValues: X } = dt(), ce = c(() => It(r), [r]), Ce = c(() => Z(ce), [ce, Z]), Me = C(
    () => typeof r == "string" ? ye(r, un(s)) : r ? new r(un(s)) : null,
    [r, s, ye]
  ), [ee, be] = F(Me()), f = C(() => {
    R((se) => se + 1), be(Me());
  }, [Me]), E = C((se) => {
    be((Ie) => ({ ...Ie, ...se }));
  }, []), de = C((se) => {
  }, []), Se = C((se, Ie) => {
    $(se), N(() => Ie);
  }, []), P = C(async (se) => {
    B && B(se), $(void 0), N(void 0);
  }, [B]), K = c(() => ({
    openModal: Se
  }), [Se]), g = c(() => l || We.panelClass(a), [l, a]), z = c(() => o || We.formClass(a), [o, a]), te = c(() => u || We.headingClass(a), [u, a]), ne = c(() => d || We.subHeadingClass(a), [d, a]), Ae = c(() => m || We.buttonsClass, [m]), Le = c(() => J.model(Ce), [Ce, J]), me = c(
    () => p || Z(ce)?.description || (Le ? `Update ${ze(Le)}` : ze(ce)),
    [p, ce, Z, Le]
  ), [re, ge] = F(new it()), [Te] = F(() => Object.assign({}, un(s))), Pe = xn(), Ge = c(() => Pe.loading, [Pe.loading]), Fe = C(() => tt(Z(J.model(Ce)), (se) => ue(se)), [Ce, Z, J, ue]);
  pe(() => {
    q.interceptors.has("AutoEditForm.new") && q.interceptors.invoke("AutoEditForm.new", { props: e, model: ee, origModel: Te });
  }, []);
  const je = C((se) => {
    const { op: Ie, prop: ct } = se;
    Ie && (J.isPatch(Ie) || J.isUpdate(Ie)) && (se.disabled = ct?.isPrimaryKey), w && w(se);
  }, [w, J]), nt = C(async (se) => {
    se.preventDefault();
    const Ie = se.target;
    if (!v) {
      x?.(new ee.constructor(X(Ie, W(Ce))));
      return;
    }
    let ct = tt(ee?.getMethod, (ae) => typeof ae == "function" ? ae() : null) || "POST", Be = tt(ee?.createResponse, (ae) => typeof ae == "function" ? ae() : null) == null, ke = Fe(), Q;
    if (Lr.hasRequestBody(ct)) {
      let ae = new ee.constructor(), Ne = we(s, ke.name), Re = new FormData(Ie);
      ke && !Array.from(Re.keys()).some((Ve) => Ve.toLowerCase() === ke.name.toLowerCase()) && Re.append(ke.name, Ne);
      let qe = [];
      const Xe = ce && Y(ce);
      if (Xe && J.isPatch(Xe)) {
        let Ve = ie(Ce), st = {};
        if (ke && (st[ke.name] = Ne), Ve.forEach((at) => {
          let St = at.id, Ft = we(Te, St);
          if (ke && ke.name.toLowerCase() === St.toLowerCase())
            return;
          let Tt = Re.get(St);
          q.interceptors.has("AutoEditForm.save.formLayout") && q.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: Ft, formLayout: Ve, input: at, newValue: Tt });
          let Wt = Tt != null, Pt = at.type === "checkbox" ? Wt !== !!Ft : at.type === "file" ? Wt : Tt != Ft;
          !Tt && !Ft && (Pt = !1), Pt && (Tt ? st[St] = Tt : at.type !== "file" && qe.push(St));
        }), q.interceptors.has("AutoEditForm.save") && q.interceptors.invoke("AutoEditForm.save", { origModel: Te, formLayout: Ve, dirtyValues: st }), Array.from(Re.keys()).filter((at) => !st[at]).forEach((at) => Re.delete(at)), Array.from(Re.keys()).filter((at) => at.toLowerCase() !== ke.name.toLowerCase()).length === 0 && qe.length === 0) {
          Ue();
          return;
        }
      }
      const Ze = qe.length > 0 ? { jsconfig: "eccn", reset: qe } : { jsconfig: "eccn" };
      Be ? Q = await Pe.apiFormVoid(ae, Re, Ze) : Q = await Pe.apiForm(ae, Re, Ze);
    } else {
      let ae = X(Ie, W(Ce));
      ke && !we(ae, ke.name) && (ae[ke.name] = we(s, ke.name));
      let Ne = new ee.constructor(ae);
      Be ? Q = await Pe.apiVoid(Ne, { jsconfig: "eccn" }) : Q = await Pe.api(Ne, { jsconfig: "eccn" });
    }
    ge(Q), Q.succeeded ? (Ie.reset(), x?.(Q.response)) : k?.(Q.error);
  }, [v, ee, Pe, Ce, W, X, x, k, s, Fe, ce, Y, J, ie, Te]), ve = C(async () => {
    let se = Fe();
    const Ie = se ? we(s, se.name) : null;
    if (!Ie) {
      console.error(`Could not find Primary Key for Type ${ce} (${Le})`);
      return;
    }
    const ct = { [se.name]: Ie }, Be = typeof j == "string" ? ye(j, ct) : j ? new j(ct) : null;
    let ke = tt(Be.createResponse, (ae) => typeof ae == "function" ? ae() : null) == null, Q;
    ke ? Q = await Pe.apiVoid(Be) : Q = await Pe.api(Be), ge(Q), Q.succeeded ? h?.(Q.response) : k?.(Q.error);
  }, [Fe, s, ce, Le, j, ye, Pe, h, k]), xe = C(() => {
    y?.();
  }, [y]), [Ke, Je] = F(!1), [$e, Ee] = F(""), Oe = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  pe(() => {
    if (wn(Oe, { value: $e }, Ke), !Ke) {
      const se = setTimeout(xe, 700);
      return () => clearTimeout(se);
    }
  }, [Ke, xe]), pe(() => {
    Je(!0);
  }, []);
  const Ue = C(() => {
    a === "slideOver" ? Je(!1) : xe();
  }, [a, xe]);
  pe(() => {
    const se = (Ie) => {
      Ie.key === "Escape" && Ue();
    };
    return window.addEventListener("keydown", se), () => window.removeEventListener("keydown", se);
  }, [Ue]), bt(n, () => ({
    forceUpdate: f,
    props: e,
    setModel: E,
    formFields: _.current,
    model: ee
  }), [f, e, E, ee]);
  const De = c(() => ({
    forceUpdate: f,
    props: e,
    setModel: E,
    formFields: _.current,
    model: ee
  }), [f, e, E, ee]);
  if (!Ce)
    return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ i("p", { className: "text-red-700", children: [
      "Could not create form for unknown ",
      /* @__PURE__ */ t("b", { children: "type" }),
      " ",
      ce
    ] }) });
  const O = (se) => /* @__PURE__ */ i("form", { onSubmit: nt, className: se ? z : void 0, children: [
    !se && /* @__PURE__ */ i("div", { className: z, children: [
      /* @__PURE__ */ i("div", { children: [
        V || /* @__PURE__ */ t("h3", { className: te, children: me }),
        H || L && /* @__PURE__ */ t("p", { className: ne, children: L }),
        !H && !L && Ce?.notes && /* @__PURE__ */ t("p", { className: `notes ${ne}`, dangerouslySetInnerHTML: { __html: Ce.notes } })
      ] }),
      A?.({ formInstance: De, model: ee }),
      /* @__PURE__ */ t(
        nn,
        {
          ref: _,
          value: ee,
          onChange: de,
          api: re,
          configureField: je,
          configureFormLayout: I
        },
        T
      ),
      le?.({ formInstance: De, model: ee })
    ] }),
    se && /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ i("div", { className: "flex-1", children: [
      /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ i("div", { className: "flex items-start justify-between space-x-3", children: [
        /* @__PURE__ */ i("div", { className: "space-y-1", children: [
          V || /* @__PURE__ */ t("h3", { className: te, children: me }),
          H || L && /* @__PURE__ */ t("p", { className: ne, children: L }),
          !H && !L && Ce?.notes && /* @__PURE__ */ t("p", { className: `notes ${ne}`, dangerouslySetInnerHTML: { __html: Ce.notes } })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Cn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: Ue }) })
      ] }) }),
      A?.({ formInstance: De, model: ee }),
      /* @__PURE__ */ t(
        nn,
        {
          ref: _,
          value: ee,
          onChange: de,
          api: re,
          configureField: je,
          configureFormLayout: I
        },
        T
      ),
      le?.({ formInstance: De, model: ee })
    ] }) }),
    /* @__PURE__ */ i("div", { className: Ae, children: [
      /* @__PURE__ */ t("div", { children: j && /* @__PURE__ */ t(ya, { onDelete: ve }) }),
      /* @__PURE__ */ t("div", { children: b && Ge && /* @__PURE__ */ t(rr, {}) }),
      /* @__PURE__ */ i("div", { className: "flex justify-end", children: [
        S && /* @__PURE__ */ t(Qt, { onClick: Ue, disabled: Ge, children: "Cancel" }),
        /* @__PURE__ */ t(an, { type: "submit", className: "ml-4", disabled: Ge, children: "Save" })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ t(Wn.Provider, { value: K, children: /* @__PURE__ */ i("div", { children: [
    a === "card" ? /* @__PURE__ */ t("div", { className: g, children: O(!1) }) : /* @__PURE__ */ i("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: Ue, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (se) => se.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${$e}`, children: O(!0) }) }) }) })
    ] }),
    M?.name === "ModalLookup" && M.ref && /* @__PURE__ */ t(sr, { refInfo: M.ref, onDone: P, configureField: w })
  ] }) });
});
ba.displayName = "AutoEditForm";
function Nr(e) {
  const {
    value: n,
    depth: r = 0,
    fieldAttrs: s,
    classes: a = (v, b, S, w, I) => w
  } = e, l = c(() => Ut(n), [n]), o = c(() => Array.isArray(n), [n]), u = (v) => vs(v), d = (v) => s ? s(v) : null, m = c(() => fr(n), [n]), p = (v) => v ? Object.keys(v).map((b) => ({ key: u(b), val: v[b] })) : [], L = c(() => _n(n), [n]);
  return l ? /* @__PURE__ */ t("div", { className: r === 0 ? "prose html-format" : "", children: /* @__PURE__ */ t("div", { dangerouslySetInnerHTML: { __html: L } }) }) : o ? /* @__PURE__ */ t("div", { className: r === 0 ? "prose html-format" : "", children: /* @__PURE__ */ t("div", { className: a("array", "div", r, he.gridClass), children: Ut(n[0]) ? /* @__PURE__ */ i("div", { children: [
    "[ ",
    n.join(", "),
    " ]"
  ] }) : /* @__PURE__ */ t("div", { className: a("array", "div", r, he.grid2Class), children: /* @__PURE__ */ t("div", { className: a("array", "div", r, he.grid3Class), children: /* @__PURE__ */ t("div", { className: a("array", "div", r, he.grid4Class), children: /* @__PURE__ */ i("table", { className: a("object", "table", r, he.tableClass), children: [
    /* @__PURE__ */ t("thead", { className: a("array", "thead", r, he.theadClass), children: /* @__PURE__ */ t("tr", { children: m.map((v) => /* @__PURE__ */ i("th", { className: a("array", "th", r, he.theadCellClass + " whitespace-nowrap"), children: [
      /* @__PURE__ */ t("b", {}),
      u(v)
    ] }, v)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((v, b) => /* @__PURE__ */ t("tr", { className: a("array", "tr", r, b % 2 === 0 ? "bg-white" : "bg-gray-50", b), children: m.map((S) => /* @__PURE__ */ t("td", { className: a("array", "td", r, he.tableCellClass), children: /* @__PURE__ */ t(
      Nr,
      {
        value: v[S],
        fieldAttrs: s,
        depth: r + 1,
        classes: a,
        ...d(S)
      }
    ) }, S)) }, b)) })
  ] }) }) }) }) }) }) : /* @__PURE__ */ t("div", { className: r === 0 ? "prose html-format" : "", children: /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("table", { className: a("object", "table", r, "table-object"), children: /* @__PURE__ */ t("tbody", { children: p(n).map((v) => /* @__PURE__ */ i("tr", { className: a("object", "tr", r, ""), children: [
    /* @__PURE__ */ t("th", { className: a("object", "th", r, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"), children: v.key }),
    /* @__PURE__ */ t("td", { className: a("object", "td", r, "align-top py-2 px-4 text-sm"), children: /* @__PURE__ */ t(
      Nr,
      {
        value: v.val,
        fieldAttrs: s,
        depth: r + 1,
        classes: a,
        ...d(v.key)
      }
    ) })
  ] }, v.key)) }) }) }) });
}
function ms(e) {
  const { value: n, imageClass: r = "w-8 h-8" } = e, { getMimeType: s } = nl(), a = c(() => {
    const l = n;
    let o = typeof n;
    const u = o === "string" && l.length ? s(l) : null;
    if (o === "string" && l.length) {
      const d = l.startsWith("https://") || l.startsWith("http://");
      if ((d || l[0] === "/") && u?.startsWith("image/"))
        return "image";
      if (d)
        return "link";
    }
    return o;
  }, [n, s]);
  return a === "link" ? /* @__PURE__ */ t("a", { href: n, className: "text-indigo-600", children: n }) : a === "image" ? /* @__PURE__ */ t("a", { href: n, title: n, className: "inline-block", children: /* @__PURE__ */ t(kn, { src: n, className: r }) }) : /* @__PURE__ */ t(Nr, { value: n });
}
function hs(e) {
  const { value: n } = e, { basic: r, complex: s } = c(() => {
    const a = Object.keys(n), l = {}, o = {};
    return a.forEach((u) => {
      const d = n[u], m = typeof d;
      d == null || m === "function" || m === "symbol" ? l[u] = `(${d == null ? "null" : m})` : m === "object" ? o[u] = d : l[u] = d;
    }), { basic: l, complex: o };
  }, [n]);
  return /* @__PURE__ */ t("table", { className: "my-2 w-full", children: /* @__PURE__ */ i("tbody", { children: [
    Object.entries(r).map(([a, l]) => /* @__PURE__ */ i("tr", { className: "leading-7", children: [
      /* @__PURE__ */ t("th", { className: "px-2 text-left align-top", children: ze(a) }),
      /* @__PURE__ */ t("td", { className: "align-top", children: /* @__PURE__ */ t(ms, { value: l }) })
    ] }, a)),
    Object.entries(s).map(([a, l]) => /* @__PURE__ */ i(et.Fragment, { children: [
      /* @__PURE__ */ t("tr", { className: "my-2 leading-7", children: /* @__PURE__ */ t("td", { colSpan: 2, className: "px-2 bg-indigo-700 text-white", children: ze(a) }) }),
      /* @__PURE__ */ t("tr", { className: "leading-7", children: /* @__PURE__ */ t("td", { colSpan: 2, className: "px-2 align-top", children: /* @__PURE__ */ t(ms, { value: l }) }) })
    ] }, a))
  ] }) });
}
const wa = (e) => {
  const {
    model: n,
    apis: r,
    typeName: s,
    done: a,
    formStyle: l = "slideOver",
    panelClass: o,
    formClass: u,
    headingClass: d,
    subHeadingClass: m,
    heading: p,
    subHeading: L,
    showLoading: v,
    deleteType: b,
    onDone: S,
    onSave: w,
    onDelete: I,
    onError: j,
    // Slots
    heading: y,
    subheading: x
  } = e, { typeOf: h, getPrimaryKey: k, Crud: V, createDto: H } = dt(), A = c(() => s ?? r.dataModel.name, [s, r]), le = c(() => h(A), [A, h]), G = c(() => o || We.panelClass(l), [o, l]), _ = c(() => u || We.formClass(l), [u, l]), T = c(() => d || We.headingClass(l), [d, l]), R = c(() => m || We.subHeadingClass(l), [m, l]), M = c(
    () => p || h(A)?.description || (n?.id ? `${ze(A)} ${n.id}` : "View " + ze(A)),
    [p, A, h, n]
  ), [$, B] = F(new it()), [N] = F(() => Object.assign({}, un(n))), Z = xn(), Y = c(() => Z.loading, [Z.loading]), W = C(() => tt(le, (be) => k(be)), [le, k]), ie = c(() => le, [le]);
  pe(() => {
    q.interceptors.has("AutoViewForm.new") && q.interceptors.invoke("AutoViewForm.new", { props: e });
  }, []);
  const ue = C(async () => {
    let be = W();
    const f = be ? we(n, be.name) : null;
    if (!f) {
      console.error(`Could not find Primary Key for Type ${A} (${ie})`);
      return;
    }
    const E = { [be.name]: f }, de = typeof b == "string" ? H(b, E) : b ? new b(E) : null;
    let Se = tt(de.createResponse, (K) => typeof K == "function" ? K() : null) == null, P;
    Se ? P = await Z.apiVoid(de) : P = await Z.api(de), B(P), P.succeeded ? I?.(P.response) : j?.(P.error);
  }, [W, n, A, ie, b, H, Z, I, j]), J = C(() => {
    a && a(), S?.();
  }, [a, S]), [ye, X] = F(!1), [ce, Ce] = F(""), Me = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  pe(() => {
    if (wn(Me, { value: ce }, ye), !ye) {
      const be = setTimeout(J, 700);
      return () => clearTimeout(be);
    }
  }, [ye, J]), pe(() => {
    X(!0);
  }, []);
  const ee = C(() => {
    l === "slideOver" ? X(!1) : J();
  }, [l, J]);
  return pe(() => {
    const be = (f) => {
      f.key === "Escape" && ee();
    };
    return window.addEventListener("keydown", be), () => window.removeEventListener("keydown", be);
  }, [ee]), A ? /* @__PURE__ */ t("div", { children: l === "card" ? /* @__PURE__ */ t("div", { className: G, children: /* @__PURE__ */ i("div", { className: _, children: [
    /* @__PURE__ */ i("div", { children: [
      y || /* @__PURE__ */ t("h3", { className: T, children: M }),
      x || L && /* @__PURE__ */ t("p", { className: R, children: L }),
      !x && !L && le?.notes && /* @__PURE__ */ t("p", { className: `notes ${R}`, dangerouslySetInnerHTML: { __html: le.notes } })
    ] }),
    /* @__PURE__ */ t(hs, { value: n })
  ] }) }) : /* @__PURE__ */ i("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
    /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
    /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: ee, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (be) => be.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${ce}`, children: /* @__PURE__ */ i("div", { className: _, children: [
      /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ i("div", { className: "flex-1", children: [
        /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ i("div", { className: "flex items-start justify-between space-x-3", children: [
          /* @__PURE__ */ i("div", { className: "space-y-1", children: [
            y || /* @__PURE__ */ t("h3", { className: T, children: M }),
            x || L && /* @__PURE__ */ t("p", { className: R, children: L }),
            !x && !L && le?.notes && /* @__PURE__ */ t("p", { className: `notes ${R}`, dangerouslySetInnerHTML: { __html: le.notes } })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Cn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: ee }) })
        ] }) }),
        /* @__PURE__ */ t(hs, { value: n })
      ] }) }),
      /* @__PURE__ */ i("div", { className: We.buttonsClass, children: [
        /* @__PURE__ */ t("div", { children: b && /* @__PURE__ */ t(ya, { onDelete: ue }) }),
        /* @__PURE__ */ t("div", { children: v && Y && /* @__PURE__ */ t(rr, {}) }),
        /* @__PURE__ */ t("div", { className: "flex justify-end" })
      ] })
    ] }) }) }) }) })
  ] }) }) : /* @__PURE__ */ t("div", { children: /* @__PURE__ */ i("p", { className: "text-red-700", children: [
    "Could not create view for unknown ",
    /* @__PURE__ */ t("b", { children: "type" }),
    " ",
    A
  ] }) });
};
wa.displayName = "AutoViewForm";
const no = et.createContext(null), ro = yt((e, n) => {
  const {
    id: r = "AutoQueryGrid",
    skip: s = 0,
    onHeaderSelected: a,
    onRowSelected: l,
    onNav: o,
    children: u,
    toolbar: d,
    toolbarButtons: m,
    createForm: p,
    editForm: L,
    viewForm: v,
    formHeader: b,
    formFooter: S,
    columnSlots: w,
    headerSlots: I,
    ...j
  } = e, y = Ct(no);
  if (!y)
    throw new Error("AutoQueryGrid must be used within a ClientContext.Provider");
  const { config: x, autoQueryGridDefaults: h } = bn(), k = h, V = x.storage, [H, A] = F([]), [le, G] = F(new it()), [_, T] = F(new it()), [R, M] = F(null), [$, B] = F(!1), [N, Z] = F(), [Y, W] = F(), [ie, ue] = F(!1), [J, ye] = F(null), [X, ce] = F(s), [Ce, Me] = F(!1), [ee, be] = F({ take: 25 }), [f, E] = F(!1), [de, Se] = F(0), P = _e(null), K = _e(null), g = "filtering,queryString,queryFilters".split(","), z = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), te = 25, ne = c(
    () => e.deny ? zt(g, e.deny) : zt(g, k.deny),
    [e.deny, k.deny]
  ), Ae = c(
    () => e.hide ? zt(z, e.hide) : zt(z, k.hide),
    [e.hide, k.hide]
  ), Le = C((D) => ne[D], [ne]), me = C((D) => Ae[D], [Ae]), re = c(() => e.tableStyle ?? k.tableStyle, [e.tableStyle, k.tableStyle]), ge = c(() => e.gridClass ?? he.getGridClass(re), [e.gridClass, re]), Te = c(() => e.grid2Class ?? he.getGrid2Class(re), [e.grid2Class, re]), Pe = c(() => e.grid3Class ?? he.getGrid3Class(re), [e.grid3Class, re]), Ge = c(() => e.grid4Class ?? he.getGrid4Class(re), [e.grid4Class, re]), Fe = c(() => e.tableClass ?? he.getTableClass(re), [e.tableClass, re]), je = c(() => e.theadClass ?? he.getTheadClass(re), [e.theadClass, re]), nt = c(() => e.theadRowClass ?? he.getTheadRowClass(re), [e.theadRowClass, re]), ve = c(() => e.theadCellClass ?? he.getTheadCellClass(re), [e.theadCellClass, re]), xe = c(() => e.toolbarButtonClass ?? he.toolbarButtonClass, [e.toolbarButtonClass]), Ke = C((D, U) => {
    if (e.rowClass) return e.rowClass(D, U);
    const fe = !!O.AnyUpdate, He = (Xe?.name ? we(D, Xe.name) : null) == N;
    return he.getTableRowClass(e.tableStyle, U, He, fe);
  }, [e.rowClass, e.tableStyle, N]), { metadataApi: Je, typeOf: $e, apiOf: Ee, filterDefinitions: Oe } = dt(), { invalidAccessMessage: Ue } = Kr(), De = c(() => It(e.type), [e.type]), O = c(() => {
    let D = Ht(e.apis);
    return D.length > 0 ? qt.from(D.map((U) => Ee(U)).filter((U) => U != null).map((U) => U)) : qt.forType(De, Je);
  }, [e.apis, De, Je, Ee]), se = c(() => De || O.AnyQuery?.dataModel.name, [De, O]), Ie = c(() => e.modelTitle || se, [e.modelTitle, se]), ct = c(() => e.newButtonLabel || `New ${Ie}`, [e.newButtonLabel, Ie]), Be = c(() => e.filterDefinitions || Oe, [e.filterDefinitions, Oe]), ke = c(() => $e(O.AnyQuery?.viewModel?.name || O.AnyQuery?.dataModel.name), [O, $e]), Q = c(() => {
    const D = Object.keys(w || {}).map((U) => U.toLowerCase());
    return ft(ke).filter((U) => D.includes(U.name.toLowerCase()) || D.includes(U.name.toLowerCase() + "-header")).map((U) => U.name);
  }, [ke, w]);
  function ae() {
    let D = Ht(e.selectedColumns);
    return D.length > 0 ? D : Q.length > 0 ? Q : [];
  }
  const Ne = c(() => {
    let U = ae().map((oe) => oe.toLowerCase());
    const fe = ft(ke);
    return U.length > 0 ? U.map((oe) => fe.find((He) => He.name.toLowerCase() === oe)).filter((oe) => oe != null) : fe;
  }, [ke, e.selectedColumns, Q]), Re = c(() => {
    let D = Ne.map((fe) => fe.name), U = Ht(ee.selectedColumns).map((fe) => fe.toLowerCase());
    return U.length > 0 ? D.filter((fe) => U.includes(fe.toLowerCase())) : D;
  }, [Ne, ee.selectedColumns]), qe = c(() => ft($e(De || O.AnyQuery?.dataModel.name)), [De, O, $e]), Xe = c(() => rn($e(De || O.AnyQuery?.dataModel.name)), [De, O, $e]), Ze = c(() => ee.take ?? te, [ee.take]), Ve = c(() => (le.response ? we(le.response, "results") : null) ?? [], [le.response]), st = c(() => (le.response?.total || Ve.length) ?? 0, [le.response?.total, Ve.length]), ar = c(() => X > 0, [X]), at = c(() => X > 0, [X]), St = c(() => Ve.length >= Ze, [Ve.length, Ze]), Ft = c(() => Ve.length >= Ze, [Ve.length, Ze]), Tt = c(
    () => H.some((D) => D.settings.filters.length > 0 || !!D.settings.sort) || ee.selectedColumns,
    [H, ee.selectedColumns]
  ), Wt = c(
    () => H.map((D) => D.settings.filters.length).reduce((D, U) => D + U, 0),
    [H]
  ), Pt = (D) => `<span class="text-yellow-700">${D}</span>`, Jr = c(() => {
    if (!Je)
      return Pt(`AppMetadata not loaded, see <a class="${Vn.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
    let U = Ht(e.apis).map((oe) => Ee(oe) == null ? oe : null).filter((oe) => oe != null);
    if (U.length > 0)
      return Pt(`Unknown API${U.length > 1 ? "s" : ""}: ${U.join(", ")}`);
    let fe = O;
    return fe.empty ? Pt("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : fe.AnyQuery ? null : Pt("No Query API was found");
  }, [Je, e.apis, O, Ee]), Xr = c(() => O.AnyQuery && Ue(O.AnyQuery), [O.AnyQuery, Ue]), Yr = c(() => O.Create && Ue(O.Create), [O.Create, Ue]), es = c(() => O.AnyUpdate && Ue(O.AnyUpdate), [O.AnyUpdate, Ue]), ka = c(() => fn(O.Create), [O.Create]);
  c(() => fn(O.AnyUpdate), [O.AnyUpdate]);
  const lr = c(() => fn(O.Delete), [O.Delete]), Kt = C(
    () => `${r}/ApiPrefs/${De || O.AnyQuery?.dataModel.name}`,
    [r, De, O]
  ), At = C(
    (D) => `Column/${r}:${De || O.AnyQuery?.dataModel.name}.${D}`,
    [r, De, O]
  ), ts = C((D) => {
    if (D) {
      if (e.canFilter)
        return e.canFilter(D);
      const U = qe.find((fe) => fe.name.toLowerCase() == D.toLowerCase());
      if (U)
        return !Ts(U);
    }
    return !1;
  }, [e.canFilter, qe]), gt = C((D) => {
    o?.(D), Le("queryString") && Br(D);
  }, [o, Le]), Nn = C(async (D) => {
    let U = X + D;
    U < 0 && (U = 0);
    const fe = Math.floor(st / Ze) * Ze;
    U > fe && (U = fe), ce(U), gt({ skip: U || void 0 }), await rt();
  }, [X, st, Ze, gt]), ln = C(async (D, U) => {
    if (W(null), Z(U), !D || !U) return;
    let fe = mn(O.AnyQuery, { [D]: U });
    const oe = await y.api(fe);
    if (oe.succeeded) {
      let He = we(oe.response, "results")?.[0];
      He || console.warn(`API ${O.AnyQuery?.request.name}(${D}:${U}) returned no results`), W(He);
    }
  }, [O, y]), Ca = C(async (D, U) => {
    l?.(D, U);
    const fe = Xe?.name, oe = fe ? we(D, fe) : null;
    !fe || !oe || (gt({ edit: oe }), ln(fe, oe));
  }, [l, Xe, gt, ln]), Na = C((D, U) => {
    if (!Le("filtering")) return;
    let fe = U.target;
    if (ts(D) && fe?.tagName !== "TD") {
      let oe = fe?.closest("TABLE")?.getBoundingClientRect(), He = H.find((Qe) => Qe.name.toLowerCase() == D.toLowerCase());
      if (He && oe) {
        let Qe = 318, ut = oe.x + Qe + 10;
        ye({
          column: He,
          topLeft: {
            x: Math.max(Math.floor(U.clientX + Qe / 2), ut),
            y: oe.y + 45
          }
        });
      }
    }
    a?.(D, U);
  }, [Le, ts, H, a]), La = C(() => {
    ye(null);
  }, []), Ma = C(async (D) => {
    let U = J?.column;
    U && (U.settings = D, V.setItem(At(U.name), JSON.stringify(U.settings)), await rt()), ye(null);
  }, [J, At, V]), Sa = C(async (D) => {
    V.setItem(At(D.name), JSON.stringify(D.settings)), await rt();
  }, [At, V]), Ta = C(async (D) => {
    ue(!1), be(D), V.setItem(Kt(), JSON.stringify(D)), await rt();
  }, [Kt, V]), ns = C((D) => {
    P.current && (Object.assign(P.current?.model, D), Mn());
  }, []), Ln = C((D) => {
    W((U) => ({ ...U, ...D })), Mn();
  }, []), Mn = C(() => {
    P.current?.forceUpdate(), K.current?.forceUpdate(), Se((D) => D + 1);
  }, []), Zt = C(() => {
    let D = {
      include: "total",
      take: Ze
    }, U = Ht(ee.selectedColumns || e.selectedColumns);
    if (U.length > 0) {
      let oe = Xe;
      oe && !U.includes(oe.name) && (U = [oe.name, ...U]);
      const He = qe, Qe = [];
      U.forEach((ut) => {
        const _t = He.find((on) => on.name.toLowerCase() == ut.toLowerCase());
        _t?.ref?.selfId && Qe.push(_t.ref.selfId), w?.[ut] && Qe.push(...He.filter((on) => on.ref?.selfId?.toLowerCase() == ut.toLowerCase()).map((on) => on.name));
      }), Qe.forEach((ut) => {
        U.includes(ut) || U.push(ut);
      }), D.fields = ra(U).join(",");
    }
    let fe = [];
    if (H.forEach((oe) => {
      oe.settings.sort && fe.push((oe.settings.sort === "DESC" ? "-" : "") + oe.name), oe.settings.filters.forEach((He) => {
        let Qe = He.key.replace("%", oe.name);
        D[Qe] = He.value;
      });
    }), e.filters && Object.keys(e.filters).forEach((oe) => {
      D[oe] = e.filters[oe];
    }), Le("queryString") && Le("queryFilters")) {
      const oe = location.search ? location.search : location.hash.includes("?") ? "?" + Fn(location.hash, "?") : "";
      let He = mr(oe);
      if (Object.keys(He).forEach((Qe) => {
        Ne.find((_t) => _t.name.toLowerCase() === Qe.toLowerCase()) && (D[Qe] = He[Qe]);
      }), typeof He.skip < "u") {
        const Qe = parseInt(He.skip);
        isNaN(Qe) || (ce(Qe), D.skip = Qe);
      }
    }
    return typeof D.skip > "u" && X > 0 && (D.skip = X), fe.length > 0 && (D.orderBy = fe.join(",")), D;
  }, [Ze, ee.selectedColumns, e.selectedColumns, e.filters, Xe, qe, H, Le, Ne, X, w]), Aa = /iPad|iPhone|iPod/.test(navigator.userAgent), Sn = C(async (D) => {
    const U = O.AnyQuery;
    if (!U) {
      console.error("No Query API was found");
      return;
    }
    let fe = mn(U, D), oe = await y.api(fe);
    ys((ut) => {
      G((_t) => ({ ..._t, response: void 0, error: void 0 })), E(ut), Aa ? setTimeout(() => G(oe), 0) : G(oe);
    })();
    let Qe = we(oe.response, "results") || [];
    !oe.succeeded || Qe.length == 0;
  }, [O, y]), rt = C(async () => {
    await Sn(Zt());
  }, [Sn, Zt]), Ra = C(async () => {
    await rt();
  }, [rt]), $a = C(() => {
    const D = rs("csv");
    kr(D), typeof window < "u" && window.open(D);
  }, []), Ia = C(() => {
    const D = rs("json");
    kr(D), Me(!0), setTimeout(() => Me(!1), 3e3);
  }, []), rs = C((D = "json") => {
    const U = Zt(), fe = `/api/${O.AnyQuery?.request.name}`, oe = Za(y.baseUrl, Yt(fe, { ...U, jsconfig: "edv" }));
    return oe.indexOf("?") >= 0 ? Hn(oe, "?") + "." + D + "?" + Fn(oe, "?") : oe + ".json";
  }, [Zt, O, y.baseUrl]), Da = C(async () => {
    H.forEach((D) => {
      D.settings = { filters: [] }, V.removeItem(At(D.name));
    }), be({ take: te }), V.removeItem(Kt()), await rt();
  }, [H, At, Kt, V, rt]), Fa = C(() => {
    B(!0), gt({ create: null });
  }, [gt]), xt = C(() => {
    W(null), Z(null), gt({ edit: void 0 });
  }, [gt]), Ot = C(() => {
    B(!1), gt({ create: void 0 });
  }, [gt]), jt = C(async () => {
    await rt(), xt();
  }, [rt, xt]), Tn = C(async () => {
    await rt(), Ot();
  }, [rt, Ot]), or = C(() => {
    G(new it()), T(new it()), B(!1), Z(null), W(null), ue(!1), ye(null), ce(s), Me(!1), be({ take: te }), E(!1);
    const D = e.prefs || En(V.getItem(Kt()));
    D && be(D), A(Ne.map((fe) => ({
      name: fe.name,
      type: fe.type,
      meta: fe,
      settings: Object.assign(
        {
          filters: []
        },
        En(V.getItem(At(fe.name)))
      )
    }))), isNaN(s) || ce(s);
    let U = Xe?.name;
    if (Le("queryString")) {
      const fe = location.search ? location.search : location.hash.includes("?") ? "?" + Fn(location.hash, "?") : "";
      let oe = mr(fe);
      typeof oe.create < "u" ? B(typeof oe.create < "u") : U && (typeof oe.edit == "string" || typeof oe.edit == "number") && ln(U, oe.edit);
    }
    e.create === !0 && B(!0), U && e.edit != null && ln(U, e.edit);
  }, [s, e.prefs, e.create, e.edit, V, Kt, Ne, At, Xe, Le, ln]);
  pe(() => {
    or(), rt(), q.interceptors.has("AutoQueryGrid.new") && q.interceptors.invoke("AutoQueryGrid.new", { props: e });
  }, []), bt(n, () => ({
    update: rt,
    search: Sn,
    createRequestArgs: Zt,
    reset: or,
    createDone: Ot,
    createSave: Tn,
    editDone: xt,
    editSave: jt,
    forceUpdate: Mn,
    setEdit: Ln,
    edit: Y,
    createForm: P.current,
    editForm: K.current,
    apiPrefs: ee,
    results: Ve,
    skip: X,
    take: Ze,
    total: st
  }), [rt, Sn, Zt, or, Ot, Tn, xt, jt, Mn, Ln, Y, ee, Ve, X, Ze, st]);
  const An = e.configureField;
  return Jr ? /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(la, { type: "warn", children: /* @__PURE__ */ t("div", { dangerouslySetInnerHTML: { __html: Jr } }) }) }) : Xr ? /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(ia, { invalidAccess: Xr }) }) : /* @__PURE__ */ i("div", { className: "pt-1", children: [
    me("forms") && $ && O.Create && /* @__PURE__ */ t("div", { children: Yr ? /* @__PURE__ */ t(
      us,
      {
        title: `Create ${Ie}`,
        invalidAccess: Yr,
        alertClass: "text-yellow-700",
        onDone: Ot
      }
    ) : p ? p({
      type: O.Create.request.name,
      configure: An,
      done: Ot,
      save: Tn
    }) : /* @__PURE__ */ i(
      Gr,
      {
        ref: P,
        type: O.Create.request.name,
        configureField: An,
        onDone: Ot,
        onSave: Tn,
        children: [
          b && b({
            form: "create",
            formInstance: P.current,
            apis: O,
            type: se,
            updateModel: ns
          }),
          S && S({
            form: "create",
            formInstance: P.current,
            apis: O,
            type: se,
            updateModel: ns
          })
        ]
      }
    ) }),
    me("forms") && Y && O.AnyUpdate && /* @__PURE__ */ t("div", { children: es ? /* @__PURE__ */ t(
      us,
      {
        title: `Update ${Ie}`,
        invalidAccess: es,
        alertClass: "text-yellow-700",
        onDone: xt
      }
    ) : L ? L({
      model: Y,
      type: O.AnyUpdate.request.name,
      deleteType: lr ? O.Delete.request.name : null,
      configure: An,
      done: xt,
      save: jt
    }) : /* @__PURE__ */ i(
      ba,
      {
        ref: K,
        value: Y,
        type: O.AnyUpdate.request.name,
        deleteType: lr ? O.Delete.request.name : null,
        configureField: An,
        onDone: xt,
        onSave: jt,
        onDelete: jt,
        children: [
          b && b({
            form: "edit",
            formInstance: K.current,
            apis: O,
            type: se,
            model: Y,
            id: N,
            updateModel: Ln
          }),
          S && S({
            form: "edit",
            formInstance: K.current,
            apis: O,
            type: se,
            model: Y,
            id: N,
            updateModel: Ln
          })
        ]
      }
    ) }),
    me("forms") && Y && !O.AnyUpdate && /* @__PURE__ */ t("div", { children: v ? v({
      model: Y,
      apis: O,
      done: xt
    }) : /* @__PURE__ */ t(
      wa,
      {
        model: Y,
        apis: O,
        deleteType: lr ? O.Delete.request.name : null,
        onDone: xt,
        onSave: jt,
        onDelete: jt
      }
    ) }),
    d || (me("toolbar") ? /* @__PURE__ */ i("div", { children: [
      ie && /* @__PURE__ */ t(
        fa,
        {
          columns: Ne,
          prefs: ee,
          onDone: () => ue(!1),
          onSave: Ta
        }
      ),
      /* @__PURE__ */ i("div", { className: "pl-1 pt-1 flex flex-wrap", children: [
        /* @__PURE__ */ i("div", { className: "flex mt-1", children: [
          me("preferences") && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
              title: `${Ie} Preferences`,
              onClick: () => ue(!ie),
              children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("g", { strokeWidth: "1.5", fill: "none", children: /* @__PURE__ */ t("path", { d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18", stroke: "currentColor" }) }) })
            }
          ),
          me("pagingNav") && /* @__PURE__ */ i(pn, { children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${ar ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "First page",
                disabled: !ar,
                onClick: () => Nn(-st),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${at ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Previous page",
                disabled: !at,
                onClick: () => Nn(-Ze),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${St ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Next page",
                disabled: !St,
                onClick: () => Nn(Ze),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${Ft ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Last page",
                disabled: !Ft,
                onClick: () => Nn(st),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z", fill: "currentColor" }) })
              }
            )
          ] })
        ] }),
        me("pagingInfo") && /* @__PURE__ */ t("div", { className: "flex mt-1", children: /* @__PURE__ */ i("div", { className: "px-4 text-lg text-black dark:text-white", children: [
          f && /* @__PURE__ */ t("span", { children: "Querying..." }),
          Ve.length > 0 && /* @__PURE__ */ i("span", { children: [
            /* @__PURE__ */ t("span", { className: "hidden xl:inline", children: "Showing Results " }),
            X + 1,
            " - ",
            Math.min(X + Ve.length, st),
            " ",
            /* @__PURE__ */ i("span", { children: [
              " of ",
              st
            ] })
          ] }),
          !f && Ve.length === 0 && le.completed && /* @__PURE__ */ t("span", { children: "No Results" })
        ] }) }),
        /* @__PURE__ */ i("div", { className: "flex flex-wrap", children: [
          me("refresh") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ t("button", { type: "button", onClick: Ra, title: "Refresh", className: xe, children: /* @__PURE__ */ t("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 0 0 5.07 8m-1.008 5a8.001 8.001 0 0 0 14.868 3" }) }) }) }),
          me("downloadCsv") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ i("button", { type: "button", onClick: $a, title: "Download CSV", className: xe, children: [
            /* @__PURE__ */ i("svg", { className: "w-5 h-5 mr-1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: [
              /* @__PURE__ */ t("path", { d: "M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z", fill: "#20744a", fillRule: "evenodd" }),
              /* @__PURE__ */ t("path", { fill: "#20744a", d: "M22.487 7.439h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ t("path", { fill: "#20744a", d: "M22.487 10.94h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ t("path", { fill: "#20744a", d: "M22.487 14.441h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ t("path", { fill: "#20744a", d: "M22.487 17.942h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ t("path", { fill: "#20744a", d: "M22.487 21.443h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ t("path", { fill: "#fff", fillRule: "evenodd", d: "M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z" })
            ] }),
            /* @__PURE__ */ t("span", { className: "text-green-900 dark:text-green-100", children: "Excel" })
          ] }) }),
          me("copyApiUrl") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ i("button", { type: "button", onClick: Ia, title: "Copy API URL", className: xe, children: [
            Ce ? /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1 text-green-600 dark:text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ i("g", { fill: "none", children: [
              /* @__PURE__ */ t("path", { d: "M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
              /* @__PURE__ */ t("path", { d: "M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
            ] }) }),
            /* @__PURE__ */ t("span", { className: "whitespace-nowrap", children: "Copy URL" })
          ] }) }),
          Tt && me("resetPreferences") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ t("button", { type: "button", onClick: Da, title: "Reset Preferences & Filters", className: xe, children: /* @__PURE__ */ t("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" }) }) }) }),
          me("filtersView") && Wt > 0 && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: () => M(R == "filters" ? null : "filters"),
              className: xe,
              "aria-expanded": "false",
              children: [
                /* @__PURE__ */ t("svg", { className: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z", clipRule: "evenodd" }) }),
                /* @__PURE__ */ i("span", { className: "mr-1", children: [
                  Wt,
                  " ",
                  Wt == 1 ? "Filter" : "Filters"
                ] }),
                R != "filters" ? /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) }) : /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" }) })
              ]
            }
          ) }),
          me("newItem") && O.Create && ka && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ i("button", { type: "button", onClick: Fa, title: Ie, className: xe, children: [
            /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", fill: "currentColor" }) }),
            /* @__PURE__ */ t("span", { className: "whitespace-nowrap", children: ct })
          ] }) }),
          m && m({ toolbarButtonClass: xe })
        ] })
      ] })
    ] }) : null),
    R == "filters" && /* @__PURE__ */ t(
      da,
      {
        className: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
        definitions: Be,
        columns: H,
        onDone: () => M(null),
        onChange: Sa
      }
    ),
    (_.error ?? le.error) && /* @__PURE__ */ t(nr, { status: _.error ?? le.error }),
    f && !_.error && !le.error && /* @__PURE__ */ t(oa, { className: "p-2" }),
    J && /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
      ca,
      {
        definitions: Be,
        column: J.column,
        topLeft: J.topLeft,
        onDone: La,
        onSave: Ma
      }
    ) }),
    Ve.length > 0 && /* @__PURE__ */ t(
      va,
      {
        id: r,
        items: Ve,
        type: e.type,
        selectedColumns: Re,
        className: "mt-1",
        tableStyle: re,
        gridClass: ge,
        grid2Class: Te,
        grid3Class: Pe,
        grid4Class: Ge,
        tableClass: Fe,
        theadClass: je,
        theadRowClass: nt,
        theadCellClass: ve,
        tbodyClass: e.tbodyClass,
        rowClass: Ke,
        onRowSelected: Ca,
        rowStyle: e.rowStyle,
        headerTitle: e.headerTitle,
        headerTitles: e.headerTitles,
        visibleFrom: e.visibleFrom,
        onHeaderSelected: Na,
        children: w && Object.keys(w).map((D) => {
          const U = w[D];
          return /* @__PURE__ */ t(et.Fragment, { children: U({}) }, D);
        })
      }
    )
  ] });
});
ro.displayName = "AutoQueryGrid";
function Mo({ column: e, isOpen: n }) {
  return /* @__PURE__ */ i("div", { className: "flex", children: [
    e?.settings?.filters?.length ? /* @__PURE__ */ t("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("g", { fill: "none", children: /* @__PURE__ */ t("path", { d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }) : /* @__PURE__ */ i("svg", { className: `w-4 h-4 transition-transform ${n ? "rotate-180" : ""}`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", children: [
      /* @__PURE__ */ t("path", { d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z", fill: "currentColor" }),
      /* @__PURE__ */ t("path", { d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z", fill: "currentColor" })
    ] }),
    e?.settings?.sort === "ASC" && /* @__PURE__ */ t("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ t("g", { fill: "none", children: /* @__PURE__ */ t("path", { d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z", fill: "currentColor" }) }) }),
    e?.settings?.sort === "DESC" && /* @__PURE__ */ t("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ t("g", { fill: "none", children: /* @__PURE__ */ t("path", { d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z", fill: "currentColor" }) }) })
  ] });
}
const So = ({
  id: e,
  type: n,
  inputClass: r,
  filterClass: s,
  label: a,
  labelClass: l,
  help: o,
  value: u,
  delimiters: d = [","],
  allowableValues: m,
  string: p,
  maxVisibleItems: L = 300,
  converter: v,
  status: b,
  onChange: S,
  ...w
}) => {
  const [I, j] = F(""), [y, x] = F(!1), [h, k] = F(), [V, H] = F(!1), A = _e(null), le = C((f) => v ? v(f) : f, [v]), G = c(() => {
    const f = le(u || []);
    return (Array.isArray(f) ? f : [f]).flatMap(
      (de) => typeof de == "string" && de.trim().length > 0 ? de.split(",").filter((Se) => Se.trim()) : []
    );
  }, [u, le]), _ = c(() => {
    const f = I.toLowerCase();
    return !m || m.length === 0 ? [] : m.length < 1e3 ? m.filter((E) => !G.includes(E) && E.toLowerCase().includes(f)) : m.filter((E) => !G.includes(E) && E.startsWith(f));
  }, [I, m, G]), T = n || "text", R = a ?? ze(ht(e)), M = c(
    () => Mt.call({ responseStatus: b }, e),
    [b, e]
  ), $ = c(() => Dt(
    [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      M ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      r
    ],
    "TagInput",
    s
  ), [M, r, s]), B = C((f) => {
    const E = p ? f.join(",") : f;
    S?.(E);
  }, [p, S]), N = C((f) => {
    B(G.filter((E) => E !== f));
  }, [G, B]), Z = (f) => {
    document.activeElement === f.currentTarget && A.current?.focus();
  }, Y = C(() => {
    x(!0), H(!0);
  }, []), W = () => {
    Y();
  }, ie = C(() => {
    if (I.length === 0) return "";
    let f = _a(I.trim(), ",");
    return f[0] === "," && (f = f.substring(1)), f = f.trim(), f.length === 0 && y && _.length > 0 ? h : f;
  }, [I, y, _, h]), ue = C((f) => {
    if (!f || f.length === 0) return;
    const E = Array.from(G);
    E.indexOf(f) === -1 && E.push(f), B(E), j(""), x(!1);
  }, [G, B]), J = C(() => {
    ue(ie()), H(!1), setTimeout(() => {
      H((f) => (f || x(!1), f));
    }, 200);
  }, [ue, ie]), ye = C(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-tag li.active`);
      f && f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, 0);
  }, [e]), X = C(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-tag li.active`);
      f && ("scrollIntoViewIfNeeded" in f ? f.scrollIntoViewIfNeeded({ behavior: "smooth", block: "nearest", inline: "nearest" }) : f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" }));
    }, 0);
  }, [e]), ce = C((f) => {
    if (f.key === "Backspace" && I.length === 0 && G.length > 0 && N(G[G.length - 1]), !(!m || m.length === 0))
      if (f.code === "Escape" || f.code === "Tab")
        x(!1);
      else if (f.code === "Home")
        k(_[0]), ye();
      else if (f.code === "End")
        k(_[_.length - 1]), ye();
      else if (f.code === "ArrowDown") {
        if (x(!0), !h)
          k(_[0]);
        else {
          const E = _.indexOf(h);
          k(E + 1 < _.length ? _[E + 1] : _[0]);
        }
        X();
      } else if (f.code === "ArrowUp") {
        if (!h)
          k(_[_.length - 1]);
        else {
          const E = _.indexOf(h);
          k(E - 1 >= 0 ? _[E - 1] : _[_.length - 1]);
        }
        X();
      } else f.code === "Enter" ? h && y ? (ue(h), f.preventDefault()) : x(!1) : x(_.length > 0);
  }, [I, G, N, m, _, h, y, ue, ye, X]), Ce = C((f) => {
    const E = ie();
    if (E && E.length > 0) {
      const de = d.some((P) => P === f.key);
      if (de && f.preventDefault(), f.key === "Enter" || f.key === "NumpadEnter" || f.key.length === 1 && de) {
        ue(E);
        return;
      }
    }
  }, [ie, d, ue]), Me = C((f) => {
    if (!f) return;
    const E = new RegExp(`\\n|\\t|${d.join("|")}`), de = Array.from(G);
    f.split(E).map((P) => P.trim()).forEach((P) => {
      de.indexOf(P) === -1 && de.push(P);
    }), B(de), j("");
  }, [d, G, B]), ee = C((f) => {
    f.preventDefault(), f.stopPropagation();
    const E = f.clipboardData?.getData("Text");
    Me(E);
  }, [Me]), be = C((f) => {
    k(f);
  }, []);
  return /* @__PURE__ */ i("div", { className: w.className, id: `${e}-tag`, onMouseMove: () => H(!0), children: [
    R && /* @__PURE__ */ t("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${l ?? ""}`, children: R }),
    /* @__PURE__ */ i("div", { className: "mt-1 relative", children: [
      /* @__PURE__ */ t("input", { type: "hidden", id: e, name: e, value: G.join(",") }),
      /* @__PURE__ */ t("button", { className: $, onClick: Z, onFocus: () => x(!0), tabIndex: -1, type: "button", children: /* @__PURE__ */ i("div", { className: "flex flex-wrap pb-1.5", children: [
        G.map((f, E) => /* @__PURE__ */ t("div", { className: "pt-1.5 pl-1", children: /* @__PURE__ */ i("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300", children: [
          f,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => N(f),
              className: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black",
              children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
            }
          )
        ] }) }, E)),
        /* @__PURE__ */ t("div", { className: "pt-1.5 pl-1 shrink", children: /* @__PURE__ */ t(
          "input",
          {
            ref: A,
            type: T,
            role: "combobox",
            "aria-controls": "options",
            "aria-expanded": "false",
            autoComplete: "off",
            spellCheck: "false",
            name: `${e}-txt`,
            id: `${e}-txt`,
            className: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
            style: { boxShadow: "none !important", width: `${I.length + 1}ch` },
            value: I,
            onChange: (f) => j(f.target.value),
            "aria-invalid": M != null,
            "aria-describedby": `${e}-error`,
            onKeyDown: ce,
            onKeyPress: Ce,
            onPaste: ee,
            onFocus: W,
            onBlur: J,
            onClick: () => x(!0),
            ...w
          }
        ) })
      ] }) }),
      y && _.length > 0 && /* @__PURE__ */ t(
        "ul",
        {
          className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeyDown: ce,
          id: `${e}-options`,
          role: "listbox",
          children: _.slice(0, L).map((f, E) => /* @__PURE__ */ t(
            "li",
            {
              className: `${f === h ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100"} relative cursor-default select-none py-2 pl-3 pr-9`,
              onMouseOver: () => be(f),
              onClick: () => ue(f),
              role: "option",
              tabIndex: -1,
              children: /* @__PURE__ */ t("span", { className: "block truncate", children: f })
            },
            E
          ))
        }
      ),
      M && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
    ] }),
    M && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: M }),
    !M && o && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: o })
  ] });
}, To = ({
  id: e,
  multiple: n,
  inputClass: r,
  filterClass: s,
  label: a,
  labelClass: l,
  help: o,
  placeholder: u,
  value: d,
  values: m,
  files: p,
  status: L,
  onChange: v,
  ...b
}) => {
  const S = _e(null), [w, I] = F(), [j, y] = F({}), [x, h] = F(() => p && p.length > 0 ? p.map(k) : m && m.length > 0 ? m.map((N) => {
    let Z = N.replace(/\\/g, "/");
    return {
      fileName: ps(Bt(Z, "/"), "."),
      filePath: Z,
      contentType: gr(Z)
    };
  }).map(k) : []);
  function k(N) {
    return N.filePath = $t(N.filePath), N;
  }
  const V = a ?? ze(ht(e)), H = u ?? V, A = c(
    () => Mt.call({ responseStatus: L }, e),
    [L, e]
  ), le = c(() => Dt(
    [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      A ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      r
    ],
    "FileInput",
    s
  ), [A, r, s]), G = C((N) => {
    const Z = N.target;
    I(""), h(Array.from(Z.files || []).map((Y) => ({
      fileName: Y.name,
      filePath: Tr(Y),
      contentLength: Y.size,
      contentType: Y.type || gr(Y.name)
    })));
  }, []), _ = C(() => {
    S.current?.click();
  }, []), T = C(
    (N) => N == null ? !1 : N.startsWith("data:") || N.startsWith("blob:"),
    []
  ), R = c(() => {
    if (x.length > 0)
      return x[0].filePath;
    let N = typeof d == "string" ? d : m && m[0];
    return N && Et($t(N)) || null;
  }, [x, d, m]), M = C(
    (N) => !N || N.startsWith("data:") || N.endsWith(".svg") ? "" : "rounded-full object-cover",
    []
  ), $ = C((N) => {
    I(br(R));
  }, [R]), B = C((N) => {
    y((Z) => ({
      ...Z,
      [Et(N)]: br(Et(N))
    }));
  }, []);
  return pe(() => () => Cs(), []), /* @__PURE__ */ i("div", { className: `flex ${n ? "flex-col" : "justify-between"}`, children: [
    /* @__PURE__ */ i("div", { className: "relative flex-grow mr-2 sm:mr-4", children: [
      V && /* @__PURE__ */ t("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${l ?? ""}`, children: V }),
      /* @__PURE__ */ i("div", { className: "block mt-2", children: [
        /* @__PURE__ */ t("span", { className: "sr-only", children: o ?? V }),
        /* @__PURE__ */ t(
          "input",
          {
            ref: S,
            type: "file",
            multiple: n,
            name: e,
            id: e,
            className: le,
            placeholder: H,
            "aria-invalid": A != null,
            "aria-describedby": `${e}-error`,
            onChange: G,
            ...b
          }
        ),
        A && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
      ] }),
      A && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: A }),
      !A && o && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: o })
    ] }),
    n ? /* @__PURE__ */ t("div", { className: "mt-3", children: /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: x.map((N, Z) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ t("td", { className: "pr-6 align-bottom pb-2", children: /* @__PURE__ */ i("div", { className: "flex w-full", title: T(N.filePath) ? "" : N.filePath, children: [
        /* @__PURE__ */ t(
          "img",
          {
            src: j[Et(N.filePath)] || $t(Et(N.filePath)),
            className: `mr-2 h-8 w-8 ${M(N.filePath)}`,
            onError: () => B(N.filePath),
            alt: ""
          }
        ),
        T(N.filePath) ? /* @__PURE__ */ t("span", { className: "overflow-hidden", children: N.fileName }) : /* @__PURE__ */ t("a", { href: $t(N.filePath || ""), target: "_blank", rel: "noopener noreferrer", className: "overflow-hidden", children: N.fileName })
      ] }) }),
      /* @__PURE__ */ t("td", { className: "align-top pb-2 whitespace-nowrap", children: N.contentLength && N.contentLength > 0 && /* @__PURE__ */ t("span", { className: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black", children: Rr(N.contentLength) }) })
    ] }, Z)) }) }) }) : /* @__PURE__ */ t("div", { children: R && /* @__PURE__ */ t("div", { className: "shrink-0 cursor-pointer", title: T(R) ? "" : R, children: /* @__PURE__ */ t(
      "img",
      {
        onClick: _,
        className: `h-16 w-16 ${M(R)}`,
        alt: `Current ${V ?? ""}`,
        src: w || $t(R),
        onError: $
      }
    ) }) })
  ] });
}, xa = yt(({
  id: e,
  label: n,
  help: r,
  placeholder: s,
  multiple: a = !1,
  required: l,
  options: o = [],
  value: u,
  match: d,
  viewCount: m = 100,
  pageSize: p = 8,
  status: L,
  onChange: v,
  children: b,
  ...S
}, w) => {
  const [I, j] = F(!1), [y, x] = F(""), [h, k] = F(null), [V, H] = F(m), [A, le] = F([]), G = _e(null), _ = n ?? ze(ht(e)), T = c(
    () => Mt.call({ responseStatus: L }, e),
    [L, e]
  ), R = c(() => [
    mt.base,
    T ? mt.invalid : mt.valid
  ].join(" "), [T]), M = c(() => y ? o.filter((E) => d(E, y)).slice(0, V) : o, [y, o, d, V]), $ = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"], B = C((f) => {
    k(f), A.indexOf(f) > Math.floor(V * 0.9) && (H((de) => de + m), ee());
  }, [A, V, m]), N = [",", `
`, "	"], Z = C((f) => {
    if (!f) return;
    const E = N.some((de) => f.includes(de));
    if (!a || !E) {
      const de = o.filter((Se) => d(Se, f));
      de.length === 1 && (Me(de[0]), j(!1), jn());
    } else if (E) {
      const de = new RegExp("\\r|\\n|\\t|,"), P = f.split(de).filter((K) => K.trim()).map((K) => o.find((g) => d(g, K))).filter((K) => !!K);
      if (P.length > 0) {
        x(""), j(!1), k(null);
        let K = Array.from(u || []);
        P.forEach((g) => {
          Ce(g) ? K = K.filter((z) => z !== g) : K.push(g);
        }), v?.(K), jn();
      }
    }
  }, [a, o, d, u, v]), Y = C((f) => {
    const E = f.clipboardData?.getData("Text");
    Z(E);
  }, [Z]), W = C((f) => {
    $.indexOf(f.code) || ce();
  }, [$]), ie = C(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-autocomplete li.active`);
      f && f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, 0);
  }, [e]), ue = C(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-autocomplete li.active`);
      f && ("scrollIntoViewIfNeeded" in f ? f.scrollIntoViewIfNeeded({ behavior: "smooth", block: "nearest", inline: "nearest" }) : f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" }));
    }, 0);
  }, [e]), J = C((f) => {
    if (!(f.shiftKey || f.ctrlKey || f.altKey)) {
      if (!I) {
        f.code === "ArrowDown" && (j(!0), k(A[0]));
        return;
      }
      if (f.code === "Escape")
        I && (f.stopPropagation(), j(!1));
      else if (f.code === "Tab")
        j(!1);
      else if (f.code === "Home")
        k(A[0]), ie();
      else if (f.code === "End")
        k(A[A.length - 1]), ie();
      else if (f.code === "ArrowDown") {
        if (!h)
          k(A[0]);
        else {
          const E = A.indexOf(h);
          k(E + 1 < A.length ? A[E + 1] : A[0]);
        }
        ue();
      } else if (f.code === "ArrowUp") {
        if (!h)
          k(A[A.length - 1]);
        else {
          const E = A.indexOf(h);
          k(E - 1 >= 0 ? A[E - 1] : A[A.length - 1]);
        }
        ue();
      } else f.code === "Enter" && (h ? (Me(h), a || (f.preventDefault(), jn())) : j(!1));
    }
  }, [I, A, h, a, ie, ue]), ye = C((f) => {
    j(f), f && (ee(), G.current?.focus());
  }, []);
  bt(w, () => ({
    toggle: ye
  }), [ye]);
  const X = C(() => {
    !a && u ? (j((f) => !f), I || ee()) : ce();
  }, [a, u, I]), ce = C(() => {
    j(!0), ee();
  }, []), Ce = C((f) => Array.isArray(u) && u.indexOf(f) >= 0, [u]), Me = C((f) => {
    if (x(""), j(!1), a) {
      let E = Array.from(u || []);
      Ce(f) ? E = E.filter((de) => de !== f) : E.push(f), k(null), v?.(E);
    } else
      v?.(f);
  }, [a, u, Ce, v]), ee = C(() => {
    le(M);
  }, [M]);
  pe(() => {
    ee();
  }, [y, ee]);
  const be = C((f) => typeof f == "string" ? b ? b({ key: f, value: f }) : /* @__PURE__ */ t("span", { className: "block truncate", children: f }) : b ? b(f) : /* @__PURE__ */ t("span", { className: "block truncate", children: JSON.stringify(f) }), [b]);
  return /* @__PURE__ */ i("div", { id: `${e}-autocomplete`, children: [
    _ && /* @__PURE__ */ t("label", { htmlFor: `${e}-text`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: _ }),
    /* @__PURE__ */ i("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: G,
          id: `${e}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autoComplete: "off",
          spellCheck: "false",
          value: y,
          onChange: (f) => x(f.target.value),
          className: R,
          placeholder: a || !u ? s : "",
          readOnly: !a && !!u && !I,
          onKeyDown: J,
          onKeyUp: W,
          onClick: X,
          onPaste: Y,
          required: !1,
          ...S
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => ye(!I),
          className: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabIndex: -1,
          children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z", clipRule: "evenodd" }) })
        }
      ),
      I && /* @__PURE__ */ t(
        "ul",
        {
          className: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeyDown: J,
          id: `${e}-options`,
          role: "listbox",
          children: A.map((f, E) => /* @__PURE__ */ i(
            "li",
            {
              className: `${f === h ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100"} relative cursor-default select-none py-2 pl-3 pr-9`,
              onMouseOver: () => B(f),
              onClick: () => Me(f),
              role: "option",
              tabIndex: -1,
              children: [
                be(f),
                Ce(f) && /* @__PURE__ */ t("span", { className: `absolute inset-y-0 right-0 flex items-center pr-4 ${f === h ? "text-white" : "text-indigo-600"}`, children: /* @__PURE__ */ t("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z", clipRule: "evenodd" }) }) })
              ]
            },
            E
          ))
        }
      ),
      !I && !a && u && /* @__PURE__ */ t("div", { onKeyDown: J, className: "h-8 -mt-8 ml-3 pt-0.5 pointer-events-none", children: be(u) }),
      T && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", tabIndex: -1, children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
    ] }),
    T && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: T }),
    !T && r && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: r })
  ] });
});
xa.displayName = "Autocomplete";
const so = yt(({
  id: e,
  value: n,
  multiple: r,
  options: s,
  values: a,
  entries: l,
  onChange: o,
  children: u,
  ...d
}, m) => {
  const p = _e(null), [L, v] = F(null), b = c(
    () => r ?? Array.isArray(n),
    [r, n]
  ), S = C((h, k) => !k || h.value.toLowerCase().includes(k.toLowerCase()), []), w = c(
    () => l || (a ? a.map((h) => ({ key: h, value: h })) : s ? Object.keys(s).map((h) => ({ key: h, value: s[h] })) : []),
    [l, a, s]
  ), I = C((h) => {
    o?.(h);
  }, [o]), j = C(() => {
    let h = n && typeof n == "object" && !Array.isArray(n) ? n.key : n;
    h == null || h === "" ? v(b ? [] : null) : typeof h == "string" ? v(w.find((k) => k.key === h) || null) : Array.isArray(h) && v(w.filter((k) => h.includes(k.key)));
  }, [n, b, w]);
  pe(() => {
    j();
  }, [j]);
  const y = c(
    () => L == null ? "" : Array.isArray(L) ? L.map((h) => encodeURIComponent(h.key)).join(",") : L.key,
    [L]
  ), x = C((h) => {
    p.current?.toggle(h);
  }, []);
  return bt(m, () => ({
    toggle: x
  }), [x]), /* @__PURE__ */ i(pn, { children: [
    /* @__PURE__ */ t("input", { type: "hidden", id: e, name: e, value: y }),
    /* @__PURE__ */ t(
      xa,
      {
        ref: p,
        id: e,
        options: w,
        match: S,
        multiple: b,
        value: L,
        onChange: I,
        ...d,
        children: ({ key: h, value: k }) => /* @__PURE__ */ t("span", { className: "block truncate", children: k })
      }
    )
  ] });
});
so.displayName = "Combobox";
const ao = yt((e, n) => {
  const {
    type: r,
    value: s,
    heading: a,
    subHeading: l,
    showLoading: o = !0,
    jsconfig: u = "eccn,edv",
    formStyle: d = "card",
    metaType: m,
    configureField: p,
    configureFormLayout: L,
    panelClass: v,
    bodyClass: b,
    formClass: S,
    innerFormClass: w,
    headerClass: I = "p-6",
    buttonsClass: j,
    headingClass: y,
    subHeadingClass: x,
    submitLabel: h = "Submit",
    allowSubmit: k,
    onSuccess: V,
    onError: H,
    onDone: A,
    onChange: le,
    // Slots
    heading: G,
    subheading: _,
    header: T,
    footer: R,
    buttons: M,
    leftbuttons: $,
    rightbuttons: B
  } = e, N = _e(null), [Z, Y] = F(1), W = _e(null), [ie, ue] = F(), [J, ye] = F(), X = xn(), { typeOf: ce, Crud: Ce, createDto: Me } = dt(), [ee, be] = F(new it()), f = c(() => v || We.panelClass(d), [v, d]), E = c(() => S || (d === "card" ? "shadow sm:rounded-md" : Jt.formClass), [S, d]), de = c(() => y || We.headingClass(d), [y, d]), Se = c(() => x || We.subHeadingClass(d), [x, d]), P = c(() => typeof j == "string" ? j : We.buttonsClass, [j]), K = c(() => r ? It(r) : s?.getTypeName ? s.getTypeName() : null, [r, s]), g = c(() => m ?? ce(K), [m, K, ce]), z = C(() => typeof r == "string" ? Me(r) : r ? new r() : s, [r, Me, s]), te = C(() => s || z(), [s, z]), [ne, Ae] = F(te()), Le = c(() => X.loading, [X.loading]), me = c(() => a ?? (g?.description || ze(K)), [a, g, K]), re = C(() => {
    Y((O) => O + 1), Ae(te());
  }, [te]), ge = C(async (O) => {
    Ae((se) => ({ ...se, ...O })), re(), await new Promise((se) => setTimeout(se, 0));
  }, [re]), Te = C((O, se) => {
    ue(O), ye(() => se);
  }, []), Pe = C(async (O) => {
    J && J(O), ue(void 0), ye(void 0);
  }, [J]), Ge = c(() => ({
    openModal: Te
  }), [Te]), Fe = C(async (O) => {
    if (!O || O.tagName !== "FORM") {
      console.error("Not a valid form", O);
      return;
    }
    const se = z();
    let Ie = tt(se?.getMethod, (ke) => typeof ke == "function" ? ke() : null) || "POST", ct = tt(se?.createResponse, (ke) => typeof ke == "function" ? ke() : null) == null, Be;
    if (Lr.hasRequestBody(Ie)) {
      let ke = new se.constructor(), Q = new FormData(O);
      ct ? Be = await X.apiFormVoid(ke, Q, { jsconfig: u }) : Be = await X.apiForm(ke, Q, { jsconfig: u });
    } else {
      let ke = new se.constructor(Ga(ne));
      console.debug("AutoForm.submit", ke), ct ? Be = await X.apiVoid(ke, { jsconfig: u }) : Be = await X.api(ke, { jsconfig: u });
    }
    be(Be), Be.succeeded ? (V?.(Be.response), Oe()) : H?.(Be.error);
  }, [z, X, u, ne, V, H]), je = C(async () => {
    W.current && await Fe(W.current);
  }, [Fe]), nt = C((O) => {
    le?.(O);
  }, [le]), ve = C(() => {
    A?.();
  }, [A]), [xe, Ke] = F(!1), [Je, $e] = F(""), Ee = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  pe(() => {
    if (wn(Ee, { value: Je }, xe), !xe) {
      const O = setTimeout(ve, 700);
      return () => clearTimeout(O);
    }
  }, [xe, ve]), pe(() => {
    Ke(!0);
  }, []);
  const Oe = C(() => {
    d === "slideOver" ? Ke(!1) : ve();
  }, [d, ve]);
  pe(() => {
    const O = (se) => {
      se.key === "Escape" && Oe();
    };
    return window.addEventListener("keydown", O), () => window.removeEventListener("keydown", O);
  }, [Oe]), bt(n, () => ({
    forceUpdate: re,
    props: e,
    setModel: ge,
    formFields: N.current,
    submit: je,
    close: Oe,
    model: ne
  }), [re, e, ge, je, Oe, ne]);
  const Ue = c(() => ({
    forceUpdate: re,
    props: e,
    setModel: ge,
    formFields: N.current,
    submit: je,
    close: Oe,
    model: ne
  }), [re, e, ge, je, Oe, ne]);
  if (!g)
    return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ i("p", { className: "text-red-700", children: [
      "Could not create form for unknown ",
      /* @__PURE__ */ t("b", { children: "type" }),
      " ",
      K
    ] }) });
  const De = (O) => /* @__PURE__ */ i(
    "form",
    {
      ref: W,
      onSubmit: (se) => {
        se.preventDefault(), Fe(se.target);
      },
      autoComplete: "off",
      className: O ? E : w,
      children: [
        /* @__PURE__ */ t("div", { className: O ? "flex min-h-0 flex-1 flex-col overflow-auto" : b, children: /* @__PURE__ */ i("div", { className: O ? "flex-1" : void 0, children: [
          O && /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ i("div", { className: "flex items-start justify-between space-x-3", children: [
            /* @__PURE__ */ i("div", { className: "space-y-1", children: [
              G || /* @__PURE__ */ t("h3", { className: de, children: me }),
              _ || l && /* @__PURE__ */ t("p", { className: Se, children: l }),
              !_ && !l && g?.notes && /* @__PURE__ */ t("p", { className: `notes ${Se}`, dangerouslySetInnerHTML: { __html: g.notes } })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Cn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: Oe }) })
          ] }) }),
          !O && /* @__PURE__ */ i("div", { className: I, children: [
            G || /* @__PURE__ */ t("h3", { className: de, children: me }),
            _ || l && /* @__PURE__ */ t("p", { className: Se, children: l }),
            !_ && !l && g?.notes && /* @__PURE__ */ t("p", { className: `notes ${Se}`, dangerouslySetInnerHTML: { __html: g.notes } })
          ] }),
          T?.({ instance: Ue, model: ne }),
          /* @__PURE__ */ t("input", { type: "submit", className: "hidden" }),
          /* @__PURE__ */ t(
            nn,
            {
              ref: N,
              type: r,
              value: ne,
              onChange: nt,
              api: ee,
              configureField: p,
              configureFormLayout: L
            },
            Z
          ),
          R?.({ instance: Ue, model: ne })
        ] }) }),
        M || /* @__PURE__ */ i("div", { className: P, children: [
          /* @__PURE__ */ t("div", { children: $?.({ instance: Ue, model: ne }) }),
          /* @__PURE__ */ t("div", { children: o && Le && /* @__PURE__ */ t(rr, {}) }),
          /* @__PURE__ */ i("div", { className: "flex justify-end", children: [
            /* @__PURE__ */ t("div", {}),
            O && /* @__PURE__ */ t(Qt, { onClick: Oe, disabled: Le, children: "Cancel" }),
            /* @__PURE__ */ t(
              an,
              {
                type: "submit",
                className: O ? "ml-4" : void 0,
                disabled: Le || (k ? !k(ne) : !1),
                children: h
              }
            ),
            B?.({ instance: Ue, model: ne })
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ t(Wn.Provider, { value: Ge, children: /* @__PURE__ */ i("div", { children: [
    d === "card" ? /* @__PURE__ */ t("div", { className: f, children: De(!1) }) : /* @__PURE__ */ i("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: Oe, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (O) => O.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${Je}`, children: De(!0) }) }) }) })
    ] }),
    ie?.name === "ModalLookup" && ie.ref && /* @__PURE__ */ t(sr, { refInfo: ie.ref, onDone: Pe, configureField: p })
  ] }) });
});
ao.displayName = "AutoForm";
function Ao(e) {
  const {
    tabs: n,
    id: r = "tabs",
    param: s = "tab",
    label: a,
    selected: l,
    tabClass: o = "",
    bodyClass: u = "p-4",
    url: d = !0,
    clearQuery: m = !1
  } = e, p = c(() => Object.keys(n), [n]), L = (y) => a ? a(y) : ze(y), [v, b] = F(""), S = (y) => {
    if (b(y), d) {
      const x = p[0];
      Br({ tab: y === x ? void 0 : y }, m);
    }
  }, w = (y) => v === y, I = c(() => `${100 / Object.keys(n).length}%`, [n]);
  pe(() => {
    let y = l || Object.keys(n)[0];
    if (d) {
      const x = location.search ? location.search : location.hash.includes("?") ? "?" + Fn(location.hash, "?") : "", k = mr(x)[s];
      k && (y = k);
    }
    b(y);
  }, [l, n, d, s]);
  const j = v ? n[v] : null;
  return /* @__PURE__ */ i("div", { children: [
    /* @__PURE__ */ i("div", { className: "sm:hidden", children: [
      /* @__PURE__ */ t("label", { htmlFor: r, className: "sr-only", children: "Select a tab" }),
      /* @__PURE__ */ t(
        "select",
        {
          id: r,
          name: r,
          className: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          value: v,
          onChange: (y) => S(y.target.value),
          children: p.map((y) => /* @__PURE__ */ t("option", { value: y, children: L(y) }, y))
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "hidden sm:block", children: /* @__PURE__ */ t("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ t("nav", { className: "-mb-px flex", "aria-label": "Tabs", children: p.map((y) => /* @__PURE__ */ t(
      "a",
      {
        href: "#",
        onClick: (x) => {
          x.preventDefault(), S(y);
        },
        style: { width: I },
        className: w(y) ? `border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm ${o}` : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm ${o}`,
        children: L(y)
      },
      y
    )) }) }) }),
    /* @__PURE__ */ t("div", { className: u, children: j && /* @__PURE__ */ t(j, {}) })
  ] });
}
function Ro() {
  const e = typeof document < "u" ? document.documentElement : null, n = () => e?.classList.contains("dark") ?? !1, [r, s] = F(n());
  return pe(() => {
    s(n());
  }, []), /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: "bg-gray-200 dark:bg-gray-700 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
      role: "switch",
      "aria-checked": "false",
      onClick: () => {
        const l = n(), o = !l;
        console.log("Toggle clicked - current:", l, "new:", o), o ? e?.classList.add("dark") : e?.classList.remove("dark"), console.log("After toggle - classList:", e?.classList.toString()), s(o), typeof localStorage < "u" && (localStorage.setItem("color-scheme", o ? "dark" : "light"), console.log("Saved to localStorage:", o ? "dark" : "light"));
      },
      children: /* @__PURE__ */ i(
        "span",
        {
          className: `${r ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`,
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: `${r ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`,
                "aria-hidden": "true",
                children: /* @__PURE__ */ t(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-4 w-4 text-gray-400",
                    preserveAspectRatio: "xMidYMid meet",
                    viewBox: "0 0 32 32",
                    children: /* @__PURE__ */ t(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ t(
              "span",
              {
                className: `${r ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`,
                "aria-hidden": "true",
                children: /* @__PURE__ */ t(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-4 w-4 text-indigo-600",
                    preserveAspectRatio: "xMidYMid meet",
                    viewBox: "0 0 32 32",
                    children: /* @__PURE__ */ t(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
                      }
                    )
                  }
                )
              }
            )
          ]
        }
      )
    }
  );
}
const lo = ({ value: e, formLayout: n, api: r, hideSummary: s, onChange: a }) => /* @__PURE__ */ t("div", { className: "space-y-6", children: n?.map((l) => /* @__PURE__ */ i("div", { children: [
  /* @__PURE__ */ t("label", { htmlFor: l.id, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: l.label || l.id }),
  /* @__PURE__ */ t(
    "input",
    {
      type: l.type?.toLowerCase() || "text",
      id: l.id,
      name: l.id,
      value: e[l.id] || "",
      onChange: (o) => {
        const u = { ...e, [l.id]: o.target.value };
        a?.(u);
      },
      autoComplete: l.autocomplete,
      className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white sm:text-sm"
    }
  )
] }, l.id)) }), $o = ({
  provider: e,
  title: n = "Sign In",
  tabs: r = !0,
  oauth: s = !0,
  onLogin: a
}) => {
  const { getMetadata: l, createDto: o } = dt(), u = xn(), d = Ct(Qn), { signIn: m } = Kr(), p = l({ assert: !0 }), L = p.plugins.auth, v = typeof document < "u" ? document.baseURI : "", b = p.app.baseUrl, [S, w] = F(() => o("Authenticate")), [I, j] = F(new it()), [y, x] = F(e);
  pe(() => {
    L?.authProviders.map(($) => $.formLayout).filter(($) => $).forEach(($) => $.forEach((B) => {
      w((N) => ({
        ...N,
        [B.id]: B.type === "checkbox" ? !1 : ""
      }));
    }));
  }, [L]);
  const h = c(
    () => L?.authProviders.filter(($) => $.formLayout) || [],
    [L]
  ), k = c(
    () => h[0] || {},
    [h]
  ), V = c(
    () => h[Math.max(h.length - 1, 0)] || {},
    [h]
  ), H = c(() => (y ? L?.authProviders.find(($) => $.name === y) : null) ?? k, [y, L, k]), A = ($) => $ === !1 || $ === "false", le = ($) => $.label || $.navItem && $.navItem.label, G = c(
    () => (H?.formLayout || []).map(($) => Object.assign({}, $, {
      type: $.type?.toLowerCase(),
      autocomplete: $.autocomplete || ($.type?.toLowerCase() === "password" ? "current-password" : void 0) || ($.id.toLowerCase() === "username" ? "username" : void 0),
      css: Object.assign({ field: "col-span-12" }, $.css)
    })),
    [H]
  ), _ = c(
    () => A(s) ? [] : L?.authProviders.filter(($) => $.type === "oauth") || [],
    [s, L]
  ), T = c(() => {
    let $ = Ja(
      L?.authProviders.filter((N) => N.formLayout && N.formLayout.length > 0),
      (N, Z) => {
        let Y = le(Z) || ht(Z.name);
        N[Y] = Z.name === k.name ? "" : Z.name;
      }
    );
    const B = H;
    return B && A(r) && ($ = { [le(B) || ht(B.name)]: B }), $;
  }, [L, H, r, k]), R = c(() => {
    let $ = G.map((B) => B.id).filter((B) => B);
    return I.summaryMessage($);
  }, [I, G]), M = async ($) => {
    $.preventDefault();
    const B = H.name;
    let N = { ...S };
    N.provider = B, B === "authsecret" ? (d?.headers.set("authsecret", S.authsecret), N = o("Authenticate")) : B === "basic" ? (d?.setCredentials(S.UserName, S.Password), N = o("Authenticate"), N.UserName = null, N.Password = null) : (H.type === "Bearer" || B === "jwt") && (d.bearerToken = S.BearerToken, N = o("Authenticate"));
    const Z = await u.api(N);
    if (j(Z), Z.succeeded) {
      const Y = Z.response;
      m(Y), a?.(Y), j(new it()), w(o("Authenticate"));
    }
  };
  return L ? /* @__PURE__ */ i("div", { className: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ i("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
      /* @__PURE__ */ t("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50", children: n }),
      Object.keys(T).length > 1 && /* @__PURE__ */ t("p", { className: "mt-4 text-center text-sm text-gray-600 dark:text-gray-300", children: /* @__PURE__ */ t("span", { className: "relative z-0 inline-flex shadow-sm rounded-md", children: Object.entries(T).map(([$, B]) => /* @__PURE__ */ t(
        "a",
        {
          href: `?provider=${B}`,
          onClick: (N) => {
            N.preventDefault(), x(B);
          },
          className: `${B === "" || B === V.name ? "rounded-l-md" : B === V.name ? "rounded-r-md -ml-px" : "-ml-px"} ${y === B ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : ""} cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900`,
          children: $
        },
        $
      )) }) })
    ] }),
    /* @__PURE__ */ i("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: [
      R && /* @__PURE__ */ t("div", { className: "mb-3", children: /* @__PURE__ */ t(nr, { status: I.error }) }),
      /* @__PURE__ */ i("div", { className: "bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [
        G.length > 0 && /* @__PURE__ */ i("form", { onSubmit: M, children: [
          /* @__PURE__ */ t(
            lo,
            {
              value: S,
              formLayout: G,
              api: I,
              hideSummary: !0,
              onChange: w
            }
          ),
          /* @__PURE__ */ t("div", { className: "mt-8", children: /* @__PURE__ */ t(an, { type: "submit", className: "w-full", children: "Sign In" }) })
        ] }),
        _.length > 0 && /* @__PURE__ */ i("div", { className: "mt-6", children: [
          /* @__PURE__ */ i("div", { className: "relative", children: [
            /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ t("div", { className: "w-full border-t border-gray-300 dark:border-gray-600" }) }),
            /* @__PURE__ */ t("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ t("span", { className: "px-2 bg-white text-gray-500 dark:text-gray-400", children: "Or continue with" }) })
          ] }),
          /* @__PURE__ */ t("div", { className: "mt-6 grid grid-cols-3 gap-3", children: _.map(($) => /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
            "a",
            {
              href: `${b}${$.navItem.href}?continue=${v}`,
              title: le($),
              className: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900",
              children: $.icon ? /* @__PURE__ */ t(kn, { image: $.icon, className: "h-5 w-5 text-gray-700 dark:text-gray-200" }) : /* @__PURE__ */ i(
                "svg",
                {
                  className: "h-5 w-5 text-gray-700 dark:text-gray-200",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 32 32",
                  children: [
                    /* @__PURE__ */ t("path", { d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z", fill: "currentColor" }),
                    /* @__PURE__ */ t("path", { d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z", fill: "currentColor" })
                  ]
                }
              )
            }
          ) }, $.name)) })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ t("div", { children: "No Auth Plugin" });
}, oo = yt(({
  status: e,
  id: n,
  inputClass: r,
  filterClass: s,
  label: a,
  labelClass: l,
  help: o,
  placeholder: u,
  value: d = "",
  counter: m,
  rows: p = 6,
  errorMessages: L,
  lang: v,
  autoFocus: b,
  disabled: S,
  helpUrl: w = "https://guides.github.com/features/mastering-markdown/",
  hide: I,
  onChange: j,
  onClose: y
}, x) => {
  const h = _e(null), k = _e([]), V = _e([]), H = Ct(Ir), A = c(
    () => Mt.call({ responseStatus: e ?? H?.error.value }, n),
    [e, H, n]
  ), le = c(
    () => a ?? ze(ht(n)),
    [a, n]
  ), G = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), _ = c(
    () => I ? zt(G, I) : zt(G, []),
    [I]
  ), T = (P) => _[P], R = c(
    () => Dt(
      [
        "shadow-sm font-mono" + mt.base.replace("rounded-md", ""),
        A ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + mt.valid,
        r
      ],
      "MarkdownInput",
      s
    ),
    [A, r, s]
  ), M = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", $ = (P) => {
    j?.(P);
  }, B = () => h.current.selectionStart !== h.current.selectionEnd, N = () => {
    const P = h.current;
    return P.value.substring(P.selectionStart, P.selectionEnd) || "";
  }, Z = () => {
    const P = h.current, K = P.value, g = P.selectionStart, z = K.substring(g, P.selectionEnd) || "", te = K.substring(0, g), ne = te.lastIndexOf(`
`);
    return {
      value: K,
      sel: z,
      selPos: g,
      beforeSel: te,
      afterSel: K.substring(g),
      prevCRPos: ne,
      beforeCR: ne >= 0 ? te.substring(0, ne + 1) : "",
      afterCR: ne >= 0 ? te.substring(ne + 1) : ""
    };
  }, Y = ({ value: P, selectionStart: K, selectionEnd: g }) => {
    g == null && (g = K), $(P), setTimeout(() => {
      h.current?.focus(), h.current?.setSelectionRange(K, g);
    }, 0);
  }, W = (P, K, g = "", z = {}) => {
    const {
      selectionAtEnd: te,
      offsetStart: ne,
      offsetEnd: Ae,
      filterValue: Le,
      filterSelection: me
    } = z, re = h.current;
    let ge = re.value, Te = re.selectionEnd;
    k.current.push({
      value: ge,
      selectionStart: re.selectionStart,
      selectionEnd: re.selectionEnd
    }), V.current = [];
    const Pe = re.selectionStart, Ge = re.selectionEnd;
    let Fe = ge.substring(0, Pe), je = ge.substring(Ge);
    const nt = P && Fe.endsWith(P) && je.startsWith(K), ve = Pe == Ge;
    let xe = ne, Ke = Ae;
    if (ve) {
      if (nt ? (ge = Fe.substring(0, Fe.length - P.length) + je.substring(K.length), Te += -K.length) : (ge = Fe + P + g + K + je, Te += P.length, xe = 0, Ke = g?.length || 0, te && (Te += Ke, Ke = 0)), Le) {
        var Je = { pos: Te };
        ge = Le(ge, Je), Te = Je.pos;
      }
    } else {
      var $e = ge.substring(Pe, Ge);
      me && ($e = me($e)), nt ? (ge = Fe.substring(0, Fe.length - P.length) + $e + je.substring(K.length), xe = -$e.length - P.length, Ke = $e.length) : (ge = Fe + P + $e + K + je, xe ? Te += (P + K).length : (Te = Pe, xe = P.length, Ke = $e.length));
    }
    $(ge), setTimeout(() => {
      re.focus();
      const Ee = Te + (xe || 0), Oe = (Ee || 0) + (Ke || 0);
      re.setSelectionRange(Ee, Oe);
    }, 0);
  }, ie = () => W("**", "**", "bold"), ue = () => W("_", "_", "italics"), J = () => W("~~", "~~", "strikethrough"), ye = () => W("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), X = () => W(`
> `, `
`, "Blockquote", {}), ce = () => W("![](", ")"), Ce = (P) => {
    const K = N();
    if (K && !("shiftKey" in P && P.shiftKey))
      W("`", "`", "code");
    else {
      const g = v || "js";
      K.indexOf(`
`) === -1 ? W("\n```" + g + `
`, "\n```\n", "// code") : W("```" + g + `
`, "```\n", "");
    }
  }, Me = () => {
    if (B()) {
      let { sel: P, selPos: K, beforeSel: g, afterSel: z, prevCRPos: te, beforeCR: ne, afterCR: Ae } = Z();
      if (P.indexOf(`
`) === -1)
        W(`
 1. `, `
`);
      else if (!P.startsWith(" 1. ")) {
        let re = 1;
        W("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (ge) => " 1. " + ge.replace(/\n$/, "").replace(/\n/g, () => `
 ${++re}. `) + `
`
        });
      } else
        W("", "", "", {
          filterValue: (re, ge) => {
            if (te >= 0) {
              let Te = Ae.replace(/^ - /, "");
              g = ne + Te, ge.pos -= Ae.length - Te.length;
            }
            return g + z;
          },
          filterSelection: (re) => re.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
        });
    } else
      W(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
  }, ee = () => {
    if (B()) {
      let { sel: P, selPos: K, beforeSel: g, afterSel: z, prevCRPos: te, beforeCR: ne, afterCR: Ae } = Z();
      P.indexOf(`
`) === -1 ? W(`
 - `, `
`) : !P.startsWith(" - ") ? W("", "", " - ", {
        selectionAtEnd: !0,
        filterSelection: (re) => " - " + re.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
      }) : W("", "", "", {
        filterValue: (re, ge) => {
          if (te >= 0) {
            let Te = Ae.replace(/^ - /, "");
            g = ne + Te, ge.pos -= Ae.length - Te.length;
          }
          return g + z;
        },
        filterSelection: (re) => re.replace(/^ - /g, "").replace(/\n - /g, `
`)
      });
    } else
      W(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
  }, be = () => {
    const P = N(), K = P.indexOf(`
`) === -1;
    P ? K ? W(`
## `, `
`, "") : W("## ", "", "") : W(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
  }, f = () => {
    let { sel: P, selPos: K, beforeSel: g, afterSel: z, prevCRPos: te, beforeCR: ne, afterCR: Ae } = Z();
    !P.startsWith("//") && !Ae.startsWith("//") ? P ? W("", "", "//", {
      selectionAtEnd: !0,
      filterSelection: (me) => "//" + me.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
    }) : Y({
      value: ne + "//" + Ae + z,
      selectionStart: K + 2
    }) : W("", "", "", {
      filterValue: (me, re) => {
        if (te >= 0) {
          let ge = Ae.replace(/^\/\//, "");
          g = ne + ge, re.pos -= Ae.length - ge.length;
        }
        return g + z;
      },
      filterSelection: (me) => me.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
    });
  }, E = () => W(`/*
`, `*/
`, ""), de = () => {
    if (k.current.length === 0) return !1;
    const P = h.current, K = k.current.pop();
    return V.current.push({
      value: P.value,
      selectionStart: P.selectionStart,
      selectionEnd: P.selectionEnd
    }), Y(K), !0;
  }, Se = () => {
    if (V.current.length === 0) return !1;
    const P = h.current, K = V.current.pop();
    return k.current.push({
      value: P.value,
      selectionStart: P.selectionStart,
      selectionEnd: P.selectionEnd
    }), Y(K), !0;
  };
  return pe(() => {
    k.current = [], V.current = [];
    const P = h.current;
    if (!P) return;
    const K = (g) => {
      if (g.key === "Escape" || g.keyCode === 27) {
        y?.();
        return;
      }
      const z = String.fromCharCode(g.keyCode).toLowerCase();
      z === "	" ? (!g.shiftKey ? W("", "", "    ", {
        selectionAtEnd: !0,
        filterSelection: (ne) => "    " + ne.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
      }) : W("", "", "", {
        filterValue: (ne, Ae) => {
          let { selPos: Le, beforeSel: me, afterSel: re, prevCRPos: ge, beforeCR: Te, afterCR: Pe } = Z();
          if (ge >= 0) {
            let Ge = Pe.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
            me = Te + Ge, Ae.pos -= Pe.length - Ge.length;
          }
          return me + re;
        },
        filterSelection: (ne) => ne.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
      }), g.preventDefault()) : g.ctrlKey ? z === "z" ? g.shiftKey ? Se() && g.preventDefault() : de() && g.preventDefault() : z === "b" && !g.shiftKey ? (ie(), g.preventDefault()) : z === "h" && !g.shiftKey ? (be(), g.preventDefault()) : z === "i" && !g.shiftKey ? (ue(), g.preventDefault()) : z === "q" && !g.shiftKey ? (X(), g.preventDefault()) : z === "k" ? g.shiftKey ? (ce(), g.preventDefault()) : (ye(), g.preventDefault()) : z === "," || g.key === "<" || g.key === ">" || g.keyCode === 188 ? (Ce(g), g.preventDefault()) : z === "/" || g.key === "/" ? (f(), g.preventDefault()) : (z === "?" || g.key === "?") && g.shiftKey && (E(), g.preventDefault()) : g.altKey && (g.key === "1" || g.key === "0" ? (Me(), g.preventDefault()) : g.key === "-" ? (ee(), g.preventDefault()) : g.key === "s" && (J(), g.preventDefault()));
    };
    return P.addEventListener("keydown", K), () => {
      P.removeEventListener("keydown", K);
    };
  }, [d, j]), bt(x, () => ({
    textarea: h,
    updateModelValue: $,
    selection: N,
    hasSelection: B,
    selectionInfo: Z,
    insert: W,
    replace: Y
  })), /* @__PURE__ */ i("div", { children: [
    le && /* @__PURE__ */ t("label", { htmlFor: n, className: `mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${l ?? ""}`, children: le }),
    !S && /* @__PURE__ */ i("div", { className: "border border-gray-200 flex justify-between shadow-sm", children: [
      /* @__PURE__ */ i("div", { className: "p-2 flex flex-wrap gap-x-4", children: [
        T("bold") && /* @__PURE__ */ i("svg", { className: M, onClick: ie, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Bold text (CTRL+B)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" })
        ] }),
        T("italics") && /* @__PURE__ */ i("svg", { className: M, onClick: ue, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Italics (CTRL+I)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" })
        ] }),
        T("link") && /* @__PURE__ */ i("svg", { className: M, onClick: ye, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Insert Link (CTRL+K)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z" })
        ] }),
        T("blockquote") && /* @__PURE__ */ i("svg", { className: M, onClick: X, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Blockquote (CTRL+Q)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z" })
        ] }),
        T("image") && /* @__PURE__ */ i("svg", { className: M, onClick: ce, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Insert Image (CTRL+SHIFT+L)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z" })
        ] }),
        T("code") && /* @__PURE__ */ i("svg", { className: M, onClick: Ce, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Insert Code (CTRL+<)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z" })
        ] }),
        T("heading") && /* @__PURE__ */ i("svg", { className: M, onClick: be, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "H2 Heading (CTRL+H)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z" })
        ] }),
        T("orderedList") && /* @__PURE__ */ i("svg", { className: M, onClick: Me, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Numbered List (ALT+1)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z" })
        ] }),
        T("unorderedList") && /* @__PURE__ */ i("svg", { className: M, onClick: ee, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Bulleted List (ALT+-)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z" })
        ] }),
        T("strikethrough") && /* @__PURE__ */ i("svg", { className: M, onClick: J, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Strike Through (ALT+S)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" })
        ] }),
        T("undo") && /* @__PURE__ */ i("svg", { className: M, onClick: de, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Undo (CTRL+Z)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" })
        ] }),
        T("redo") && /* @__PURE__ */ i("svg", { className: M, onClick: Se, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Redo (CTRL+SHIFT+Z)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" })
        ] })
      ] }),
      T("help") && w && /* @__PURE__ */ t("div", { className: "p-2 flex flex-wrap gap-x-4", children: /* @__PURE__ */ t("a", { title: "formatting help", target: "_blank", href: w, tabIndex: -1, rel: "noreferrer", children: /* @__PURE__ */ t("svg", { className: M, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z" }) }) }) })
    ] }),
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
      "textarea",
      {
        ref: h,
        name: n,
        id: n,
        className: R,
        value: d,
        rows: p,
        disabled: S,
        onChange: (P) => $(P.target.value),
        onKeyDown: (P) => {
          P.key === "Tab" && P.preventDefault();
        }
      }
    ) }),
    A ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${n}-error`, children: A }) : o ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${n}-description`, children: o }) : null
  ] });
});
oo.displayName = "MarkdownInput";
const io = yt(
  ({ children: e, mobileTitlebar: n }, r) => {
    const [s, a] = F(!0), [l, o] = F(""), [u, d] = F(""), [m, p] = F(""), L = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, v = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, b = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    }, S = (y, x, h) => {
      h ? (x(y.entering.cls + " " + y.entering.from), setTimeout(() => x(y.entering.cls + " " + y.entering.to), 0)) : (x(y.leaving.cls + " " + y.leaving.from), setTimeout(() => x(y.leaving.cls + " " + y.leaving.to), 0));
    }, w = (y) => {
      S(L, o, y), S(v, d, y), S(b, p, y), setTimeout(() => a(y), 300);
    }, I = () => w(!0), j = () => w(!1);
    return bt(r, () => ({
      show: I,
      hide: j,
      toggle: w
    })), /* @__PURE__ */ i("div", { children: [
      s && /* @__PURE__ */ i("div", { className: "relative z-10 lg:hidden", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ t("div", { className: `fixed inset-0 bg-gray-900/80 ${l}` }),
        /* @__PURE__ */ t("div", { className: "fixed inset-0 flex", children: /* @__PURE__ */ i("div", { className: `relative mr-16 flex w-full max-w-xs flex-1 ${u}`, children: [
          /* @__PURE__ */ t("div", { className: `absolute left-full top-0 flex w-16 justify-center pt-5 ${m}`, children: /* @__PURE__ */ i("button", { type: "button", onClick: j, className: "-m-2.5 p-2.5", children: [
            /* @__PURE__ */ t("span", { className: "sr-only", children: "Close sidebar" }),
            /* @__PURE__ */ t(
              "svg",
              {
                className: "h-6 w-6 text-white dark:text-black",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: "1.5",
                stroke: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
              }
            )
          ] }) }),
          /* @__PURE__ */ t("div", { className: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2", children: e })
        ] }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col", children: /* @__PURE__ */ t("div", { className: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6", children: e }) }),
      /* @__PURE__ */ i("div", { className: "sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden", children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: I,
            className: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden",
            children: [
              /* @__PURE__ */ t("span", { className: "sr-only", children: "Open sidebar" }),
              /* @__PURE__ */ t(
                "svg",
                {
                  className: "h-6 w-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: "1.5",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ t(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    }
                  )
                }
              )
            ]
          }
        ),
        n
      ] })
    ] });
  }
);
io.displayName = "SidebarLayout";
export {
  la as Alert,
  yo as AlertSuccess,
  Gr as AutoCreateForm,
  ba as AutoEditForm,
  ao as AutoForm,
  nn as AutoFormFields,
  ro as AutoQueryGrid,
  wa as AutoViewForm,
  xa as Autocomplete,
  Co as Breadcrumb,
  ko as Breadcrumbs,
  Yl as CellFormat,
  ma as CheckboxInput,
  Cn as CloseButton,
  so as Combobox,
  ya as ConfirmDelete,
  Ro as DarkModeToggle,
  va as DataGrid,
  ga as DynamicInput,
  ia as EnsureAccess,
  us as EnsureAccessDialog,
  nr as ErrorSummary,
  To as FileInput,
  ca as FilterColumn,
  da as FilterViews,
  rr as FormLoading,
  Nr as HtmlFormat,
  kn as Icon,
  bo as InputDescription,
  oa as Loading,
  pa as LookupInput,
  oo as MarkdownInput,
  ms as MarkupFormat,
  hs as MarkupModel,
  rl as MetadataApp,
  ua as ModalDialog,
  sr as ModalLookup,
  No as NavList,
  Lo as NavListItem,
  wo as OutlineButton,
  eo as PreviewFormat,
  an as PrimaryButton,
  fa as QueryPrefs,
  Qt as SecondaryButton,
  Zr as SelectInput,
  Mo as SettingsIcons,
  io as SidebarLayout,
  $o as SignIn,
  Gl as SlideOver,
  Ao as Tabs,
  So as TagInput,
  _r as TextInput,
  xo as TextLink,
  ha as TextareaInput,
  vo as css,
  Kr as useAuth,
  xn as useClient,
  bn as useConfig,
  nl as useFiles,
  go as useFormatters,
  dt as useMetadata,
  po as useUtils
};
