import { lastRightPart as Ut, leftPart as Zn, map as Ze, mapGet as Ne, toDate as At, toCamelCase as Fl, toDateTime as zl, chop as Bl, isDate as Gn, dateFmt as Pl, fromXsdDuration as ea, timeFmt12 as Ul, omit as Nt, appendQueryString as nn, indexOfAny as Hl, apiValue as ql, enc as Nr, createBus as _l, toKebabCase as Ds, toTime as Ql, nameOf as Wl, ApiResult as Ye, setQueryString as Kl, lastLeftPart as ta, ResponseStatus as vr, ResponseError as Os, sanitize as Zl, humanize as ze, toPascalCase as mt, errorResponse as Tt, errorResponseExcept as Gl, uniqueKeys as na, humanify as ra, trimEnd as Jl, $1 as Ss, HttpMethods as Vr, delaySet as sa, rightPart as Vn, queryString as kr, combinePaths as Xl, omitEmpty as Yl, each as ei } from "@servicestack/client";
import * as oe from "react";
import ti, { useState as $, useEffect as me, createContext as Wt, useContext as ct, forwardRef as kt, useRef as Ge, useImperativeHandle as Ct, useMemo as f } from "react";
import { jsxs as d, jsx as n, Fragment as Dt } from "react/jsx-runtime";
import "react-dom";
const aa = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), la = {
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
}, Is = Object.keys(la), Lt = (e, t) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${t}</svg>`, Fn = {
  img: Lt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: Lt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: Lt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: Lt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: Lt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: Lt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: Lt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: Lt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: Lt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, ni = /[\r\n%#()<>?[\\\]^`{|}]/g, js = 1024, ri = ["Bytes", "KB", "MB", "GB", "TB"], si = (() => {
  const e = "application/", t = e + "vnd.openxmlformats-officedocument.", r = "image/", s = "text/", a = "audio/", l = "video/", i = {
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
    xlsx: t + "spreadsheetml.sheet",
    xltx: t + "spreadsheetml.template",
    docx: t + "wordprocessingml.document",
    dotx: t + "wordprocessingml.template",
    pptx: t + "presentationml.presentation",
    potx: t + "presentationml.template",
    ppsx: t + "presentationml.slideshow",
    mdb: e + "vnd.ms-access"
  };
  function o(m, h) {
    m.split(",").forEach((p) => i[p] = h);
  }
  function c(m, h) {
    m.split(",").forEach((p) => i[p] = h(p));
  }
  return c("jpeg,gif,png,tiff,bmp,webp", (m) => r + m), c("jsx,csv,css", (m) => s + m), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (m) => a + m), c("3gpp,avi,dv,divx,ogg,mp4,webm", (m) => l + m), c("rtf,pdf", (m) => e + m), o("htm,html,shtm", s + "html"), o("js,mjs,cjs", s + "javascript"), o("yml,yaml", e + "yaml"), o("bat,cmd", e + "bat"), o("xml,csproj,fsproj,vbproj", s + "xml"), o("txt,ps1", s + "plain"), o("qt,mov", l + "quicktime"), o("doc,dot", e + "msword"), o("xls,xlt,xla", e + "excel"), o("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), o("cer,crt,der", e + "x-x509-ca-cert"), o("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), o("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), i;
})();
let Cr = [];
function ia(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(ni, encodeURIComponent);
}
function Fr(e) {
  return "data:image/svg+xml;utf8," + ia(e);
}
function oa(e) {
  let t = URL.createObjectURL(e);
  return Cr.push(t), t;
}
function ca() {
  Cr.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), Cr = [];
}
function zr(e) {
  if (!e) return null;
  let t = Zn(e, "?");
  return Ut(t, "/");
}
function Nn(e) {
  let t = zr(e);
  return t == null || t.indexOf(".") === -1 ? null : Ut(t, ".").toLowerCase();
}
function Br(e) {
  let t = Nn(e.name);
  return t && aa.indexOf(t) >= 0 ? oa(e) : Yt(e.name);
}
function Pr(e) {
  if (!e) return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = Nn(e);
  return t && aa.indexOf(t) >= 0 || !1;
}
function Yt(e) {
  if (!e) return null;
  let t = Nn(e);
  return t == null || Pr(e) ? e : xn(t) || Fr(Fn.doc);
}
function xn(e) {
  let t = da(e);
  return t && Fr(t) || null;
}
function da(e) {
  if (Fn[e])
    return Fn[e];
  for (let t = 0; t < Is.length; t++) {
    let r = Is[t];
    if (la[r].indexOf(e) >= 0)
      return Fn[r];
  }
  return null;
}
function Ur(e, t = 2) {
  if (e === 0) return "0 Bytes";
  const r = t < 0 ? 0 : t, s = Math.floor(Math.log(e) / Math.log(js));
  return parseFloat((e / Math.pow(js, s)).toFixed(r)) + " " + ri[s];
}
function ai(e) {
  return e.files && Array.from(e.files).map((t) => ({ fileName: t.name, contentLength: t.size, filePath: Br(t) }));
}
function Jn(e, t) {
  e.onerror = null, e.src = Hr(e.src, t) || "";
}
function Hr(e, t) {
  return xn(Ut(e, ".").toLowerCase()) || (t ? xn(t) || t : null) || xn("doc");
}
function Lr(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = Ut(e, ".").toLowerCase();
  return si[t] || "application/" + t;
}
function li() {
  return {
    extSvg: da,
    extSrc: xn,
    getExt: Nn,
    encodeSvg: ia,
    canPreview: Pr,
    getFileName: zr,
    getMimeType: Lr,
    formatBytes: Ur,
    filePathUri: Yt,
    svgToDataUri: Fr,
    fileImageUri: Br,
    objectUrl: oa,
    flush: ca,
    inputFiles: ai,
    iconOnError: Jn,
    iconFallbackSrc: Hr
  };
}
const rn = "/metadata/app.json", ii = {
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
}, oi = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, ci = {
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
}, di = {
  String: "string",
  Boolean: "bool",
  ...ci
};
function Sn(e) {
  return di[e] || e;
}
function ua(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? Sn(t[0]) + "?" : e.endsWith("[]") ? `List<${Sn(e.substring(0, e.length - 2))}>` : t.length === 0 ? Sn(e) : Zn(Sn(e), "`") + "<" + t.join(",") + ">") : "";
}
function ui(e) {
  return e && ua(e.name, e.genericArgs);
}
class Ht {
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
  add(t) {
    Ke.isQueryInto(t) && !this.QueryInto ? this.QueryInto = t : Ke.isQuery(t) && !this.Query ? this.Query = t : Ke.isCreate(t) && !this.Create ? this.Create = t : Ke.isUpdate(t) && !this.Update ? this.Update = t : Ke.isPatch(t) && !this.Patch ? this.Patch = t : Ke.isDelete(t) && !this.Delete && (this.Delete = t);
  }
  static from(t) {
    const r = new Ht();
    return t.forEach((s) => {
      r.add(s);
    }), r;
  }
  static forType(t, r) {
    let s = new Ht();
    if (z.config.apisResolver && t) {
      const a = z.config.apisResolver(t, r);
      a && (s.Query = a.Query, s.QueryInto = a.QueryInto, s.Create = a.Create, s.Update = a.Update, s.Patch = a.Patch, s.Delete = a.Delete);
    }
    return t && (r ??= z.metadata.value?.api, r?.operations.forEach((a) => {
      a.dataModel?.name == t && s.add(a);
    })), s;
  }
}
const Ke = {
  Create: "ICreateDb`1",
  Update: "IUpdateDb`1",
  Patch: "IPatchDb`1",
  Delete: "IDeleteDb`1",
  AnyRead: ["QueryDb`1", "QueryDb`2"],
  AnyWrite: ["ICreateDb`1", "IUpdateDb`1", "IPatchDb`1", "IDeleteDb`1"],
  isAnyQuery: (e) => Ze(e.request.inherits, (t) => Ke.AnyRead.indexOf(t.name) >= 0),
  isQuery: (e) => Ze(e.request.inherits, (t) => t.name === "QueryDb`1"),
  isQueryInto: (e) => Ze(e.request.inherits, (t) => t.name === "QueryDb`2"),
  isCrud: (e) => e.request.implements?.some((t) => Ke.AnyWrite.indexOf(t.name) >= 0),
  isCreate: (e) => In(e, Ke.Create),
  isUpdate: (e) => In(e, Ke.Update),
  isPatch: (e) => In(e, Ke.Patch),
  isDelete: (e) => In(e, Ke.Delete),
  model: (e) => e ? Ze(e.inherits, (t) => Ke.AnyRead.indexOf(t.name) >= 0) ? e.inherits?.genericArgs[0] : e.implements?.find((t) => Ke.AnyWrite.indexOf(t.name) >= 0)?.genericArgs[0] : null
};
function fi(e) {
  return e.input?.type || Xn(qr(e));
}
function fa(e) {
  return e.endsWith("?") ? Bl(e, 1) : e;
}
function Xn(e) {
  return ii[fa(e)];
}
function mi(e) {
  return e && oi[e] || "String";
}
function qr(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function Mr(e) {
  return e && Xn(e) == "number" || !1;
}
function ma(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function hi(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function ha(e) {
  if (!e?.type) return !1;
  const t = qr(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : Xn(e.type) == null;
}
function ga(e) {
  if (!e?.type) return !1;
  const t = qr(e);
  if (e.isValueType && t.indexOf("`") == -1 || e.isEnum) return !0;
  const r = e.input?.type;
  return r && (r == "hidden" || r == "file" || r == "tag" || r == "combobox" || z.components?.[r]) ? !0 : Xn(e.type) != null;
}
function wn(e, t) {
  let r = typeof e == "string" ? Yn(e) : e;
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
      function l(i) {
        Object.assign(this, i);
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
  return new a(t);
}
function gi(e, t, r = {}) {
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
      function l(i) {
        Object.assign(this, i);
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
  return new a(t);
}
function zn(e, t) {
  return e ? (Object.keys(e).forEach((r) => {
    let s = e[r];
    typeof s == "string" ? s.startsWith("/Date") && (e[r] = rr(At(s))) : s != null && typeof s == "object" && (Array.isArray(s) ? e[r] = Array.from(s) : e[r] = Object.assign({}, s));
  }), e) : {};
}
function pi(e, t) {
  let r = {};
  return Array.from(e.elements).forEach((s) => {
    let a = s;
    if (!a.id || a.value == null || a.value === "") return;
    const l = a.id.toLowerCase(), i = t && t.find((h) => h.name.toLowerCase() == l);
    let o = i?.type, c = i?.genericArgs?.[0], m = a.type === "checkbox" ? a.checked : a.value;
    Mr(o) ? m = Number(m) : o === "List`1" && typeof m == "string" && (m = m.split(",").map((h) => Mr(c) ? Number(h) : h)), r[a.id] = m;
  }), r;
}
function _r(e) {
  return e?.api?.operations && e.api.operations.length > 0;
}
function vi(e) {
  if (!Qr() && e?.assert && !z.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return z.metadata.value;
}
function qn(e) {
  return e && _r(e) ? (e.date = zl(/* @__PURE__ */ new Date()), z.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(rn, JSON.stringify(e)), !0) : !1;
}
function yi() {
  z.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(rn);
}
function Qr() {
  if (z.metadata.value != null) return !0;
  let e = globalThis.Server;
  if (_r(e))
    qn(e);
  else {
    const t = typeof localStorage < "u" ? localStorage.getItem(rn) : null;
    if (t)
      try {
        qn(JSON.parse(t));
      } catch {
        console.error(`Could not JSON.parse ${rn} from localStorage`);
      }
  }
  return z.metadata.value != null;
}
async function Vs(e, t) {
  let r = t ? await t() : await fetch(e);
  if (r.ok) {
    let s = await r.text();
    qn(JSON.parse(s));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${r.statusText}`);
  _r(z.metadata.value) || console.warn("AppMetadata is not available");
}
async function xi(e) {
  const { olderThan: t, resolvePath: r, resolve: s } = e || {};
  let a = Qr() && t !== 0;
  if (a && t) {
    let l = At(z.metadata.value?.date);
    (!l || (/* @__PURE__ */ new Date()).getTime() - l.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((r || s) && (await Vs(r || rn, s), z.metadata.value != null) || z.metadata.value != null) return;
    await Vs(rn);
  }
  return z.metadata.value;
}
function ht(e, t) {
  if (z.config.typeResolver) {
    let i = z.config.typeResolver(e, t);
    if (i) return i;
  }
  let r = z.metadata.value?.api;
  if (!r || !e) return null;
  let s = r.types.find((i) => i.name.toLowerCase() === e.toLowerCase() && (!t || i.namespace == t));
  if (s) return s;
  let a = Yn(e);
  if (a) return a.request;
  let l = r.operations.find((i) => i.response && i.response.name.toLowerCase() === e.toLowerCase() && (!t || i.response.namespace == t));
  return l ? l.response : null;
}
function Yn(e) {
  if (z.config.apiResolver) {
    const s = z.config.apiResolver(e);
    if (s) return s;
  }
  let t = z.metadata.value?.api;
  return t ? t.operations.find((s) => s.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function wi({ dataModel: e }) {
  const t = z.metadata.value?.api;
  if (!t) return [];
  let r = t.operations;
  if (e) {
    const s = typeof e == "string" ? ht(e) : e;
    r = r.filter((a) => pa(a.dataModel, s));
  }
  return r;
}
function Wr(e) {
  return e ? ht(e.name, e.namespace) : null;
}
function pa(e, t) {
  return e && t && e.name === t.name && (!e.namespace || !t.namespace || e.namespace === t.namespace);
}
function bi(e, t) {
  let r = ht(e);
  return r && r.properties && r.properties.find((a) => a.name.toLowerCase() === t.toLowerCase());
}
function va(e) {
  return ya(ht(e));
}
function ya(e) {
  if (e && e.isEnum && e.enumNames != null) {
    let t = {};
    for (let r = 0; r < e.enumNames.length; r++) {
      const s = (e.enumDescriptions ? e.enumDescriptions[r] : null) || e.enumNames[r], a = (e.enumValues != null ? e.enumValues[r] : null) || e.enumNames[r];
      t[a] = s;
    }
    return t;
  }
  return null;
}
function xa(e) {
  if (!e) return null;
  let t = {}, r = e.input && e.input.allowableEntries;
  if (r) {
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      t[l.key] = l.value;
    }
    return t;
  }
  let s = e.allowableValues || (e.input ? e.input.allowableValues : null);
  if (s) {
    for (let a = 0; a < s.length; a++) {
      let l = s[a];
      t[l] = l;
    }
    return t;
  }
  if (e.isEnum) {
    const a = e.genericArgs && e.genericArgs.length == 1 ? e.genericArgs[0] : e.type, l = ht(a);
    if (l)
      return ya(l);
  }
  return null;
}
function Kr(e) {
  if (!e) return;
  const t = [];
  return Object.keys(e).forEach((r) => t.push({ key: r, value: e[r] })), t;
}
function Ni(e, t) {
  const s = ((a, l) => Object.assign({
    id: a,
    name: a,
    type: l
  }, t))(e.name, t?.type || fi(e) || "text");
  return e.isEnum && (s.type = "select", s.allowableEntries = Kr(xa(e))), s;
}
function ki(e) {
  let t = [];
  if (e) {
    const r = ot(e), s = Yn(e.name), a = Wr(s?.dataModel);
    r.forEach((l) => {
      if (!ga(l)) return;
      const i = Ni(l, l.input);
      if (i.id = Fl(i.id), i.type == "file" && l.uploadTo && !i.accept) {
        const o = z.metadata.value?.plugins.filesUpload?.locations.find((c) => c.name == l.uploadTo);
        o && !i.accept && o.allowExtensions && (i.accept = o.allowExtensions.map((c) => c.startsWith(".") ? c : `.${c}`).join(","));
      }
      if (a) {
        const o = a.properties?.find((c) => c.name == l.name);
        l.ref || (l.ref = o?.ref);
      }
      if (i.options)
        try {
          const o = {
            input: i,
            $typeFields: r.map((m) => m.name),
            $dataModelFields: a ? ot(a).map((m) => m.name) : [],
            ...z.config.scopeWhitelist
          }, c = ar(i.options, o);
          Object.keys(c).forEach((m) => {
            i[m] = c[m];
          });
        } catch {
          console.error(`failed to evaluate '${i.options}'`);
        }
      t.push(i);
    });
  }
  return t;
}
function Zr(e, t) {
  if (!t.type)
    return console.error("enumDescriptions missing {type:'EnumType'} options"), [`${e}`];
  const r = ht(t.type);
  if (!r?.enumValues)
    return console.error(`Could not find metadata for ${t.type}`), [`${e}`];
  const s = [];
  for (let a = 0; a < r.enumValues.length; a++) {
    const l = parseInt(r.enumValues[a]);
    l > 0 && (l & e) === l && s.push(r.enumDescriptions?.[a] || r.enumNames?.[a] || `${e}`);
  }
  return s;
}
function wa(e) {
  return (t) => typeof t == "number" ? Zr(t, { type: e }) : t;
}
function ot(e) {
  if (!e) return [];
  let t = [], r = {};
  function s(a) {
    a.forEach((l) => {
      r[l.name] || (r[l.name] = 1, t.push(l));
    });
  }
  for (; e; )
    e.properties && s(e.properties), e = e.inherits ? Wr(e.inherits) : null;
  return t.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function In(e, t) {
  return e.request.implements?.some((r) => r.name === t) || !1;
}
function on(e) {
  return e ? ba(e, ot(e)) : null;
}
function ba(e, t) {
  let r = t.find((l) => l.name.toLowerCase() === "id");
  if (r && r.isPrimaryKey) return r;
  let a = t.find((l) => l.isPrimaryKey) || r;
  if (!a) {
    let l = Ke.model(e);
    if (l)
      return Ze(ht(l), (i) => on(i));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function Ci(e, t) {
  return Ze(on(e), (r) => Ne(t, r.name));
}
function Na(e, t, r) {
  return e && e.valueType === "none" ? "" : r.key === "%In" || r.key === "%Between" ? `(${r.value})` : Li(t, r.value);
}
function Li(e, t) {
  return e ? (e = fa(e), Mr(e) || e === "Boolean" ? t : hi(e) ? `[${t}]` : `'${t}'`) : t;
}
function $t(e, t) {
  return { name: e, value: t };
}
const Fs = [
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
  const [e, t] = $(z.metadata.value?.app || null), [r, s] = $(z.metadata.value?.api || null), [a, l] = $(
    z.metadata.value?.plugins?.autoQuery?.viewerConventions || Fs
  );
  return me(() => (Qr(), z.metadata.subscribe((i) => {
    t(i?.app || null), s(i?.api || null), l(i?.plugins?.autoQuery?.viewerConventions || Fs);
  })), []), {
    loadMetadata: xi,
    getMetadata: vi,
    setMetadata: qn,
    clearMetadata: yi,
    metadataApp: e,
    metadataApi: r,
    filterDefinitions: a,
    typeOf: ht,
    typeOfRef: Wr,
    typeEquals: pa,
    apiOf: Yn,
    findApis: wi,
    typeName: ui,
    typeName2: ua,
    property: bi,
    enumOptions: va,
    propertyOptions: xa,
    createFormLayout: ki,
    typeProperties: ot,
    supportsProp: ga,
    Crud: Ke,
    Apis: Ht,
    getPrimaryKey: on,
    getPrimaryKeyByProps: ba,
    getId: Ci,
    createDto: wn,
    makeDto: gi,
    toFormValues: zn,
    formValues: pi,
    isComplexProp: ha,
    asKvps: Kr,
    expandEnumFlags: Zr,
    enumFlagsConverter: wa
  };
}
class nt {
  static Lookup = {};
  static async getOrFetchValue(t, r, s, a, l, i, o) {
    const c = nt.getValue(s, o, l);
    return c ?? (await nt.fetchLookupIds(t, r, s, a, l, i, [o]), nt.getValue(s, o, l));
  }
  static getValue(t, r, s) {
    const a = nt.Lookup[t];
    if (a) {
      const l = a[r];
      if (l)
        return s = s.toLowerCase(), l[s];
    }
  }
  static setValue(t, r, s, a) {
    const l = nt.Lookup[t] ?? (nt.Lookup[t] = {}), i = l[r] ?? (l[r] = {});
    s = s.toLowerCase(), i[s] = a;
  }
  static setRefValue(t, r) {
    const s = Ne(r, t.refId);
    if (s == null || t.refLabel == null)
      return null;
    const a = Ne(r, t.refLabel);
    return nt.setValue(t.model, s, t.refLabel, a), a;
  }
  static async fetchLookupIds(t, r, s, a, l, i, o) {
    const c = r.operations.find((m) => Ke.isAnyQuery(m) && m.dataModel?.name == s);
    if (c) {
      const m = nt.Lookup[s] ?? (nt.Lookup[s] = {}), h = [];
      Object.keys(m).forEach((M) => {
        const k = m[M];
        Ne(k, l) && h.push(M);
      });
      const p = o.filter((M) => !h.includes(M));
      if (p.length == 0)
        return;
      const g = i ? null : `${a},${l}`, y = {
        [a + "In"]: p.join(",")
      };
      g && (y.fields = g);
      const A = wn(c, y), v = await t.api(A, { jsconfig: "edv,eccn" });
      if (v.succeeded)
        (Ne(v.response, "results") || []).forEach((k) => {
          if (!Ne(k, a)) {
            console.error(`result[${a}] == null`, k);
            return;
          }
          const x = `${Ne(k, a)}`, b = Ne(k, l);
          l = l.toLowerCase();
          const N = m[x] ?? (m[x] = {});
          N[l] = `${b}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
}
let Rr = () => (/* @__PURE__ */ new Date()).getTime(), Mi = ["/", "T", ":", "-"], wt = {
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
}, Ri = new Intl.RelativeTimeFormat(wt.locale, {}), zs = 1440 * 60 * 1e3 * 365, yr = {
  year: zs,
  month: zs / 12,
  day: 1440 * 60 * 1e3,
  hour: 3600 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, zt = {
  currency: Ca,
  bytes: La,
  link: Ma,
  linkTel: Ra,
  linkMailTo: Aa,
  icon: Ta,
  iconRounded: Ea,
  attachment: $a,
  hidden: Da,
  time: Oa,
  relativeTime: Jr,
  relativeTimeFromMs: tr,
  enumFlags: Ia,
  formatDate: cn,
  formatNumber: Gr
};
"iconOnError" in globalThis || (globalThis.iconOnError = Jn);
class Ai {
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
function Ti(e) {
  wt = Object.assign({}, wt, e);
}
function Ei(e) {
  Object.keys(e || {}).forEach((t) => {
    typeof e[t] == "function" && (zt[t] = e[t]);
  });
}
function ka() {
  return zt;
}
function kn(e, t) {
  return t ? bt("span", e, t) : e;
}
function Ca(e, t) {
  const r = Nt(t, ["currency"]);
  return kn(new Intl.NumberFormat(void 0, { style: "currency", currency: t?.currency || "USD" }).format(e), r);
}
function La(e, t) {
  return kn(Ur(e), t);
}
function Ma(e, t) {
  return bt("a", e, sr({ ...t, href: e }));
}
function Ra(e, t) {
  return bt("a", e, sr({ ...t, href: `tel:${e}` }));
}
function Aa(e, t) {
  t || (t = {});
  let { subject: r, body: s } = t, a = Nt(t, ["subject", "body"]), l = {};
  return r && (l.subject = r), s && (l.body = s), bt("a", e, sr({ ...a, href: `mailto:${nn(e, l)}` }));
}
function Ta(e, t) {
  return bt("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: tn(e), onerror: "iconOnError(this)" }, t));
}
function Ea(e, t) {
  return bt("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: tn(e), onerror: "iconOnError(this)" }, t));
}
function $a(e, t) {
  let r = zr(e), a = Nn(r) == null || Pr(e) ? tn(e) : Hr(e);
  const l = tn(a);
  let i = t && (t["icon-class"] || t.iconClass), o = bt("img", void 0, Object.assign({ class: "w-6 h-6", src: l, onerror: "iconOnError(this,'att')" }, i ? { class: i } : null)), c = `<span class="pl-1">${r}</span>`;
  return bt("a", o + c, Object.assign({ class: "flex", href: tn(e), title: e }, t ? Nt(t, ["icon-class", "iconClass"]) : null));
}
function Da(e) {
  return "";
}
function Oa(e, t) {
  let r = typeof e == "string" ? new Date(ea(e) * 1e3) : Gn(e) ? At(e) : null;
  return kn(r ? Ul(r) : e, t);
}
function cn(e, t) {
  if (e == null) return "";
  let r = typeof e == "number" ? new Date(e) : typeof e == "string" ? At(e) : e;
  if (!Gn(r))
    return console.warn(`${r} is not a Date value`), e == null ? "" : `${e}`;
  let s = wt.date ? nr(wt.date) : null;
  return kn(typeof s == "function" ? s(r) : Pl(r), t);
}
function Gr(e, t) {
  if (typeof e != "number") return e;
  let r = wt.number ? nr(wt.number) : null, s = typeof r == "function" ? r(e) : `${e}`;
  return s === "" && (console.warn(`formatNumber(${e}) => ${s}`, r), s = `${e}`), kn(s, t);
}
function Bn(e) {
  const t = Math.floor(e / 1e3), r = Math.floor(t / 60), s = Math.floor(r / 60), a = Math.floor(s / 24);
  return a > 0 ? `${a}d ${Bn(e - a * 24 * 60 * 6e4)}` : s > 0 ? `${s}h ${Bn(e - s * 60 * 6e4)}` : r > 0 ? `${r}m ${Bn(e - r * 6e4)}` : t > 0 ? `${t}s` : `${e}ms`;
}
function $i(e) {
  return e >= 1e9 ? (e / 1e9).toFixed(1) + "b" : e >= 1e6 ? (e / 1e6).toFixed(1) + "m" : e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toLocaleString();
}
function Sa(e, t, r) {
  let s = ql(e), a = t ? nr(t) : null;
  if (typeof a == "function") {
    let i = r;
    if (t?.options)
      try {
        i = ar(t.options, r);
      } catch (o) {
        console.error(`Could not evaluate '${t.options}'`, o, ", with scope:", r);
      }
    return a(e, i);
  }
  let l = s != null ? Gn(s) ? cn(s, r) : typeof s == "number" ? Gr(s, r) : s : null;
  return l ?? "";
}
function er(e, t, r) {
  return qt(e) ? Sa(e, t, r) : ji(e, t, r);
}
function Di(e) {
  if (e == null) return NaN;
  if (typeof e == "number")
    return e;
  if (Gn(e))
    return e.getTime() - Rr();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return ea(e) * 1e3 * -1;
    if (Hl(e, Mi) >= 0)
      return At(e).getTime() - Rr();
  }
  return NaN;
}
function tr(e, t) {
  for (let r in yr)
    if (Math.abs(e) > yr[r] || r === "second")
      return (t || Ri).format(Math.round(e / yr[r]), r);
}
function Jr(e, t) {
  let r = Di(e);
  return isNaN(r) ? "" : tr(r, t);
}
function Oi(e, t) {
  return tr(e.getTime() - (t ? t.getTime() : Rr()));
}
function Ia(e, t) {
  return Zr(e, t).join(", ");
}
function nr(e) {
  if (!e) return null;
  let { method: t, options: r } = e, s = `${t}(${r})`, a = zt[s] || zt[t];
  if (typeof a == "function") return a;
  let l = e.locale || wt.locale;
  if (t.startsWith("Intl.")) {
    let i = l ? `'${l}'` : "undefined", o = `return new ${t}(${i},${r || "undefined"})`;
    try {
      let c = Function(o)();
      return a = t === "Intl.DateTimeFormat" ? (m) => c.format(At(m)) : t === "Intl.NumberFormat" ? (m) => c.format(Number(m)) : t === "Intl.RelativeTimeFormat" ? (m) => Jr(m, c) : (m) => c.format(m), zt[s] = a;
    } catch (c) {
      console.error(`Invalid format: ${o}`, c);
    }
  } else {
    let i = globalThis[t];
    if (typeof i == "function") {
      let o = r != null ? Function("return " + r)() : void 0;
      return a = (c) => i(c, o, l), zt[s] = a;
    }
    console.error(`No '${t}' function exists`, Object.keys(zt));
  }
  return null;
}
function ja(e, t) {
  return e ? e.length > t ? e.substring(0, t) + "..." : e : "";
}
function Va(e) {
  return e.substring(0, 6) === "/Date(" ? cn(At(e)) : e;
}
function Si(e) {
  return Xr(sn(e)).replace(/"/g, "");
}
function Fa(e) {
  if (e == null || e === "") return "";
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      console.warn("couldn't parse as JSON", e);
    }
  return e;
}
function Xr(e, t = 4) {
  return e = Fa(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, t);
}
function Ii(e) {
  return e = Fa(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = sn(e), Xr(e));
}
function sn(e) {
  if (e == null) return null;
  if (typeof e == "string") return Va(e);
  if (qt(e)) return e;
  if (e instanceof Date) return cn(e);
  if (Array.isArray(e)) return e.map(sn);
  if (typeof e == "object") {
    let t = {};
    return Object.keys(e).forEach((r) => {
      r != "__type" && (t[r] = sn(e[r]));
    }), t;
  }
  return e;
}
function ji(e, t, r) {
  let s = e;
  if (Array.isArray(e)) {
    if (qt(e[0]))
      return s.join(",");
    e[0] != null && (s = e[0]);
  }
  if (s == null) return "";
  if (s instanceof Date) return cn(s, r);
  let a = Object.keys(s), l = [];
  for (let i = 0; i < Math.min(wt.maxNestedFields, a.length); i++) {
    let o = a[i], c = `${sn(s[o])}`;
    l.push(`<b class="font-medium">${o}</b>: ${Nr(ja(Va(c), wt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && l.push("..."), bt("span", "{ " + l.join(", ") + " }", Object.assign({ title: Nr(Si(e)) }, r));
}
function ac() {
  return {
    Formats: Ai,
    setDefaultFormats: Ti,
    getFormatters: ka,
    setFormatters: Ei,
    formatValue: er,
    formatter: nr,
    dateInputFormat: rr,
    currency: Ca,
    bytes: La,
    link: Ma,
    linkTel: Ra,
    linkMailTo: Aa,
    icon: Ta,
    iconRounded: Ea,
    attachment: $a,
    hidden: Da,
    time: Oa,
    relativeTime: Jr,
    relativeTimeFromDate: Oi,
    relativeTimeFromMs: tr,
    enumFlags: Ia,
    formatDate: cn,
    formatNumber: Gr,
    humanifyMs: Bn,
    humanifyNumber: $i,
    indentJson: Xr,
    prettyJson: Ii,
    scrub: sn,
    truncate: ja,
    apiValueFmt: Sa,
    iconOnError: Jn
  };
}
class Vi {
  callbacks = {};
  register(t, r) {
    this.callbacks[t] = r;
  }
  has(t) {
    return !!this.callbacks[t];
  }
  invoke(t, r) {
    const s = this.callbacks[t];
    typeof s == "function" && s(t, r);
  }
}
class Fi {
  get length() {
    return typeof localStorage > "u" ? 0 : localStorage.length;
  }
  getItem(t) {
    return typeof localStorage > "u" ? null : localStorage.getItem(t);
  }
  setItem(t, r) {
    typeof localStorage > "u" || localStorage.setItem(t, r);
  }
  removeItem(t) {
    typeof localStorage > "u" || localStorage.removeItem(t);
  }
  clear() {
    typeof localStorage > "u" || localStorage.clear();
  }
  key(t) {
    return typeof localStorage > "u" ? null : localStorage.key(t);
  }
}
class Bs {
  _value;
  listeners = /* @__PURE__ */ new Set();
  constructor(t) {
    this._value = t;
  }
  get value() {
    return this._value;
  }
  set value(t) {
    this._value = t, this.listeners.forEach((r) => r(t));
  }
  subscribe(t) {
    return this.listeners.add(t), () => this.listeners.delete(t);
  }
}
class z {
  static config = {
    redirectSignIn: "/signin",
    redirectSignOut: "/auth/logout",
    navigate: (t) => location.href = t,
    assetsPathResolver: (t) => t,
    fallbackPathResolver: (t) => t,
    storage: new Fi(),
    tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
    scopeWhitelist: {
      enumFlagsConverter: wa,
      ...ka()
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
  static events = _l();
  static user = new Bs(null);
  static metadata = new Bs(null);
  static components = {};
  static component(t) {
    const r = z.components[t];
    if (r) return r;
    const s = Ds(t), a = Object.keys(z.components).find((l) => Ds(l) === s);
    return a && z.components[a] || null;
  }
  static interceptors = new Vi();
}
function zi(e) {
  z.config = Object.assign(z.config, e);
}
function Bi(e) {
  z.autoQueryGridDefaults = Object.assign(z.autoQueryGridDefaults, e);
}
function Yr(e) {
  return e && z.config.assetsPathResolver ? z.config.assetsPathResolver(e) : e;
}
function Pi(e) {
  return e && z.config.fallbackPathResolver ? z.config.fallbackPathResolver(e) : e;
}
function Ui(e, t) {
  z.interceptors.register(e, t);
}
function Kt() {
  const e = z.config, t = z.autoQueryGridDefaults, r = z.events;
  return {
    config: e,
    setConfig: zi,
    events: r,
    autoQueryGridDefaults: t,
    setAutoQueryGridDefaults: Bi,
    assetsPathResolver: Yr,
    fallbackPathResolver: Pi,
    registerInterceptor: Ui
  };
}
function rr(e) {
  if (e == null || typeof e == "object") return "";
  const t = At(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 10) ?? "";
}
function za(e) {
  if (e == null || typeof e == "object") return "";
  const t = At(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 19) ?? "";
}
function Ba(e) {
  return e == null ? "" : Ql(e);
}
function Ar(e, t) {
  return z.config.inputValue ? z.config.inputValue(e, t) : e === "date" ? rr(t) : e === "datetime-local" ? za(t) : e === "time" ? Ba(t) : e === "number" || e === "range" ? t == null ? "" : Number(t) : t;
}
function Pa(e, t, r) {
  r ? (r(null), setTimeout(() => r(t), 0)) : (e.current = null, setTimeout(() => e.current = t, 0));
}
function Ua(e) {
  return e;
}
function Ot(e, t, r) {
  r ? (t(e.entering.cls + " " + e.entering.from), setTimeout(() => t(e.entering.cls + " " + e.entering.to), 0)) : (t(e.leaving.cls + " " + e.leaving.from), setTimeout(() => t(e.leaving.cls + " " + e.leaving.to), 0));
}
function Pn(e) {
  if (typeof document > "u") return;
  let t = e?.after || document.activeElement, r = t && t.form;
  if (r) {
    let s = ':not([disabled]):not([tabindex="-1"])', a = r.querySelectorAll(`a:not([disabled]), button${s}, input[type=text]${s}, [tabindex]${s}`), l = Array.prototype.filter.call(
      a,
      (o) => o.offsetWidth > 0 || o.offsetHeight > 0 || o === t
    ), i = l.indexOf(t);
    i > -1 && (l[i + 1] || l[0]).focus();
  }
}
function It(e) {
  if (!e) return null;
  if (typeof e == "string")
    return e;
  const t = typeof e == "function" ? new e() : typeof e == "object" ? e : null;
  if (!t)
    throw new Error(`Invalid DTO Type '${typeof e}'`);
  if (typeof t.getTypeName != "function")
    throw new Error(`${JSON.stringify(t)} is not a Request DTO`);
  const r = t.getTypeName();
  if (!r)
    throw new Error("DTO Required");
  return r;
}
function bt(e, t, r) {
  r || (r = {});
  let s = r.cls || r.className || r.class;
  return s && (r = Nt(r, ["cls", "class", "className"]), r.class = s), t == null ? `<${e}` + Tr(r) + "/>" : `<${e}` + Tr(r) + `>${t || ""}</${e}>`;
}
function Tr(e) {
  return Object.keys(e).reduce((t, r) => `${t} ${r}="${Nr(e[r])}"`, "");
}
function sr(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function tn(e) {
  return Yr(e);
}
let Hi = ["string", "number", "boolean", "null", "undefined"];
function qt(e) {
  return Hi.indexOf(typeof e) >= 0 || e instanceof Date;
}
function bn(e) {
  return !qt(e);
}
function _n(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function es(e, t) {
  if (typeof history < "u") {
    const r = t ? nn(ta(location.href, "?"), e) : Kl(location.href, e);
    history.pushState({}, "", r);
  }
}
function ar(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const s = Object.assign(
    Object.keys(globalThis).reduce((a, l) => (a[l] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(s);
}
function Er(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function ts(e) {
  const t = z.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function lr(e, t) {
  return nn(`swr.${Wl(e)}`, t ? Object.assign({}, e, t) : e);
}
function qi(e) {
  if (e.request) {
    const t = lr(e.request, e.args);
    z.config.storage.removeItem(t);
  }
}
async function Ha(e, t, r, s, a) {
  const l = lr(t, s);
  r(new Ye({ response: ts(l) }));
  const i = await e.api(t, s, a);
  if (i.succeeded && i.response) {
    i.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const o = JSON.stringify(i.response);
    z.config.storage.setItem(l, o), r(i);
  }
  return i;
}
function qa(e, t) {
  let r = null;
  return (...s) => {
    r && clearTimeout(r), r = setTimeout(() => {
      e(...s);
    }, t || 100);
  };
}
function Bt(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function Pt(e, t) {
  const r = Bt(t);
  return e.reduce((s, a) => (s[a] = !r.includes(a), s), {});
}
function _i(e) {
  return new Promise((t) => setTimeout(t, e));
}
function _a(e) {
  const t = [], r = [];
  for (const s of e) {
    const a = s.toLowerCase();
    r.includes(a) || (t.push(s), r.push(a));
  }
  return t;
}
function Qi() {
  return {
    dateInputFormat: rr,
    dateTimeInputFormat: za,
    timeInputFormat: Ba,
    textInputValue: Ar,
    setRef: Pa,
    unRefs: Ua,
    transition: Ot,
    focusNextElement: Pn,
    getTypeName: It,
    htmlTag: bt,
    htmlAttrs: Tr,
    linkAttrs: sr,
    toAppUrl: tn,
    isPrimitive: qt,
    isComplexType: bn,
    pushState: es,
    scopedExpr: ar,
    copyText: Er,
    fromCache: ts,
    swrCacheKey: lr,
    swrClear: qi,
    swrApi: Ha,
    asStrings: Bt,
    asOptions: Pt,
    createDebounce: qa,
    delay: _i,
    uniqueIgnoreCase: _a
  };
}
const ns = Wt(void 0);
function Zt(e) {
  const [t, r] = $(!1), [s, a] = $(), [l, i] = $(), o = e ?? ct(ns);
  function c({ message: b, errorCode: N, fieldName: L, errors: V }) {
    N || (N = "Exception"), V || (V = []);
    const R = L ? new vr({
      errorCode: N,
      message: b,
      errors: [new Os({ fieldName: L, errorCode: N, message: b })]
    }) : new vr({ errorCode: N, message: b, errors: V });
    return a(R), R;
  }
  function m({ fieldName: b, message: N, errorCode: L }) {
    if (L || (L = "Exception"), !s)
      c({ fieldName: b, message: N, errorCode: L });
    else {
      let V = new vr(s);
      V.errors = [
        ...(V.errors || []).filter((R) => R.fieldName?.toLowerCase() !== b?.toLowerCase()),
        new Os({ fieldName: b, message: N, errorCode: L })
      ], a(V);
    }
  }
  async function h(b, N, L) {
    r(!0);
    let V = await o.api(b, N, L);
    return r(!1), i(V.response), a(V.error), V;
  }
  async function p(b, N, L) {
    r(!0);
    let V = await o.apiVoid(b, N, L);
    return r(!1), i(V.response), a(V.error), V;
  }
  async function g(b, N, L, V) {
    r(!0);
    let R = await o.apiForm(b, N, L, V);
    return r(!1), i(R.response), a(R.error), R;
  }
  async function y(b, N, L, V) {
    r(!0);
    let R = await o.apiFormVoid(b, N, L, V);
    return r(!1), i(R.response), a(R.error), R;
  }
  async function A(b, N, L, V) {
    return Ha(o, b, N, L, V);
  }
  function v(b, N) {
    const [L, V] = $(new Ye());
    return me(() => {
      const R = qa(async (U) => {
        const w = await o.api(U);
        V(w);
      }, N?.delayMs), X = b(), D = ts(lr(X));
      D && V(new Ye({ response: D })), N?.delayMs === 0 ? o.api(X).then(V) : R(X), o.api(b(), N?.args, N?.method).then(V);
    }, []), { current: L };
  }
  return {
    setError: c,
    addFieldError: m,
    loading: { current: t },
    error: { current: s },
    api: h,
    apiVoid: p,
    apiForm: g,
    apiFormVoid: y,
    swr: A,
    swrEffect: v,
    unRefs: Ua,
    setRef: Pa
  };
}
function Qa(e) {
  return e && e.SessionId ? Zl(e) : e;
}
function Wi(e) {
  z.user.value = Qa(e), z.events.publish("signIn", e);
}
function Ki() {
  z.user.value = null, z.events.publish("signOut", null);
}
const rs = (e) => e?.roles || [], ss = (e) => e?.permissions || [];
function Wa(e) {
  return rs(z.user.value).indexOf(e) >= 0;
}
function Zi(e) {
  return ss(z.user.value).indexOf(e) >= 0;
}
function as() {
  return Wa("Admin");
}
function Qn(e) {
  if (!e) return !1;
  if (!e.requiresAuth)
    return !0;
  const t = z.user.value;
  if (!t)
    return !1;
  if (as())
    return !0;
  let [r, s] = [rs(t), ss(t)], [a, l, i, o] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => r.indexOf(c) >= 0) || i.length > 0 && !i.some((c) => r.indexOf(c) >= 0) || !l.every((c) => s.indexOf(c) >= 0) || o.length > 0 && !o.every((c) => s.indexOf(c) >= 0));
}
function Gi(e) {
  if (!e || !e.requiresAuth) return null;
  const t = z.user.value;
  if (!t)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (as())
    return null;
  let [r, s] = [rs(t), ss(t)], [a, l, i, o] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], c = a.filter((h) => r.indexOf(h) < 0);
  if (c.length > 0)
    return `Requires ${c.map((h) => "<b>" + h + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "");
  let m = l.filter((h) => s.indexOf(h) < 0);
  return m.length > 0 ? `Requires ${m.map((h) => "<b>" + h + "</b>").join(", ")} Permission` + (m.length > 1 ? "s" : "") : i.length > 0 && !i.some((h) => r.indexOf(h) >= 0) ? `Requires any ${i.filter((h) => r.indexOf(h) < 0).map((h) => "<b>" + h + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "") : o.length > 0 && !o.every((h) => s.indexOf(h) >= 0) ? `Requires any ${o.filter((h) => s.indexOf(h) < 0).map((h) => "<b>" + h + "</b>").join(", ")} Permission` + (m.length > 1 ? "s" : "") : null;
}
function ls() {
  const [e, t] = $(z.user.value), r = e != null;
  return me(() => z.user.subscribe(t), []), { signIn: Wi, signOut: Ki, user: e, toAuth: Qa, isAuthenticated: r, hasRole: Wa, hasPermission: Zi, isAdmin: as, canAccess: Qn, invalidAccessMessage: Gi };
}
function tt(e, t) {
  return Array.isArray(e) ? e.indexOf(t) >= 0 : e == t || e.includes(t);
}
const Wn = {
  blue: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
  purple: "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200",
  red: "text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200",
  green: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
  sky: "text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200",
  cyan: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200",
  indigo: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
}, ft = {
  base: "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none",
  invalid: "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
  valid: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600"
}, yn = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, en = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, $r = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, Ue = {
  panelClass(e = "slideOver") {
    return e == "card" ? yn.panelClass : en.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? yn.formClass : en.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? yn.headingClass : en.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? yn.subHeadingClass : en.subHeadingClass;
  },
  buttonsClass: "px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between",
  legendClass: "text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"
}, de = {
  getGridClass(e = "stripedRows") {
    return de.gridClass;
  },
  getGrid2Class(e = "stripedRows") {
    return tt(e, "fullWidth") ? "overflow-x-auto" : de.grid2Class;
  },
  getGrid3Class(e = "stripedRows") {
    return tt(e, "fullWidth") ? "inline-block min-w-full py-2 align-middle" : de.grid3Class;
  },
  getGrid4Class(e = "stripedRows") {
    return tt(e, "whiteBackground") ? "" : tt(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black/5" : de.grid4Class;
  },
  getTableClass(e = "stripedRows") {
    return tt(e, "fullWidth") || tt(e, "verticalLines") ? "min-w-full divide-y divide-gray-300" : de.tableClass;
  },
  getTheadClass(e = "stripedRows") {
    return tt(e, "whiteBackground") ? "" : de.theadClass;
  },
  getTheadRowClass(e = "stripedRows") {
    return de.theadRowClass + (tt(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  getTheadCellClass(e = "stripedRows") {
    return de.theadCellClass + (tt(e, "uppercaseHeadings") ? " uppercase" : "");
  },
  getTbodyClass(e = "stripedRows") {
    return (tt(e, "whiteBackground") || tt(e, "verticalLines") ? "divide-y divide-gray-200 dark:divide-gray-800" : de.tableClass) + (tt(e, "verticalLines") ? " bg-white" : "");
  },
  getTableRowClass(e = "stripedRows", t, r, s) {
    return (s ? "cursor-pointer " : "") + (r ? "bg-indigo-100 dark:bg-blue-800" : (s ? "hover:bg-yellow-50 dark:hover:bg-blue-900 " : "") + (tt(e, "stripedRows") ? t % 2 == 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black")) + (tt(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
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
}, Ji = {
  colspans: "col-span-3 sm:col-span-3"
};
function jt(e, t, r) {
  const s = e.filter((a) => a).join(" ");
  return r ??= z.config.filterInputClass == null ? void 0 : (a) => z.config.filterInputClass(a, t), r ? r(s) : s;
}
const lc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: Wn,
  card: yn,
  dummy: Ji,
  filterClass: jt,
  form: Ue,
  grid: de,
  input: ft,
  modal: $r,
  slideOver: en
}, Symbol.toStringTag, { value: "Module" }));
class ic {
  view;
  includeTypes;
  constructor(t) {
    Object.assign(this, t);
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
const Vt = Wt(void 0), is = kt(({
  id: e,
  type: t,
  label: r,
  labelClass: s,
  help: a,
  placeholder: l,
  value: i,
  onChange: o,
  status: c,
  inputClass: m,
  filterClass: h,
  className: p,
  ...g
}, y) => {
  const A = Ge(null);
  Ct(y, () => ({
    focus: () => A.current?.focus()
  }));
  const v = f(() => t || "text", [t]), M = f(() => r ?? ze(mt(e)), [r, e]), k = f(() => l ?? M, [l, M]), x = (R) => t === "range" ? R.replace("shadow-sm ", "") : R, b = ct(Vt), N = f(
    () => Tt.call({ responseStatus: c ?? b?.error?.current }, e),
    [c, b, e]
  ), L = f(
    () => jt([
      ft.base,
      N ? ft.invalid : x(ft.valid),
      m
    ], "TextInput", h),
    [N, m, h, t]
  ), V = (R) => {
    const X = Ar(v, R.target.value);
    o?.(X);
  };
  return /* @__PURE__ */ d("div", { className: p, children: [
    M && /* @__PURE__ */ n("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${s ?? ""}`, children: M }),
    /* @__PURE__ */ d("div", { className: x("mt-1 relative"), children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: A,
          type: v,
          name: e,
          id: e,
          className: L,
          placeholder: k,
          value: Ar(v, i),
          onChange: V,
          "aria-invalid": N != null,
          "aria-describedby": `${e}-error`,
          step: "any",
          ...Nt(g, ["value"])
        }
      ),
      N && /* @__PURE__ */ n("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
    ] }),
    N ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: N }) : a ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: a }) : null
  ] });
});
is.displayName = "TextInput";
function Xi({ type: e = "warn", hideIcon: t, children: r }) {
  const s = f(
    () => e === "info" ? "bg-blue-50 dark:bg-blue-200" : e === "error" ? "bg-red-50 dark:bg-red-200" : e === "success" ? "bg-green-50 dark:bg-green-200" : "bg-yellow-50 dark:bg-yellow-200",
    [e]
  ), a = f(
    () => e === "info" ? "border-blue-400" : e === "error" ? "border-red-400" : e === "success" ? "border-green-400" : "border-yellow-400",
    [e]
  ), l = f(
    () => e === "info" ? "text-blue-700" : e === "error" ? "text-red-700" : e === "success" ? "text-green-700" : "text-yellow-700",
    [e]
  );
  return /* @__PURE__ */ n("div", { className: `${s} ${a} border-l-4 p-4`, children: /* @__PURE__ */ d("div", { className: "flex items-center", children: [
    !t && /* @__PURE__ */ d("div", { className: "flex-shrink-0 mr-3", children: [
      e === "warn" && /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
      e === "error" && /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z", clipRule: "evenodd" }) }),
      e === "info" && /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-blue-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }) }),
      e === "success" && /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-green-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }) })
    ] }),
    /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n("p", { className: `${l} text-sm`, children: r }) })
  ] }) });
}
function oc({ message: e, children: t }) {
  const [r, s] = $(!1);
  return r ? null : /* @__PURE__ */ n("div", { className: "rounded-md bg-green-50 dark:bg-green-200 p-4", role: "alert", children: /* @__PURE__ */ d("div", { className: "flex", children: [
    /* @__PURE__ */ n("div", { className: "flex-shrink-0", children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-green-400 dark:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) }),
    /* @__PURE__ */ n("div", { className: "ml-3", children: /* @__PURE__ */ n("h3", { className: "text-sm font-medium text-green-800", children: e || t }) }),
    /* @__PURE__ */ n("div", { className: "ml-auto pl-3", children: /* @__PURE__ */ n("div", { className: "-mx-1.5 -my-1.5", children: /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "inline-flex rounded-md bg-green-50 dark:bg-green-200 p-1.5 text-green-500 dark:text-green-600 hover:bg-green-100 dark:hover:bg-green-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-50 dark:ring-offset-green-900",
        onClick: () => s(!0),
        children: [
          /* @__PURE__ */ n("span", { className: "sr-only", children: "Dismiss" }),
          /* @__PURE__ */ n("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" }) })
        ]
      }
    ) }) })
  ] }) });
}
function ir({ status: e, except: t, className: r }) {
  const s = ct(Vt), a = f(
    () => e || s?.error?.current ? Gl.call({ responseStatus: e ?? s?.error?.current }, t ?? []) : null,
    [e, s, t]
  );
  return a ? /* @__PURE__ */ n("div", { className: `bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${r ?? ""}`, children: /* @__PURE__ */ d("div", { className: "flex", children: [
    /* @__PURE__ */ n("div", { className: "flex-shrink-0", children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { fill: "currentColor", d: "M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" }) }) }),
    /* @__PURE__ */ n("div", { className: "ml-3", children: /* @__PURE__ */ n("p", { className: "text-sm text-red-700 dark:text-red-200", children: a }) })
  ] }) }) : null;
}
function cc({ id: e, description: t }) {
  return t ? /* @__PURE__ */ n(
    "div",
    {
      className: "mt-2 text-sm text-gray-500",
      id: `${e}-description`,
      "aria-describedby": `${e}-description`,
      children: /* @__PURE__ */ n("div", { children: t })
    },
    "description"
  ) : null;
}
function Cn({ image: e, svg: t, src: r, alt: s, type: a, className: l, ...i }) {
  let o = e;
  if (a) {
    const { typeOf: h } = dt(), p = h(a);
    p || console.warn(`Type ${a} does not exist`), p?.icon ? o = p?.icon : console.warn(`Type ${a} does not have a [Svg] icon`);
  }
  let c = t || o?.svg || "";
  if (c.startsWith("<svg ")) {
    let p = Zn(c, ">").indexOf("class="), g = `${o?.cls || ""} ${l || ""}`;
    if (p === -1)
      c = `<svg class="${g}" ${c.substring(4)}`;
    else {
      const y = p + 6 + 1;
      c = `${c.substring(0, y) + g} ${c.substring(y)}`;
    }
    return /* @__PURE__ */ n("span", { dangerouslySetInnerHTML: { __html: c } });
  } else
    return /* @__PURE__ */ n(
      "img",
      {
        className: `${o?.cls || ""} ${l || ""}`,
        src: Yr(r || o?.uri),
        alt: s,
        onError: (h) => Jn(h.target),
        ...i
      }
    );
}
function Ka({ imageClass: e = "w-6 h-6", children: t }) {
  return /* @__PURE__ */ n("div", { className: "text-2xl font-semibold text-gray-900 dark:text-gray-300", children: /* @__PURE__ */ d("div", { className: "flex", children: [
    /* @__PURE__ */ d(
      "svg",
      {
        className: `self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 ${e}`,
        role: "status",
        viewBox: "0 0 100 101",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ n("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }),
          /* @__PURE__ */ n("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })
        ]
      }
    ),
    /* @__PURE__ */ n("span", { children: t })
  ] }) });
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Dr() {
  return Dr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }
    return e;
  }, Dr.apply(this, arguments);
}
var Ps;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Ps || (Ps = {}));
function Be(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Ln(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Or(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: s = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s), t;
}
function Za(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let s = e.indexOf("?");
    s >= 0 && (t.search = e.substr(s), e = e.substr(0, s)), e && (t.pathname = e);
  }
  return t;
}
var Us;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Us || (Us = {}));
function Hs(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, s] = Yi(e.path, e.caseSensitive, e.end), a = t.match(r);
  if (!a) return null;
  let l = a[0], i = l.replace(/(.)\/+$/, "$1"), o = a.slice(1);
  return {
    params: s.reduce((m, h, p) => {
      let {
        paramName: g,
        isOptional: y
      } = h;
      if (g === "*") {
        let v = o[p] || "";
        i = l.slice(0, l.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const A = o[p];
      return y && !A ? m[g] = void 0 : m[g] = (A || "").replace(/%2F/g, "/"), m;
    }, {}),
    pathname: l,
    pathnameBase: i,
    pattern: e
  };
}
function Yi(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), Ln(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let s = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (i, o, c) => (s.push({
    paramName: o,
    isOptional: c != null
  }), c ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (s.push({
    paramName: "*"
  }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), s];
}
function an(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, s = e.charAt(r);
  return s && s !== "/" ? null : e.slice(r) || "/";
}
function eo(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: s = "",
    hash: a = ""
  } = typeof e == "string" ? Za(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : to(r, t) : t,
    search: ro(s),
    hash: so(a)
  };
}
function to(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
  }), r.length > 1 ? r.join("/") : "/";
}
function xr(e, t, r, s) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(s) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function no(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function Ga(e, t) {
  let r = no(e);
  return t ? r.map((s, a) => a === r.length - 1 ? s.pathname : s.pathnameBase) : r.map((s) => s.pathnameBase);
}
function Ja(e, t, r, s) {
  s === void 0 && (s = !1);
  let a;
  typeof e == "string" ? a = Za(e) : (a = Dr({}, e), Be(!a.pathname || !a.pathname.includes("?"), xr("?", "pathname", "search", a)), Be(!a.pathname || !a.pathname.includes("#"), xr("#", "pathname", "hash", a)), Be(!a.search || !a.search.includes("#"), xr("#", "search", "hash", a)));
  let l = e === "" || a.pathname === "", i = l ? "/" : a.pathname, o;
  if (i == null)
    o = r;
  else {
    let p = t.length - 1;
    if (!s && i.startsWith("..")) {
      let g = i.split("/");
      for (; g[0] === ".."; )
        g.shift(), p -= 1;
      a.pathname = g.join("/");
    }
    o = p >= 0 ? t[p] : "/";
  }
  let c = eo(a, o), m = i && i !== "/" && i.endsWith("/"), h = (l || i === ".") && r.endsWith("/");
  return !c.pathname.endsWith("/") && (m || h) && (c.pathname += "/"), c;
}
const os = (e) => e.join("/").replace(/\/\/+/g, "/"), ro = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, so = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Xa = ["post", "put", "patch", "delete"];
new Set(Xa);
const ao = ["get", ...Xa];
new Set(ao);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Sr() {
  return Sr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }
    return e;
  }, Sr.apply(this, arguments);
}
const or = /* @__PURE__ */ oe.createContext(null);
process.env.NODE_ENV !== "production" && (or.displayName = "DataRouter");
const Ya = /* @__PURE__ */ oe.createContext(null);
process.env.NODE_ENV !== "production" && (Ya.displayName = "DataRouterState");
const lo = /* @__PURE__ */ oe.createContext(null);
process.env.NODE_ENV !== "production" && (lo.displayName = "Await");
const Et = /* @__PURE__ */ oe.createContext(null);
process.env.NODE_ENV !== "production" && (Et.displayName = "Navigation");
const cs = /* @__PURE__ */ oe.createContext(null);
process.env.NODE_ENV !== "production" && (cs.displayName = "Location");
const dn = /* @__PURE__ */ oe.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (dn.displayName = "Route");
const io = /* @__PURE__ */ oe.createContext(null);
process.env.NODE_ENV !== "production" && (io.displayName = "RouteError");
function oo(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  ds() || (process.env.NODE_ENV !== "production" ? Be(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : Be(!1));
  let {
    basename: s,
    navigator: a
  } = oe.useContext(Et), {
    hash: l,
    pathname: i,
    search: o
  } = Rn(e, {
    relative: r
  }), c = i;
  return s !== "/" && (c = i === "/" ? s : os([s, i])), a.createHref({
    pathname: c,
    search: o,
    hash: l
  });
}
function ds() {
  return oe.useContext(cs) != null;
}
function Mn() {
  return ds() || (process.env.NODE_ENV !== "production" ? Be(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : Be(!1)), oe.useContext(cs).location;
}
const el = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function tl(e) {
  oe.useContext(Et).static || oe.useLayoutEffect(e);
}
function co() {
  let {
    isDataRoute: e
  } = oe.useContext(dn);
  return e ? go() : uo();
}
function uo() {
  ds() || (process.env.NODE_ENV !== "production" ? Be(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : Be(!1));
  let e = oe.useContext(or), {
    basename: t,
    future: r,
    navigator: s
  } = oe.useContext(Et), {
    matches: a
  } = oe.useContext(dn), {
    pathname: l
  } = Mn(), i = JSON.stringify(Ga(a, r.v7_relativeSplatPath)), o = oe.useRef(!1);
  return tl(() => {
    o.current = !0;
  }), oe.useCallback(function(m, h) {
    if (h === void 0 && (h = {}), process.env.NODE_ENV !== "production" && Ln(o.current, el), !o.current) return;
    if (typeof m == "number") {
      s.go(m);
      return;
    }
    let p = Ja(m, JSON.parse(i), l, h.relative === "path");
    e == null && t !== "/" && (p.pathname = p.pathname === "/" ? t : os([t, p.pathname])), (h.replace ? s.replace : s.push)(p, h.state, h);
  }, [t, s, i, l, e]);
}
function Rn(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    future: s
  } = oe.useContext(Et), {
    matches: a
  } = oe.useContext(dn), {
    pathname: l
  } = Mn(), i = JSON.stringify(Ga(a, s.v7_relativeSplatPath));
  return oe.useMemo(() => Ja(e, JSON.parse(i), l, r === "path"), [e, i, l, r]);
}
var nl = /* @__PURE__ */ (function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
})(nl || {}), us = /* @__PURE__ */ (function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
})(us || {});
function rl(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function fo(e) {
  let t = oe.useContext(or);
  return t || (process.env.NODE_ENV !== "production" ? Be(!1, rl(e)) : Be(!1)), t;
}
function mo(e) {
  let t = oe.useContext(dn);
  return t || (process.env.NODE_ENV !== "production" ? Be(!1, rl(e)) : Be(!1)), t;
}
function sl(e) {
  let t = mo(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? Be(!1, e + ' can only be used on routes that contain a unique "id"') : Be(!1)), r.route.id;
}
function ho() {
  return sl(us.UseRouteId);
}
function go() {
  let {
    router: e
  } = fo(nl.UseNavigateStable), t = sl(us.UseNavigateStable), r = oe.useRef(!1);
  return tl(() => {
    r.current = !0;
  }), oe.useCallback(function(a, l) {
    l === void 0 && (l = {}), process.env.NODE_ENV !== "production" && Ln(r.current, el), r.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, Sr({
      fromRouteId: t
    }, l)));
  }, [e, t]);
}
new Promise(() => {
});
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ln() {
  return ln = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }
    return e;
  }, ln.apply(this, arguments);
}
function fs(e, t) {
  if (e == null) return {};
  var r = {}, s = Object.keys(e), a, l;
  for (l = 0; l < s.length; l++)
    a = s[l], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
const Un = "get", Hn = "application/x-www-form-urlencoded";
function cr(e) {
  return e != null && typeof e.tagName == "string";
}
function po(e) {
  return cr(e) && e.tagName.toLowerCase() === "button";
}
function vo(e) {
  return cr(e) && e.tagName.toLowerCase() === "form";
}
function yo(e) {
  return cr(e) && e.tagName.toLowerCase() === "input";
}
function xo(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function wo(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !xo(e);
}
let jn = null;
function bo() {
  if (jn === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), jn = !1;
    } catch {
      jn = !0;
    }
  return jn;
}
const No = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function wr(e) {
  return e != null && !No.has(e) ? (process.env.NODE_ENV !== "production" && Ln(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Hn + '"')), null) : e;
}
function ko(e, t) {
  let r, s, a, l, i;
  if (vo(e)) {
    let o = e.getAttribute("action");
    s = o ? an(o, t) : null, r = e.getAttribute("method") || Un, a = wr(e.getAttribute("enctype")) || Hn, l = new FormData(e);
  } else if (po(e) || yo(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let c = e.getAttribute("formaction") || o.getAttribute("action");
    if (s = c ? an(c, t) : null, r = e.getAttribute("formmethod") || o.getAttribute("method") || Un, a = wr(e.getAttribute("formenctype")) || wr(o.getAttribute("enctype")) || Hn, l = new FormData(o, e), !bo()) {
      let {
        name: m,
        type: h,
        value: p
      } = e;
      if (h === "image") {
        let g = m ? m + "." : "";
        l.append(g + "x", "0"), l.append(g + "y", "0");
      } else m && l.append(m, p);
    }
  } else {
    if (cr(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    r = Un, s = null, a = Hn, i = e;
  }
  return l && a === "text/plain" && (i = l, l = void 0), {
    action: s,
    method: r.toLowerCase(),
    encType: a,
    formData: l,
    body: i
  };
}
const Co = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Lo = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Mo = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Ro = "6";
try {
  window.__reactRouterVersion = Ro;
} catch {
}
const al = /* @__PURE__ */ oe.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (al.displayName = "ViewTransition");
const Ao = /* @__PURE__ */ oe.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Ao.displayName = "Fetchers");
process.env.NODE_ENV;
const To = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Eo = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, An = /* @__PURE__ */ oe.forwardRef(function(t, r) {
  let {
    onClick: s,
    relative: a,
    reloadDocument: l,
    replace: i,
    state: o,
    target: c,
    to: m,
    preventScrollReset: h,
    viewTransition: p
  } = t, g = fs(t, Co), {
    basename: y
  } = oe.useContext(Et), A, v = !1;
  if (typeof m == "string" && Eo.test(m) && (A = m, To))
    try {
      let b = new URL(window.location.href), N = m.startsWith("//") ? new URL(b.protocol + m) : new URL(m), L = an(N.pathname, y);
      N.origin === b.origin && L != null ? m = L + N.search + N.hash : v = !0;
    } catch {
      process.env.NODE_ENV !== "production" && Ln(!1, '<Link to="' + m + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let M = oo(m, {
    relative: a
  }), k = So(m, {
    replace: i,
    state: o,
    target: c,
    preventScrollReset: h,
    relative: a,
    viewTransition: p
  });
  function x(b) {
    s && s(b), b.defaultPrevented || k(b);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ oe.createElement("a", ln({}, g, {
      href: A || M,
      onClick: v || l ? s : x,
      ref: r,
      target: c
    }))
  );
});
process.env.NODE_ENV !== "production" && (An.displayName = "Link");
const $o = /* @__PURE__ */ oe.forwardRef(function(t, r) {
  let {
    "aria-current": s = "page",
    caseSensitive: a = !1,
    className: l = "",
    end: i = !1,
    style: o,
    to: c,
    viewTransition: m,
    children: h
  } = t, p = fs(t, Lo), g = Rn(c, {
    relative: p.relative
  }), y = Mn(), A = oe.useContext(Ya), {
    navigator: v,
    basename: M
  } = oe.useContext(Et), k = A != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Bo(g) && m === !0, x = v.encodeLocation ? v.encodeLocation(g).pathname : g.pathname, b = y.pathname, N = A && A.navigation && A.navigation.location ? A.navigation.location.pathname : null;
  a || (b = b.toLowerCase(), N = N ? N.toLowerCase() : null, x = x.toLowerCase()), N && M && (N = an(N, M) || N);
  const L = x !== "/" && x.endsWith("/") ? x.length - 1 : x.length;
  let V = b === x || !i && b.startsWith(x) && b.charAt(L) === "/", R = N != null && (N === x || !i && N.startsWith(x) && N.charAt(x.length) === "/"), X = {
    isActive: V,
    isPending: R,
    isTransitioning: k
  }, D = V ? s : void 0, U;
  typeof l == "function" ? U = l(X) : U = [l, V ? "active" : null, R ? "pending" : null, k ? "transitioning" : null].filter(Boolean).join(" ");
  let w = typeof o == "function" ? o(X) : o;
  return /* @__PURE__ */ oe.createElement(An, ln({}, p, {
    "aria-current": D,
    className: U,
    ref: r,
    style: w,
    to: c,
    viewTransition: m
  }), typeof h == "function" ? h(X) : h);
});
process.env.NODE_ENV !== "production" && ($o.displayName = "NavLink");
const Do = /* @__PURE__ */ oe.forwardRef((e, t) => {
  let {
    fetcherKey: r,
    navigate: s,
    reloadDocument: a,
    replace: l,
    state: i,
    method: o = Un,
    action: c,
    onSubmit: m,
    relative: h,
    preventScrollReset: p,
    viewTransition: g
  } = e, y = fs(e, Mo), A = Fo(), v = zo(c, {
    relative: h
  }), M = o.toLowerCase() === "get" ? "get" : "post", k = (x) => {
    if (m && m(x), x.defaultPrevented) return;
    x.preventDefault();
    let b = x.nativeEvent.submitter, N = b?.getAttribute("formmethod") || o;
    A(b || x.currentTarget, {
      fetcherKey: r,
      method: N,
      navigate: s,
      replace: l,
      state: i,
      relative: h,
      preventScrollReset: p,
      viewTransition: g
    });
  };
  return /* @__PURE__ */ oe.createElement("form", ln({
    ref: t,
    method: M,
    action: v,
    onSubmit: a ? m : k
  }, y));
});
process.env.NODE_ENV !== "production" && (Do.displayName = "Form");
process.env.NODE_ENV;
var Kn;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(Kn || (Kn = {}));
var qs;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(qs || (qs = {}));
function Oo(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function ll(e) {
  let t = oe.useContext(or);
  return t || (process.env.NODE_ENV !== "production" ? Be(!1, Oo(e)) : Be(!1)), t;
}
function So(e, t) {
  let {
    target: r,
    replace: s,
    state: a,
    preventScrollReset: l,
    relative: i,
    viewTransition: o
  } = t === void 0 ? {} : t, c = co(), m = Mn(), h = Rn(e, {
    relative: i
  });
  return oe.useCallback((p) => {
    if (wo(p, r)) {
      p.preventDefault();
      let g = s !== void 0 ? s : Or(m) === Or(h);
      c(e, {
        replace: g,
        state: a,
        preventScrollReset: l,
        relative: i,
        viewTransition: o
      });
    }
  }, [m, c, h, s, a, r, e, l, i, o]);
}
function Io() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let jo = 0, Vo = () => "__" + String(++jo) + "__";
function Fo() {
  let {
    router: e
  } = ll(Kn.UseSubmit), {
    basename: t
  } = oe.useContext(Et), r = ho();
  return oe.useCallback(function(s, a) {
    a === void 0 && (a = {}), Io();
    let {
      action: l,
      method: i,
      encType: o,
      formData: c,
      body: m
    } = ko(s, t);
    if (a.navigate === !1) {
      let h = a.fetcherKey || Vo();
      e.fetch(h, r, a.action || l, {
        preventScrollReset: a.preventScrollReset,
        formData: c,
        body: m,
        formMethod: a.method || i,
        formEncType: a.encType || o,
        flushSync: a.flushSync
      });
    } else
      e.navigate(a.action || l, {
        preventScrollReset: a.preventScrollReset,
        formData: c,
        body: m,
        formMethod: a.method || i,
        formEncType: a.encType || o,
        replace: a.replace,
        state: a.state,
        fromRouteId: r,
        flushSync: a.flushSync,
        viewTransition: a.viewTransition
      });
  }, [e, t, r]);
}
function zo(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: s
  } = oe.useContext(Et), a = oe.useContext(dn);
  a || (process.env.NODE_ENV !== "production" ? Be(!1, "useFormAction must be used inside a RouteContext") : Be(!1));
  let [l] = a.matches.slice(-1), i = ln({}, Rn(e || ".", {
    relative: r
  })), o = Mn();
  if (e == null) {
    i.search = o.search;
    let c = new URLSearchParams(i.search), m = c.getAll("index");
    if (m.some((p) => p === "")) {
      c.delete("index"), m.filter((g) => g).forEach((g) => c.append("index", g));
      let p = c.toString();
      i.search = p ? "?" + p : "";
    }
  }
  return (!e || e === ".") && l.route.index && (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (i.pathname = i.pathname === "/" ? s : os([s, i.pathname])), Or(i);
}
function Bo(e, t) {
  t === void 0 && (t = {});
  let r = oe.useContext(al);
  r == null && (process.env.NODE_ENV !== "production" ? Be(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : Be(!1));
  let {
    basename: s
  } = ll(Kn.useViewTransitionState), a = Rn(e, {
    relative: t.relative
  });
  if (!r.isTransitioning)
    return !1;
  let l = an(r.currentLocation.pathname, s) || r.currentLocation.pathname, i = an(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return Hs(a.pathname, i) != null || Hs(a.pathname, l) != null;
}
const _s = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black";
function dc({ type: e = "submit", href: t, onClick: r, children: s, ...a }) {
  return t ? /* @__PURE__ */ n(An, { to: t, children: /* @__PURE__ */ n("button", { className: _s, onClick: r, ...a, children: s }) }) : /* @__PURE__ */ n("button", { type: e, className: _s, onClick: r, ...a, children: s });
}
const Qs = {
  blue: "focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  purple: "focus:ring-purple-500 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:hover:bg-purple-400 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
  red: "focus:ring-red-500 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:hover:bg-red-400 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500",
  green: "focus:ring-green-500 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:hover:bg-green-400 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500",
  sky: "focus:ring-sky-500 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-500",
  cyan: "focus:ring-cyan-500 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500",
  indigo: "focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
};
function Mt({
  type: e = "submit",
  color: t = "indigo",
  href: r,
  onClick: s,
  children: a,
  ...l
}) {
  const i = f(
    () => "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black text-white " + (Qs[t] || Qs.indigo),
    [t]
  );
  return r ? /* @__PURE__ */ n(An, { to: r, children: /* @__PURE__ */ n("button", { className: i, onClick: s, ...l, children: a }) }) : /* @__PURE__ */ n("button", { type: e, className: i, onClick: s, ...l, children: a });
}
const Ws = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black";
function Rt({ type: e = "button", href: t, onClick: r, children: s, ...a }) {
  return t ? /* @__PURE__ */ n(An, { to: t, children: /* @__PURE__ */ n("button", { type: e, className: Ws, onClick: r, ...a, children: s }) }) : /* @__PURE__ */ n("button", { type: e, className: Ws, onClick: r, ...a, children: s });
}
function uc({
  color: e = "blue",
  href: t,
  children: r,
  ...s
}) {
  const a = f(
    () => (Wn[e] || Wn.blue) + (t ? "" : " cursor-pointer"),
    [e, t]
  );
  return /* @__PURE__ */ n("a", { className: a, href: t, ...s, children: r });
}
function fc({ homeHref: e = "/", homeLabel: t = "Home", children: r }) {
  return /* @__PURE__ */ n("nav", { className: "flex", "aria-label": "Breadcrumb", children: /* @__PURE__ */ d("ol", { role: "list", className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("div", { children: /* @__PURE__ */ d("a", { href: e, className: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400", title: t, children: [
      /* @__PURE__ */ n("svg", { className: "h-6 w-6 flex-shrink-0", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ n("span", { className: "sr-only", children: t })
    ] }) }) }),
    r
  ] }) });
}
function mc({ href: e, title: t, children: r }) {
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ d("div", { className: "flex items-center", children: [
    /* @__PURE__ */ n("svg", { className: "h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clipRule: "evenodd" }) }),
    e ? /* @__PURE__ */ n("a", { href: e, className: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300", title: t, children: r }) : /* @__PURE__ */ n("span", { className: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300", title: t, children: r })
  ] }) });
}
function hc({ title: e, children: t }) {
  return /* @__PURE__ */ d("div", { children: [
    e && /* @__PURE__ */ n("h2", { className: "text-base font-semibold text-gray-500 dark:text-gray-400", children: e }),
    /* @__PURE__ */ n("ul", { role: "list", className: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800", children: t })
  ] });
}
function gc({ href: e, title: t, icon: r, iconSrc: s, iconSvg: a, iconAlt: l, children: i }) {
  return /* @__PURE__ */ d("li", { className: "relative flex items-start space-x-4 py-6", children: [
    /* @__PURE__ */ n("div", { className: "flex-shrink-0", children: /* @__PURE__ */ n("span", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900", children: /* @__PURE__ */ n(Cn, { className: "w-6 h-6 text-indigo-700 dark:text-indigo-300", image: r, src: s, svg: a, alt: l }) }) }),
    /* @__PURE__ */ d("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ n("h3", { className: "text-base font-medium text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ n("span", { className: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2", children: /* @__PURE__ */ d("a", { href: e, className: "focus:outline-none", children: [
        /* @__PURE__ */ n("span", { className: "absolute inset-0", "aria-hidden": "true" }),
        t
      ] }) }) }),
      /* @__PURE__ */ n("p", { className: "text-base text-gray-500", children: i })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex-shrink-0 self-center", children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-gray-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clipRule: "evenodd" }) }) })
  ] });
}
function il({ invalidAccess: e }) {
  const { isAuthenticated: t } = ls(), { config: r } = Kt(), s = () => {
    let l = location.href.substring(location.origin.length) || "/";
    const i = nn(r.redirectSignIn, { redirect: l });
    r.navigate(i);
  }, a = () => {
    let l = location.href.substring(location.origin.length) || "/";
    const i = nn(r.redirectSignOut, { ReturnUrl: l });
    r.navigate(i);
  };
  return e ? /* @__PURE__ */ d("div", { children: [
    /* @__PURE__ */ n(Xi, { dangerouslySetInnerHTML: { __html: e } }),
    /* @__PURE__ */ n("div", { className: "md:p-4", children: t ? /* @__PURE__ */ n(Rt, { onClick: a, children: "Sign Out" }) : /* @__PURE__ */ n(Rt, { onClick: s, children: "Sign In" }) })
  ] }) : null;
}
function Tn({
  buttonClass: e = "bg-white dark:bg-black",
  title: t = "Close",
  onClose: r
}) {
  return /* @__PURE__ */ n("div", { className: "absolute top-0 right-0 pt-4 pr-4", children: /* @__PURE__ */ d(
    "button",
    {
      type: "button",
      onClick: r,
      title: t,
      className: `${e} cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black`,
      children: [
        /* @__PURE__ */ n("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ n("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
      ]
    }
  ) });
}
function Po({
  id: e = "SlideOver",
  title: t,
  subtitle: r,
  contentClass: s = "relative mt-6 flex-1 px-4 sm:px-6",
  children: a,
  onDone: l
}) {
  const [i, o] = $(!1), [c, m] = $(""), h = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  me(() => {
    o(!0);
  }, []), me(() => {
    if (Ot(h, m, i), !i) {
      const g = setTimeout(() => l?.(), 700);
      return () => clearTimeout(g);
    }
  }, [i, l]);
  const p = () => o(!1);
  return me(() => {
    const g = (y) => {
      y.key === "Escape" && p();
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, []), /* @__PURE__ */ d("div", { id: e, className: "relative z-10", "aria-labelledby": `${e}-title`, role: "dialog", "aria-modal": "true", children: [
    /* @__PURE__ */ n("div", { className: "fixed inset-0" }),
    /* @__PURE__ */ n("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: p, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: (g) => g.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ n("div", { className: `panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${c}`, children: /* @__PURE__ */ n("div", { className: "flex h-full flex-col bg-white dark:bg-black shadow-xl", children: /* @__PURE__ */ n("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
      /* @__PURE__ */ n("div", { className: "relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
        /* @__PURE__ */ d("div", { className: "space-y-1", children: [
          t && /* @__PURE__ */ n("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-50", id: `${e}-title`, children: t }),
          r && /* @__PURE__ */ n("p", { className: "text-sm text-gray-500", children: r })
        ] }),
        /* @__PURE__ */ n("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ n(Tn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: p }) })
      ] }) }),
      /* @__PURE__ */ n("div", { className: s, children: a })
    ] }) }) }) }) }) }) })
  ] });
}
function Ks({
  title: e,
  subtitle: t,
  alertClass: r,
  invalidAccess: s,
  onDone: a
}) {
  return s ? /* @__PURE__ */ d(Po, { title: e, onDone: a, contentClass: "relative flex-1", children: [
    t && /* @__PURE__ */ n("div", { slot: "subtitle", children: t }),
    /* @__PURE__ */ n(il, { alertClass: r, invalidAccess: s })
  ] }) : null;
}
function ol({
  id: e,
  label: t,
  value: r,
  onChange: s,
  status: a,
  entries: l,
  values: i,
  options: o,
  inputClass: c,
  labelClass: m,
  filterClass: h,
  className: p,
  ...g
}) {
  const y = f(() => t ?? ze(mt(e)), [t, e]), A = ct(Vt), v = f(
    () => Tt.call({ responseStatus: a ?? A?.error?.current }, e),
    [a, A, e]
  ), M = f(
    () => l || (i ? i.map((b) => ({ key: b, value: b })) : o ? Object.keys(o).map((b) => ({ key: b, value: o[b] })) : []),
    [l, i, o]
  ), k = f(() => jt([
    "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none",
    v ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "shadow-sm border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
    c
  ], "SelectInput", h), [v, c, h]), x = (b) => {
    s?.(b.target.value);
  };
  return /* @__PURE__ */ d("div", { className: p, children: [
    y && /* @__PURE__ */ n("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${m ?? ""}`, children: y }),
    /* @__PURE__ */ n(
      "select",
      {
        id: e,
        name: e,
        className: k,
        value: r ?? "",
        onChange: x,
        "aria-invalid": v != null,
        "aria-describedby": `${e}-error`,
        ...Nt(g, ["class"]),
        children: M.map((b) => /* @__PURE__ */ n("option", { value: b.key, children: b.value }, b.key))
      }
    ),
    v && /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: v })
  ] });
}
function cl({
  definitions: e,
  column: t,
  topLeft: r,
  onDone: s,
  onSave: a
}) {
  const l = Ge(null), [i, o] = $("%"), [c, m] = $(""), [h, p] = $([]), [g, y] = $({ filters: [] }), A = f(() => t.meta.isEnum === !0, [t.meta.isEnum]), v = f(
    () => ht(t.meta.type === "Nullable`1" ? t.meta.genericArgs[0] : t.meta.type),
    [t.meta.type, t.meta.genericArgs]
  ), M = f(
    () => t.meta.isEnum === !0 ? Kr(va(v?.name || "")) : [],
    [t.meta.isEnum, v]
  ), k = f(
    () => x(t.type)?.map((w) => ({ key: w.value, value: w.name })) || [],
    [t.type, e]
  );
  me(() => {
    y(Object.assign({}, t.settings, {
      filters: Array.from(t.settings.filters)
    }));
  }, [t.settings]), me(() => {
    let w = t.settings.filters?.[0]?.value?.split(",") || [];
    if (w.length > 0 && v?.isEnumInt) {
      const O = w[0] && parseInt(w[0]) || 0;
      w = v.enumValues?.filter((T) => (O & parseInt(T)) > 0) || [];
    }
    p(w);
  }, [t.settings.filters, v]), me(() => {
    l.current?.focus();
  }, []);
  function x(w) {
    let O = e;
    return ma(w) || (O = O.filter((T) => T.types !== "string")), O;
  }
  function b(w, O) {
    return x(w).find((T) => T.value === O);
  }
  function N() {
    if (!i) return;
    let w = b(t.type, i)?.name;
    w && (y((O) => ({
      ...O,
      filters: [...O.filters, { key: i, name: w, value: c }]
    })), o("%"), m(""));
  }
  function L(w) {
    y((O) => ({
      ...O,
      filters: O.filters.filter((T, Q) => Q !== w)
    }));
  }
  function V(w) {
    return Na(b(t.type, w.key), t.type, w);
  }
  function R() {
    s?.();
  }
  function X() {
    if (c && N(), A) {
      let w = Object.values(h).filter((T) => T);
      const O = {
        ...g,
        filters: w.length > 0 ? v?.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: w.map((T) => parseInt(T)).reduce((T, Q) => T + Q, 0).toString() }] : [{ key: "%In", name: "In", value: w.join(",") }] : []
      };
      a?.(O);
    } else
      a?.(g);
    s?.();
  }
  function D(w) {
    const O = {
      ...g,
      sort: w === g.sort ? void 0 : w
    };
    y(O), setTimeout(() => {
      a?.(O), s?.();
    }, 0);
  }
  const U = (w, O) => {
    p(
      (T) => O ? [...T, w] : T.filter((Q) => Q !== w)
    );
  };
  return /* @__PURE__ */ n("div", { className: "fixed z-20 inset-0 overflow-y-auto", onClick: R, children: /* @__PURE__ */ n("div", { className: "absolute", style: { top: `${r.y}px`, left: `${r.x}px` }, onClick: (w) => w.stopPropagation(), children: /* @__PURE__ */ d("div", { className: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80", children: [
    /* @__PURE__ */ d("div", { className: "p-4", children: [
      /* @__PURE__ */ n("h3", { className: "text-base font-medium mb-3 dark:text-gray-100", children: "Sort" }),
      /* @__PURE__ */ d("div", { className: "flex w-full justify-center", children: [
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            title: "Sort Ascending",
            onClick: () => D("ASC"),
            className: `${g.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
            children: [
              /* @__PURE__ */ n("svg", { className: "w-6 h-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ d("g", { fill: "currentColor", children: [
                /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" }),
                /* @__PURE__ */ n("path", { d: "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" })
              ] }) }),
              /* @__PURE__ */ n("span", { children: "ASC" })
            ]
          }
        ),
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            title: "Sort Descending",
            onClick: () => D("DESC"),
            className: `${g.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
            children: [
              /* @__PURE__ */ n("svg", { className: "w-6 h-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ d("g", { fill: "currentColor", children: [
                /* @__PURE__ */ n("path", { d: "M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" }),
                /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" }),
                /* @__PURE__ */ n("path", { d: "M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" })
              ] }) }),
              /* @__PURE__ */ n("span", { children: "DESC" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ n("h3", { className: "text-base font-medium mt-4 mb-2", children: "Filter" }),
      A ? /* @__PURE__ */ n("div", { children: M?.map((w) => /* @__PURE__ */ d("div", { className: "flex items-center", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "checkbox",
            id: w.key,
            value: w.key,
            checked: h.includes(w.key),
            onChange: (O) => U(w.key, O.target.checked),
            className: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          }
        ),
        /* @__PURE__ */ n("label", { htmlFor: w.key, className: "ml-3", children: w.value })
      ] }, w.key)) }) : /* @__PURE__ */ d("div", { children: [
        g.filters.map((w, O) => /* @__PURE__ */ n("div", { className: "mb-2", children: /* @__PURE__ */ d("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700", children: [
          t.name,
          " ",
          w.name,
          " ",
          V(w),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: () => L(O),
              className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white",
              children: /* @__PURE__ */ n("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
            }
          )
        ] }) }, O)),
        /* @__PURE__ */ d("div", { className: "flex", children: [
          /* @__PURE__ */ n(
            ol,
            {
              id: "filterRule",
              className: "w-32 mr-1",
              value: i,
              onChange: o,
              entries: k,
              label: ""
            }
          ),
          b(t.type, i)?.valueType !== "none" && /* @__PURE__ */ n(
            is,
            {
              ref: l,
              id: "filterValue",
              className: "w-32 mr-1",
              type: "text",
              value: c,
              onChange: (w) => m(w),
              label: "",
              placeholder: ""
            }
          ),
          /* @__PURE__ */ n("div", { className: "pt-1", children: /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: N,
              className: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: /* @__PURE__ */ n("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) })
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
      /* @__PURE__ */ n(Mt, { onClick: X, color: "red", className: "ml-2", children: "Save" }),
      /* @__PURE__ */ n(Rt, { onClick: R, children: "Cancel" })
    ] })
  ] }) }) });
}
function dl({
  definitions: e = [],
  columns: t = [],
  onDone: r,
  onChange: s
}) {
  const a = f(
    () => t.filter((g) => g.settings.filters.length > 0),
    [t]
  );
  function l(g) {
    return g?.[0]?.value?.split(",");
  }
  function i(g) {
    let y = e;
    return ma(g) || (y = y.filter((A) => A.types !== "string")), y;
  }
  function o(g, y) {
    return i(g).find((A) => A.value === y);
  }
  function c(g, y) {
    return Na(o(g.type, y.key), g.type, y);
  }
  function m(g) {
    g.settings.filters = [], s?.(g);
  }
  function h(g, y) {
    g.settings.filters.splice(y, 1), s?.(g);
  }
  function p() {
    t.forEach((g) => {
      g.settings.filters = [], s?.(g);
    }), r?.();
  }
  return /* @__PURE__ */ d("div", { className: "px-4 sm:px-6 lg:px-8 text-sm", children: [
    /* @__PURE__ */ n("div", { className: "flex flex-wrap", children: a.map((g) => /* @__PURE__ */ d("fieldset", { className: "group pr-4 sm:pr-6 lg:pr-8", children: [
      /* @__PURE__ */ d("legend", { className: "flex justify-between w-full font-medium", children: [
        /* @__PURE__ */ n("span", { children: ze(g.name) }),
        /* @__PURE__ */ n("span", { className: "w-6 flex justify-end", children: /* @__PURE__ */ n("span", { className: "hidden group-hover:inline", children: /* @__PURE__ */ n(
          "button",
          {
            onClick: () => m(g),
            title: `Clear all ${ze(g.name)} filters`,
            className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white",
            children: /* @__PURE__ */ n("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
          }
        ) }) })
      ] }),
      g.meta.isEnum ? /* @__PURE__ */ n("div", { className: "pt-2", children: l(g.settings.filters)?.map((y) => /* @__PURE__ */ n("div", { className: "flex items-center", children: /* @__PURE__ */ n("label", { className: "ml-2", children: y }) }, y)) }) : /* @__PURE__ */ n("div", { children: g.settings.filters.map((y, A) => /* @__PURE__ */ n("div", { className: "pt-2", children: /* @__PURE__ */ d("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700", children: [
        g.name,
        " ",
        y.name,
        " ",
        c(g, y),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => h(g, A),
            className: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white",
            children: /* @__PURE__ */ n("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
          }
        )
      ] }) }, A)) })
    ] }, g.name)) }),
    /* @__PURE__ */ n("div", { className: "flex justify-center pt-4", children: /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: p,
        className: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        children: /* @__PURE__ */ n("span", { children: "Clear All" })
      }
    ) })
  ] });
}
function ul({ column: e, isOpen: t }) {
  const r = e?.settings?.filters, s = e?.settings?.sort;
  return /* @__PURE__ */ d("div", { className: "flex", children: [
    r && r.length > 0 ? /* @__PURE__ */ n("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("g", { fill: "none", children: /* @__PURE__ */ n(
      "path",
      {
        d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ) }) }) : /* @__PURE__ */ d(
      "svg",
      {
        className: `w-4 h-4 transition-transform ${t ? "rotate-180" : ""}`,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024",
        children: [
          /* @__PURE__ */ n(
            "path",
            {
              d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ n(
            "path",
            {
              d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
              fill: "currentColor"
            }
          )
        ]
      }
    ),
    s === "ASC" && /* @__PURE__ */ n("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ n("g", { fill: "none", children: /* @__PURE__ */ n(
      "path",
      {
        d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z",
        fill: "currentColor"
      }
    ) }) }),
    s === "DESC" && /* @__PURE__ */ n("svg", { className: "w-4 h-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ n("g", { fill: "none", children: /* @__PURE__ */ n(
      "path",
      {
        d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z",
        fill: "currentColor"
      }
    ) }) })
  ] });
}
function Uo({ type: e, propType: t, value: r, ...s }) {
  const { typeOf: a } = dt();
  function l(x) {
    return x?.format ? x.format : x?.type == "TimeSpan" || x?.type == "TimeOnly" ? { method: "time" } : null;
  }
  const i = l(t), o = Ne(r, t.name), c = Object.assign({}, { type: e, propType: t, value: r }, s), m = er(o, i, c), h = bn(o) && Array.isArray(o) ? /* @__PURE__ */ d("span", { children: [
    /* @__PURE__ */ n("span", { className: "mr-2", children: o.length }),
    /* @__PURE__ */ n("span", { dangerouslySetInnerHTML: { __html: m } })
  ] }) : /* @__PURE__ */ n("span", { dangerouslySetInnerHTML: { __html: m } }), p = t?.ref;
  if (!p)
    return h;
  const y = ot(e).find((x) => x.type === p.model);
  if (!y)
    return h;
  const A = Ne(r, y.name), v = A && p.refLabel && Ne(A, p.refLabel);
  if (!v)
    return h;
  const k = a(p.model)?.icon;
  return /* @__PURE__ */ d("span", { className: "flex", title: `${p.model} ${r}`, children: [
    k && /* @__PURE__ */ n(Cn, { image: k, className: "w-5 h-5 mr-1" }),
    v
  ] });
}
function Ho({
  value: e,
  format: t,
  includeIcon: r = !0,
  includeCount: s = !0,
  maxFieldLength: a = 150,
  maxNestedFields: l = 2,
  maxNestedFieldLength: i = 30,
  ...o
}) {
  const c = f(() => Array.isArray(e), [e]), m = f(() => er(e, t, o), [e, t, o]);
  return bn(e) ? /* @__PURE__ */ d("span", { children: [
    s && c && /* @__PURE__ */ n("span", { className: "mr-2", children: e.length }),
    /* @__PURE__ */ n("span", { dangerouslySetInnerHTML: { __html: m } })
  ] }) : /* @__PURE__ */ n("span", { dangerouslySetInnerHTML: { __html: m } });
}
function fl({
  id: e = "DataGrid",
  items: t = [],
  type: r,
  tableStyle: s = "stripedRows",
  selectedColumns: a,
  gridClass: l,
  grid2Class: i,
  grid3Class: o,
  grid4Class: c,
  tableClass: m,
  tbodyClass: h,
  theadClass: p,
  theadRowClass: g,
  theadCellClass: y,
  headerTitles: A,
  headerTitle: v,
  visibleFrom: M,
  rowClass: k,
  rowStyle: x,
  isSelected: b,
  onHeaderSelected: N,
  onRowSelected: L,
  children: V
}) {
  const R = Ge(null), { typeOf: X, typeProperties: D } = dt(), U = f(() => It(r), [r]), w = f(() => X(U), [U]), O = f(() => D(w), [w]);
  function T(G) {
    const P = A && Ne(A, G) || G;
    return v ? v(P) : ra(P);
  }
  function Q(G) {
    const P = G.toLowerCase();
    return O.find((u) => u.name.toLowerCase() == P);
  }
  function I(G) {
    const P = Q(G);
    return P?.format ? P.format : P?.type == "TimeSpan" || P?.type == "TimeOnly" ? { method: "time" } : null;
  }
  const B = {
    xs: "xs:table-cell",
    sm: "sm:table-cell",
    md: "md:table-cell",
    lg: "lg:table-cell",
    xl: "xl:table-cell",
    "2xl": "2xl:table-cell",
    never: ""
  };
  function W(G) {
    const P = M && Ne(M, G);
    return P && Ze(B[P], (u) => `hidden ${u}`);
  }
  const Y = f(() => l ?? de.getGridClass(s), [l, s]), C = f(() => i ?? de.getGrid2Class(s), [i, s]), K = f(() => o ?? de.getGrid3Class(s), [o, s]), Z = f(() => c ?? de.getGrid4Class(s), [c, s]), Ce = f(() => m ?? de.getTableClass(s), [m, s]), ve = f(() => h ?? de.getTbodyClass(h), [h]), Ae = f(() => p ?? de.getTheadClass(s), [p, s]), te = f(() => g ?? de.getTheadRowClass(s), [g, s]), ke = f(() => y ?? de.getTheadCellClass(s), [y, s]);
  function be(G, P) {
    return k ? k(G, P) : de.getTableRowClass(s, P, !!(b && b(G)), b != null);
  }
  function Me(G, P) {
    return x ? x(G, P) : void 0;
  }
  const F = f(() => V ? [] : [], [V]), _ = f(() => {
    const G = (typeof a == "string" ? a.split(",") : a) || (F.length > 0 ? F : na(t)), P = O.reduce((u, E) => (u[E.name.toLowerCase()] = E.format, u), {});
    return G.filter((u) => P[u.toLowerCase()]?.method != "hidden");
  }, [a, F, t, O]), ce = (G, P, u) => null;
  return t.length ? /* @__PURE__ */ n("div", { ref: R, className: Y, children: /* @__PURE__ */ n("div", { className: C, children: /* @__PURE__ */ n("div", { className: K, children: /* @__PURE__ */ n("div", { className: Z, children: /* @__PURE__ */ d("table", { className: Ce, children: [
    /* @__PURE__ */ n("thead", { className: Ae, children: /* @__PURE__ */ n("tr", { className: te, children: _.map((G) => /* @__PURE__ */ n(
      "td",
      {
        className: `${W(G)} ${ke} text-gray-500 dark:text-gray-400`,
        children: /* @__PURE__ */ n("div", { onClick: (P) => N?.(G, P), children: ce() || /* @__PURE__ */ n("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ n("span", { className: "mr-1 select-none", children: T(G) }) }) })
      },
      G
    )) }) }),
    /* @__PURE__ */ n("tbody", { className: ve, children: t.map((G, P) => /* @__PURE__ */ n(
      "tr",
      {
        className: be(G, P),
        style: Me(G, P),
        onClick: (u) => L?.(G, u),
        children: _.map((u) => /* @__PURE__ */ n("td", { className: `${W(u)} ${de.tableCellClass}`, children: ce() || (Q(u) ? /* @__PURE__ */ n(Uo, { type: w, propType: Q(u), value: G }) : /* @__PURE__ */ n(Ho, { value: Ne(G, u), format: I(u) ?? void 0 })) }, u))
      },
      P
    )) })
  ] }) }) }) }) }) : null;
}
function qo({
  id: e,
  input: t,
  metadataType: r,
  value: s,
  onChange: a,
  status: l,
  label: i,
  labelClass: o,
  help: c
}) {
  const { config: m } = Kt(), { metadataApi: h } = dt(), p = ct(ns), g = ct(pl), y = f(() => e || t.id, [e, t.id]), A = f(() => i ?? ze(mt(y)), [i, y]), v = f(
    () => Tt.call({ responseStatus: l }, y),
    [l, y]
  ), [M, k] = $(""), x = f(() => Ne(s, y), [s, y]), b = f(
    () => ot(r).find((D) => D.name.toLowerCase() == y.toLowerCase()),
    [r, y]
  ), N = f(
    () => ht(b?.ref?.model)?.icon || m.tableIcon,
    [b, m]
  );
  function L(D) {
    return D ? t.options ? Object.assign({}, D, ar(t.options, {
      input: t,
      $typeFields: ot(r).map((U) => U.name),
      ...z.config.scopeWhitelist
    })) : D : null;
  }
  const V = f(() => L(b?.ref ?? (t.type == "lookup" ? {
    model: r.name,
    refId: on(r)?.name ?? "id",
    refLabel: r.properties?.find((D) => D.type == "String" && !D.isPrimaryKey)?.name
  } : null)), [b, t.type, r]);
  function R(D) {
    if (D) {
      if (g == null) {
        console.warn("No ModalProvider required by LookupInput");
        return;
      }
      g.openModal({ name: "ModalLookup", ref: D }, (U) => {
        if (console.debug("openModal", M, " -> ", U, nt.setRefValue(D, U), D), U) {
          const w = Ne(U, D.refId);
          k(nt.setRefValue(D, U) || w);
          const O = { ...s };
          O[y] = w, a?.(O);
        }
      });
    }
  }
  function X() {
    s[y] = null, k("");
  }
  return me(() => {
    (async () => {
      const D = s;
      s[y] || (s[y] = null);
      const U = b, w = V;
      if (!U || !w) {
        console.warn(`No RefInfo for property '${y}'`);
        return;
      }
      k("");
      let O = w.selfId == null ? Ne(D, U.name) : Ne(D, w.selfId);
      if (bn(O) && (O = Ne(D, w.refId)), O == null)
        return;
      const Q = h?.operations.find((I) => I.dataModel?.name == w.model);
      if (console.debug("LookupInput queryOp", Q), Q != null) {
        const I = Ne(D, U.name);
        if (bn(I)) return;
        if (k(`${I}`), w.refLabel != null) {
          const B = ot(r).filter((C) => C.type == w.model);
          B.length || console.warn(`Could not find ${w.model} Property on ${r.name}`);
          const W = B.map((C) => Ne(D, C.name)).filter((C) => !!C), Y = W.length <= 1 ? W[0] : W.find((C) => C[w.refId ?? "id"] == O);
          if (Y != null) {
            let C = Ne(Y, w.refLabel);
            C && (k(`${C}`), nt.setValue(w.model, O, w.refLabel, C));
          } else {
            const C = U.attributes?.some((Z) => Z.name == "Computed") == !0;
            let K = await nt.getOrFetchValue(p, h, w.model, w.refId, w.refLabel, C, O);
            k(K || `${w.model}: ${M}`);
          }
        }
      }
    })();
  }, []), /* @__PURE__ */ d("div", { className: "lookup-field", children: [
    /* @__PURE__ */ n("input", { type: "hidden", name: y, value: x }),
    A && /* @__PURE__ */ d("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ n("label", { htmlFor: y, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${o ?? ""}`, children: A }),
      x && /* @__PURE__ */ d("div", { className: "flex items-center", children: [
        /* @__PURE__ */ n("span", { className: "text-sm text-gray-500 dark:text-gray-400 pr-1", children: x }),
        /* @__PURE__ */ d("button", { onClick: X, type: "button", title: "clear", className: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black", children: [
          /* @__PURE__ */ n("span", { className: "sr-only", children: "Clear" }),
          /* @__PURE__ */ n("svg", { className: "h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
        ] })
      ] })
    ] }),
    V && /* @__PURE__ */ n("div", { className: "mt-1 relative", children: /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
        onClick: () => R(V),
        "aria-haspopup": "listbox",
        "aria-expanded": "true",
        "aria-labelledby": "listbox-label",
        children: [
          /* @__PURE__ */ n("span", { className: "w-full inline-flex truncate", children: /* @__PURE__ */ d("span", { className: "text-blue-700 dark:text-blue-300 flex cursor-pointer", children: [
            /* @__PURE__ */ n(Cn, { className: "mr-1 w-5 h-5", image: N }),
            /* @__PURE__ */ n("span", { children: M })
          ] }) }),
          /* @__PURE__ */ n("span", { className: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none", children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })
        ]
      }
    ) }),
    v && /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${y}-error`, children: v }),
    !v && c && /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${y}-description`, children: c })
  ] });
}
function _o({
  id: e,
  label: t,
  help: r,
  value: s,
  onChange: a,
  status: l,
  inputClass: i,
  labelClass: o,
  filterClass: c,
  className: m,
  ...h
}) {
  const p = f(() => t ?? ze(mt(e)), [t, e]), g = ct(Vt), y = f(
    () => Tt.call({ responseStatus: l ?? g?.error?.current }, e),
    [l, g, e]
  ), A = f(() => jt([
    "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800",
    i
  ], "CheckboxInput", c), [i, c]), v = (M) => {
    a?.(M.target.checked);
  };
  return /* @__PURE__ */ d("div", { className: `relative flex items-start ${m ?? ""}`, children: [
    /* @__PURE__ */ n("div", { className: "flex items-center h-5", children: /* @__PURE__ */ n(
      "input",
      {
        id: e,
        name: e,
        type: "checkbox",
        checked: s ?? !1,
        onChange: v,
        className: A,
        ...Nt(h, ["class"])
      }
    ) }),
    /* @__PURE__ */ d("div", { className: "ml-3 text-sm", children: [
      /* @__PURE__ */ n("label", { htmlFor: e, className: `font-medium text-gray-700 dark:text-gray-300 ${o ?? ""}`, children: p }),
      y ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: y }) : r ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: r }) : null
    ] })
  ] });
}
function Qo({
  id: e,
  type: t,
  label: r,
  labelClass: s,
  help: a,
  value: l = [],
  onChange: i,
  status: o,
  inputClass: c,
  filterClass: m,
  className: h,
  allowableValues: p,
  string: g,
  converter: y,
  delimiters: A = [","],
  maxVisibleItems: v = 300,
  ...M
}) {
  const k = Ge(null), [x, b] = $(), [N, L] = $(!1), [V, R] = $(""), [X, D] = $(!1);
  function U(u) {
    return y ? y(u) : u;
  }
  const w = f(() => {
    const u = U(l);
    return Ze(u, (E) => typeof E == "string" ? E.trim().length == 0 ? [] : E.split(",") : E) || [];
  }, [l, y]), O = f(() => {
    const u = V.toLowerCase();
    return !p || p.length == 0 ? [] : p.length < 1e3 ? p.filter((E) => !w.includes(E) && E.toLowerCase().includes(u)) : p.filter((E) => !w.includes(E) && E.startsWith(u));
  }, [p, w, V]), T = f(() => t || "text", [t]), Q = f(() => r ?? ze(mt(e)), [r, e]), I = ct(Vt), B = f(
    () => Tt.call({ responseStatus: o ?? I?.error?.current }, e),
    [o, I, e]
  ), W = f(() => jt([
    "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
    B ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
    c
  ], "TagInput", m), [B, c, m]), Y = (u) => ve(w.filter((E) => E != u));
  function C(u) {
    document.activeElement === u.target && k.current?.focus();
  }
  function K() {
    L(!0), D(!0);
  }
  function Z() {
    K();
  }
  function Ce() {
    _(te()), D(!1), setTimeout(() => {
      X || L(!1);
    }, 200);
  }
  function ve(u) {
    const E = g ? u.join(",") : u;
    i?.(E);
  }
  function Ae(u) {
    if (u.key == "Backspace" && V.length == 0 && w.length > 0 && Y(w[w.length - 1]), !(!p || p.length == 0))
      if (u.code == "Escape" || u.code == "Tab")
        L(!1);
      else if (u.code == "Home")
        b(O[0]), Me();
      else if (u.code == "End")
        b(O[O.length - 1]), Me();
      else if (u.code == "ArrowDown") {
        if (L(!0), !x)
          b(O[0]);
        else {
          const E = O.indexOf(x);
          b(E + 1 < O.length ? O[E + 1] : O[0]);
        }
        F();
      } else if (u.code == "ArrowUp") {
        if (!x)
          b(O[O.length - 1]);
        else {
          const E = O.indexOf(x);
          b(E - 1 >= 0 ? O[E - 1] : O[O.length - 1]);
        }
        F();
      } else u.code == "Enter" ? x && N ? (_(x), u.preventDefault()) : L(!1) : L(O.length > 0);
  }
  function te() {
    if (V.length == 0) return "";
    let u = Jl(V.trim(), ",");
    return u[0] == "," && (u = u.substring(1)), u = u.trim(), u.length == 0 && N && O.length > 0 ? x : u;
  }
  function ke(u) {
    const E = te();
    if (E && E.length > 0) {
      const j = A.some((re) => re == u.key);
      if (j && u.preventDefault(), u.key == "Enter" || u.key == "NumpadEnter" || u.key.length == 1 && j) {
        _(E);
        return;
      }
    }
  }
  const be = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
  function Me() {
    setTimeout(() => {
      let u = Ss(`#${e}-tag li.active`);
      u && u.scrollIntoView(be);
    }, 0);
  }
  function F() {
    setTimeout(() => {
      let u = Ss(`#${e}-tag li.active`);
      u && ("scrollIntoViewIfNeeded" in u ? u.scrollIntoViewIfNeeded(be) : u.scrollIntoView(be));
    }, 0);
  }
  function _(u) {
    if (!u || u.length === 0) return;
    const E = Array.from(w);
    E.indexOf(u) == -1 && E.push(u), ve(E), R(""), L(!1);
  }
  function ce(u) {
    u.preventDefault(), u.stopPropagation();
    const E = u.clipboardData?.getData("Text");
    G(E);
  }
  function G(u) {
    if (!u) return;
    const E = new RegExp(`\\n|\\t|${A.join("|")}`), j = Array.from(w);
    u.split(E).map((re) => re.trim()).forEach((re) => {
      j.indexOf(re) == -1 && j.push(re);
    }), ve(j), R("");
  }
  const P = Nt(M, ["class", "required"]);
  return /* @__PURE__ */ d("div", { className: h, id: `${e}-tag`, onMouseMove: () => D(!0), children: [
    Q && /* @__PURE__ */ n("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${s ?? ""}`, children: Q }),
    /* @__PURE__ */ d("div", { className: "mt-1 relative", children: [
      /* @__PURE__ */ n("input", { type: "hidden", id: e, name: e, value: w.join(",") }),
      /* @__PURE__ */ n("button", { className: W, onClick: C, onFocus: () => L(!0), tabIndex: -1, children: /* @__PURE__ */ d("div", { className: "flex flex-wrap pb-1.5", children: [
        w.map((u) => /* @__PURE__ */ n("div", { className: "pt-1.5 pl-1", children: /* @__PURE__ */ d("span", { className: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300", children: [
          u,
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: () => Y(u),
              className: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black",
              children: /* @__PURE__ */ n("svg", { className: "h-2 w-2", stroke: "currentColor", fill: "none", viewBox: "0 0 8 8", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeWidth: "1.5", d: "M1 1l6 6m0-6L1 7" }) })
            }
          )
        ] }) }, u)),
        /* @__PURE__ */ n("div", { className: "pt-1.5 pl-1 shrink", children: /* @__PURE__ */ n(
          "input",
          {
            ref: k,
            type: T,
            role: "combobox",
            "aria-controls": "options",
            "aria-expanded": "false",
            autoComplete: "off",
            spellCheck: "false",
            name: `${e}-txt`,
            id: `${e}-txt`,
            className: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
            style: { boxShadow: "none !important", width: `${V.length + 1}ch` },
            value: V,
            onChange: (u) => R(u.target.value),
            "aria-invalid": B != null,
            "aria-describedby": `${e}-error`,
            onKeyDown: Ae,
            onKeyPress: ke,
            onPaste: ce,
            onFocus: Z,
            onBlur: Ce,
            onClick: () => L(!0),
            ...P
          }
        ) })
      ] }) }),
      N && O.length > 0 && /* @__PURE__ */ n(
        "ul",
        {
          className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeyDown: Ae,
          id: `${e}-options`,
          role: "listbox",
          children: O.slice(0, v).map((u) => /* @__PURE__ */ n(
            "li",
            {
              className: `${u === x ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100"} relative cursor-default select-none py-2 pl-3 pr-9`,
              onMouseOver: () => b(u),
              onClick: () => _(u),
              role: "option",
              tabIndex: -1,
              children: /* @__PURE__ */ n("span", { className: "block truncate", children: u })
            },
            u
          ))
        }
      ),
      B && /* @__PURE__ */ n("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
    ] }),
    B ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: B }) : a ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: a }) : null
  ] });
}
const ml = kt(
  ({
    id: e,
    label: t,
    multiple: r = !1,
    options: s = [],
    viewCount: a = 100,
    pageSize: l = 8,
    value: i,
    onChange: o,
    match: c,
    status: m,
    help: h,
    placeholder: p,
    children: g,
    ...y
  }, A) => {
    const [v, M] = $(!1), [k, x] = $(""), [b, N] = $(null), [L, V] = $(a), [R, X] = $([]), D = Ge(null);
    Ct(A, () => ({
      toggle: te
    }));
    function U(F) {
      return Array.isArray(i) && i.indexOf(F) >= 0;
    }
    const w = f(() => t ?? ze(mt(e)), [t, e]), O = f(
      () => Tt.call({ responseStatus: m }, e),
      [m, e]
    ), T = f(() => [ft.base, O ? ft.invalid : ft.valid].join(" "), [O]), Q = f(() => k ? s.filter((_) => c(_, k)).slice(0, L) : s, [k, s, c, L]), I = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function B(F) {
      N(F), R.indexOf(F) > Math.floor(L * 0.9) && (V((ce) => ce + a), Me());
    }
    const W = [",", `
`, "	"];
    function Y(F) {
      const _ = F.clipboardData?.getData("Text");
      C(_);
    }
    function C(F) {
      if (!F) return;
      const _ = W.some((ce) => F.includes(ce));
      if (!r || !_) {
        const ce = s.filter((G) => c(G, F));
        ce.length == 1 && (be(ce[0]), M(!1), Pn());
      } else if (_) {
        const ce = new RegExp("\\r|\\n|\\t|,"), P = F.split(ce).filter((u) => u.trim()).map((u) => s.find((E) => c(E, u))).filter((u) => !!u);
        if (P.length > 0) {
          x(""), M(!1), N(null);
          let u = Array.from(i || []);
          P.forEach((E) => {
            U(E) ? u = u.filter((j) => j != E) : u.push(E);
          }), o?.(u), Pn();
        }
      }
    }
    function K(F) {
      I.indexOf(F.code) || ke();
    }
    function Z(F) {
      if (!(F.shiftKey || F.ctrlKey || F.altKey)) {
        if (!v) {
          F.code == "ArrowDown" && (M(!0), N(R[0]));
          return;
        }
        if (F.code == "Escape")
          v && (F.stopPropagation(), M(!1));
        else if (F.code == "Tab")
          M(!1);
        else if (F.code == "Home")
          N(R[0]), ve();
        else if (F.code == "End")
          N(R[R.length - 1]), ve();
        else if (F.code == "ArrowDown") {
          if (!b)
            N(R[0]);
          else {
            const _ = R.indexOf(b);
            N(_ + 1 < R.length ? R[_ + 1] : R[0]);
          }
          Ae();
        } else if (F.code == "ArrowUp") {
          if (!b)
            N(R[R.length - 1]);
          else {
            const _ = R.indexOf(b);
            N(_ - 1 >= 0 ? R[_ - 1] : R[R.length - 1]);
          }
          Ae();
        } else F.code == "Enter" && (b ? (be(b), r || (F.preventDefault(), Pn())) : M(!1));
      }
    }
    const Ce = { behavior: "smooth", block: "nearest", inline: "nearest" };
    function ve() {
      setTimeout(() => {
        let F = document.querySelector(`#${e}-autocomplete li.active`);
        F && F.scrollIntoView(Ce);
      }, 0);
    }
    function Ae() {
      setTimeout(() => {
        let F = document.querySelector(`#${e}-autocomplete li.active`);
        F && ("scrollIntoViewIfNeeded" in F ? F.scrollIntoViewIfNeeded(Ce) : F.scrollIntoView(Ce));
      }, 0);
    }
    function te(F) {
      M(F), F && (ke(), D.current?.focus());
    }
    function ke() {
      M(!0), Me();
    }
    function be(F) {
      if (x(""), M(!1), r) {
        let _ = Array.from(i || []);
        U(F) ? _ = _.filter((ce) => ce != F) : _.push(F), N(null), o?.(_);
      } else {
        let _ = F;
        i == F && (_ = null), o?.(_);
      }
    }
    function Me() {
      X(Q);
    }
    return me(() => {
      Me();
    }, [Q]), /* @__PURE__ */ d("div", { id: `${e}-autocomplete`, children: [
      w && /* @__PURE__ */ n("label", { htmlFor: `${e}-text`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: w }),
      /* @__PURE__ */ d("div", { className: "relative mt-1", children: [
        /* @__PURE__ */ n(
          "input",
          {
            ref: D,
            id: `${e}-text`,
            type: "text",
            role: "combobox",
            "aria-controls": "options",
            "aria-expanded": "false",
            autoComplete: "off",
            spellCheck: "false",
            value: k,
            onChange: (F) => x(F.target.value),
            className: T,
            placeholder: r || !i ? p : "",
            onFocus: ke,
            onKeyDown: Z,
            onKeyUp: K,
            onClick: ke,
            onPaste: Y,
            required: !1,
            ...y
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => te(!v),
            className: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
            tabIndex: -1,
            children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z", clipRule: "evenodd" }) })
          }
        ),
        v && /* @__PURE__ */ n(
          "ul",
          {
            className: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
            onKeyDown: Z,
            id: `${e}-options`,
            role: "listbox",
            children: R.map((F, _) => /* @__PURE__ */ d(
              "li",
              {
                className: `${F === b ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100"} relative cursor-default select-none py-2 pl-3 pr-9`,
                onMouseOver: () => B(F),
                onClick: () => be(F),
                role: "option",
                tabIndex: -1,
                children: [
                  g ? typeof g == "function" ? g(F) : g : typeof F == "string" ? F : F.value,
                  U(F) && /* @__PURE__ */ n("span", { className: `absolute inset-y-0 right-0 flex items-center pr-4 ${F === b ? "text-white" : "text-indigo-600"}`, children: /* @__PURE__ */ n("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z", clipRule: "evenodd" }) }) })
                ]
              },
              _
            ))
          }
        ),
        !v && !r && i && /* @__PURE__ */ n("div", { onKeyDown: Z, onClick: () => te(!v), className: "h-8 -mt-8 ml-3 pt-0.5", children: g ? typeof g == "function" ? g(i) : g : typeof i == "string" ? i : i.value }),
        O && /* @__PURE__ */ n("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", tabIndex: -1, children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
      ] }),
      O && /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: O }),
      !O && h && /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: h })
    ] });
  }
);
ml.displayName = "Autocomplete";
const hl = kt(
  ({ id: e, value: t, entries: r, values: s, options: a, multiple: l, onChange: i, ...o }, c) => {
    const m = Ge(null);
    Ct(c, () => ({
      toggle(x) {
        m.current?.toggle(x);
      }
    }));
    const h = f(
      () => l ?? Array.isArray(t),
      [l, t]
    );
    function p(x, b) {
      return !b || x.value.toLowerCase().includes(b.toLowerCase());
    }
    const g = f(() => r || (s ? s.map((x) => ({ key: x, value: x })) : a ? Object.keys(a).map((x) => ({ key: x, value: a[x] })) : []), [r, s, a]), [y, A] = $(h ? [] : null);
    function v() {
      let x = t && typeof t == "object" && !Array.isArray(t) ? t.key : t;
      x == null || x === "" ? A(h ? [] : null) : typeof x == "string" ? A(g.find((b) => b.key === x) || null) : Array.isArray(x) && A(g.filter((b) => x.includes(b.key)));
    }
    me(() => {
      v();
    }, [t, g]);
    const M = f(() => y == null ? "" : Array.isArray(y) ? y.map((x) => encodeURIComponent(x.key)).join(",") : y.key, [y]);
    function k(x) {
      i?.(x);
    }
    return /* @__PURE__ */ d(Dt, { children: [
      /* @__PURE__ */ n("input", { type: "hidden", id: e, name: e, value: M }),
      /* @__PURE__ */ n(
        ml,
        {
          ref: m,
          id: e,
          options: g,
          match: p,
          multiple: h,
          value: y,
          onChange: k,
          ...o
        }
      )
    ] });
  }
);
hl.displayName = "Combobox";
function Wo({
  id: e,
  label: t,
  labelClass: r,
  help: s,
  placeholder: a,
  value: l,
  values: i,
  files: o,
  multiple: c,
  status: m,
  inputClass: h,
  filterClass: p,
  className: g,
  ...y
}) {
  const A = Ge(null), { assetsPathResolver: v, fallbackPathResolver: M } = Kt(), [k, x] = $({}), [b, N] = $(), [L, V] = $(() => o && o.length > 0 ? o.map((C) => ({
    ...C,
    filePath: v(C.filePath)
  })) : i && i.length > 0 ? i.map((C) => {
    let K = C.replace(/\\/g, "/");
    return {
      fileName: ta(Ut(K, "/"), "."),
      filePath: v(K),
      contentType: Lr(K)
    };
  }) : []), R = f(() => t ?? ze(mt(e)), [t, e]), X = f(() => a ?? R, [a, R]), D = ct(Vt), U = f(
    () => Tt.call({ responseStatus: m ?? D?.error?.current }, e),
    [m, D, e]
  ), w = f(() => jt([
    "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
    U ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
    h
  ], "FileInput", p), [U, h, p]), O = (C) => {
    const K = C.target;
    N(""), V(Array.from(K.files || []).map((Z) => ({
      fileName: Z.name,
      filePath: Br(Z),
      contentLength: Z.size,
      contentType: Z.type || Lr(Z.name)
    })));
  }, T = () => A.current?.click(), Q = (C) => C == null ? !1 : C.startsWith("data:") || C.startsWith("blob:"), I = f(() => {
    if (L.length > 0)
      return L[0].filePath;
    let C = typeof l == "string" ? l : i && i[0];
    return C && Yt(v(C)) || null;
  }, [L, l, i, v]), B = (C) => !C || C.startsWith("data:") || C.endsWith(".svg") ? "" : "rounded-full object-cover";
  function W(C) {
    N(M(I));
  }
  function Y(C) {
    const K = Yt(C);
    x((Z) => ({
      ...Z,
      [K]: M(K)
    }));
  }
  return me(() => () => ca(), []), /* @__PURE__ */ d("div", { className: `flex ${c ? "flex-col" : "justify-between"}`, children: [
    /* @__PURE__ */ d("div", { className: "relative flex-grow mr-2 sm:mr-4", children: [
      R && /* @__PURE__ */ n("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${r ?? ""}`, children: R }),
      /* @__PURE__ */ d("div", { className: "block mt-2", children: [
        /* @__PURE__ */ n("span", { className: "sr-only", children: s ?? R }),
        /* @__PURE__ */ n(
          "input",
          {
            ref: A,
            type: "file",
            multiple: c,
            name: e,
            id: e,
            className: w,
            placeholder: X,
            "aria-invalid": U != null,
            "aria-describedby": `${e}-error`,
            onChange: O,
            ...y
          }
        ),
        U && /* @__PURE__ */ n("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) })
      ] }),
      U ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: U }) : s ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: s }) : null
    ] }),
    c ? /* @__PURE__ */ n("div", { className: "mt-3", children: /* @__PURE__ */ n("table", { className: "w-full", children: /* @__PURE__ */ n("tbody", { children: L.map((C, K) => /* @__PURE__ */ d("tr", { children: [
      /* @__PURE__ */ n("td", { className: "pr-6 align-bottom pb-2", children: /* @__PURE__ */ d("div", { className: "flex w-full", title: Q(C.filePath) ? "" : C.filePath, children: [
        /* @__PURE__ */ n(
          "img",
          {
            src: k[Yt(C.filePath)] || v(Yt(C.filePath)),
            className: `mr-2 h-8 w-8 ${B(C.filePath)}`,
            onError: () => Y(C.filePath),
            alt: ""
          }
        ),
        Q(C.filePath) ? /* @__PURE__ */ n("span", { className: "overflow-hidden", children: C.fileName }) : /* @__PURE__ */ n("a", { href: v(C.filePath || ""), target: "_blank", rel: "noreferrer", className: "overflow-hidden", children: C.fileName })
      ] }) }),
      /* @__PURE__ */ n("td", { className: "align-top pb-2 whitespace-nowrap", children: C.contentLength && C.contentLength > 0 && /* @__PURE__ */ n("span", { className: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black", children: Ur(C.contentLength) }) })
    ] }, K)) }) }) }) : /* @__PURE__ */ n("div", { children: I && /* @__PURE__ */ n("div", { className: "shrink-0 cursor-pointer", title: Q(I) ? "" : I, children: /* @__PURE__ */ n(
      "img",
      {
        onClick: T,
        className: `h-16 w-16 ${B(I)}`,
        alt: `Current ${R ?? ""}`,
        src: b || v(I),
        onError: W
      }
    ) }) })
  ] });
}
function Ko({
  id: e,
  label: t,
  placeholder: r,
  help: s,
  value: a,
  onChange: l,
  status: i,
  inputClass: o,
  labelClass: c,
  filterClass: m,
  className: h,
  ...p
}) {
  const g = f(() => t ?? ze(mt(e)), [t, e]), y = f(() => r ?? g, [r, g]), A = ct(Vt), v = f(
    () => Tt.call({ responseStatus: i ?? A?.error?.current }, e),
    [i, A, e]
  ), M = f(() => jt([
    "shadow-sm " + ft.base,
    v ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ft.valid,
    o
  ], "TextareaInput", m), [v, o, m]), k = (x) => {
    l?.(x.target.value);
  };
  return /* @__PURE__ */ d("div", { className: h, children: [
    g && /* @__PURE__ */ n("label", { htmlFor: e, className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ${c ?? ""}`, children: g }),
    /* @__PURE__ */ n("div", { className: "mt-1 relative", children: /* @__PURE__ */ n(
      "textarea",
      {
        name: e,
        id: e,
        className: M,
        placeholder: y,
        onChange: k,
        value: a ?? "",
        "aria-invalid": v != null,
        "aria-describedby": `${e}-error`,
        ...Nt(p, ["class"])
      }
    ) }),
    v ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: v }) : s ? /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: s }) : null
  ] });
}
const Zo = kt(({
  id: e,
  value: t,
  onChange: r,
  status: s,
  label: a,
  labelClass: l,
  help: i,
  rows: o,
  disabled: c,
  lang: m,
  hide: h,
  helpUrl: p = "https://guides.github.com/features/mastering-markdown/",
  inputClass: g,
  filterClass: y,
  onClose: A,
  headerSlot: v,
  toolbarbuttonsSlot: M,
  footerSlot: k
}, x) => {
  const b = Ge([]), N = Ge([]), L = Ge(null), V = ct(Vt), R = f(
    () => Tt.call({ responseStatus: s ?? V?.error?.current }, e),
    [s, V, e]
  ), X = f(() => a ?? ze(mt(e)), [a, e]), D = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), U = f(
    () => h ? Pt(D, h) : Pt(D, []),
    [h]
  );
  function w(u) {
    return U[u];
  }
  const O = f(() => jt([
    "shadow-sm font-mono" + ft.base.replace("rounded-md", ""),
    R ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ft.valid,
    g
  ], "MarkdownInput", y), [R, g, y]), T = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400";
  function Q(u) {
    r?.(u);
  }
  function I() {
    return L.current.selectionStart !== L.current.selectionEnd;
  }
  function B() {
    const u = L.current;
    return u.value.substring(u.selectionStart, u.selectionEnd) || "";
  }
  function W() {
    const u = L.current, E = u.value, j = u.selectionStart, ae = E.substring(j, u.selectionEnd) || "", re = E.substring(0, j), le = re.lastIndexOf(`
`);
    return {
      value: E,
      sel: ae,
      selPos: j,
      beforeSel: re,
      afterSel: E.substring(j),
      prevCRPos: le,
      beforeCR: le >= 0 ? re.substring(0, le + 1) : "",
      afterCR: le >= 0 ? re.substring(le + 1) : ""
    };
  }
  function Y({ value: u, selectionStart: E, selectionEnd: j }) {
    j == null && (j = E), Q(u), setTimeout(() => {
      L.current.focus(), L.current.setSelectionRange(E, j);
    }, 0);
  }
  function C(u, E, j = "", { selectionAtEnd: ae, offsetStart: re, offsetEnd: le, filterValue: $e, filterSelection: Ve } = {}) {
    const he = L.current;
    let ue = he.value, ne = he.selectionEnd;
    b.current.push({ value: ue, selectionStart: he.selectionStart, selectionEnd: he.selectionEnd }), N.current = [];
    const Te = he.selectionStart, Fe = he.selectionEnd;
    let Ee = ue.substring(0, Te), xe = ue.substring(Fe);
    const De = u && Ee.endsWith(u) && xe.startsWith(E);
    if (Te == Fe) {
      if (De ? (ue = Ee.substring(0, Ee.length - u.length) + xe.substring(E.length), ne += -E.length) : (ue = Ee + u + j + E + xe, ne += u.length, re = 0, le = j?.length || 0, ae && (ne += le, le = 0)), $e) {
        var Pe = { pos: ne };
        ue = $e(ue, Pe), ne = Pe.pos;
      }
    } else {
      var ge = ue.substring(Te, Fe);
      Ve && (ge = Ve(ge)), De ? (ue = Ee.substring(0, Ee.length - u.length) + ge + xe.substring(E.length), re = -ge.length - u.length, le = ge.length) : (ue = Ee + u + ge + E + xe, re ? ne += (u + E).length : (ne = Te, re = u.length, le = ge.length));
    }
    Q(ue), setTimeout(() => {
      he.focus(), re = ne + (re || 0), le = (re || 0) + (le || 0), he.setSelectionRange(re, le);
    }, 0);
  }
  const K = () => C("**", "**", "bold"), Z = () => C("_", "_", "italics"), Ce = () => C("~~", "~~", "strikethrough"), ve = () => C("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), Ae = () => C(`
> `, `
`, "Blockquote", {}), te = () => C("![](", ")");
  function ke(u) {
    const E = B();
    if (E && !u.shiftKey)
      C("`", "`", "code");
    else {
      const j = m || "js";
      E.indexOf(`
`) === -1 ? C("\n```" + j + `
`, "\n```\n", "// code") : C("```" + j + `
`, "```\n", "");
    }
  }
  function be() {
    if (I()) {
      let { sel: u, beforeSel: E, afterSel: j, prevCRPos: ae, beforeCR: re, afterCR: le } = W();
      if (u.indexOf(`
`) === -1)
        C(`
 1. `, `
`);
      else if (!u.startsWith(" 1. ")) {
        let he = 1;
        C("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (ue) => " 1. " + ue.replace(/\n$/, "").replace(/\n/g, (ne) => `
 ${++he}. `) + `
`
        });
      } else
        C("", "", "", {
          filterValue: (he, ue) => {
            if (ae >= 0) {
              let ne = le.replace(/^ - /, "");
              E = re + ne, ue.pos -= le.length - ne.length;
            }
            return E + j;
          },
          filterSelection: (he) => he.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
        });
    } else
      C(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
  }
  function Me() {
    if (I()) {
      let { sel: u, beforeSel: E, afterSel: j, prevCRPos: ae, beforeCR: re, afterCR: le } = W();
      u.indexOf(`
`) === -1 ? C(`
 - `, `
`) : !u.startsWith(" - ") ? C("", "", " - ", {
        selectionAtEnd: !0,
        filterSelection: (he) => " - " + he.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
      }) : C("", "", "", {
        filterValue: (he, ue) => {
          if (ae >= 0) {
            let ne = le.replace(/^ - /, "");
            E = re + ne, ue.pos -= le.length - ne.length;
          }
          return E + j;
        },
        filterSelection: (he) => he.replace(/^ - /g, "").replace(/\n - /g, `
`)
      });
    } else
      C(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
  }
  function F() {
    const u = B(), E = u.indexOf(`
`) === -1;
    u ? E ? C(`
## `, `
`, "") : C("## ", "", "") : C(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
  }
  function _() {
    let { sel: u, selPos: E, beforeSel: j, afterSel: ae, prevCRPos: re, beforeCR: le, afterCR: $e } = W();
    !u.startsWith("//") && !$e.startsWith("//") ? u ? C("", "", "//", {
      selectionAtEnd: !0,
      filterSelection: (he) => "//" + he.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
    }) : Y({
      value: le + "//" + $e + ae,
      selectionStart: E + 2
    }) : C("", "", "", {
      filterValue: (he, ue) => {
        if (re >= 0) {
          let ne = $e.replace(/^\/\//, "");
          j = le + ne, ue.pos -= $e.length - ne.length;
        }
        return j + ae;
      },
      filterSelection: (he) => he.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
    });
  }
  const ce = () => C(`/*
`, `*/
`, "");
  function G() {
    if (b.current.length === 0) return !1;
    const u = L.current, E = b.current.pop();
    return N.current.push({ value: u.value, selectionStart: u.selectionStart, selectionEnd: u.selectionEnd }), Y(E), !0;
  }
  function P() {
    if (N.current.length === 0) return !1;
    const u = L.current, E = N.current.pop();
    return b.current.push({ value: u.value, selectionStart: u.selectionStart, selectionEnd: u.selectionEnd }), Y(E), !0;
  }
  return Ct(x, () => ({
    props: { id: e, value: t, "onUpdate:modelValue": r, status: s, label: a, labelClass: l, help: i, rows: o, disabled: c, lang: m, hide: h, helpUrl: p, inputClass: g, filterClass: y, onClose: A },
    textarea: L,
    updateModelValue: Q,
    selection: B,
    hasSelection: I,
    selectionInfo: W,
    insert: C,
    replace: Y
  })), me(() => {
    b.current = [], N.current = [];
    const u = L.current, E = (j) => {
      if (j.key === "Escape" || j.keyCode === 27) {
        A?.();
        return;
      }
      const ae = String.fromCharCode(j.keyCode).toLowerCase();
      ae === "	" ? (!j.shiftKey ? C("", "", "    ", {
        selectionAtEnd: !0,
        filterSelection: (le) => "    " + le.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
      }) : C("", "", "", {
        filterValue: (le, $e) => {
          let { beforeSel: Ve, afterSel: he, prevCRPos: ue, beforeCR: ne, afterCR: Te } = W();
          if (ue >= 0) {
            let Fe = Te.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
            Ve = ne + Fe, $e.pos -= Te.length - Fe.length;
          }
          return Ve + he;
        },
        filterSelection: (le) => le.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
      }), j.preventDefault()) : j.ctrlKey ? ae === "z" ? j.shiftKey ? P() && j.preventDefault() : G() && j.preventDefault() : ae === "b" && !j.shiftKey ? (K(), j.preventDefault()) : ae === "h" && !j.shiftKey ? (F(), j.preventDefault()) : ae === "i" && !j.shiftKey ? (Z(), j.preventDefault()) : ae === "q" && !j.shiftKey ? (Ae(), j.preventDefault()) : ae === "k" ? j.shiftKey ? (te(), j.preventDefault()) : (ve(), j.preventDefault()) : ae === "," || j.key === "<" || j.key === ">" || j.keyCode === 188 ? (ke(j), j.preventDefault()) : ae === "/" || j.key === "/" ? (_(), j.preventDefault()) : (ae === "?" || j.key === "?") && j.shiftKey && (ce(), j.preventDefault()) : j.altKey && (j.key === "1" || j.key === "0" ? (be(), j.preventDefault()) : j.key === "-" ? (Me(), j.preventDefault()) : j.key === "s" && (Ce(), j.preventDefault()));
    };
    return u.onkeydown = E, () => {
      u.onkeydown = null;
    };
  }, [t]), /* @__PURE__ */ d("div", { children: [
    v,
    X && /* @__PURE__ */ n("label", { htmlFor: e, className: `mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${l ?? ""}`, children: X }),
    !c && /* @__PURE__ */ d("div", { className: "border border-gray-200 flex justify-between shadow-sm", children: [
      /* @__PURE__ */ d("div", { className: "p-2 flex flex-wrap gap-x-4", children: [
        w("bold") && /* @__PURE__ */ d("svg", { className: T, onClick: K, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Bold text (CTRL+B)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" })
        ] }),
        w("italics") && /* @__PURE__ */ d("svg", { className: T, onClick: Z, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Italics (CTRL+I)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" })
        ] }),
        w("link") && /* @__PURE__ */ d("svg", { className: T, onClick: ve, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Insert Link (CTRL+K)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z" })
        ] }),
        w("blockquote") && /* @__PURE__ */ d("svg", { className: T, onClick: Ae, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Blockquote (CTRL+Q)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z" })
        ] }),
        w("image") && /* @__PURE__ */ d("svg", { className: T, onClick: te, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Insert Image (CTRL+SHIFT+L)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z" })
        ] }),
        w("code") && /* @__PURE__ */ d("svg", { className: T, onClick: ke, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Insert Code (CTRL+<)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z" })
        ] }),
        w("heading") && /* @__PURE__ */ d("svg", { className: T, onClick: F, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "H2 Heading (CTRL+H)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z" })
        ] }),
        w("orderedList") && /* @__PURE__ */ d("svg", { className: T, onClick: be, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Numbered List (ALT+1)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z" })
        ] }),
        w("unorderedList") && /* @__PURE__ */ d("svg", { className: T, onClick: Me, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Bulleted List (ALT+-)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z" })
        ] }),
        w("strikethrough") && /* @__PURE__ */ d("svg", { className: T, onClick: Ce, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Strike Through (ALT+S)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" })
        ] }),
        w("undo") && /* @__PURE__ */ d("svg", { className: T, onClick: G, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Undo (CTRL+Z)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" })
        ] }),
        w("redo") && /* @__PURE__ */ d("svg", { className: T, onClick: P, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ n("title", { children: "Redo (CTRL+SHIFT+Z)" }),
          /* @__PURE__ */ n("path", { fill: "currentColor", d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" })
        ] }),
        M
      ] }),
      w("help") && p && /* @__PURE__ */ n("div", { className: "p-2 flex flex-wrap gap-x-4", children: /* @__PURE__ */ n("a", { title: "formatting help", target: "_blank", href: p, tabIndex: -1, children: /* @__PURE__ */ n("svg", { className: T, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { fill: "currentColor", d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z" }) }) }) })
    ] }),
    /* @__PURE__ */ n("div", { className: "", children: /* @__PURE__ */ n(
      "textarea",
      {
        ref: L,
        name: e,
        id: e,
        className: O,
        value: t,
        rows: o || 6,
        disabled: c,
        onChange: (u) => Q(u.target.value),
        onKeyDown: (u) => {
          u.key;
        }
      }
    ) }),
    R && /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-red-500", id: `${e}-error`, children: R }),
    !R && i && /* @__PURE__ */ n("p", { className: "mt-2 text-sm text-gray-500", id: `${e}-description`, children: i }),
    k
  ] });
});
function Go({
  input: e,
  value: t,
  onChange: r,
  api: s
}) {
  const a = f(() => e.type || "text", [e.type]), l = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), i = f(() => Nt(e, l), [e]), [o, c] = $(
    a === "file" ? null : t[e.id]
  );
  me(() => {
    t[e.id] = o, r?.(t);
  }, [o]);
  const m = f(() => {
    const p = t[e.id];
    if (e.type !== "file" || !p) return [];
    if (typeof p == "string") return [{ filePath: p, fileName: Ut(p, "/") }];
    if (!Array.isArray(p) && typeof p == "object") return p;
    if (Array.isArray(p)) {
      const g = [];
      return p.forEach((y) => {
        typeof y == "string" ? g.push({ filePath: y, fileName: Ut(y, "/") }) : typeof y == "object" && g.push(y);
      }), g;
    }
    return [];
  }, [t, e.id, e.type]), h = z.component(a);
  return h ? /* @__PURE__ */ n(
    h,
    {
      id: e.id,
      value: o,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...i
    }
  ) : a === "select" ? /* @__PURE__ */ n(
    ol,
    {
      id: e.id,
      value: o,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      entries: e.allowableEntries,
      values: e.allowableValues,
      ...i
    }
  ) : a === "checkbox" ? /* @__PURE__ */ n(
    _o,
    {
      id: e.id,
      value: o,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...i
    }
  ) : a === "tag" ? /* @__PURE__ */ n(
    Qo,
    {
      id: e.id,
      value: o,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      allowableValues: e.allowableValues,
      string: e.prop?.type == "String",
      ...i
    }
  ) : a === "combobox" ? /* @__PURE__ */ n(
    hl,
    {
      id: e.id,
      value: o,
      onChange: c,
      entries: e.allowableEntries,
      values: e.allowableValues,
      ...i
    }
  ) : a === "file" ? /* @__PURE__ */ n(
    Wo,
    {
      id: e.id,
      status: s?.error,
      value: o,
      onChange: c,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      files: m,
      ...i
    }
  ) : a === "textarea" ? /* @__PURE__ */ n(
    Ko,
    {
      id: e.id,
      value: o,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...i
    }
  ) : a === "MarkdownInput" ? /* @__PURE__ */ n(
    Zo,
    {
      id: e.id,
      value: o,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...i
    }
  ) : /* @__PURE__ */ n(
    is,
    {
      type: a,
      id: e.id,
      value: o,
      onChange: c,
      status: s?.error,
      inputClass: e.css?.input,
      labelClass: e.css?.label,
      ...i
    }
  );
}
const St = kt(({
  value: e,
  onChange: t,
  type: r,
  metaType: s,
  formLayout: a,
  api: l,
  hideSummary: i,
  configureField: o,
  configureFormLayout: c,
  flexClass: m = "flex flex-1 flex-col justify-between",
  divideClass: h = "divide-y divide-gray-200 px-4 sm:px-6",
  spaceClass: p = "space-y-6 pt-6 pb-5",
  fieldsetClass: g = "grid grid-cols-12 gap-6"
}, y) => {
  const [, A] = $(0);
  function v() {
    A((T) => T + 1);
  }
  function M(T, Q) {
    k(T.id, Ne(Q, T.id));
  }
  function k(T, Q) {
    e[T] = Q, t?.(e), v();
  }
  Ct(y, () => ({
    forceUpdate: v,
    props: { value: e, onChange: t, type: r, metaType: s, formLayout: a, api: l, hideSummary: i, configureField: o, configureFormLayout: c, flexClass: m, divideClass: h, spaceClass: p, fieldsetClass: g },
    updateValue: k
  }));
  const { metadataApi: x, apiOf: b, typeOf: N, typeOfRef: L, createFormLayout: V } = dt(), R = f(() => r || It(e), [r, e]), X = f(() => s ?? N(R), [s, R]), D = f(
    () => L(x?.operations.find((T) => T.request.name == R)?.dataModel) || X,
    [x, R, X]
  );
  function U() {
    const T = X;
    if (!T) {
      if (a) {
        const C = a.map((K) => {
          const Z = { name: K.id, type: mi(K.type) }, Ce = Object.assign({ prop: Z }, K);
          return o && o(Ce), Ce;
        });
        return c && c(C), C;
      }
      throw new Error(`MetadataType for ${R} not found`);
    }
    const Q = ot(T), I = D, B = a ? Array.from(a) : V(T), W = [], Y = b(T.name);
    return B.forEach((C) => {
      const K = Q.find((ve) => ve.name == C.name);
      if (C.ignore) return;
      const Z = I?.properties?.find((ve) => ve.name.toLowerCase() == C.name?.toLowerCase()) ?? K, Ce = Object.assign({ prop: Z, op: Y }, C);
      o && o(Ce), W.push(Ce);
    }), c && c(W), W;
  }
  const w = f(() => U(), [X, a, o, c]), O = () => w.filter((T) => T.type != "hidden").map((T) => T.id);
  return /* @__PURE__ */ d(Dt, { children: [
    !i && /* @__PURE__ */ n(ir, { status: l?.error, except: O() }),
    /* @__PURE__ */ n("div", { className: m, children: /* @__PURE__ */ n("div", { className: h, children: /* @__PURE__ */ n("div", { className: p, children: /* @__PURE__ */ n("fieldset", { className: g, children: w.map((T) => /* @__PURE__ */ n(
      "div",
      {
        className: `w-full ${T.css?.field ?? (T.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (T.type == "checkbox" ? " flex items-center" : ""))} ${T.type == "hidden" ? "hidden" : ""}`,
        children: T.type === "lookup" || T.prop?.ref != null && T.type != "file" && !T.prop.isPrimaryKey ? /* @__PURE__ */ n(
          qo,
          {
            metadataType: D,
            input: T,
            value: e,
            onChange: (Q) => M(T, Q),
            status: l?.error
          }
        ) : /* @__PURE__ */ n(
          Go,
          {
            input: T,
            value: e,
            onChange: t,
            api: l
          }
        )
      },
      T.id
    )) }) }) }) })
  ] });
});
St.displayName = "AutoFormFields";
function _t({ icon: e = !0, text: t = "loading..." }) {
  return /* @__PURE__ */ d("div", { className: "flex", title: "loading...", children: [
    e && /* @__PURE__ */ d("svg", { xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "24px", height: "30px", viewBox: "0 0 24 30", children: [
      /* @__PURE__ */ d("rect", { x: "0", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
        /* @__PURE__ */ n("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0s", dur: "0.6s", repeatCount: "indefinite" }),
        /* @__PURE__ */ n("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0s", dur: "0.6s", repeatCount: "indefinite" }),
        /* @__PURE__ */ n("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0s", dur: "0.6s", repeatCount: "indefinite" })
      ] }),
      /* @__PURE__ */ d("rect", { x: "8", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
        /* @__PURE__ */ n("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" }),
        /* @__PURE__ */ n("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" }),
        /* @__PURE__ */ n("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0.15s", dur: "0.6s", repeatCount: "indefinite" })
      ] }),
      /* @__PURE__ */ d("rect", { x: "16", y: "10", width: "4", height: "10", fill: "#333", opacity: "0.2", children: [
        /* @__PURE__ */ n("animate", { attributeName: "opacity", attributeType: "XML", values: "0.2; 1; .2", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" }),
        /* @__PURE__ */ n("animate", { attributeName: "height", attributeType: "XML", values: "10; 20; 10", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" }),
        /* @__PURE__ */ n("animate", { attributeName: "y", attributeType: "XML", values: "10; 5; 10", begin: "0.3s", dur: "0.6s", repeatCount: "indefinite" })
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: "ml-2 mt-1 text-gray-400", children: t })
  ] });
}
const Zs = Wt(null), gl = kt(({
  formStyle: e = "slideOver",
  autosave: t = !0,
  showLoading: r = !0,
  showCancel: s = !0,
  type: a,
  panelClass: l,
  formClass: i,
  headingClass: o,
  subHeadingClass: c,
  buttonsClass: m,
  heading: h,
  subHeading: p,
  configureField: g,
  configureFormLayout: y,
  onSave: A,
  onError: v,
  onDone: M,
  headingSlot: k,
  subheadingSlot: x,
  headerSlot: b,
  footerSlot: N
}, L) => {
  const V = Ge(), [R, X] = $(1);
  function D() {
    X((xe) => xe + 1), V.current?.forceUpdate();
  }
  const { typeOf: U, typeProperties: w, Crud: O, createDto: T, formValues: Q } = dt(), I = f(() => It(a), [a]), B = f(() => U(I), [I]), W = () => typeof a == "string" ? T(a) : a ? new a() : null, [Y, C] = $(W());
  function K(xe) {
    C((De) => ({ ...De, ...xe })), D();
  }
  Ct(L, () => ({
    forceUpdate: D,
    props: { formStyle: e, autosave: t, showLoading: r, showCancel: s, type: a, panelClass: l, formClass: i, headingClass: o, subHeadingClass: c, buttonsClass: m, heading: h, subHeading: p, configureField: g, configureFormLayout: y, onSave: A, onError: v, onDone: M },
    setModel: K,
    formFields: V,
    model: Y
  }));
  const [Z, Ce] = $(), [ve, Ae] = $();
  function te(xe, De) {
    Ce(xe), Ae(() => De);
  }
  async function ke(xe) {
    ve && ve(xe), Ce(void 0), Ae(void 0);
  }
  const be = {
    openModal: te
  }, Me = f(() => l || Ue.panelClass(e), [l, e]), F = f(() => i || Ue.formClass(e), [i, e]), _ = f(() => o || Ue.headingClass(e), [o, e]), ce = f(() => c || Ue.subHeadingClass(e), [c, e]), G = f(() => m || Ue.buttonsClass, [m]), P = f(() => O.model(B), [B]), u = f(
    () => h || U(I)?.description || (P ? `New ${ze(P)}` : ze(I)),
    [h, I, P]
  ), [E, j] = $(new Ye()), ae = Zt(), re = f(() => ae.loading.current, [ae.loading.current]);
  me(() => {
    z.interceptors.has("AutoCreateForm.new") && z.interceptors.invoke("AutoCreateForm.new", { props: { formStyle: e, autosave: t, showLoading: r, showCancel: s, type: a, panelClass: l, formClass: i, headingClass: o, subHeadingClass: c, buttonsClass: m, heading: h, subHeading: p, configureField: g, configureFormLayout: y, onSave: A, onError: v, onDone: M }, model: Y });
  }, []);
  async function le(xe) {
    xe.preventDefault();
    let De = xe.target;
    if (!t) {
      A?.(new Y.constructor(Q(De, w(B))));
      return;
    }
    let et = Ze(Y?.getMethod, (He) => typeof He == "function" ? He() : null) || "POST", Pe = Ze(Y?.createResponse, (He) => typeof He == "function" ? He() : null) == null, ge;
    if (Vr.hasRequestBody(et)) {
      let He = new Y.constructor(), qe = new FormData(De);
      Pe ? ge = await ae.apiFormVoid(He, qe, { jsconfig: "eccn" }) : ge = await ae.apiForm(He, qe, { jsconfig: "eccn" });
    } else {
      let He = Q(De, w(B)), qe = new Y.constructor(He);
      Pe ? ge = await ae.apiVoid(qe, { jsconfig: "eccn" }) : ge = await ae.api(qe, { jsconfig: "eccn" });
    }
    j(ge), ge.succeeded ? (De.reset(), A?.(ge.response)) : v?.(ge.error);
  }
  function $e(xe) {
  }
  function Ve() {
    M?.();
  }
  const [he, ue] = $(!1), [ne, Te] = $(""), Fe = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  me(() => {
    if (Ot(Fe, Te, he), !he) {
      const xe = setTimeout(Ve, 700);
      return () => clearTimeout(xe);
    }
  }, [he]), me(() => {
    ue(!0);
  }, []);
  function Ee() {
    e == "slideOver" ? ue(!1) : Ve();
  }
  return me(() => {
    const xe = (De) => {
      De.key === "Escape" && Ee();
    };
    return window.addEventListener("keydown", xe), () => window.removeEventListener("keydown", xe);
  }, []), B ? e == "card" ? /* @__PURE__ */ d(Zs.Provider, { value: be, children: [
    /* @__PURE__ */ n("div", { className: Me, children: /* @__PURE__ */ d("form", { onSubmit: le, children: [
      /* @__PURE__ */ d("div", { className: F, children: [
        /* @__PURE__ */ d("div", { children: [
          k || /* @__PURE__ */ n("h3", { className: _, children: u }),
          x || p && /* @__PURE__ */ n("p", { className: ce, children: p }),
          !x && !p && B?.notes && /* @__PURE__ */ n("p", { className: `notes ${ce}`, dangerouslySetInnerHTML: { __html: B.notes } })
        ] }),
        b,
        /* @__PURE__ */ n(
          St,
          {
            ref: V,
            value: Y,
            onChange: $e,
            api: E,
            configureField: g,
            configureFormLayout: y
          },
          R
        ),
        N
      ] }),
      /* @__PURE__ */ d("div", { className: G, children: [
        /* @__PURE__ */ n("div", { children: r && re && /* @__PURE__ */ n(_t, {}) }),
        /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
          s && /* @__PURE__ */ n(Rt, { onClick: Ee, disabled: re, children: "Cancel" }),
          /* @__PURE__ */ n(Mt, { type: "submit", className: "ml-4", disabled: re, children: "Save" })
        ] })
      ] })
    ] }) }),
    Z?.name == "ModalLookup" && Z.ref && /* @__PURE__ */ n(Qt, { refInfo: Z.ref, onDone: ke, configureField: g })
  ] }) : /* @__PURE__ */ d(Zs.Provider, { value: be, children: [
    /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ n("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ n("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: Ee, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: (xe) => xe.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ n("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${ne}`, children: /* @__PURE__ */ d("form", { className: F, onSubmit: le, children: [
        /* @__PURE__ */ n("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
          /* @__PURE__ */ n("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
            /* @__PURE__ */ d("div", { className: "space-y-1", children: [
              k || /* @__PURE__ */ n("h3", { className: _, children: u }),
              x || p && /* @__PURE__ */ n("p", { className: ce, children: p }),
              !x && !p && B?.notes && /* @__PURE__ */ n("p", { className: `notes ${ce}`, dangerouslySetInnerHTML: { __html: B.notes } })
            ] }),
            /* @__PURE__ */ n("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ n(Tn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: Ee }) })
          ] }) }),
          b,
          /* @__PURE__ */ n(
            St,
            {
              ref: V,
              value: Y,
              onChange: $e,
              api: E,
              configureField: g,
              configureFormLayout: y
            },
            R
          ),
          N
        ] }) }),
        /* @__PURE__ */ d("div", { className: G, children: [
          /* @__PURE__ */ n("div", { children: r && re && /* @__PURE__ */ n(_t, {}) }),
          /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
            s && /* @__PURE__ */ n(Rt, { onClick: Ee, disabled: re, children: "Cancel" }),
            /* @__PURE__ */ n(Mt, { type: "submit", className: "ml-4", disabled: re, children: "Save" })
          ] })
        ] })
      ] }) }) }) }) })
    ] }),
    Z?.name == "ModalLookup" && Z.ref && /* @__PURE__ */ n(Qt, { refInfo: Z.ref, onDone: ke, configureField: g })
  ] }) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
    "Could not create form for unknown ",
    /* @__PURE__ */ n("b", { children: "type" }),
    " ",
    I
  ] }) });
});
Wt(null);
const br = (e) => typeof e == "string" ? e.split(",") : e || [];
function Qt({
  id: e = "ModalLookup",
  refInfo: t,
  skip: r = 0,
  prefs: s,
  selectedColumns: a,
  allowFiltering: l = !0,
  showPreferences: i = !0,
  showPagingNav: o = !0,
  showPagingInfo: c = !0,
  showResetPreferences: m = !0,
  showFiltersView: h = !0,
  toolbarButtonClass: p,
  canFilter: g,
  modelTitle: y,
  newButtonLabel: A,
  configureField: v,
  onDone: M
}) {
  const { config: k } = Kt(), { metadataApi: x, filterDefinitions: b } = dt(), N = Zt(), L = k.storage, V = f(() => p ?? de.toolbarButtonClass, [p]), R = f(() => b, [b]), X = 25, [D, U] = $({ take: X }), [w, O] = $(new Ye()), [T, Q] = $(r), [I, B] = $(!1), [W, Y] = $(), [C, K] = $(!1), [Z, Ce] = $(), [ve, Ae] = $(!1), [te, ke] = $([]), be = Ge(null);
  function Me(q, ee) {
    return de.getTableRowClass("fullWidth", ee, !1, !0);
  }
  function F() {
    let q = br(a);
    return q.length > 0 ? q : [];
  }
  const _ = f(() => ht(t.model), [t.model]), ce = f(() => {
    let ee = F().map((ye) => ye.toLowerCase());
    const we = ot(_);
    return ee.length > 0 ? ee.map((ye) => we.find((_e) => _e.name.toLowerCase() === ye)).filter((ye) => ye != null) : we;
  }, [_, a]), G = f(() => {
    let q = ce.map((we) => we.name), ee = br(D.selectedColumns).map((we) => we.toLowerCase());
    return ee.length > 0 ? q.filter((we) => ee.includes(we.toLowerCase())) : q;
  }, [ce, D.selectedColumns]), P = f(() => D.take ?? X, [D.take]), u = f(() => (w.response ? Ne(w.response, "results") : null) ?? [], [w.response]), E = f(() => w.response?.total ?? u.length ?? 0, [w.response, u]), j = f(() => T > 0, [T]), ae = f(() => T > 0, [T]), re = f(() => u.length >= P, [u.length, P]), le = f(() => u.length >= P, [u.length, P]), $e = f(() => te.some((q) => q.settings.filters.length > 0 || !!q.settings.sort), [te]), Ve = f(() => te.map((q) => q.settings.filters.length).reduce((q, ee) => q + ee, 0), [te]), he = f(() => on(_), [_]), ue = f(
    () => x?.operations.find((q) => q.dataModel?.name == t.model && Ke.isAnyQuery(q)),
    [x, t.model]
  ), ne = f(() => It(t.model), [t.model]), Te = f(() => Ht.forType(ne, x), [ne, x]), Fe = f(() => ne || ue?.dataModel.name, [ne, ue]), Ee = f(() => y || Fe, [y, Fe]), xe = f(() => A || `New ${Ee}`, [A, Ee]), De = f(() => Qn(Te.Create), [Te.Create]), et = () => `${e}/ApiPrefs/${t.model}`, Pe = (q) => `Column/${e}:${t.model}.${q}`;
  async function ge(q) {
    let ee = T + q;
    ee < 0 && (ee = 0);
    const we = Math.floor(E / P) * P;
    ee > we && (ee = we), Q(ee), await We();
  }
  async function He(q, ee) {
    M?.(q);
  }
  function qe() {
    M?.(null);
  }
  function gt(q, ee) {
    let we = ee.target;
    if (we?.tagName !== "TD") {
      let ye = we?.closest("TABLE")?.getBoundingClientRect(), _e = te.find((pt) => pt.name.toLowerCase() == q.toLowerCase());
      if (_e && ye) {
        let pt = 318, lt = (ee.target?.tagName === "DIV" ? ee.target : ee.target?.closest("DIV")).getBoundingClientRect(), Xe = pt + 25;
        Ce({
          column: _e,
          topLeft: {
            x: Math.max(Math.floor(lt.x + 25), Xe),
            y: Math.floor(115)
          }
        });
      }
    }
  }
  function at() {
    Ce(null);
  }
  async function pe(q) {
    let ee = Z?.column;
    ee && (ee.settings = q, L.setItem(Pe(ee.name), JSON.stringify(ee.settings)), await We()), Ce(null);
  }
  async function se(q) {
    L.setItem(Pe(q.name), JSON.stringify(q.settings)), await We();
  }
  async function Oe(q) {
    K(!1), U(q), L.setItem(et(), JSON.stringify(q)), await We();
  }
  async function We() {
    await je(Le());
  }
  async function je(q) {
    const ee = ue;
    if (!ee) {
      console.error(`No Query API was found for ${t.model}`);
      return;
    }
    let we = wn(ee, q), ye = sa((pt) => {
      O(new Ye()), B(pt);
    }), _e = await N.api(we);
    ye(), O(_e);
  }
  function Le() {
    let q = {
      include: "total",
      take: P
    }, ee = br(D.selectedColumns || a);
    if (ee.length > 0) {
      let ye = he;
      ye && ee.includes(ye.name) && (ee = [ye.name, ...ee]), q.fields = ee.join(",");
    }
    let we = [];
    return te.forEach((ye) => {
      ye.settings.sort && we.push((ye.settings.sort === "DESC" ? "-" : "") + ye.name), ye.settings.filters.forEach((_e) => {
        let pt = _e.key.replace("%", ye.name);
        q[pt] = _e.value;
      });
    }), typeof q.skip > "u" && T > 0 && (q.skip = T), we.length > 0 && (q.orderBy = we.join(",")), q;
  }
  async function Se() {
    te.forEach((q) => {
      q.settings = { filters: [] }, L.removeItem(Pe(q.name));
    }), await We();
  }
  function Ie() {
    Ae(!0);
  }
  function rt() {
    Ae(!1);
  }
  async function st(q) {
    rt(), M?.(q);
  }
  return me(() => {
    const q = s || _n(L.getItem(et()));
    q && U(q);
    const ee = ce.map((we) => ({
      name: we.name,
      type: we.type,
      meta: we,
      settings: Object.assign(
        {
          filters: []
        },
        _n(L.getItem(Pe(we.name)))
      )
    }));
    ke(ee), isNaN(r) || Q(r), We();
  }, []), /* @__PURE__ */ d(vl, { id: e, onDone: qe, children: [
    /* @__PURE__ */ d("div", { className: "pt-2 overflow-auto", style: { minHeight: "620px" }, children: [
      /* @__PURE__ */ d("div", { className: "mt-3 pl-5 flex flex-wrap items-center", children: [
        /* @__PURE__ */ d("h3", { className: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3", children: [
          "Select ",
          /* @__PURE__ */ n("span", { className: "hidden md:inline", children: ze(t.model) })
        ] }),
        /* @__PURE__ */ d("div", { className: "flex pb-1 sm:pb-0", children: [
          i && /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
              title: `${t.model} Preferences`,
              onClick: () => K(!C),
              children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("g", { strokeWidth: "1.5", fill: "none", children: /* @__PURE__ */ n("path", { d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18", stroke: "currentColor" }) }) })
            }
          ),
          o && /* @__PURE__ */ d(Dt, { children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${j ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "First page",
                disabled: !j,
                onClick: () => ge(-E),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${ae ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Previous page",
                disabled: !ae,
                onClick: () => ge(-P),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${re ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Next page",
                disabled: !re,
                onClick: () => ge(P),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${le ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Last page",
                disabled: !le,
                onClick: () => ge(E),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z", fill: "currentColor" }) })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "flex pb-1 sm:pb-0", children: c && /* @__PURE__ */ d("div", { className: "px-4 text-lg text-black dark:text-white", children: [
          I && /* @__PURE__ */ n("span", { children: "Querying..." }),
          u.length > 0 && /* @__PURE__ */ d("span", { children: [
            /* @__PURE__ */ n("span", { className: "hidden xl:inline", children: "Showing Results " }),
            T + 1,
            " - ",
            Math.min(T + u.length, E),
            " ",
            /* @__PURE__ */ d("span", { children: [
              " of ",
              E
            ] })
          ] }),
          !I && w.completed && u.length === 0 && /* @__PURE__ */ n("span", { children: "No Results" })
        ] }) }),
        Te.Create && De && /* @__PURE__ */ d("div", { className: "pl-2 mt-1", children: [
          /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: Ie,
              title: Ee,
              className: V,
              children: [
                /* @__PURE__ */ n("svg", { className: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", fill: "currentColor" }) }),
                /* @__PURE__ */ n("span", { className: "whitespace-nowrap", children: xe })
              ]
            }
          ),
          ve && /* @__PURE__ */ n(
            gl,
            {
              ref: be,
              type: Te.Create.request.name,
              configureField: v,
              onDone: rt,
              onSave: st
            }
          )
        ] }),
        $e && m && /* @__PURE__ */ n("div", { className: "pl-2", children: /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: Se,
            title: "Reset Preferences & Filters",
            className: V,
            children: /* @__PURE__ */ n("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { fill: "currentColor", d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" }) })
          }
        ) }),
        /* @__PURE__ */ n("div", { className: "flex pb-1 sm:pb-0", children: h && Ve > 0 && /* @__PURE__ */ n("div", { className: "pl-2", children: /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: () => Y(W == "filters" ? null : "filters"),
            className: V,
            "aria-expanded": "false",
            children: [
              /* @__PURE__ */ n("svg", { className: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ d("span", { className: "mr-1", children: [
                Ve,
                " ",
                Ve == 1 ? "Filter" : "Filters"
              ] }),
              W != "filters" ? /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) }) : /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" }) })
            ]
          }
        ) }) })
      ] }),
      W == "filters" && /* @__PURE__ */ n(
        dl,
        {
          className: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: R,
          columns: te,
          onDone: () => Y(null),
          onChange: se
        }
      ),
      Z && /* @__PURE__ */ n(
        cl,
        {
          definitions: R,
          column: Z.column,
          topLeft: Z.topLeft,
          onDone: at,
          onSave: pe
        }
      ),
      /* @__PURE__ */ n(ir, { status: w.error }),
      I ? /* @__PURE__ */ n(Ka, {}) : /* @__PURE__ */ n("div", { children: u.length > 0 && /* @__PURE__ */ n(
        fl,
        {
          id: e,
          items: u,
          type: t.model,
          selectedColumns: G,
          tableStyle: "fullWidth",
          rowClass: Me,
          onRowSelected: He,
          onHeaderSelected: gt,
          children: (q, ee) => l && (!g || g(q)) ? /* @__PURE__ */ d("div", { className: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50", children: [
            /* @__PURE__ */ n("span", { className: "mr-1 select-none", children: ee }),
            /* @__PURE__ */ n(
              ul,
              {
                column: te.find((we) => we.name.toLowerCase() === q.toLowerCase()),
                isOpen: Z?.column.name === q
              }
            )
          ] }) : /* @__PURE__ */ n("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ n("span", { className: "mr-1 select-none", children: ee }) })
        }
      ) })
    ] }),
    C && /* @__PURE__ */ n(
      yl,
      {
        columns: ce,
        prefs: D,
        onDone: () => K(!1),
        onSave: Oe
      }
    )
  ] });
}
const pl = Wt(null);
function vl({
  id: e = "ModalDialog",
  modalClass: t = $r.modalClass,
  sizeClass: r = $r.sizeClass,
  closeButtonClass: s = "bg-white dark:bg-black cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
  configureField: a,
  children: l,
  closeButton: i,
  bottom: o,
  onDone: c
}) {
  const [m, h] = $(!1), [p, g] = $(""), [y, A] = $(""), [v, M] = $(), [k, x] = $(), b = {
    entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
    leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
  }, N = {
    entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
    leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
  };
  me(() => {
    h(!0);
  }, []), me(() => {
    if (Ot(b, g, m), Ot(N, A, m), !m) {
      const D = setTimeout(() => c?.(), 200);
      return () => clearTimeout(D);
    }
  }, [m, c]);
  const L = () => h(!1);
  function V(D, U) {
    M(D), x(() => U);
  }
  async function R(D) {
    k && k(D), M(void 0), x(void 0);
  }
  const X = {
    openModal: V
  };
  return me(() => {
    const D = (U) => {
      U.key === "Escape" && L();
    };
    return window.addEventListener("keydown", D), () => window.removeEventListener("keydown", D);
  }, []), /* @__PURE__ */ n(pl.Provider, { value: X, children: /* @__PURE__ */ d(
    "div",
    {
      id: e,
      "data-transition-for": e,
      onMouseDown: L,
      className: "relative z-10",
      "aria-labelledby": `${e}-title`,
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ n("div", { className: `fixed inset-0 bg-gray-500/75 transition-opacity ${p}` }),
        /* @__PURE__ */ n("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ d("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: [
          /* @__PURE__ */ n("div", { className: `${t} ${r} ${y}`, onMouseDown: (D) => D.stopPropagation(), children: /* @__PURE__ */ d("div", { children: [
            i || /* @__PURE__ */ n("div", { className: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10", children: /* @__PURE__ */ d("button", { type: "button", onClick: L, className: s, title: "Close", children: [
              /* @__PURE__ */ n("span", { className: "sr-only", children: "Close" }),
              /* @__PURE__ */ n(
                "svg",
                {
                  className: "h-6 w-6",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ n(
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
            ] }) }),
            l
          ] }) }),
          o
        ] }) }),
        v?.name == "ModalLookup" && v.ref && /* @__PURE__ */ n(Qt, { refInfo: v.ref, onDone: R, configureField: a })
      ]
    }
  ) });
}
function yl({
  id: e = "QueryPrefs",
  columns: t,
  prefs: r,
  maxLimit: s,
  onDone: a,
  onSave: l
}) {
  const { autoQueryGridDefaults: i } = Kt(), [o, c] = $({}), m = [10, 25, 50, 100, 250, 500, 1e3];
  me(() => {
    c(Object.assign({
      take: i.take,
      selectedColumns: []
    }, r));
  }, [r, i.take]);
  function h() {
    a?.();
  }
  function p() {
    l?.(o);
  }
  const g = (v) => {
    c((M) => ({ ...M, take: parseInt(v.target.value) }));
  }, y = (v, M) => {
    c((k) => ({
      ...k,
      selectedColumns: M ? [...k.selectedColumns || [], v] : (k.selectedColumns || []).filter((x) => x !== v)
    }));
  }, A = () => {
    c((v) => ({ ...v, selectedColumns: [] }));
  };
  return /* @__PURE__ */ d(vl, { id: e, onDone: h, sizeClass: "w-full sm:max-w-prose", children: [
    /* @__PURE__ */ n("div", { className: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: /* @__PURE__ */ n("div", { className: "", children: /* @__PURE__ */ d("div", { className: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left", children: [
      /* @__PURE__ */ n("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100", children: "Query Preferences" }),
      /* @__PURE__ */ d("div", { className: "mt-4", children: [
        /* @__PURE__ */ n("label", { htmlFor: `${e}-take`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Results per page" }),
        /* @__PURE__ */ n(
          "select",
          {
            id: `${e}-take`,
            value: o.take,
            onChange: g,
            className: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
            children: m.filter((v) => s == null || v <= s).map((v) => /* @__PURE__ */ n("option", { value: v, children: v }, v))
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "radio",
            id: `${e}-allColumns`,
            onClick: A,
            checked: (o.selectedColumns?.length || 0) === 0,
            onChange: () => {
            },
            className: "focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
          }
        ),
        /* @__PURE__ */ n("label", { className: "ml-3 block text-gray-700 dark:text-gray-300", htmlFor: `${e}-allColumns`, children: "View all columns" })
      ] }),
      /* @__PURE__ */ n("div", { className: "mt-4", children: /* @__PURE__ */ n("div", { className: "pb-2 px-4", children: /* @__PURE__ */ n("div", { className: "", children: t.map((v) => /* @__PURE__ */ d("div", { className: "flex items-center", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "checkbox",
            id: v.name,
            value: v.name,
            checked: o.selectedColumns?.includes(v.name) || !1,
            onChange: (M) => y(v.name, M.target.checked),
            className: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
          }
        ),
        /* @__PURE__ */ n("label", { htmlFor: v.name, className: "ml-3", children: v.name })
      ] }, v.name)) }) }) })
    ] }) }) }),
    /* @__PURE__ */ d("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
      /* @__PURE__ */ n(Mt, { onClick: p, color: "red", className: "ml-2", children: "Save" }),
      /* @__PURE__ */ n(Rt, { onClick: h, children: "Cancel" })
    ] })
  ] });
}
function Ir({ onDelete: e, children: t, ...r }) {
  const [s, a] = $(!1), l = () => {
    s && e?.();
  }, i = f(
    () => `select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${s ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"}`,
    [s]
  );
  return /* @__PURE__ */ d(Dt, { children: [
    /* @__PURE__ */ n(
      "input",
      {
        id: "confirmDelete",
        type: "checkbox",
        className: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        checked: s,
        onChange: (o) => a(o.target.checked)
      }
    ),
    /* @__PURE__ */ n("label", { htmlFor: "confirmDelete", className: "ml-2 mr-2 select-none", children: "confirm" }),
    /* @__PURE__ */ n("span", { onClick: l, className: i, ...r, children: t || "Delete" })
  ] });
}
const Gs = Wt(null), Jo = kt(({
  formStyle: e = "slideOver",
  autosave: t = !0,
  showLoading: r = !0,
  showCancel: s,
  type: a,
  value: l,
  panelClass: i,
  formClass: o,
  headingClass: c,
  subHeadingClass: m,
  buttonsClass: h,
  heading: p,
  subHeading: g,
  configureField: y,
  configureFormLayout: A,
  deleteType: v,
  onSave: M,
  onDelete: k,
  onError: x,
  onDone: b,
  headingSlot: N,
  subheadingSlot: L,
  headerSlot: V,
  footerSlot: R
}, X) => {
  const D = Ge(), [U, w] = $(1), { typeOf: O, apiOf: T, typeProperties: Q, createFormLayout: I, getPrimaryKey: B, Crud: W, createDto: Y, formValues: C } = dt(), K = f(() => It(a), [a]), Z = f(() => O(K), [K]), Ce = () => typeof a == "string" ? Y(a, zn(l)) : a ? new a(zn(l)) : null, [ve, Ae] = $(Ce());
  function te() {
    w((se) => se + 1), Ae(Ce());
  }
  function ke(se) {
    Ae((Oe) => ({ ...Oe, ...se }));
  }
  Ct(X, () => ({
    forceUpdate: te,
    props: { formStyle: e, autosave: t, showLoading: r, showCancel: s, type: a, modelValue: l, panelClass: i, formClass: o, headingClass: c, subHeadingClass: m, buttonsClass: h, heading: p, subHeading: g, configureField: y, configureFormLayout: A, deleteType: v, onSave: M, onDelete: k, onError: x, onDone: b },
    setModel: ke,
    formFields: D,
    model: ve
  }));
  const [be, Me] = $(), [F, _] = $();
  function ce(se, Oe) {
    Me(se), _(() => Oe);
  }
  async function G(se) {
    F && F(se), Me(void 0), _(void 0);
  }
  const P = {
    openModal: ce
  }, u = f(() => i || Ue.panelClass(e), [i, e]), E = f(() => o || Ue.formClass(e), [o, e]), j = f(() => c || Ue.headingClass(e), [c, e]), ae = f(() => m || Ue.subHeadingClass(e), [m, e]), re = f(() => h || Ue.buttonsClass, [h]), le = f(() => W.model(Z), [Z]), $e = f(
    () => p || O(K)?.description || (le ? `Update ${ze(le)}` : ze(K)),
    [p, K, le]
  ), [Ve, he] = $(new Ye()), ue = Ge(Object.assign({}, zn(l)));
  me(() => {
    z.interceptors.has("AutoEditForm.new") && z.interceptors.invoke("AutoEditForm.new", { props: { formStyle: e, autosave: t, showLoading: r, showCancel: s, type: a, modelValue: l, panelClass: i, formClass: o, headingClass: c, subHeadingClass: m, buttonsClass: h, heading: p, subHeading: g, configureField: y, configureFormLayout: A, deleteType: v, onSave: M, onDelete: k, onError: x, onDone: b }, model: ve, origModel: ue.current });
  }, []);
  const ne = Zt(), Te = f(() => ne.loading.current, [ne.loading.current]), Fe = () => Ze(O(W.model(Z)), (se) => B(se));
  function Ee(se) {
    const { op: Oe, prop: We } = se;
    Oe && (W.isPatch(Oe) || W.isUpdate(Oe)) && (se.disabled = We?.isPrimaryKey), y && y(se);
  }
  function xe(se) {
  }
  async function De(se) {
    se.preventDefault();
    let Oe = se.target;
    if (!t) {
      M?.(new ve.constructor(C(Oe, Q(Z))));
      return;
    }
    let We = Ze(ve?.getMethod, (Ie) => typeof Ie == "function" ? Ie() : null) || "POST", je = Ze(ve?.createResponse, (Ie) => typeof Ie == "function" ? Ie() : null) == null, Le = Fe(), Se;
    if (Vr.hasRequestBody(We)) {
      let Ie = new ve.constructor(), rt = Ne(l, Le.name), st = new FormData(Oe);
      Le && !Array.from(st.keys()).some((ye) => ye.toLowerCase() == Le.name.toLowerCase()) && st.append(Le.name, rt);
      let q = [];
      const ee = K && T(K);
      if (ee && W.isPatch(ee)) {
        let ye = I(Z), _e = {};
        if (Le && (_e[Le.name] = rt), ye.forEach((Je) => {
          let lt = Je.id, Xe = Ne(ue.current, lt);
          if (Le && Le.name.toLowerCase() === lt.toLowerCase())
            return;
          let ut = st.get(lt);
          z.interceptors.has("AutoEditForm.save.formLayout") && z.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: Xe, formLayout: ye, input: Je, newValue: ut });
          let Gt = ut != null, un = Je.type === "checkbox" ? Gt !== !!Xe : Je.type === "file" ? Gt : ut != Xe;
          !ut && !Xe && (un = !1), un && (ut ? _e[lt] = ut : Je.type !== "file" && q.push(lt));
        }), z.interceptors.has("AutoEditForm.save") && z.interceptors.invoke("AutoEditForm.save", { origModel: ue.current, formLayout: ye, dirtyValues: _e }), Array.from(st.keys()).filter((Je) => !_e[Je]).forEach((Je) => st.delete(Je)), Array.from(st.keys()).filter((Je) => Je.toLowerCase() != Le.name.toLowerCase()).length == 0 && q.length == 0) {
          pe();
          return;
        }
      }
      const we = q.length > 0 ? { jsconfig: "eccn", reset: q } : { jsconfig: "eccn" };
      je ? Se = await ne.apiFormVoid(Ie, st, we) : Se = await ne.apiForm(Ie, st, we);
    } else {
      let Ie = C(Oe, Q(Z));
      Le && !Ne(Ie, Le.name) && (Ie[Le.name] = Ne(l, Le.name));
      let rt = new ve.constructor(Ie);
      je ? Se = await ne.apiVoid(rt, { jsconfig: "eccn" }) : Se = await ne.api(rt, { jsconfig: "eccn" });
    }
    he(Se), Se.succeeded ? (Oe.reset(), M?.(Se.response)) : x?.(Se.error);
  }
  async function et() {
    let se = Fe();
    const Oe = se ? Ne(l, se.name) : null;
    if (!Oe) {
      console.error(`Could not find Primary Key for Type ${K} (${le})`);
      return;
    }
    const We = { [se.name]: Oe }, je = typeof v == "string" ? Y(v, We) : v ? new v(We) : null;
    let Le = Ze(je.createResponse, (Ie) => typeof Ie == "function" ? Ie() : null) == null, Se;
    Le ? Se = await ne.apiVoid(je) : Se = await ne.api(je), he(Se), Se.succeeded ? k?.(Se.response) : x?.(Se.error);
  }
  function Pe() {
    b?.();
  }
  const [ge, He] = $(!1), [qe, gt] = $(""), at = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  me(() => {
    if (Ot(at, gt, ge), !ge) {
      const se = setTimeout(Pe, 700);
      return () => clearTimeout(se);
    }
  }, [ge]), me(() => {
    He(!0);
  }, []);
  function pe() {
    e == "slideOver" ? He(!1) : Pe();
  }
  return me(() => {
    const se = (Oe) => {
      Oe.key === "Escape" && pe();
    };
    return window.addEventListener("keydown", se), () => window.removeEventListener("keydown", se);
  }, []), Z ? e == "card" ? /* @__PURE__ */ d(Gs.Provider, { value: P, children: [
    /* @__PURE__ */ n("div", { className: u, children: /* @__PURE__ */ d("form", { onSubmit: De, children: [
      /* @__PURE__ */ d("div", { className: E, children: [
        /* @__PURE__ */ d("div", { children: [
          N || /* @__PURE__ */ n("h3", { className: j, children: $e }),
          L || g && /* @__PURE__ */ n("p", { className: ae, children: g }),
          !L && !g && Z?.notes && /* @__PURE__ */ n("p", { className: `notes ${ae}`, dangerouslySetInnerHTML: { __html: Z.notes } })
        ] }),
        V,
        /* @__PURE__ */ n(
          St,
          {
            ref: D,
            value: ve,
            onChange: xe,
            api: Ve,
            configureField: Ee,
            configureFormLayout: A
          },
          U
        ),
        R
      ] }),
      /* @__PURE__ */ d("div", { className: re, children: [
        /* @__PURE__ */ n("div", { children: v && /* @__PURE__ */ n(Ir, { onDelete: et }) }),
        /* @__PURE__ */ n("div", { children: r && Te && /* @__PURE__ */ n(_t, {}) }),
        /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
          s && /* @__PURE__ */ n(Rt, { onClick: pe, disabled: Te, children: "Cancel" }),
          /* @__PURE__ */ n(Mt, { type: "submit", className: "ml-4", disabled: Te, children: "Save" })
        ] })
      ] })
    ] }) }),
    be?.name == "ModalLookup" && be.ref && /* @__PURE__ */ n(Qt, { refInfo: be.ref, onDone: G, configureField: y })
  ] }) : /* @__PURE__ */ d(Gs.Provider, { value: P, children: [
    /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ n("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ n("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: pe, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: (se) => se.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ n("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${qe}`, children: /* @__PURE__ */ d("form", { className: E, onSubmit: De, children: [
        /* @__PURE__ */ n("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
          /* @__PURE__ */ n("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
            /* @__PURE__ */ d("div", { className: "space-y-1", children: [
              N || /* @__PURE__ */ n("h3", { className: j, children: $e }),
              L || g && /* @__PURE__ */ n("p", { className: ae, children: g }),
              !L && !g && Z?.notes && /* @__PURE__ */ n("p", { className: `notes ${ae}`, dangerouslySetInnerHTML: { __html: Z.notes } })
            ] }),
            /* @__PURE__ */ n("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ n(Tn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: pe }) })
          ] }) }),
          V,
          /* @__PURE__ */ n(
            St,
            {
              ref: D,
              value: ve,
              onChange: xe,
              api: Ve,
              configureField: Ee,
              configureFormLayout: A
            },
            U
          ),
          R
        ] }) }),
        /* @__PURE__ */ d("div", { className: re, children: [
          /* @__PURE__ */ n("div", { children: v && /* @__PURE__ */ n(Ir, { onDelete: et }) }),
          /* @__PURE__ */ n("div", { children: r && Te && /* @__PURE__ */ n(_t, {}) }),
          /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
            s && /* @__PURE__ */ n(Rt, { onClick: pe, disabled: Te, children: "Cancel" }),
            /* @__PURE__ */ n(Mt, { type: "submit", className: "ml-4", disabled: Te, children: "Save" })
          ] })
        ] })
      ] }) }) }) }) })
    ] }),
    be?.name == "ModalLookup" && be.ref && /* @__PURE__ */ n(Qt, { refInfo: be.ref, onDone: G, configureField: y })
  ] }) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
    "Could not create form for unknown ",
    /* @__PURE__ */ n("b", { children: "type" }),
    " ",
    K
  ] }) });
});
function jr({
  value: e,
  fieldAttrs: t,
  depth: r = 0,
  classes: s = (a, l, i, o, c) => o
}) {
  const a = f(() => qt(e), [e]), l = f(() => Array.isArray(e), [e]), i = (h) => ra(h), o = (h) => t ? t(h) : null, c = f(() => na(e), [e]), m = (h) => h ? Object.keys(h).map((p) => ({ key: i(p), val: h[p] })) : [];
  return a ? /* @__PURE__ */ n("div", { className: r == 0 ? "prose html-format" : "", children: /* @__PURE__ */ n("div", { dangerouslySetInnerHTML: { __html: er(e) } }) }) : l ? /* @__PURE__ */ n("div", { className: r == 0 ? "prose html-format" : "", children: /* @__PURE__ */ n("div", { className: s("array", "div", r, de.gridClass), children: qt(e[0]) ? /* @__PURE__ */ d("div", { children: [
    "[ ",
    e.join(", "),
    " ]"
  ] }) : /* @__PURE__ */ n("div", { className: s("array", "div", r, de.grid2Class), children: /* @__PURE__ */ n("div", { className: s("array", "div", r, de.grid3Class), children: /* @__PURE__ */ n("div", { className: s("array", "div", r, de.grid4Class), children: /* @__PURE__ */ d("table", { className: s("object", "table", r, de.tableClass), children: [
    /* @__PURE__ */ n("thead", { className: s("array", "thead", r, de.theadClass), children: /* @__PURE__ */ n("tr", { children: c.map((h) => /* @__PURE__ */ d("th", { className: s("array", "th", r, de.theadCellClass + " whitespace-nowrap"), children: [
      /* @__PURE__ */ n("b", {}),
      i(h)
    ] }, h)) }) }),
    /* @__PURE__ */ n("tbody", { children: e.map((h, p) => /* @__PURE__ */ n("tr", { className: s("array", "tr", r, p % 2 == 0 ? "bg-white" : "bg-gray-50", p), children: c.map((g) => /* @__PURE__ */ n("td", { className: s("array", "td", r, de.tableCellClass), children: /* @__PURE__ */ n(
      jr,
      {
        value: h[g],
        fieldAttrs: t,
        depth: r + 1,
        classes: s,
        ...o(g)
      }
    ) }, g)) }, p)) })
  ] }) }) }) }) }) }) : /* @__PURE__ */ n("div", { className: r == 0 ? "prose html-format" : "", children: /* @__PURE__ */ n("table", { className: s("object", "table", r, "table-object"), children: /* @__PURE__ */ n("tbody", { children: m(e).map((h) => /* @__PURE__ */ d("tr", { className: s("object", "tr", r, ""), children: [
    /* @__PURE__ */ n("th", { className: s("object", "th", r, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"), children: h.key }),
    /* @__PURE__ */ n("td", { className: s("object", "td", r, "align-top py-2 px-4 text-sm"), children: /* @__PURE__ */ n(
      jr,
      {
        value: h.val,
        fieldAttrs: t,
        depth: r + 1,
        classes: s,
        ...o(h.key)
      }
    ) })
  ] }, h.key)) }) }) });
}
function Js({ value: e, imageClass: t = "w-8 h-8" }) {
  const { getMimeType: r } = li(), { type: s } = f(() => {
    const a = e;
    let l = typeof e;
    const i = l === "string" && a.length ? r(a) : null;
    if (l === "string" && a.length) {
      const o = a.startsWith("https://") || a.startsWith("http://");
      (o || a[0] === "/") && i?.startsWith("image/") ? l = "image" : o && (l = "link");
    }
    return { type: l, mimeType: i };
  }, [e, r]);
  return s === "link" ? /* @__PURE__ */ n("a", { href: e, className: "text-indigo-600", children: e }) : s === "image" ? /* @__PURE__ */ n("a", { href: e, title: e, className: "inline-block", children: /* @__PURE__ */ n(Cn, { src: e, className: t }) }) : /* @__PURE__ */ n(jr, { value: e });
}
function Xs({ value: e }) {
  const { basic: t, complex: r } = f(() => {
    const s = Object.keys(e), a = {}, l = {};
    return s.forEach((i) => {
      const o = e[i], c = typeof o;
      o == null || c === "function" || c === "symbol" ? a[i] = `(${o == null ? "null" : c})` : c === "object" ? l[i] = o : a[i] = o;
    }), { basic: a, complex: l };
  }, [e]);
  return /* @__PURE__ */ n("table", { className: "my-2 w-full", children: /* @__PURE__ */ d("tbody", { children: [
    Object.entries(t).map(([s, a]) => /* @__PURE__ */ d("tr", { className: "leading-7", children: [
      /* @__PURE__ */ n("th", { className: "px-2 text-left align-top", children: ze(s) }),
      /* @__PURE__ */ n("td", { className: "align-top", children: /* @__PURE__ */ n(Js, { value: a }) })
    ] }, s)),
    Object.entries(r).map(([s, a]) => /* @__PURE__ */ d(ti.Fragment, { children: [
      /* @__PURE__ */ n("tr", { className: "my-2 leading-7", children: /* @__PURE__ */ n("td", { colSpan: 2, className: "px-2 bg-indigo-700 text-white", children: ze(s) }) }),
      /* @__PURE__ */ n("tr", { className: "leading-7", children: /* @__PURE__ */ n("td", { colSpan: 2, className: "px-2 align-top", children: /* @__PURE__ */ n(Js, { value: a }) }) })
    ] }, s))
  ] }) });
}
function Xo({
  formStyle: e = "slideOver",
  typeName: t,
  apis: r,
  model: s,
  heading: a,
  subHeading: l,
  panelClass: i,
  formClass: o,
  headingClass: c,
  subHeadingClass: m,
  deleteType: h,
  showLoading: p,
  onDone: g,
  onDelete: y,
  onError: A,
  headingSlot: v,
  subheadingSlot: M
}) {
  const { typeOf: k, getPrimaryKey: x, createDto: b } = dt(), N = f(() => t ?? r.dataModel.name, [t, r]), L = f(() => k(N), [N]), V = f(() => i || Ue.panelClass(e), [i, e]), R = f(() => o || Ue.formClass(e), [o, e]), X = f(() => c || Ue.headingClass(e), [c, e]), D = f(() => m || Ue.subHeadingClass(e), [m, e]), U = f(
    () => a || k(N)?.description || (s?.id ? `${ze(N)} ${s.id}` : "View " + ze(N)),
    [a, N, s]
  ), [w, O] = $(new Ye());
  me(() => {
    z.interceptors.has("AutoViewForm.new") && z.interceptors.invoke("AutoViewForm.new", { props: { formStyle: e, typeName: t, apis: r, model: s, heading: a, subHeading: l, panelClass: i, formClass: o, headingClass: c, subHeadingClass: m, deleteType: h, showLoading: p, onDone: g, onDelete: y, onError: A } });
  }, []);
  const T = Zt(), Q = f(() => T.loading.current, [T.loading.current]), I = () => Ze(L, (te) => x(te)), B = f(() => L, [L]);
  async function W() {
    let te = I();
    const ke = te ? Ne(s, te.name) : null;
    if (!ke) {
      console.error(`Could not find Primary Key for Type ${N} (${B})`);
      return;
    }
    const be = { [te.name]: ke }, Me = typeof h == "string" ? b(h, be) : h ? new h(be) : null;
    let F = Ze(Me.createResponse, (ce) => typeof ce == "function" ? ce() : null) == null, _;
    F ? _ = await T.apiVoid(Me) : _ = await T.api(Me), O(_), _.succeeded ? y?.(_.response) : A?.(_.error);
  }
  function Y() {
    g && g();
  }
  const [C, K] = $(!1), [Z, Ce] = $(""), ve = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  me(() => {
    if (Ot(ve, Ce, C), !C) {
      const te = setTimeout(Y, 700);
      return () => clearTimeout(te);
    }
  }, [C]), me(() => {
    K(!0);
  }, []);
  function Ae() {
    e == "slideOver" ? K(!1) : Y();
  }
  return me(() => {
    const te = (ke) => {
      ke.key === "Escape" && Ae();
    };
    return window.addEventListener("keydown", te), () => window.removeEventListener("keydown", te);
  }, []), N ? e == "card" ? /* @__PURE__ */ n("div", { className: V, children: /* @__PURE__ */ d("div", { className: R, children: [
    /* @__PURE__ */ d("div", { children: [
      v || /* @__PURE__ */ n("h3", { className: X, children: U }),
      M || l && /* @__PURE__ */ n("p", { className: D, children: l }),
      !M && !l && L?.notes && /* @__PURE__ */ n("p", { className: `notes ${D}`, dangerouslySetInnerHTML: { __html: L.notes } })
    ] }),
    /* @__PURE__ */ n(Xs, { value: s })
  ] }) }) : /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
    /* @__PURE__ */ n("div", { className: "fixed inset-0" }),
    /* @__PURE__ */ n("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: Ae, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: (te) => te.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ n("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${Z}`, children: /* @__PURE__ */ d("div", { className: R, children: [
      /* @__PURE__ */ n("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
        /* @__PURE__ */ n("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
          /* @__PURE__ */ d("div", { className: "space-y-1", children: [
            v || /* @__PURE__ */ n("h3", { className: X, children: U }),
            M || l && /* @__PURE__ */ n("p", { className: D, children: l }),
            !M && !l && L?.notes && /* @__PURE__ */ n("p", { className: `notes ${D}`, dangerouslySetInnerHTML: { __html: L.notes } })
          ] }),
          /* @__PURE__ */ n("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ n(Tn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: Ae }) })
        ] }) }),
        /* @__PURE__ */ n(Xs, { value: s })
      ] }) }),
      /* @__PURE__ */ d("div", { className: Ue.buttonsClass, children: [
        /* @__PURE__ */ n("div", { children: h && /* @__PURE__ */ n(Ir, { onDelete: W }) }),
        /* @__PURE__ */ n("div", { children: p && Q && /* @__PURE__ */ n(_t, {}) }),
        /* @__PURE__ */ n("div", { className: "flex justify-end" })
      ] })
    ] }) }) }) }) })
  ] }) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
    "Could not create view for unknown ",
    /* @__PURE__ */ n("b", { children: "type" }),
    " ",
    N
  ] }) });
}
const Yo = kt(({
  filterDefinitions: e,
  id: t = "AutoQueryGrid",
  apis: r,
  type: s,
  prefs: a,
  deny: l,
  hide: i,
  selectedColumns: o,
  toolbarButtonClass: c,
  tableStyle: m,
  gridClass: h,
  grid2Class: p,
  grid3Class: g,
  grid4Class: y,
  tableClass: A,
  theadClass: v,
  tbodyClass: M,
  theadRowClass: k,
  theadCellClass: x,
  headerTitle: b,
  headerTitles: N,
  visibleFrom: L,
  rowClass: V,
  rowStyle: R,
  modelTitle: X,
  newButtonLabel: D,
  apiPrefs: U,
  canFilter: w,
  disableKeyBindings: O,
  configureField: T,
  skip: Q = 0,
  create: I,
  edit: B,
  filters: W,
  onHeaderSelected: Y,
  onRowSelected: C,
  onNav: K,
  children: Z
}, Ce) => {
  const { config: ve, autoQueryGridDefaults: Ae } = Kt(), te = Ae, ke = ve.storage, be = Zt(), Me = "filtering,queryString,queryFilters".split(","), F = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), _ = f(
    () => l ? Pt(Me, l) : Pt(Me, te.deny),
    [l, te.deny]
  ), ce = f(
    () => i ? Pt(F, i) : Pt(F, te.hide),
    [i, te.hide]
  );
  function G(S) {
    return _[S];
  }
  function P(S) {
    return ce[S];
  }
  const u = f(() => m ?? te.tableStyle, [m, te.tableStyle]), E = f(() => h ?? de.getGridClass(u), [h, u]), j = f(() => p ?? de.getGrid2Class(u), [p, u]), ae = f(() => g ?? de.getGrid3Class(u), [g, u]), re = f(() => y ?? de.getGrid4Class(u), [y, u]), le = f(() => A ?? de.getTableClass(u), [A, u]), $e = f(() => v ?? de.getTheadClass(u), [v, u]), Ve = f(() => k ?? de.getTheadRowClass(u), [k, u]), he = f(() => x ?? de.getTheadCellClass(u), [x, u]), ue = f(() => M ?? de.getTbodyClass(u), [M, u]), ne = f(() => c ?? de.toolbarButtonClass, [c]);
  function Te(S, H) {
    if (V) return V(S, H);
    const ie = !!fe.AnyUpdate, Re = (mn?.name ? Ne(S, mn.name) : null) == Le;
    return de.getTableRowClass(u, H, Re, ie);
  }
  const { metadataApi: Fe, typeOf: Ee, apiOf: xe, filterDefinitions: De } = dt(), { invalidAccessMessage: et } = ls(), Pe = f(() => e || De, [e, De]), [ge, He] = $([]), [qe, gt] = $(new Ye()), [at, pe] = $(new Ye()), [se, Oe] = $(), [We, je] = $(!1), [Le, Se] = $(), [Ie, rt] = $(), [st, q] = $(!1), [ee, we] = $(), [ye, _e] = $(Q), [pt, Je] = $(!1), lt = 25, [Xe, ut] = $({ take: lt }), [Gt, un] = $(!1), dr = Ge(null), ur = Ge(null), vt = f(() => It(s), [s]), fe = f(() => {
    let S = Bt(r);
    return S.length > 0 ? Ht.from(S.map((H) => xe(H)).filter((H) => H != null).map((H) => H)) : Ht.forType(vt, Fe);
  }, [r, vt, Fe]), ms = f(
    () => Ee(fe.AnyQuery?.viewModel?.name || fe.AnyQuery?.dataModel.name),
    [fe.AnyQuery]
  ), fr = f(() => [], [Z]);
  function xl() {
    let S = Bt(o);
    return S.length > 0 ? S : fr.length > 0 ? fr : [];
  }
  const fn = f(() => {
    let H = xl().map((J) => J.toLowerCase());
    const ie = ot(ms);
    return H.length > 0 ? H.map((J) => ie.find((Re) => Re.name.toLowerCase() === J)).filter((J) => J != null) : ie;
  }, [ms, o, fr]), wl = f(() => {
    let S = fn.map((ie) => ie.name), H = Bt(Xe.selectedColumns).map((ie) => ie.toLowerCase());
    return H.length > 0 ? S.filter((ie) => H.includes(ie.toLowerCase())) : S;
  }, [fn, Xe.selectedColumns]), bl = f(
    () => ge.some((S) => S.settings.filters.length > 0 || !!S.settings.sort) || Xe.selectedColumns,
    [ge, Xe.selectedColumns]
  ), mr = f(
    () => ge.map((S) => S.settings.filters.length).reduce((S, H) => S + H, 0),
    [ge]
  ), hs = f(
    () => ot(Ee(vt || fe.AnyQuery?.dataModel.name)),
    [vt, fe.AnyQuery]
  ), mn = f(
    () => on(Ee(vt || fe.AnyQuery?.dataModel.name)),
    [vt, fe.AnyQuery]
  ), yt = f(() => Xe.take ?? lt, [Xe.take]), it = f(() => (qe.response ? Ne(qe.response, "results") : null) ?? [], [qe.response]), Jt = f(() => (qe.response?.total || it.length) ?? 0, [qe.response, it]), gs = f(() => ye > 0, [ye]), ps = f(() => ye > 0, [ye]), vs = f(() => it.length >= yt, [it.length, yt]), ys = f(() => it.length >= yt, [it.length, yt]), xs = {
    NoQuery: "No Query API was found"
  }, ws = f(() => vt || fe.AnyQuery?.dataModel.name, [vt, fe.AnyQuery]), Xt = f(() => X || ws, [X, ws]), Nl = f(() => D || `New ${Xt}`, [D, Xt]), hr = () => `${t}/ApiPrefs/${vt || fe.AnyQuery?.dataModel.name}`, En = (S) => `Column/${t}:${vt || fe.AnyQuery?.dataModel.name}.${S}`, $n = (S) => `<span class="text-yellow-700">${S}</span>`, bs = f(() => {
    if (!Fe)
      return $n(`AppMetadata not loaded, see <a class="${Wn.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
    let H = Bt(r).map((J) => xe(J) == null ? J : null).filter((J) => J != null);
    if (H.length > 0)
      return $n(`Unknown API${H.length > 1 ? "s" : ""}: ${H.join(", ")}`);
    let ie = fe;
    return ie.empty ? $n("Missing DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : ie.AnyQuery ? null : $n(xs.NoQuery);
  }, [Fe, r, fe]), Ns = f(() => fe.AnyQuery && et(fe.AnyQuery), [fe.AnyQuery]), ks = f(() => fe.Create && et(fe.Create), [fe.Create]), Cs = f(() => fe.AnyUpdate && et(fe.AnyUpdate), [fe.AnyUpdate]), kl = f(() => Qn(fe.Create), [fe.Create]), Ls = f(() => Qn(fe.Delete), [fe.Delete]);
  function Ms(S) {
    if (S) {
      if (w)
        return w(S);
      const H = hs.find((ie) => ie.name.toLowerCase() == S.toLowerCase());
      if (H)
        return !ha(H);
    }
    return !1;
  }
  function hn(S) {
    K?.(S), G("queryString") && es(S);
  }
  async function Dn(S) {
    let H = ye + S;
    H < 0 && (H = 0);
    const ie = Math.floor(Jt / yt) * yt;
    H > ie && (H = ie), _e(H), hn({ skip: H || void 0 }), await xt();
  }
  async function gr(S, H) {
    if (rt(null), Se(H), !S || !H) return;
    let ie = wn(fe.AnyQuery, { [S]: H });
    const J = await be.api(ie);
    if (J.succeeded) {
      let Re = Ne(J.response, "results")?.[0];
      Re || console.warn(`API ${fe.AnyQuery?.request.name}(${S}:${H}) returned no results`), rt(Re);
    }
  }
  async function Cl(S, H) {
    C?.(S, H);
    const ie = mn?.name, J = ie ? Ne(S, ie) : null;
    !ie || !J || (hn({ edit: J }), gr(ie, J));
  }
  function Ll(S, H) {
    if (!G("filtering")) return;
    let ie = H.target;
    if (Ms(S) && ie?.tagName !== "TD") {
      let J = ie?.closest("TABLE")?.getBoundingClientRect(), Re = ge.find((Qe) => Qe.name.toLowerCase() == S.toLowerCase());
      if (Re && J) {
        let Qe = 318, Ft = J.x + Qe + 10;
        we({
          column: Re,
          topLeft: {
            x: Math.max(Math.floor(H.clientX + Qe / 2), Ft),
            y: J.y + 45
          }
        });
      }
    }
    Y?.(S, H);
  }
  function Ml() {
    we(null);
  }
  async function Rl(S) {
    let H = ee?.column;
    H && (H.settings = S, ke.setItem(En(H.name), JSON.stringify(H.settings)), await xt()), we(null);
  }
  async function Al(S) {
    ke.setItem(En(S.name), JSON.stringify(S.settings)), await xt();
  }
  async function Tl(S) {
    q(!1), ut(S), ke.setItem(hr(), JSON.stringify(S)), await xt();
  }
  function El(S) {
    Object.assign(Ie, S), Rs();
  }
  function Rs() {
    dr.current?.forceUpdate(), ur.current?.forceUpdate();
  }
  async function xt() {
    await As(pr());
  }
  async function $l() {
    await xt();
  }
  const Dl = /iPad|iPhone|iPod/.test(navigator.userAgent);
  async function As(S) {
    const H = fe.AnyQuery;
    if (!H) {
      console.error(xs.NoQuery);
      return;
    }
    let ie = wn(H, S), J = sa((Qe) => {
      gt(new Ye()), un(Qe);
    }), Re = await be.api(ie);
    J(), Dl ? setTimeout(() => gt(Re), 0) : gt(Re);
  }
  function pr() {
    let S = {
      include: "total",
      take: yt
    }, H = Bt(Xe.selectedColumns || o);
    if (H.length > 0) {
      let J = mn;
      J && !H.includes(J.name) && (H = [J.name, ...H]);
      const Re = hs, Qe = [];
      H.forEach((Ft) => {
        const vn = Re.find((Vl) => Vl.name.toLowerCase() == Ft.toLowerCase());
        vn?.ref?.selfId && Qe.push(vn.ref.selfId);
      }), Qe.forEach((Ft) => {
        H.includes(Ft) || H.push(Ft);
      }), S.fields = _a(H).join(",");
    }
    let ie = [];
    if (ge.forEach((J) => {
      J.settings.sort && ie.push((J.settings.sort === "DESC" ? "-" : "") + J.name), J.settings.filters.forEach((Re) => {
        let Qe = Re.key.replace("%", J.name);
        S[Qe] = Re.value;
      });
    }), W && Object.keys(W).forEach((J) => {
      S[J] = W[J];
    }), G("queryString") && G("queryFilters")) {
      const J = location.search ? location.search : location.hash.includes("?") ? "?" + Vn(location.hash, "?") : "";
      let Re = kr(J);
      if (Object.keys(Re).forEach((Qe) => {
        fn.find((vn) => vn.name.toLowerCase() === Qe.toLowerCase()) && (S[Qe] = Re[Qe]);
      }), typeof Re.skip < "u") {
        const Qe = parseInt(Re.skip);
        isNaN(Qe) || (_e(Qe), S.skip = Qe);
      }
    }
    return typeof S.skip > "u" && ye > 0 && (S.skip = ye), ie.length > 0 && (S.orderBy = ie.join(",")), S;
  }
  function Ol() {
    const S = Ts("csv");
    Er(S), typeof window < "u" && window.open(S);
  }
  function Sl() {
    const S = Ts("json");
    Er(S), Je(!0), setTimeout(() => Je(!1), 3e3);
  }
  function Ts(S = "json") {
    const H = pr(), ie = `/api/${fe.AnyQuery?.request.name}`, J = Xl(be.api.baseUrl, nn(ie, { ...H, jsconfig: "edv" }));
    return J.indexOf("?") >= 0 ? Zn(J, "?") + "." + S + "?" + Vn(J, "?") : J + ".json";
  }
  async function Il() {
    ge.forEach((S) => {
      S.settings = { filters: [] }, ke.removeItem(En(S.name));
    }), ut({ take: lt }), ke.removeItem(hr()), await xt();
  }
  function jl() {
    je(!0), hn({ create: null });
  }
  function gn() {
    rt(null), Se(null), hn({ edit: void 0 });
  }
  function On() {
    je(!1), hn({ create: void 0 });
  }
  async function pn() {
    await xt(), gn();
  }
  async function Es() {
    await xt(), On();
  }
  function $s() {
    gt(new Ye()), pe(new Ye()), je(!1), Se(null), rt(null), q(!1), we(null), _e(Q), Je(!1), ut({ take: lt }), un(!1);
    const S = a || _n(ke.getItem(hr()));
    S && ut(S);
    const H = fn.map((J) => ({
      name: J.name,
      type: J.type,
      meta: J,
      settings: Object.assign(
        {
          filters: []
        },
        _n(ke.getItem(En(J.name)))
      )
    }));
    He(H), isNaN(Q) || _e(Q);
    let ie = mn?.name;
    if (G("queryString")) {
      const J = location.search ? location.search : location.hash.includes("?") ? "?" + Vn(location.hash, "?") : "";
      let Re = kr(J);
      typeof Re.create < "u" ? je(typeof Re.create < "u") : ie && (typeof Re.edit == "string" || typeof Re.edit == "number") && gr(ie, Re.edit);
    }
    I === !0 && je(!0), ie && B != null && gr(ie, B);
  }
  return Ct(Ce, () => ({
    update: xt,
    search: As,
    createRequestArgs: pr,
    reset: $s,
    createDone: On,
    createSave: Es,
    editDone: gn,
    editSave: pn,
    forceUpdate: Rs,
    setEdit: El,
    edit: Ie,
    createForm: dr.current,
    editForm: ur.current,
    apiPrefs: Xe,
    results: it,
    skip: ye,
    take: yt,
    total: Jt
  })), me(() => {
    z.interceptors.has("AutoQueryGrid.new") && z.interceptors.invoke("AutoQueryGrid.new", { props: { id: t, type: s } });
  }, []), me(() => {
    $s(), xt();
  }, []), bs ? /* @__PURE__ */ n("div", { dangerouslySetInnerHTML: { __html: bs } }) : Ns ? /* @__PURE__ */ n(il, { invalidAccess: Ns }) : /* @__PURE__ */ d("div", { className: "pt-1", children: [
    P("forms") && We && fe.Create && /* @__PURE__ */ n(Dt, { children: ks ? /* @__PURE__ */ n(
      Ks,
      {
        title: `Create ${Xt}`,
        invalidAccess: ks,
        alertClass: "text-yellow-700",
        onDone: On
      }
    ) : /* @__PURE__ */ n(
      gl,
      {
        ref: dr,
        type: fe.Create.request.name,
        configureField: T,
        onDone: On,
        onSave: Es
      }
    ) }),
    P("forms") && Ie && fe.AnyUpdate && /* @__PURE__ */ n(Dt, { children: Cs ? /* @__PURE__ */ n(
      Ks,
      {
        title: `Update ${Xt}`,
        invalidAccess: Cs,
        alertClass: "text-yellow-700",
        onDone: gn
      }
    ) : /* @__PURE__ */ n(
      Jo,
      {
        ref: ur,
        value: Ie,
        type: fe.AnyUpdate.request.name,
        deleteType: Ls ? fe.Delete.request.name : void 0,
        configureField: T,
        onDone: gn,
        onSave: pn,
        onDelete: pn
      }
    ) }),
    P("forms") && Ie && !fe.AnyUpdate && /* @__PURE__ */ n(
      Xo,
      {
        model: Ie,
        apis: fe,
        deleteType: Ls ? fe.Delete.request.name : void 0,
        onDone: gn,
        onSave: pn,
        onDelete: pn
      }
    ),
    P("toolbar") && /* @__PURE__ */ d(Dt, { children: [
      st && /* @__PURE__ */ n(
        yl,
        {
          columns: fn,
          prefs: Xe,
          onDone: () => q(!1),
          onSave: Tl
        }
      ),
      /* @__PURE__ */ d("div", { className: "pl-1 pt-1 flex flex-wrap", children: [
        /* @__PURE__ */ d("div", { className: "flex mt-1", children: [
          P("preferences") && /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
              title: `${Xt} Preferences`,
              onClick: () => q(!st),
              children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("g", { strokeWidth: "1.5", fill: "none", children: /* @__PURE__ */ n("path", { d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18", stroke: "currentColor" }) }) })
            }
          ),
          P("pagingNav") && /* @__PURE__ */ d(Dt, { children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${gs ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "First page",
                disabled: !gs,
                onClick: () => Dn(-Jt),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${ps ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Previous page",
                disabled: !ps,
                onClick: () => Dn(-yt),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${vs ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Next page",
                disabled: !vs,
                onClick: () => Dn(yt),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `pl-2 ${ys ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`,
                title: "Last page",
                disabled: !ys,
                onClick: () => Dn(Jt),
                children: /* @__PURE__ */ n("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z", fill: "currentColor" }) })
              }
            )
          ] })
        ] }),
        P("pagingInfo") && /* @__PURE__ */ n("div", { className: "flex mt-1", children: /* @__PURE__ */ d("div", { className: "px-4 text-lg text-black dark:text-white", children: [
          Gt && /* @__PURE__ */ n("span", { children: "Querying..." }),
          it.length > 0 && /* @__PURE__ */ d("span", { children: [
            /* @__PURE__ */ n("span", { className: "hidden xl:inline", children: "Showing Results " }),
            ye + 1,
            " - ",
            Math.min(ye + it.length, Jt),
            " ",
            /* @__PURE__ */ d("span", { children: [
              " of ",
              Jt
            ] })
          ] }),
          !Gt && qe.completed && it.length === 0 && /* @__PURE__ */ n("span", { children: "No Results" })
        ] }) }),
        /* @__PURE__ */ d("div", { className: "flex flex-wrap", children: [
          P("refresh") && /* @__PURE__ */ n("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ n("button", { type: "button", onClick: $l, title: "Refresh", className: ne, children: /* @__PURE__ */ n("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 0 0 5.07 8m-1.008 5a8.001 8.001  0 0 0 14.868 3" }) }) }) }),
          P("downloadCsv") && /* @__PURE__ */ n("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d("button", { type: "button", onClick: Ol, title: "Download CSV", className: ne, children: [
            /* @__PURE__ */ d("svg", { className: "w-5 h-5 mr-1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: [
              /* @__PURE__ */ n("path", { d: "M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z", fill: "#20744a", fillRule: "evenodd" }),
              /* @__PURE__ */ n("path", { fill: "#20744a", d: "M22.487 7.439h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ n("path", { fill: "#20744a", d: "M22.487 10.94h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ n("path", { fill: "#20744a", d: "M22.487 14.441h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ n("path", { fill: "#20744a", d: "M22.487 17.942h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ n("path", { fill: "#20744a", d: "M22.487 21.443h4.323v2.2h-4.323z" }),
              /* @__PURE__ */ n("path", { fill: "#fff", fillRule: "evenodd", d: "M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z" })
            ] }),
            /* @__PURE__ */ n("span", { className: "text-green-900 dark:text-green-100", children: "Excel" })
          ] }) }),
          P("copyApiUrl") && /* @__PURE__ */ n("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d("button", { type: "button", onClick: Sl, title: "Copy API URL", className: ne, children: [
            pt ? /* @__PURE__ */ n("svg", { className: "w-5 h-5 mr-1 text-green-600 dark:text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ n("svg", { className: "w-5 h-5 mr-1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ d("g", { fill: "none", children: [
              /* @__PURE__ */ n("path", { d: "M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
              /* @__PURE__ */ n("path", { d: "M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
            ] }) }),
            /* @__PURE__ */ n("span", { className: "whitespace-nowrap", children: "Copy URL" })
          ] }) }),
          bl && P("resetPreferences") && /* @__PURE__ */ n("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ n("button", { type: "button", onClick: Il, title: "Reset Preferences & Filters", className: ne, children: /* @__PURE__ */ n("svg", { className: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { fill: "currentColor", d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" }) }) }) }),
          P("filtersView") && mr > 0 && /* @__PURE__ */ n("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => Oe(se == "filters" ? null : "filters"),
              className: ne,
              "aria-expanded": "false",
              children: [
                /* @__PURE__ */ n("svg", { className: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z", clipRule: "evenodd" }) }),
                /* @__PURE__ */ d("span", { className: "mr-1", children: [
                  mr,
                  " ",
                  mr == 1 ? "Filter" : "Filters"
                ] }),
                se != "filters" ? /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) }) : /* @__PURE__ */ n("svg", { className: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" }) })
              ]
            }
          ) }),
          P("newItem") && fe.Create && kl && /* @__PURE__ */ n("div", { className: "pl-2 mt-1", children: /* @__PURE__ */ d("button", { type: "button", onClick: jl, title: Xt, className: ne, children: [
            /* @__PURE__ */ n("svg", { className: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", fill: "currentColor" }) }),
            /* @__PURE__ */ n("span", { className: "whitespace-nowrap", children: Nl })
          ] }) })
        ] })
      ] })
    ] }),
    se == "filters" && /* @__PURE__ */ n(
      dl,
      {
        className: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
        definitions: Pe,
        columns: ge,
        onDone: () => Oe(null),
        onChange: Al
      }
    ),
    /* @__PURE__ */ n(ir, { status: at.error ?? qe.error }),
    Gt ? /* @__PURE__ */ n(Ka, { className: "p-2" }) : null,
    ee && /* @__PURE__ */ n(
      cl,
      {
        definitions: Pe,
        column: ee.column,
        topLeft: ee.topLeft,
        onDone: Ml,
        onSave: Rl
      }
    ),
    it.length > 0 && /* @__PURE__ */ n(
      fl,
      {
        id: t,
        items: it,
        type: s,
        selectedColumns: wl,
        className: "mt-1",
        tableStyle: u,
        gridClass: E,
        grid2Class: j,
        grid3Class: ae,
        grid4Class: re,
        tableClass: le,
        theadClass: $e,
        theadRowClass: Ve,
        theadCellClass: he,
        tbodyClass: ue,
        rowClass: Te,
        onRowSelected: Cl,
        rowStyle: R,
        headerTitle: b,
        headerTitles: N,
        visibleFrom: L,
        onHeaderSelected: Ll,
        children: (S, H) => G("filtering") && Ms(S) ? /* @__PURE__ */ d("div", { className: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50", children: [
          /* @__PURE__ */ n("span", { className: "mr-1 select-none", children: H }),
          /* @__PURE__ */ n(
            ul,
            {
              column: ge.find((ie) => ie.name.toLowerCase() === S.toLowerCase()),
              isOpen: ee?.column.name === S
            }
          )
        ] }) : /* @__PURE__ */ n("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ n("span", { className: "mr-1 select-none", children: H }) })
      }
    )
  ] });
});
Yo.displayName = "AutoQueryGrid";
const Ys = Wt(null), pc = kt(({
  formStyle: e = "card",
  headerClass: t = "p-6",
  submitLabel: r = "Submit",
  jsconfig: s = "eccn,edv",
  showLoading: a = !0,
  type: l,
  metaType: i,
  value: o,
  onChange: c,
  panelClass: m,
  formClass: h,
  innerFormClass: p,
  bodyClass: g,
  headingClass: y,
  subHeadingClass: A,
  buttonsClass: v,
  heading: M,
  subHeading: k,
  configureField: x,
  configureFormLayout: b,
  allowSubmit: N,
  onSuccess: L,
  onError: V,
  onDone: R,
  headingSlot: X,
  subheadingSlot: D,
  headerSlot: U,
  footerSlot: w,
  buttonsSlot: O,
  leftbuttonsSlot: T,
  rightbuttonsSlot: Q
}, I) => {
  const B = Ge(), [W, Y] = $(1), C = Ge(null), K = Zt(), { typeOf: Z, createDto: Ce } = dt(), [ve, Ae] = $(new Ye()), te = f(() => m || Ue.panelClass(e), [m, e]), ke = f(() => h || (e == "card" ? "shadow sm:rounded-md" : en.formClass), [h, e]), be = f(() => y || Ue.headingClass(e), [y, e]), Me = f(() => A || Ue.subHeadingClass(e), [A, e]), F = f(() => typeof v == "string" ? v : Ue.buttonsClass, [v]), _ = f(() => l ? It(l) : o?.getTypeName ? o.getTypeName() : null, [l, o]), ce = f(() => i ?? Z(_), [i, _]);
  function G() {
    return typeof l == "string" ? Ce(l) : l ? new l() : o;
  }
  const P = () => o || G(), [u, E] = $(P()), j = f(() => K.loading.current, [K.loading.current]), ae = f(() => M ?? (ce?.description || ze(_)), [M, ce, _]);
  function re() {
    Y((pe) => pe + 1), E(P());
  }
  async function le(pe) {
    E((se) => ({ ...se, ...pe })), re();
  }
  async function $e(pe) {
    if (!pe || pe.tagName != "FORM") {
      console.error("Not a valid form", pe);
      return;
    }
    const se = G();
    let Oe = Ze(se?.getMethod, (Le) => typeof Le == "function" ? Le() : null) || "POST", We = Ze(se?.createResponse, (Le) => typeof Le == "function" ? Le() : null) == null, je;
    if (Vr.hasRequestBody(Oe)) {
      let Le = new se.constructor(), Se = new FormData(pe);
      We ? je = await K.apiFormVoid(Le, Se, { jsconfig: s }) : je = await K.apiForm(Le, Se, { jsconfig: s });
    } else {
      let Le = new se.constructor(Yl(u));
      console.debug("AutoForm.submit", Le), We ? je = await K.apiVoid(Le, { jsconfig: s }) : je = await K.api(Le, { jsconfig: s });
    }
    Ae(je), je.succeeded ? (L?.(je.response), at()) : V?.(je.error);
  }
  async function Ve() {
    $e(C.current);
  }
  function he(pe) {
    c?.(pe);
  }
  const [ue, ne] = $(), [Te, Fe] = $();
  function Ee(pe, se) {
    ne(pe), Fe(() => se);
  }
  async function xe(pe) {
    Te && Te(pe), ne(void 0), Fe(void 0);
  }
  const De = {
    openModal: Ee
  };
  Ct(I, () => ({
    forceUpdate: re,
    props: { formStyle: e, headerClass: t, submitLabel: r, jsconfig: s, showLoading: a, type: l, metaType: i, modelValue: o, "onUpdate:modelValue": c, panelClass: m, formClass: h, innerFormClass: p, bodyClass: g, headingClass: y, subHeadingClass: A, buttonsClass: v, heading: M, subHeading: k, configureField: x, configureFormLayout: b, allowSubmit: N, onSuccess: L, onError: V, onDone: R },
    setModel: le,
    formFields: B,
    submit: Ve,
    close: at,
    model: u
  }));
  function et() {
    R?.();
  }
  const [Pe, ge] = $(!1), [He, qe] = $(""), gt = {
    entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
    leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
  };
  me(() => {
    if (Ot(gt, qe, Pe), !Pe) {
      const pe = setTimeout(et, 700);
      return () => clearTimeout(pe);
    }
  }, [Pe]), me(() => {
    ge(!0);
  }, []);
  function at() {
    e == "slideOver" ? ge(!1) : et();
  }
  return me(() => {
    const pe = (se) => {
      se.key === "Escape" && at();
    };
    return window.addEventListener("keydown", pe), () => window.removeEventListener("keydown", pe);
  }, []), ce ? e == "card" ? /* @__PURE__ */ d(Ys.Provider, { value: De, children: [
    /* @__PURE__ */ n("div", { className: te, children: /* @__PURE__ */ d("form", { ref: C, onSubmit: (pe) => {
      pe.preventDefault(), $e(pe.target);
    }, autoComplete: "off", className: p, children: [
      /* @__PURE__ */ d("div", { className: g, children: [
        /* @__PURE__ */ d("div", { className: t, children: [
          X || /* @__PURE__ */ n("h3", { className: be, children: ae }),
          D || k && /* @__PURE__ */ n("p", { className: Me, children: k }),
          !D && !k && ce?.notes && /* @__PURE__ */ n("p", { className: `notes ${Me}`, dangerouslySetInnerHTML: { __html: ce.notes } })
        ] }),
        U,
        /* @__PURE__ */ n("input", { type: "submit", className: "hidden" }),
        /* @__PURE__ */ n(
          St,
          {
            ref: B,
            type: l,
            value: u,
            onChange: he,
            api: ve,
            configureField: x,
            configureFormLayout: b
          },
          W
        ),
        w
      ] }),
      O || /* @__PURE__ */ d("div", { className: F, children: [
        /* @__PURE__ */ n("div", { children: T }),
        /* @__PURE__ */ n("div", { children: a && j && /* @__PURE__ */ n(_t, {}) }),
        /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
          /* @__PURE__ */ n("div", {}),
          /* @__PURE__ */ n(Mt, { disabled: j || (N ? !N(u) : !1), children: r }),
          Q
        ] })
      ] })
    ] }) }),
    ue?.name == "ModalLookup" && ue.ref && /* @__PURE__ */ n(Qt, { refInfo: ue.ref, onDone: xe, configureField: x })
  ] }) : /* @__PURE__ */ d(Ys.Provider, { value: De, children: [
    /* @__PURE__ */ d("div", { className: "relative z-10", "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ n("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ n("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: at, className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ n("div", { onMouseDown: (pe) => pe.stopPropagation(), className: "pointer-events-none fixed inset-y-0 right-0 flex pl-10", children: /* @__PURE__ */ n("div", { className: `pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${He}`, children: /* @__PURE__ */ d("form", { ref: C, className: ke, onSubmit: (pe) => {
        pe.preventDefault(), $e(pe.target);
      }, children: [
        /* @__PURE__ */ n("div", { className: "flex min-h-0 flex-1 flex-col overflow-auto", children: /* @__PURE__ */ d("div", { className: "flex-1", children: [
          /* @__PURE__ */ n("div", { className: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6", children: /* @__PURE__ */ d("div", { className: "flex items-start justify-between space-x-3", children: [
            /* @__PURE__ */ d("div", { className: "space-y-1", children: [
              X || /* @__PURE__ */ n("h3", { className: be, children: ae }),
              D || k && /* @__PURE__ */ n("p", { className: Me, children: k }),
              !D && !k && ce?.notes && /* @__PURE__ */ n("p", { className: `notes ${Me}`, dangerouslySetInnerHTML: { __html: ce.notes } })
            ] }),
            /* @__PURE__ */ n("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ n(Tn, { buttonClass: "bg-gray-50 dark:bg-gray-900", onClose: at }) })
          ] }) }),
          U,
          /* @__PURE__ */ n(
            St,
            {
              ref: B,
              type: l,
              value: u,
              onChange: he,
              api: ve,
              configureField: x,
              configureFormLayout: b
            },
            W
          ),
          w
        ] }) }),
        /* @__PURE__ */ d("div", { className: F, children: [
          /* @__PURE__ */ n("div", { children: T }),
          /* @__PURE__ */ n("div", { children: a && j && /* @__PURE__ */ n(_t, {}) }),
          /* @__PURE__ */ d("div", { className: "flex justify-end", children: [
            /* @__PURE__ */ n(Rt, { onClick: at, disabled: j, children: "Cancel" }),
            /* @__PURE__ */ n(Mt, { className: "ml-4", disabled: j || (N ? !N(u) : !1), children: r }),
            Q
          ] })
        ] })
      ] }) }) }) }) })
    ] }),
    ue?.name == "ModalLookup" && ue.ref && /* @__PURE__ */ n(Qt, { refInfo: ue.ref, onDone: xe, configureField: x })
  ] }) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ d("p", { className: "text-red-700", children: [
    "Could not create form for unknown ",
    /* @__PURE__ */ n("b", { children: "type" }),
    " ",
    _
  ] }) });
});
function vc({
  id: e = "tabs",
  tabs: t,
  selected: r,
  param: s = "tab",
  label: a,
  tabClass: l,
  bodyClass: i = "p-4",
  url: o = !0,
  clearQuery: c = !1
}) {
  const m = f(() => Object.keys(t), [t]), h = (k) => a ? a(k) : ze(k), [p, g] = $("");
  function y(k) {
    if (g(k), o) {
      const x = m[0];
      es({ tab: k === x ? void 0 : k }, c);
    }
  }
  function A(k) {
    return p === k;
  }
  const v = f(() => `${100 / Object.keys(t).length}%`, [t]);
  me(() => {
    let k = r || Object.keys(t)[0];
    if (o) {
      const x = location.search ? location.search : location.hash.includes("?") ? "?" + Vn(location.hash, "?") : "", N = kr(x)[s];
      N && (k = N);
    }
    g(k);
  }, [r, t, o, s]);
  const M = p ? t[p] : null;
  return /* @__PURE__ */ d("div", { children: [
    /* @__PURE__ */ d("div", { className: "sm:hidden", children: [
      /* @__PURE__ */ n("label", { htmlFor: e, className: "sr-only", children: "Select a tab" }),
      /* @__PURE__ */ n(
        "select",
        {
          id: e,
          name: e,
          className: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: (k) => y(k.target.value),
          value: p,
          children: m.map((k) => /* @__PURE__ */ n("option", { value: k, children: h(k) }, k))
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "hidden sm:block", children: /* @__PURE__ */ n("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ n("nav", { className: "-mb-px flex", "aria-label": "Tabs", children: m.map((k) => /* @__PURE__ */ n(
      "a",
      {
        href: "#",
        onClick: (x) => {
          x.preventDefault(), y(k);
        },
        style: { width: v },
        className: A(k) ? `border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm ${l || ""}` : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm ${l || ""}`,
        children: h(k)
      },
      k
    )) }) }) }),
    /* @__PURE__ */ n("div", { className: i, children: M && /* @__PURE__ */ n(M, {}) })
  ] });
}
function yc({ className: e }) {
  const t = typeof document < "u" ? document.documentElement : null, r = () => t?.classList.contains("dark") ?? !1, [s, a] = $(() => typeof localStorage < "u" ? localStorage.getItem("color-scheme") === "dark" : !1);
  me(() => {
    a(r());
  }, []);
  function l() {
    r() ? t?.classList.remove("dark") : t?.classList.add("dark");
    const i = r();
    a(i), typeof localStorage < "u" && localStorage.setItem("color-scheme", i ? "dark" : "light");
  }
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: `bg-gray-200 dark:bg-gray-700 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black ${e ?? ""}`,
      role: "switch",
      "aria-checked": "false",
      onClick: l,
      children: /* @__PURE__ */ d("span", { className: `${s ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`, children: [
        /* @__PURE__ */ n("span", { className: `${s ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`, "aria-hidden": "true", children: /* @__PURE__ */ n("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 text-gray-400", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 32 32", children: /* @__PURE__ */ n("path", { fill: "currentColor", d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z" }) }) }),
        /* @__PURE__ */ n("span", { className: `${s ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`, "aria-hidden": "true", children: /* @__PURE__ */ n("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 text-indigo-600", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 32 32", children: /* @__PURE__ */ n("path", { fill: "currentColor", d: "M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z" }) }) })
      ] })
    }
  );
}
function xc({
  title: e = "Sign In",
  tabs: t = !0,
  oauth: r = !0,
  provider: s,
  onLogin: a
}) {
  const { getMetadata: l, createDto: i } = dt(), o = Zt(), c = ct(ns), { signIn: m } = ls(), h = l({ assert: !0 }), p = h.plugins.auth, g = typeof document < "u" ? document.baseURI : "", y = h.app.baseUrl, [A, v] = $(() => i("Authenticate")), [M, k] = $(new Ye()), [x, b] = $(s);
  me(() => {
    p?.authProviders.map((I) => I.formLayout).filter((I) => I).forEach((I) => I.forEach((B) => {
      v((W) => ({
        ...W,
        [B.id]: B.type === "checkbox" ? !1 : ""
      }));
    }));
  }, [p]);
  const N = f(() => p?.authProviders.filter((I) => I.formLayout) || [], [p]), L = f(() => N[0] || {}, [N]), V = f(() => N[Math.max(N.length - 1, 0)] || {}, [N]), R = f(() => (x ? p?.authProviders.find((I) => I.name === x) : null) ?? L, [x, p, L]), X = (I) => I === !1 || I === "false";
  function D(I) {
    return I.label || I.navItem && I.navItem.label;
  }
  const U = f(() => (R?.formLayout || []).map((I) => Object.assign({}, I, {
    type: I.type?.toLowerCase(),
    autocomplete: I.autocomplete || (I.type?.toLowerCase() === "password" ? "current-password" : void 0) || (I.id.toLowerCase() === "username" ? "username" : void 0),
    css: Object.assign({ field: "col-span-12" }, I.css)
  })), [R]), w = f(
    () => X(r) ? [] : p?.authProviders.filter((I) => I.type === "oauth") || [],
    [r, p]
  ), O = f(() => {
    let I = ei(
      p?.authProviders.filter((W) => W.formLayout && W.formLayout.length > 0),
      (W, Y) => {
        let C = D(Y) || mt(Y.name);
        W[C] = Y.name === L.name ? "" : Y.name;
      }
    );
    const B = R;
    return B && X(t) && (I = { [D(B) || mt(B.name)]: B }), I;
  }, [p, R, t, L]), T = f(() => {
    let I = U.map((B) => B.id).filter((B) => B);
    return M.summaryMessage(I);
  }, [M, U]);
  async function Q(I) {
    I.preventDefault();
    const B = { ...A };
    B.provider = R.name, R.name === "authsecret" ? (c.headers.set("authsecret", B.authsecret), v(i("Authenticate"))) : R.name === "basic" ? (c.setCredentials(B.UserName, B.Password), v(i("Authenticate")), B.UserName = null, B.Password = null) : (R.type === "Bearer" || R.name === "jwt") && (c.bearerToken = B.BearerToken, v(i("Authenticate")));
    const W = await o.api(B);
    if (k(W), W.succeeded) {
      const Y = W.response;
      m(Y), a?.(Y), k(new Ye()), v(i("Authenticate"));
    }
  }
  return p ? /* @__PURE__ */ d("div", { className: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ d("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
      /* @__PURE__ */ n("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50", children: e }),
      Object.keys(O).length > 1 && /* @__PURE__ */ n("p", { className: "mt-4 text-center text-sm text-gray-600 dark:text-gray-300", children: /* @__PURE__ */ n("span", { className: "relative z-0 inline-flex shadow-sm rounded-md", children: Object.entries(O).map(([I, B]) => /* @__PURE__ */ n(
        "a",
        {
          href: `?provider=${B}`,
          onClick: (W) => {
            W.preventDefault(), b(B);
          },
          className: `${B === "" || B === V.name ? "rounded-l-md" : B === V.name ? "rounded-r-md -ml-px" : "-ml-px"} ${x === B ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : ""} cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900`,
          children: I
        },
        I
      )) }) })
    ] }),
    /* @__PURE__ */ d("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: [
      T && /* @__PURE__ */ n(ir, { className: "mb-3", errorSummary: T }),
      /* @__PURE__ */ d("div", { className: "bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [
        U.length > 0 && /* @__PURE__ */ d("form", { onSubmit: Q, children: [
          /* @__PURE__ */ n(
            St,
            {
              value: A,
              onChange: v,
              formLayout: U,
              api: M,
              hideSummary: !0,
              divideClass: "",
              spaceClass: "space-y-6"
            }
          ),
          /* @__PURE__ */ n("div", { className: "mt-8", children: /* @__PURE__ */ n(Mt, { className: "w-full", children: "Sign In" }) })
        ] }),
        w.length > 0 && /* @__PURE__ */ d("div", { className: "mt-6", children: [
          /* @__PURE__ */ d("div", { className: "relative", children: [
            /* @__PURE__ */ n("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ n("div", { className: "w-full border-t border-gray-300 dark:border-gray-600" }) }),
            /* @__PURE__ */ n("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ n("span", { className: "px-2 bg-white text-gray-500 dark:text-gray-400", children: "Or continue with" }) })
          ] }),
          /* @__PURE__ */ n("div", { className: "mt-6 grid grid-cols-3 gap-3", children: w.map((I) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
            "a",
            {
              href: `${y}${I.navItem.href}?continue=${g}`,
              title: D(I),
              className: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900",
              children: I.icon ? /* @__PURE__ */ n(Cn, { image: I.icon, className: "h-5 w-5 text-gray-700 dark:text-gray-200" }) : /* @__PURE__ */ d("svg", { className: "h-5 w-5 text-gray-700 dark:text-gray-200", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: [
                /* @__PURE__ */ n("path", { d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z", fill: "currentColor" }),
                /* @__PURE__ */ n("path", { d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z", fill: "currentColor" })
              ] })
            }
          ) }, I.name)) })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ n("div", { children: "No Auth Plugin" });
}
const ec = kt(
  ({ children: e, mobiletitlebar: t }, r) => {
    const { transition: s } = Qi(), [a, l] = $(!0), [i, o] = $(""), [c, m] = $(""), [h, p] = $(""), g = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, y = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, A = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    };
    function v(x) {
      s(g, o, x), s(y, m, x), s(A, p, x), setTimeout(() => l(x), 300);
    }
    function M() {
      v(!0);
    }
    function k() {
      v(!1);
    }
    return Ct(r, () => ({
      show: M,
      hide: k,
      toggle: v
    })), /* @__PURE__ */ d("div", { children: [
      a && /* @__PURE__ */ d("div", { className: "relative z-10 lg:hidden", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ n("div", { className: `fixed inset-0 bg-gray-900/80 ${i}` }),
        /* @__PURE__ */ n("div", { className: "fixed inset-0 flex", children: /* @__PURE__ */ d("div", { className: `relative mr-16 flex w-full max-w-xs flex-1 ${c}`, children: [
          /* @__PURE__ */ n("div", { className: `absolute left-full top-0 flex w-16 justify-center pt-5 ${h}`, children: /* @__PURE__ */ d("button", { type: "button", onClick: k, className: "-m-2.5 p-2.5", children: [
            /* @__PURE__ */ n("span", { className: "sr-only", children: "Close sidebar" }),
            /* @__PURE__ */ n("svg", { className: "h-6 w-6 text-white dark:text-black", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
          ] }) }),
          /* @__PURE__ */ n("div", { className: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2", children: e })
        ] }) })
      ] }),
      /* @__PURE__ */ n("div", { className: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col", children: /* @__PURE__ */ n("div", { className: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6", children: e }) }),
      /* @__PURE__ */ d("div", { className: "sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden", children: [
        /* @__PURE__ */ d("button", { type: "button", onClick: M, className: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden", children: [
          /* @__PURE__ */ n("span", { className: "sr-only", children: "Open sidebar" }),
          /* @__PURE__ */ n("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ n("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }) })
        ] }),
        t
      ] })
    ] });
  }
);
ec.displayName = "SidebarLayout";
function wc({ to: e, children: t, ...r }) {
  const { config: s } = Kt();
  return /* @__PURE__ */ n("a", { onClick: (l) => {
    l.preventDefault(), s.navigate(e ?? "/");
  }, title: e, href: "javascript:void(0)", ...r, children: t });
}
export {
  Xi as Alert,
  oc as AlertSuccess,
  Vt as ApiStateContext,
  gl as AutoCreateForm,
  Jo as AutoEditForm,
  pc as AutoForm,
  St as AutoFormFields,
  Yo as AutoQueryGrid,
  Xo as AutoViewForm,
  ml as Autocomplete,
  mc as Breadcrumb,
  fc as Breadcrumbs,
  Uo as CellFormat,
  _o as CheckboxInput,
  ns as ClientContext,
  Tn as CloseButton,
  hl as Combobox,
  Ir as ConfirmDelete,
  yc as DarkModeToggle,
  fl as DataGrid,
  Go as DynamicInput,
  il as EnsureAccess,
  Ks as EnsureAccessDialog,
  ir as ErrorSummary,
  Wo as FileInput,
  cl as FilterColumn,
  dl as FilterViews,
  _t as FormLoading,
  jr as HtmlFormat,
  Cn as Icon,
  cc as InputDescription,
  Ka as Loading,
  qo as LookupInput,
  Zo as MarkdownInput,
  Js as MarkupFormat,
  Xs as MarkupModel,
  ic as MetadataApp,
  vl as ModalDialog,
  Qt as ModalLookup,
  hc as NavList,
  gc as NavListItem,
  dc as OutlineButton,
  Ho as PreviewFormat,
  Mt as PrimaryButton,
  yl as QueryPrefs,
  wc as RouterLink,
  Rt as SecondaryButton,
  ol as SelectInput,
  ul as SettingsIcons,
  ec as SidebarLayout,
  xc as SignIn,
  Po as SlideOver,
  z as Sole,
  vc as Tabs,
  Qo as TagInput,
  is as TextInput,
  uc as TextLink,
  Ko as TextareaInput,
  lc as css,
  ls as useAuth,
  Zt as useClient,
  Kt as useConfig,
  li as useFiles,
  ac as useFormatters,
  dt as useMetadata,
  Qi as useUtils
};
