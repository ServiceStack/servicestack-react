import { lastRightPart as qt, leftPart as Bn, map as nt, toDate as Ct, mapGet as Te, toCamelCase as Ea, toDateTime as Va, chop as Ha, apiValue as za, isDate as qn, dateFmt as Ba, fromXsdDuration as vs, timeFmt12 as qa, omit as Nt, appendQueryString as en, enc as mr, indexOfAny as Ua, createBus as Qa, toKebabCase as as, ApiResult as ct, nameOf as Wa, lastLeftPart as ys, setQueryString as Ka, toTime as Za, ResponseStatus as In, ResponseError as dr, sanitize as _a, errorResponseExcept as Ga, humanize as Be, toPascalCase as ht, errorResponse as Lt, trimEnd as Ja, uniqueKeys as hr, humanify as bs, delaySet as ws, HttpMethods as Sr, rightPart as On, queryString as gr, combinePaths as Xa, omitEmpty as ls, each as Ya } from "@servicestack/client";
import et, { createContext as Un, useContext as It, useState as F, useRef as Je, useEffect as xe, useMemo as i, forwardRef as yt, useImperativeHandle as bt, useCallback as N } from "react";
import { jsx as t, jsxs as d, Fragment as yn } from "react/jsx-runtime";
import { Link as Qn } from "react-router-dom";
const xs = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), ks = {
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
}, os = Object.keys(ks), kt = (e, n) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${n}</svg>`, jn = {
  img: kt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: kt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: kt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: kt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: kt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: kt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: kt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: kt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: kt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, el = /[\r\n%#()<>?[\\\]^`{|}]/g, is = 1024, tl = ["Bytes", "KB", "MB", "GB", "TB"], nl = (() => {
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
  function u(m, y) {
    m.split(",").forEach((C) => o[C] = y);
  }
  function c(m, y) {
    m.split(",").forEach((C) => o[C] = y(C));
  }
  return c("jpeg,gif,png,tiff,bmp,webp", (m) => r + m), c("jsx,csv,css", (m) => s + m), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (m) => a + m), c("3gpp,avi,dv,divx,ogg,mp4,webm", (m) => l + m), c("rtf,pdf", (m) => e + m), u("htm,html,shtm", s + "html"), u("js,mjs,cjs", s + "javascript"), u("yml,yaml", e + "yaml"), u("bat,cmd", e + "bat"), u("xml,csproj,fsproj,vbproj", s + "xml"), u("txt,ps1", s + "plain"), u("qt,mov", l + "quicktime"), u("doc,dot", e + "msword"), u("xls,xlt,xla", e + "excel"), u("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), u("cer,crt,der", e + "x-x509-ca-cert"), u("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), u("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), o;
})();
let pr = [];
function Cs(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(el, encodeURIComponent);
}
function Tr(e) {
  return "data:image/svg+xml;utf8," + Cs(e);
}
function Ns(e) {
  let n = URL.createObjectURL(e);
  return pr.push(n), n;
}
function Ls() {
  pr.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (n) {
      console.error("URL.revokeObjectURL", n);
    }
  }), pr = [];
}
function Ar(e) {
  if (!e) return null;
  let n = Bn(e, "?");
  return qt(n, "/");
}
function bn(e) {
  let n = Ar(e);
  return n == null || n.indexOf(".") === -1 ? null : qt(n, ".").toLowerCase();
}
function $r(e) {
  let n = bn(e.name);
  return n && xs.indexOf(n) >= 0 ? Ns(e) : Vt(e.name);
}
function Rr(e) {
  if (!e) return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let n = bn(e);
  return n && xs.indexOf(n) >= 0 || !1;
}
function Vt(e) {
  if (!e) return null;
  let n = bn(e);
  return n == null || Rr(e) ? e : fn(n) || Tr(jn.doc);
}
function fn(e) {
  let n = Ms(e);
  return n && Tr(n) || null;
}
function Ms(e) {
  if (jn[e])
    return jn[e];
  for (let n = 0; n < os.length; n++) {
    let r = os[n];
    if (ks[r].indexOf(e) >= 0)
      return jn[r];
  }
  return null;
}
function Ir(e, n = 2) {
  if (e === 0) return "0 Bytes";
  const r = n < 0 ? 0 : n, s = Math.floor(Math.log(e) / Math.log(is));
  return parseFloat((e / Math.pow(is, s)).toFixed(r)) + " " + tl[s];
}
function rl(e) {
  return e.files && Array.from(e.files).map((n) => ({ fileName: n.name, contentLength: n.size, filePath: $r(n) }));
}
function Wn(e, n) {
  e.onerror = null, e.src = Dr(e.src, n) || "";
}
function Dr(e, n) {
  return fn(qt(e, ".").toLowerCase()) || (n ? fn(n) || n : null) || fn("doc");
}
function vr(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const n = qt(e, ".").toLowerCase();
  return nl[n] || "application/" + n;
}
function sl() {
  return {
    extSvg: Ms,
    extSrc: fn,
    getExt: bn,
    encodeSvg: Cs,
    canPreview: Rr,
    getFileName: Ar,
    getMimeType: vr,
    formatBytes: Ir,
    filePathUri: Vt,
    svgToDataUri: Tr,
    fileImageUri: $r,
    objectUrl: Ns,
    flush: Ls,
    inputFiles: rl,
    iconOnError: Wn,
    iconFallbackSrc: Dr
  };
}
class al {
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
const rn = Un(void 0), Kn = Un(void 0), Zn = Un(void 0);
function Mt() {
  return It(rn);
}
const tn = "/metadata/app.json", ll = {
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
}, ol = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, yr = {
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
[...Object.keys(yr), ...Object.values(yr)];
const il = {
  String: "string",
  Boolean: "bool",
  ...yr
};
function Dn(e) {
  return il[e] || e;
}
function Ss(e, n) {
  return e ? (n || (n = []), e === "Nullable`1" ? Dn(n[0]) + "?" : e.endsWith("[]") ? `List<${Dn(e.substring(0, e.length - 2))}>` : n.length === 0 ? Dn(e) : Bn(Dn(e), "`") + "<" + n.join(",") + ">") : "";
}
function cl(e) {
  return e && Ss(e.name, e.genericArgs);
}
class Ut {
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
    const r = new Ut();
    return n.forEach((s) => {
      r.add(s);
    }), r;
  }
  static forType(n, r) {
    let s = new Ut();
    if (B.config.apisResolver && n) {
      const a = B.config.apisResolver(n, r);
      a && (s.Query = a.Query, s.QueryInto = a.QueryInto, s.Create = a.Create, s.Update = a.Update, s.Patch = a.Patch, s.Delete = a.Delete);
    }
    return n && (r ??= B.metadata?.api, r?.operations.forEach((a) => {
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
  isAnyQuery: (e) => nt(e.request.inherits, (n) => Ye.AnyRead.indexOf(n.name) >= 0),
  isQuery: (e) => nt(e.request.inherits, (n) => n.name === "QueryDb`1"),
  isQueryInto: (e) => nt(e.request.inherits, (n) => n.name === "QueryDb`2"),
  isCrud: (e) => e.request.implements?.some((n) => Ye.AnyWrite.indexOf(n.name) >= 0),
  isCreate: (e) => Pn(e, Ye.Create),
  isUpdate: (e) => Pn(e, Ye.Update),
  isPatch: (e) => Pn(e, Ye.Patch),
  isDelete: (e) => Pn(e, Ye.Delete),
  model: (e) => e ? nt(e.inherits, (n) => Ye.AnyRead.indexOf(n.name) >= 0) ? e.inherits?.genericArgs[0] : e.implements?.find((n) => Ye.AnyWrite.indexOf(n.name) >= 0)?.genericArgs[0] : null
};
function dl(e) {
  return e.input?.type || _n(Pr(e));
}
function Ts(e) {
  return e.endsWith("?") ? Ha(e, 1) : e;
}
function _n(e) {
  return ll[Ts(e)];
}
function ul(e) {
  return e && ol[e] || "String";
}
function Pr(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function br(e) {
  return e && _n(e) == "number" || !1;
}
function As(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function fl(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function $s(e) {
  if (!e?.type) return !1;
  const n = Pr(e);
  return e.isValueType && n.indexOf("`") == -1 || e.isEnum ? !1 : _n(e.type) == null;
}
function Rs(e) {
  if (!e?.type) return !1;
  const n = Pr(e);
  if (e.isValueType && n.indexOf("`") == -1 || e.isEnum) return !0;
  const r = e.input?.type;
  return r && (r == "hidden" || r == "file" || r == "tag" || r == "combobox" || B.components?.[r]) ? !0 : _n(e.type) != null;
}
function gn(e, n) {
  let r = typeof e == "string" ? Gn(e) : e;
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
function ml(e, n, r = {}) {
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
function mn(e, n) {
  return e ? (Object.keys(e).forEach((r) => {
    let s = e[r];
    typeof s == "string" ? s.startsWith("/Date") && (e[r] = er(Ct(s))) : s != null && typeof s == "object" && (Array.isArray(s) ? e[r] = Array.from(s) : e[r] = Object.assign({}, s));
  }), e) : {};
}
function hl(e, n) {
  let r = {};
  return Array.from(e.elements).forEach((s) => {
    let a = s;
    if (!a.id || a.value == null || a.value === "") return;
    const l = a.id.toLowerCase(), o = n && n.find((y) => y.name.toLowerCase() == l);
    let u = o?.type, c = o?.genericArgs?.[0], m = a.type === "checkbox" ? a.checked : a.value;
    br(u) ? m = Number(m) : u === "List`1" && typeof m == "string" && (m = m.split(",").map((y) => br(c) ? Number(y) : y)), r[a.id] = m;
  }), r;
}
function Fr(e) {
  return e?.api?.operations && e.api.operations.length > 0;
}
function gl(e) {
  if (!Or() && e?.assert && !B.metadata)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return B.metadata;
}
function pn(e) {
  return e && Fr(e) ? (e.date = Va(/* @__PURE__ */ new Date()), B.metadata = e, typeof localStorage < "u" && localStorage.setItem(tn, JSON.stringify(e)), !0) : !1;
}
function pl() {
  B.metadata = null, typeof localStorage < "u" && localStorage.removeItem(tn);
}
function Or() {
  if (B.metadata != null) return !0;
  let e = globalThis.Server;
  if (Fr(e))
    pn(e);
  else {
    const n = typeof localStorage < "u" ? localStorage.getItem(tn) : null;
    if (n)
      try {
        pn(JSON.parse(n));
      } catch {
        console.error(`Could not JSON.parse ${tn} from localStorage`);
      }
  }
  return B.metadata != null;
}
async function cs(e, n) {
  let r = n ? await n() : await fetch(e);
  if (r.ok) {
    let s = await r.text();
    pn(JSON.parse(s));
  } else
    console.error(`Could not download ${n ? "AppMetadata" : e}: ${r.statusText}`);
  Fr(B.metadata) || console.warn("AppMetadata is not available");
}
async function vl(e) {
  const { olderThan: n, resolvePath: r, resolve: s, client: a } = e || {};
  let l = Or() && n !== 0;
  if (l && n) {
    let o = Ct(B.metadata?.date);
    (!o || (/* @__PURE__ */ new Date()).getTime() - o.getTime() > n) && (l = !1);
  }
  if (!l) {
    if ((r || s) && (await cs(r || tn, s), B.metadata != null))
      return;
    if (a != null) {
      const o = await a.api(new al());
      o.succeeded && pn(o.response);
    }
    if (B.metadata != null) return;
    await cs(tn);
  }
  return B.metadata;
}
function wt(e, n) {
  if (B.config.typeResolver) {
    let o = B.config.typeResolver(e, n);
    if (o) return o;
  }
  let r = B.metadata?.api;
  if (!r || !e) return null;
  let s = r.types.find((o) => o.name.toLowerCase() === e.toLowerCase() && (!n || o.namespace == n));
  if (s) return s;
  let a = Gn(e);
  if (a) return a.request;
  let l = r.operations.find((o) => o.response && o.response.name.toLowerCase() === e.toLowerCase() && (!n || o.response.namespace == n));
  return l ? l.response : null;
}
function Gn(e) {
  if (B.config.apiResolver) {
    const s = B.config.apiResolver(e);
    if (s) return s;
  }
  let n = B.metadata?.api;
  return n ? n.operations.find((s) => s.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function yl({ dataModel: e }) {
  const n = B.metadata?.api;
  if (!n) return [];
  let r = n.operations;
  if (e) {
    const s = typeof e == "string" ? wt(e) : e;
    r = r.filter((a) => Is(a.dataModel, s));
  }
  return r;
}
function jr(e) {
  return e ? wt(e.name, e.namespace) : null;
}
function Is(e, n) {
  return e && n && e.name === n.name && (!e.namespace || !n.namespace || e.namespace === n.namespace);
}
function bl(e, n) {
  let r = wt(e);
  return r && r.properties && r.properties.find((a) => a.name.toLowerCase() === n.toLowerCase());
}
function Ds(e) {
  return Ps(wt(e));
}
function Ps(e) {
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
function Fs(e) {
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
      return Ps(l);
  }
  return null;
}
function Er(e) {
  if (!e) return;
  const n = [];
  return Object.keys(e).forEach((r) => n.push({ key: r, value: e[r] })), n;
}
function wl(e, n) {
  const s = ((a, l) => Object.assign({
    id: a,
    name: a,
    type: l
  }, n))(e.name, n?.type || dl(e) || "text");
  return e.isEnum && (s.type = "select", s.allowableEntries = Er(Fs(e))), s;
}
function xl(e) {
  let n = [];
  if (e) {
    const r = ft(e), s = Gn(e.name), a = jr(s?.dataModel);
    r.forEach((l) => {
      if (!Rs(l)) return;
      const o = wl(l, l.input);
      if (o.id = Ea(o.id), o.type == "file" && l.uploadTo && !o.accept) {
        const u = B.metadata?.plugins.filesUpload?.locations.find((c) => c.name == l.uploadTo);
        u && !o.accept && u.allowExtensions && (o.accept = u.allowExtensions.map((c) => c.startsWith(".") ? c : `.${c}`).join(","));
      }
      if (a) {
        const u = a.properties?.find((c) => c.name == l.name);
        l.ref || (l.ref = u?.ref);
      }
      if (o.options)
        try {
          const u = {
            input: o,
            $typeFields: r.map((m) => m.name),
            $dataModelFields: a ? ft(a).map((m) => m.name) : [],
            ...B.config.scopeWhitelist
          }, c = nr(o.options, u);
          Object.keys(c).forEach((m) => {
            o[m] = c[m];
          });
        } catch {
          console.error(`failed to evaluate '${o.options}'`);
        }
      n.push(o);
    });
  }
  return n;
}
function Vr(e, n) {
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
function Os(e) {
  return (n) => typeof n == "number" ? Vr(n, { type: e }) : n;
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
    e.properties && s(e.properties), e = e.inherits ? jr(e.inherits) : null;
  return n.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function Pn(e, n) {
  return e.request.implements?.some((r) => r.name === n) || !1;
}
function sn(e) {
  return e ? js(e, ft(e)) : null;
}
function js(e, n) {
  let r = n.find((l) => l.name.toLowerCase() === "id");
  if (r && r.isPrimaryKey) return r;
  let a = n.find((l) => l.isPrimaryKey) || r;
  if (!a) {
    let l = Ye.model(e);
    if (l)
      return nt(wt(l), (o) => sn(o));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function kl(e, n) {
  return nt(sn(e), (r) => Te(n, r.name));
}
function Es(e, n, r) {
  return e && e.valueType === "none" ? "" : r.key === "%In" || r.key === "%Between" ? `(${r.value})` : Cl(n, r.value);
}
function Cl(e, n) {
  return e ? (e = Ts(e), br(e) || e === "Boolean" ? n : fl(e) ? `[${n}]` : `'${n}'`) : n;
}
function $t(e, n) {
  return { name: e, value: n };
}
const Nl = [
  $t("=", "%"),
  $t("!=", "%!"),
  $t(">=", ">%"),
  $t(">", "%>"),
  $t("<=", "%<"),
  $t("<", "<%"),
  $t("In", "%In"),
  $t("Between", "%Between"),
  { name: "Starts With", value: "%StartsWith", types: "string" },
  { name: "Contains", value: "%Contains", types: "string" },
  { name: "Ends With", value: "%EndsWith", types: "string" },
  { name: "Exists", value: "%IsNotNull", valueType: "none" },
  { name: "Not Exists", value: "%IsNull", valueType: "none" }
];
function dt() {
  const e = It(Kn);
  return Or(), {
    loadMetadata: (r) => vl({ ...r, client: e }),
    getMetadata: gl,
    setMetadata: pn,
    clearMetadata: pl,
    metadataApp: B.metadata?.app || null,
    metadataApi: B.metadata?.api || null,
    filterDefinitions: B.metadata?.plugins?.autoQuery?.viewerConventions || Nl,
    typeOf: wt,
    typeOfRef: jr,
    typeEquals: Is,
    apiOf: Gn,
    findApis: yl,
    typeName: cl,
    typeName2: Ss,
    property: bl,
    enumOptions: Ds,
    propertyOptions: Fs,
    createFormLayout: xl,
    typeProperties: ft,
    supportsProp: Rs,
    Crud: Ye,
    Apis: Ut,
    getPrimaryKey: sn,
    getPrimaryKeyByProps: js,
    getId: kl,
    createDto: gn,
    makeDto: ml,
    toFormValues: mn,
    formValues: hl,
    isComplexProp: $s,
    asKvps: Er,
    expandEnumFlags: Vr,
    enumFlagsConverter: Os
  };
}
class it {
  static Lookup = {};
  static async getOrFetchValue(n, r, s, a, l, o, u) {
    const c = it.getValue(s, u, l);
    return c ?? (await it.fetchLookupIds(n, r, s, a, l, o, [u]), it.getValue(s, u, l));
  }
  static getValue(n, r, s) {
    const a = it.Lookup[n];
    if (a) {
      const l = a[r];
      if (l)
        return s = s.toLowerCase(), l[s];
    }
  }
  static setValue(n, r, s, a) {
    const l = it.Lookup[n] ?? (it.Lookup[n] = {}), o = l[r] ?? (l[r] = {});
    s = s.toLowerCase(), o[s] = a;
  }
  static setRefValue(n, r) {
    const s = Te(r, n.refId);
    if (s == null || n.refLabel == null)
      return null;
    const a = Te(r, n.refLabel);
    return it.setValue(n.model, s, n.refLabel, a), a;
  }
  static async fetchLookupIds(n, r, s, a, l, o, u) {
    const c = r.operations.find((m) => Ye.isAnyQuery(m) && m.dataModel?.name == s);
    if (c) {
      const m = it.Lookup[s] ?? (it.Lookup[s] = {}), y = [];
      Object.keys(m).forEach((O) => {
        const S = m[O];
        Te(S, l) && y.push(O);
      });
      const C = u.filter((O) => !y.includes(O));
      if (C.length == 0)
        return;
      const w = o ? null : `${a},${l}`, b = {
        [a + "In"]: C.join(",")
      };
      w && (b.fields = w);
      const L = gn(c, b), k = await n.api(L, { jsconfig: "edv,eccn" });
      if (k.succeeded)
        (Te(k.response, "results") || []).forEach((S) => {
          if (!Te(S, a)) {
            console.error(`result[${a}] == null`, S);
            return;
          }
          const p = `${Te(S, a)}`, R = Te(S, l);
          l = l.toLowerCase();
          const v = m[p] ?? (m[p] = {});
          v[l] = `${R}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
}
let wr = () => (/* @__PURE__ */ new Date()).getTime(), Ll = ["/", "T", ":", "-"], pt = {
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
}, Ml = new Intl.RelativeTimeFormat(pt.locale, {}), ds = 1440 * 60 * 1e3 * 365, ur = {
  year: ds,
  month: ds / 12,
  day: 1440 * 60 * 1e3,
  hour: 3600 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, Ht = {
  currency: Hs,
  bytes: zs,
  link: Bs,
  linkTel: qs,
  linkMailTo: Us,
  icon: Qs,
  iconRounded: Ws,
  attachment: Ks,
  hidden: Zs,
  time: _s,
  relativeTime: zr,
  relativeTimeFromMs: Xn,
  enumFlags: Js,
  formatDate: an,
  formatNumber: Hr
};
"iconOnError" in globalThis || (globalThis.iconOnError = Wn);
class Sl {
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
function Tl(e) {
  pt = Object.assign({}, pt, e);
}
function Al(e) {
  Object.keys(e || {}).forEach((n) => {
    typeof e[n] == "function" && (Ht[n] = e[n]);
  });
}
function Vs() {
  return Ht;
}
function wn(e, n) {
  return n ? vt("span", e, n) : e;
}
function Hs(e, n) {
  const r = Nt(n, ["currency"]);
  return wn(new Intl.NumberFormat(void 0, { style: "currency", currency: n?.currency || "USD" }).format(e), r);
}
function zs(e, n) {
  return wn(Ir(e), n);
}
function Bs(e, n) {
  return vt("a", e, tr({ ...n, href: e }));
}
function qs(e, n) {
  return vt("a", e, tr({ ...n, href: `tel:${e}` }));
}
function Us(e, n) {
  n || (n = {});
  let { subject: r, body: s } = n, a = Nt(n, ["subject", "body"]), l = {};
  return r && (l.subject = r), s && (l.body = s), vt("a", e, tr({ ...a, href: `mailto:${en(e, l)}` }));
}
function Qs(e, n) {
  return vt("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Yt(e), onerror: "iconOnError(this)" }, n));
}
function Ws(e, n) {
  return vt("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Yt(e), onerror: "iconOnError(this)" }, n));
}
function Ks(e, n) {
  let r = Ar(e), a = bn(r) == null || Rr(e) ? Yt(e) : Dr(e);
  const l = Yt(a);
  let o = n && (n["icon-class"] || n.iconClass), u = vt("img", void 0, Object.assign({ class: "w-6 h-6", src: l, onerror: "iconOnError(this,'att')" }, o ? { class: o } : null)), c = `<span class="pl-1">${r}</span>`;
  return vt("a", u + c, Object.assign({ class: "flex", href: Yt(e), title: e }, n ? Nt(n, ["icon-class", "iconClass"]) : null));
}
function Zs(e) {
  return "";
}
function _s(e, n) {
  let r = typeof e == "string" ? new Date(vs(e) * 1e3) : qn(e) ? Ct(e) : null;
  return wn(r ? qa(r) : e, n);
}
function an(e, n) {
  if (e == null) return "";
  let r = typeof e == "number" ? new Date(e) : typeof e == "string" ? Ct(e) : e;
  if (!qn(r))
    return console.warn(`${r} is not a Date value`), e == null ? "" : `${e}`;
  let s = pt.date ? Yn(pt.date) : null;
  return wn(typeof s == "function" ? s(r) : Ba(r), n);
}
function Hr(e, n) {
  if (typeof e != "number") return e;
  let r = pt.number ? Yn(pt.number) : null, s = typeof r == "function" ? r(e) : `${e}`;
  return s === "" && (console.warn(`formatNumber(${e}) => ${s}`, r), s = `${e}`), wn(s, n);
}
function En(e) {
  const n = Math.floor(e / 1e3), r = Math.floor(n / 60), s = Math.floor(r / 60), a = Math.floor(s / 24);
  return a > 0 ? `${a}d ${En(e - a * 24 * 60 * 6e4)}` : s > 0 ? `${s}h ${En(e - s * 60 * 6e4)}` : r > 0 ? `${r}m ${En(e - r * 6e4)}` : n > 0 ? `${n}s` : `${e}ms`;
}
function $l(e) {
  return e >= 1e9 ? (e / 1e9).toFixed(1) + "b" : e >= 1e6 ? (e / 1e6).toFixed(1) + "m" : e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toLocaleString();
}
function Gs(e, n, r) {
  let s = za(e), a = n ? Yn(n) : null;
  if (typeof a == "function") {
    let o = r;
    if (n?.options)
      try {
        o = nr(n.options, r);
      } catch (u) {
        console.error(`Could not evaluate '${n.options}'`, u, ", with scope:", r);
      }
    return a(e, o);
  }
  let l = s != null ? qn(s) ? an(s, r) : typeof s == "number" ? Hr(s, r) : s : null;
  return l ?? "";
}
function Jn(e, n, r) {
  return Qt(e) ? Gs(e, n, r) : Fl(e, n, r);
}
function Rl(e) {
  if (e == null) return NaN;
  if (typeof e == "number")
    return e;
  if (qn(e))
    return e.getTime() - wr();
  if (typeof e == "string") {
    let n = Number(e);
    if (!isNaN(n))
      return n;
    if (e[0] === "P" || e.startsWith("-P"))
      return vs(e) * 1e3 * -1;
    if (Ua(e, Ll) >= 0)
      return Ct(e).getTime() - wr();
  }
  return NaN;
}
function Xn(e, n) {
  for (let r in ur)
    if (Math.abs(e) > ur[r] || r === "second")
      return (n || Ml).format(Math.round(e / ur[r]), r);
}
function zr(e, n) {
  let r = Rl(e);
  return isNaN(r) ? "" : Xn(r, n);
}
function Il(e, n) {
  return Xn(e.getTime() - (n ? n.getTime() : wr()));
}
function Js(e, n) {
  return Vr(e, n).join(", ");
}
function Yn(e) {
  if (!e) return null;
  let { method: n, options: r } = e, s = `${n}(${r})`, a = Ht[s] || Ht[n];
  if (typeof a == "function") return a;
  let l = e.locale || pt.locale;
  if (n.startsWith("Intl.")) {
    let o = l ? `'${l}'` : "undefined", u = `return new ${n}(${o},${r || "undefined"})`;
    try {
      let c = Function(u)();
      return a = n === "Intl.DateTimeFormat" ? (m) => c.format(Ct(m)) : n === "Intl.NumberFormat" ? (m) => c.format(Number(m)) : n === "Intl.RelativeTimeFormat" ? (m) => zr(m, c) : (m) => c.format(m), Ht[s] = a;
    } catch (c) {
      console.error(`Invalid format: ${u}`, c);
    }
  } else {
    let o = globalThis[n];
    if (typeof o == "function") {
      let u = r != null ? Function("return " + r)() : void 0;
      return a = (c) => o(c, u, l), Ht[s] = a;
    }
    console.error(`No '${n}' function exists`, Object.keys(Ht));
  }
  return null;
}
function Xs(e, n) {
  return e ? e.length > n ? e.substring(0, n) + "..." : e : "";
}
function Ys(e) {
  return e.substring(0, 6) === "/Date(" ? an(Ct(e)) : e;
}
function Dl(e) {
  return Br(nn(e)).replace(/"/g, "");
}
function ea(e) {
  if (e == null || e === "") return "";
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      console.warn("couldn't parse as JSON", e);
    }
  return e;
}
function Br(e, n = 4) {
  return e = ea(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, n);
}
function Pl(e) {
  return e = ea(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = nn(e), Br(e));
}
function nn(e) {
  if (e == null) return null;
  if (typeof e == "string") return Ys(e);
  if (Qt(e)) return e;
  if (e instanceof Date) return an(e);
  if (Array.isArray(e)) return e.map(nn);
  if (typeof e == "object") {
    let n = {};
    return Object.keys(e).forEach((r) => {
      r != "__type" && (n[r] = nn(e[r]));
    }), n;
  }
  return e;
}
function Fl(e, n, r) {
  let s = e;
  if (Array.isArray(e)) {
    if (Qt(e[0]))
      return s.join(",");
    e[0] != null && (s = e[0]);
  }
  if (s == null) return "";
  if (s instanceof Date) return an(s, r);
  let a = Object.keys(s), l = [];
  for (let o = 0; o < Math.min(pt.maxNestedFields, a.length); o++) {
    let u = a[o], c = `${nn(s[u])}`;
    l.push(`<b class="font-medium">${u}</b>: ${mr(Xs(Ys(c), pt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && l.push("..."), vt("span", "{ " + l.join(", ") + " }", Object.assign({ title: mr(Dl(e)) }, r));
}
function vo() {
  return {
    Formats: Sl,
    setDefaultFormats: Tl,
    getFormatters: Vs,
    setFormatters: Al,
    formatValue: Jn,
    formatter: Yn,
    dateInputFormat: er,
    currency: Hs,
    bytes: zs,
    link: Bs,
    linkTel: qs,
    linkMailTo: Us,
    icon: Qs,
    iconRounded: Ws,
    attachment: Ks,
    hidden: Zs,
    time: _s,
    relativeTime: zr,
    relativeTimeFromDate: Il,
    relativeTimeFromMs: Xn,
    enumFlags: Js,
    formatDate: an,
    formatNumber: Hr,
    humanifyMs: En,
    humanifyNumber: $l,
    indentJson: Br,
    prettyJson: Pl,
    scrub: nn,
    truncate: Xs,
    apiValueFmt: Gs,
    iconOnError: Wn
  };
}
function Ol({ to: e = "/", children: n, ...r }) {
  return /* @__PURE__ */ t(Qn, { to: e, title: e, ...r, children: n });
}
class jl {
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
class El {
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
let us = null, fs = null, Fn = /* @__PURE__ */ new Set();
class B {
  static config = {
    redirectSignIn: "/signin",
    redirectSignOut: "/auth/logout",
    navigate: (n) => location.href = n,
    assetsPathResolver: (n) => n,
    fallbackPathResolver: (n) => n,
    storage: new El(),
    tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
    scopeWhitelist: {
      enumFlagsConverter: Os,
      ...Vs()
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
  static events = Qa();
  static get user() {
    return us;
  }
  static set user(n) {
    us = n, Fn.forEach((r) => r());
  }
  static get metadata() {
    return fs;
  }
  static set metadata(n) {
    fs = n, Fn.forEach((r) => r());
  }
  static subscribe(n) {
    return Fn.add(n), () => Fn.delete(n);
  }
  static components = {
    RouterLink: Ol
  };
  static component(n) {
    const r = B.components[n];
    if (r) return r;
    const s = as(n), a = Object.keys(B.components).find((l) => as(l) === s);
    return a && B.components[a] || null;
  }
  static interceptors = new jl();
}
function Vl(e) {
  B.config = Object.assign(B.config, e);
}
function Hl(e) {
  B.autoQueryGridDefaults = Object.assign(B.autoQueryGridDefaults, e);
}
function Rt(e) {
  return e && B.config.assetsPathResolver ? B.config.assetsPathResolver(e) : e;
}
function xr(e) {
  return e && B.config.fallbackPathResolver ? B.config.fallbackPathResolver(e) : e;
}
function zl(e, n) {
  B.interceptors.register(e, n);
}
function xn() {
  const e = B.events;
  return {
    config: B.config,
    setConfig: Vl,
    events: e,
    autoQueryGridDefaults: B.autoQueryGridDefaults,
    setAutoQueryGridDefaults: Hl,
    assetsPathResolver: Rt,
    fallbackPathResolver: xr,
    registerInterceptor: zl
  };
}
function er(e) {
  if (e == null || typeof e == "object") return "";
  const n = Ct(e);
  return n == null || n.toString() == "Invalid Date" ? "" : n.toISOString().substring(0, 10) ?? "";
}
function ta(e) {
  if (e == null || typeof e == "object") return "";
  const n = Ct(e);
  return n == null || n.toString() == "Invalid Date" ? "" : n.toISOString().substring(0, 19) ?? "";
}
function na(e) {
  return e == null ? "" : Za(e);
}
function kr(e, n) {
  return B.config.inputValue ? B.config.inputValue(e, n) : e === "date" ? er(n) : e === "datetime-local" ? ta(n) : e === "time" ? na(n) : e === "number" || e === "range" ? n == null ? "" : Number(n) : n ?? "";
}
function Bl(e, n) {
  typeof e == "function" ? e(n) : e.current = n;
}
function Xt(e) {
  return { ...e };
}
function kn(e, n, r) {
  r ? (n(e.entering.cls + " " + e.entering.from), setTimeout(() => n(e.entering.cls + " " + e.entering.to), 0)) : (n(e.leaving.cls + " " + e.leaving.from), setTimeout(() => n(e.leaving.cls + " " + e.leaving.to), 0));
}
function Vn(e) {
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
function Dt(e) {
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
  return s && (r = Nt(r, ["cls", "class", "className"]), r.class = s), n == null ? `<${e}` + Cr(r) + "/>" : `<${e}` + Cr(r) + `>${n || ""}</${e}>`;
}
function Cr(e) {
  return Object.keys(e).reduce((n, r) => `${n} ${r}="${mr(e[r])}"`, "");
}
function tr(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function Yt(e) {
  return Rt(e);
}
let ql = ["string", "number", "boolean", "null", "undefined"];
function Qt(e) {
  return ql.indexOf(typeof e) >= 0 || e instanceof Date;
}
function vn(e) {
  return !Qt(e);
}
function Hn(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function qr(e, n) {
  if (typeof history < "u") {
    const r = n ? en(ys(location.href, "?"), e) : Ka(location.href, e);
    history.pushState({}, "", r);
  }
}
function nr(e, n) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const s = Object.assign(
    Object.keys(globalThis).reduce((a, l) => (a[l] = void 0, a), {}),
    n
  );
  return new Function("with(this) { return (" + e + ") }").call(s);
}
function Nr(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function Ur(e) {
  const n = B.config.storage.getItem(e);
  return n ? JSON.parse(n) : null;
}
function rr(e, n) {
  return en(`swr.${Wa(e)}`, n ? Object.assign({}, e, n) : e);
}
function Ul(e) {
  if (e.request) {
    const n = rr(e.request, e.args);
    B.config.storage.removeItem(n);
  }
}
async function ra(e, n, r, s, a) {
  const l = rr(n, s);
  r(new ct({ response: Ur(l) }));
  const o = await e.api(n, s, a);
  if (o.succeeded && o.response) {
    o.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const u = JSON.stringify(o.response);
    B.config.storage.setItem(l, u), r(o);
  }
  return o;
}
function sa(e, n) {
  let r = null;
  return (...s) => {
    r && clearTimeout(r), r = setTimeout(() => {
      e(...s);
    }, n || 100);
  };
}
function zt(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function Bt(e, n) {
  const r = zt(n);
  return e.reduce((s, a) => (s[a] = !r.includes(a), s), {});
}
function Ql(e) {
  return new Promise((n) => setTimeout(n, e));
}
function aa(e) {
  const n = [], r = [];
  for (const s of e) {
    const a = s.toLowerCase();
    r.includes(a) || (n.push(s), r.push(a));
  }
  return n;
}
function yo() {
  return {
    dateInputFormat: er,
    dateTimeInputFormat: ta,
    timeInputFormat: na,
    textInputValue: kr,
    setRef: Bl,
    unRefs: Xt,
    transition: kn,
    focusNextElement: Vn,
    getTypeName: Dt,
    htmlTag: vt,
    htmlAttrs: Cr,
    linkAttrs: tr,
    toAppUrl: Yt,
    isPrimitive: Qt,
    isComplexType: vn,
    pushState: qr,
    scopedExpr: nr,
    copyText: Nr,
    fromCache: Ur,
    swrCacheKey: rr,
    swrClear: Ul,
    swrApi: ra,
    asStrings: zt,
    asOptions: Bt,
    createDebounce: sa,
    delay: Ql,
    uniqueIgnoreCase: aa
  };
}
function Cn(e) {
  const [n, r] = F(!1), [s, a] = F(), [l, o] = F(), u = It(Kn), c = e ?? u;
  function m({ message: p, errorCode: R, fieldName: v, errors: h }) {
    R || (R = "Exception"), h || (h = []);
    const A = v ? new In({
      errorCode: R,
      message: p,
      errors: [new dr({ fieldName: v, errorCode: R, message: p })]
    }) : new In({ errorCode: R, message: p, errors: h });
    return a(A), A;
  }
  function y({ fieldName: p, message: R, errorCode: v }) {
    v || (v = "Exception"), a((h) => {
      if (h) {
        let A = new In(h);
        return A.errors = [
          ...(A.errors || []).filter((H) => H.fieldName?.toLowerCase() !== p?.toLowerCase()),
          new dr({ fieldName: p, message: R, errorCode: v })
        ], A;
      } else
        return new In({
          errorCode: v,
          message: R,
          errors: [new dr({ fieldName: p, errorCode: v, message: R })]
        });
    });
  }
  async function C(p, R, v) {
    r(!0);
    let h = await c.api(Xt(p), R, v);
    return r(!1), o(h.response), a(h.error), h;
  }
  async function w(p, R, v) {
    r(!0);
    let h = await c.apiVoid(Xt(p), R, v);
    return r(!1), o(h.response), a(h.error), h;
  }
  async function b(p, R, v, h) {
    r(!0);
    let A = await c.apiForm(Xt(p), R, v, h);
    return r(!1), o(A.response), a(A.error), A;
  }
  async function L(p, R, v, h) {
    r(!0);
    let A = await c.apiFormVoid(Xt(p), R, v, h);
    return r(!1), o(A.response), a(A.error), A;
  }
  async function k(p, R, v, h) {
    return ra(c, p, R, v, h);
  }
  function O(p, R) {
    const [v, h] = F(new ct()), A = Je(sa(async (H) => {
      const $ = await c.api(H);
      h($);
    }, R?.delayMs));
    return xe(() => {
      const H = p(), $ = Ur(rr(H));
      $ && h(new ct({ response: $ })), R?.delayMs === 0 ? c.api(H).then((J) => h(J)) : A.current(H);
    }, [p, R?.args, R?.method, R?.delayMs]), xe(() => {
      c.api(p(), R?.args, R?.method).then((H) => h(H));
    }, []), v;
  }
  return {
    setError: m,
    addFieldError: y,
    loading: n,
    error: s,
    api: C,
    apiVoid: w,
    apiForm: b,
    apiFormVoid: L,
    swr: k,
    swrEffect: O,
    unRefs: Xt
  };
}
function la(e) {
  return e && e.SessionId ? _a(e) : e;
}
function Wl(e) {
  B.user = la(e), B.events.publish("signIn", e);
}
function Kl() {
  B.user = null, B.events.publish("signOut", null);
}
const Qr = (e) => e?.roles || [], Wr = (e) => e?.permissions || [];
function oa(e) {
  return Qr(B.user).indexOf(e) >= 0;
}
function Zl(e) {
  return Wr(B.user).indexOf(e) >= 0;
}
function Kr() {
  return oa("Admin");
}
function hn(e) {
  if (!e) return !1;
  if (!e.requiresAuth)
    return !0;
  const n = B.user;
  if (!n)
    return !1;
  if (Kr())
    return !0;
  let [r, s] = [Qr(n), Wr(n)], [a, l, o, u] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => r.indexOf(c) >= 0) || o.length > 0 && !o.some((c) => r.indexOf(c) >= 0) || !l.every((c) => s.indexOf(c) >= 0) || u.length > 0 && !u.every((c) => s.indexOf(c) >= 0));
}
function _l(e) {
  if (!e || !e.requiresAuth) return null;
  const n = B.user;
  if (!n)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Kr())
    return null;
  let [r, s] = [Qr(n), Wr(n)], [a, l, o, u] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], c = a.filter((y) => r.indexOf(y) < 0);
  if (c.length > 0)
    return `Requires ${c.map((y) => "<b>" + y + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "");
  let m = l.filter((y) => s.indexOf(y) < 0);
  return m.length > 0 ? `Requires ${m.map((y) => "<b>" + y + "</b>").join(", ")} Permission` + (m.length > 1 ? "s" : "") : o.length > 0 && !o.some((y) => r.indexOf(y) >= 0) ? `Requires any ${o.filter((y) => r.indexOf(y) < 0).map((y) => "<b>" + y + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "") : u.length > 0 && !u.every((y) => s.indexOf(y) >= 0) ? `Requires any ${u.filter((y) => s.indexOf(y) < 0).map((y) => "<b>" + y + "</b>").join(", ")} Permission` + (m.length > 1 ? "s" : "") : null;
}
function Zr() {
  const [, e] = F(0);
  xe(() => {
    const s = B.subscribe(() => e((a) => a + 1));
    return () => {
      s();
    };
  }, []);
  const n = i(() => B.user || null, [B.user]), r = i(() => B.user != null, [B.user]);
  return { signIn: Wl, signOut: Kl, user: n, toAuth: la, isAuthenticated: r, hasRole: oa, hasPermission: Zl, isAdmin: Kr, canAccess: hn, invalidAccessMessage: _l };
}
function ot(e, n) {
  return Array.isArray(e) ? e.indexOf(n) >= 0 : e == n || e.includes(n);
}
const zn = {
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
}, dn = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, un = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, Lr = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, Qe = {
  panelClass(e = "slideOver") {
    return e == "card" ? dn.panelClass : un.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? dn.formClass : un.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? dn.headingClass : un.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? dn.subHeadingClass : un.subHeadingClass;
  },
  buttonsClass: "px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between",
  legendClass: "text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"
}, he = {
  getGridClass(e = "stripedRows") {
    return he.gridClass;
  },
  getGrid2Class(e = "stripedRows") {
    return ot(e, "fullWidth") ? "overflow-x-auto" : he.grid2Class;
  },
  getGrid3Class(e = "stripedRows") {
    return ot(e, "fullWidth") ? "inline-block min-w-full py-2 align-middle" : he.grid3Class;
  },
  getGrid4Class(e = "stripedRows") {
    return ot(e, "whiteBackground") ? "" : ot(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black/5" : he.grid4Class;
  },
  getTableClass(e = "stripedRows") {
    return ot(e, "fullWidth") || ot(e, "verticalLines") ? "min-w-full divide-y divide-gray-300" : he.tableClass;
  },
  getTheadClass(e = "stripedRows") {
    return ot(e, "whiteBackground") ? "" : he.theadClass;
  },
  getTheadRowClass(e = "stripedRows") {
    return he.theadRowClass + (ot(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  getTheadCellClass(e = "stripedRows") {
    return he.theadCellClass + (ot(e, "uppercaseHeadings") ? " uppercase" : "");
  },
  getTbodyClass(e = "stripedRows") {
    return (ot(e, "whiteBackground") || ot(e, "verticalLines") ? "divide-y divide-gray-200 dark:divide-gray-800" : he.tableClass) + (ot(e, "verticalLines") ? " bg-white" : "");
  },
  getTableRowClass(e = "stripedRows", n, r, s) {
    return (s ? "cursor-pointer " : "") + (r ? "bg-indigo-100 dark:bg-blue-800" : (s ? "hover:bg-yellow-50 dark:hover:bg-blue-900 " : "") + (ot(e, "stripedRows") ? n % 2 == 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black")) + (ot(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
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
}, Gl = {
  colspans: "col-span-3 sm:col-span-3"
};
function Pt(e, n, r) {
  const s = e.filter((a) => a).join(" ");
  return r ??= B.config.filterInputClass == null ? void 0 : (a) => B.config.filterInputClass(a, n), r ? r(s) : s;
}
const bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: zn,
  card: dn,
  dummy: Gl,
  filterClass: Pt,
  form: Qe,
  grid: he,
  input: mt,
  modal: Lr,
  slideOver: un
}, Symbol.toStringTag, { value: "Module" }));
function ia({ type: e = "warn", hideIcon: n, className: r, children: s }) {
  const a = e === "info" ? "bg-blue-50 dark:bg-blue-200" : e === "error" ? "bg-red-50 dark:bg-red-200" : e === "success" ? "bg-green-50 dark:bg-green-200" : "bg-yellow-50 dark:bg-yellow-200", l = e === "info" ? "border-blue-400" : e === "error" ? "border-red-400" : e === "success" ? "border-green-400" : "border-yellow-400", o = e === "info" ? "text-blue-700" : e === "error" ? "text-red-700" : e === "success" ? "text-green-700" : "text-yellow-700";
  return /* @__PURE__ */ t("div", { className: `${a} ${l} border-l-4 p-4 ${r || ""}`, children: /* @__PURE__ */ d("div", { className: "flex items-center", children: [
    !n && /* @__PURE__ */ d("div", { className: "flex-shrink-0 mr-3", children: [
      e === "warn" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
      e === "error" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z", clipRule: "evenodd" }) }),
      e === "info" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-blue-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }) }),
      e === "success" && /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-green-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }) })
    ] }),
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("p", { className: `${o} text-sm`, children: s }) })
  ] }) });
}
function wo({ message: e, children: n }) {
  const [r, s] = F(!1);
  return r ? null : /* @__PURE__ */ t("div", { className: "rounded-md bg-green-50 dark:bg-green-200 p-4", role: "alert", children: /* @__PURE__ */ d("div", { className: "flex", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-green-400 dark:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) }),
    /* @__PURE__ */ t("div", { className: "ml-3", children: /* @__PURE__ */ t("h3", { className: "text-sm font-medium text-green-800", children: e ? /* @__PURE__ */ t("span", { children: e }) : n }) }),
    /* @__PURE__ */ t("div", { className: "ml-auto pl-3", children: /* @__PURE__ */ t("div", { className: "-mx-1.5 -my-1.5", children: /* @__PURE__ */ d(
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
function sr({ status: e, except: n, className: r }) {
  const s = Mt(), a = i(() => {
    const l = e || s?.error;
    return l ? Ga.call({ responseStatus: l }, n ?? []) : null;
  }, [e, s?.error, n]);
  return a ? /* @__PURE__ */ t("div", { className: `bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${r || ""}`, children: /* @__PURE__ */ d("div", { className: "flex", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" }) }) }),
    /* @__PURE__ */ t("div", { className: "ml-3", children: /* @__PURE__ */ t("p", { className: "text-sm text-red-700 dark:text-red-200", children: a }) })
  ] }) }) : null;
}
function xo({ id: e, description: n }) {
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
function Nn({ image: e, svg: n, src: r, alt: s, type: a, className: l }) {
  let o = e;
  if (a) {
    const { typeOf: m } = dt(), y = m(a);
    y || console.warn(`Type ${a} does not exist`), y?.icon ? o = y?.icon : console.warn(`Type ${a} does not have a [Svg] icon`);
  }
  let u = n || o?.svg || "";
  if (u.startsWith("<svg ")) {
    let y = Bn(u, ">").indexOf("class="), C = `${o?.cls || ""} ${l || ""}`;
    if (y == -1)
      u = `<svg class="${C}" ${u.substring(4)}`;
    else {
      const w = y + 6 + 1;
      u = `${u.substring(0, w) + C} ${u.substring(w)}`;
    }
    return /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: u } });
  } else
    return /* @__PURE__ */ t(
      "img",
      {
        className: `${o?.cls || ""} ${l || ""}`,
        src: Rt(r || o?.uri),
        alt: s,
        onError: (m) => Wn(m.target)
      }
    );
}
function ca({ imageClass: e = "w-6 h-6", className: n, children: r }) {
  return /* @__PURE__ */ t("div", { className: `text-2xl font-semibold text-gray-900 dark:text-gray-300 ${n || ""}`, children: /* @__PURE__ */ d("div", { className: "flex", children: [
    /* @__PURE__ */ d(
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
const ko = ({
  type: e = "submit",
  href: n,
  onClick: r,
  children: s,
  ...a
}) => {
  const l = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black";
  return n ? /* @__PURE__ */ t(Qn, { to: n, children: /* @__PURE__ */ t("button", { type: "button", className: l, onClick: r, ...a, children: s }) }) : /* @__PURE__ */ t("button", { type: e, className: l, onClick: r, ...a, children: s });
}, ln = ({
  type: e = "submit",
  color: n = "indigo",
  href: r,
  onClick: s,
  children: a,
  className: l,
  ...o
}) => {
  const u = {
    blue: "focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    purple: "focus:ring-purple-500 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:hover:bg-purple-400 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
    red: "focus:ring-red-500 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:hover:bg-red-400 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500",
    green: "focus:ring-green-500 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:hover:bg-green-400 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500",
    sky: "focus:ring-sky-500 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-500",
    cyan: "focus:ring-cyan-500 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500",
    indigo: "focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
  }, c = i(() => {
    const m = "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black text-white " + (u[n] || u.indigo);
    return l ? `${m} ${l}` : m;
  }, [n, l]);
  return r ? /* @__PURE__ */ t(Qn, { to: r, children: /* @__PURE__ */ t("button", { type: "button", className: c, onClick: s, ...o, children: a }) }) : /* @__PURE__ */ t("button", { type: e, className: c, onClick: s, ...o, children: a });
}, Wt = ({
  type: e = "button",
  href: n,
  onClick: r,
  children: s,
  ...a
}) => {
  const l = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black";
  return n ? /* @__PURE__ */ t(Qn, { to: n, children: /* @__PURE__ */ t("button", { type: e, className: l, onClick: r, ...a, children: s }) }) : /* @__PURE__ */ t("button", { type: e, className: l, onClick: r, ...a, children: s });
}, Co = ({
  color: e = "blue",
  children: n,
  href: r,
  ...s
}) => {
  const a = i(
    () => (zn[e] || zn.blue) + (r ? "" : " cursor-pointer"),
    [e, r]
  );
  return /* @__PURE__ */ t("a", { className: a, href: r, ...s, children: n });
};
function No({
  homeHref: e = "/",
  homeLabel: n = "Home",
  children: r
}) {
  return /* @__PURE__ */ t("nav", { className: "flex", "aria-label": "Breadcrumb", children: /* @__PURE__ */ d("ol", { role: "list", className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("div", { children: /* @__PURE__ */ d("a", { href: e, className: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400", title: n, children: [
      /* @__PURE__ */ t("svg", { className: "h-6 w-6 flex-shrink-0", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ t("span", { className: "sr-only", children: n })
    ] }) }) }),
    r
  ] }) });
}
function Lo({ href: e, title: n, children: r }) {
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ d("div", { className: "flex items-center", children: [
    /* @__PURE__ */ t("svg", { className: "h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clipRule: "evenodd" }) }),
    e ? /* @__PURE__ */ t("a", { href: e, className: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300", title: n, children: r }) : /* @__PURE__ */ t("span", { className: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300", title: n, children: r })
  ] }) });
}
function Mo({ title: e, children: n }) {
  return /* @__PURE__ */ d("div", { children: [
    e && /* @__PURE__ */ t("h2", { className: "text-base font-semibold text-gray-500 dark:text-gray-400", children: e }),
    /* @__PURE__ */ t("ul", { role: "list", className: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800", children: n })
  ] });
}
function So({
  title: e,
  href: n,
  icon: r,
  iconSvg: s,
  iconSrc: a,
  iconAlt: l,
  children: o
}) {
  return /* @__PURE__ */ d("li", { className: "relative flex items-start space-x-4 py-6", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: /* @__PURE__ */ t("span", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900", children: /* @__PURE__ */ t(Nn, { className: "w-6 h-6 text-indigo-700 dark:text-indigo-300", image: r, src: a, svg: s, alt: l }) }) }),
    /* @__PURE__ */ d("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ t("h3", { className: "text-base font-medium text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ t("span", { className: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2", children: /* @__PURE__ */ d("a", { href: n, className: "focus:outline-none", children: [
        /* @__PURE__ */ t("span", { className: "absolute inset-0", "aria-hidden": "true" }),
        e
      ] }) }) }),
      /* @__PURE__ */ t("p", { className: "text-base text-gray-500", children: o })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-shrink-0 self-center", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clipRule: "evenodd" }) }) })
  ] });
}
function da({ invalidAccess: e, alertClass: n, children: r }) {
  const { isAuthenticated: s } = Zr(), { config: a } = xn(), l = () => {
    let u = location.href.substring(location.origin.length) || "/";
    const c = en(a.redirectSignIn, { redirect: u });
    a.navigate(c);
  }, o = () => {
    let u = location.href.substring(location.origin.length) || "/";
    const c = en(a.redirectSignOut, { ReturnUrl: u });
    a.navigate(c);
  };
  return e ? /* @__PURE__ */ d("div", { children: [
    /* @__PURE__ */ t(ia, { className: n, children: /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: e } }) }),
    /* @__PURE__ */ t("div", { className: "md:p-4", children: s ? /* @__PURE__ */ t(Wt, { onClick: o, children: "Sign Out" }) : /* @__PURE__ */ t(Wt, { onClick: l, children: "Sign In" }) })
  ] }) : null;
}
function Ln({
  buttonClass: e = "bg-white dark:bg-black",
  title: n = "Close",
  onClose: r
}) {
  return /* @__PURE__ */ t("div", { className: "absolute top-0 right-0 pt-4 pr-4", children: /* @__PURE__ */ d(
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
function Jl(e, n, r) {
  r ? (n(e.entering.cls + " " + e.entering.from), setTimeout(() => n(e.entering.cls + " " + e.entering.to), 0)) : (n(e.leaving.cls + " " + e.leaving.from), setTimeout(() => n(e.leaving.cls + " " + e.leaving.to), 0));
}
function Xl({
  id: e = "SlideOver",
  title: n,
  subtitle: r,
  contentClass: s = "relative mt-6 flex-1 px-4 sm:px-6",
  children: a,
  onDone: l
}) {
  const [o, u] = F(!1), [c, m] = F(""), y = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  }, C = () => u(!1);
  return xe(() => {
    if (Jl(y, m, o), !o) {
      const w = setTimeout(() => l?.(), 700);
      return () => clearTimeout(w);
    }
  }, [o, l]), xe(() => {
    u(!0);
  }, []), xe(() => {
    const w = (b) => {
      b.key === "Escape" && C();
    };
    return window.addEventListener("keydown", w), () => window.removeEventListener("keydown", w);
  }, []), /* @__PURE__ */ d(
    "div",
    {
      id: e,
      className: "relative z-10",
      "aria-labelledby": e + "-title",
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
        /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: C, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t(
          "div",
          {
            onMouseDown: (w) => w.stopPropagation(),
            className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10",
            children: /* @__PURE__ */ t("div", { className: `panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${c}`, children: /* @__PURE__ */ t("div", { className: "flex h-full flex-col bg-white dark:bg-black shadow-xl", children: /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
              /* @__PURE__ */ t("div", { className: "relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
                /* @__PURE__ */ d("div", { className: "space-y-1", children: [
                  n && (typeof n == "string" ? /* @__PURE__ */ t("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-50", id: e + "-title", children: n }) : /* @__PURE__ */ t("div", { children: n })),
                  r && /* @__PURE__ */ t("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: r })
                ] }),
                /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Ln, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: C }) })
              ] }) }),
              /* @__PURE__ */ t("div", { className: s, children: a })
            ] }) }) }) })
          }
        ) }) })
      ]
    }
  );
}
function ms({
  title: e,
  subtitle: n,
  invalidAccess: r,
  alertClass: s,
  onDone: a
}) {
  return r ? /* @__PURE__ */ t(
    Xl,
    {
      title: e,
      subtitle: n,
      onDone: a,
      contentClass: "relative flex-1",
      children: /* @__PURE__ */ t(da, { alertClass: s, invalidAccess: r })
    }
  ) : null;
}
const _r = (e) => {
  const {
    status: n,
    id: r,
    value: s,
    inputClass: a,
    filterClass: l,
    label: o,
    labelClass: u,
    options: c,
    values: m,
    entries: y,
    onChange: C,
    className: w,
    ...b
  } = e, L = Mt(), k = o ?? Be(ht(r)), O = i(
    () => n || L?.error,
    [n, L?.error]
  ), S = i(
    () => Lt.call({ responseStatus: O }, r),
    [O, r]
  ), p = i(() => y || (m ? m.map((h) => ({ key: h, value: h })) : c ? Object.keys(c).map((h) => ({ key: h, value: c[h] })) : []), [y, m, c]), R = i(
    () => Pt(
      [
        "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none",
        S ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "shadow-sm border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
        a
      ],
      "SelectInput",
      l
    ),
    [S, a, l]
  ), v = (h) => {
    C && C(h.target.value);
  };
  return /* @__PURE__ */ d("div", { className: w, children: [
    k && /* @__PURE__ */ t(
      "label",
      {
        htmlFor: r,
        className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${u ?? ""}`,
        children: k
      }
    ),
    /* @__PURE__ */ t(
      "select",
      {
        id: r,
        name: r,
        className: R,
        value: s ?? "",
        onChange: v,
        "aria-invalid": S != null,
        "aria-describedby": `${r}-error`,
        ...Nt(b, ["class"]),
        children: p.map((h) => /* @__PURE__ */ t("option", { value: h.key, children: h.value }, h.key))
      }
    ),
    S && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${r}-error`, children: S })
  ] });
};
_r.displayName = "SelectInput";
const Gr = yt(
  (e, n) => {
    const {
      status: r,
      id: s,
      type: a = "text",
      inputClass: l,
      filterClass: o,
      label: u,
      labelClass: c,
      help: m,
      placeholder: y,
      value: C,
      onChange: w,
      className: b,
      ...L
    } = e, k = Je(null), O = Mt();
    bt(n, () => ({
      focus: () => {
        k.current?.focus();
      }
    }));
    const S = a || "text", p = u ?? Be(ht(s)), R = y ?? p, v = (J) => a === "range" ? J.replace("shadow-sm ", "") : J, h = i(
      () => r || O?.error,
      [r, O?.error]
    ), A = i(
      () => Lt.call({ responseStatus: h }, s),
      [h, s]
    ), H = i(
      () => Pt(
        [mt.base, A ? mt.invalid : v(mt.valid), l],
        "TextInput",
        o
      ),
      [A, l, o, a]
    ), $ = (J) => {
      if (w) {
        const Y = kr(S, J.target.value);
        w(Y);
      }
    };
    return /* @__PURE__ */ d("div", { className: b, children: [
      p && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: s,
          className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${c ?? ""}`,
          children: p
        }
      ),
      /* @__PURE__ */ d("div", { className: v("mt-1 relative"), children: [
        /* @__PURE__ */ t(
          "input",
          {
            ref: k,
            type: S,
            name: s,
            id: s,
            className: H,
            placeholder: R,
            value: kr(S, C),
            onChange: $,
            "aria-invalid": A != null,
            "aria-describedby": `${s}-error`,
            step: "any",
            ...Nt(L, ["class", "value"])
          }
        ),
        A && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ t(
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
      A ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${s}-error`, children: A }) : m ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${s}-description`, children: m }) : null
    ] });
  }
);
Gr.displayName = "TextInput";
function ua({
  definitions: e,
  column: n,
  topLeft: r,
  onDone: s,
  onSave: a
}) {
  const l = Je(null), [o, u] = F(""), [c, m] = F(""), [y, C] = F([]), [w, b] = F({ filters: [] }), L = i(() => n.meta.isEnum === !0, [n.meta.isEnum]), k = i(
    () => wt(n.meta.type === "Nullable`1" ? n.meta.genericArgs[0] : n.meta.type),
    [n.meta.type, n.meta.genericArgs]
  ), O = i(
    () => n.meta.isEnum === !0 ? Er(Ds(k.name)) : [],
    [n.meta.isEnum, k]
  ), S = i(
    () => R(n.type)?.map((T) => ({ key: T.value, value: T.name })) || [],
    [n.type]
  ), p = i(() => w.filters, [w.filters]);
  xe(() => {
    b(Object.assign({}, n.settings, {
      filters: Array.from(n.settings.filters)
    }));
  }, [n.settings]), xe(() => {
    let T = n.settings.filters?.[0]?.value?.split(",") || [];
    if (T.length > 0 && k?.isEnumInt) {
      const M = T[0] && parseInt(T[0]) || 0;
      T = k.enumValues?.filter((E) => (M & parseInt(E)) > 0) || [];
    }
    C(T);
  }, [n.settings.filters, k]), xe(() => {
    u("%"), l.current?.focus();
  }, []);
  function R(T) {
    let M = e;
    return As(T) || (M = M.filter((E) => E.types !== "string")), M;
  }
  function v(T, M) {
    return R(T).find((E) => E.value === M);
  }
  function h() {
    if (!o) return;
    let T = v(n.type, o)?.name;
    T && (b((M) => ({
      ...M,
      filters: [...M.filters, { key: o, name: T, value: c }]
    })), u(""), m(""));
  }
  function A(T) {
    b((M) => ({
      ...M,
      filters: M.filters.filter((E, x) => x !== T)
    }));
  }
  function H(T) {
    return Es(v(n.type, T.key), n.type, T);
  }
  function $() {
    s?.();
  }
  function J() {
    if (c && h(), L) {
      let T = Object.values(y).filter((E) => E);
      const M = {
        ...w,
        filters: T.length > 0 ? k?.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: T.map((E) => parseInt(E)).reduce((E, x) => E + x, 0).toString() }] : [{ key: "%In", name: "In", value: T.join(",") }] : []
      };
      b(M), a?.(M);
    } else
      a?.(w);
    s?.();
  }
  function Y(T) {
    const M = {
      ...w,
      sort: T === w.sort ? void 0 : T
    };
    b(M), setTimeout(() => {
      a?.(M), s?.();
    }, 0);
  }
  const ne = (T, M) => {
    C((E) => M ? [...E, T] : E.filter((x) => x !== T));
  };
  return /* @__PURE__ */ t("div", { className: "fixed z-20 inset-0 overflow-y-auto", onClick: $, children: /* @__PURE__ */ t("div", { className: "absolute", style: { top: `${r.y}px`, left: `${r.x}px` }, onClick: (T) => T.stopPropagation(), children: /* @__PURE__ */ d("div", { className: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80", children: [
    /* @__PURE__ */ d("div", { className: "p-4", children: [
      /* @__PURE__ */ t("h3", { className: "text-base font-medium mb-3 dark:text-gray-100", children: "Sort" }),
      /* @__PURE__ */ d("div", { className: "flex w-full justify-center", children: [
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            title: "Sort Ascending",
            onClick: () => Y("ASC"),
            className: `${w.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
            children: [
              /* @__PURE__ */ t("svg", { className: "w-6 h-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ d("g", { fill: "currentColor", children: [
                /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" }),
                /* @__PURE__ */ t("path", { d: "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" })
              ] }) }),
              /* @__PURE__ */ t("span", { children: "ASC" })
            ]
          }
        ),
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            title: "Sort Descending",
            onClick: () => Y("DESC"),
            className: `${w.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
            children: [
              /* @__PURE__ */ t("svg", { className: "w-6 h-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ d("g", { fill: "currentColor", children: [
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
      L ? /* @__PURE__ */ t("div", { children: O.map((T) => /* @__PURE__ */ d("div", { className: "flex items-center", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            id: T.key,
            value: T.key,
            checked: y.includes(T.key),
            onChange: (M) => ne(T.key, M.target.checked),
            className: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          }
        ),
        /* @__PURE__ */ t("label", { htmlFor: T.key, className: "ml-3", children: T.value })
      ] }, T.key)) }) : /* @__PURE__ */ d("div", { children: [
        p.map((T, M) => /* @__PURE__ */ t("div", { className: "mb-2", children: /* @__PURE__ */ d("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700", children: [
          n.name,
          " ",
          T.name,
          " ",
          H(T),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => A(M),
              className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white",
              children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
            }
          )
        ] }) }, M)),
        /* @__PURE__ */ d("div", { className: "flex", children: [
          /* @__PURE__ */ t(
            _r,
            {
              id: "filterRule",
              inputClass: "w-32 mr-1",
              value: o,
              entries: S,
              label: "",
              onChange: (T) => u(T)
            }
          ),
          v(n.type, o)?.valueType !== "none" && /* @__PURE__ */ t(
            Gr,
            {
              ref: l,
              id: "filterValue",
              inputClass: "w-32 mr-1",
              type: "text",
              value: c,
              onChange: (T) => m(T),
              label: "",
              placeholder: ""
            }
          ),
          /* @__PURE__ */ t("div", { className: "pt-1", children: /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: h,
              className: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: /* @__PURE__ */ t("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) })
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
      /* @__PURE__ */ t(ln, { onClick: J, color: "red", className: "ml-2", children: "Save" }),
      /* @__PURE__ */ t(Wt, { onClick: $, children: "Cancel" })
    ] })
  ] }) }) });
}
function fa({ definitions: e, columns: n, className: r, onDone: s, onChange: a }) {
  const l = i(
    () => n.filter((b) => b.settings.filters.length > 0),
    [n]
  );
  function o(b) {
    return b?.[0]?.value?.split(",");
  }
  function u(b) {
    let L = e;
    return As(b) || (L = L.filter((k) => k.types !== "string")), L;
  }
  function c(b, L) {
    return u(b).find((k) => k.value === L);
  }
  function m(b, L) {
    return Es(c(b.type, L.value), b.type, L);
  }
  function y(b) {
    b.settings.filters = [], a?.(b);
  }
  function C(b, L) {
    b.settings.filters.splice(L, 1), a?.(b);
  }
  function w() {
    n.forEach((b) => {
      b.settings.filters = [], a?.(b);
    }), s?.();
  }
  return /* @__PURE__ */ d("div", { className: `px-4 sm:px-6 lg:px-8 text-sm ${r || ""}`, children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap", children: l.map((b) => /* @__PURE__ */ d("fieldset", { className: "group pr-4 sm:pr-6 lg:pr-8", children: [
      /* @__PURE__ */ d("legend", { className: "flex justify-between w-full font-medium", children: [
        /* @__PURE__ */ t("span", { children: Be(b.name) }),
        /* @__PURE__ */ t("span", { className: "w-6 flex justify-end", children: /* @__PURE__ */ t("span", { className: "hidden group-hover:inline", children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => y(b),
            title: `Clear all ${Be(b.name)} filters`,
            className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white",
            children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
          }
        ) }) })
      ] }),
      b.meta.isEnum ? /* @__PURE__ */ t("div", { className: "pt-2", children: o(b.settings.filters)?.map((L) => /* @__PURE__ */ t("div", { className: "flex items-center", children: /* @__PURE__ */ t("label", { className: "ml-2", children: L }) }, L)) }) : /* @__PURE__ */ t("div", { children: b.settings.filters.map((L, k) => /* @__PURE__ */ t("div", { className: "pt-2", children: /* @__PURE__ */ d("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700", children: [
        b.name,
        " ",
        L.name,
        " ",
        m(b, L),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => C(b, k),
            className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white",
            children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
          }
        )
      ] }) }, k)) })
    ] }, b.name)) }),
    /* @__PURE__ */ t("div", { className: "flex justify-center pt-4", children: /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: w,
        className: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        children: /* @__PURE__ */ t("span", { children: "Clear All" })
      }
    ) })
  ] });
}
const Yl = et.lazy(() => Promise.resolve().then(() => lo)), eo = Un(null);
function hs(e, n, r) {
  r ? (n(e.entering.cls + " " + e.entering.from), setTimeout(() => n(e.entering.cls + " " + e.entering.to), 0)) : (n(e.leaving.cls + " " + e.leaving.from), setTimeout(() => n(e.leaving.cls + " " + e.leaving.to), 0));
}
function ma({
  id: e = "ModalDialog",
  modalClass: n = Lr.modalClass,
  sizeClass: r = Lr.sizeClass,
  closeButtonClass: s = "bg-white dark:bg-black cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
  configureField: a,
  children: l,
  onDone: o
}) {
  const [u, c] = F(!1), [m, y] = F(""), [C, w] = F(""), [b, L] = F(), [k, O] = F(), S = {
    entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
    leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
  }, p = {
    entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
    leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
  }, R = () => c(!1);
  xe(() => {
    if (hs(S, y, u), hs(p, w, u), !u) {
      const H = setTimeout(() => o?.(), 200);
      return () => clearTimeout(H);
    }
  }, [u]), xe(() => {
    c(!0);
  }, []), xe(() => {
    const H = ($) => {
      $.key === "Escape" && R();
    };
    return window.addEventListener("keydown", H), () => window.removeEventListener("keydown", H);
  }, []);
  function v(H, $) {
    L(H), O(() => $);
  }
  async function h(H) {
    k && k(H), L(void 0), O(void 0);
  }
  const A = {
    openModal: v
  };
  return /* @__PURE__ */ t(eo.Provider, { value: A, children: /* @__PURE__ */ d(
    "div",
    {
      id: e,
      "data-transition-for": e,
      onMouseDown: R,
      className: "relative z-10",
      "aria-labelledby": `${e}-title`,
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ t("div", { className: `fixed inset-0 bg-gray-500/75 transition-opacity ${m}` }),
        /* @__PURE__ */ t("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ t(
          "div",
          {
            className: `${n} ${r} ${C}`,
            onMouseDown: (H) => H.stopPropagation(),
            children: /* @__PURE__ */ d("div", { children: [
              /* @__PURE__ */ t("div", { className: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10", children: /* @__PURE__ */ d(
                "button",
                {
                  type: "button",
                  onClick: R,
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
          Yl,
          {
            refInfo: b.ref,
            onDone: h,
            configureField: a
          }
        ) })
      ]
    }
  ) });
}
function ha({
  id: e = "QueryPrefs",
  columns: n,
  prefs: r,
  maxLimit: s,
  onDone: a,
  onSave: l
}) {
  const { autoQueryGridDefaults: o } = xn(), [u, c] = F({}), m = [10, 25, 50, 100, 250, 500, 1e3];
  xe(() => {
    c(Object.assign({
      take: o.take,
      selectedColumns: []
    }, r));
  }, [r, o.take]);
  function y() {
    a?.();
  }
  function C() {
    l?.(u);
  }
  const w = (k) => {
    c((O) => ({ ...O, take: parseInt(k.target.value) }));
  }, b = () => {
    c((k) => ({ ...k, selectedColumns: [] }));
  }, L = (k, O) => {
    c((S) => {
      const p = S.selectedColumns || [];
      return O ? { ...S, selectedColumns: [...p, k] } : { ...S, selectedColumns: p.filter((R) => R !== k) };
    });
  };
  return /* @__PURE__ */ d(ma, { id: e, onDone: y, sizeClass: "w-full sm:max-w-prose", children: [
    /* @__PURE__ */ t("div", { className: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: /* @__PURE__ */ t("div", { className: "", children: /* @__PURE__ */ d("div", { className: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left", children: [
      /* @__PURE__ */ t("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100", children: "Query Preferences" }),
      /* @__PURE__ */ d("div", { className: "mt-4", children: [
        /* @__PURE__ */ t("label", { htmlFor: `${e}-take`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Results per page" }),
        /* @__PURE__ */ t(
          "select",
          {
            id: `${e}-take`,
            value: u.take,
            onChange: w,
            className: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
            children: m.filter((k) => s == null || k <= s).map((k) => /* @__PURE__ */ t("option", { value: k, children: k }, k))
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800", children: [
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
      /* @__PURE__ */ t("div", { className: "mt-4", children: /* @__PURE__ */ t("div", { className: "pb-2 px-4", children: /* @__PURE__ */ t("div", { className: "", children: n.map((k) => /* @__PURE__ */ d("div", { className: "flex items-center", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            id: k.name,
            value: k.name,
            checked: u.selectedColumns?.includes(k.name) || !1,
            onChange: (O) => L(k.name, O.target.checked),
            className: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
          }
        ),
        /* @__PURE__ */ t("label", { htmlFor: k.name, className: "ml-3", children: k.name })
      ] }, k.name)) }) }) })
    ] }) }) }),
    /* @__PURE__ */ d("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
      /* @__PURE__ */ t(ln, { onClick: C, color: "red", className: "ml-2", children: "Save" }),
      /* @__PURE__ */ t(Wt, { onClick: y, children: "Cancel" })
    ] })
  ] });
}
const ga = (e) => {
  const {
    value: n,
    status: r,
    id: s,
    inputClass: a,
    filterClass: l,
    label: o,
    labelClass: u,
    help: c,
    onChange: m,
    className: y,
    ...C
  } = e, w = Mt(), b = o ?? Be(ht(s)), L = i(
    () => r || w?.error,
    [r, w?.error]
  ), k = i(
    () => Lt.call({ responseStatus: L }, s),
    [L, s]
  ), O = i(
    () => Pt(
      [
        "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800",
        a
      ],
      "CheckboxInput",
      l
    ),
    [a, l]
  ), S = (p) => {
    m && m(p.target.checked);
  };
  return /* @__PURE__ */ d("div", { className: `relative flex items-start ${y ?? ""}`, children: [
    /* @__PURE__ */ t("div", { className: "flex items-center h-5", children: /* @__PURE__ */ t(
      "input",
      {
        id: s,
        name: s,
        type: "checkbox",
        checked: n ?? !1,
        onChange: S,
        className: O,
        ...Nt(C, ["class"])
      }
    ) }),
    /* @__PURE__ */ d("div", { className: "ml-3 text-sm", children: [
      /* @__PURE__ */ t(
        "label",
        {
          htmlFor: s,
          className: `font-medium text-gray-700 dark:text-gray-300 ${u ?? ""}`,
          children: b
        }
      ),
      k ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${s}-error`, children: k }) : c ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${s}-description`, children: c }) : null
    ] })
  ] });
};
ga.displayName = "CheckboxInput";
const to = ({
  id: e,
  type: n,
  inputClass: r,
  filterClass: s,
  label: a,
  labelClass: l,
  help: o,
  value: u,
  delimiters: c = [","],
  allowableValues: m,
  string: y,
  maxVisibleItems: C = 300,
  converter: w,
  status: b,
  onChange: L,
  ...k
}) => {
  const O = Mt(), [S, p] = F(""), [R, v] = F(!1), [h, A] = F(), [H, $] = F(!1), J = Je(null), Y = N((f) => w ? w(f) : f, [w]), ne = i(() => {
    const f = Y(u || []);
    return (Array.isArray(f) ? f : [f]).flatMap(
      (oe) => typeof oe == "string" && oe.trim().length > 0 ? oe.split(",").filter((j) => j.trim()) : []
    );
  }, [u, Y]), T = i(() => {
    const f = S.toLowerCase();
    return !m || m.length === 0 ? [] : m.length < 1e3 ? m.filter((q) => !ne.includes(q) && q.toLowerCase().includes(f)) : m.filter((q) => !ne.includes(q) && q.startsWith(f));
  }, [S, m, ne]), M = n || "text", E = a ?? Be(ht(e)), x = i(
    () => b || O?.error,
    [b, O?.error]
  ), V = i(
    () => Lt.call({ responseStatus: x }, e),
    [x, e]
  ), Z = i(() => Pt(
    [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      V ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      r
    ],
    "TagInput",
    s
  ), [V, r, s]), X = N((f) => {
    const q = y ? f.join(",") : f;
    L?.(q);
  }, [y, L]), I = N((f) => {
    X(ne.filter((q) => q !== f));
  }, [ne, X]), ee = (f) => {
    document.activeElement === f.currentTarget && J.current?.focus();
  }, Q = N(() => {
    v(!0), $(!0);
  }, []), Le = () => {
    Q();
  }, _ = N(() => {
    if (S.length === 0) return "";
    let f = Ja(S.trim(), ",");
    return f[0] === "," && (f = f.substring(1)), f = f.trim(), f.length === 0 && R && T.length > 0 ? h : f;
  }, [S, R, T, h]), ye = N((f) => {
    if (!f || f.length === 0) return;
    const q = Array.from(ne);
    q.indexOf(f) === -1 && q.push(f), X(q), p(""), v(!1);
  }, [ne, X]), te = N(() => {
    ye(_()), $(!1), setTimeout(() => {
      $((f) => (f || v(!1), f));
    }, 200);
  }, [ye, _]), ce = N(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-tag li.active`);
      f && f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, 0);
  }, [e]), ge = N(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-tag li.active`);
      f && ("scrollIntoViewIfNeeded" in f ? f.scrollIntoViewIfNeeded({ behavior: "smooth", block: "nearest", inline: "nearest" }) : f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" }));
    }, 0);
  }, [e]), $e = N((f) => {
    if (f.key === "Backspace" && S.length === 0 && ne.length > 0 && I(ne[ne.length - 1]), !(!m || m.length === 0))
      if (f.code === "Escape" || f.code === "Tab")
        v(!1);
      else if (f.code === "Home")
        A(T[0]), ce();
      else if (f.code === "End")
        A(T[T.length - 1]), ce();
      else if (f.code === "ArrowDown") {
        if (v(!0), !h)
          A(T[0]);
        else {
          const q = T.indexOf(h);
          A(q + 1 < T.length ? T[q + 1] : T[0]);
        }
        ge();
      } else if (f.code === "ArrowUp") {
        if (!h)
          A(T[T.length - 1]);
        else {
          const q = T.indexOf(h);
          A(q - 1 >= 0 ? T[q - 1] : T[T.length - 1]);
        }
        ge();
      } else f.code === "Enter" ? h && R ? (ye(h), f.preventDefault()) : v(!1) : v(T.length > 0);
  }, [S, ne, I, m, T, h, R, ye, ce, ge]), le = N((f) => {
    const q = _();
    if (q && q.length > 0) {
      const oe = c.some((re) => re === f.key);
      if (oe && f.preventDefault(), f.key === "Enter" || f.key === "NumpadEnter" || f.key.length === 1 && oe) {
        ye(q);
        return;
      }
    }
  }, [_, c, ye]), be = N((f) => {
    if (!f) return;
    const q = new RegExp(`\\n|\\t|${c.join("|")}`), oe = Array.from(ne);
    f.split(q).map((re) => re.trim()).forEach((re) => {
      oe.indexOf(re) === -1 && oe.push(re);
    }), X(oe), p("");
  }, [c, ne, X]), pe = N((f) => {
    f.preventDefault(), f.stopPropagation();
    const q = f.clipboardData?.getData("Text");
    be(q);
  }, [be]), Me = N((f) => {
    A(f);
  }, []);
  return /* @__PURE__ */ d("div", { className: k.className, id: `${e}-tag`, onMouseMove: () => $(!0), children: [
    E && /* @__PURE__ */ t("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${l ?? ""}`, children: E }),
    /* @__PURE__ */ d("div", { className: "mt-1 relative", children: [
      /* @__PURE__ */ t("input", { type: "hidden", id: e, name: e, value: ne.join(",") }),
      /* @__PURE__ */ t("div", { className: Z, onClick: ee, onFocus: Le, tabIndex: -1, children: /* @__PURE__ */ d("div", { className: "flex flex-wrap pb-1.5", children: [
        ne.map((f, q) => /* @__PURE__ */ t("div", { className: "pt-1.5 pl-1", children: /* @__PURE__ */ d("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300", children: [
          f,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: (oe) => {
                oe.stopPropagation(), I(f);
              },
              className: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black",
              children: /* @__PURE__ */ t("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
            }
          )
        ] }) }, q)),
        /* @__PURE__ */ t("div", { className: "pt-1.5 pl-1 shrink", children: /* @__PURE__ */ t(
          "input",
          {
            ref: J,
            type: M,
            role: "combobox",
            "aria-controls": "options",
            "aria-expanded": "false",
            autoComplete: "off",
            spellCheck: "false",
            name: `${e}-txt`,
            id: `${e}-txt`,
            className: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
            style: { boxShadow: "none !important", width: `${S.length + 1}ch` },
            value: S,
            onChange: (f) => p(f.target.value),
            "aria-invalid": V != null,
            "aria-describedby": `${e}-error`,
            onKeyDown: $e,
            onKeyPress: le,
            onPaste: pe,
            onFocus: Le,
            onBlur: te,
            onClick: () => v(!0),
            ...k
          }
        ) })
      ] }) }),
      R && T.length > 0 && /* @__PURE__ */ t(
        "ul",
        {
          className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeyDown: $e,
          id: `${e}-options`,
          role: "listbox",
          children: T.slice(0, C).map((f, q) => /* @__PURE__ */ t(
            "li",
            {
              className: `${f === h ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100"} relative cursor-default select-none py-2 pl-3 pr-9`,
              onMouseOver: () => Me(f),
              onClick: () => ye(f),
              role: "option",
              tabIndex: -1,
              children: /* @__PURE__ */ t("span", { className: "block truncate", children: f })
            },
            q
          ))
        }
      ),
      V && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
    ] }),
    V && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: V }),
    !V && o && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: o })
  ] });
}, pa = yt(({
  id: e,
  label: n,
  help: r,
  placeholder: s,
  multiple: a = !1,
  required: l,
  options: o = [],
  value: u,
  match: c,
  viewCount: m = 100,
  pageSize: y = 8,
  status: C,
  onChange: w,
  children: b,
  ...L
}, k) => {
  const [O, S] = F(!1), [p, R] = F(""), [v, h] = F(null), [A, H] = F(m), [$, J] = F([]), Y = Je(null), ne = Mt(), T = n ?? Be(ht(e)), M = i(
    () => C || ne?.error,
    [C, ne?.error]
  ), E = i(
    () => Lt.call({ responseStatus: M }, e),
    [M, e]
  ), x = i(() => [
    mt.base,
    E ? mt.invalid : mt.valid
  ].join(" "), [E]), V = i(() => p ? o.filter((q) => c(q, p)).slice(0, A) : o, [p, o, c, A]), Z = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"], X = N((f) => {
    h(f), $.indexOf(f) > Math.floor(A * 0.9) && (H((oe) => oe + m), pe());
  }, [$, A, m]), I = [",", `
`, "	"], ee = N((f) => {
    if (!f) return;
    const q = I.some((oe) => f.includes(oe));
    if (!a || !q) {
      const oe = o.filter((j) => c(j, f));
      oe.length === 1 && (be(oe[0]), S(!1), Vn());
    } else if (q) {
      const oe = new RegExp("\\r|\\n|\\t|,"), re = f.split(oe).filter((g) => g.trim()).map((g) => o.find((D) => c(D, g))).filter((g) => !!g);
      if (re.length > 0) {
        R(""), S(!1), h(null);
        let g = Array.from(u || []);
        re.forEach((D) => {
          le(D) ? g = g.filter((W) => W !== D) : g.push(D);
        }), w?.(g), Vn();
      }
    }
  }, [a, o, c, u, w]), Q = N((f) => {
    const q = f.clipboardData?.getData("Text");
    ee(q);
  }, [ee]), Le = N((f) => {
    Z.indexOf(f.code) || $e();
  }, [Z]), _ = N(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-autocomplete li.active`);
      f && f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, 0);
  }, [e]), ye = N(() => {
    setTimeout(() => {
      const f = document.querySelector(`#${e}-autocomplete li.active`);
      f && ("scrollIntoViewIfNeeded" in f ? f.scrollIntoViewIfNeeded({ behavior: "smooth", block: "nearest", inline: "nearest" }) : f.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" }));
    }, 0);
  }, [e]), te = N((f) => {
    if (!(f.shiftKey || f.ctrlKey || f.altKey)) {
      if (!O) {
        f.code === "ArrowDown" && (S(!0), h($[0]));
        return;
      }
      if (f.code === "Escape")
        O && (f.stopPropagation(), S(!1));
      else if (f.code === "Tab")
        S(!1);
      else if (f.code === "Home")
        h($[0]), _();
      else if (f.code === "End")
        h($[$.length - 1]), _();
      else if (f.code === "ArrowDown") {
        if (!v)
          h($[0]);
        else {
          const q = $.indexOf(v);
          h(q + 1 < $.length ? $[q + 1] : $[0]);
        }
        ye();
      } else if (f.code === "ArrowUp") {
        if (!v)
          h($[$.length - 1]);
        else {
          const q = $.indexOf(v);
          h(q - 1 >= 0 ? $[q - 1] : $[$.length - 1]);
        }
        ye();
      } else f.code === "Enter" && (v ? (be(v), a || (f.preventDefault(), Vn())) : S(!1));
    }
  }, [O, $, v, a, _, ye]), ce = N((f) => {
    S(f), f && (pe(), Y.current?.focus());
  }, []);
  bt(k, () => ({
    toggle: ce
  }), [ce]);
  const ge = N(() => {
    !a && u ? (S((f) => !f), O || pe()) : $e();
  }, [a, u, O]), $e = N(() => {
    S(!0), pe();
  }, []), le = N((f) => Array.isArray(u) && u.indexOf(f) >= 0, [u]), be = N((f) => {
    if (R(""), S(!1), a) {
      let q = Array.from(u || []);
      le(f) ? q = q.filter((oe) => oe !== f) : q.push(f), h(null), w?.(q);
    } else
      w?.(f);
  }, [a, u, le, w]), pe = N(() => {
    J(V);
  }, [V]);
  xe(() => {
    pe();
  }, [p, pe]);
  const Me = N((f) => typeof f == "string" ? b ? b({ key: f, value: f }) : /* @__PURE__ */ t("span", { className: "block truncate", children: f }) : b ? b(f) : /* @__PURE__ */ t("span", { className: "block truncate", children: JSON.stringify(f) }), [b]);
  return /* @__PURE__ */ d("div", { id: `${e}-autocomplete`, children: [
    T && /* @__PURE__ */ t("label", { htmlFor: `${e}-text`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: T }),
    /* @__PURE__ */ d("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: Y,
          id: `${e}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autoComplete: "off",
          spellCheck: "false",
          value: p,
          onChange: (f) => R(f.target.value),
          className: x,
          placeholder: a || !u ? s : "",
          readOnly: !a && !!u && !O,
          onKeyDown: te,
          onKeyUp: Le,
          onClick: ge,
          onPaste: Q,
          required: !1,
          ...L
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => ce(!O),
          className: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabIndex: -1,
          children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z", clipRule: "evenodd" }) })
        }
      ),
      O && /* @__PURE__ */ t(
        "ul",
        {
          className: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeyDown: te,
          id: `${e}-options`,
          role: "listbox",
          children: $.map((f, q) => /* @__PURE__ */ d(
            "li",
            {
              className: `${f === v ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100"} relative cursor-default select-none py-2 pl-3 pr-9`,
              onMouseOver: () => X(f),
              onClick: () => be(f),
              role: "option",
              tabIndex: -1,
              children: [
                Me(f),
                le(f) && /* @__PURE__ */ t("span", { className: `absolute inset-y-0 right-0 flex items-center pr-4 ${f === v ? "text-white" : "text-indigo-600"}`, children: /* @__PURE__ */ t("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z", clipRule: "evenodd" }) }) })
              ]
            },
            q
          ))
        }
      ),
      !O && !a && u && /* @__PURE__ */ t("div", { onKeyDown: te, className: "h-8 -mt-8 ml-3 pt-0.5 pointer-events-none", children: Me(u) }),
      E && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", tabIndex: -1, children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
    ] }),
    E && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: E }),
    !E && r && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: r })
  ] });
});
pa.displayName = "Autocomplete";
const va = yt(({
  status: e,
  id: n,
  value: r,
  multiple: s,
  options: a,
  values: l,
  entries: o,
  onChange: u,
  children: c,
  ...m
}, y) => {
  const C = Je(null), [w, b] = F(null), L = i(
    () => s ?? Array.isArray(r),
    [s, r]
  ), k = N((h, A) => !A || h.value.toLowerCase().includes(A.toLowerCase()), []), O = i(
    () => o || (l ? l.map((h) => ({ key: h, value: h })) : a ? Object.keys(a).map((h) => ({ key: h, value: a[h] })) : []),
    [o, l, a]
  ), S = N((h) => {
    u?.(h);
  }, [u]), p = N(() => {
    let h = r && typeof r == "object" && !Array.isArray(r) ? r.key : r;
    h == null || h === "" ? b(L ? [] : null) : typeof h == "string" ? b(O.find((A) => A.key === h) || null) : Array.isArray(h) && b(O.filter((A) => h.includes(A.key)));
  }, [r, L, O]);
  xe(() => {
    p();
  }, [p]);
  const R = i(
    () => w == null ? "" : Array.isArray(w) ? w.map((h) => encodeURIComponent(h.key)).join(",") : w.key,
    [w]
  ), v = N((h) => {
    C.current?.toggle(h);
  }, []);
  return bt(y, () => ({
    toggle: v
  }), [v]), /* @__PURE__ */ d(yn, { children: [
    /* @__PURE__ */ t("input", { type: "hidden", id: n, name: n, value: R }),
    /* @__PURE__ */ t(
      pa,
      {
        ref: C,
        id: n,
        status: e,
        options: O,
        match: k,
        multiple: L,
        value: w,
        onChange: S,
        ...m,
        children: ({ key: h, value: A }) => /* @__PURE__ */ t("span", { className: "block truncate", children: A })
      }
    )
  ] });
});
va.displayName = "Combobox";
const no = ({
  id: e,
  multiple: n,
  inputClass: r,
  filterClass: s,
  label: a,
  labelClass: l,
  help: o,
  placeholder: u,
  value: c,
  values: m,
  files: y,
  status: C,
  onChange: w,
  ...b
}) => {
  const L = Mt(), k = Je(null), [O, S] = F(), [p, R] = F({}), [v, h] = F(() => y && y.length > 0 ? y.map(A) : m && m.length > 0 ? m.map((I) => {
    let ee = I.replace(/\\/g, "/");
    return {
      fileName: ys(qt(ee, "/"), "."),
      filePath: ee,
      contentType: vr(ee)
    };
  }).map(A) : []);
  function A(I) {
    return I.filePath = Rt(I.filePath), I;
  }
  const H = a ?? Be(ht(e)), $ = u ?? H, J = i(
    () => C || L?.error,
    [C, L?.error]
  ), Y = i(
    () => Lt.call({ responseStatus: J }, e),
    [J, e]
  ), ne = i(() => Pt(
    [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      Y ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      r
    ],
    "FileInput",
    s
  ), [Y, r, s]), T = N((I) => {
    const ee = I.target;
    S(""), h(Array.from(ee.files || []).map((Q) => ({
      fileName: Q.name,
      filePath: $r(Q),
      contentLength: Q.size,
      contentType: Q.type || vr(Q.name)
    })));
  }, []), M = N(() => {
    k.current?.click();
  }, []), E = N(
    (I) => I == null ? !1 : I.startsWith("data:") || I.startsWith("blob:"),
    []
  ), x = i(() => {
    if (v.length > 0)
      return v[0].filePath;
    let I = typeof c == "string" ? c : m && m[0];
    return I && Vt(Rt(I)) || null;
  }, [v, c, m]), V = N(
    (I) => !I || I.startsWith("data:") || I.endsWith(".svg") ? "" : "rounded-full object-cover",
    []
  ), Z = N((I) => {
    S(xr(x));
  }, [x]), X = N((I) => {
    R((ee) => ({
      ...ee,
      [Vt(I)]: xr(Vt(I))
    }));
  }, []);
  return xe(() => () => Ls(), []), /* @__PURE__ */ d("div", { className: `flex ${n ? "flex-col" : "justify-between"}`, children: [
    /* @__PURE__ */ d("div", { className: "relative flex-grow mr-2 sm:mr-4", children: [
      H && /* @__PURE__ */ t("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${l ?? ""}`, children: H }),
      /* @__PURE__ */ d("div", { className: "block mt-2", children: [
        /* @__PURE__ */ t("span", { className: "sr-only", children: o ?? H }),
        /* @__PURE__ */ t(
          "input",
          {
            ref: k,
            type: "file",
            multiple: n,
            name: e,
            id: e,
            className: ne,
            placeholder: $,
            "aria-invalid": Y != null,
            "aria-describedby": `${e}-error`,
            onChange: T,
            ...b
          }
        ),
        Y && /* @__PURE__ */ t("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
      ] }),
      Y && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: Y }),
      !Y && o && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: o })
    ] }),
    n ? /* @__PURE__ */ t("div", { className: "mt-3", children: /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: v.map((I, ee) => /* @__PURE__ */ d("tr", { children: [
      /* @__PURE__ */ t("td", { className: "pr-6 align-bottom pb-2", children: /* @__PURE__ */ d("div", { className: "flex w-full", title: E(I.filePath) ? "" : I.filePath, children: [
        /* @__PURE__ */ t(
          "img",
          {
            src: p[Vt(I.filePath)] || Rt(Vt(I.filePath)),
            className: `mr-2 h-8 w-8 ${V(I.filePath)}`,
            onError: () => X(I.filePath),
            alt: ""
          }
        ),
        E(I.filePath) ? /* @__PURE__ */ t("span", { className: "overflow-hidden", children: I.fileName }) : /* @__PURE__ */ t("a", { href: Rt(I.filePath || ""), target: "_blank", rel: "noopener noreferrer", className: "overflow-hidden", children: I.fileName })
      ] }) }),
      /* @__PURE__ */ t("td", { className: "align-top pb-2 whitespace-nowrap", children: I.contentLength && I.contentLength > 0 && /* @__PURE__ */ t("span", { className: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black", children: Ir(I.contentLength) }) })
    ] }, ee)) }) }) }) : /* @__PURE__ */ t("div", { children: x && /* @__PURE__ */ t("div", { className: "shrink-0 cursor-pointer", title: E(x) ? "" : x, children: /* @__PURE__ */ t(
      "img",
      {
        onClick: M,
        className: `h-16 w-16 ${V(x)}`,
        alt: `Current ${H ?? ""}`,
        src: O || Rt(x),
        onError: Z
      }
    ) }) })
  ] });
}, ya = (e) => {
  const {
    status: n,
    id: r,
    inputClass: s,
    filterClass: a,
    label: l,
    labelClass: o,
    help: u,
    placeholder: c,
    value: m,
    onChange: y,
    className: C,
    ...w
  } = e, b = Mt(), L = l ?? Be(ht(r)), k = c ?? L, O = i(
    () => n || b?.error,
    [n, b?.error]
  ), S = i(
    () => Lt.call({ responseStatus: O }, r),
    [O, r]
  ), p = i(
    () => Pt(
      [
        "shadow-sm " + mt.base,
        S ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + mt.valid,
        s
      ],
      "TextareaInput",
      a
    ),
    [S, s, a]
  ), R = (v) => {
    y && y(v.target.value);
  };
  return /* @__PURE__ */ d("div", { className: C, children: [
    L && /* @__PURE__ */ t(
      "label",
      {
        htmlFor: r,
        className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${o ?? ""}`,
        children: L
      }
    ),
    /* @__PURE__ */ t("div", { className: "mt-1 relative", children: /* @__PURE__ */ t(
      "textarea",
      {
        name: r,
        id: r,
        className: p,
        placeholder: k,
        value: m ?? "",
        onChange: R,
        "aria-invalid": S != null,
        "aria-describedby": `${r}-error`,
        ...Nt(w, ["class"])
      }
    ) }),
    S ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${r}-error`, children: S }) : u ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${r}-description`, children: u }) : null
  ] });
};
ya.displayName = "TextareaInput";
const ba = yt(({
  status: e,
  id: n,
  inputClass: r,
  filterClass: s,
  label: a,
  labelClass: l,
  help: o,
  placeholder: u,
  value: c = "",
  counter: m,
  rows: y = 6,
  errorMessages: C,
  lang: w,
  autoFocus: b,
  disabled: L,
  helpUrl: k = "https://guides.github.com/features/mastering-markdown/",
  hide: O,
  onChange: S,
  onClose: p
}, R) => {
  const v = Je(null), h = Je([]), A = Je([]), H = Mt(), $ = i(
    () => e || H?.error,
    [e, H?.error]
  ), J = i(
    () => Lt.call({ responseStatus: $ }, n),
    [$, n]
  ), Y = i(
    () => a ?? Be(ht(n)),
    [a, n]
  ), ne = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), T = i(
    () => O ? Bt(ne, O) : Bt(ne, []),
    [O]
  ), M = (j) => T[j], E = i(
    () => Pt(
      [
        "shadow-sm font-mono" + mt.base.replace("rounded-md", ""),
        J ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + mt.valid,
        r
      ],
      "MarkdownInput",
      s
    ),
    [J, r, s]
  ), x = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", V = (j) => {
    S?.(j);
  }, Z = () => v.current.selectionStart !== v.current.selectionEnd, X = () => {
    const j = v.current;
    return j.value.substring(j.selectionStart, j.selectionEnd) || "";
  }, I = () => {
    const j = v.current, re = j.value, g = j.selectionStart, D = re.substring(g, j.selectionEnd) || "", W = re.substring(0, g), me = W.lastIndexOf(`
`);
    return {
      value: re,
      sel: D,
      selPos: g,
      beforeSel: W,
      afterSel: re.substring(g),
      prevCRPos: me,
      beforeCR: me >= 0 ? W.substring(0, me + 1) : "",
      afterCR: me >= 0 ? W.substring(me + 1) : ""
    };
  }, ee = ({ value: j, selectionStart: re, selectionEnd: g }) => {
    g == null && (g = re), V(j), setTimeout(() => {
      v.current?.focus(), v.current?.setSelectionRange(re, g);
    }, 0);
  }, Q = (j, re, g = "", D = {}) => {
    const {
      selectionAtEnd: W,
      offsetStart: me,
      offsetEnd: se,
      filterValue: Se,
      filterSelection: de
    } = D, Ce = v.current;
    let ve = Ce.value, ke = Ce.selectionEnd;
    h.current.push({
      value: ve,
      selectionStart: Ce.selectionStart,
      selectionEnd: Ce.selectionEnd
    }), A.current = [];
    const We = Ce.selectionStart, je = Ce.selectionEnd;
    let He = ve.substring(0, We), qe = ve.substring(je);
    const we = j && He.endsWith(j) && qe.startsWith(re), Ie = We == je;
    let Ke = me, Ee = se;
    if (Ie) {
      if (we ? (ve = He.substring(0, He.length - j.length) + qe.substring(re.length), ke += -re.length) : (ve = He + j + g + re + qe, ke += j.length, Ke = 0, Ee = g?.length || 0, W && (ke += Ee, Ee = 0)), Se) {
        var Fe = { pos: ke };
        ve = Se(ve, Fe), ke = Fe.pos;
      }
    } else {
      var De = ve.substring(We, je);
      de && (De = de(De)), we ? (ve = He.substring(0, He.length - j.length) + De + qe.substring(re.length), Ke = -De.length - j.length, Ee = De.length) : (ve = He + j + De + re + qe, Ke ? ke += (j + re).length : (ke = We, Ke = j.length, Ee = De.length));
    }
    V(ve), setTimeout(() => {
      Ce.focus();
      const tt = ke + (Ke || 0), _e = (tt || 0) + (Ee || 0);
      Ce.setSelectionRange(tt, _e);
    }, 0);
  }, Le = () => Q("**", "**", "bold"), _ = () => Q("_", "_", "italics"), ye = () => Q("~~", "~~", "strikethrough"), te = () => Q("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), ce = () => Q(`
> `, `
`, "Blockquote", {}), ge = () => Q("![](", ")"), $e = (j) => {
    const re = X();
    if (re && !("shiftKey" in j && j.shiftKey))
      Q("`", "`", "code");
    else {
      const g = w || "js";
      re.indexOf(`
`) === -1 ? Q("\n```" + g + `
`, "\n```\n", "// code") : Q("```" + g + `
`, "```\n", "");
    }
  }, le = () => {
    if (Z()) {
      let { sel: j, selPos: re, beforeSel: g, afterSel: D, prevCRPos: W, beforeCR: me, afterCR: se } = I();
      if (j.indexOf(`
`) === -1)
        Q(`
 1. `, `
`);
      else if (!j.startsWith(" 1. ")) {
        let Ce = 1;
        Q("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (ve) => " 1. " + ve.replace(/\n$/, "").replace(/\n/g, () => `
 ${++Ce}. `) + `
`
        });
      } else
        Q("", "", "", {
          filterValue: (Ce, ve) => {
            if (W >= 0) {
              let ke = se.replace(/^ - /, "");
              g = me + ke, ve.pos -= se.length - ke.length;
            }
            return g + D;
          },
          filterSelection: (Ce) => Ce.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
        });
    } else
      Q(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
  }, be = () => {
    if (Z()) {
      let { sel: j, selPos: re, beforeSel: g, afterSel: D, prevCRPos: W, beforeCR: me, afterCR: se } = I();
      j.indexOf(`
`) === -1 ? Q(`
 - `, `
`) : !j.startsWith(" - ") ? Q("", "", " - ", {
        selectionAtEnd: !0,
        filterSelection: (Ce) => " - " + Ce.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
      }) : Q("", "", "", {
        filterValue: (Ce, ve) => {
          if (W >= 0) {
            let ke = se.replace(/^ - /, "");
            g = me + ke, ve.pos -= se.length - ke.length;
          }
          return g + D;
        },
        filterSelection: (Ce) => Ce.replace(/^ - /g, "").replace(/\n - /g, `
`)
      });
    } else
      Q(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
  }, pe = () => {
    const j = X(), re = j.indexOf(`
`) === -1;
    j ? re ? Q(`
## `, `
`, "") : Q("## ", "", "") : Q(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
  }, Me = () => {
    let { sel: j, selPos: re, beforeSel: g, afterSel: D, prevCRPos: W, beforeCR: me, afterCR: se } = I();
    !j.startsWith("//") && !se.startsWith("//") ? j ? Q("", "", "//", {
      selectionAtEnd: !0,
      filterSelection: (de) => "//" + de.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
    }) : ee({
      value: me + "//" + se + D,
      selectionStart: re + 2
    }) : Q("", "", "", {
      filterValue: (de, Ce) => {
        if (W >= 0) {
          let ve = se.replace(/^\/\//, "");
          g = me + ve, Ce.pos -= se.length - ve.length;
        }
        return g + D;
      },
      filterSelection: (de) => de.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
    });
  }, f = () => Q(`/*
`, `*/
`, ""), q = () => {
    if (h.current.length === 0) return !1;
    const j = v.current, re = h.current.pop();
    return A.current.push({
      value: j.value,
      selectionStart: j.selectionStart,
      selectionEnd: j.selectionEnd
    }), ee(re), !0;
  }, oe = () => {
    if (A.current.length === 0) return !1;
    const j = v.current, re = A.current.pop();
    return h.current.push({
      value: j.value,
      selectionStart: j.selectionStart,
      selectionEnd: j.selectionEnd
    }), ee(re), !0;
  };
  return xe(() => {
    h.current = [], A.current = [];
    const j = v.current;
    if (!j) return;
    const re = (g) => {
      if (g.key === "Escape" || g.keyCode === 27) {
        p?.();
        return;
      }
      const D = String.fromCharCode(g.keyCode).toLowerCase();
      D === "	" ? (!g.shiftKey ? Q("", "", "    ", {
        selectionAtEnd: !0,
        filterSelection: (me) => "    " + me.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
      }) : Q("", "", "", {
        filterValue: (me, se) => {
          let { selPos: Se, beforeSel: de, afterSel: Ce, prevCRPos: ve, beforeCR: ke, afterCR: We } = I();
          if (ve >= 0) {
            let je = We.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
            de = ke + je, se.pos -= We.length - je.length;
          }
          return de + Ce;
        },
        filterSelection: (me) => me.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
      }), g.preventDefault()) : g.ctrlKey ? D === "z" ? g.shiftKey ? oe() && g.preventDefault() : q() && g.preventDefault() : D === "b" && !g.shiftKey ? (Le(), g.preventDefault()) : D === "h" && !g.shiftKey ? (pe(), g.preventDefault()) : D === "i" && !g.shiftKey ? (_(), g.preventDefault()) : D === "q" && !g.shiftKey ? (ce(), g.preventDefault()) : D === "k" ? g.shiftKey ? (ge(), g.preventDefault()) : (te(), g.preventDefault()) : D === "," || g.key === "<" || g.key === ">" || g.keyCode === 188 ? ($e(g), g.preventDefault()) : D === "/" || g.key === "/" ? (Me(), g.preventDefault()) : (D === "?" || g.key === "?") && g.shiftKey && (f(), g.preventDefault()) : g.altKey && (g.key === "1" || g.key === "0" ? (le(), g.preventDefault()) : g.key === "-" ? (be(), g.preventDefault()) : g.key === "s" && (ye(), g.preventDefault()));
    };
    return j.addEventListener("keydown", re), () => {
      j.removeEventListener("keydown", re);
    };
  }, [c, S]), bt(R, () => ({
    textarea: v,
    updateModelValue: V,
    selection: X,
    hasSelection: Z,
    selectionInfo: I,
    insert: Q,
    replace: ee
  })), /* @__PURE__ */ d("div", { children: [
    Y && /* @__PURE__ */ t("label", { htmlFor: n, className: `mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${l ?? ""}`, children: Y }),
    !L && /* @__PURE__ */ d("div", { className: "border border-gray-200 flex justify-between shadow-sm", children: [
      /* @__PURE__ */ d("div", { className: "p-2 flex flex-wrap gap-x-4", children: [
        M("bold") && /* @__PURE__ */ d("svg", { className: x, onClick: Le, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Bold text (CTRL+B)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" })
        ] }),
        M("italics") && /* @__PURE__ */ d("svg", { className: x, onClick: _, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Italics (CTRL+I)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" })
        ] }),
        M("link") && /* @__PURE__ */ d("svg", { className: x, onClick: te, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Insert Link (CTRL+K)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z" })
        ] }),
        M("blockquote") && /* @__PURE__ */ d("svg", { className: x, onClick: ce, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Blockquote (CTRL+Q)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z" })
        ] }),
        M("image") && /* @__PURE__ */ d("svg", { className: x, onClick: ge, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Insert Image (CTRL+SHIFT+L)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z" })
        ] }),
        M("code") && /* @__PURE__ */ d("svg", { className: x, onClick: $e, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Insert Code (CTRL+<)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z" })
        ] }),
        M("heading") && /* @__PURE__ */ d("svg", { className: x, onClick: pe, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "H2 Heading (CTRL+H)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z" })
        ] }),
        M("orderedList") && /* @__PURE__ */ d("svg", { className: x, onClick: le, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Numbered List (ALT+1)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z" })
        ] }),
        M("unorderedList") && /* @__PURE__ */ d("svg", { className: x, onClick: be, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Bulleted List (ALT+-)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z" })
        ] }),
        M("strikethrough") && /* @__PURE__ */ d("svg", { className: x, onClick: ye, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Strike Through (ALT+S)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" })
        ] }),
        M("undo") && /* @__PURE__ */ d("svg", { className: x, onClick: q, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Undo (CTRL+Z)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" })
        ] }),
        M("redo") && /* @__PURE__ */ d("svg", { className: x, onClick: oe, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ t("title", { children: "Redo (CTRL+SHIFT+Z)" }),
          /* @__PURE__ */ t("path", { fill: "currentColor", d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" })
        ] })
      ] }),
      M("help") && k && /* @__PURE__ */ t("div", { className: "p-2 flex flex-wrap gap-x-4", children: /* @__PURE__ */ t("a", { title: "formatting help", target: "_blank", href: k, tabIndex: -1, rel: "noreferrer", children: /* @__PURE__ */ t("svg", { className: x, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z" }) }) }) })
    ] }),
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
      "textarea",
      {
        ref: v,
        name: n,
        id: n,
        className: E,
        value: c,
        rows: y,
        disabled: L,
        onChange: (j) => V(j.target.value),
        onKeyDown: (j) => {
          j.key === "Tab" && j.preventDefault();
        }
      }
    ) }),
    J ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${n}-error`, children: J }) : o ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${n}-description`, children: o }) : null
  ] });
});
ba.displayName = "MarkdownInput";
function ro({
  input: e,
  value: n,
  onChange: r,
  api: s
}) {
  const a = i(() => e.type || "text", [e.type]), l = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), o = i(() => Nt(e, l), [e]), [u, c] = F(
    a === "file" ? null : n[e.id]
  );
  xe(() => {
    n[e.id] = u, r?.(n);
  }, [u]);
  const m = i(() => {
    const C = n[e.id];
    if (e.type !== "file" || !C) return [];
    if (typeof C == "string") return [{ filePath: C, fileName: qt(C, "/") }];
    if (!Array.isArray(C) && typeof C == "object") return C;
    if (Array.isArray(C)) {
      const w = [];
      return C.forEach((b) => {
        typeof b == "string" ? w.push({ filePath: b, fileName: qt(b, "/") }) : typeof b == "object" && w.push(b);
      }), w;
    }
    return [];
  }, [n, e.id, e.type]), y = B.component(a);
  return y ? /* @__PURE__ */ t(
    y,
    {
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...o
    }
  ) : a === "select" ? /* @__PURE__ */ t(
    _r,
    {
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      entries: e.allowableEntries,
      values: e.allowableValues,
      ...o
    }
  ) : a === "checkbox" ? /* @__PURE__ */ t(
    ga,
    {
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...o
    }
  ) : a === "tag" ? /* @__PURE__ */ t(
    to,
    {
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      allowableValues: e.allowableValues,
      string: e.prop?.type == "String",
      ...o
    }
  ) : a === "combobox" ? /* @__PURE__ */ t(
    va,
    {
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      entries: e.allowableEntries,
      values: e.allowableValues,
      ...o
    }
  ) : a === "file" ? /* @__PURE__ */ t(
    no,
    {
      id: e.id,
      status: s?.error,
      value: u,
      onChange: c,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      files: m,
      ...o
    }
  ) : a === "textarea" ? /* @__PURE__ */ t(
    ya,
    {
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...o
    }
  ) : a === "MarkdownInput" ? /* @__PURE__ */ t(
    ba,
    {
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...o
    }
  ) : /* @__PURE__ */ t(
    Gr,
    {
      type: a,
      id: e.id,
      value: u,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...o
    }
  );
}
const wa = ({
  id: e,
  status: n,
  input: r,
  metadataType: s,
  value: a,
  label: l,
  labelClass: o,
  help: u,
  onChange: c
}) => {
  const { config: m } = xn(), { metadataApi: y, typeOf: C, typeProperties: w } = dt(), b = It(rn), L = It(Kn), k = It(Zn), [O, S] = F(""), [p, R] = F(""), v = i(() => e || r.id, [e, r.id]), h = i(() => l ?? Be(ht(v)), [l, v]), A = i(
    () => Lt.call({ responseStatus: n ?? b?.error }, v),
    [n, b, v]
  ), H = i(() => Te(a, v), [a, v]), $ = i(
    () => w(s).find((E) => E.name.toLowerCase() === v.toLowerCase()),
    [s, v]
  ), J = i(
    () => C($?.ref?.model)?.icon || m.tableIcon,
    [$, m]
  );
  function Y(E) {
    return E ? r.options ? Object.assign({}, E, nr(r.options, {
      input: r,
      $typeFields: w(s).map((x) => x.name),
      ...B.config.scopeWhitelist
    })) : E : null;
  }
  const ne = i(
    () => Y($?.ref ?? (r.type === "lookup" ? {
      model: s.name,
      refId: sn(s)?.name ?? "id",
      refLabel: s.properties?.find((E) => E.type === "String" && !E.isPrimaryKey)?.name
    } : null)),
    [$, r.type, s]
  );
  function T(E) {
    if (E) {
      if (k == null) {
        console.warn("No ModalProvider required by LookupInput");
        return;
      }
      k.openModal({ name: "ModalLookup", ref: E }, (x) => {
        if (console.debug("openModal", O, " -> ", x, it.setRefValue(E, x), E), x) {
          const V = Te(x, E.refId);
          S(it.setRefValue(E, x) || V);
          const Z = { ...a };
          Z[v] = V, c?.(Z);
        }
      });
    }
  }
  function M() {
    const E = { ...a };
    E[v] = null, c?.(E), S("");
  }
  return xe(() => {
    async function E() {
      const x = a;
      a[v] || (a[v] = null);
      const V = $, Z = ne;
      if (!V || !Z) {
        console.warn(`No RefInfo for property '${v}'`);
        return;
      }
      S("");
      let X = Z.selfId == null ? Te(x, V.name) : Te(x, Z.selfId);
      if (vn(X) && (X = Te(x, Z.refId)), X == null)
        return;
      const ee = y?.operations.find((Q) => Q.dataModel?.name === Z.model);
      if (console.debug("LookupInput queryOp", ee), ee != null) {
        const Q = Te(x, V.name);
        if (vn(Q)) return;
        if (S(`${Q}`), R(V.name), Z.refLabel != null) {
          const Le = w(s).filter((te) => te.type === Z.model);
          Le.length || console.warn(`Could not find ${Z.model} Property on ${s.name}`);
          const _ = Le.map((te) => Te(x, te.name)).filter((te) => !!te), ye = _.length <= 1 ? _[0] : _.find((te) => te[Z.refId ?? "id"] === X);
          if (ye != null) {
            let te = Te(ye, Z.refLabel);
            te && (S(`${te}`), it.setValue(Z.model, X, Z.refLabel, te));
          } else {
            const te = V.attributes?.some((ce) => ce.name === "Computed") === !0;
            if (L && y) {
              let ce = await it.getOrFetchValue(
                L,
                y,
                Z.model,
                Z.refId,
                Z.refLabel,
                te,
                X
              );
              S(ce || `${Z.model}: ${O}`);
            }
          }
        }
      }
    }
    E();
  }, []), /* @__PURE__ */ d("div", { className: "lookup-field", children: [
    /* @__PURE__ */ t("input", { type: "hidden", name: v, value: H || "" }),
    h && /* @__PURE__ */ d("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ t(
        "label",
        {
          htmlFor: v,
          className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${o ?? ""}`,
          children: h
        }
      ),
      H && /* @__PURE__ */ d("div", { className: "flex items-center", children: [
        /* @__PURE__ */ t("span", { className: "text-sm text-gray-500 dark:text-gray-400 pr-1", children: H }),
        /* @__PURE__ */ d(
          "button",
          {
            onClick: M,
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
    ne && /* @__PURE__ */ t("div", { className: "mt-1 relative", children: /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
        onClick: () => T(ne),
        "aria-haspopup": "listbox",
        "aria-expanded": "true",
        "aria-labelledby": "listbox-label",
        children: [
          /* @__PURE__ */ t("span", { className: "w-full inline-flex truncate", children: /* @__PURE__ */ d("span", { className: "text-blue-700 dark:text-blue-300 flex cursor-pointer", children: [
            /* @__PURE__ */ t(Nn, { className: "mr-1 w-5 h-5", image: J }),
            /* @__PURE__ */ t("span", { children: O })
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
    A ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-red-500", id: `${v}-error`, children: A }) : u ? /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-gray-500", id: `${v}-description`, children: u }) : null
  ] });
};
wa.displayName = "LookupInput";
const Kt = yt(({
  value: e,
  type: n,
  metaType: r,
  api: s,
  formLayout: a,
  configureField: l,
  configureFormLayout: o,
  hideSummary: u = !1,
  flexClass: c = "flex flex-1 flex-col justify-between",
  divideClass: m = "divide-y divide-gray-200 px-4 sm:px-6",
  spaceClass: y = "space-y-6 pt-6 pb-5",
  fieldsetClass: C = "grid grid-cols-12 gap-6",
  onChange: w
}, b) => {
  const { metadataApi: L, apiOf: k, typeOf: O, typeOfRef: S, createFormLayout: p, Crud: R } = dt(), v = i(() => Dt(n || e), [n, e]), h = i(() => r ?? O(v), [r, v, O]), A = i(
    () => S(L?.operations.find((M) => M.request.name == v)?.dataModel) || h,
    [L, v, h, S]
  ), H = N(() => {
    const M = h;
    if (!M) {
      if (a) {
        const I = a.map((ee) => {
          const Q = { name: ee.id, type: ul(ee.type) }, Le = Object.assign({ prop: Q }, ee);
          return l && l(Le), Le;
        });
        return o && o(I), I;
      }
      throw new Error(`MetadataType for ${v} not found`);
    }
    const E = ft(M), x = A, V = a ? Array.from(a) : p(M), Z = [], X = k(M.name);
    return V.forEach((I) => {
      const ee = E.find((_) => _.name == I.name);
      if (I.ignore) return;
      const Q = x?.properties?.find((_) => _.name.toLowerCase() == I.name?.toLowerCase()) ?? ee, Le = Object.assign({ prop: Q, op: X }, I);
      l && l(Le), Z.push(Le);
    }), o && o(Z), Z;
  }, [h, a, v, ft, A, p, k, l, o]), $ = i(() => H(), [H]), J = N(
    () => $.filter((M) => M.type != "hidden").map((M) => M.id),
    [$]
  ), Y = N((M, E) => {
    const x = { ...e };
    x[M] = E, w?.(x);
  }, [e, w]), ne = N((M, E) => {
    Y(M.id, Te(E, M.id));
  }, [Y]), T = N(() => {
    w?.({ ...e });
  }, [e, w]);
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
      flexClass: c,
      divideClass: m,
      spaceClass: y,
      fieldsetClass: C,
      onChange: w
    },
    updateValue: Y
  }), [T, e, n, r, s, a, l, o, u, c, m, y, C, w, Y]), /* @__PURE__ */ d(yn, { children: [
    !u && /* @__PURE__ */ t(sr, { status: s?.error, except: J() }),
    /* @__PURE__ */ t("div", { className: c, children: /* @__PURE__ */ t("div", { className: m, children: /* @__PURE__ */ t("div", { className: y, children: /* @__PURE__ */ t("fieldset", { className: C, children: $.map((M) => /* @__PURE__ */ t(
      "div",
      {
        className: [
          "w-full",
          M.css?.field ?? (M.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (M.type == "checkbox" ? " flex items-center" : "")),
          M.type == "hidden" ? "hidden" : ""
        ].join(" "),
        children: M.type === "lookup" || M.prop?.ref != null && M.type != "file" && !M.prop.isPrimaryKey ? /* @__PURE__ */ t(
          wa,
          {
            metadataType: A,
            input: M,
            value: e,
            onChange: (E) => ne(M, E),
            status: s?.error
          }
        ) : /* @__PURE__ */ t(
          ro,
          {
            input: M,
            value: e,
            onChange: w,
            api: s
          }
        )
      },
      M.id
    )) }) }) }) })
  ] });
});
Kt.displayName = "AutoFormFields";
const ar = ({ icon: e = !0, text: n = "loading..." }) => /* @__PURE__ */ d("div", { className: "flex", title: "loading...", children: [
  e && /* @__PURE__ */ d("svg", { xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "24px", height: "30px", viewBox: "0 0 24 30", children: [
    /* @__PURE__ */ d("rect", { x: "0", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
      /* @__PURE__ */ t("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0s", dur: "0.6s", repeatCount: "indefinite" })
    ] }),
    /* @__PURE__ */ d("rect", { x: "8", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
      /* @__PURE__ */ t("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" })
    ] }),
    /* @__PURE__ */ d("rect", { x: "16", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
      /* @__PURE__ */ t("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" }),
      /* @__PURE__ */ t("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" })
    ] })
  ] }),
  /* @__PURE__ */ t("span", { className: "ml-2 mt-1 text-gray-400", children: n })
] });
function so(e) {
  const { typeOf: n } = dt();
  function r(k) {
    return k?.format ? k.format : k?.type === "TimeSpan" || k?.type === "TimeOnly" ? { method: "time" } : null;
  }
  const s = r(e.propType), a = Te(e.value, e.propType.name), l = i(() => Jn(a, s, e), [a, s, e]), o = /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: l } }), u = i(() => vn(a) && Array.isArray(a) ? /* @__PURE__ */ d("span", { children: [
    /* @__PURE__ */ t("span", { className: "mr-2", children: a.length }),
    o
  ] }) : o, [a, o]), c = e.propType?.ref;
  if (!c)
    return u;
  const y = ft(e.type).find((k) => k.type === c.model);
  if (!y)
    return u;
  const C = Te(e.value, y.name), w = C && c.refLabel && Te(C, c.refLabel);
  if (!w)
    return u;
  const L = n(c.model)?.icon;
  return /* @__PURE__ */ d("span", { className: "flex", title: `${c.model} ${a}`, children: [
    L && /* @__PURE__ */ t(Nn, { image: L, className: "w-5 h-5 mr-1" }),
    w
  ] });
}
function ao(e) {
  const {
    value: n,
    format: r,
    includeIcon: s = !0,
    includeCount: a = !0,
    maxFieldLength: l = 150,
    maxNestedFields: o = 2,
    maxNestedFieldLength: u = 30,
    ...c
  } = e, m = i(() => Array.isArray(n), [n]), y = i(() => Jn(n, r, {
    includeIcon: s,
    includeCount: a,
    maxFieldLength: l,
    maxNestedFields: o,
    maxNestedFieldLength: u,
    ...c
  }), [n, r, s, a, l, o, u, c]);
  return vn(n) ? /* @__PURE__ */ d("span", { children: [
    a && m && /* @__PURE__ */ t("span", { className: "mr-2", children: n.length }),
    /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: y } })
  ] }) : /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: y } });
}
function xa({
  id: e = "DataGrid",
  items: n = [],
  tableStyle: r = "stripedRows",
  type: s,
  selectedColumns: a,
  className: l,
  gridClass: o,
  grid2Class: u,
  grid3Class: c,
  grid4Class: m,
  tableClass: y,
  theadClass: C,
  tbodyClass: w,
  theadRowClass: b,
  theadCellClass: L,
  isSelected: k,
  headerTitle: O,
  headerTitles: S,
  visibleFrom: p,
  rowClass: R,
  rowStyle: v,
  onHeaderSelected: h,
  onRowSelected: A,
  slots: H,
  children: $
}) {
  const J = Je(null), { typeOf: Y, typeProperties: ne } = dt(), T = i(() => Dt(s), [s]), M = i(() => Y(T), [T, Y]), E = i(() => ne(M), [M, ne]), x = i(() => {
    if (H)
      return H;
    if ($ && typeof $ == "object" && !et.isValidElement($) && !Array.isArray($)) {
      const D = $, W = Object.getPrototypeOf(D);
      if (D && typeof D == "object" && (W === Object.prototype || W === null))
        return D;
    }
    const g = {};
    return $ && (et.isValidElement($) || Array.isArray($)) && et.Children.forEach($, (D) => {
      et.isValidElement(D) && D.props.slot && (g[D.props.slot] = D);
    }), g;
  }, [H, $]), V = (g) => {
    const D = g.toLowerCase() + "-header";
    return Object.keys(x).find((W) => W.toLowerCase() === D);
  }, Z = (g) => Object.keys(x).find((D) => D.toLowerCase() === g.toLowerCase()), X = i(
    () => hr(n).filter((g) => !!(x[g] || x[g + "-header"])),
    [n, x]
  );
  function I(g) {
    const D = S && Te(S, g) || g;
    return O ? O(D) : bs(D);
  }
  function ee(g) {
    const D = g.toLowerCase();
    return E.find((W) => W.name.toLowerCase() === D);
  }
  function Q(g) {
    const D = ee(g);
    return D?.format ? D.format : D?.type === "TimeSpan" || D?.type === "TimeOnly" ? { method: "time" } : null;
  }
  const Le = {
    xs: "xs:table-cell",
    sm: "sm:table-cell",
    md: "md:table-cell",
    lg: "lg:table-cell",
    xl: "xl:table-cell",
    "2xl": "2xl:table-cell",
    never: ""
  };
  function _(g) {
    const D = p && Te(p, g);
    return D && nt(Le[D], (W) => `hidden ${W}`);
  }
  const ye = i(() => o ?? he.getGridClass(r), [o, r]), te = i(() => u ?? he.getGrid2Class(r), [u, r]), ce = i(() => c ?? he.getGrid3Class(r), [c, r]), ge = i(() => m ?? he.getGrid4Class(r), [m, r]), $e = i(() => y ?? he.getTableClass(r), [y, r]), le = i(() => w ?? he.getTbodyClass(w), [w]), be = i(() => C ?? he.getTheadClass(r), [C, r]), pe = i(() => b ?? he.getTheadRowClass(r), [b, r]), Me = i(() => L ?? he.getTheadCellClass(r), [L, r]);
  function f(g, D) {
    return R ? R(g, D) : he.getTableRowClass(r, D, !!(k && k(g)), k != null);
  }
  function q(g, D) {
    return v ? v(g, D) : void 0;
  }
  const oe = i(() => {
    const g = (typeof a == "string" ? a.split(",") : a) || (X.length > 0 ? X : hr(n)), D = E.reduce((W, me) => (W[me.name.toLowerCase()] = me.format, W), {});
    return g.filter((W) => D[W.toLowerCase()]?.method !== "hidden");
  }, [a, X, n, E]), j = (g, D) => {
    h && h(g, D);
  }, re = (g, D, W) => {
    A && A(D, W);
  };
  return n.length ? /* @__PURE__ */ t("div", { ref: J, className: `${ye} ${l || ""}`, children: /* @__PURE__ */ t("div", { className: te, children: /* @__PURE__ */ t("div", { className: ce, children: /* @__PURE__ */ t("div", { className: ge, children: /* @__PURE__ */ d("table", { className: $e, children: [
    /* @__PURE__ */ t("thead", { className: be, children: /* @__PURE__ */ t("tr", { className: pe, children: oe.map((g) => {
      const D = V(g);
      return /* @__PURE__ */ t(
        "th",
        {
          className: `${_(g)} ${Me} text-gray-500 dark:text-gray-400`,
          onClick: (W) => j(g, W),
          children: (() => {
            const W = x[g + "-header"] || D && x[D];
            return W ? typeof W == "function" ? W({ column: g, label: I(g) }) : W : x.header ? typeof x.header == "function" ? x.header({ column: g, label: I(g) }) : et.cloneElement(x.header, { column: g, label: I(g) }) : /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ t("span", { className: "mr-1 select-none", children: I(g) }) });
          })()
        },
        g
      );
    }) }) }),
    /* @__PURE__ */ t("tbody", { className: le, children: n.map((g, D) => /* @__PURE__ */ t(
      "tr",
      {
        className: f(g, D),
        style: q(g, D),
        onClick: (W) => re(D, g, W),
        children: oe.map((W) => {
          const me = Z(W);
          return /* @__PURE__ */ t(
            "td",
            {
              className: `${_(W)} ${he.tableCellClass}`,
              children: (() => {
                const se = x[W] || me && x[me];
                return se ? typeof se == "function" ? se(g) : et.cloneElement(se, g) : ee(W) ? /* @__PURE__ */ t(so, { type: M, propType: ee(W), value: g }) : /* @__PURE__ */ t(ao, { value: Te(g, W), format: Q(W) });
              })()
            },
            W
          );
        })
      },
      D
    )) })
  ] }) }) }) }) }) : null;
}
const fr = (e) => typeof e == "string" ? e.split(",") : e || [];
function lr({
  id: e = "ModalLookup",
  refInfo: n,
  skip: r = 0,
  prefs: s,
  selectedColumns: a,
  allowFiltering: l = !0,
  showPreferences: o = !0,
  showPagingNav: u = !0,
  showPagingInfo: c = !0,
  showResetPreferences: m = !0,
  showFiltersView: y = !0,
  toolbarButtonClass: C,
  canFilter: w,
  modelTitle: b,
  newButtonLabel: L,
  configureField: k,
  onDone: O
}) {
  const { config: S } = xn(), { metadataApi: p, filterDefinitions: R } = dt(), v = Je(window.client).current, h = S.storage, [A, H] = F({ take: 25 }), [$, J] = F(new ct()), [Y, ne] = F(r), [T, M] = F(!1), [E, x] = F(null), [V, Z] = F([]), [X, I] = F(!1), [ee, Q] = F(null), [Le, _] = F(!1), ye = Je(null), te = i(
    () => C ?? he.toolbarButtonClass,
    [C]
  ), ce = i(() => R, [R]), ge = 25, $e = i(() => wt(n.model), [n.model]), le = i(() => {
    const K = We().map((Re) => Re.toLowerCase()), Ne = ft($e);
    return K.length > 0 ? K.map((Re) => Ne.find((Ue) => Ue.name.toLowerCase() === Re)).filter((Re) => Re != null) : Ne;
  }, [$e, a]), be = i(() => {
    const z = le.map((Ne) => Ne.name), K = fr(A.selectedColumns).map((Ne) => Ne.toLowerCase());
    return K.length > 0 ? z.filter((Ne) => K.includes(Ne.toLowerCase())) : z;
  }, [le, A.selectedColumns]), pe = i(() => A.take ?? ge, [A.take]), Me = i(
    () => ($.response ? Te($.response, "results") : null) ?? [],
    [$.response]
  ), f = i(
    () => $.response?.total ?? Me.length ?? 0,
    [$.response, Me]
  ), q = i(() => Y > 0, [Y]), oe = i(() => Y > 0, [Y]), j = i(() => Me.length >= pe, [Me, pe]), re = i(() => Me.length >= pe, [Me, pe]), g = i(
    () => V.some((z) => z.settings.filters.length > 0 || !!z.settings.sort),
    [V]
  ), D = i(
    () => V.map((z) => z.settings.filters.length).reduce((z, K) => z + K, 0),
    [V]
  ), W = i(() => sn($e), [$e]), me = i(
    () => p?.operations.find(
      (z) => z.dataModel?.name == n.model && Ye.isAnyQuery(z)
    ),
    [p, n.model]
  ), se = i(() => Dt(n.model), [n.model]), Se = i(() => Ut.forType(se, p), [se, p]), de = i(() => se || me?.dataModel.name, [se, me]), Ce = i(() => b || de, [b, de]), ve = i(() => L || `New ${Ce}`, [L, Ce]), ke = i(() => hn(Se.Create), [Se]);
  function We() {
    const z = fr(a);
    return z.length > 0 ? z : [];
  }
  function je(z, K) {
    return he.getTableRowClass("fullWidth", K, !1, !0);
  }
  const He = () => `${e}/ApiPrefs/${n.model}`, qe = (z) => `Column/${e}:${n.model}.${z}`;
  async function we(z) {
    let K = Y + z;
    K < 0 && (K = 0);
    const Ne = Math.floor(f / pe) * pe;
    K > Ne && (K = Ne), ne(K), await Ae();
  }
  async function Ie(z, K) {
    O?.(z);
  }
  function Ke() {
    O?.(null);
  }
  function Ee(z, K) {
    const Ne = K.target;
    if (Ne?.tagName !== "TD") {
      const Re = Ne?.closest("TABLE")?.getBoundingClientRect(), Ue = V.find((Xe) => Xe.name.toLowerCase() == z.toLowerCase());
      if (Ue && Re) {
        const Ve = (K.target?.tagName === "DIV" ? K.target : K.target?.closest("DIV")).getBoundingClientRect();
        Q({
          column: Ue,
          topLeft: {
            x: Math.max(Math.floor(Ve.x + 25), 343),
            y: Math.floor(115)
          }
        });
      }
    }
  }
  function Fe() {
    Q(null);
  }
  async function De(z) {
    const K = ee?.column;
    K && (K.settings = z, h.setItem(qe(K.name), JSON.stringify(K.settings)), await Ae()), Q(null);
  }
  async function tt(z) {
    h.setItem(qe(z.name), JSON.stringify(z.settings)), await Ae();
  }
  async function _e(z) {
    I(!1), H(z), h.setItem(He(), JSON.stringify(z)), await Ae();
  }
  async function Ae() {
    await G(ue());
  }
  async function G(z) {
    const K = me;
    if (!K) {
      console.error(`No Query API was found for ${n.model}`);
      return;
    }
    const Ne = gn(K, z), Re = ws((Ge) => {
      J((Ve) => ({ ...Ve, response: void 0, error: void 0 })), M(Ge);
    }), Ue = await v.api(Ne);
    Re(), J(Ue);
    const Xe = Te(Ue.response, "results") || [];
    !Ue.succeeded || Xe.length == 0;
  }
  function ue() {
    const z = {
      include: "total",
      take: pe
    }, K = fr(A.selectedColumns || a);
    if (K.length > 0) {
      const Re = W;
      Re && K.includes(Re.name) && K.unshift(Re.name), z.fields = K.join(",");
    }
    const Ne = [];
    return V.forEach((Re) => {
      Re.settings.sort && Ne.push((Re.settings.sort === "DESC" ? "-" : "") + Re.name), Re.settings.filters.forEach((Ue) => {
        const Xe = Ue.key.replace("%", Re.name);
        z[Xe] = Ue.value;
      });
    }), typeof z.skip > "u" && Y > 0 && (z.skip = Y), Ne.length > 0 && (z.orderBy = Ne.join(",")), z;
  }
  async function ae() {
    V.forEach((z) => {
      z.settings = { filters: [] }, h.removeItem(qe(z.name));
    }), Z([...V]), await Ae();
  }
  function Pe() {
    _(!0);
  }
  function st() {
    _(!1);
  }
  async function Oe(z) {
    st(), O?.(z);
  }
  return xe(() => {
    const z = s || Hn(h.getItem(He()));
    z && H(z), Z(le.map((K) => ({
      name: K.name,
      type: K.type,
      meta: K,
      settings: Object.assign(
        { filters: [] },
        Hn(h.getItem(qe(K.name)))
      )
    }))), isNaN(r) || ne(r), Ae();
  }, []), n ? /* @__PURE__ */ d(ma, { id: e, onDone: Ke, configureField: k, children: [
    /* @__PURE__ */ d("div", { className: "pt-2 overflow-auto", style: { minHeight: "620px" }, children: [
      /* @__PURE__ */ d("div", { className: "mt-3 pl-5 flex flex-wrap items-center", children: [
        /* @__PURE__ */ d("h3", { className: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3", children: [
          "Select ",
          /* @__PURE__ */ t("span", { className: "hidden md:inline", children: Be(n.model) })
        ] }),
        /* @__PURE__ */ d("div", { className: "flex pb-1 sm:pb-0", children: [
          o && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
              title: `${n.model} Preferences`,
              onClick: () => I(!X),
              children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("g", { strokeWidth: "1.5", fill: "none", children: /* @__PURE__ */ t("path", { d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18", stroke: "currentColor" }) }) })
            }
          ),
          u && /* @__PURE__ */ d(yn, { children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${q ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "First page",
                disabled: !q,
                onClick: () => we(-f),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${oe ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Previous page",
                disabled: !oe,
                onClick: () => we(-pe),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${j ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Next page",
                disabled: !j,
                onClick: () => we(pe),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${re ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Last page",
                disabled: !re,
                onClick: () => we(f),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z", fill: "currentColor" }) })
              }
            )
          ] })
        ] }),
        c && /* @__PURE__ */ t("div", { className: "flex pb-1 sm:pb-0", children: /* @__PURE__ */ d("div", { className: "px-4 text-lg text-black dark:text-white", children: [
          T && /* @__PURE__ */ t("span", { children: "Querying..." }),
          Me.length > 0 && /* @__PURE__ */ d("span", { children: [
            /* @__PURE__ */ t("span", { className: "hidden xl:inline", children: "Showing Results " }),
            Y + 1,
            " - ",
            Math.min(Y + Me.length, f),
            " ",
            /* @__PURE__ */ d("span", { children: [
              " of ",
              f
            ] })
          ] }),
          !T && Me.length === 0 && $.completed && /* @__PURE__ */ t("span", { children: "No Results" })
        ] }) }),
        Se.Create && ke && /* @__PURE__ */ d("div", { className: "pl-2 mt-1", children: [
          /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: Pe,
              title: Ce,
              className: he.toolbarButtonClass,
              children: [
                /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", fill: "currentColor" }) }),
                /* @__PURE__ */ t("span", { className: "whitespace-nowrap", children: ve })
              ]
            }
          ),
          Le && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
            Jr,
            {
              ref: ye,
              type: Se.Create.request.name,
              configureField: k,
              onDone: st,
              onSave: Oe
            }
          ) })
        ] }),
        g && m && /* @__PURE__ */ t("div", { className: "pl-2", children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: ae,
            title: "Reset Preferences & Filters",
            className: te,
            children: /* @__PURE__ */ t("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" }) })
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "flex pb-1 sm:pb-0", children: y && D > 0 && /* @__PURE__ */ t("div", { className: "pl-2", children: /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: () => x(E == "filters" ? null : "filters"),
            className: te,
            "aria-expanded": "false",
            children: [
              /* @__PURE__ */ t("svg", { className: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ d("span", { className: "mr-1", children: [
                D,
                " ",
                D == 1 ? "Filter" : "Filters"
              ] }),
              E != "filters" ? /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) }) : /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" }) })
            ]
          }
        ) }) })
      ] }),
      E == "filters" && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
        fa,
        {
          className: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: ce,
          columns: V,
          onDone: () => x(null),
          onChange: tt
        }
      ) }),
      ee && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
        ua,
        {
          definitions: ce,
          column: ee.column,
          topLeft: ee.topLeft,
          onDone: Fe,
          onSave: De
        }
      ) }),
      $.error ? /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(sr, { status: $.error }) }) : T ? /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(ca, {}) }) : /* @__PURE__ */ t("div", { children: Me.length > 0 && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
        xa,
        {
          id: e,
          items: Me,
          type: n.model,
          selectedColumns: be,
          tableStyle: "fullWidth",
          rowClass: je,
          onRowSelected: Ie,
          onHeaderSelected: Ee
        }
      ) }) })
    ] }),
    X && /* @__PURE__ */ t(et.Suspense, { fallback: /* @__PURE__ */ t("div", { children: "Loading..." }), children: /* @__PURE__ */ t(
      ha,
      {
        columns: le,
        prefs: A,
        onDone: () => I(!1),
        onSave: _e
      }
    ) })
  ] }) : null;
}
const lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lr
}, Symbol.toStringTag, { value: "Module" })), Jr = yt((e, n) => {
  const {
    type: r,
    formStyle: s = "slideOver",
    panelClass: a,
    formClass: l,
    headingClass: o,
    subHeadingClass: u,
    buttonsClass: c,
    heading: m,
    subHeading: y,
    autosave: C = !0,
    showLoading: w = !0,
    showCancel: b = !0,
    configureField: L,
    configureFormLayout: k,
    onDone: O,
    onSave: S,
    onError: p,
    // Slots
    heading: R,
    subheading: v,
    header: h,
    footer: A,
    children: H
  } = e, $ = Je(null), [J, Y] = F(1), [ne, T] = F(), [M, E] = F(), { typeOf: x, typeProperties: V, Crud: Z, createDto: X, formValues: I } = dt(), ee = i(() => Dt(r), [r]), Q = i(() => x(ee), [ee, x]), Le = N(
    () => typeof r == "string" ? X(r) : r ? new r() : null,
    [r, X]
  ), [_, ye] = F(Le()), te = N(() => {
    Y((we) => we + 1), $.current?.forceUpdate?.();
  }, []), ce = N((we) => {
    ye((Ie) => ({ ...Ie, ...we })), te();
  }, [te]), ge = N((we) => {
  }, []), $e = N((we, Ie) => {
    T(we), E(() => Ie);
  }, []), le = N(async (we) => {
    M && M(we), T(void 0), E(void 0);
  }, [M]), be = i(() => ({
    openModal: $e
  }), [$e]), pe = i(() => a || Qe.panelClass(s), [a, s]), Me = i(() => l || Qe.formClass(s), [l, s]), f = i(() => o || Qe.headingClass(s), [o, s]), q = i(() => u || Qe.subHeadingClass(s), [u, s]), oe = i(() => c || Qe.buttonsClass, [c]), j = i(() => Z.model(Q), [Q, Z]), re = i(
    () => m || x(ee)?.description || (j ? `New ${Be(j)}` : Be(ee)),
    [m, ee, x, j]
  ), [g, D] = F(new ct()), W = Cn(), me = i(() => W.loading, [W.loading]);
  xe(() => {
    B.interceptors.has("AutoCreateForm.new") && B.interceptors.invoke("AutoCreateForm.new", { props: e, model: _ });
  }, []);
  const se = N(async (we) => {
    we.preventDefault();
    const Ie = we.target;
    if (!C) {
      S?.(new _.constructor(I(Ie, V(Q))));
      return;
    }
    let Ke = nt(_?.getMethod, (De) => typeof De == "function" ? De() : null) || "POST", Ee = nt(_?.createResponse, (De) => typeof De == "function" ? De() : null) == null, Fe;
    if (Sr.hasRequestBody(Ke)) {
      let De = new _.constructor(), tt = new FormData(Ie);
      Ee ? Fe = await W.apiFormVoid(De, tt, { jsconfig: "eccn" }) : Fe = await W.apiForm(De, tt, { jsconfig: "eccn" });
    } else {
      let De = I(Ie, V(Q)), tt = new _.constructor(De);
      Ee ? Fe = await W.apiVoid(tt, { jsconfig: "eccn" }) : Fe = await W.api(tt, { jsconfig: "eccn" });
    }
    D(Fe), Fe.succeeded ? (Ie.reset(), S?.(Fe.response)) : p?.(Fe.error);
  }, [C, _, W, Q, V, I, S, p]), Se = N(() => {
    O?.();
  }, [O]), [de, Ce] = F(!1), [ve, ke] = F(""), We = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  xe(() => {
    if (kn(We, { value: ve }, de), !de) {
      const we = setTimeout(Se, 700);
      return () => clearTimeout(we);
    }
  }, [de, Se]), xe(() => {
    Ce(!0);
  }, []);
  const je = N(() => {
    s === "slideOver" ? Ce(!1) : Se();
  }, [s, Se]);
  xe(() => {
    const we = (Ie) => {
      Ie.key === "Escape" && je();
    };
    return window.addEventListener("keydown", we), () => window.removeEventListener("keydown", we);
  }, [je]), bt(n, () => ({
    forceUpdate: te,
    props: e,
    setModel: ce,
    formFields: $.current,
    model: _
  }), [te, e, ce, _]);
  const He = i(() => ({
    forceUpdate: te,
    props: e,
    setModel: ce,
    formFields: $.current,
    model: _
  }), [te, e, ce, _]);
  if (!Q)
    return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
      "Could not create form for unknown ",
      /* @__PURE__ */ t("b", { children: "type" }),
      " ",
      ee
    ] }) });
  const qe = (we) => /* @__PURE__ */ d("form", { onSubmit: se, className: we ? Me : void 0, children: [
    !we && /* @__PURE__ */ d("div", { className: Me, children: [
      /* @__PURE__ */ d("div", { children: [
        R || /* @__PURE__ */ t("h3", { className: f, children: re }),
        v || y && /* @__PURE__ */ t("p", { className: q, children: y }),
        !v && !y && Q?.notes && /* @__PURE__ */ t("p", { className: `notes ${q}`, dangerouslySetInnerHTML: { __html: Q.notes } })
      ] }),
      h?.({ formInstance: He, model: _ }),
      /* @__PURE__ */ t(
        Kt,
        {
          ref: $,
          value: _,
          onChange: ge,
          api: g,
          configureField: L,
          configureFormLayout: k
        },
        J
      ),
      A?.({ formInstance: He, model: _ })
    ] }),
    we && /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
      /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
        /* @__PURE__ */ d("div", { className: "space-y-1", children: [
          R || /* @__PURE__ */ t("h3", { className: f, children: re }),
          v || y && /* @__PURE__ */ t("p", { className: q, children: y }),
          !v && !y && Q?.notes && /* @__PURE__ */ t("p", { className: `notes ${q}`, dangerouslySetInnerHTML: { __html: Q.notes } })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Ln, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: je }) })
      ] }) }),
      h?.({ formInstance: He, model: _ }),
      /* @__PURE__ */ t(
        Kt,
        {
          ref: $,
          value: _,
          onChange: ge,
          api: g,
          configureField: L,
          configureFormLayout: k
        },
        J
      ),
      A?.({ formInstance: He, model: _ })
    ] }) }),
    /* @__PURE__ */ d("div", { className: oe, children: [
      /* @__PURE__ */ t("div", { children: w && me && /* @__PURE__ */ t(ar, {}) }),
      /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
        b && /* @__PURE__ */ t(Wt, { onClick: je, disabled: me, children: "Cancel" }),
        /* @__PURE__ */ t(ln, { type: "submit", className: "ml-4", disabled: me, children: "Save" })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ t(rn.Provider, { value: W, children: /* @__PURE__ */ t(Zn.Provider, { value: be, children: /* @__PURE__ */ d("div", { children: [
    s === "card" ? /* @__PURE__ */ t("div", { className: pe, children: qe(!1) }) : /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: je, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (we) => we.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${ve}`, children: qe(!0) }) }) }) })
    ] }),
    ne?.name === "ModalLookup" && ne.ref && /* @__PURE__ */ t(lr, { refInfo: ne.ref, onDone: le, configureField: L })
  ] }) }) });
});
Jr.displayName = "AutoCreateForm";
const ka = ({
  onDelete: e,
  children: n = "Delete",
  className: r,
  ...s
}) => {
  const [a, l] = F(!1), o = (c) => {
    c.preventDefault(), a && e && e();
  }, u = [
    "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
    a ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400",
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ d(yn, { children: [
    /* @__PURE__ */ t(
      "input",
      {
        id: "confirmDelete",
        type: "checkbox",
        className: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        checked: a,
        onChange: (c) => l(c.target.checked)
      }
    ),
    /* @__PURE__ */ t("label", { htmlFor: "confirmDelete", className: "ml-2 mr-2 select-none", children: "confirm" }),
    /* @__PURE__ */ t("span", { onClick: o, className: u, ...s, children: n })
  ] });
}, Ca = yt((e, n) => {
  const {
    type: r,
    value: s,
    formStyle: a = "slideOver",
    panelClass: l,
    formClass: o,
    headingClass: u,
    subHeadingClass: c,
    buttonsClass: m,
    heading: y,
    subHeading: C,
    autosave: w = !0,
    showLoading: b = !0,
    showCancel: L,
    configureField: k,
    configureFormLayout: O,
    deleteType: S,
    onDone: p,
    onSave: R,
    onDelete: v,
    onError: h,
    // Slots
    heading: A,
    subheading: H,
    header: $,
    footer: J,
    children: Y
  } = e, ne = Je(null), [T, M] = F(1), [E, x] = F(), [V, Z] = F(), { typeOf: X, apiOf: I, typeProperties: ee, createFormLayout: Q, getPrimaryKey: Le, Crud: _, createDto: ye, formValues: te } = dt(), ce = i(() => Dt(r), [r]), ge = i(() => X(ce), [ce, X]), $e = N(
    () => typeof r == "string" ? ye(r, mn(s)) : r ? new r(mn(s)) : null,
    [r, s, ye]
  ), [le, be] = F($e()), pe = N(() => {
    M((ue) => ue + 1), be($e());
  }, [$e]), Me = N((ue) => {
    be((ae) => ({ ...ae, ...ue }));
  }, []), f = N((ue) => {
  }, []), q = N((ue, ae) => {
    x(ue), Z(() => ae);
  }, []), oe = N(async (ue) => {
    V && V(ue), x(void 0), Z(void 0);
  }, [V]), j = i(() => ({
    openModal: q
  }), [q]), re = i(() => l || Qe.panelClass(a), [l, a]), g = i(() => o || Qe.formClass(a), [o, a]), D = i(() => u || Qe.headingClass(a), [u, a]), W = i(() => c || Qe.subHeadingClass(a), [c, a]), me = i(() => m || Qe.buttonsClass, [m]), se = i(() => _.model(ge), [ge, _]), Se = i(
    () => y || X(ce)?.description || (se ? `Update ${Be(se)}` : Be(ce)),
    [y, ce, X, se]
  ), [de, Ce] = F(new ct()), [ve] = F(() => Object.assign({}, mn(s))), ke = Cn(), We = i(() => ke.loading, [ke.loading]), je = N(() => nt(X(_.model(ge)), (ue) => Le(ue)), [ge, X, _, Le]);
  xe(() => {
    B.interceptors.has("AutoEditForm.new") && B.interceptors.invoke("AutoEditForm.new", { props: e, model: le, origModel: ve });
  }, []);
  const He = N((ue) => {
    const { op: ae, prop: Pe } = ue;
    ae && (_.isPatch(ae) || _.isUpdate(ae)) && (ue.disabled = Pe?.isPrimaryKey), k && k(ue);
  }, [k, _]), qe = N(async (ue) => {
    ue.preventDefault();
    const ae = ue.target;
    if (!w) {
      R?.(new le.constructor(te(ae, ee(ge))));
      return;
    }
    let Pe = nt(le?.getMethod, (K) => typeof K == "function" ? K() : null) || "POST", st = nt(le?.createResponse, (K) => typeof K == "function" ? K() : null) == null, Oe = je(), z;
    if (Sr.hasRequestBody(Pe)) {
      let K = new le.constructor(), Ne = Te(s, Oe.name), Re = new FormData(ae);
      Oe && !Array.from(Re.keys()).some((Ve) => Ve.toLowerCase() === Oe.name.toLowerCase()) && Re.append(Oe.name, Ne);
      let Ue = [];
      const Xe = ce && I(ce);
      if (Xe && _.isPatch(Xe)) {
        let Ve = Q(ge), at = {};
        if (Oe && (at[Oe.name] = Ne), Ve.forEach((lt) => {
          let St = lt.id, Ft = Te(ve, St);
          if (Oe && Oe.name.toLowerCase() === St.toLowerCase())
            return;
          let Tt = Re.get(St);
          B.interceptors.has("AutoEditForm.save.formLayout") && B.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: Ft, formLayout: Ve, input: lt, newValue: Tt });
          let Zt = Tt != null, Ot = lt.type === "checkbox" ? Zt !== !!Ft : lt.type === "file" ? Zt : Tt != Ft;
          !Tt && !Ft && (Ot = !1), Ot && (Tt ? at[St] = Tt : lt.type !== "file" && Ue.push(St));
        }), B.interceptors.has("AutoEditForm.save") && B.interceptors.invoke("AutoEditForm.save", { origModel: ve, formLayout: Ve, dirtyValues: at }), Array.from(Re.keys()).filter((lt) => !at[lt]).forEach((lt) => Re.delete(lt)), Array.from(Re.keys()).filter((lt) => lt.toLowerCase() !== Oe.name.toLowerCase()).length === 0 && Ue.length === 0) {
          _e();
          return;
        }
      }
      const Ge = Ue.length > 0 ? { jsconfig: "eccn", reset: Ue } : { jsconfig: "eccn" };
      st ? z = await ke.apiFormVoid(K, Re, Ge) : z = await ke.apiForm(K, Re, Ge);
    } else {
      let K = te(ae, ee(ge));
      Oe && !Te(K, Oe.name) && (K[Oe.name] = Te(s, Oe.name));
      let Ne = new le.constructor(K);
      st ? z = await ke.apiVoid(Ne, { jsconfig: "eccn" }) : z = await ke.api(Ne, { jsconfig: "eccn" });
    }
    Ce(z), z.succeeded ? (ae.reset(), R?.(z.response)) : h?.(z.error);
  }, [w, le, ke, ge, ee, te, R, h, s, je, ce, I, _, Q, ve]), we = N(async () => {
    let ue = je();
    const ae = ue ? Te(s, ue.name) : null;
    if (!ae) {
      console.error(`Could not find Primary Key for Type ${ce} (${se})`);
      return;
    }
    const Pe = { [ue.name]: ae }, st = typeof S == "string" ? ye(S, Pe) : S ? new S(Pe) : null;
    let Oe = nt(st.createResponse, (K) => typeof K == "function" ? K() : null) == null, z;
    Oe ? z = await ke.apiVoid(st) : z = await ke.api(st), Ce(z), z.succeeded ? v?.(z.response) : h?.(z.error);
  }, [je, s, ce, se, S, ye, ke, v, h]), Ie = N(() => {
    p?.();
  }, [p]), [Ke, Ee] = F(!1), [Fe, De] = F(""), tt = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  xe(() => {
    if (kn(tt, { value: Fe }, Ke), !Ke) {
      const ue = setTimeout(Ie, 700);
      return () => clearTimeout(ue);
    }
  }, [Ke, Ie]), xe(() => {
    Ee(!0);
  }, []);
  const _e = N(() => {
    a === "slideOver" ? Ee(!1) : Ie();
  }, [a, Ie]);
  xe(() => {
    const ue = (ae) => {
      ae.key === "Escape" && _e();
    };
    return window.addEventListener("keydown", ue), () => window.removeEventListener("keydown", ue);
  }, [_e]), bt(n, () => ({
    forceUpdate: pe,
    props: e,
    setModel: Me,
    formFields: ne.current,
    model: le
  }), [pe, e, Me, le]);
  const Ae = i(() => ({
    forceUpdate: pe,
    props: e,
    setModel: Me,
    formFields: ne.current,
    model: le
  }), [pe, e, Me, le]);
  if (!ge)
    return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
      "Could not create form for unknown ",
      /* @__PURE__ */ t("b", { children: "type" }),
      " ",
      ce
    ] }) });
  const G = (ue) => /* @__PURE__ */ d("form", { onSubmit: qe, className: ue ? g : void 0, children: [
    !ue && /* @__PURE__ */ d("div", { className: g, children: [
      /* @__PURE__ */ d("div", { children: [
        A || /* @__PURE__ */ t("h3", { className: D, children: Se }),
        H || C && /* @__PURE__ */ t("p", { className: W, children: C }),
        !H && !C && ge?.notes && /* @__PURE__ */ t("p", { className: `notes ${W}`, dangerouslySetInnerHTML: { __html: ge.notes } })
      ] }),
      $?.({ formInstance: Ae, model: le }),
      /* @__PURE__ */ t(
        Kt,
        {
          ref: ne,
          value: le,
          onChange: f,
          api: de,
          configureField: He,
          configureFormLayout: O
        },
        T
      ),
      J?.({ formInstance: Ae, model: le })
    ] }),
    ue && /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
      /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
        /* @__PURE__ */ d("div", { className: "space-y-1", children: [
          A || /* @__PURE__ */ t("h3", { className: D, children: Se }),
          H || C && /* @__PURE__ */ t("p", { className: W, children: C }),
          !H && !C && ge?.notes && /* @__PURE__ */ t("p", { className: `notes ${W}`, dangerouslySetInnerHTML: { __html: ge.notes } })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Ln, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: _e }) })
      ] }) }),
      $?.({ formInstance: Ae, model: le }),
      /* @__PURE__ */ t(
        Kt,
        {
          ref: ne,
          value: le,
          onChange: f,
          api: de,
          configureField: He,
          configureFormLayout: O
        },
        T
      ),
      J?.({ formInstance: Ae, model: le })
    ] }) }),
    /* @__PURE__ */ d("div", { className: me, children: [
      /* @__PURE__ */ t("div", { children: S && /* @__PURE__ */ t(ka, { onDelete: we }) }),
      /* @__PURE__ */ t("div", { children: b && We && /* @__PURE__ */ t(ar, {}) }),
      /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
        L && /* @__PURE__ */ t(Wt, { onClick: _e, disabled: We, children: "Cancel" }),
        /* @__PURE__ */ t(ln, { type: "submit", className: "ml-4", disabled: We, children: "Save" })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ t(rn.Provider, { value: ke, children: /* @__PURE__ */ t(Zn.Provider, { value: j, children: /* @__PURE__ */ d("div", { children: [
    a === "card" ? /* @__PURE__ */ t("div", { className: re, children: G(!1) }) : /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: _e, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (ue) => ue.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${Fe}`, children: G(!0) }) }) }) })
    ] }),
    E?.name === "ModalLookup" && E.ref && /* @__PURE__ */ t(lr, { refInfo: E.ref, onDone: oe, configureField: k })
  ] }) }) });
});
Ca.displayName = "AutoEditForm";
function Mr(e) {
  const {
    value: n,
    depth: r = 0,
    fieldAttrs: s,
    classes: a = (w, b, L, k, O) => k
  } = e, l = i(() => Qt(n), [n]), o = i(() => Array.isArray(n), [n]), u = (w) => bs(w), c = (w) => s ? s(w) : null, m = i(() => hr(n), [n]), y = (w) => w ? Object.keys(w).map((b) => ({ key: u(b), val: w[b] })) : [], C = i(() => Jn(n), [n]);
  return l ? /* @__PURE__ */ t("div", { className: r === 0 ? "prose html-format" : "", children: /* @__PURE__ */ t("div", { dangerouslySetInnerHTML: { __html: C } }) }) : o ? /* @__PURE__ */ t("div", { className: r === 0 ? "prose html-format" : "", children: /* @__PURE__ */ t("div", { className: a("array", "div", r, he.gridClass), children: Qt(n[0]) ? /* @__PURE__ */ d("div", { children: [
    "[ ",
    n.join(", "),
    " ]"
  ] }) : /* @__PURE__ */ t("div", { className: a("array", "div", r, he.grid2Class), children: /* @__PURE__ */ t("div", { className: a("array", "div", r, he.grid3Class), children: /* @__PURE__ */ t("div", { className: a("array", "div", r, he.grid4Class), children: /* @__PURE__ */ d("table", { className: a("object", "table", r, he.tableClass), children: [
    /* @__PURE__ */ t("thead", { className: a("array", "thead", r, he.theadClass), children: /* @__PURE__ */ t("tr", { children: m.map((w) => /* @__PURE__ */ d("th", { className: a("array", "th", r, he.theadCellClass + " whitespace-nowrap"), children: [
      /* @__PURE__ */ t("b", {}),
      u(w)
    ] }, w)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((w, b) => /* @__PURE__ */ t("tr", { className: a("array", "tr", r, b % 2 === 0 ? "bg-white" : "bg-gray-50", b), children: m.map((L) => /* @__PURE__ */ t("td", { className: a("array", "td", r, he.tableCellClass), children: /* @__PURE__ */ t(
      Mr,
      {
        value: w[L],
        fieldAttrs: s,
        depth: r + 1,
        classes: a,
        ...c(L)
      }
    ) }, L)) }, b)) })
  ] }) }) }) }) }) }) : /* @__PURE__ */ t("div", { className: r === 0 ? "prose html-format" : "", children: /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("table", { className: a("object", "table", r, "table-object"), children: /* @__PURE__ */ t("tbody", { children: y(n).map((w) => /* @__PURE__ */ d("tr", { className: a("object", "tr", r, ""), children: [
    /* @__PURE__ */ t("th", { className: a("object", "th", r, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"), children: w.key }),
    /* @__PURE__ */ t("td", { className: a("object", "td", r, "align-top py-2 px-4 text-sm"), children: /* @__PURE__ */ t(
      Mr,
      {
        value: w.val,
        fieldAttrs: s,
        depth: r + 1,
        classes: a,
        ...c(w.key)
      }
    ) })
  ] }, w.key)) }) }) }) });
}
function gs(e) {
  const { value: n, imageClass: r = "w-8 h-8" } = e, { getMimeType: s } = sl(), a = i(() => {
    const l = n;
    let o = typeof n;
    const u = o === "string" && l.length ? s(l) : null;
    if (o === "string" && l.length) {
      const c = l.startsWith("https://") || l.startsWith("http://");
      if ((c || l[0] === "/") && u?.startsWith("image/"))
        return "image";
      if (c)
        return "link";
    }
    return o;
  }, [n, s]);
  return a === "link" ? /* @__PURE__ */ t("a", { href: n, className: "text-indigo-600", children: n }) : a === "image" ? /* @__PURE__ */ t("a", { href: n, title: n, className: "inline-block", children: /* @__PURE__ */ t(Nn, { src: n, className: r }) }) : /* @__PURE__ */ t(Mr, { value: n });
}
function ps(e) {
  const { value: n } = e, { basic: r, complex: s } = i(() => {
    const a = Object.keys(n), l = {}, o = {};
    return a.forEach((u) => {
      const c = n[u], m = typeof c;
      c == null || m === "function" || m === "symbol" ? l[u] = `(${c == null ? "null" : m})` : m === "object" ? o[u] = c : l[u] = c;
    }), { basic: l, complex: o };
  }, [n]);
  return /* @__PURE__ */ t("table", { className: "my-2 w-full", children: /* @__PURE__ */ d("tbody", { children: [
    Object.entries(r).map(([a, l]) => /* @__PURE__ */ d("tr", { className: "leading-7", children: [
      /* @__PURE__ */ t("th", { className: "px-2 text-left align-top", children: Be(a) }),
      /* @__PURE__ */ t("td", { className: "align-top", children: /* @__PURE__ */ t(gs, { value: l }) })
    ] }, a)),
    Object.entries(s).map(([a, l]) => /* @__PURE__ */ d(et.Fragment, { children: [
      /* @__PURE__ */ t("tr", { className: "my-2 leading-7", children: /* @__PURE__ */ t("td", { colSpan: 2, className: "px-2 bg-indigo-700 text-white", children: Be(a) }) }),
      /* @__PURE__ */ t("tr", { className: "leading-7", children: /* @__PURE__ */ t("td", { colSpan: 2, className: "px-2 align-top", children: /* @__PURE__ */ t(gs, { value: l }) }) })
    ] }, a))
  ] }) });
}
const Na = (e) => {
  const {
    model: n,
    apis: r,
    typeName: s,
    done: a,
    formStyle: l = "slideOver",
    panelClass: o,
    formClass: u,
    headingClass: c,
    subHeadingClass: m,
    heading: y,
    subHeading: C,
    showLoading: w,
    deleteType: b,
    onDone: L,
    onSave: k,
    onDelete: O,
    onError: S,
    // Slots
    heading: p,
    subheading: R
  } = e, { typeOf: v, getPrimaryKey: h, Crud: A, createDto: H } = dt(), $ = i(() => s ?? r.dataModel.name, [s, r]), J = i(() => v($), [$, v]), Y = i(() => o || Qe.panelClass(l), [o, l]), ne = i(() => u || Qe.formClass(l), [u, l]), T = i(() => c || Qe.headingClass(l), [c, l]), M = i(() => m || Qe.subHeadingClass(l), [m, l]), E = i(
    () => y || v($)?.description || (n?.id ? `${Be($)} ${n.id}` : "View " + Be($)),
    [y, $, v, n]
  ), [x, V] = F(new ct()), [Z] = F(() => Object.assign({}, mn(n))), X = Cn(), I = i(() => X.loading, [X.loading]), ee = N(() => nt(J, (be) => h(be)), [J, h]), Q = i(() => J, [J]);
  xe(() => {
    B.interceptors.has("AutoViewForm.new") && B.interceptors.invoke("AutoViewForm.new", { props: e });
  }, []);
  const Le = N(async () => {
    let be = ee();
    const pe = be ? Te(n, be.name) : null;
    if (!pe) {
      console.error(`Could not find Primary Key for Type ${$} (${Q})`);
      return;
    }
    const Me = { [be.name]: pe }, f = typeof b == "string" ? H(b, Me) : b ? new b(Me) : null;
    let q = nt(f.createResponse, (j) => typeof j == "function" ? j() : null) == null, oe;
    q ? oe = await X.apiVoid(f) : oe = await X.api(f), V(oe), oe.succeeded ? O?.(oe.response) : S?.(oe.error);
  }, [ee, n, $, Q, b, H, X, O, S]), _ = N(() => {
    a && a(), L?.();
  }, [a, L]), [ye, te] = F(!1), [ce, ge] = F(""), $e = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  xe(() => {
    if (kn($e, { value: ce }, ye), !ye) {
      const be = setTimeout(_, 700);
      return () => clearTimeout(be);
    }
  }, [ye, _]), xe(() => {
    te(!0);
  }, []);
  const le = N(() => {
    l === "slideOver" ? te(!1) : _();
  }, [l, _]);
  return xe(() => {
    const be = (pe) => {
      pe.key === "Escape" && le();
    };
    return window.addEventListener("keydown", be), () => window.removeEventListener("keydown", be);
  }, [le]), $ ? /* @__PURE__ */ t("div", { children: l === "card" ? /* @__PURE__ */ t("div", { className: Y, children: /* @__PURE__ */ d("div", { className: ne, children: [
    /* @__PURE__ */ d("div", { children: [
      p || /* @__PURE__ */ t("h3", { className: T, children: E }),
      R || C && /* @__PURE__ */ t("p", { className: M, children: C }),
      !R && !C && J?.notes && /* @__PURE__ */ t("p", { className: `notes ${M}`, dangerouslySetInnerHTML: { __html: J.notes } })
    ] }),
    /* @__PURE__ */ t(ps, { value: n })
  ] }) }) : /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
    /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
    /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: le, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (be) => be.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${ce}`, children: /* @__PURE__ */ d("div", { className: ne, children: [
      /* @__PURE__ */ t("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
        /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
          /* @__PURE__ */ d("div", { className: "space-y-1", children: [
            p || /* @__PURE__ */ t("h3", { className: T, children: E }),
            R || C && /* @__PURE__ */ t("p", { className: M, children: C }),
            !R && !C && J?.notes && /* @__PURE__ */ t("p", { className: `notes ${M}`, dangerouslySetInnerHTML: { __html: J.notes } })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Ln, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: le }) })
        ] }) }),
        /* @__PURE__ */ t(ps, { value: n })
      ] }) }),
      /* @__PURE__ */ d("div", { className: Qe.buttonsClass, children: [
        /* @__PURE__ */ t("div", { children: b && /* @__PURE__ */ t(ka, { onDelete: Le }) }),
        /* @__PURE__ */ t("div", { children: w && I && /* @__PURE__ */ t(ar, {}) }),
        /* @__PURE__ */ t("div", { className: "flex justify-end" })
      ] })
    ] }) }) }) }) })
  ] }) }) : /* @__PURE__ */ t("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
    "Could not create view for unknown ",
    /* @__PURE__ */ t("b", { children: "type" }),
    " ",
    $
  ] }) });
};
Na.displayName = "AutoViewForm";
const oo = et.createContext(null), io = yt((e, n) => {
  const {
    id: r = "AutoQueryGrid",
    skip: s = 0,
    onHeaderSelected: a,
    onRowSelected: l,
    onNav: o,
    children: u,
    toolbar: c,
    toolbarButtons: m,
    createForm: y,
    editForm: C,
    viewForm: w,
    formHeader: b,
    formFooter: L,
    columnSlots: k,
    headerSlots: O,
    ...S
  } = e, p = It(oo);
  if (!p)
    throw new Error("AutoQueryGrid must be used within a ClientContext.Provider");
  const { config: R, autoQueryGridDefaults: v } = xn(), h = v, A = R.storage, [H, $] = F([]), [J, Y] = F(new ct()), [ne, T] = F(new ct()), [M, E] = F(null), [x, V] = F(!1), [Z, X] = F(), [I, ee] = F(), [Q, Le] = F(!1), [_, ye] = F(null), [te, ce] = F(s), [ge, $e] = F(!1), [le, be] = F({ take: 25 }), [pe, Me] = F(!1), [f, q] = F(0), oe = Je(null), j = Je(null), re = "filtering,queryString,queryFilters".split(","), g = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), D = 25, W = i(
    () => e.deny ? Bt(re, e.deny) : Bt(re, h.deny),
    [e.deny, h.deny]
  ), me = i(
    () => e.hide ? Bt(g, e.hide) : Bt(g, h.hide),
    [e.hide, h.hide]
  ), se = N((P) => W[P], [W]), Se = N((P) => me[P], [me]), de = i(() => e.tableStyle ?? h.tableStyle, [e.tableStyle, h.tableStyle]), Ce = i(() => e.gridClass ?? he.getGridClass(de), [e.gridClass, de]), ve = i(() => e.grid2Class ?? he.getGrid2Class(de), [e.grid2Class, de]), ke = i(() => e.grid3Class ?? he.getGrid3Class(de), [e.grid3Class, de]), We = i(() => e.grid4Class ?? he.getGrid4Class(de), [e.grid4Class, de]), je = i(() => e.tableClass ?? he.getTableClass(de), [e.tableClass, de]), He = i(() => e.theadClass ?? he.getTheadClass(de), [e.theadClass, de]), qe = i(() => e.theadRowClass ?? he.getTheadRowClass(de), [e.theadRowClass, de]), we = i(() => e.theadCellClass ?? he.getTheadCellClass(de), [e.theadCellClass, de]), Ie = i(() => e.toolbarButtonClass ?? he.toolbarButtonClass, [e.toolbarButtonClass]), Ke = N((P, U) => {
    if (e.rowClass) return e.rowClass(P, U);
    const fe = !!G.AnyUpdate, ze = (Xe?.name ? Te(P, Xe.name) : null) == Z;
    return he.getTableRowClass(e.tableStyle, U, ze, fe);
  }, [e.rowClass, e.tableStyle, Z]), { metadataApi: Ee, typeOf: Fe, apiOf: De, filterDefinitions: tt } = dt(), { invalidAccessMessage: _e } = Zr(), Ae = i(() => Dt(e.type), [e.type]), G = i(() => {
    let P = zt(e.apis);
    return P.length > 0 ? Ut.from(P.map((U) => De(U)).filter((U) => U != null).map((U) => U)) : Ut.forType(Ae, Ee);
  }, [e.apis, Ae, Ee, De]), ue = i(() => Ae || G.AnyQuery?.dataModel.name, [Ae, G]), ae = i(() => e.modelTitle || ue, [e.modelTitle, ue]), Pe = i(() => e.newButtonLabel || `New ${ae}`, [e.newButtonLabel, ae]), st = i(() => e.filterDefinitions || tt, [e.filterDefinitions, tt]), Oe = i(() => Fe(G.AnyQuery?.viewModel?.name || G.AnyQuery?.dataModel.name), [G, Fe]), z = i(() => {
    const P = Object.keys(k || {}).map((U) => U.toLowerCase());
    return ft(Oe).filter((U) => P.includes(U.name.toLowerCase()) || P.includes(U.name.toLowerCase() + "-header")).map((U) => U.name);
  }, [Oe, k]);
  function K() {
    let P = zt(e.selectedColumns);
    return P.length > 0 ? P : z.length > 0 ? z : [];
  }
  const Ne = i(() => {
    let U = K().map((ie) => ie.toLowerCase());
    const fe = ft(Oe);
    return U.length > 0 ? U.map((ie) => fe.find((ze) => ze.name.toLowerCase() === ie)).filter((ie) => ie != null) : fe;
  }, [Oe, e.selectedColumns, z]), Re = i(() => {
    let P = Ne.map((fe) => fe.name), U = zt(le.selectedColumns).map((fe) => fe.toLowerCase());
    return U.length > 0 ? P.filter((fe) => U.includes(fe.toLowerCase())) : P;
  }, [Ne, le.selectedColumns]), Ue = i(() => ft(Fe(Ae || G.AnyQuery?.dataModel.name)), [Ae, G, Fe]), Xe = i(() => sn(Fe(Ae || G.AnyQuery?.dataModel.name)), [Ae, G, Fe]), Ge = i(() => le.take ?? D, [le.take]), Ve = i(() => (J.response ? Te(J.response, "results") : null) ?? [], [J.response]), at = i(() => (J.response?.total || Ve.length) ?? 0, [J.response?.total, Ve.length]), or = i(() => te > 0, [te]), lt = i(() => te > 0, [te]), St = i(() => Ve.length >= Ge, [Ve.length, Ge]), Ft = i(() => Ve.length >= Ge, [Ve.length, Ge]), Tt = i(
    () => H.some((P) => P.settings.filters.length > 0 || !!P.settings.sort) || le.selectedColumns,
    [H, le.selectedColumns]
  ), Zt = i(
    () => H.map((P) => P.settings.filters.length).reduce((P, U) => P + U, 0),
    [H]
  ), Ot = (P) => `<span class="text-yellow-700">${P}</span>`, Xr = i(() => {
    if (!Ee)
      return Ot(`AppMetadata not loaded, see <a class="${zn.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
    let U = zt(e.apis).map((ie) => De(ie) == null ? ie : null).filter((ie) => ie != null);
    if (U.length > 0)
      return Ot(`Unknown API${U.length > 1 ? "s" : ""}: ${U.join(", ")}`);
    let fe = G;
    return fe.empty ? Ot("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : fe.AnyQuery ? null : Ot("No Query API was found");
  }, [Ee, e.apis, G, De]), Yr = i(() => G.AnyQuery && _e(G.AnyQuery), [G.AnyQuery, _e]), es = i(() => G.Create && _e(G.Create), [G.Create, _e]), ts = i(() => G.AnyUpdate && _e(G.AnyUpdate), [G.AnyUpdate, _e]), La = i(() => hn(G.Create), [G.Create]);
  i(() => hn(G.AnyUpdate), [G.AnyUpdate]);
  const ir = i(() => hn(G.Delete), [G.Delete]), _t = N(
    () => `${r}/ApiPrefs/${Ae || G.AnyQuery?.dataModel.name}`,
    [r, Ae, G]
  ), At = N(
    (P) => `Column/${r}:${Ae || G.AnyQuery?.dataModel.name}.${P}`,
    [r, Ae, G]
  ), ns = N((P) => {
    if (P) {
      if (e.canFilter)
        return e.canFilter(P);
      const U = Ue.find((fe) => fe.name.toLowerCase() == P.toLowerCase());
      if (U)
        return !$s(U);
    }
    return !1;
  }, [e.canFilter, Ue]), gt = N((P) => {
    o?.(P), se("queryString") && qr(P);
  }, [o, se]), Mn = N(async (P) => {
    let U = te + P;
    U < 0 && (U = 0);
    const fe = Math.floor(at / Ge) * Ge;
    U > fe && (U = fe), ce(U), gt({ skip: U || void 0 }), await rt();
  }, [te, at, Ge, gt]), on = N(async (P, U) => {
    if (ee(null), X(U), !P || !U) return;
    let fe = gn(G.AnyQuery, { [P]: U });
    const ie = await p.api(fe);
    if (ie.succeeded) {
      let ze = Te(ie.response, "results")?.[0];
      ze || console.warn(`API ${G.AnyQuery?.request.name}(${P}:${U}) returned no results`), ee(ze);
    }
  }, [G, p]), Ma = N(async (P, U) => {
    l?.(P, U);
    const fe = Xe?.name, ie = fe ? Te(P, fe) : null;
    !fe || !ie || (gt({ edit: ie }), on(fe, ie));
  }, [l, Xe, gt, on]), Sa = N((P, U) => {
    if (!se("filtering")) return;
    let fe = U.target;
    if (ns(P) && fe?.tagName !== "TD") {
      let ie = fe?.closest("TABLE")?.getBoundingClientRect(), ze = H.find((Ze) => Ze.name.toLowerCase() == P.toLowerCase());
      if (ze && ie) {
        let Ze = 318, ut = ie.x + Ze + 10;
        ye({
          column: ze,
          topLeft: {
            x: Math.max(Math.floor(U.clientX + Ze / 2), ut),
            y: ie.y + 45
          }
        });
      }
    }
    a?.(P, U);
  }, [se, ns, H, a]), Ta = N(() => {
    ye(null);
  }, []), Aa = N(async (P) => {
    let U = _?.column;
    U && (U.settings = P, A.setItem(At(U.name), JSON.stringify(U.settings)), await rt()), ye(null);
  }, [_, At, A]), $a = N(async (P) => {
    A.setItem(At(P.name), JSON.stringify(P.settings)), await rt();
  }, [At, A]), Ra = N(async (P) => {
    Le(!1), be(P), A.setItem(_t(), JSON.stringify(P)), await rt();
  }, [_t, A]), rs = N((P) => {
    oe.current && (Object.assign(oe.current?.model, P), Tn());
  }, []), Sn = N((P) => {
    ee((U) => ({ ...U, ...P })), Tn();
  }, []), Tn = N(() => {
    oe.current?.forceUpdate(), j.current?.forceUpdate(), q((P) => P + 1);
  }, []), Gt = N(() => {
    let P = {
      include: "total",
      take: Ge
    }, U = zt(le.selectedColumns || e.selectedColumns);
    if (U.length > 0) {
      let ie = Xe;
      ie && !U.includes(ie.name) && (U = [ie.name, ...U]);
      const ze = Ue, Ze = [];
      U.forEach((ut) => {
        const Jt = ze.find((cn) => cn.name.toLowerCase() == ut.toLowerCase());
        Jt?.ref?.selfId && Ze.push(Jt.ref.selfId), k?.[ut] && Ze.push(...ze.filter((cn) => cn.ref?.selfId?.toLowerCase() == ut.toLowerCase()).map((cn) => cn.name));
      }), Ze.forEach((ut) => {
        U.includes(ut) || U.push(ut);
      }), P.fields = aa(U).join(",");
    }
    let fe = [];
    if (H.forEach((ie) => {
      ie.settings.sort && fe.push((ie.settings.sort === "DESC" ? "-" : "") + ie.name), ie.settings.filters.forEach((ze) => {
        let Ze = ze.key.replace("%", ie.name);
        P[Ze] = ze.value;
      });
    }), e.filters && Object.keys(e.filters).forEach((ie) => {
      P[ie] = e.filters[ie];
    }), se("queryString") && se("queryFilters")) {
      const ie = location.search ? location.search : location.hash.includes("?") ? "?" + On(location.hash, "?") : "";
      let ze = gr(ie);
      if (Object.keys(ze).forEach((Ze) => {
        Ne.find((Jt) => Jt.name.toLowerCase() === Ze.toLowerCase()) && (P[Ze] = ze[Ze]);
      }), typeof ze.skip < "u") {
        const Ze = parseInt(ze.skip);
        isNaN(Ze) || (ce(Ze), P.skip = Ze);
      }
    }
    return typeof P.skip > "u" && te > 0 && (P.skip = te), fe.length > 0 && (P.orderBy = fe.join(",")), P;
  }, [Ge, le.selectedColumns, e.selectedColumns, e.filters, Xe, Ue, H, se, Ne, te, k]), Ia = /iPad|iPhone|iPod/.test(navigator.userAgent), An = N(async (P) => {
    const U = G.AnyQuery;
    if (!U) {
      console.error("No Query API was found");
      return;
    }
    let fe = gn(U, P), ie = await p.api(fe);
    ws((ut) => {
      Y((Jt) => ({ ...Jt, response: void 0, error: void 0 })), Me(ut), Ia ? setTimeout(() => Y(ie), 0) : Y(ie);
    })();
    let Ze = Te(ie.response, "results") || [];
    !ie.succeeded || Ze.length == 0;
  }, [G, p]), rt = N(async () => {
    await An(Gt());
  }, [An, Gt]), Da = N(async () => {
    await rt();
  }, [rt]), Pa = N(() => {
    const P = ss("csv");
    Nr(P), typeof window < "u" && window.open(P);
  }, []), Fa = N(() => {
    const P = ss("json");
    Nr(P), $e(!0), setTimeout(() => $e(!1), 3e3);
  }, []), ss = N((P = "json") => {
    const U = Gt(), fe = `/api/${G.AnyQuery?.request.name}`, ie = Xa(p.baseUrl, en(fe, { ...U, jsconfig: "edv" }));
    return ie.indexOf("?") >= 0 ? Bn(ie, "?") + "." + P + "?" + On(ie, "?") : ie + ".json";
  }, [Gt, G, p.baseUrl]), Oa = N(async () => {
    H.forEach((P) => {
      P.settings = { filters: [] }, A.removeItem(At(P.name));
    }), be({ take: D }), A.removeItem(_t()), await rt();
  }, [H, At, _t, A, rt]), ja = N(() => {
    V(!0), gt({ create: null });
  }, [gt]), xt = N(() => {
    ee(null), X(null), gt({ edit: void 0 });
  }, [gt]), jt = N(() => {
    V(!1), gt({ create: void 0 });
  }, [gt]), Et = N(async () => {
    await rt(), xt();
  }, [rt, xt]), $n = N(async () => {
    await rt(), jt();
  }, [rt, jt]), cr = N(() => {
    Y(new ct()), T(new ct()), V(!1), X(null), ee(null), Le(!1), ye(null), ce(s), $e(!1), be({ take: D }), Me(!1);
    const P = e.prefs || Hn(A.getItem(_t()));
    P && be(P), $(Ne.map((fe) => ({
      name: fe.name,
      type: fe.type,
      meta: fe,
      settings: Object.assign(
        {
          filters: []
        },
        Hn(A.getItem(At(fe.name)))
      )
    }))), isNaN(s) || ce(s);
    let U = Xe?.name;
    if (se("queryString")) {
      const fe = location.search ? location.search : location.hash.includes("?") ? "?" + On(location.hash, "?") : "";
      let ie = gr(fe);
      typeof ie.create < "u" ? V(typeof ie.create < "u") : U && (typeof ie.edit == "string" || typeof ie.edit == "number") && on(U, ie.edit);
    }
    e.create === !0 && V(!0), U && e.edit != null && on(U, e.edit);
  }, [s, e.prefs, e.create, e.edit, A, _t, Ne, At, Xe, se, on]);
  xe(() => {
    cr(), rt(), B.interceptors.has("AutoQueryGrid.new") && B.interceptors.invoke("AutoQueryGrid.new", { props: e });
  }, []), bt(n, () => ({
    update: rt,
    search: An,
    createRequestArgs: Gt,
    reset: cr,
    createDone: jt,
    createSave: $n,
    editDone: xt,
    editSave: Et,
    forceUpdate: Tn,
    setEdit: Sn,
    edit: I,
    createForm: oe.current,
    editForm: j.current,
    apiPrefs: le,
    results: Ve,
    skip: te,
    take: Ge,
    total: at
  }), [rt, An, Gt, cr, jt, $n, xt, Et, Tn, Sn, I, le, Ve, te, Ge, at]);
  const Rn = e.configureField;
  return Xr ? /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(ia, { type: "warn", children: /* @__PURE__ */ t("div", { dangerouslySetInnerHTML: { __html: Xr } }) }) }) : Yr ? /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(da, { invalidAccess: Yr }) }) : /* @__PURE__ */ d("div", { className: "pt-1", children: [
    Se("forms") && x && G.Create && /* @__PURE__ */ t("div", { children: es ? /* @__PURE__ */ t(
      ms,
      {
        title: `Create ${ae}`,
        invalidAccess: es,
        alertClass: "text-yellow-700",
        onDone: jt
      }
    ) : y ? y({
      type: G.Create.request.name,
      configure: Rn,
      done: jt,
      save: $n
    }) : /* @__PURE__ */ d(
      Jr,
      {
        ref: oe,
        type: G.Create.request.name,
        configureField: Rn,
        onDone: jt,
        onSave: $n,
        children: [
          b && b({
            form: "create",
            formInstance: oe.current,
            apis: G,
            type: ue,
            updateModel: rs
          }),
          L && L({
            form: "create",
            formInstance: oe.current,
            apis: G,
            type: ue,
            updateModel: rs
          })
        ]
      }
    ) }),
    Se("forms") && I && G.AnyUpdate && /* @__PURE__ */ t("div", { children: ts ? /* @__PURE__ */ t(
      ms,
      {
        title: `Update ${ae}`,
        invalidAccess: ts,
        alertClass: "text-yellow-700",
        onDone: xt
      }
    ) : C ? C({
      model: I,
      type: G.AnyUpdate.request.name,
      deleteType: ir ? G.Delete.request.name : null,
      configure: Rn,
      done: xt,
      save: Et
    }) : /* @__PURE__ */ d(
      Ca,
      {
        ref: j,
        value: I,
        type: G.AnyUpdate.request.name,
        deleteType: ir ? G.Delete.request.name : null,
        configureField: Rn,
        onDone: xt,
        onSave: Et,
        onDelete: Et,
        children: [
          b && b({
            form: "edit",
            formInstance: j.current,
            apis: G,
            type: ue,
            model: I,
            id: Z,
            updateModel: Sn
          }),
          L && L({
            form: "edit",
            formInstance: j.current,
            apis: G,
            type: ue,
            model: I,
            id: Z,
            updateModel: Sn
          })
        ]
      }
    ) }),
    Se("forms") && I && !G.AnyUpdate && /* @__PURE__ */ t("div", { children: w ? w({
      model: I,
      apis: G,
      done: xt
    }) : /* @__PURE__ */ t(
      Na,
      {
        model: I,
        apis: G,
        deleteType: ir ? G.Delete.request.name : null,
        onDone: xt,
        onSave: Et,
        onDelete: Et
      }
    ) }),
    c || (Se("toolbar") ? /* @__PURE__ */ d("div", { children: [
      Q && /* @__PURE__ */ t(
        ha,
        {
          columns: Ne,
          prefs: le,
          onDone: () => Le(!1),
          onSave: Ra
        }
      ),
      /* @__PURE__ */ d("div", { className: "pl-1 pt-1 flex flex-wrap", children: [
        /* @__PURE__ */ d("div", { className: "flex mt-1", children: [
          Se("preferences") && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
              title: `${ae} Preferences`,
              onClick: () => Le(!Q),
              children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("g", { strokeWidth: "1.5", fill: "none", children: /* @__PURE__ */ t("path", { d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18", stroke: "currentColor" }) }) })
            }
          ),
          Se("pagingNav") && /* @__PURE__ */ d(yn, { children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${or ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "First page",
                disabled: !or,
                onClick: () => Mn(-at),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: `pl-2 ${lt ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Previous page",
                disabled: !lt,
                onClick: () => Mn(-Ge),
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
                onClick: () => Mn(Ge),
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
                onClick: () => Mn(at),
                children: /* @__PURE__ */ t("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z", fill: "currentColor" }) })
              }
            )
          ] })
        ] }),
        Se("pagingInfo") && /* @__PURE__ */ t("div", { className: "flex mt-1", children: /* @__PURE__ */ d("div", { className: "px-4 text-lg text-black dark:text-white", children: [
          pe && /* @__PURE__ */ t("span", { children: "Querying..." }),
          Ve.length > 0 && /* @__PURE__ */ d("span", { children: [
            /* @__PURE__ */ t("span", { className: "hidden xl:inline", children: "Showing Results " }),
            te + 1,
            " - ",
            Math.min(te + Ve.length, at),
            " ",
            /* @__PURE__ */ d("span", { children: [
              " of ",
              at
            ] })
          ] }),
          !pe && Ve.length === 0 && J.completed && /* @__PURE__ */ t("span", { children: "No Results" })
        ] }) }),
        /* @__PURE__ */ d("div", { className: "flex flex-wrap", children: [
          Se("refresh") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ t("button", { type: "button", onClick: Da, title: "Refresh", className: Ie, children: /* @__PURE__ */ t("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 0 0 5.07 8m-1.008 5a8.001 8.001 0 0 0 14.868 3" }) }) }) }),
          Se("downloadCsv") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d("button", { type: "button", onClick: Pa, title: "Download CSV", className: Ie, children: [
            /* @__PURE__ */ d("svg", { className: "w-5 h-5 mr-1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: [
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
          Se("copyApiUrl") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d("button", { type: "button", onClick: Fa, title: "Copy API URL", className: Ie, children: [
            ge ? /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1 text-green-600 dark:text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ d("g", { fill: "none", children: [
              /* @__PURE__ */ t("path", { d: "M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
              /* @__PURE__ */ t("path", { d: "M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
            ] }) }),
            /* @__PURE__ */ t("span", { className: "whitespace-nowrap", children: "Copy URL" })
          ] }) }),
          Tt && Se("resetPreferences") && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ t("button", { type: "button", onClick: Oa, title: "Reset Preferences & Filters", className: Ie, children: /* @__PURE__ */ t("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" }) }) }) }),
          Se("filtersView") && Zt > 0 && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => E(M == "filters" ? null : "filters"),
              className: Ie,
              "aria-expanded": "false",
              children: [
                /* @__PURE__ */ t("svg", { className: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z", clipRule: "evenodd" }) }),
                /* @__PURE__ */ d("span", { className: "mr-1", children: [
                  Zt,
                  " ",
                  Zt == 1 ? "Filter" : "Filters"
                ] }),
                M != "filters" ? /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) }) : /* @__PURE__ */ t("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" }) })
              ]
            }
          ) }),
          Se("newItem") && G.Create && La && /* @__PURE__ */ t("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d("button", { type: "button", onClick: ja, title: ae, className: Ie, children: [
            /* @__PURE__ */ t("svg", { className: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", fill: "currentColor" }) }),
            /* @__PURE__ */ t("span", { className: "whitespace-nowrap", children: Pe })
          ] }) }),
          m && m({ toolbarButtonClass: Ie })
        ] })
      ] })
    ] }) : null),
    M == "filters" && /* @__PURE__ */ t(
      fa,
      {
        className: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
        definitions: st,
        columns: H,
        onDone: () => E(null),
        onChange: $a
      }
    ),
    (ne.error ?? J.error) && /* @__PURE__ */ t(sr, { status: ne.error ?? J.error }),
    pe && !ne.error && !J.error && /* @__PURE__ */ t(ca, { className: "p-2" }),
    _ && /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
      ua,
      {
        definitions: st,
        column: _.column,
        topLeft: _.topLeft,
        onDone: Ta,
        onSave: Aa
      }
    ) }),
    Ve.length > 0 && /* @__PURE__ */ t(
      xa,
      {
        id: r,
        items: Ve,
        type: e.type,
        selectedColumns: Re,
        className: "mt-1",
        tableStyle: de,
        gridClass: Ce,
        grid2Class: ve,
        grid3Class: ke,
        grid4Class: We,
        tableClass: je,
        theadClass: He,
        theadRowClass: qe,
        theadCellClass: we,
        tbodyClass: e.tbodyClass,
        rowClass: Ke,
        onRowSelected: Ma,
        rowStyle: e.rowStyle,
        headerTitle: e.headerTitle,
        headerTitles: e.headerTitles,
        visibleFrom: e.visibleFrom,
        onHeaderSelected: Sa,
        children: k && Object.keys(k).map((P) => {
          const U = k[P];
          return /* @__PURE__ */ t(et.Fragment, { children: U({}) }, P);
        })
      }
    )
  ] });
});
io.displayName = "AutoQueryGrid";
function To({ column: e, isOpen: n }) {
  return /* @__PURE__ */ d("div", { className: "flex", children: [
    e?.settings?.filters?.length ? /* @__PURE__ */ t("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("g", { fill: "none", children: /* @__PURE__ */ t("path", { d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }) : /* @__PURE__ */ d("svg", { className: `w-4 h-4 transition-transform ${n ? "rotate-180" : ""}`, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", children: [
      /* @__PURE__ */ t("path", { d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z", fill: "currentColor" }),
      /* @__PURE__ */ t("path", { d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z", fill: "currentColor" })
    ] }),
    e?.settings?.sort === "ASC" && /* @__PURE__ */ t("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ t("g", { fill: "none", children: /* @__PURE__ */ t("path", { d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z", fill: "currentColor" }) }) }),
    e?.settings?.sort === "DESC" && /* @__PURE__ */ t("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ t("g", { fill: "none", children: /* @__PURE__ */ t("path", { d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z", fill: "currentColor" }) }) })
  ] });
}
const co = yt((e, n) => {
  const {
    type: r,
    value: s,
    heading: a,
    subHeading: l,
    showLoading: o = !0,
    jsconfig: u = "eccn,edv",
    formStyle: c = "card",
    metaType: m,
    configureField: y,
    configureFormLayout: C,
    panelClass: w,
    bodyClass: b,
    formClass: L,
    innerFormClass: k,
    headerClass: O = "p-6",
    buttonsClass: S,
    headingClass: p,
    subHeadingClass: R,
    submitLabel: v = "Submit",
    allowSubmit: h,
    onSubmit: A,
    onSuccess: H,
    onError: $,
    onDone: J,
    onChange: Y,
    children: ne,
    // Slots
    heading: T,
    subheading: M,
    header: E,
    footer: x,
    buttons: V,
    leftbuttons: Z,
    rightbuttons: X
  } = e, I = Je(null), [ee, Q] = F(1), Le = Je(null), [_, ye] = F(), [te, ce] = F(), ge = Cn(), { typeOf: $e, Crud: le, createDto: be } = dt(), [pe, Me] = F(new ct()), f = i(() => w || Qe.panelClass(c), [w, c]), q = i(() => L || Qe.formClass(c), [L, c]), oe = i(() => p || Qe.headingClass(c), [p, c]), j = i(() => R || Qe.subHeadingClass(c), [R, c]), re = i(() => typeof S == "string" ? S : Qe.buttonsClass, [S]), g = i(() => r ? Dt(r) : s?.getTypeName ? s.getTypeName() : null, [r, s]), D = i(() => m ?? $e(g), [m, g, $e]), W = N(() => typeof r == "string" ? be(r) : r ? new r() : s, [r, be, s]), me = N(() => s || W(), [s, W]), [se, Se] = F(me()), de = i(() => ge.loading, [ge.loading]), Ce = i(() => a ?? (D?.description || Be(g)), [a, D, g]), ve = N(() => {
    Q((ae) => ae + 1), Se(me());
  }, [me]), ke = N(async (ae) => {
    Se((Pe) => ({ ...Pe, ...ae })), ve(), await new Promise((Pe) => setTimeout(Pe, 0));
  }, [ve]), We = N((ae, Pe) => {
    ye(ae), ce(() => Pe);
  }, []), je = N(async (ae) => {
    te && te(ae), ye(void 0), ce(void 0);
  }, [te]), He = i(() => ({
    openModal: We
  }), [We]), qe = N(async (ae) => {
    if (!ae || ae.tagName !== "FORM") {
      console.error("Not a valid form", ae);
      return;
    }
    const Pe = W();
    let st = nt(Pe?.getMethod, (K) => typeof K == "function" ? K() : null) || "POST", Oe = nt(Pe?.createResponse, (K) => typeof K == "function" ? K() : null) == null, z;
    if (A != null) {
      let K = new Pe.constructor(ls(se));
      z = await A(K);
    } else if (Sr.hasRequestBody(st)) {
      let K = new Pe.constructor(), Ne = new FormData(ae);
      Oe ? z = await ge.apiFormVoid(K, Ne, { jsconfig: u }) : z = await ge.apiForm(K, Ne, { jsconfig: u });
    } else {
      let K = new Pe.constructor(ls(se));
      console.debug("AutoForm.submit", K), Oe ? z = await ge.apiVoid(K, { jsconfig: u }) : z = await ge.api(K, { jsconfig: u });
    }
    Me(z), z.succeeded ? (H?.(z.response), Ae()) : $?.(z.error);
  }, [W, ge, u, se, H, $]), we = N(async () => {
    Le.current && await qe(Le.current);
  }, [qe]), Ie = N((ae) => {
    Y?.(ae);
  }, [Y]), Ke = N(() => {
    J?.();
  }, [J]), [Ee, Fe] = F(!1), [De, tt] = F(""), _e = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  xe(() => {
    if (kn(_e, tt, Ee), !Ee) {
      const ae = setTimeout(Ke, 700);
      return () => clearTimeout(ae);
    }
  }, [Ee, Ke]), xe(() => {
    Fe(!0);
  }, []);
  const Ae = N(() => {
    c === "slideOver" ? Fe(!1) : Ke();
  }, [c, Ke]);
  xe(() => {
    const ae = (Pe) => {
      Pe.key === "Escape" && Ae();
    };
    return window.addEventListener("keydown", ae), () => window.removeEventListener("keydown", ae);
  }, [Ae]), bt(n, () => ({
    forceUpdate: ve,
    props: e,
    setModel: ke,
    formFields: I.current,
    submit: we,
    close: Ae,
    model: se
  }), [ve, e, ke, we, Ae, se]);
  const G = i(() => ({
    forceUpdate: ve,
    props: e,
    setModel: ke,
    formFields: I.current,
    submit: we,
    close: Ae,
    model: se
  }), [ve, e, ke, we, Ae, se]);
  if (!D)
    return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
      "Could not create form for unknown ",
      /* @__PURE__ */ t("b", { children: "type" }),
      " ",
      g
    ] }) });
  const ue = (ae) => /* @__PURE__ */ d(
    "form",
    {
      ref: Le,
      onSubmit: (Pe) => {
        Pe.preventDefault(), qe(Pe.target);
      },
      autoComplete: "off",
      className: ae ? q : k,
      children: [
        /* @__PURE__ */ t("div", { className: ae ? "flex min-h-0 flex-1 flex-col overflow-auto" : b, children: /* @__PURE__ */ d("div", { className: ae ? "flex-1" : void 0, children: [
          ae && /* @__PURE__ */ t("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
            /* @__PURE__ */ d("div", { className: "space-y-1", children: [
              T || /* @__PURE__ */ t("h3", { className: oe, children: Ce }),
              M || l && /* @__PURE__ */ t("p", { className: j, children: l }),
              !M && !l && D?.notes && /* @__PURE__ */ t("p", { className: `notes ${j}`, dangerouslySetInnerHTML: { __html: D.notes } })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ t(Ln, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: Ae }) })
          ] }) }),
          !ae && /* @__PURE__ */ d("div", { className: O, children: [
            T || /* @__PURE__ */ t("h3", { className: oe, children: Ce }),
            M || l && /* @__PURE__ */ t("p", { className: j, children: l }),
            !M && !l && D?.notes && /* @__PURE__ */ t("p", { className: `notes ${j}`, dangerouslySetInnerHTML: { __html: D.notes } })
          ] }),
          E?.({ instance: G, model: se }),
          /* @__PURE__ */ t("input", { type: "submit", className: "hidden" }),
          ne || /* @__PURE__ */ t(
            Kt,
            {
              ref: I,
              type: r,
              value: se,
              onChange: Ie,
              api: pe,
              configureField: y,
              configureFormLayout: C
            },
            ee
          ),
          x?.({ instance: G, model: se })
        ] }) }),
        V || /* @__PURE__ */ d("div", { className: re, children: [
          /* @__PURE__ */ t("div", { children: Z?.({ instance: G, model: se }) }),
          /* @__PURE__ */ t("div", { children: o && de && /* @__PURE__ */ t(ar, {}) }),
          /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
            /* @__PURE__ */ t("div", {}),
            ae && /* @__PURE__ */ t(Wt, { onClick: Ae, disabled: de, children: "Cancel" }),
            /* @__PURE__ */ t(
              ln,
              {
                type: "submit",
                className: ae ? "ml-4" : void 0,
                disabled: de || (h ? !h(se) : !1),
                children: v
              }
            ),
            X?.({ instance: G, model: se })
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ t(rn.Provider, { value: ge, children: /* @__PURE__ */ t(Zn.Provider, { value: He, children: /* @__PURE__ */ d("div", { children: [
    c === "card" ? /* @__PURE__ */ t("div", { className: f, children: ue(!1) }) : /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ t("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ t("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: Ae, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ t("div", { onMouseDown: (ae) => ae.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ t("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${De}`, children: ue(!0) }) }) }) })
    ] }),
    _?.name === "ModalLookup" && _.ref && /* @__PURE__ */ t(lr, { refInfo: _.ref, onDone: je, configureField: y })
  ] }) }) });
});
co.displayName = "AutoForm";
function Ao(e) {
  const {
    tabs: n,
    id: r = "tabs",
    param: s = "tab",
    label: a,
    selected: l,
    tabClass: o = "",
    bodyClass: u = "p-4",
    url: c = !0,
    clearQuery: m = !1
  } = e, y = i(() => Object.keys(n), [n]), C = (p) => a ? a(p) : Be(p), [w, b] = F(""), L = (p) => {
    if (b(p), c) {
      const R = y[0];
      qr({ tab: p === R ? void 0 : p }, m);
    }
  }, k = (p) => w === p, O = i(() => `${100 / Object.keys(n).length}%`, [n]);
  xe(() => {
    let p = l || Object.keys(n)[0];
    if (c) {
      const R = location.search ? location.search : location.hash.includes("?") ? "?" + On(location.hash, "?") : "", h = gr(R)[s];
      h && (p = h);
    }
    b(p);
  }, [l, n, c, s]);
  const S = w ? n[w] : null;
  return /* @__PURE__ */ d("div", { children: [
    /* @__PURE__ */ d("div", { className: "sm:hidden", children: [
      /* @__PURE__ */ t("label", { htmlFor: r, className: "sr-only", children: "Select a tab" }),
      /* @__PURE__ */ t(
        "select",
        {
          id: r,
          name: r,
          className: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          value: w,
          onChange: (p) => L(p.target.value),
          children: y.map((p) => /* @__PURE__ */ t("option", { value: p, children: C(p) }, p))
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "hidden sm:block", children: /* @__PURE__ */ t("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ t("nav", { className: "-mb-px flex", "aria-label": "Tabs", children: y.map((p) => /* @__PURE__ */ t(
      "a",
      {
        href: "#",
        onClick: (R) => {
          R.preventDefault(), L(p);
        },
        style: { width: O },
        className: k(p) ? `border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm ${o}` : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm ${o}`,
        children: C(p)
      },
      p
    )) }) }) }),
    /* @__PURE__ */ t("div", { className: u, children: S && /* @__PURE__ */ t(S, {}) })
  ] });
}
function $o() {
  const e = typeof document < "u" ? document.documentElement : null, n = () => e?.classList.contains("dark") ?? !1, [r, s] = F(n());
  return xe(() => {
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
      children: /* @__PURE__ */ d(
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
const Ro = ({
  provider: e,
  title: n = "Sign In",
  tabs: r = !0,
  oauth: s = !0,
  onLogin: a
}) => {
  const { getMetadata: l, createDto: o } = dt(), u = Cn(), c = It(Kn), { signIn: m } = Zr(), y = l({ assert: !0 }), C = y.plugins.auth, w = typeof document < "u" ? document.baseURI : "", b = y.app.baseUrl, [L, k] = F(() => o("Authenticate")), [O, S] = F(new ct()), [p, R] = F(e);
  xe(() => {
    C?.authProviders.map((x) => x.formLayout).filter((x) => x).forEach((x) => x.forEach((V) => {
      k((Z) => ({
        ...Z,
        [V.id]: V.type === "checkbox" ? !1 : ""
      }));
    }));
  }, [C]);
  const v = i(
    () => C?.authProviders.filter((x) => x.formLayout) || [],
    [C]
  ), h = i(
    () => v[0] || {},
    [v]
  ), A = i(
    () => v[Math.max(v.length - 1, 0)] || {},
    [v]
  ), H = i(() => (p ? C?.authProviders.find((x) => x.name === p) : null) ?? h, [p, C, h]), $ = (x) => x === !1 || x === "false", J = (x) => x.label || x.navItem && x.navItem.label, Y = i(
    () => (H?.formLayout || []).map((x) => Object.assign({}, x, {
      type: x.type?.toLowerCase(),
      autocomplete: x.autocomplete || (x.type?.toLowerCase() === "password" ? "current-password" : void 0) || (x.id.toLowerCase() === "username" ? "username" : void 0),
      css: Object.assign({ field: "col-span-12" }, x.css)
    })),
    [H]
  ), ne = i(
    () => $(s) ? [] : C?.authProviders.filter((x) => x.type === "oauth") || [],
    [s, C]
  ), T = i(() => {
    let x = Ya(
      C?.authProviders.filter((Z) => Z.formLayout && Z.formLayout.length > 0),
      (Z, X) => {
        let I = J(X) || ht(X.name);
        Z[I] = X.name === h.name ? "" : X.name;
      }
    );
    const V = H;
    return V && $(r) && (x = { [J(V) || ht(V.name)]: V }), x;
  }, [C, H, r, h]), M = i(() => {
    let x = Y.map((V) => V.id).filter((V) => V);
    return O.summaryMessage(x);
  }, [O, Y]), E = async (x) => {
    x.preventDefault();
    const V = H.name;
    let Z = { ...L };
    Z.provider = V, V === "authsecret" ? (c?.headers.set("authsecret", L.authsecret), Z = o("Authenticate")) : V === "basic" ? (c?.setCredentials(L.UserName, L.Password), Z = o("Authenticate"), Z.UserName = null, Z.Password = null) : (H.type === "Bearer" || V === "jwt") && (c.bearerToken = L.BearerToken, Z = o("Authenticate"));
    const X = await u.api(Z);
    if (S(X), X.succeeded) {
      const I = X.response;
      m(I), a?.(I), S(new ct()), k(o("Authenticate"));
    }
  };
  return C ? /* @__PURE__ */ t(rn.Provider, { value: u, children: /* @__PURE__ */ d("div", { className: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ d("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
      /* @__PURE__ */ t("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50", children: n }),
      Object.keys(T).length > 1 && /* @__PURE__ */ t("p", { className: "mt-4 text-center text-sm text-gray-600 dark:text-gray-300", children: /* @__PURE__ */ t("span", { className: "relative z-0 inline-flex shadow-sm rounded-md", children: Object.entries(T).map(([x, V]) => /* @__PURE__ */ t(
        "a",
        {
          href: `?provider=${V}`,
          onClick: (Z) => {
            Z.preventDefault(), R(V);
          },
          className: `${V === "" || V === A.name ? "rounded-l-md" : V === A.name ? "rounded-r-md -ml-px" : "-ml-px"} ${p === V ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : ""} cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900`,
          children: x
        },
        x
      )) }) })
    ] }),
    /* @__PURE__ */ d("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: [
      M && /* @__PURE__ */ t("div", { className: "mb-3", children: /* @__PURE__ */ t(sr, { status: O.error }) }),
      /* @__PURE__ */ d("div", { className: "bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [
        Y.length > 0 && /* @__PURE__ */ d("form", { onSubmit: E, children: [
          /* @__PURE__ */ t(
            Kt,
            {
              value: L,
              formLayout: Y,
              api: O,
              hideSummary: !0,
              onChange: k
            }
          ),
          /* @__PURE__ */ t("div", { className: "mt-8", children: /* @__PURE__ */ t(ln, { type: "submit", className: "w-full", children: "Sign In" }) })
        ] }),
        ne.length > 0 && /* @__PURE__ */ d("div", { className: "mt-6", children: [
          /* @__PURE__ */ d("div", { className: "relative", children: [
            /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ t("div", { className: "w-full border-t border-gray-300 dark:border-gray-600" }) }),
            /* @__PURE__ */ t("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ t("span", { className: "px-2 bg-white text-gray-500 dark:text-gray-400", children: "Or continue with" }) })
          ] }),
          /* @__PURE__ */ t("div", { className: "mt-6 grid grid-cols-3 gap-3", children: ne.map((x) => /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
            "a",
            {
              href: `${b}${x.navItem.href}?continue=${w}`,
              title: J(x),
              className: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900",
              children: x.icon ? /* @__PURE__ */ t(Nn, { image: x.icon, className: "h-5 w-5 text-gray-700 dark:text-gray-200" }) : /* @__PURE__ */ d(
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
          ) }, x.name)) })
        ] })
      ] })
    ] })
  ] }) }) : /* @__PURE__ */ t("div", { children: "No Auth Plugin" });
}, uo = yt(
  ({ children: e, mobileTitlebar: n }, r) => {
    const [s, a] = F(!0), [l, o] = F(""), [u, c] = F(""), [m, y] = F(""), C = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, w = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, b = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    }, L = (p, R, v) => {
      v ? (R(p.entering.cls + " " + p.entering.from), setTimeout(() => R(p.entering.cls + " " + p.entering.to), 0)) : (R(p.leaving.cls + " " + p.leaving.from), setTimeout(() => R(p.leaving.cls + " " + p.leaving.to), 0));
    }, k = (p) => {
      L(C, o, p), L(w, c, p), L(b, y, p), setTimeout(() => a(p), 300);
    }, O = () => k(!0), S = () => k(!1);
    return bt(r, () => ({
      show: O,
      hide: S,
      toggle: k
    })), /* @__PURE__ */ d("div", { children: [
      s && /* @__PURE__ */ d("div", { className: "relative z-10 lg:hidden", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ t("div", { className: `fixed inset-0 bg-gray-900/80 ${l}` }),
        /* @__PURE__ */ t("div", { className: "fixed inset-0 flex", children: /* @__PURE__ */ d("div", { className: `relative mr-16 flex w-full max-w-xs flex-1 ${u}`, children: [
          /* @__PURE__ */ t("div", { className: `absolute left-full top-0 flex w-16 justify-center pt-5 ${m}`, children: /* @__PURE__ */ d("button", { type: "button", onClick: S, className: "-m-2.5 p-2.5", children: [
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
      /* @__PURE__ */ d("div", { className: "sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden", children: [
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: O,
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
uo.displayName = "SidebarLayout";
export {
  ia as Alert,
  wo as AlertSuccess,
  Jr as AutoCreateForm,
  Ca as AutoEditForm,
  co as AutoForm,
  Kt as AutoFormFields,
  io as AutoQueryGrid,
  Na as AutoViewForm,
  pa as Autocomplete,
  Lo as Breadcrumb,
  No as Breadcrumbs,
  so as CellFormat,
  ga as CheckboxInput,
  Ln as CloseButton,
  va as Combobox,
  ka as ConfirmDelete,
  $o as DarkModeToggle,
  xa as DataGrid,
  ro as DynamicInput,
  da as EnsureAccess,
  ms as EnsureAccessDialog,
  sr as ErrorSummary,
  no as FileInput,
  ua as FilterColumn,
  fa as FilterViews,
  ar as FormLoading,
  Mr as HtmlFormat,
  Nn as Icon,
  xo as InputDescription,
  ca as Loading,
  wa as LookupInput,
  ba as MarkdownInput,
  gs as MarkupFormat,
  ps as MarkupModel,
  al as MetadataApp,
  ma as ModalDialog,
  lr as ModalLookup,
  Mo as NavList,
  So as NavListItem,
  ko as OutlineButton,
  ao as PreviewFormat,
  ln as PrimaryButton,
  ha as QueryPrefs,
  Wt as SecondaryButton,
  _r as SelectInput,
  To as SettingsIcons,
  uo as SidebarLayout,
  Ro as SignIn,
  Xl as SlideOver,
  Ao as Tabs,
  to as TagInput,
  Gr as TextInput,
  Co as TextLink,
  ya as TextareaInput,
  bo as css,
  Mt as useApiState,
  Zr as useAuth,
  Cn as useClient,
  xn as useConfig,
  sl as useFiles,
  vo as useFormatters,
  dt as useMetadata,
  yo as useUtils
};
