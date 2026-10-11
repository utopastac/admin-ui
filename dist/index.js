import { jsx as p, jsxs as M, Fragment as kt } from "react/jsx-runtime";
import Ve, { useState as U, useRef as Y, useEffect as ae, useCallback as K, forwardRef as No, createElement as lo, useId as mn, useMemo as Ht, useReducer as Rc, useImperativeHandle as Tc, createContext as Dc, useContext as Pc } from "react";
import Oc, { createPortal as Rr } from "react-dom";
const zc = "_avatar_17tt1_1", Bc = "_xs_17tt1_8", Fc = "_xl_17tt1_14", jc = "_sm_17tt1_20", Hc = "_md_17tt1_26", qc = "_lg_17tt1_32", Uc = "_image_17tt1_39", Wc = "_initials_17tt1_45", Ur = {
  avatar: zc,
  xs: Bc,
  xl: Fc,
  sm: jc,
  md: Hc,
  lg: qc,
  image: Uc,
  initials: Wc
}, Gc = {
  s: "sm",
  small: "sm",
  m: "md",
  medium: "md",
  l: "lg",
  large: "lg"
};
function ln(e, n) {
  return e === void 0 ? n : Gc[e] ?? e;
}
function Vc(e) {
  var t;
  const n = e.trim().split(/\s+/);
  return n.length === 1 ? ((t = n[0][0]) == null ? void 0 : t.toUpperCase()) ?? "" : (n[0][0] + n[n.length - 1][0]).toUpperCase();
}
const ja = ({
  src: e,
  name: n,
  size: t = "md",
  className: r = ""
}) => {
  const [i, o] = U(!1), s = e && !i, a = ln(t, "md");
  return /* @__PURE__ */ p("div", { className: `${Ur.avatar} ${Ur[a]} ${r}`, title: n, children: s ? /* @__PURE__ */ p("img", { src: e, alt: n, className: Ur.image, onError: () => o(!0) }) : /* @__PURE__ */ p("span", { className: Ur.initials, children: Vc(n) }) });
}, Xc = "_field_15wo2_1", Kc = "_fieldTop_15wo2_6", Yc = "_fieldLeft_15wo2_10", Zc = "_label_15wo2_15", Qc = "_sm_15wo2_20", Jc = "_lg_15wo2_26", eu = "_disabled_15wo2_31", Xn = {
  field: Xc,
  fieldTop: Kc,
  fieldLeft: Yc,
  label: Zc,
  sm: Qc,
  lg: Jc,
  disabled: eu
}, jn = ({
  label: e,
  size: n = "sm",
  labelPosition: t = "top",
  labelWidth: r,
  htmlFor: i,
  disabled: o = !1,
  children: s,
  className: a = ""
}) => /* @__PURE__ */ M("div", { className: `${Xn.field} ${t === "left" ? Xn.fieldLeft : Xn.fieldTop} ${o ? Xn.disabled : ""} ${a}`, children: [
  /* @__PURE__ */ p("label", { htmlFor: i, className: `${Xn.label} ${Xn[n]}`, style: r ? { width: r, flexShrink: 0 } : void 0, children: e }),
  s
] }), tu = "_wrapper_mit8j_1", nu = "_error_mit8j_12", ru = "_prefix_mit8j_17", iu = "_scrub_mit8j_26", ou = "_input_mit8j_30", pr = {
  wrapper: tu,
  error: nu,
  prefix: ru,
  scrub: iu,
  input: ou
}, Pt = ({
  prefix: e,
  prefixSlot: n,
  label: t,
  labelPosition: r = "top",
  type: i = "text",
  value: o,
  onChange: s,
  error: a = !1,
  min: c,
  max: l,
  step: u = 1,
  scrub: d = !1,
  labelWidth: h,
  onBlur: f,
  id: m,
  className: y = "",
  placeholder: _,
  width: b
}) => {
  const k = Y(null), g = Y({ onChange: s, min: c, max: l, step: u, value: o });
  g.current = { onChange: s, min: c, max: l, step: u, value: o }, ae(() => {
    const v = k.current;
    if (!v || !d) return;
    let w = 0, $ = 0;
    const A = (T) => {
      var x;
      const { onChange: L, min: j, max: F, step: I } = g.current, P = T.clientX - w, H = I < 1 ? I : 1;
      let B = $ + Math.round(P / 2) * H;
      B = Math.round(B / I) * I, j !== void 0 && (B = Math.max(j, B)), F !== void 0 && (B = Math.min(F, B));
      const O = I < 1 ? B.toFixed(((x = String(I).split(".")[1]) == null ? void 0 : x.length) || 2) : String(B);
      L(O);
    }, D = () => {
      document.removeEventListener("mousemove", A), document.removeEventListener("mouseup", D), document.body.style.cursor = "", document.body.style.userSelect = "";
    }, N = (T) => {
      T.preventDefault(), w = T.clientX, $ = parseFloat(g.current.value) || 0, document.body.style.cursor = "ew-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", A), document.addEventListener("mouseup", D);
    };
    return v.addEventListener("mousedown", N), () => {
      v.removeEventListener("mousedown", N), document.removeEventListener("mousemove", A), document.removeEventListener("mouseup", D);
    };
  }, [d]);
  const S = /* @__PURE__ */ M("div", { className: `${pr.wrapper} ${a ? pr.error : ""} ${t ? "" : y}`, style: b !== void 0 ? { width: b } : void 0, children: [
    /* @__PURE__ */ p(
      "span",
      {
        ref: k,
        className: `${pr.prefix} ${d ? pr.scrub : ""}`,
        children: n ?? e
      }
    ),
    /* @__PURE__ */ p(
      "input",
      {
        id: m,
        type: i,
        value: o,
        onChange: (v) => s(v.target.value),
        onBlur: f,
        className: pr.input,
        min: c,
        max: l,
        step: u,
        placeholder: _
      }
    )
  ] });
  return t ? /* @__PURE__ */ p(jn, { label: t, labelPosition: r, labelWidth: h, htmlFor: m, className: y, children: S }) : S;
}, su = "_fieldGroup_1skan_1", au = "_label_1skan_8", lu = "_errorText_1skan_13", cu = "_helperText_1skan_19", uu = "_disabled_1skan_25", hr = {
  fieldGroup: su,
  label: au,
  errorText: lu,
  helperText: cu,
  disabled: uu
}, An = ({
  label: e,
  htmlFor: n,
  error: t,
  helperText: r,
  disabled: i = !1,
  children: o,
  className: s = "",
  errorId: a,
  helperId: c
}) => /* @__PURE__ */ M("div", { className: `${hr.fieldGroup} ${i ? hr.disabled : ""} ${s}`.trim(), children: [
  e && /* @__PURE__ */ p("label", { htmlFor: n, className: hr.label, children: e }),
  o,
  t && /* @__PURE__ */ p("p", { id: a, className: hr.errorText, children: t }),
  r && !t && /* @__PURE__ */ p("p", { id: c, className: hr.helperText, children: r })
] }), du = "_popover_zb6dh_1", fu = {
  popover: du
}, At = 4;
function pu(e) {
  if (!e) return window;
  let n = e.parentElement;
  for (; n; ) {
    const { overflow: t, overflowY: r, overflowX: i } = window.getComputedStyle(n);
    if (/auto|scroll/.test(t + r + i))
      return n;
    n = n.parentElement;
  }
  return window;
}
const Ct = ({
  isOpen: e,
  onClose: n,
  anchorRef: t,
  children: r,
  className: i,
  matchWidth: o = !1,
  overlap: s = !1,
  offsetX: a = 0,
  offsetY: c = 0,
  role: l,
  "aria-label": u
}) => {
  const d = Y(null), [h, f] = U(null), m = K(() => {
    const y = t.current, _ = d.current;
    if (!y || !_) return;
    const b = y.getBoundingClientRect(), k = _.offsetHeight, g = window.innerHeight;
    let S;
    if (s)
      g - b.top - At >= k ? S = b.top : S = Math.max(At, g - k - At);
    else {
      const A = g - b.bottom - At, D = b.top - At;
      A >= k ? S = b.bottom + At : D >= k ? S = b.top - k - At : S = Math.max(At, g - k - At);
    }
    S += c;
    const v = _.offsetWidth, w = window.innerWidth;
    let $ = b.left + a;
    $ + v > w - At && ($ = Math.max(At, w - v - At)), f({
      top: `${S}px`,
      left: `${$}px`,
      ...o ? { width: `${b.width}px` } : {},
      maxHeight: `${g - At * 2}px`
    });
  }, [t, o, s, a, c]);
  return ae(() => {
    if (!e) {
      f(null);
      return;
    }
    if (o && t.current && d.current) {
      const g = t.current.getBoundingClientRect().width;
      d.current.style.width = `${g}px`;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(m);
    });
    const y = () => m(), _ = pu(t.current);
    _.addEventListener("scroll", y), window.addEventListener("resize", y);
    let b = null;
    const k = new ResizeObserver(() => {
      b === null && (b = requestAnimationFrame(() => {
        b = null, m();
      }));
    });
    return d.current && k.observe(d.current), () => {
      _.removeEventListener("scroll", y), window.removeEventListener("resize", y), k.disconnect(), b !== null && cancelAnimationFrame(b);
    };
  }, [e, m, o, t]), ae(() => {
    if (!e) return;
    const y = document.activeElement, _ = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const b = d.current;
        if (!b) return;
        const k = b.querySelector(_);
        k == null || k.focus();
      });
    }), () => {
      y == null || y.focus();
    };
  }, [e]), ae(() => {
    if (!e) return;
    const y = (b) => {
      var g, S;
      const k = b.target;
      (g = t.current) != null && g.contains(k) || (S = d.current) != null && S.contains(k) || k instanceof Element && k.closest("[data-admin-popover]") || n();
    }, _ = (b) => {
      b.key === "Escape" && n();
    };
    return document.addEventListener("mousedown", y), document.addEventListener("keydown", _), () => {
      document.removeEventListener("mousedown", y), document.removeEventListener("keydown", _);
    };
  }, [e, n, t]), e ? Rr(
    /* @__PURE__ */ p(
      "div",
      {
        ref: d,
        className: `${fu.popover} ${i || ""}`,
        style: h ?? { top: -9999, left: -9999 },
        role: l,
        "aria-label": u,
        "data-admin-popover": !0,
        children: r
      }
    ),
    document.body
  ) : null;
};
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hu = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ha = (...e) => e.filter((n, t, r) => !!n && r.indexOf(n) === t).join(" ");
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var mu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gu = No(
  ({
    color: e = "currentColor",
    size: n = 24,
    strokeWidth: t = 2,
    absoluteStrokeWidth: r,
    className: i = "",
    children: o,
    iconNode: s,
    ...a
  }, c) => lo(
    "svg",
    {
      ref: c,
      ...mu,
      width: n,
      height: n,
      stroke: e,
      strokeWidth: r ? Number(t) * 24 / Number(n) : t,
      className: Ha("lucide", i),
      ...a
    },
    [
      ...s.map(([l, u]) => lo(l, u)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = (e, n) => {
  const t = No(
    ({ className: r, ...i }, o) => lo(gu, {
      ref: o,
      iconNode: n,
      className: Ha(`lucide-${hu(e)}`, r),
      ...i
    })
  );
  return t.displayName = `${e}`, t;
};
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _u = xe("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bu = xe("ArrowLeftRight", [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yu = xe("ArrowUpDown", [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ku = xe("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wu = xe("Bold", [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const co = xe("BoxSelect", [
  ["path", { d: "M5 3a2 2 0 0 0-2 2", key: "y57alp" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2", key: "18rm91" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2", key: "1j7049" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
  ["path", { d: "M9 3h1", key: "1yesri" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M14 3h1", key: "1ec4yj" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M3 9v1", key: "1r0deq" }],
  ["path", { d: "M21 9v1", key: "mxsmne" }],
  ["path", { d: "M3 14v1", key: "vnatye" }],
  ["path", { d: "M21 14v1", key: "169vum" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xu = xe("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $o = xe("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gi = xe("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Io = xe("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ao = xe("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vu = xe("CircleCheckBig", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hs = xe("CircleDashed", [
  ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0", key: "5ilxe3" }],
  ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0", key: "11zvb9" }],
  ["path", { d: "M17.609 3.721a10 10 0 0 1 2.69 2.7", key: "1iw5b2" }],
  ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8", key: "c0bmvh" }],
  ["path", { d: "M20.279 17.609a10 10 0 0 1-2.7 2.69", key: "1ruxm7" }],
  ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8", key: "qkgqxc" }],
  ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69", key: "1mcia2" }],
  ["path", { d: "M6.391 20.279a10 10 0 0 1-2.69-2.7", key: "1fvljs" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eu = xe("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Su = xe("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cu = xe("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qa = xe("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nu = xe("Eraser", [
  [
    "path",
    {
      d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",
      key: "182aya"
    }
  ],
  ["path", { d: "M22 21H7", key: "t4ddhn" }],
  ["path", { d: "m5 11 9 9", key: "1mo9qw" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ua = xe("FileCode", [
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z", key: "1mlx9k" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wa = xe("FileImage", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $u = xe("Grid3x3", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iu = xe("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Au = xe("Italic", [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mu = xe("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lu = xe("ListFilter", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ru = xe("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tu = xe("PaintBucket", [
  [
    "path",
    { d: "m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z", key: "irua1i" }
  ],
  ["path", { d: "m5 2 5 5", key: "1lls2c" }],
  ["path", { d: "M2 13h15", key: "1hkzvu" }],
  ["path", { d: "M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z", key: "xk76lq" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Du = xe("PanelLeftClose", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pu = xe("PanelLeftOpen", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ou = xe("PenTool", [
  [
    "path",
    {
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
      key: "nt11vn"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
      key: "15qc1e"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
  ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zu = xe("Pencil", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bu = xe("Pipette", [
  ["path", { d: "m2 22 1-1h3l9-9", key: "1sre89" }],
  ["path", { d: "M3 21v-3l9-9", key: "hpe2y6" }],
  [
    "path",
    {
      d: "m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z",
      key: "196du1"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fu = xe("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ga = xe("Redo2", [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ju = xe("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hu = xe("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mo = xe("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Va = xe("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qu = xe("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xa = xe("Undo2", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ms = xe("WandSparkles", [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lr = xe("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), li = ({
  label: e,
  labelPosition: n,
  labelWidth: t,
  htmlFor: r,
  disabled: i,
  error: o,
  helperText: s,
  children: a
}) => n === "left" && e ? /* @__PURE__ */ p(jn, { label: e, labelPosition: "left", labelWidth: t, htmlFor: r, disabled: i, children: a }) : /* @__PURE__ */ p(An, { label: e, htmlFor: r, error: o, helperText: s, disabled: i, children: a }), Uu = "_container_ei498_1", Wu = "_trigger_ei498_8", Gu = "_open_ei498_31", Vu = "_sm_ei498_41", Xu = "_md_ei498_47", Ku = "_triggerContent_ei498_55", Yu = "_accessory_ei498_64", Zu = "_selectedText_ei498_71", Qu = "_placeholder_ei498_75", Ju = "_chevron_ei498_80", ed = "_chevronOpen_ei498_86", td = "_dropdown_ei498_91", nd = "_option_ei498_99", rd = "_optionSelected_ei498_128", id = "_optionDisabled_ei498_134", od = "_optionLabel_ei498_140", sd = "_optionDescription_ei498_147", ad = "_checkIcon_ei498_156", nt = {
  container: Uu,
  trigger: Wu,
  open: Gu,
  sm: Vu,
  md: Xu,
  triggerContent: Ku,
  accessory: Yu,
  selectedText: Zu,
  placeholder: Qu,
  chevron: Ju,
  chevronOpen: ed,
  dropdown: td,
  option: nd,
  optionSelected: rd,
  optionDisabled: id,
  optionLabel: od,
  optionDescription: sd,
  checkIcon: ad
}, Lo = ({
  options: e,
  value: n,
  onChange: t,
  placeholder: r = "Select...",
  disabled: i = !1,
  size: o = "md",
  className: s = "",
  label: a,
  labelPosition: c,
  labelWidth: l,
  error: u,
  helperText: d,
  id: h
}) => {
  const [f, m] = U(!1), [y, _] = U(-1), b = Y(null), k = Y(null), g = Y(null), S = ln(o, "md"), v = mn(), w = e.find((I) => I.value === n), $ = (I) => `${v}-option-${I}`, A = K(() => {
    if (i) return;
    const I = e.findIndex((P) => P.value === n && !P.disabled);
    _(I >= 0 ? I : e.findIndex((P) => !P.disabled)), m(!0);
  }, [i, e, n]), D = K(() => {
    m(!1), _(-1);
  }, []), N = () => {
    f ? D() : A();
  }, T = K((I) => {
    var P;
    t(I), D(), (P = k.current) == null || P.focus();
  }, [t, D]);
  ae(() => {
    var I;
    if (f && y >= 0 && g.current) {
      const P = g.current.querySelector(
        `[id="${$((I = e[y]) == null ? void 0 : I.value)}"]`
      );
      P == null || P.focus();
    }
  }, [f, y]);
  const L = K(
    (I) => {
      var B, O;
      const P = e.map((x, X) => ({ opt: x, idx: X })).filter(({ opt: x }) => !x.disabled).map(({ idx: x }) => x);
      if (P.length === 0) return;
      const H = P.indexOf(y);
      switch (I.key) {
        case "ArrowDown": {
          I.preventDefault();
          const x = H < P.length - 1 ? H + 1 : 0;
          _(P[x]);
          break;
        }
        case "ArrowUp": {
          I.preventDefault();
          const x = H > 0 ? H - 1 : P.length - 1;
          _(P[x]);
          break;
        }
        case "Home": {
          I.preventDefault(), _(P[0]);
          break;
        }
        case "End": {
          I.preventDefault(), _(P[P.length - 1]);
          break;
        }
        case "Enter":
        case " ": {
          I.preventDefault(), y >= 0 && !((B = e[y]) != null && B.disabled) && T(e[y].value);
          break;
        }
        case "Escape": {
          I.preventDefault(), D(), (O = k.current) == null || O.focus();
          break;
        }
        case "Tab": {
          D();
          break;
        }
      }
    },
    [e, y, D, T]
  ), j = S === "sm" ? 14 : 16, F = /* @__PURE__ */ M(
    "div",
    {
      ref: b,
      className: `${nt.container} ${s}`,
      children: [
        /* @__PURE__ */ M(
          "button",
          {
            ref: k,
            type: "button",
            className: `${nt.trigger} ${nt[S]} ${f ? nt.open : ""}`,
            onClick: N,
            disabled: i,
            "aria-haspopup": "listbox",
            "aria-expanded": f,
            "aria-controls": v,
            id: h,
            children: [
              /* @__PURE__ */ M("span", { className: nt.triggerContent, children: [
                (w == null ? void 0 : w.start) && /* @__PURE__ */ p("span", { className: nt.accessory, "aria-hidden": "true", children: w.start }),
                /* @__PURE__ */ p("span", { className: w ? nt.selectedText : nt.placeholder, children: w ? w.label : r })
              ] }),
              /* @__PURE__ */ p("span", { "aria-hidden": "true", children: /* @__PURE__ */ p(
                gi,
                {
                  size: j,
                  className: `${nt.chevron} ${f ? nt.chevronOpen : ""}`
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ p(
          Ct,
          {
            isOpen: f,
            onClose: D,
            anchorRef: b,
            className: nt.dropdown,
            matchWidth: !0,
            role: "listbox",
            "aria-label": a ?? r,
            children: /* @__PURE__ */ p(
              "div",
              {
                ref: g,
                id: v,
                role: "listbox",
                "aria-label": a ?? r,
                onKeyDown: L,
                children: e.map((I, P) => /* @__PURE__ */ M(
                  "button",
                  {
                    id: $(I.value),
                    type: "button",
                    role: "option",
                    "aria-selected": I.value === n,
                    className: `${nt.option} ${nt[S]} ${I.value === n ? nt.optionSelected : ""} ${I.disabled ? nt.optionDisabled : ""}`,
                    onClick: () => {
                      I.disabled || T(I.value);
                    },
                    disabled: I.disabled,
                    tabIndex: P === y ? 0 : -1,
                    children: [
                      I.start && /* @__PURE__ */ p("span", { className: nt.accessory, "aria-hidden": "true", children: I.start }),
                      /* @__PURE__ */ M("span", { className: nt.optionLabel, children: [
                        I.label,
                        I.description && /* @__PURE__ */ p("span", { className: nt.optionDescription, children: I.description })
                      ] }),
                      I.value === n && /* @__PURE__ */ p("span", { "aria-hidden": "true", children: /* @__PURE__ */ p($o, { size: j, className: nt.checkIcon }) })
                    ]
                  },
                  I.value
                ))
              }
            )
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ p(li, { label: a, labelPosition: c, labelWidth: l, htmlFor: h, disabled: i, error: u, helperText: d, children: F });
}, ld = "_canvas_p80dg_1", cd = {
  canvas: ld
}, Ci = "var(--admin-border-highlight)", gs = "var(--admin-border-highlight)", ud = "var(--admin-surface-info-secondary)", dd = "var(--admin-surface-info-secondary)", _s = "var(--admin-surface-primary)", bs = "var(--admin-border-highlight)", ys = 4, ks = 5, uo = 200, fo = 200, _i = 50, Ro = _i, To = _i, Do = uo - _i * 2, Po = fo - _i * 2;
function Wr(e, n) {
  return {
    x: Ro + e * Do,
    y: To + (1 - n) * Po
  };
}
function fd(e, n) {
  return {
    vx: (e - Ro) / Do,
    vy: 1 - (n - To) / Po
  };
}
const pd = ({ value: e, onChange: n }) => {
  const t = Y(null), r = Y(null), [i, o, s, a] = e, c = Wr(0, 0), l = Wr(1, 1), u = Wr(i, o), d = Wr(s, a), h = (y) => (_) => {
    _.currentTarget.setPointerCapture(_.pointerId), r.current = y;
  }, f = (y) => {
    if (!r.current || !t.current) return;
    const _ = t.current.getBoundingClientRect(), b = uo / _.width, k = fo / _.height, g = (y.clientX - _.left) * b, S = (y.clientY - _.top) * k, { vx: v, vy: w } = fd(g, S), $ = Math.max(0, Math.min(1, v));
    r.current === "p1" ? n([$, w, e[2], e[3]]) : n([e[0], e[1], $, w]);
  }, m = () => {
    r.current = null;
  };
  return /* @__PURE__ */ M(
    "svg",
    {
      ref: t,
      viewBox: `0 0 ${uo} ${fo}`,
      className: cd.canvas,
      onPointerMove: f,
      onPointerUp: m,
      children: [
        /* @__PURE__ */ p(
          "rect",
          {
            x: Ro,
            y: To,
            width: Do,
            height: Po,
            fill: "none",
            stroke: ud,
            strokeDasharray: "4 3"
          }
        ),
        /* @__PURE__ */ p(
          "line",
          {
            x1: c.x,
            y1: c.y,
            x2: l.x,
            y2: l.y,
            stroke: dd,
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ p(
          "line",
          {
            x1: c.x,
            y1: c.y,
            x2: u.x,
            y2: u.y,
            stroke: gs,
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ p(
          "line",
          {
            x1: l.x,
            y1: l.y,
            x2: d.x,
            y2: d.y,
            stroke: gs,
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ p(
          "path",
          {
            d: `M ${c.x} ${c.y} C ${u.x} ${u.y}, ${d.x} ${d.y}, ${l.x} ${l.y}`,
            fill: "none",
            stroke: Ci,
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ p(
          "circle",
          {
            cx: c.x,
            cy: c.y,
            r: ys,
            fill: _s,
            stroke: bs,
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ p(
          "circle",
          {
            cx: l.x,
            cy: l.y,
            r: ys,
            fill: _s,
            stroke: bs,
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ p(
          "circle",
          {
            cx: u.x,
            cy: u.y,
            r: ks,
            fill: Ci,
            style: { cursor: "grab" },
            onPointerDown: h("p1")
          }
        ),
        /* @__PURE__ */ p(
          "circle",
          {
            cx: d.x,
            cy: d.y,
            r: ks,
            fill: Ci,
            style: { cursor: "grab" },
            onPointerDown: h("p2")
          }
        )
      ]
    }
  );
}, hd = "_toolbarButton_1l0xe_1", md = "_pressed_1l0xe_19", gd = "_selected_1l0xe_29", _d = "_inUse_1l0xe_41", bd = "_sm_1l0xe_53", yd = "_md_1l0xe_67", mr = {
  toolbarButton: hd,
  pressed: md,
  selected: gd,
  inUse: _d,
  sm: bd,
  md: yd
}, kd = "_wrapper_s1588_1", wd = "_tooltip_s1588_5", xd = "_top_s1588_24", vd = "_bottom_s1588_30", Ed = "_left_s1588_36", Sd = "_right_s1588_42", Ni = {
  wrapper: kd,
  tooltip: wd,
  top: xd,
  bottom: vd,
  left: Ed,
  right: Sd
}, Gr = 6;
function Cd(e, n) {
  switch (n) {
    case "bottom":
      return { top: e.bottom + Gr, left: e.left + e.width / 2, transform: "translateX(-50%)" };
    case "left":
      return { top: e.top + e.height / 2, left: e.left - Gr, transform: "translate(-100%, -50%)" };
    case "right":
      return { top: e.top + e.height / 2, left: e.right + Gr, transform: "translateY(-50%)" };
    default:
      return { top: e.top - Gr, left: e.left + e.width / 2, transform: "translate(-50%, -100%)" };
  }
}
function Oo({
  content: e,
  placement: n = "top",
  delay: t = 0,
  children: r,
  className: i
}) {
  const [o, s] = U(!1), [a, c] = U({ top: 0, left: 0, transform: "" }), l = Y(), u = Y(null), d = mn(), h = K(() => {
    const m = () => {
      var _;
      const y = ((_ = u.current) == null ? void 0 : _.firstElementChild) ?? u.current;
      if (y) {
        const b = y.getBoundingClientRect();
        c(Cd(b, n));
      }
      s(!0);
    };
    t > 0 ? l.current = setTimeout(m, t) : m();
  }, [t, n]), f = K(() => {
    clearTimeout(l.current), s(!1);
  }, []);
  return /* @__PURE__ */ M(kt, { children: [
    /* @__PURE__ */ p(
      "span",
      {
        ref: u,
        className: `${Ni.wrapper}${i ? ` ${i}` : ""}`,
        onMouseEnter: h,
        onMouseLeave: f,
        onFocus: h,
        onBlur: f,
        children: Ve.cloneElement(r, o ? { "aria-describedby": d } : {})
      }
    ),
    o && Rr(
      /* @__PURE__ */ p(
        "span",
        {
          id: d,
          role: "tooltip",
          className: `${Ni.tooltip} ${Ni[n]}`,
          style: { top: a.top, left: a.left, transform: a.transform },
          children: e
        }
      ),
      document.body
    )
  ] });
}
const ze = ({
  icon: e,
  onClick: n,
  size: t = "md",
  pressed: r,
  inUse: i,
  selected: o,
  "aria-label": s,
  title: a,
  tooltip: c,
  className: l = "",
  disabled: u,
  ...d
}) => {
  const h = ln(t, "md"), f = h === "sm" ? 16 : 20, m = r !== void 0, y = Object.fromEntries(
    Object.entries(d).filter(([k]) => k.startsWith("data-"))
  ), _ = /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: `${mr.toolbarButton} ${mr[h]} ${r ? mr.pressed : ""} ${i ? mr.inUse : ""} ${o ? mr.selected : ""} ${l}`,
      onClick: n,
      disabled: u,
      "aria-label": s,
      "aria-pressed": m ? r : void 0,
      title: a,
      ...y,
      children: /* @__PURE__ */ p(e, { size: f })
    }
  );
  return c ? /* @__PURE__ */ p(Oo, { ...typeof c == "string" ? { content: c } : c, children: _ }) : _;
}, Nd = "_previewContainer_1yfcm_1", $d = "_previewTrack_1yfcm_8", Id = "_previewBox_1yfcm_18", $i = {
  previewContainer: Nd,
  previewTrack: $d,
  previewBox: Id
}, Ad = ({ duration: e, timingFunction: n }) => {
  const t = Y(null), r = K(() => {
    const i = t.current;
    i && (i.style.transition = "none", i.style.left = "var(--admin-space-xs)", i.getBoundingClientRect(), i.style.transition = `left ${e}ms ${n}`, i.style.left = "calc(100% - var(--admin-space-xl))");
  }, [e, n]);
  return ae(() => {
    const i = setTimeout(r, 300);
    return () => clearTimeout(i);
  }, [r]), /* @__PURE__ */ M("div", { className: $i.previewContainer, children: [
    /* @__PURE__ */ p("div", { className: $i.previewTrack, children: /* @__PURE__ */ p("div", { ref: t, className: $i.previewBox }) }),
    /* @__PURE__ */ p(ze, { icon: Hu, onClick: r, size: "sm", "aria-label": "Replay preview" })
  ] });
}, Md = "_inputRow_nwwav_1", Ld = "_triggerInput_nwwav_8", Rd = "_triggerValue_nwwav_32", Td = "_dropdown_nwwav_39", Dd = "_panel_nwwav_44", Pd = "_row_nwwav_52", Od = "_rowFill_nwwav_58", zd = "_fillInput_nwwav_64", Bd = "_bezierSection_nwwav_74", Fd = "_bezierReadout_nwwav_81", jd = "_bezierInputs_nwwav_89", Mt = {
  inputRow: Md,
  triggerInput: Ld,
  triggerValue: Rd,
  dropdown: Td,
  panel: Dd,
  row: Pd,
  rowFill: Od,
  fillInput: zd,
  bezierSection: Bd,
  bezierReadout: Fd,
  bezierInputs: jd
}, Hd = [
  { value: "linear", label: "Linear" },
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease in" },
  { value: "ease-out", label: "Ease out" },
  { value: "ease-in-out", label: "Ease in out" },
  { value: "ios", label: "iOS" },
  { value: "custom", label: "Custom bezier" }
], ci = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  ios: [0.25, 0.46, 0.45, 0.94],
  custom: [0.25, 0.1, 0.25, 1]
};
function ws(e) {
  const n = {
    duration: 300,
    easing: "ease-out",
    bezier: [0.25, 0.1, 0.25, 1]
  };
  if (!(e != null && e.trim())) return n;
  const t = e.trim(), r = t.match(/(\d+(?:\.\d+)?)(ms|s)/);
  let i = n.duration;
  if (r) {
    const a = parseFloat(r[1]);
    i = r[2] === "s" ? Math.round(a * 1e3) : Math.round(a);
  }
  const o = t.match(/cubic-bezier\(\s*([\d.+-]+)\s*,\s*([\d.+-]+)\s*,\s*([\d.+-]+)\s*,\s*([\d.+-]+)\s*\)/);
  if (o) {
    const a = [
      parseFloat(o[1]),
      parseFloat(o[2]),
      parseFloat(o[3]),
      parseFloat(o[4])
    ], c = ci.ios, l = a.every((u, d) => u === c[d]);
    return { duration: i, easing: l ? "ios" : "custom", bezier: a };
  }
  const s = ["ease-in-out", "ease-in", "ease-out", "ease", "linear"];
  for (const a of s)
    if (t.includes(a))
      return {
        duration: i,
        easing: a,
        bezier: ci[a]
      };
  return n;
}
function qd(e) {
  if (e.easing === "custom" || e.easing === "ios") {
    const [n, t, r, i] = e.bezier;
    return `${e.duration}ms cubic-bezier(${n}, ${t}, ${r}, ${i})`;
  }
  return `${e.duration}ms ${e.easing}`;
}
const K$ = ({
  value: e,
  onChange: n,
  onChangeState: t,
  inline: r = !1,
  label: i,
  labelPosition: o = "top",
  labelWidth: s,
  id: a,
  offsetX: c = 0,
  offsetY: l = 0
}) => {
  const [u, d] = U(
    () => ws(e ?? "")
  ), [h, f] = U(!1), m = Y(null);
  ae(() => {
    d(ws(e ?? ""));
  }, [e]);
  const y = K(
    ($) => {
      d($), n(qd($)), t == null || t($);
    },
    [n, t]
  ), _ = ($) => {
    const A = parseInt($, 10), D = isNaN(A) ? 0 : Math.max(0, Math.min(9999, A));
    y({ ...u, duration: D });
  }, b = ($) => {
    const A = $;
    let D = u.bezier;
    A === "custom" && (D = ci[u.easing] ?? ci.custom), y({ ...u, easing: A, bezier: D });
  }, k = ($) => {
    y({ ...u, bezier: $ });
  }, g = ($, A) => {
    const D = parseFloat(A);
    if (isNaN(D)) return;
    const N = [0, -2, 0, -2], T = [1, 3, 1, 3], L = Math.max(N[$], Math.min(T[$], D)), j = [...u.bezier];
    j[$] = L, y({ ...u, bezier: j });
  }, S = u.easing === "custom" || u.easing === "ios" ? `cubic-bezier(${u.bezier.join(", ")})` : u.easing, v = /* @__PURE__ */ M("div", { className: Mt.panel, children: [
    /* @__PURE__ */ p("div", { className: Mt.row, children: /* @__PURE__ */ p("div", { className: Mt.rowFill, children: /* @__PURE__ */ p(
      Lo,
      {
        options: Hd,
        value: u.easing,
        onChange: b,
        labelPosition: "left",
        labelWidth: 56,
        label: "Curve",
        size: "sm"
      }
    ) }) }),
    u.easing === "custom" && /* @__PURE__ */ M("div", { className: Mt.bezierSection, children: [
      /* @__PURE__ */ p(pd, { value: u.bezier, onChange: k }),
      /* @__PURE__ */ p("div", { className: Mt.bezierReadout, children: /* @__PURE__ */ p(jn, { label: "Bezier", labelPosition: "left", labelWidth: 56, className: Mt.rowFill, children: /* @__PURE__ */ p("div", { className: Mt.bezierInputs, children: u.bezier.map(($, A) => /* @__PURE__ */ p(
        Pt,
        {
          type: "number",
          value: String(parseFloat($.toFixed(2))),
          onChange: (D) => g(A, D),
          step: 0.01,
          min: [0, -2, 0, -2][A],
          max: [1, 3, 1, 3][A],
          prefix: "",
          width: 44
        },
        A
      )) }) }) })
    ] }),
    /* @__PURE__ */ p("div", { className: Mt.row, children: /* @__PURE__ */ p(
      Pt,
      {
        className: Mt.fillInput,
        type: "number",
        value: String(u.duration),
        onChange: _,
        min: 0,
        max: 9999,
        prefix: "ms",
        labelPosition: "left",
        labelWidth: 56,
        label: "Duration",
        scrub: !0
      }
    ) }),
    /* @__PURE__ */ p(Ad, { duration: u.duration, timingFunction: S })
  ] });
  if (r)
    return i && o === "left" ? /* @__PURE__ */ p(jn, { label: i, labelPosition: "left", labelWidth: s, htmlFor: a, children: v }) : /* @__PURE__ */ p(An, { label: i, htmlFor: a, children: v });
  const w = /* @__PURE__ */ M("div", { className: Mt.inputRow, children: [
    /* @__PURE__ */ p(
      "button",
      {
        ref: m,
        className: Mt.triggerInput,
        onClick: () => f(($) => !$),
        type: "button",
        id: a,
        children: /* @__PURE__ */ p("span", { className: Mt.triggerValue, children: e || "300ms ease-out" })
      }
    ),
    /* @__PURE__ */ p(
      Ct,
      {
        isOpen: h,
        onClose: () => f(!1),
        anchorRef: m,
        className: Mt.dropdown,
        role: "dialog",
        "aria-label": "Animation picker",
        offsetX: c,
        offsetY: l,
        children: v
      }
    )
  ] });
  return i && o === "left" ? /* @__PURE__ */ p(jn, { label: i, labelPosition: "left", labelWidth: s, htmlFor: a, children: w }) : /* @__PURE__ */ p(An, { label: i, htmlFor: a, children: w });
}, Ud = "_badge_1jkaz_1", Wd = "_sm_1jkaz_11", Gd = "_md_1jkaz_16", Vd = "_success_1jkaz_27", Xd = "_warning_1jkaz_32", Kd = "_info_1jkaz_37", Ii = {
  badge: Ud,
  sm: Wd,
  md: Gd,
  default: "_default_1jkaz_22",
  success: Vd,
  warning: Xd,
  info: Kd
}, Y$ = ({
  variant: e = "default",
  size: n = "md",
  children: t,
  className: r = ""
}) => {
  const i = ln(n, "md");
  return /* @__PURE__ */ p("span", { className: `${Ii.badge} ${Ii[e]} ${Ii[i]} ${r}`, children: t });
}, Yd = "_banner_d4n89_1", Zd = "_inline_d4n89_14", Qd = "_full_d4n89_18", Jd = "_info_d4n89_30", ef = "_success_d4n89_36", tf = "_warning_d4n89_42", nf = "_error_d4n89_48", rf = "_icon_d4n89_56", of = "_content_d4n89_65", sf = "_title_d4n89_73", af = "_message_d4n89_77", lf = "_dismiss_d4n89_84", wn = {
  banner: Yd,
  inline: Zd,
  full: Qd,
  default: "_default_d4n89_24",
  info: Jd,
  success: ef,
  warning: tf,
  error: nf,
  icon: rf,
  content: of,
  title: sf,
  message: af,
  dismiss: lf
};
function Z$({
  variant: e,
  message: n,
  title: t,
  icon: r,
  dismissible: i = !1,
  onDismiss: o,
  layout: s = "inline",
  className: a = ""
}) {
  const [c, l] = U(!0);
  if (!c) return null;
  const u = [
    wn.banner,
    wn[e],
    wn[s],
    a
  ].filter(Boolean).join(" ");
  function d() {
    l(!1), o == null || o();
  }
  return /* @__PURE__ */ M("div", { role: "alert", className: u, children: [
    r && /* @__PURE__ */ p("span", { className: wn.icon, children: /* @__PURE__ */ p(r, { size: 18 }) }),
    /* @__PURE__ */ M("div", { className: wn.content, children: [
      t && /* @__PURE__ */ p("strong", { className: wn.title, children: t }),
      /* @__PURE__ */ p("p", { className: wn.message, children: n })
    ] }),
    i && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: wn.dismiss,
        "aria-label": "Dismiss",
        onClick: d,
        children: /* @__PURE__ */ p(lr, { size: 16 })
      }
    )
  ] });
}
const cf = "_blockquote_otdsv_1", uf = "_content_otdsv_9", df = "_cite_otdsv_17", Ai = {
  blockquote: cf,
  content: uf,
  cite: df
}, Q$ = ({
  children: e,
  cite: n,
  className: t = ""
}) => {
  const r = [Ai.blockquote, t].filter(Boolean).join(" ");
  return /* @__PURE__ */ M("blockquote", { className: r, children: [
    /* @__PURE__ */ p("div", { className: Ai.content, children: e }),
    n && /* @__PURE__ */ M("footer", { className: Ai.cite, children: [
      "— ",
      n
    ] })
  ] });
}, ff = "_breadcrumb_1c1a8_1", pf = "_list_1c1a8_5", hf = "_item_1c1a8_13", mf = "_link_1c1a8_18", gf = "_current_1c1a8_33", _f = "_separator_1c1a8_38", xn = {
  breadcrumb: ff,
  list: pf,
  item: hf,
  link: mf,
  current: gf,
  separator: _f
}, J$ = ({
  items: e,
  separator: n = "/",
  className: t = ""
}) => /* @__PURE__ */ p("nav", { "aria-label": "Breadcrumb", className: `${xn.breadcrumb} ${t}`, children: /* @__PURE__ */ p("ol", { className: xn.list, children: e.map((r, i) => {
  const o = i === e.length - 1;
  return /* @__PURE__ */ M("li", { className: xn.item, children: [
    o ? /* @__PURE__ */ p("span", { className: xn.current, "aria-current": "page", children: r.label }) : r.href ? /* @__PURE__ */ p(
      "a",
      {
        href: r.href,
        className: xn.link,
        onClick: r.onClick,
        children: r.label
      }
    ) : r.onClick ? /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: xn.link,
        onClick: r.onClick,
        children: r.label
      }
    ) : /* @__PURE__ */ p("span", { className: xn.link, children: r.label }),
    !o && /* @__PURE__ */ p("span", { className: xn.separator, "aria-hidden": "true", children: n })
  ] }, i);
}) }) }), bf = "_list_1cqdw_1", yf = "_md_1cqdw_11", kf = "_sm_1cqdw_15", wf = "_item_1cqdw_20", Mi = {
  list: bf,
  md: yf,
  sm: kf,
  item: wf
}, eI = ({
  items: e,
  size: n = "md",
  className: t = ""
}) => {
  const r = [Mi.list, Mi[n], t].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("ul", { className: r, children: e.map((i, o) => /* @__PURE__ */ p("li", { className: Mi.item, children: i }, o)) });
}, xf = "_button_15jhx_1", vf = "_sm_15jhx_19", Ef = "_md_15jhx_24", Sf = "_lg_15jhx_29", Cf = "_primary_15jhx_35", Nf = "_secondary_15jhx_44", $f = "_ghost_15jhx_54", Li = {
  button: xf,
  sm: vf,
  md: Ef,
  lg: Sf,
  primary: Cf,
  secondary: Nf,
  ghost: $f
}, tI = ({
  variant: e = "primary",
  size: n = "md",
  disabled: t = !1,
  children: r,
  onClick: i,
  type: o = "button",
  className: s = "",
  "aria-label": a,
  tooltip: c,
  startIcon: l,
  endIcon: u
}) => {
  const d = ln(n, "md"), h = d === "sm" ? 14 : d === "lg" ? 20 : 16, f = /* @__PURE__ */ M(
    "button",
    {
      className: `${Li.button} ${Li[e]} ${Li[d]} ${s}`,
      onClick: i,
      disabled: t,
      type: o,
      "aria-label": a,
      children: [
        l && /* @__PURE__ */ p(l, { size: h, "aria-hidden": !0 }),
        r,
        u && /* @__PURE__ */ p(u, { size: h, "aria-hidden": !0 })
      ]
    }
  );
  return c ? /* @__PURE__ */ p(Oo, { ...typeof c == "string" ? { content: c } : c, children: f }) : f;
}, If = "_buttonGroup_ik7fp_1", Af = "_start_ik7fp_5", Mf = "_center_ik7fp_9", Lf = "_end_ik7fp_13", xs = {
  buttonGroup: If,
  start: Af,
  center: Mf,
  end: Lf
}, nI = ({
  children: e,
  align: n = "end",
  className: t = "",
  "aria-label": r
}) => /* @__PURE__ */ p(
  "div",
  {
    role: "group",
    "aria-label": r,
    className: `${xs.buttonGroup} ${xs[n]} ${t}`,
    children: e
  }
), Rf = "_card_1uo8k_1", Tf = "_hoverable_1uo8k_8", Df = "_active_1uo8k_16", Ri = {
  card: Rf,
  hoverable: Tf,
  active: Df
}, rI = ({
  children: e,
  active: n = !1,
  hoverable: t = !0,
  onClick: r,
  className: i = ""
}) => {
  const o = [
    Ri.card,
    n && Ri.active,
    t && Ri.hoverable,
    i
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: o, onClick: r, children: e });
}, Pf = "_carousel_k6wqp_1", Of = "_viewport_k6wqp_6", zf = "_track_k6wqp_11", Bf = "_slide_k6wqp_16", Ff = "_navButton_k6wqp_20", jf = "_navButtonPrev_k6wqp_48", Hf = "_navButtonNext_k6wqp_52", vn = {
  carousel: Pf,
  viewport: Of,
  track: zf,
  slide: Bf,
  navButton: Ff,
  navButtonPrev: jf,
  navButtonNext: Hf
}, iI = ({
  children: e,
  slidesPerView: n = 1,
  gap: t = 16,
  loop: r = !1,
  className: i = ""
}) => {
  const o = Ve.Children.toArray(e), s = o.length, a = Math.max(0, s - n), [c, l] = U(0), u = r || c > 0, d = r || c < a, h = K(() => {
    l((k) => k > 0 ? k - 1 : r ? a : k);
  }, [r, a]), f = K(() => {
    l((k) => k < a ? k + 1 : r ? 0 : k);
  }, [r, a]), m = Ht(
    () => `calc((100% - ${t * (n - 1)}px) / ${n})`,
    [t, n]
  ), y = Ht(
    () => `calc(-${c} * (${m} + ${t}px))`,
    [c, m, t]
  ), _ = Ht(
    () => ({ transform: `translateX(${y})`, gap: `${t}px` }),
    [y, t]
  ), b = [vn.carousel, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ M("div", { className: b, children: [
    /* @__PURE__ */ p("div", { className: vn.viewport, children: /* @__PURE__ */ p(
      "div",
      {
        className: vn.track,
        style: _,
        children: o.map((k, g) => /* @__PURE__ */ p(
          "div",
          {
            className: vn.slide,
            style: { width: m },
            children: k
          },
          g
        ))
      }
    ) }),
    /* @__PURE__ */ p(
      "button",
      {
        className: `${vn.navButton} ${vn.navButtonPrev}`,
        onClick: h,
        disabled: !u,
        "aria-label": "Previous slide",
        type: "button",
        children: /* @__PURE__ */ p(Io, { size: 18 })
      }
    ),
    /* @__PURE__ */ p(
      "button",
      {
        className: `${vn.navButton} ${vn.navButtonNext}`,
        onClick: f,
        disabled: !d,
        "aria-label": "Next slide",
        type: "button",
        children: /* @__PURE__ */ p(Ao, { size: 18 })
      }
    )
  ] });
}, qf = "_wrapper_v651u_1", Uf = "_reverse_v651u_7", Wf = "_disabled_v651u_11", Gf = "_visuallyHidden_v651u_16", Vf = "_box_v651u_20", Xf = "_checked_v651u_33", Kf = "_label_v651u_52", Rn = {
  wrapper: qf,
  reverse: Uf,
  disabled: Wf,
  visuallyHidden: Gf,
  box: Vf,
  checked: Xf,
  label: Kf
}, vs = ({
  checked: e,
  onChange: n,
  label: t,
  disabled: r = !1,
  inputPosition: i = "left",
  className: o = "",
  id: s,
  "aria-label": a
}) => /* @__PURE__ */ M(
  "label",
  {
    className: `${Rn.wrapper} ${r ? Rn.disabled : ""} ${i === "right" ? Rn.reverse : ""} ${o}`,
    children: [
      /* @__PURE__ */ p(
        "input",
        {
          id: s,
          type: "checkbox",
          checked: e,
          onChange: (c) => n(c.target.checked),
          disabled: r,
          className: Rn.visuallyHidden,
          "aria-label": a
        }
      ),
      /* @__PURE__ */ p("span", { className: `${Rn.box} ${e ? Rn.checked : ""}` }),
      t && /* @__PURE__ */ p("span", { className: Rn.label, children: t })
    ]
  }
), Yf = "_chip_21kob_1", Zf = "_selected_21kob_28", Qf = "_success_21kob_35", Jf = "_warning_21kob_46", ep = "_info_21kob_57", tp = "_error_21kob_68", np = "_icon_21kob_81", rp = "_hasAvatar_21kob_88", ip = "_avatar_21kob_97", op = "_removeButton_21kob_101", Tn = {
  chip: Yf,
  default: "_default_21kob_23",
  selected: Zf,
  success: Qf,
  warning: Jf,
  info: ep,
  error: tp,
  icon: np,
  hasAvatar: rp,
  avatar: ip,
  removeButton: op
}, oI = ({
  variant: e = "default",
  icon: n,
  avatar: t,
  onRemove: r,
  selected: i = !1,
  onSelect: o,
  children: s,
  className: a = ""
}) => {
  const c = t ? /* @__PURE__ */ p(ja, { src: t.src, name: t.name, size: "xs", className: Tn.avatar }) : n ? /* @__PURE__ */ p("span", { className: Tn.icon, "aria-hidden": "true", children: n }) : null, l = r ? /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: Tn.removeButton,
      onClick: (d) => {
        d.stopPropagation(), r();
      },
      "aria-label": `Remove ${String(s)}`,
      children: /* @__PURE__ */ p(lr, { size: 12 })
    }
  ) : null, u = [
    Tn.chip,
    Tn[e],
    t ? Tn.hasAvatar : "",
    i ? Tn.selected : "",
    a
  ].filter(Boolean).join(" ");
  return o ? /* @__PURE__ */ M(
    "button",
    {
      type: "button",
      className: u,
      onClick: o,
      "aria-pressed": i,
      children: [
        c,
        /* @__PURE__ */ p("span", { children: s }),
        l
      ]
    }
  ) : /* @__PURE__ */ M("span", { className: u, children: [
    c,
    /* @__PURE__ */ p("span", { children: s }),
    l
  ] });
};
function zo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ti, Es;
function sp() {
  if (Es) return Ti;
  Es = 1;
  function e(C) {
    return C instanceof Map ? C.clear = C.delete = C.set = function() {
      throw new Error("map is read-only");
    } : C instanceof Set && (C.add = C.clear = C.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(C), Object.getOwnPropertyNames(C).forEach((z) => {
      const Z = C[z], ge = typeof Z;
      (ge === "object" || ge === "function") && !Object.isFrozen(Z) && e(Z);
    }), C;
  }
  class n {
    /**
     * @param {CompiledMode} mode
     */
    constructor(z) {
      z.data === void 0 && (z.data = {}), this.data = z.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function t(C) {
    return C.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function r(C, ...z) {
    const Z = /* @__PURE__ */ Object.create(null);
    for (const ge in C)
      Z[ge] = C[ge];
    return z.forEach(function(ge) {
      for (const Ke in ge)
        Z[Ke] = ge[Ke];
    }), /** @type {T} */
    Z;
  }
  const i = "</span>", o = (C) => !!C.scope, s = (C, { prefix: z }) => {
    if (C.startsWith("language:"))
      return C.replace("language:", "language-");
    if (C.includes(".")) {
      const Z = C.split(".");
      return [
        `${z}${Z.shift()}`,
        ...Z.map((ge, Ke) => `${ge}${"_".repeat(Ke + 1)}`)
      ].join(" ");
    }
    return `${z}${C}`;
  };
  class a {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(z, Z) {
      this.buffer = "", this.classPrefix = Z.classPrefix, z.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(z) {
      this.buffer += t(z);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(z) {
      if (!o(z)) return;
      const Z = s(
        z.scope,
        { prefix: this.classPrefix }
      );
      this.span(Z);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(z) {
      o(z) && (this.buffer += i);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(z) {
      this.buffer += `<span class="${z}">`;
    }
  }
  const c = (C = {}) => {
    const z = { children: [] };
    return Object.assign(z, C), z;
  };
  class l {
    constructor() {
      this.rootNode = c(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(z) {
      this.top.children.push(z);
    }
    /** @param {string} scope */
    openNode(z) {
      const Z = c({ scope: z });
      this.add(Z), this.stack.push(Z);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(z) {
      return this.constructor._walk(z, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(z, Z) {
      return typeof Z == "string" ? z.addText(Z) : Z.children && (z.openNode(Z), Z.children.forEach((ge) => this._walk(z, ge)), z.closeNode(Z)), z;
    }
    /**
     * @param {Node} node
     */
    static _collapse(z) {
      typeof z != "string" && z.children && (z.children.every((Z) => typeof Z == "string") ? z.children = [z.children.join("")] : z.children.forEach((Z) => {
        l._collapse(Z);
      }));
    }
  }
  class u extends l {
    /**
     * @param {*} options
     */
    constructor(z) {
      super(), this.options = z;
    }
    /**
     * @param {string} text
     */
    addText(z) {
      z !== "" && this.add(z);
    }
    /** @param {string} scope */
    startScope(z) {
      this.openNode(z);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(z, Z) {
      const ge = z.root;
      Z && (ge.scope = `language:${Z}`), this.add(ge);
    }
    toHTML() {
      return new a(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function d(C) {
    return C ? typeof C == "string" ? C : C.source : null;
  }
  function h(C) {
    return y("(?=", C, ")");
  }
  function f(C) {
    return y("(?:", C, ")*");
  }
  function m(C) {
    return y("(?:", C, ")?");
  }
  function y(...C) {
    return C.map((Z) => d(Z)).join("");
  }
  function _(C) {
    const z = C[C.length - 1];
    return typeof z == "object" && z.constructor === Object ? (C.splice(C.length - 1, 1), z) : {};
  }
  function b(...C) {
    return "(" + (_(C).capture ? "" : "?:") + C.map((ge) => d(ge)).join("|") + ")";
  }
  function k(C) {
    return new RegExp(C.toString() + "|").exec("").length - 1;
  }
  function g(C, z) {
    const Z = C && C.exec(z);
    return Z && Z.index === 0;
  }
  const S = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function v(C, { joinWith: z }) {
    let Z = 0;
    return C.map((ge) => {
      Z += 1;
      const Ke = Z;
      let je = d(ge), oe = "";
      for (; je.length > 0; ) {
        const ee = S.exec(je);
        if (!ee) {
          oe += je;
          break;
        }
        oe += je.substring(0, ee.index), je = je.substring(ee.index + ee[0].length), ee[0][0] === "\\" && ee[1] ? oe += "\\" + String(Number(ee[1]) + Ke) : (oe += ee[0], ee[0] === "(" && Z++);
      }
      return oe;
    }).map((ge) => `(${ge})`).join(z);
  }
  const w = /\b\B/, $ = "[a-zA-Z]\\w*", A = "[a-zA-Z_]\\w*", D = "\\b\\d+(\\.\\d+)?", N = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", T = "\\b(0b[01]+)", L = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", j = (C = {}) => {
    const z = /^#![ ]*\//;
    return C.binary && (C.begin = y(
      z,
      /.*\b/,
      C.binary,
      /\b.*/
    )), r({
      scope: "meta",
      begin: z,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (Z, ge) => {
        Z.index !== 0 && ge.ignoreMatch();
      }
    }, C);
  }, F = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, I = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [F]
  }, P = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [F]
  }, H = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, B = function(C, z, Z = {}) {
    const ge = r(
      {
        scope: "comment",
        begin: C,
        end: z,
        contains: []
      },
      Z
    );
    ge.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const Ke = b(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return ge.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: y(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          Ke,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), ge;
  }, O = B("//", "$"), x = B("/\\*", "\\*/"), X = B("#", "$"), ce = {
    scope: "number",
    begin: D,
    relevance: 0
  }, E = {
    scope: "number",
    begin: N,
    relevance: 0
  }, be = {
    scope: "number",
    begin: T,
    relevance: 0
  }, fe = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      F,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [F]
      }
    ]
  }, De = {
    scope: "title",
    begin: $,
    relevance: 0
  }, Je = {
    scope: "title",
    begin: A,
    relevance: 0
  }, Xe = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + A,
    relevance: 0
  };
  var Ge = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: I,
    BACKSLASH_ESCAPE: F,
    BINARY_NUMBER_MODE: be,
    BINARY_NUMBER_RE: T,
    COMMENT: B,
    C_BLOCK_COMMENT_MODE: x,
    C_LINE_COMMENT_MODE: O,
    C_NUMBER_MODE: E,
    C_NUMBER_RE: N,
    END_SAME_AS_BEGIN: function(C) {
      return Object.assign(
        C,
        {
          /** @type {ModeCallback} */
          "on:begin": (z, Z) => {
            Z.data._beginMatch = z[1];
          },
          /** @type {ModeCallback} */
          "on:end": (z, Z) => {
            Z.data._beginMatch !== z[1] && Z.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: X,
    IDENT_RE: $,
    MATCH_NOTHING_RE: w,
    METHOD_GUARD: Xe,
    NUMBER_MODE: ce,
    NUMBER_RE: D,
    PHRASAL_WORDS_MODE: H,
    QUOTE_STRING_MODE: P,
    REGEXP_MODE: fe,
    RE_STARTERS_RE: L,
    SHEBANG: j,
    TITLE_MODE: De,
    UNDERSCORE_IDENT_RE: A,
    UNDERSCORE_TITLE_MODE: Je
  });
  function wt(C, z) {
    C.input[C.index - 1] === "." && z.ignoreMatch();
  }
  function se(C, z) {
    C.className !== void 0 && (C.scope = C.className, delete C.className);
  }
  function Ee(C, z) {
    z && C.beginKeywords && (C.begin = "\\b(" + C.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", C.__beforeBegin = wt, C.keywords = C.keywords || C.beginKeywords, delete C.beginKeywords, C.relevance === void 0 && (C.relevance = 0));
  }
  function te(C, z) {
    Array.isArray(C.illegal) && (C.illegal = b(...C.illegal));
  }
  function ne(C, z) {
    if (C.match) {
      if (C.begin || C.end) throw new Error("begin & end are not supported with match");
      C.begin = C.match, delete C.match;
    }
  }
  function G(C, z) {
    C.relevance === void 0 && (C.relevance = 1);
  }
  const me = (C, z) => {
    if (!C.beforeMatch) return;
    if (C.starts) throw new Error("beforeMatch cannot be used with starts");
    const Z = Object.assign({}, C);
    Object.keys(C).forEach((ge) => {
      delete C[ge];
    }), C.keywords = Z.keywords, C.begin = y(Z.beforeMatch, h(Z.begin)), C.starts = {
      relevance: 0,
      contains: [
        Object.assign(Z, { endsParent: !0 })
      ]
    }, C.relevance = 0, delete Z.beforeMatch;
  }, he = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], Te = "keyword";
  function Ie(C, z, Z = Te) {
    const ge = /* @__PURE__ */ Object.create(null);
    return typeof C == "string" ? Ke(Z, C.split(" ")) : Array.isArray(C) ? Ke(Z, C) : Object.keys(C).forEach(function(je) {
      Object.assign(
        ge,
        Ie(C[je], z, je)
      );
    }), ge;
    function Ke(je, oe) {
      z && (oe = oe.map((ee) => ee.toLowerCase())), oe.forEach(function(ee) {
        const pe = ee.split("|");
        ge[pe[0]] = [je, _e(pe[0], pe[1])];
      });
    }
  }
  function _e(C, z) {
    return z ? Number(z) : Me(C) ? 0 : 1;
  }
  function Me(C) {
    return he.includes(C.toLowerCase());
  }
  const Fe = {}, it = (C) => {
    console.error(C);
  }, Q = (C, ...z) => {
    console.log(`WARN: ${C}`, ...z);
  }, R = (C, z) => {
    Fe[`${C}/${z}`] || (console.log(`Deprecated as of ${C}. ${z}`), Fe[`${C}/${z}`] = !0);
  }, q = new Error();
  function re(C, z, { key: Z }) {
    let ge = 0;
    const Ke = C[Z], je = {}, oe = {};
    for (let ee = 1; ee <= z.length; ee++)
      oe[ee + ge] = Ke[ee], je[ee + ge] = !0, ge += k(z[ee - 1]);
    C[Z] = oe, C[Z]._emit = je, C[Z]._multi = !0;
  }
  function ie(C) {
    if (Array.isArray(C.begin)) {
      if (C.skip || C.excludeBegin || C.returnBegin)
        throw it("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), q;
      if (typeof C.beginScope != "object" || C.beginScope === null)
        throw it("beginScope must be object"), q;
      re(C, C.begin, { key: "beginScope" }), C.begin = v(C.begin, { joinWith: "" });
    }
  }
  function Ne(C) {
    if (Array.isArray(C.end)) {
      if (C.skip || C.excludeEnd || C.returnEnd)
        throw it("skip, excludeEnd, returnEnd not compatible with endScope: {}"), q;
      if (typeof C.endScope != "object" || C.endScope === null)
        throw it("endScope must be object"), q;
      re(C, C.end, { key: "endScope" }), C.end = v(C.end, { joinWith: "" });
    }
  }
  function at(C) {
    C.scope && typeof C.scope == "object" && C.scope !== null && (C.beginScope = C.scope, delete C.scope);
  }
  function qt(C) {
    at(C), typeof C.beginScope == "string" && (C.beginScope = { _wrap: C.beginScope }), typeof C.endScope == "string" && (C.endScope = { _wrap: C.endScope }), ie(C), Ne(C);
  }
  function ot(C) {
    function z(oe, ee) {
      return new RegExp(
        d(oe),
        "m" + (C.case_insensitive ? "i" : "") + (C.unicodeRegex ? "u" : "") + (ee ? "g" : "")
      );
    }
    class Z {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(ee, pe) {
        pe.position = this.position++, this.matchIndexes[this.matchAt] = pe, this.regexes.push([pe, ee]), this.matchAt += k(ee) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const ee = this.regexes.map((pe) => pe[1]);
        this.matcherRe = z(v(ee, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(ee) {
        this.matcherRe.lastIndex = this.lastIndex;
        const pe = this.matcherRe.exec(ee);
        if (!pe)
          return null;
        const Qe = pe.findIndex((bn, ke) => ke > 0 && bn !== void 0), Ze = this.matchIndexes[Qe];
        return pe.splice(0, Qe), Object.assign(pe, Ze);
      }
    }
    class ge {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(ee) {
        if (this.multiRegexes[ee]) return this.multiRegexes[ee];
        const pe = new Z();
        return this.rules.slice(ee).forEach(([Qe, Ze]) => pe.addRule(Qe, Ze)), pe.compile(), this.multiRegexes[ee] = pe, pe;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(ee, pe) {
        this.rules.push([ee, pe]), pe.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(ee) {
        const pe = this.getMatcher(this.regexIndex);
        pe.lastIndex = this.lastIndex;
        let Qe = pe.exec(ee);
        if (this.resumingScanAtSamePosition() && !(Qe && Qe.index === this.lastIndex)) {
          const Ze = this.getMatcher(0);
          Ze.lastIndex = this.lastIndex + 1, Qe = Ze.exec(ee);
        }
        return Qe && (this.regexIndex += Qe.position + 1, this.regexIndex === this.count && this.considerAll()), Qe;
      }
    }
    function Ke(oe) {
      const ee = new ge();
      return oe.contains.forEach((pe) => ee.addRule(pe.begin, { rule: pe, type: "begin" })), oe.terminatorEnd && ee.addRule(oe.terminatorEnd, { type: "end" }), oe.illegal && ee.addRule(oe.illegal, { type: "illegal" }), ee;
    }
    function je(oe, ee) {
      const pe = (
        /** @type CompiledMode */
        oe
      );
      if (oe.isCompiled) return pe;
      [
        se,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        ne,
        qt,
        me
      ].forEach((Ze) => Ze(oe, ee)), C.compilerExtensions.forEach((Ze) => Ze(oe, ee)), oe.__beforeBegin = null, [
        Ee,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        te,
        // default to 1 relevance if not specified
        G
      ].forEach((Ze) => Ze(oe, ee)), oe.isCompiled = !0;
      let Qe = null;
      return typeof oe.keywords == "object" && oe.keywords.$pattern && (oe.keywords = Object.assign({}, oe.keywords), Qe = oe.keywords.$pattern, delete oe.keywords.$pattern), Qe = Qe || /\w+/, oe.keywords && (oe.keywords = Ie(oe.keywords, C.case_insensitive)), pe.keywordPatternRe = z(Qe, !0), ee && (oe.begin || (oe.begin = /\B|\b/), pe.beginRe = z(pe.begin), !oe.end && !oe.endsWithParent && (oe.end = /\B|\b/), oe.end && (pe.endRe = z(pe.end)), pe.terminatorEnd = d(pe.end) || "", oe.endsWithParent && ee.terminatorEnd && (pe.terminatorEnd += (oe.end ? "|" : "") + ee.terminatorEnd)), oe.illegal && (pe.illegalRe = z(
        /** @type {RegExp | string} */
        oe.illegal
      )), oe.contains || (oe.contains = []), oe.contains = [].concat(...oe.contains.map(function(Ze) {
        return un(Ze === "self" ? oe : Ze);
      })), oe.contains.forEach(function(Ze) {
        je(
          /** @type Mode */
          Ze,
          pe
        );
      }), oe.starts && je(oe.starts, ee), pe.matcher = Ke(pe), pe;
    }
    if (C.compilerExtensions || (C.compilerExtensions = []), C.contains && C.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return C.classNameAliases = r(C.classNameAliases || {}), je(
      /** @type Mode */
      C
    );
  }
  function Qt(C) {
    return C ? C.endsWithParent || Qt(C.starts) : !1;
  }
  function un(C) {
    return C.variants && !C.cachedVariants && (C.cachedVariants = C.variants.map(function(z) {
      return r(C, { variants: null }, z);
    })), C.cachedVariants ? C.cachedVariants : Qt(C) ? r(C, { starts: C.starts ? r(C.starts) : null }) : Object.isFrozen(C) ? r(C) : C;
  }
  var lt = "11.11.1";
  class mt extends Error {
    constructor(z, Z) {
      super(z), this.name = "HTMLInjectionError", this.html = Z;
    }
  }
  const gt = t, Or = r, zr = Symbol("nomatch"), dr = 7, Un = function(C) {
    const z = /* @__PURE__ */ Object.create(null), Z = /* @__PURE__ */ Object.create(null), ge = [];
    let Ke = !0;
    const je = "Could not find the language '{}', did you forget to load/include a language module?", oe = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let ee = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: u
    };
    function pe(V) {
      return ee.noHighlightRe.test(V);
    }
    function Qe(V) {
      let ue = V.className + " ";
      ue += V.parentNode ? V.parentNode.className : "";
      const Ae = ee.languageDetectRe.exec(ue);
      if (Ae) {
        const He = yn(Ae[1]);
        return He || (Q(je.replace("{}", Ae[1])), Q("Falling back to no-highlight mode for this block.", V)), He ? Ae[1] : "no-highlight";
      }
      return ue.split(/\s+/).find((He) => pe(He) || yn(He));
    }
    function Ze(V, ue, Ae) {
      let He = "", tt = "";
      typeof ue == "object" ? (He = V, Ae = ue.ignoreIllegals, tt = ue.language) : (R("10.7.0", "highlight(lang, code, ...args) has been deprecated."), R("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), tt = V, He = ue), Ae === void 0 && (Ae = !0);
      const Wt = {
        code: He,
        language: tt
      };
      Fr("before:highlight", Wt);
      const kn = Wt.result ? Wt.result : bn(Wt.language, Wt.code, Ae);
      return kn.code = Wt.code, Fr("after:highlight", kn), kn;
    }
    function bn(V, ue, Ae, He) {
      const tt = /* @__PURE__ */ Object.create(null);
      function Wt(J, le) {
        return J.keywords[le];
      }
      function kn() {
        if (!we.keywords) {
          ct.addText(qe);
          return;
        }
        let J = 0;
        we.keywordPatternRe.lastIndex = 0;
        let le = we.keywordPatternRe.exec(qe), Ce = "";
        for (; le; ) {
          Ce += qe.substring(J, le.index);
          const Oe = tn.case_insensitive ? le[0].toLowerCase() : le[0], ut = Wt(we, Oe);
          if (ut) {
            const [fn, Mc] = ut;
            if (ct.addText(Ce), Ce = "", tt[Oe] = (tt[Oe] || 0) + 1, tt[Oe] <= dr && (qr += Mc), fn.startsWith("_"))
              Ce += le[0];
            else {
              const Lc = tn.classNameAliases[fn] || fn;
              en(le[0], Lc);
            }
          } else
            Ce += le[0];
          J = we.keywordPatternRe.lastIndex, le = we.keywordPatternRe.exec(qe);
        }
        Ce += qe.substring(J), ct.addText(Ce);
      }
      function jr() {
        if (qe === "") return;
        let J = null;
        if (typeof we.subLanguage == "string") {
          if (!z[we.subLanguage]) {
            ct.addText(qe);
            return;
          }
          J = bn(we.subLanguage, qe, !0, ps[we.subLanguage]), ps[we.subLanguage] = /** @type {CompiledMode} */
          J._top;
        } else
          J = Se(qe, we.subLanguage.length ? we.subLanguage : null);
        we.relevance > 0 && (qr += J.relevance), ct.__addSublanguage(J._emitter, J.language);
      }
      function It() {
        we.subLanguage != null ? jr() : kn(), qe = "";
      }
      function en(J, le) {
        J !== "" && (ct.startScope(le), ct.addText(J), ct.endScope());
      }
      function cs(J, le) {
        let Ce = 1;
        const Oe = le.length - 1;
        for (; Ce <= Oe; ) {
          if (!J._emit[Ce]) {
            Ce++;
            continue;
          }
          const ut = tn.classNameAliases[J[Ce]] || J[Ce], fn = le[Ce];
          ut ? en(fn, ut) : (qe = fn, kn(), qe = ""), Ce++;
        }
      }
      function us(J, le) {
        return J.scope && typeof J.scope == "string" && ct.openNode(tn.classNameAliases[J.scope] || J.scope), J.beginScope && (J.beginScope._wrap ? (en(qe, tn.classNameAliases[J.beginScope._wrap] || J.beginScope._wrap), qe = "") : J.beginScope._multi && (cs(J.beginScope, le), qe = "")), we = Object.create(J, { parent: { value: we } }), we;
      }
      function ds(J, le, Ce) {
        let Oe = g(J.endRe, Ce);
        if (Oe) {
          if (J["on:end"]) {
            const ut = new n(J);
            J["on:end"](le, ut), ut.isMatchIgnored && (Oe = !1);
          }
          if (Oe) {
            for (; J.endsParent && J.parent; )
              J = J.parent;
            return J;
          }
        }
        if (J.endsWithParent)
          return ds(J.parent, le, Ce);
      }
      function Cc(J) {
        return we.matcher.regexIndex === 0 ? (qe += J[0], 1) : (Si = !0, 0);
      }
      function Nc(J) {
        const le = J[0], Ce = J.rule, Oe = new n(Ce), ut = [Ce.__beforeBegin, Ce["on:begin"]];
        for (const fn of ut)
          if (fn && (fn(J, Oe), Oe.isMatchIgnored))
            return Cc(le);
        return Ce.skip ? qe += le : (Ce.excludeBegin && (qe += le), It(), !Ce.returnBegin && !Ce.excludeBegin && (qe = le)), us(Ce, J), Ce.returnBegin ? 0 : le.length;
      }
      function $c(J) {
        const le = J[0], Ce = ue.substring(J.index), Oe = ds(we, J, Ce);
        if (!Oe)
          return zr;
        const ut = we;
        we.endScope && we.endScope._wrap ? (It(), en(le, we.endScope._wrap)) : we.endScope && we.endScope._multi ? (It(), cs(we.endScope, J)) : ut.skip ? qe += le : (ut.returnEnd || ut.excludeEnd || (qe += le), It(), ut.excludeEnd && (qe = le));
        do
          we.scope && ct.closeNode(), !we.skip && !we.subLanguage && (qr += we.relevance), we = we.parent;
        while (we !== Oe.parent);
        return Oe.starts && us(Oe.starts, J), ut.returnEnd ? 0 : le.length;
      }
      function Ic() {
        const J = [];
        for (let le = we; le !== tn; le = le.parent)
          le.scope && J.unshift(le.scope);
        J.forEach((le) => ct.openNode(le));
      }
      let Hr = {};
      function fs(J, le) {
        const Ce = le && le[0];
        if (qe += J, Ce == null)
          return It(), 0;
        if (Hr.type === "begin" && le.type === "end" && Hr.index === le.index && Ce === "") {
          if (qe += ue.slice(le.index, le.index + 1), !Ke) {
            const Oe = new Error(`0 width match regex (${V})`);
            throw Oe.languageName = V, Oe.badRule = Hr.rule, Oe;
          }
          return 1;
        }
        if (Hr = le, le.type === "begin")
          return Nc(le);
        if (le.type === "illegal" && !Ae) {
          const Oe = new Error('Illegal lexeme "' + Ce + '" for mode "' + (we.scope || "<unnamed>") + '"');
          throw Oe.mode = we, Oe;
        } else if (le.type === "end") {
          const Oe = $c(le);
          if (Oe !== zr)
            return Oe;
        }
        if (le.type === "illegal" && Ce === "")
          return qe += `
`, 1;
        if (Ei > 1e5 && Ei > le.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return qe += Ce, Ce.length;
      }
      const tn = yn(V);
      if (!tn)
        throw it(je.replace("{}", V)), new Error('Unknown language: "' + V + '"');
      const Ac = ot(tn);
      let vi = "", we = He || Ac;
      const ps = {}, ct = new ee.__emitter(ee);
      Ic();
      let qe = "", qr = 0, Ln = 0, Ei = 0, Si = !1;
      try {
        if (tn.__emitTokens)
          tn.__emitTokens(ue, ct);
        else {
          for (we.matcher.considerAll(); ; ) {
            Ei++, Si ? Si = !1 : we.matcher.considerAll(), we.matcher.lastIndex = Ln;
            const J = we.matcher.exec(ue);
            if (!J) break;
            const le = ue.substring(Ln, J.index), Ce = fs(le, J);
            Ln = J.index + Ce;
          }
          fs(ue.substring(Ln));
        }
        return ct.finalize(), vi = ct.toHTML(), {
          language: V,
          value: vi,
          relevance: qr,
          illegal: !1,
          _emitter: ct,
          _top: we
        };
      } catch (J) {
        if (J.message && J.message.includes("Illegal"))
          return {
            language: V,
            value: gt(ue),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: J.message,
              index: Ln,
              context: ue.slice(Ln - 100, Ln + 100),
              mode: J.mode,
              resultSoFar: vi
            },
            _emitter: ct
          };
        if (Ke)
          return {
            language: V,
            value: gt(ue),
            illegal: !1,
            relevance: 0,
            errorRaised: J,
            _emitter: ct,
            _top: we
          };
        throw J;
      }
    }
    function ke(V) {
      const ue = {
        value: gt(V),
        illegal: !1,
        relevance: 0,
        _top: oe,
        _emitter: new ee.__emitter(ee)
      };
      return ue._emitter.addText(V), ue;
    }
    function Se(V, ue) {
      ue = ue || ee.languages || Object.keys(z);
      const Ae = ke(V), He = ue.filter(yn).filter(ls).map(
        (It) => bn(It, V, !1)
      );
      He.unshift(Ae);
      const tt = He.sort((It, en) => {
        if (It.relevance !== en.relevance) return en.relevance - It.relevance;
        if (It.language && en.language) {
          if (yn(It.language).supersetOf === en.language)
            return 1;
          if (yn(en.language).supersetOf === It.language)
            return -1;
        }
        return 0;
      }), [Wt, kn] = tt, jr = Wt;
      return jr.secondBest = kn, jr;
    }
    function xt(V, ue, Ae) {
      const He = ue && Z[ue] || Ae;
      V.classList.add("hljs"), V.classList.add(`language-${He}`);
    }
    function zt(V) {
      let ue = null;
      const Ae = Qe(V);
      if (pe(Ae)) return;
      if (Fr(
        "before:highlightElement",
        { el: V, language: Ae }
      ), V.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", V);
        return;
      }
      if (V.children.length > 0 && (ee.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(V)), ee.throwUnescapedHTML))
        throw new mt(
          "One of your code blocks includes unescaped HTML.",
          V.innerHTML
        );
      ue = V;
      const He = ue.textContent, tt = Ae ? Ze(He, { language: Ae, ignoreIllegals: !0 }) : Se(He);
      V.innerHTML = tt.value, V.dataset.highlighted = "yes", xt(V, Ae, tt.language), V.result = {
        language: tt.language,
        // TODO: remove with version 11.0
        re: tt.relevance,
        relevance: tt.relevance
      }, tt.secondBest && (V.secondBest = {
        language: tt.secondBest.language,
        relevance: tt.secondBest.relevance
      }), Fr("after:highlightElement", { el: V, result: tt, text: He });
    }
    function dn(V) {
      ee = Or(ee, V);
    }
    const Ut = () => {
      Wn(), R("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Jt() {
      Wn(), R("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Br = !1;
    function Wn() {
      function V() {
        Wn();
      }
      if (document.readyState === "loading") {
        Br || window.addEventListener("DOMContentLoaded", V, !1), Br = !0;
        return;
      }
      document.querySelectorAll(ee.cssSelector).forEach(zt);
    }
    function fr(V, ue) {
      let Ae = null;
      try {
        Ae = ue(C);
      } catch (He) {
        if (it("Language definition for '{}' could not be registered.".replace("{}", V)), Ke)
          it(He);
        else
          throw He;
        Ae = oe;
      }
      Ae.name || (Ae.name = V), z[V] = Ae, Ae.rawDefinition = ue.bind(null, C), Ae.aliases && as(Ae.aliases, { languageName: V });
    }
    function Gn(V) {
      delete z[V];
      for (const ue of Object.keys(Z))
        Z[ue] === V && delete Z[ue];
    }
    function Vn() {
      return Object.keys(z);
    }
    function yn(V) {
      return V = (V || "").toLowerCase(), z[V] || z[Z[V]];
    }
    function as(V, { languageName: ue }) {
      typeof V == "string" && (V = [V]), V.forEach((Ae) => {
        Z[Ae.toLowerCase()] = ue;
      });
    }
    function ls(V) {
      const ue = yn(V);
      return ue && !ue.disableAutodetect;
    }
    function xc(V) {
      V["before:highlightBlock"] && !V["before:highlightElement"] && (V["before:highlightElement"] = (ue) => {
        V["before:highlightBlock"](
          Object.assign({ block: ue.el }, ue)
        );
      }), V["after:highlightBlock"] && !V["after:highlightElement"] && (V["after:highlightElement"] = (ue) => {
        V["after:highlightBlock"](
          Object.assign({ block: ue.el }, ue)
        );
      });
    }
    function vc(V) {
      xc(V), ge.push(V);
    }
    function Ec(V) {
      const ue = ge.indexOf(V);
      ue !== -1 && ge.splice(ue, 1);
    }
    function Fr(V, ue) {
      const Ae = V;
      ge.forEach(function(He) {
        He[Ae] && He[Ae](ue);
      });
    }
    function Sc(V) {
      return R("10.7.0", "highlightBlock will be removed entirely in v12.0"), R("10.7.0", "Please use highlightElement now."), zt(V);
    }
    Object.assign(C, {
      highlight: Ze,
      highlightAuto: Se,
      highlightAll: Wn,
      highlightElement: zt,
      // TODO: Remove with v12 API
      highlightBlock: Sc,
      configure: dn,
      initHighlighting: Ut,
      initHighlightingOnLoad: Jt,
      registerLanguage: fr,
      unregisterLanguage: Gn,
      listLanguages: Vn,
      getLanguage: yn,
      registerAliases: as,
      autoDetection: ls,
      inherit: Or,
      addPlugin: vc,
      removePlugin: Ec
    }), C.debugMode = function() {
      Ke = !1;
    }, C.safeMode = function() {
      Ke = !0;
    }, C.versionString = lt, C.regex = {
      concat: y,
      lookahead: h,
      either: b,
      optional: m,
      anyNumberOfTimes: f
    };
    for (const V in Ge)
      typeof Ge[V] == "object" && e(Ge[V]);
    return Object.assign(C, Ge), C;
  }, _n = Un({});
  return _n.newInstance = () => Un({}), Ti = _n, _n.HighlightJS = _n, _n.default = _n, Ti;
}
var ap = /* @__PURE__ */ sp();
const Nt = /* @__PURE__ */ zo(ap), ui = "[A-Za-z$_][0-9A-Za-z$_]*", Ka = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], Ya = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Za = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Qa = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Ja = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], el = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], tl = [].concat(
  Ja,
  Za,
  Qa
);
function lp(e) {
  const n = e.regex, t = (B, { after: O }) => {
    const x = "</" + B[0].slice(1);
    return B.input.indexOf(x, O) !== -1;
  }, r = ui, i = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, s = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (B, O) => {
      const x = B[0].length + B.index, X = B.input[x];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        X === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        X === ","
      ) {
        O.ignoreMatch();
        return;
      }
      X === ">" && (t(B, { after: x }) || O.ignoreMatch());
      let ce;
      const E = B.input.substring(x);
      if (ce = E.match(/^\s*=/)) {
        O.ignoreMatch();
        return;
      }
      if ((ce = E.match(/^\s+extends\s+/)) && ce.index === 0) {
        O.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: ui,
    keyword: Ka,
    literal: Ya,
    built_in: tl,
    "variable.language": el
  }, c = "[0-9](_?[0-9])*", l = `\\.(${c})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, h = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, f = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "xml"
    }
  }, m = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "css"
    }
  }, y = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "graphql"
    }
  }, _ = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      h
    ]
  }, k = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, g = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    m,
    y,
    _,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    d
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  h.contains = g.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(g)
  });
  const S = [].concat(k, h.contains), v = S.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(S)
    }
  ]), w = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: v
  }, $ = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(r, "(", n.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, A = {
    relevance: 0,
    match: n.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Za,
        ...Qa
      ]
    }
  }, D = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, N = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [w],
    illegal: /%/
  }, T = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function L(B) {
    return n.concat("(?!", B.join("|"), ")");
  }
  const j = {
    match: n.concat(
      /\b/,
      L([
        ...Ja,
        "super",
        "import"
      ].map((B) => `${B}\\s*\\(`)),
      r,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, F = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, I = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      w
    ]
  }, P = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", H = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(P)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      w
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: v, CLASS_REFERENCE: A },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      D,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      m,
      y,
      _,
      k,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      d,
      A,
      {
        scope: "attr",
        match: r + n.lookahead(":"),
        relevance: 0
      },
      H,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          k,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: P,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: v
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: i.begin, end: i.end },
              { match: o },
              {
                begin: s.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": s.isTrulyOpeningTag,
                end: s.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: s.begin,
                end: s.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      N,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          w,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      F,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [w]
      },
      j,
      T,
      $,
      I,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Bo(e) {
  const n = e.regex, t = lp(e), r = ui, i = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], o = {
    begin: [
      /namespace/,
      /\s+/,
      e.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, s = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: i
    },
    contains: [t.exports.CLASS_REFERENCE]
  }, a = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, c = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ], l = {
    $pattern: ui,
    keyword: Ka.concat(c),
    literal: Ya,
    built_in: tl.concat(i),
    "variable.language": el
  }, u = {
    className: "meta",
    begin: "@" + r
  }, d = (y, _, b) => {
    const k = y.contains.findIndex((g) => g.label === _);
    if (k === -1)
      throw new Error("can not find mode to replace");
    y.contains.splice(k, 1, b);
  };
  Object.assign(t.keywords, l), t.exports.PARAMS_CONTAINS.push(u);
  const h = t.contains.find((y) => y.scope === "attr"), f = Object.assign(
    {},
    h,
    { match: n.concat(r, n.lookahead(/\s*\?:/)) }
  );
  t.exports.PARAMS_CONTAINS.push([
    t.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    h,
    // highlight the params key
    f
    // Added for optional property assignment highlighting
  ]), t.contains = t.contains.concat([
    u,
    o,
    s,
    f
    // Added for optional property assignment highlighting
  ]), d(t, "shebang", e.SHEBANG()), d(t, "use_strict", a);
  const m = t.contains.find((y) => y.label === "func.def");
  return m.relevance = 0, Object.assign(t, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), t;
}
const Ss = "[A-Za-z$_][0-9A-Za-z$_]*", cp = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], up = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], nl = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], rl = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], il = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], dp = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], fp = [].concat(
  il,
  nl,
  rl
);
function Fo(e) {
  const n = e.regex, t = (B, { after: O }) => {
    const x = "</" + B[0].slice(1);
    return B.input.indexOf(x, O) !== -1;
  }, r = Ss, i = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, s = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (B, O) => {
      const x = B[0].length + B.index, X = B.input[x];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        X === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        X === ","
      ) {
        O.ignoreMatch();
        return;
      }
      X === ">" && (t(B, { after: x }) || O.ignoreMatch());
      let ce;
      const E = B.input.substring(x);
      if (ce = E.match(/^\s*=/)) {
        O.ignoreMatch();
        return;
      }
      if ((ce = E.match(/^\s+extends\s+/)) && ce.index === 0) {
        O.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: Ss,
    keyword: cp,
    literal: up,
    built_in: fp,
    "variable.language": dp
  }, c = "[0-9](_?[0-9])*", l = `\\.(${c})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, h = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, f = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "xml"
    }
  }, m = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "css"
    }
  }, y = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "graphql"
    }
  }, _ = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      h
    ]
  }, k = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, g = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    m,
    y,
    _,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    d
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  h.contains = g.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(g)
  });
  const S = [].concat(k, h.contains), v = S.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(S)
    }
  ]), w = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: v
  }, $ = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(r, "(", n.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, A = {
    relevance: 0,
    match: n.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...nl,
        ...rl
      ]
    }
  }, D = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, N = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [w],
    illegal: /%/
  }, T = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function L(B) {
    return n.concat("(?!", B.join("|"), ")");
  }
  const j = {
    match: n.concat(
      /\b/,
      L([
        ...il,
        "super",
        "import"
      ].map((B) => `${B}\\s*\\(`)),
      r,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, F = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, I = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      w
    ]
  }, P = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", H = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(P)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      w
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: v, CLASS_REFERENCE: A },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      D,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      m,
      y,
      _,
      k,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      d,
      A,
      {
        scope: "attr",
        match: r + n.lookahead(":"),
        relevance: 0
      },
      H,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          k,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: P,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: v
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: i.begin, end: i.end },
              { match: o },
              {
                begin: s.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": s.isTrulyOpeningTag,
                end: s.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: s.begin,
                end: s.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      N,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          w,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      F,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [w]
      },
      j,
      T,
      $,
      I,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function ol(e) {
  const n = e.regex, t = n.concat(/[\p{L}_]/u, n.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, i = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, o = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, s = e.inherit(o, {
    begin: /\(/,
    end: /\)/
  }), a = e.inherit(e.APOS_STRING_MODE, { className: "string" }), c = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), l = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: r,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [i]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [i]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          o,
          c,
          a,
          s,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  o,
                  s,
                  c,
                  a
                ]
              }
            ]
          }
        ]
      },
      e.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      i,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              c
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [l],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [l],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: n.concat(
          /</,
          n.lookahead(n.concat(
            t,
            // <tag/>
            // <tag>
            // <tag ...
            n.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: t,
            relevance: 0,
            starts: l
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: n.concat(
          /<\//,
          n.lookahead(n.concat(
            t,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: t,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
const pp = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), hp = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], mp = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], gp = [
  ...hp,
  ...mp
], _p = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), bp = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), yp = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), kp = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function wp(e) {
  const n = e.regex, t = pp(e), r = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, i = "and or not only", o = /@-?\w[\w]*(-\w+)*/, s = "[a-zA-Z-][a-zA-Z0-9_-]*", a = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: !0,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      t.BLOCK_COMMENT,
      r,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      t.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + s,
        relevance: 0
      },
      t.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + bp.join("|") + ")" },
          { begin: ":(:)?(" + yp.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      t.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + kp.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          t.BLOCK_COMMENT,
          t.HEXCOLOR,
          t.IMPORTANT,
          t.CSS_NUMBER_MODE,
          ...a,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...a,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: !0,
                excludeEnd: !0
              }
            ]
          },
          t.FUNCTION_DISPATCH
        ]
      },
      {
        begin: n.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: o
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: i,
              attribute: _p.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...a,
              t.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + gp.join("|") + ")\\b"
      }
    ]
  };
}
function xp(e) {
  const n = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  }, t = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, r = [
    "true",
    "false",
    "null"
  ], i = {
    scope: "literal",
    beginKeywords: r.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc"],
    keywords: {
      literal: r
    },
    contains: [
      n,
      t,
      e.QUOTE_STRING_MODE,
      i,
      e.C_NUMBER_MODE,
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function jo(e) {
  const n = e.regex, t = {}, r = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [t]
      }
      // default values
    ]
  };
  Object.assign(t, {
    className: "variable",
    variants: [
      { begin: n.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      r
    ]
  });
  const i = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, o = e.inherit(
    e.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  ), s = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, a = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      t,
      i
    ]
  };
  i.contains.push(a);
  const c = {
    match: /\\"/
  }, l = {
    className: "string",
    begin: /'/,
    end: /'/
  }, u = {
    match: /\\'/
  }, d = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      e.NUMBER_MODE,
      t
    ]
  }, h = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], f = e.SHEBANG({
    binary: `(${h.join("|")})`,
    relevance: 10
  }), m = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, y = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ], _ = [
    "true",
    "false"
  ], b = { match: /(\/[a-z._-]+)+/ }, k = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], g = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], S = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], v = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: y,
      literal: _,
      built_in: [
        ...k,
        ...g,
        // Shell modifiers
        "set",
        "shopt",
        ...S,
        ...v
      ]
    },
    contains: [
      f,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      m,
      d,
      o,
      s,
      b,
      a,
      c,
      l,
      u,
      t
    ]
  };
}
Nt.registerLanguage("typescript", Bo);
Nt.registerLanguage("ts", Bo);
Nt.registerLanguage("tsx", Bo);
Nt.registerLanguage("javascript", Fo);
Nt.registerLanguage("js", Fo);
Nt.registerLanguage("jsx", Fo);
Nt.registerLanguage("html", ol);
Nt.registerLanguage("xml", ol);
Nt.registerLanguage("css", wp);
Nt.registerLanguage("json", xp);
Nt.registerLanguage("bash", jo);
Nt.registerLanguage("sh", jo);
Nt.registerLanguage("shell", jo);
const vp = "_container_1b601_1", Ep = "_copyButtonFloating_1b601_7", Sp = "_header_1b601_13", Cp = "_language_1b601_21", Np = "_pre_1b601_31", $p = "_code_1b601_37", Ip = "_line_1b601_50", Ap = "_lineNumber_1b601_54", Mp = "_lineContent_1b601_64", Lp = "_copyButton_1b601_7", Rp = "_copied_1b601_89", Tp = "_copyLabel_1b601_94", st = {
  container: vp,
  copyButtonFloating: Ep,
  header: Sp,
  language: Cp,
  pre: Np,
  code: $p,
  line: Ip,
  lineNumber: Ap,
  lineContent: Mp,
  copyButton: Lp,
  copied: Rp,
  copyLabel: Tp
}, Cs = () => /* @__PURE__ */ M(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ p("rect", { x: "5.5", y: "5.5", width: "8", height: "8", rx: "1.5" }),
      /* @__PURE__ */ p("path", { d: "M10.5 5.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h2.5" })
    ]
  }
), Ns = () => /* @__PURE__ */ p(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ p("path", { d: "M3 8.5l3.5 3.5L13 4" })
  }
), sI = ({
  children: e,
  language: n,
  showLineNumbers: t = !1,
  className: r = ""
}) => {
  const [i, o] = U(!1), s = K(() => {
    navigator.clipboard.writeText(e).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e]), a = Ht(() => {
    if (!n) return null;
    try {
      return Nt.highlight(e, { language: n }).value;
    } catch (d) {
      return console.error("[CodeBlock] highlight.js failed for language:", n, d), null;
    }
  }, [e, n]), c = a ? a.split(`
`) : e.split(`
`), l = [st.container, r].filter(Boolean).join(" "), u = !!n;
  return /* @__PURE__ */ M("div", { className: l, children: [
    u && /* @__PURE__ */ M("div", { className: st.header, children: [
      /* @__PURE__ */ p("span", { className: st.language, children: n }),
      /* @__PURE__ */ M(
        "button",
        {
          className: `${st.copyButton} ${i ? st.copied : ""}`,
          onClick: s,
          "aria-label": i ? "Copied" : "Copy code",
          type: "button",
          children: [
            i ? /* @__PURE__ */ p(Ns, {}) : /* @__PURE__ */ p(Cs, {}),
            /* @__PURE__ */ p("span", { className: st.copyLabel, children: i ? "Copied!" : "Copy" })
          ]
        }
      )
    ] }),
    !u && /* @__PURE__ */ M(
      "button",
      {
        className: `${st.copyButton} ${st.copyButtonFloating} ${i ? st.copied : ""}`,
        onClick: s,
        "aria-label": i ? "Copied" : "Copy code",
        type: "button",
        children: [
          i ? /* @__PURE__ */ p(Ns, {}) : /* @__PURE__ */ p(Cs, {}),
          /* @__PURE__ */ p("span", { className: st.copyLabel, children: i ? "Copied!" : "Copy" })
        ]
      }
    ),
    /* @__PURE__ */ p("pre", { className: st.pre, children: t ? /* @__PURE__ */ p("code", { className: st.code, children: c.map((d, h) => /* @__PURE__ */ M("span", { className: st.line, children: [
      /* @__PURE__ */ p("span", { className: st.lineNumber, children: h + 1 }),
      a ? /* @__PURE__ */ p(
        "span",
        {
          className: st.lineContent,
          dangerouslySetInnerHTML: { __html: d }
        }
      ) : /* @__PURE__ */ p("span", { className: st.lineContent, children: d }),
      h < c.length - 1 ? `
` : ""
    ] }, h)) }) : a ? /* @__PURE__ */ p(
      "code",
      {
        className: st.code,
        dangerouslySetInnerHTML: { __html: a }
      }
    ) : /* @__PURE__ */ p("code", { className: st.code, children: e }) })
  ] });
};
function Di(e, n, t) {
  return Math.max(n, Math.min(t, e));
}
const Vr = 18, Dp = 8, sl = ({
  hue: e,
  saturation: n,
  brightness: t,
  onChange: r,
  size: i = 200
}) => {
  const o = Y(null), s = Y(null), a = Y(null), c = i, l = K(() => {
    const f = o.current;
    if (!f) return;
    const m = f.getContext("2d");
    if (!m) return;
    const y = window.devicePixelRatio || 1;
    f.width = i * y, f.height = c * y, m.scale(y, y);
    const [_, b, k] = al(e / 360, 1, 1);
    m.fillStyle = `rgb(${_},${b},${k})`, m.fillRect(0, 0, i, c);
    const g = m.createLinearGradient(0, 0, i, 0);
    g.addColorStop(0, "rgba(255,255,255,1)"), g.addColorStop(1, "rgba(255,255,255,0)"), m.fillStyle = g, m.fillRect(0, 0, i, c);
    const S = m.createLinearGradient(0, 0, 0, c);
    S.addColorStop(0, "rgba(0,0,0,0)"), S.addColorStop(1, "rgba(0,0,0,1)"), m.fillStyle = S, m.fillRect(0, 0, i, c);
    const v = n * i, w = (1 - t) * c;
    m.beginPath(), m.arc(v, w, 6, 0, Math.PI * 2), m.strokeStyle = "#ffffff", m.lineWidth = 2, m.stroke(), m.beginPath(), m.arc(v, w, 7.5, 0, Math.PI * 2), m.strokeStyle = "rgba(0,0,0,0.25)", m.lineWidth = 1, m.stroke();
  }, [e, n, t, i, c]), u = K(() => {
    const f = s.current;
    if (!f) return;
    const m = f.getContext("2d");
    if (!m) return;
    const y = window.devicePixelRatio || 1;
    f.width = i * y, f.height = Vr * y, m.scale(y, y);
    const _ = m.createLinearGradient(0, 0, i, 0);
    for (let g = 0; g <= 6; g++)
      _.addColorStop(g / 6, `hsl(${g * 60}, 100%, 50%)`);
    m.fillStyle = _, m.fillRect(0, 0, i, Vr);
    const b = e / 360 * i, k = Vr / 2;
    m.beginPath(), m.arc(b, k, 6, 0, Math.PI * 2), m.strokeStyle = "#ffffff", m.lineWidth = 2, m.stroke(), m.beginPath(), m.arc(b, k, 7.5, 0, Math.PI * 2), m.strokeStyle = "rgba(0,0,0,0.25)", m.lineWidth = 1, m.stroke();
  }, [e, i]);
  ae(() => {
    l();
  }, [l]), ae(() => {
    u();
  }, [u]);
  const d = K(
    (f, m) => {
      const y = o.current;
      if (!y) return;
      const _ = y.getBoundingClientRect(), b = (f - _.left) / _.width * i, k = (m - _.top) / _.height * c, g = Di(b / i, 0, 1), S = Di(1 - k / c, 0, 1);
      r(e, parseFloat(g.toFixed(3)), parseFloat(S.toFixed(3)));
    },
    [i, c, e, r]
  ), h = K(
    (f) => {
      const m = s.current;
      if (!m) return;
      const y = m.getBoundingClientRect(), _ = (f - y.left) / y.width * i, b = Di(_ / i * 360, 0, 360);
      r(Math.round(b), n, t);
    },
    [i, n, t, r]
  );
  return ae(() => {
    const f = o.current, m = s.current;
    if (!f || !m) return;
    const y = (k) => {
      k.preventDefault(), k.stopPropagation(), f.contains(k.target) ? (a.current = "sv", d(k.clientX, k.clientY)) : m.contains(k.target) && (a.current = "hue", h(k.clientX));
    }, _ = (k) => {
      a.current === "sv" ? d(k.clientX, k.clientY) : a.current === "hue" && h(k.clientX);
    }, b = () => {
      a.current = null;
    };
    return f.addEventListener("mousedown", y), m.addEventListener("mousedown", y), document.addEventListener("mousemove", _), document.addEventListener("mouseup", b), () => {
      f.removeEventListener("mousedown", y), m.removeEventListener("mousedown", y), document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", b);
    };
  }, [d, h]), /* @__PURE__ */ M(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: Dp,
        width: i
      },
      children: [
        /* @__PURE__ */ p("div", { style: { borderRadius: 8, overflow: "hidden", lineHeight: 0 }, children: /* @__PURE__ */ p(
          "canvas",
          {
            ref: o,
            style: { width: i, height: c, cursor: "crosshair", display: "block" }
          }
        ) }),
        /* @__PURE__ */ p("div", { style: { borderRadius: 6, overflow: "hidden", lineHeight: 0 }, children: /* @__PURE__ */ p(
          "canvas",
          {
            ref: s,
            style: { width: i, height: Vr, cursor: "crosshair", display: "block" }
          }
        ) })
      ]
    }
  );
};
function al(e, n, t) {
  let r, i, o;
  const s = Math.floor(e * 6), a = e * 6 - s, c = t * (1 - n), l = t * (1 - a * n), u = t * (1 - (1 - a) * n);
  switch (s % 6) {
    case 0:
      r = t, i = u, o = c;
      break;
    case 1:
      r = l, i = t, o = c;
      break;
    case 2:
      r = c, i = t, o = u;
      break;
    case 3:
      r = c, i = l, o = t;
      break;
    case 4:
      r = u, i = c, o = t;
      break;
    default:
      r = t, i = c, o = l;
      break;
  }
  return [Math.round(r * 255), Math.round(i * 255), Math.round(o * 255)];
}
function ll(e, n, t) {
  return "#" + al(e / 360, n, t).map((i) => i.toString(16).padStart(2, "0")).join("");
}
function si(e) {
  const n = parseInt(e.slice(1, 3), 16) / 255, t = parseInt(e.slice(3, 5), 16) / 255, r = parseInt(e.slice(5, 7), 16) / 255, i = Math.max(n, t, r), o = Math.min(n, t, r), s = i - o, a = i, c = i === 0 ? 0 : s / i;
  let l = 0;
  if (s !== 0)
    switch (i) {
      case n:
        l = ((t - r) / s + (t < r ? 6 : 0)) / 6;
        break;
      case t:
        l = ((r - n) / s + 2) / 6;
        break;
      default:
        l = ((n - t) / s + 4) / 6;
        break;
    }
  return { h: Math.round(l * 360), s: parseFloat(c.toFixed(3)), v: parseFloat(a.toFixed(3)) };
}
const Pp = "_colorPicker_kodlw_1", Op = "_inputRow_kodlw_9", zp = "_swatch_kodlw_15", Bp = "_swatchFrame_kodlw_30", Fp = "_swatchFrameError_kodlw_43", jp = "_opacityInput_kodlw_48", Hp = "_dropdown_kodlw_53", qp = "_wheelContainer_kodlw_62", Up = "_swatchGrid_kodlw_66", Wp = "_swatchOption_kodlw_74", Gp = "_swatchSelected_kodlw_88", Gt = {
  colorPicker: Pp,
  inputRow: Op,
  swatch: zp,
  swatchFrame: Bp,
  swatchFrameError: Fp,
  opacityInput: jp,
  dropdown: Hp,
  wheelContainer: qp,
  swatchGrid: Up,
  swatchOption: Wp,
  swatchSelected: Gp
}, Pi = /^#[0-9a-fA-F]{6}$/, po = ({
  value: e,
  onChange: n,
  opacity: t,
  onOpacityChange: r,
  label: i,
  labelPosition: o = "top",
  labelWidth: s,
  error: a,
  helperText: c,
  disabled: l = !1,
  id: u,
  swatches: d,
  showHex: h = !0,
  offsetX: f = 0,
  offsetY: m = 0,
  isOpen: y,
  onOpenChange: _
}) => {
  const b = y !== void 0, [k, g] = U(!1), S = b ? y : k, [v, w] = U(null), $ = Y(null), A = Ht(
    () => Pi.test(e) ? si(e) : { h: 0, s: 1, v: 1 },
    [e]
  ), D = {
    ...A,
    h: v !== null ? v : A.h
  }, N = (P) => {
    b ? _ == null || _(P) : g(P);
  }, T = () => {
    l || N(!S);
  }, L = (P) => {
    const H = "#" + P.replace(/^#/, "");
    Pi.test(H) && (w(null), n(H.toLowerCase()));
  }, j = (P, H, B) => {
    w(P), n(ll(P, H, B));
  }, F = /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: Gt.swatch,
      style: {
        backgroundColor: Pi.test(e) ? e : "#000000",
        opacity: t !== void 0 ? t : 1
      },
      onClick: T,
      disabled: l,
      "aria-label": "Open color picker",
      "data-testid": "color-swatch"
    }
  ), I = /* @__PURE__ */ M("div", { ref: $, className: Gt.colorPicker, children: [
    /* @__PURE__ */ M("div", { className: Gt.inputRow, children: [
      h ? /* @__PURE__ */ p(
        Pt,
        {
          id: u,
          prefix: "#",
          value: e.replace(/^#/, ""),
          onChange: L,
          error: !!a,
          prefixSlot: F
        }
      ) : /* @__PURE__ */ p("div", { className: `${Gt.swatchFrame} ${a ? Gt.swatchFrameError : ""}`, children: F }),
      r && /* @__PURE__ */ p(
        Pt,
        {
          prefix: "%",
          type: "number",
          value: String(Math.round((t ?? 1) * 100)),
          onChange: (P) => r(Math.min(100, Math.max(0, Number(P))) / 100),
          min: 0,
          max: 100,
          scrub: !0,
          className: Gt.opacityInput
        }
      )
    ] }),
    /* @__PURE__ */ M(
      Ct,
      {
        isOpen: S,
        onClose: () => N(!1),
        anchorRef: $,
        className: Gt.dropdown,
        role: "dialog",
        "aria-label": "Color picker",
        offsetX: f,
        offsetY: m,
        children: [
          /* @__PURE__ */ p("div", { className: Gt.wheelContainer, children: /* @__PURE__ */ p(
            sl,
            {
              hue: D.h,
              saturation: D.s,
              brightness: D.v,
              onChange: j
            }
          ) }),
          d && d.length > 0 && /* @__PURE__ */ p("div", { className: Gt.swatchGrid, children: d.map((P) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              className: `${Gt.swatchOption} ${e.toLowerCase() === P.toLowerCase() ? Gt.swatchSelected : ""}`,
              style: { backgroundColor: P },
              onClick: () => {
                w(null), n(P.toLowerCase()), N(!1);
              },
              "aria-label": `Select color ${P}`
            },
            P
          )) }),
          /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p(
            Pt,
            {
              prefix: "#",
              value: e.replace(/^#/, ""),
              onChange: L
            }
          ) })
        ]
      }
    )
  ] });
  return /* @__PURE__ */ p(li, { label: i, labelPosition: o, labelWidth: s, htmlFor: u, disabled: l, error: a, helperText: c, children: I });
}, Vp = "_wrapper_qs2di_1", Xp = "_table_qs2di_5", Kp = "_checkboxCol_qs2di_11", Yp = "_headerCell_qs2di_16", Zp = "_checkboxCell_qs2di_29", Qp = "_sortButton_qs2di_40", Jp = "_sortIcon_qs2di_59", eh = "_row_qs2di_66", th = "_cell_qs2di_69", nh = "_sortedCell_qs2di_78", rh = "_selected_qs2di_81", ih = "_clickable_qs2di_86", oh = "_compact_qs2di_95", sh = "_striped_qs2di_102", ah = "_emptyCell_qs2di_109", rt = {
  wrapper: Vp,
  table: Xp,
  checkboxCol: Kp,
  headerCell: Yp,
  checkboxCell: Zp,
  sortButton: Qp,
  sortIcon: Jp,
  row: eh,
  cell: th,
  sortedCell: nh,
  selected: rh,
  clickable: ih,
  compact: oh,
  striped: sh,
  emptyCell: ah
};
function $s(e, n, t) {
  return typeof n == "function" ? n(e) : String(e[n] ?? t);
}
function aI({
  columns: e,
  data: n,
  rowKey: t,
  selectable: r = !1,
  selectedRows: i,
  onSelectionChange: o,
  onRowClick: s,
  sortColumn: a,
  sortDirection: c,
  onSortChange: l,
  striped: u = !1,
  compact: d = !1,
  emptyMessage: h = "No data",
  className: f = "",
  caption: m
}) {
  const [y, _] = U([]), [b, k] = U(void 0), [g, S] = U("asc"), v = i !== void 0, w = v ? i : y, $ = l !== void 0, A = $ ? a : b, D = $ ? c ?? "asc" : g, N = (x) => {
    let X = "asc";
    A === x && (X = D === "asc" ? "desc" : "asc"), $ ? l(x, X) : (k(x), S(X));
  }, T = (x, X) => {
    const ce = X ? [...w, x] : w.filter((E) => E !== x);
    v || _(ce), o == null || o(ce);
  }, L = Ve.useMemo(
    () => n.map((x, X) => $s(x, t, X)),
    [n, t]
  ), j = Ve.useMemo(() => new Set(w), [w]), F = L.length > 0 && L.every((x) => j.has(x)), I = !F && L.some((x) => j.has(x)), P = (x) => {
    const X = x ? L : [];
    v || _(X), o == null || o(X);
  }, H = Ve.useMemo(() => !A || $ ? n : [...n].sort((x, X) => {
    const ce = x[A], E = X[A], be = String(ce ?? ""), fe = String(E ?? ""), De = be.localeCompare(fe, void 0, { numeric: !0 });
    return D === "asc" ? De : -De;
  }), [n, A, D, $]), B = e.length + (r ? 1 : 0), O = [
    rt.table,
    u ? rt.striped : "",
    d ? rt.compact : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: `${rt.wrapper} ${f}`, children: /* @__PURE__ */ M("table", { className: O, children: [
    m && /* @__PURE__ */ p("caption", { children: m }),
    /* @__PURE__ */ M("colgroup", { children: [
      r && /* @__PURE__ */ p("col", { className: rt.checkboxCol }),
      e.map((x) => /* @__PURE__ */ p("col", { style: x.width ? { width: x.width } : void 0 }, x.key))
    ] }),
    /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ M("tr", { children: [
      r && /* @__PURE__ */ p("th", { scope: "col", className: `${rt.headerCell} ${rt.checkboxCell}`, children: /* @__PURE__ */ p(
        vs,
        {
          checked: F || I,
          onChange: P
        }
      ) }),
      e.map((x) => {
        const X = A === x.key, ce = x.sortable ? X ? D === "asc" ? "ascending" : "descending" : "none" : void 0;
        return /* @__PURE__ */ p(
          "th",
          {
            scope: "col",
            className: `${rt.headerCell}${X ? ` ${rt.sorted}` : ""}`,
            "aria-sort": ce,
            children: x.sortable ? /* @__PURE__ */ M(
              "button",
              {
                type: "button",
                className: rt.sortButton,
                onClick: () => N(x.key),
                "aria-label": `Sort by ${x.header}`,
                children: [
                  x.header,
                  /* @__PURE__ */ p("span", { className: rt.sortIcon, "aria-hidden": "true", children: X ? D === "asc" ? /* @__PURE__ */ p(ku, { size: 14 }) : /* @__PURE__ */ p(_u, { size: 14 }) : /* @__PURE__ */ p(yu, { size: 14 }) })
                ]
              }
            ) : x.header
          },
          x.key
        );
      })
    ] }) }),
    /* @__PURE__ */ p("tbody", { children: H.length === 0 ? /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", { colSpan: B, className: rt.emptyCell, children: h }) }) : H.map((x, X) => {
      const ce = $s(x, t, X), E = j.has(ce), be = [
        rt.row,
        s ? rt.clickable : "",
        E ? rt.selected : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ M(
        "tr",
        {
          className: be,
          tabIndex: s ? 0 : void 0,
          onClick: s ? () => s(x) : void 0,
          onKeyDown: s ? (fe) => {
            (fe.key === "Enter" || fe.key === " ") && (fe.preventDefault(), s(x));
          } : void 0,
          children: [
            r && /* @__PURE__ */ p(
              "td",
              {
                className: `${rt.cell} ${rt.checkboxCell}`,
                onClick: (fe) => fe.stopPropagation(),
                children: /* @__PURE__ */ p(
                  vs,
                  {
                    checked: E,
                    onChange: (fe) => T(ce, fe)
                  }
                )
              }
            ),
            e.map((fe) => /* @__PURE__ */ p(
              "td",
              {
                className: `${rt.cell}${A === fe.key ? ` ${rt.sortedCell}` : ""}`,
                children: fe.render ? fe.render(x[fe.key], x) : String(x[fe.key] ?? "")
              },
              fe.key
            ))
          ]
        },
        ce
      );
    }) })
  ] }) });
}
const lh = "_datePicker_23zmh_2", ch = "_inputRow_23zmh_7", uh = "_input_23zmh_7", dh = "_inputOpen_23zmh_30", fh = "_inputError_23zmh_34", ph = "_inputDisabled_23zmh_38", hh = "_calendarIcon_23zmh_48", mh = "_dropdown_23zmh_60", gh = "_calendarHeader_23zmh_71", _h = "_navButton_23zmh_78", bh = "_monthYear_23zmh_91", yh = "_weekHeader_23zmh_98", kh = "_weekDay_23zmh_105", wh = "_dayGrid_23zmh_112", xh = "_day_23zmh_112", vh = "_disabled_23zmh_134", Eh = "_selected_23zmh_134", Sh = "_rangeStart_23zmh_134", Ch = "_rangeEnd_23zmh_134", Nh = "_today_23zmh_138", $h = "_inRange_23zmh_148", Ih = "_emptyDay_23zmh_176", Ye = {
  datePicker: lh,
  inputRow: ch,
  input: uh,
  inputOpen: dh,
  inputError: fh,
  inputDisabled: ph,
  calendarIcon: hh,
  dropdown: mh,
  calendarHeader: gh,
  navButton: _h,
  monthYear: bh,
  weekHeader: yh,
  weekDay: kh,
  dayGrid: wh,
  day: xh,
  disabled: vh,
  selected: Eh,
  rangeStart: Sh,
  rangeEnd: Ch,
  today: Nh,
  inRange: $h,
  emptyDay: Ih
}, Ah = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], Mh = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function Lh(e, n) {
  return new Date(e, n + 1, 0).getDate();
}
function Rh(e, n) {
  return new Date(e, n, 1).getDay();
}
function cl(e, n, t) {
  const r = String(n + 1).padStart(2, "0"), i = String(t).padStart(2, "0");
  return `${e}-${r}-${i}`;
}
function Th() {
  const e = /* @__PURE__ */ new Date();
  return cl(e.getFullYear(), e.getMonth(), e.getDate());
}
function Dh(e) {
  if (!e) return null;
  const n = e.split("-");
  return n.length !== 3 ? null : {
    year: parseInt(n[0], 10),
    month: parseInt(n[1], 10) - 1,
    day: parseInt(n[2], 10)
  };
}
const Ph = ({
  mode: e,
  selectedDate: n,
  selectedEndDate: t,
  onSelectDate: r,
  min: i,
  max: o
}) => {
  const s = Dh(n), a = /* @__PURE__ */ new Date(), [c, l] = U(s ? s.year : a.getFullYear()), [u, d] = U(s ? s.month : a.getMonth()), h = Th(), f = Lh(c, u), m = Rh(c, u), y = () => {
    u === 0 ? (d(11), l(c - 1)) : d(u - 1);
  }, _ = () => {
    u === 11 ? (d(0), l(c + 1)) : d(u + 1);
  }, b = (w) => !!(i && w < i || o && w > o), k = (w) => e !== "range" || !n || !t ? !1 : w > n && w < t, g = (w) => e !== "range" || !n ? !1 : w === n, S = (w) => e !== "range" || !t ? !1 : w === t, v = [];
  for (let w = 0; w < m; w++)
    v.push(/* @__PURE__ */ p("div", { className: Ye.emptyDay }, `empty-${w}`));
  for (let w = 1; w <= f; w++) {
    const $ = cl(c, u, w), A = b($), D = e === "single" && $ === n, N = g($), T = S($), L = k($), j = $ === h, F = [
      Ye.day,
      j && Ye.today,
      D && Ye.selected,
      N && Ye.rangeStart,
      T && Ye.rangeEnd,
      L && Ye.inRange,
      A && Ye.disabled
    ].filter(Boolean).join(" ");
    v.push(
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: F,
          onClick: () => r($),
          disabled: A,
          "aria-label": $,
          children: w
        },
        $
      )
    );
  }
  return /* @__PURE__ */ M("div", { role: "grid", "aria-label": "Calendar", children: [
    /* @__PURE__ */ M("div", { className: Ye.calendarHeader, children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: Ye.navButton,
          onClick: y,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ p(Io, { size: 16 })
        }
      ),
      /* @__PURE__ */ M("span", { className: Ye.monthYear, children: [
        Ah[u],
        " ",
        c
      ] }),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: Ye.navButton,
          onClick: _,
          "aria-label": "Next month",
          children: /* @__PURE__ */ p(Ao, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: Ye.weekHeader, children: Mh.map((w) => /* @__PURE__ */ p("span", { className: Ye.weekDay, children: w }, w)) }),
    /* @__PURE__ */ p("div", { className: Ye.dayGrid, children: v })
  ] });
}, ho = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function Cr(e) {
  if (!e) return "";
  const n = e.split("-");
  if (n.length !== 3) return e;
  const t = parseInt(n[1], 10) - 1, r = parseInt(n[2], 10), i = parseInt(n[0], 10);
  return `${ho[t]} ${r}, ${i}`;
}
function Oh(e, n) {
  if (!e && !n) return "";
  if (e && !n) return Cr(e);
  if (!e && n) return Cr(n);
  const t = e.split("-"), r = n.split("-"), i = parseInt(t[1], 10) - 1, o = parseInt(t[2], 10), s = parseInt(t[0], 10), a = parseInt(r[1], 10) - 1, c = parseInt(r[2], 10), l = parseInt(r[0], 10);
  return s === l ? `${ho[i]} ${o} – ${ho[a]} ${c}, ${l}` : `${Cr(e)} – ${Cr(n)}`;
}
const lI = ({
  mode: e = "single",
  value: n,
  onChange: t,
  min: r,
  max: i,
  label: o,
  error: s,
  helperText: a,
  disabled: c = !1,
  id: l,
  autoClose: u = !1
}) => {
  const [d, h] = U(!1), [f, m] = U(""), y = Y(null), _ = typeof n == "string" ? n : "", b = Array.isArray(n) ? n : ["", ""], k = e === "single" ? Cr(_) : Oh(b[0], b[1]), g = () => {
    c || (h((D) => !D), d || m(""));
  }, S = (D) => {
    if (e === "single")
      t(D), h(!1);
    else if (!f)
      m(D);
    else {
      let N = f, T = D;
      T < N && ([N, T] = [T, N]), t([N, T]), m(""), u && h(!1);
    }
  }, v = K(
    (D) => {
      D.key === "Escape" && d && h(!1);
    },
    [d]
  );
  ae(() => {
    const D = (N) => {
      y.current && !y.current.contains(N.target) && h(!1);
    };
    return document.addEventListener("mousedown", D), document.addEventListener("keydown", v), () => {
      document.removeEventListener("mousedown", D), document.removeEventListener("keydown", v);
    };
  }, [v]);
  const w = e === "single" ? _ : f || b[0], $ = e === "range" && !f ? b[1] : void 0, A = [
    Ye.input,
    d && Ye.inputOpen,
    s && Ye.inputError,
    c && Ye.inputDisabled
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p(An, { label: o, htmlFor: l, error: s, helperText: a, disabled: c, children: /* @__PURE__ */ M("div", { ref: y, className: Ye.datePicker, children: [
    /* @__PURE__ */ M("div", { className: Ye.inputRow, onClick: g, children: [
      /* @__PURE__ */ p(
        "input",
        {
          id: l,
          type: "text",
          readOnly: !0,
          value: k,
          className: A,
          placeholder: e === "range" ? "Select date range" : "Select date",
          disabled: c
        }
      ),
      /* @__PURE__ */ p("span", { className: Ye.calendarIcon, children: /* @__PURE__ */ p(xu, { size: 16 }) })
    ] }),
    d && /* @__PURE__ */ p("div", { className: Ye.dropdown, children: /* @__PURE__ */ p(
      Ph,
      {
        mode: e,
        selectedDate: w,
        selectedEndDate: $,
        onSelectDate: S,
        min: r,
        max: i
      }
    ) })
  ] }) });
}, zh = "_divider_19a9q_1", Bh = "_sm_19a9q_3", Fh = "_md_19a9q_7", jh = "_lg_19a9q_11", Hh = "_horizontal_19a9q_16", qh = "_vertical_19a9q_23", Kn = {
  divider: zh,
  sm: Bh,
  md: Fh,
  lg: jh,
  horizontal: Hh,
  vertical: qh
}, cI = ({
  orientation: e = "horizontal",
  size: n = "md",
  className: t = ""
}) => e === "vertical" ? /* @__PURE__ */ p(
  "div",
  {
    role: "separator",
    "aria-orientation": "vertical",
    className: `${Kn.divider} ${Kn.vertical} ${Kn[n]} ${t}`
  }
) : /* @__PURE__ */ p(
  "hr",
  {
    className: `${Kn.divider} ${Kn.horizontal} ${Kn[n]} ${t}`
  }
), Uh = "_field_1fe9s_1", Wh = "_sm_1fe9s_12", Gh = "_md_1fe9s_16", Vh = "_lg_1fe9s_20", Xh = "_editable_1fe9s_24", Kh = "_disabled_1fe9s_32", Yh = "_placeholder_1fe9s_37", Zh = "_editing_1fe9s_41", hn = {
  field: Uh,
  sm: Wh,
  md: Gh,
  lg: Vh,
  editable: Xh,
  disabled: Kh,
  placeholder: Yh,
  editing: Zh
}, Qh = {
  sm: hn.sm,
  md: hn.md,
  lg: hn.lg
}, uI = ({
  value: e,
  onChange: n,
  size: t,
  disabled: r = !1,
  placeholder: i,
  ariaLabel: o,
  className: s = "",
  onEditStart: a,
  onEditEnd: c,
  onCancel: l
}) => {
  const u = ln(t, "md"), d = Qh[u], [h, f] = U(!1), [m, y] = U(e), [_, b] = U(null), k = Y(null), g = Y(null);
  ae(() => {
    h && g.current && (g.current.focus(), g.current.select());
  }, [h]);
  const S = () => {
    r || (k.current && b(k.current.offsetWidth), y(e), f(!0), a == null || a());
  }, v = () => {
    const L = m.trim();
    if (L === "") {
      w();
      return;
    }
    L !== e && n(m), f(!1), c == null || c("commit");
  }, w = () => {
    f(!1), l == null || l(), c == null || c("cancel");
  }, $ = (L) => {
    L.key === "Enter" && (L.preventDefault(), S());
  }, A = (L) => {
    L.key === "Enter" ? (L.preventDefault(), v()) : L.key === "Escape" && (L.preventDefault(), w());
  };
  if (h) {
    const L = [hn.field, d, hn.editing, s].filter(Boolean).join(" ");
    return /* @__PURE__ */ p(
      "input",
      {
        ref: g,
        type: "text",
        className: L,
        value: m,
        placeholder: i,
        "aria-label": o ?? e,
        onChange: (j) => y(j.target.value),
        onKeyDown: A,
        onBlur: v,
        style: _ !== null ? { width: _ } : void 0
      }
    );
  }
  const D = e === "" ? i ?? "" : e, N = e === "", T = [
    hn.field,
    d,
    r ? "" : hn.editable,
    r ? hn.disabled : "",
    N ? hn.placeholder : "",
    s
  ].filter(Boolean).join(" ");
  return r ? /* @__PURE__ */ p("span", { ref: k, className: T, children: D }) : /* @__PURE__ */ p(
    "span",
    {
      ref: k,
      className: T,
      role: "button",
      tabIndex: 0,
      "aria-label": o ?? e,
      onDoubleClick: S,
      onKeyDown: $,
      children: D
    }
  );
}, Jh = "_root_1s2xm_1", em = "_illustration_1s2xm_13", tm = "_title_1s2xm_23", nm = "_description_1s2xm_31", rm = "_actions_1s2xm_38", gr = {
  root: Jh,
  illustration: em,
  title: tm,
  description: nm,
  actions: rm
}, dI = ({ illustration: e, title: n, description: t, className: r = "", children: i }) => /* @__PURE__ */ M("div", { className: `${gr.root} ${r}`, children: [
  e && /* @__PURE__ */ p("div", { className: gr.illustration, children: e }),
  /* @__PURE__ */ p("p", { className: gr.title, children: n }),
  t && /* @__PURE__ */ p("p", { className: gr.description, children: t }),
  i && /* @__PURE__ */ p("div", { className: gr.actions, children: i })
] }), im = "_wrapper_z9ikr_1", om = "_inputWrapper_z9ikr_5", sm = "_input_z9ikr_5", am = "_searchIcon_z9ikr_24", lm = "_dropdown_z9ikr_33", cm = "_result_z9ikr_56", um = "_resultActive_z9ikr_75", dm = "_resultIcon_z9ikr_82", fm = "_resultContent_z9ikr_90", pm = "_resultTitle_z9ikr_97", hm = "_resultDescription_z9ikr_104", mm = "_statusMessage_z9ikr_113", Dt = {
  wrapper: im,
  inputWrapper: om,
  input: sm,
  searchIcon: am,
  dropdown: lm,
  result: cm,
  resultActive: um,
  resultIcon: dm,
  resultContent: fm,
  resultTitle: pm,
  resultDescription: hm,
  statusMessage: mm
}, gm = ({ result: e, active: n }) => /* @__PURE__ */ M("div", { className: `${Dt.result} ${n ? Dt.resultActive : ""}`, children: [
  e.icon && /* @__PURE__ */ p("span", { className: Dt.resultIcon, children: e.icon }),
  /* @__PURE__ */ M("div", { className: Dt.resultContent, children: [
    /* @__PURE__ */ p("span", { className: Dt.resultTitle, children: e.title }),
    e.description && /* @__PURE__ */ p("span", { className: Dt.resultDescription, children: e.description })
  ] })
] }), fI = ({
  query: e,
  onQueryChange: n,
  results: t,
  onSelect: r,
  loading: i = !1,
  placeholder: o = "Search...",
  emptyMessage: s = "No matches",
  renderResult: a,
  shortcut: c = !0,
  className: l
}) => {
  const [u, d] = U(!1), [h, f] = U(-1), [m, y] = U({
    top: -9999,
    left: -9999
  }), _ = Y(null), b = Y(null), k = Y(null), g = Y(null), S = u && (e.length > 0 || i), v = K(() => {
    const T = _.current, L = k.current;
    if (!T || !L) return;
    const j = T.getBoundingClientRect(), F = L.offsetWidth, I = window.innerWidth, P = 8;
    let H = j.left;
    H + F > I - P && (H = Math.max(P, I - F - P)), y({
      top: j.bottom + 4,
      left: H
    });
  }, []);
  ae(() => {
    f(-1);
  }, [t]), ae(() => {
    if (!S) return;
    const T = requestAnimationFrame(() => {
      v();
    });
    return window.addEventListener("resize", v), window.addEventListener("scroll", v, !0), () => {
      cancelAnimationFrame(T), window.removeEventListener("resize", v), window.removeEventListener("scroll", v, !0);
    };
  }, [S, t, v]), ae(() => {
    function T(L) {
      var F, I;
      const j = L.target;
      (F = _.current) != null && F.contains(j) || (I = k.current) != null && I.contains(j) || d(!1);
    }
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, []), ae(() => {
    if (!c) return;
    function T(L) {
      var j;
      (L.metaKey || L.ctrlKey) && L.key === "k" && (L.preventDefault(), (j = b.current) == null || j.focus());
    }
    return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [c]), ae(() => {
    if (!(h < 0 || !k.current))
      return g.current !== null && clearTimeout(g.current), g.current = setTimeout(() => {
        var j;
        if (g.current = null, !k.current) return;
        const L = k.current.querySelectorAll("[data-result-index]")[h];
        (j = L == null ? void 0 : L.scrollIntoView) == null || j.call(L, { block: "nearest" });
      }, 50), () => {
        g.current !== null && (clearTimeout(g.current), g.current = null);
      };
  }, [h]);
  const w = K(
    (T) => {
      var L, j;
      if (S)
        switch (T.key) {
          case "ArrowDown":
            T.preventDefault(), f(
              (F) => F < t.length - 1 ? F + 1 : 0
            );
            break;
          case "ArrowUp":
            T.preventDefault(), f(
              (F) => F > 0 ? F - 1 : t.length - 1
            );
            break;
          case "Enter":
            T.preventDefault(), h >= 0 && h < t.length && (r(t[h].id), d(!1), (L = b.current) == null || L.blur());
            break;
          case "Escape":
            T.preventDefault(), d(!1), (j = b.current) == null || j.blur();
            break;
        }
    },
    [S, t, h, r]
  ), $ = (T) => {
    n(T.target.value), d(!0);
  }, A = () => {
    (e.length > 0 || i) && d(!0);
  }, D = (T) => {
    var L;
    r(T), d(!1), (L = b.current) == null || L.blur();
  }, N = S ? /* @__PURE__ */ p(
    "div",
    {
      ref: k,
      className: Dt.dropdown,
      style: m,
      role: "listbox",
      children: i && t.length === 0 ? /* @__PURE__ */ p("div", { className: Dt.statusMessage, children: "Searching..." }) : t.length === 0 ? /* @__PURE__ */ p("div", { className: Dt.statusMessage, children: s }) : t.map((T, L) => /* @__PURE__ */ p(
        "div",
        {
          "data-result-index": L,
          role: "option",
          "aria-selected": L === h,
          onClick: () => D(T.id),
          onMouseEnter: () => f(L),
          children: a ? a(T) : /* @__PURE__ */ p(
            gm,
            {
              result: T,
              active: L === h
            }
          )
        },
        T.id
      ))
    }
  ) : null;
  return /* @__PURE__ */ M(
    "div",
    {
      ref: _,
      className: `${Dt.wrapper}${l ? ` ${l}` : ""}`,
      children: [
        /* @__PURE__ */ M("div", { className: Dt.inputWrapper, children: [
          /* @__PURE__ */ p(Mo, { size: 14, className: Dt.searchIcon }),
          /* @__PURE__ */ p(
            "input",
            {
              ref: b,
              type: "text",
              value: e,
              onChange: $,
              onFocus: A,
              onKeyDown: w,
              placeholder: o,
              className: Dt.input,
              role: "combobox",
              "aria-expanded": S,
              "aria-haspopup": "listbox",
              "aria-autocomplete": "list",
              "aria-label": "Search"
            }
          )
        ] }),
        N && Rr(N, document.body)
      ]
    }
  );
}, _m = "_inputRow_a7agn_3", bm = "_triggerInput_a7agn_7", ym = "_triggerSwatch_a7agn_19", km = "_triggerValue_a7agn_27", wm = "_dropdown_a7agn_35", xm = "_gradientPicker_a7agn_43", vm = "_typeRow_a7agn_51", Em = "_typeRowActions_a7agn_58", Sm = "_typeSelect_a7agn_65", Cm = "_angleInput_a7agn_69", Nm = "_iconButton_a7agn_73", $m = "_barWrapper_a7agn_99", Im = "_bar_a7agn_99", Am = "_stopHandle_a7agn_111", Mm = "_stopHandleSelected_a7agn_128", Lm = "_stopsHeader_a7agn_136", Rm = "_stopsLabel_a7agn_142", Tm = "_stopsList_a7agn_148", Dm = "_stopEntry_a7agn_154", Pm = "_stopRow_a7agn_161", Om = "_stopRowSelected_a7agn_177", zm = "_positionInput_a7agn_182", Bm = "_colorPickerWrapper_a7agn_186", Ue = {
  inputRow: _m,
  triggerInput: bm,
  triggerSwatch: ym,
  triggerValue: km,
  dropdown: wm,
  gradientPicker: xm,
  typeRow: vm,
  typeRowActions: Em,
  typeSelect: Sm,
  angleInput: Cm,
  iconButton: Nm,
  barWrapper: $m,
  bar: Im,
  stopHandle: Am,
  stopHandleSelected: Mm,
  stopsHeader: Lm,
  stopsLabel: Rm,
  stopsList: Tm,
  stopEntry: Dm,
  stopRow: Pm,
  stopRowSelected: Om,
  positionInput: zm,
  colorPickerWrapper: Bm
};
function Fm(e) {
  const n = [];
  let t = 0, r = "";
  for (const i of e)
    i === "(" ? (t++, r += i) : i === ")" ? (t--, r += i) : i === "," && t === 0 ? (n.push(r), r = "") : r += i;
  return r.trim() && n.push(r), n;
}
function jm(e, n) {
  const t = e.trim(), r = t.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)\s*([\d.]+)?%?/);
  if (r) {
    const o = parseInt(r[1]), s = parseInt(r[2]), a = parseInt(r[3]), c = r[4] !== void 0 ? parseFloat(r[4]) : 1, l = r[5] !== void 0 ? parseFloat(r[5]) : 0, u = "#" + [o, s, a].map((d) => d.toString(16).padStart(2, "0")).join("");
    return { id: n, color: u, position: l, opacity: c };
  }
  const i = t.match(/(#[0-9a-fA-F]{3,8})\s*([\d.]+)?%?/);
  if (i) {
    let o = i[1];
    o.length === 4 && (o = "#" + o[1] + o[1] + o[2] + o[2] + o[3] + o[3]);
    const s = i[2] !== void 0 ? parseFloat(i[2]) : 0;
    return { id: n, color: o.toLowerCase(), position: s, opacity: 1 };
  }
  return null;
}
function Oi(e) {
  const n = {
    type: "linear",
    angle: 90,
    stops: [
      { id: "a", color: "#d9d9d9", position: 0, opacity: 1 },
      { id: "b", color: "#737373", position: 100, opacity: 1 }
    ]
  };
  if (!(e != null && e.trim())) return n;
  const t = e.trim(), r = t.startsWith("linear-gradient"), i = t.startsWith("radial-gradient");
  if (!r && !i) return n;
  const o = t.slice(t.indexOf("(") + 1, t.lastIndexOf(")")), s = Fm(o);
  if (s.length < 2) return n;
  let a = 90, c = 0;
  if (r) {
    const d = s[0].trim(), h = d.match(/^(-?\d+(?:\.\d+)?)deg$/), f = d.match(/^to\s+(right|left|top|bottom)$/i);
    if (h)
      a = parseFloat(h[1]), c = 1;
    else if (f) {
      const m = f[1].toLowerCase();
      a = m === "right" ? 90 : m === "left" ? 270 : m === "bottom" ? 180 : 0, c = 1;
    }
  } else
    /^(circle|ellipse)/.test(s[0].trim()) && (c = 1);
  let l = 0;
  const u = [];
  for (let d = c; d < s.length; d++) {
    const h = jm(s[d], String(++l));
    h && u.push(h);
  }
  return u.length < 2 ? n : { type: r ? "linear" : "radial", angle: a, stops: u };
}
function zi(e) {
  const t = [...e.stops].sort((r, i) => r.position - i.position).map((r) => {
    if (r.opacity < 1) {
      const i = parseInt(r.color.slice(1, 3), 16), o = parseInt(r.color.slice(3, 5), 16), s = parseInt(r.color.slice(5, 7), 16), a = Math.round(r.opacity * 100) / 100;
      return `rgba(${i},${o},${s},${a}) ${r.position}%`;
    }
    return `${r.color} ${r.position}%`;
  });
  return e.type === "radial" ? `radial-gradient(circle, ${t.join(", ")})` : `linear-gradient(${e.angle}deg, ${t.join(", ")})`;
}
function Is() {
  return Math.random().toString(36).slice(2, 9);
}
function As(e, n) {
  const t = [...e].sort((r, i) => r.position - i.position);
  if (n <= t[0].position) return t[0].color;
  if (n >= t[t.length - 1].position) return t[t.length - 1].color;
  for (let r = 0; r < t.length - 1; r++) {
    const i = t[r], o = t[r + 1];
    if (n >= i.position && n <= o.position) {
      const s = (n - i.position) / (o.position - i.position), a = (d, h, f) => Math.round(parseInt(d.slice(f, f + 2), 16) + (parseInt(h.slice(f, f + 2), 16) - parseInt(d.slice(f, f + 2), 16)) * s), c = a(i.color, o.color, 1), l = a(i.color, o.color, 3), u = a(i.color, o.color, 5);
      return "#" + [c, l, u].map((d) => d.toString(16).padStart(2, "0")).join("");
    }
  }
  return t[0].color;
}
const pI = ({
  value: e,
  onChange: n,
  inline: t = !1,
  label: r,
  labelPosition: i = "top",
  labelWidth: o,
  id: s,
  offsetX: a = 0,
  offsetY: c = 0
}) => {
  const [l, u] = U(() => Oi(e)), [d, h] = U(() => {
    var O;
    return ((O = Oi(e).stops[0]) == null ? void 0 : O.id) ?? "";
  }), [f, m] = U(!1), [y, _] = U(null), b = Y(null), k = Y(null), g = Y(null), S = Y(e), v = K(
    (O) => {
      const x = zi(O);
      S.current = x, u(O), n(x);
    },
    [n]
  );
  ae(() => {
    var O;
    if (e !== S.current) {
      S.current = e;
      const x = Oi(e);
      u(x), h(((O = x.stops[0]) == null ? void 0 : O.id) ?? "");
    }
  }, [e]);
  const w = Ht(
    () => zi({ ...l, type: "linear", angle: 90 }),
    [l]
  ), $ = (O) => {
    if (O.target !== O.currentTarget) return;
    _(null);
    const x = k.current;
    if (!x) return;
    const X = x.getBoundingClientRect(), ce = Math.round(Math.max(0, Math.min(100, (O.clientX - X.left) / X.width * 100))), E = As(l.stops, ce), be = { id: Is(), color: E, position: ce, opacity: 1 }, fe = { ...l, stops: [...l.stops, be] };
    h(be.id), v(fe);
  }, A = (O, x) => {
    O.preventDefault(), _(null), h(x);
    const X = l.stops.find((ce) => ce.id === x);
    X && (g.current = { id: x, startX: O.clientX, startPos: X.position }, O.currentTarget.setPointerCapture(O.pointerId));
  }, D = (O) => {
    if (!g.current) return;
    const x = k.current;
    if (!x) return;
    const X = x.getBoundingClientRect(), ce = (O.clientX - g.current.startX) / X.width * 100, E = Math.round(Math.max(0, Math.min(100, g.current.startPos + ce))), be = {
      ...l,
      stops: l.stops.map((fe) => fe.id === g.current.id ? { ...fe, position: E } : fe)
    };
    u(be), n(zi(be));
  }, N = () => {
    g.current = null;
  }, T = () => {
    const O = [...l.stops].sort((E, be) => E.position - be.position);
    let x = 50;
    if (O.length >= 2) {
      let E = 0;
      for (let be = 0; be < O.length - 1; be++) {
        const fe = O[be + 1].position - O[be].position;
        fe > E && (E = fe, x = Math.round((O[be].position + O[be + 1].position) / 2));
      }
    }
    const X = { id: Is(), color: As(l.stops, x), position: x, opacity: 1 }, ce = { ...l, stops: [...l.stops, X] };
    h(X.id), v(ce);
  }, L = (O) => {
    if (l.stops.length <= 2) return;
    const x = { ...l, stops: l.stops.filter((X) => X.id !== O) };
    d === O && h(x.stops[0].id), v(x);
  }, j = (O, x) => {
    v({ ...l, stops: l.stops.map((X) => X.id === O ? { ...X, ...x } : X) });
  }, F = () => {
    v({ ...l, angle: (l.angle + 180) % 360 });
  }, I = () => {
    v({ ...l, stops: l.stops.map((O) => ({ ...O, position: 100 - O.position })) });
  }, P = Ht(
    () => [...l.stops].sort((O, x) => O.position - x.position),
    [l.stops]
  ), H = /* @__PURE__ */ M("div", { className: Ue.gradientPicker, children: [
    /* @__PURE__ */ M("div", { className: Ue.typeRow, children: [
      /* @__PURE__ */ p(
        Lo,
        {
          size: "sm",
          value: l.type,
          onChange: (O) => v({ ...l, type: O }),
          options: [
            { value: "linear", label: "Linear" },
            { value: "radial", label: "Radial" }
          ],
          className: Ue.typeSelect
        }
      ),
      l.type === "linear" && /* @__PURE__ */ p(
        Pt,
        {
          prefix: "°",
          type: "number",
          value: String(l.angle),
          onChange: (O) => v({ ...l, angle: ((parseInt(O) || 0) + 360) % 360 }),
          min: 0,
          max: 359,
          scrub: !0,
          className: Ue.angleInput
        }
      ),
      /* @__PURE__ */ M("div", { className: Ue.typeRowActions, children: [
        l.type === "linear" && /* @__PURE__ */ p("button", { type: "button", className: Ue.iconButton, onClick: F, "aria-label": "Flip direction", children: /* @__PURE__ */ p(bu, { size: 14 }) }),
        /* @__PURE__ */ p("button", { type: "button", className: Ue.iconButton, onClick: I, "aria-label": "Reverse stops", children: /* @__PURE__ */ p(ju, { size: 14 }) })
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: Ue.barWrapper, children: /* @__PURE__ */ p(
      "div",
      {
        ref: k,
        className: Ue.bar,
        style: { background: w },
        onClick: $,
        "aria-label": "Gradient bar — click to add a stop",
        children: l.stops.map((O) => /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: `${Ue.stopHandle} ${O.id === d ? Ue.stopHandleSelected : ""}`,
            style: { left: `${O.position}%`, backgroundColor: O.color },
            onPointerDown: (x) => A(x, O.id),
            onPointerMove: D,
            onPointerUp: N,
            onClick: (x) => {
              x.stopPropagation(), h(O.id);
            },
            "aria-label": `Color stop at ${O.position}%`
          },
          O.id
        ))
      }
    ) }),
    /* @__PURE__ */ M("div", { className: Ue.stopsHeader, children: [
      /* @__PURE__ */ p("span", { className: Ue.stopsLabel, children: "Stops" }),
      /* @__PURE__ */ p("button", { type: "button", className: Ue.iconButton, onClick: T, "aria-label": "Add stop", children: /* @__PURE__ */ p(Fu, { size: 14 }) })
    ] }),
    /* @__PURE__ */ p("div", { className: Ue.stopsList, children: P.map((O) => /* @__PURE__ */ M("div", { className: Ue.stopEntry, children: [
      /* @__PURE__ */ M(
        "div",
        {
          className: `${Ue.stopRow} ${O.id === d ? Ue.stopRowSelected : ""}`,
          onClick: () => h(O.id),
          children: [
            /* @__PURE__ */ p(
              Pt,
              {
                prefix: "%",
                type: "number",
                value: String(O.position),
                onChange: (x) => j(O.id, { position: Math.max(0, Math.min(100, parseInt(x) || 0)) }),
                min: 0,
                max: 100,
                scrub: !0,
                className: Ue.positionInput
              }
            ),
            /* @__PURE__ */ p("div", { className: Ue.colorPickerWrapper, children: /* @__PURE__ */ p(
              po,
              {
                value: O.color,
                onChange: (x) => j(O.id, { color: x }),
                opacity: O.opacity,
                onOpacityChange: (x) => j(O.id, { opacity: x }),
                isOpen: y === O.id,
                onOpenChange: (x) => _(x ? O.id : null)
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: Ue.iconButton,
          onClick: (x) => {
            x.stopPropagation(), L(O.id);
          },
          disabled: l.stops.length <= 2,
          "aria-label": `Remove stop at ${O.position}%`,
          children: /* @__PURE__ */ p(Ru, { size: 14 })
        }
      )
    ] }, O.id)) })
  ] });
  if (t)
    return /* @__PURE__ */ p(li, { label: r, labelPosition: i, labelWidth: o, htmlFor: s, children: H });
  const B = /* @__PURE__ */ M("div", { ref: b, className: Ue.inputRow, children: [
    /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        id: s,
        className: Ue.triggerInput,
        onClick: () => m((O) => !O),
        "aria-label": "Open gradient picker",
        children: [
          /* @__PURE__ */ p("span", { className: Ue.triggerSwatch, style: { background: e } }),
          /* @__PURE__ */ p("span", { className: Ue.triggerValue, children: e.replace(/^[\w-]+\(/, "").replace(/\)$/, "") })
        ]
      }
    ),
    /* @__PURE__ */ p(
      Ct,
      {
        isOpen: f,
        onClose: () => m(!1),
        anchorRef: b,
        className: Ue.dropdown,
        role: "dialog",
        "aria-label": "Gradient picker",
        offsetX: a,
        offsetY: c,
        children: H
      }
    )
  ] });
  return /* @__PURE__ */ p(li, { label: r, labelPosition: i, labelWidth: o, htmlFor: s, children: B });
}, Hm = "_wrapper_9fk1n_1", qm = "_icon_9fk1n_5", Um = "_input_9fk1n_14", Wm = "_clearButton_9fk1n_28", Xr = {
  wrapper: Hm,
  icon: qm,
  input: Um,
  clearButton: Wm
}, ul = ({
  value: e,
  onChange: n,
  placeholder: t,
  icon: r = "search",
  clearable: i = !0,
  id: o,
  className: s = "",
  onBlur: a
}) => {
  const c = r === "filter" ? Lu : Mo;
  return /* @__PURE__ */ M("div", { className: `${Xr.wrapper} ${s}`, children: [
    /* @__PURE__ */ p(c, { size: 14, className: Xr.icon }),
    /* @__PURE__ */ p(
      "input",
      {
        id: o,
        type: "text",
        value: e,
        onChange: (l) => n(l.target.value),
        onBlur: a,
        placeholder: t,
        className: Xr.input,
        "aria-label": t ?? "Search"
      }
    ),
    i && e && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        onClick: () => n(""),
        className: Xr.clearButton,
        "aria-label": "Clear",
        children: /* @__PURE__ */ p(lr, { size: 14 })
      }
    )
  ] });
}, Gm = "_inputRow_3izwz_1", Vm = "_trigger_3izwz_7", Xm = "_triggerLabel_3izwz_29", Km = "_triggerLabelEmpty_3izwz_40", Ym = "_thumbnail_3izwz_49", Zm = "_placeholder_3izwz_57", Qm = "_dropdown_3izwz_65", Jm = "_panel_3izwz_71", eg = "_search_3izwz_78", tg = "_list_3izwz_83", ng = "_item_3izwz_92", rg = "_itemSelected_3izwz_115", ig = "_itemImage_3izwz_124", og = "_itemLabel_3izwz_133", sg = "_empty_3izwz_143", _t = {
  inputRow: Gm,
  trigger: Vm,
  triggerLabel: Xm,
  triggerLabelEmpty: Km,
  thumbnail: Ym,
  placeholder: Zm,
  dropdown: Qm,
  panel: Jm,
  search: eg,
  list: tg,
  item: ng,
  itemSelected: rg,
  itemImage: ig,
  itemLabel: og,
  empty: sg
}, hI = ({
  value: e,
  onChange: n,
  images: t,
  label: r,
  labelPosition: i = "top",
  labelWidth: o,
  id: s
}) => {
  const [a, c] = U(!1), [l, u] = U(""), d = Y(null), h = Y(null), f = t.find((k) => k.key === e), m = l.trim() ? t.filter((k) => k.label.toLowerCase().includes(l.toLowerCase())) : t;
  ae(() => {
    var k;
    if (a) {
      const g = (k = h.current) == null ? void 0 : k.querySelector("input");
      g == null || g.focus();
    } else
      u("");
  }, [a]);
  const y = (k) => {
    n(k), c(!1);
  }, _ = /* @__PURE__ */ M("div", { className: _t.panel, children: [
    /* @__PURE__ */ p("div", { className: _t.search, ref: h, children: /* @__PURE__ */ p(
      ul,
      {
        value: l,
        onChange: u,
        placeholder: "Filter images…",
        icon: "filter",
        clearable: !0
      }
    ) }),
    /* @__PURE__ */ p("div", { className: _t.list, children: m.length === 0 ? /* @__PURE__ */ p("p", { className: _t.empty, children: "No images match" }) : m.map((k) => /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        className: `${_t.item} ${k.key === e ? _t.itemSelected : ""}`,
        onClick: () => y(k.key),
        "aria-pressed": k.key === e,
        children: [
          /* @__PURE__ */ p("img", { src: k.src, alt: k.label, className: _t.itemImage }),
          /* @__PURE__ */ p("span", { className: _t.itemLabel, children: k.label })
        ]
      },
      k.key
    )) })
  ] }), b = /* @__PURE__ */ M("div", { className: _t.inputRow, children: [
    /* @__PURE__ */ M(
      "button",
      {
        ref: d,
        className: _t.trigger,
        onClick: () => c((k) => !k),
        type: "button",
        id: s,
        "aria-label": f ? f.label : "Select image",
        children: [
          f ? /* @__PURE__ */ p("img", { src: f.src, alt: f.label, className: _t.thumbnail }) : /* @__PURE__ */ p("span", { className: _t.placeholder, "aria-hidden": "true" }),
          /* @__PURE__ */ p("span", { className: f ? _t.triggerLabel : _t.triggerLabelEmpty, children: f ? f.label : "Select image" })
        ]
      }
    ),
    /* @__PURE__ */ p(
      Ct,
      {
        isOpen: a,
        onClose: () => c(!1),
        anchorRef: d,
        className: _t.dropdown,
        role: "dialog",
        "aria-label": "Image picker",
        children: _
      }
    )
  ] });
  return r && i === "left" ? /* @__PURE__ */ p(jn, { label: r, labelPosition: "left", labelWidth: o, htmlFor: s, children: b }) : /* @__PURE__ */ p(An, { label: r, htmlFor: s, children: b });
}, ag = "_kbd_umkq8_1", lg = {
  kbd: ag
};
function cg({ children: e, className: n, ...t }) {
  return /* @__PURE__ */ p("kbd", { className: [lg.kbd, n].filter(Boolean).join(" "), ...t, children: e });
}
const ug = "_input_1aobs_1", dg = "_error_1aobs_5", fg = "_prefixWrapper_1aobs_10", pg = "_prefix_1aobs_10", hg = "_prefixInput_1aobs_33", Yn = {
  input: ug,
  error: dg,
  prefixWrapper: fg,
  prefix: pg,
  prefixInput: hg
}, mI = ({
  type: e = "text",
  value: n,
  onChange: t,
  label: r,
  error: i,
  helperText: o,
  min: s,
  max: a,
  step: c,
  id: l,
  placeholder: u,
  prefix: d,
  prefixSlot: h,
  onBlur: f,
  className: m = ""
}) => {
  const y = mn(), _ = mn(), b = i ? y : void 0, k = o && !i ? _ : void 0, g = [b, k].filter(Boolean).join(" ") || void 0, S = !!(d || h), v = /* @__PURE__ */ p(
    "input",
    {
      id: l,
      type: e,
      value: n,
      onChange: (w) => t(w.target.value),
      onBlur: f,
      className: S ? Yn.prefixInput : `${Yn.input} ${i ? Yn.error : ""}`.trim(),
      min: s,
      max: a,
      step: c,
      placeholder: u,
      "aria-invalid": i ? !0 : void 0,
      "aria-describedby": g
    }
  );
  return /* @__PURE__ */ p(An, { label: r, htmlFor: l, error: i, helperText: o, errorId: b, helperId: k, className: m, children: S ? /* @__PURE__ */ M("div", { className: `${Yn.prefixWrapper} ${i ? Yn.error : ""}`.trim(), children: [
    /* @__PURE__ */ p("span", { className: Yn.prefix, children: h ?? d }),
    v
  ] }) : v });
}, mg = "_numberedList_1dvtz_1", gg = "_md_1dvtz_11", _g = "_sm_1dvtz_15", bg = "_item_1dvtz_20", Bi = {
  numberedList: mg,
  md: gg,
  sm: _g,
  item: bg
}, gI = ({
  items: e,
  size: n = "md",
  start: t = 1,
  className: r
}) => {
  const i = [
    Bi.numberedList,
    Bi[n],
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p(
    "ol",
    {
      className: i,
      start: t,
      style: { counterReset: `list-counter ${t - 1}` },
      children: e.map((o, s) => /* @__PURE__ */ p("li", { className: Bi.item, children: o }, s))
    }
  );
}, yg = "_menu_1lj7a_1", kg = "_item_1lj7a_10", wg = "_destructive_1lj7a_30", xg = "_disabled_1lj7a_38", vg = "_icon_1lj7a_42", Eg = "_label_1lj7a_49", Sg = "_shortcut_1lj7a_53", Cg = "_separator_1lj7a_60", En = {
  menu: yg,
  item: kg,
  destructive: wg,
  disabled: xg,
  icon: vg,
  label: Eg,
  shortcut: Sg,
  separator: Cg
}, Ng = ({
  children: e,
  items: n,
  className: t = "",
  open: r,
  position: i,
  onClose: o
}) => {
  const s = r !== void 0, [a, c] = U(!1), [l, u] = U({ x: 0, y: 0 }), [d, h] = U(-1), f = Y(null), m = Y(null), y = s ? r : a, _ = s ? i ?? l : l, b = n.map((w, $) => ({ item: w, idx: $ })).filter(({ item: w }) => !w.separator && !w.disabled).map(({ idx: w }) => w), k = K(() => {
    s ? o == null || o() : c(!1), h(-1), m.current && m.current.focus();
  }, [s, o]), g = K(
    (w) => {
      w.preventDefault(), w.stopPropagation(), m.current = w.target instanceof HTMLElement ? w.target : null, u({ x: w.clientX, y: w.clientY }), c(!0);
    },
    []
  ), S = K(
    (w) => {
      var $;
      w.disabled || (k(), ($ = w.onClick) == null || $.call(w));
    },
    [k]
  );
  ae(() => {
    y && b.length > 0 && h(b[0]);
  }, [y]), ae(() => {
    if (y && d >= 0 && f.current) {
      const w = f.current.querySelector(
        `[data-item-index="${d}"]`
      );
      w == null || w.focus();
    }
  }, [y, d]), ae(() => {
    if (y && f.current) {
      const $ = f.current.getBoundingClientRect(), A = window.innerWidth, D = window.innerHeight;
      let N = _.x, T = _.y;
      _.x + $.width > A && (N = _.x - $.width), _.y + $.height > D && (T = _.y - $.height), !s && (N !== _.x || T !== _.y) && u({ x: N, y: T });
    }
  }, [y, _, s]), ae(() => {
    if (!y) return;
    const w = (A) => {
      f.current && !f.current.contains(A.target) && k();
    }, $ = (A) => {
      const D = b.indexOf(d);
      switch (A.key) {
        case "ArrowDown": {
          A.preventDefault();
          const N = D < b.length - 1 ? D + 1 : 0;
          h(b[N]);
          break;
        }
        case "ArrowUp": {
          A.preventDefault();
          const N = D > 0 ? D - 1 : b.length - 1;
          h(b[N]);
          break;
        }
        case "Home": {
          A.preventDefault(), h(b[0]);
          break;
        }
        case "End": {
          A.preventDefault(), h(b[b.length - 1]);
          break;
        }
        case "Escape": {
          k();
          break;
        }
        case "Tab": {
          k();
          break;
        }
      }
    };
    return document.addEventListener("mousedown", w), document.addEventListener("keydown", $), () => {
      document.removeEventListener("mousedown", w), document.removeEventListener("keydown", $);
    };
  }, [y, k, d, b]);
  const v = y ? Oc.createPortal(
    /* @__PURE__ */ p(
      "div",
      {
        ref: f,
        className: En.menu,
        style: {
          left: _.x,
          top: _.y
        },
        role: "menu",
        "data-admin-popover": !0,
        children: n.map((w, $) => {
          if (w.separator)
            return /* @__PURE__ */ p("div", { className: En.separator, role: "separator" }, $);
          const A = [
            En.item,
            w.variant === "destructive" && En.destructive,
            w.disabled && En.disabled
          ].filter(Boolean).join(" ");
          return /* @__PURE__ */ M(
            "button",
            {
              type: "button",
              className: A,
              onClick: () => S(w),
              role: "menuitem",
              "aria-disabled": w.disabled,
              disabled: w.disabled,
              tabIndex: $ === d ? 0 : -1,
              "data-item-index": $,
              children: [
                w.icon && /* @__PURE__ */ p(w.icon, { size: 14, className: En.icon, "aria-hidden": "true" }),
                /* @__PURE__ */ p("span", { className: En.label, children: w.label }),
                w.shortcut && /* @__PURE__ */ p("span", { className: En.shortcut, children: w.shortcut })
              ]
            },
            $
          );
        })
      }
    ),
    document.body
  ) : null;
  return s ? /* @__PURE__ */ p(kt, { children: v }) : /* @__PURE__ */ M("div", { className: t, onContextMenu: g, children: [
    e,
    v
  ] });
}, $g = "_wrapper_5glzu_1", Ig = "_wrapperPopover_5glzu_10", Ag = "_editorPopover_5glzu_14", Mg = "_toolsRow_5glzu_22", Lg = "_toolsScroll_5glzu_35", Rg = "_clearFixed_5glzu_50", Tg = "_brushAnchor_5glzu_59", Dg = "_brushPopover_5glzu_65", Pg = "_menuPopover_5glzu_74", Og = "_menuItem_5glzu_81", zg = "_menuItemIconSlot_5glzu_104", Bg = "_colorsRow_5glzu_120", Fg = "_swatchScroll_5glzu_130", jg = "_eyedropperFixed_5glzu_145", Hg = "_customSwatchFixed_5glzu_153", qg = "_swatch_5glzu_130", Ug = "_swatchActive_5glzu_182", Wg = "_swatchCustom_5glzu_187", Gg = "_customSwatchWrapper_5glzu_192", Vg = "_colorPickerPopover_5glzu_199", Xg = "_canvasContainer_5glzu_206", Kg = "_canvasInner_5glzu_215", Yg = "_canvas_5glzu_206", Zg = "_canvasPreview_5glzu_228", Qg = "_popoverContainer_5glzu_235", Jg = "_popoverTrigger_5glzu_240", e_ = "_popoverTriggerOpen_5glzu_261", t_ = "_miniPreview_5glzu_265", ye = {
  wrapper: $g,
  wrapperPopover: Ig,
  editorPopover: Ag,
  toolsRow: Mg,
  toolsScroll: Lg,
  clearFixed: Rg,
  brushAnchor: Tg,
  brushPopover: Dg,
  menuPopover: Pg,
  menuItem: Og,
  menuItemIconSlot: zg,
  colorsRow: Bg,
  swatchScroll: Fg,
  eyedropperFixed: jg,
  customSwatchFixed: Hg,
  swatch: qg,
  swatchActive: Ug,
  swatchCustom: Wg,
  customSwatchWrapper: Gg,
  colorPickerPopover: Vg,
  canvasContainer: Xg,
  canvasInner: Kg,
  canvas: Yg,
  canvasPreview: Zg,
  popoverContainer: Qg,
  popoverTrigger: Jg,
  popoverTriggerOpen: e_,
  miniPreview: t_
}, Zn = /^#[0-9a-fA-F]{6}$/, n_ = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff8800",
  "#8800ff"
], r_ = "#e0e0e0", dl = {
  sm: [[0, 0]],
  md: [[0, 0], [1, 0], [0, 1], [1, 1]],
  lg: [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
};
function Kr(e, n, t, r, i, o, s) {
  const a = [...e];
  for (const [c, l] of dl[i]) {
    const u = n + c, d = t + l;
    u >= 0 && u < o && d >= 0 && d < s && (a[d * o + u] = r);
  }
  return a;
}
function Ms(e, n, t) {
  const r = new Array(n * t).fill("");
  if (!e) return r;
  try {
    new DOMParser().parseFromString(e, "image/svg+xml").querySelectorAll("rect").forEach((a) => {
      const c = parseInt(a.getAttribute("x") ?? "0", 10), l = parseInt(a.getAttribute("y") ?? "0", 10), u = a.getAttribute("fill") ?? "";
      c >= 0 && c < n && l >= 0 && l < t && u && (r[l * n + c] = u);
    });
  } catch (i) {
    console.error("[PixelArtEditor] Failed to parse SVG value:", i);
  }
  return r;
}
function or(e, n, t) {
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    if (!o) continue;
    const s = i % n, a = Math.floor(i / n);
    r.push(`  <rect x="${s}" y="${a}" width="1" height="1" fill="${o}"/>`);
  }
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${t}" width="${n}" height="${t}">`,
    ...r,
    "</svg>"
  ].join(`
`);
}
function In(e, n, t, r) {
  const i = [], o = Math.abs(t - e), s = Math.abs(r - n), a = e < t ? 1 : -1, c = n < r ? 1 : -1;
  let l = o - s, u = e, d = n;
  for (; i.push([u, d]), !(u === t && d === r); ) {
    const h = 2 * l;
    h > -s && (l -= s, u += a), h < o && (l += o, d += c);
  }
  return i;
}
function i_(e, n, t, r, i = "fill") {
  const o = Math.min(e, t), s = Math.max(e, t), a = Math.min(n, r), c = Math.max(n, r), l = [];
  for (let u = a; u <= c; u++)
    for (let d = o; d <= s; d++)
      (i === "fill" || d === o || d === s || u === a || u === c) && l.push([d, u]);
  return l;
}
function o_(e, n, t, r, i = "fill") {
  const o = Math.min(e, t), s = Math.max(e, t), a = Math.min(n, r), c = Math.max(n, r), l = (o + s) / 2, u = (a + c) / 2, d = (s - o) / 2, h = (c - a) / 2, f = /* @__PURE__ */ new Set(), m = [], y = (_, b) => {
    const k = b * 1e5 + _;
    f.has(k) || (f.add(k), m.push([_, b]));
  };
  for (let _ = a; _ <= c; _++) {
    const b = h === 0 ? 0 : (_ - u) / h;
    if (Math.abs(b) > 1) continue;
    const k = d * Math.sqrt(Math.max(0, 1 - b * b)), g = Math.round(l - k), S = Math.round(l + k);
    if (i === "fill")
      for (let v = g; v <= S; v++) y(v, _);
    else
      y(g, _), S !== g && y(S, _);
  }
  if (i === "outline")
    for (let _ = o; _ <= s; _++) {
      const b = d === 0 ? 0 : (_ - l) / d;
      if (Math.abs(b) > 1) continue;
      const k = h * Math.sqrt(Math.max(0, 1 - b * b));
      y(_, Math.round(u - k)), y(_, Math.round(u + k));
    }
  return m;
}
function s_(e, n, t, r, i = "fill") {
  const o = Math.min(e, t), s = Math.max(e, t), a = Math.min(n, r), c = Math.max(n, r), l = Math.round((o + s) / 2), u = a, d = o, h = c, f = s, m = c, y = /* @__PURE__ */ new Set(), _ = [], b = (k, g) => {
    const S = g * 1e5 + k;
    y.has(S) || (y.add(S), _.push([k, g]));
  };
  if (i === "outline") {
    for (const [k, g] of In(l, u, d, h)) b(k, g);
    for (const [k, g] of In(l, u, f, m)) b(k, g);
    for (const [k, g] of In(d, h, f, m)) b(k, g);
    return _;
  }
  for (let k = a; k <= c; k++) {
    const g = c === a ? 0 : (k - a) / (c - a), S = Math.round(l + g * (d - l)), v = Math.round(l + g * (f - l));
    for (let w = Math.min(S, v); w <= Math.max(S, v); w++) b(w, k);
  }
  return _;
}
function a_(e, n, t, r, i = "fill") {
  const o = Math.min(e, t), s = Math.max(e, t), a = Math.min(n, r), c = Math.max(n, r), l = (o + s) / 2, u = (a + c) / 2, d = Math.min(s - o, c - a) / 2, h = d * 0.382, f = [];
  for (let g = 0; g < 10; g++) {
    const S = g * Math.PI / 5 - Math.PI / 2, v = g % 2 === 0 ? d : h;
    f.push([Math.round(l + v * Math.cos(S)), Math.round(u + v * Math.sin(S))]);
  }
  const m = /* @__PURE__ */ new Set(), y = [], _ = (g, S) => {
    const v = S * 1e5 + g;
    m.has(v) || (m.add(v), y.push([g, S]));
  };
  if (i === "outline") {
    for (let g = 0; g < f.length; g++) {
      const [S, v] = f[g], [w, $] = f[(g + 1) % f.length];
      for (const [A, D] of In(S, v, w, $)) _(A, D);
    }
    return y;
  }
  const b = Math.min(...f.map(([, g]) => g)), k = Math.max(...f.map(([, g]) => g));
  for (let g = b; g <= k; g++) {
    const S = [];
    for (let v = 0; v < f.length; v++) {
      const [w, $] = f[v], [A, D] = f[(v + 1) % f.length];
      ($ <= g && D > g || D <= g && $ > g) && S.push(w + (g - $) / (D - $) * (A - w));
    }
    S.sort((v, w) => v - w);
    for (let v = 0; v + 1 < S.length; v += 2)
      for (let w = Math.round(S[v]); w <= Math.round(S[v + 1]); w++) _(w, g);
  }
  return y;
}
function Ls(e, n, t, r, i, o) {
  const s = [...e], a = s[i * n + r];
  if (a === o) return s;
  const c = [[r, i]], l = /* @__PURE__ */ new Set();
  for (; c.length > 0; ) {
    const [u, d] = c.shift(), h = d * n + u;
    u < 0 || u >= n || d < 0 || d >= t || l.has(h) || s[h] === a && (l.add(h), s[h] = o, c.push([u + 1, d], [u - 1, d], [u, d + 1], [u, d - 1]));
  }
  return s;
}
const l_ = 8, c_ = 80;
function u_(e, n, t, r, i) {
  const o = e[i * n + r], s = /* @__PURE__ */ new Set(), a = [[r, i]];
  for (; a.length > 0; ) {
    const [c, l] = a.shift();
    if (c < 0 || c >= n || l < 0 || l >= t) continue;
    const u = l * n + c;
    s.has(u) || e[u] === o && (s.add(u), a.push([c + 1, l], [c - 1, l], [c, l + 1], [c, l - 1]));
  }
  return s;
}
const d_ = ["line", "rect", "circle", "triangle", "star"];
function Yr(e) {
  return d_.includes(e);
}
function Rs(e, n, t, r) {
  const [i, o] = n, [s, a] = t;
  switch (e) {
    case "line":
      return In(i, o, s, a);
    case "rect":
      return i_(i, o, s, a, r.rect);
    case "circle":
      return o_(i, o, s, a, r.circle);
    case "triangle":
      return s_(i, o, s, a, r.triangle);
    case "star":
      return a_(i, o, s, a, r.star);
  }
}
function Ts(e, n) {
  const [t, r] = e, [i, o] = n, s = i - t, a = o - r, c = Math.max(Math.abs(s), Math.abs(a)), l = s >= 0 ? 1 : -1, u = a >= 0 ? 1 : -1;
  return [t + c * l, r + c * u];
}
function f_(e, n) {
  const [t, r] = e, [i, o] = n, s = i - t, a = o - r, c = Math.abs(s), l = Math.abs(a), u = Math.tan(Math.PI / 8), d = Math.tan(3 * Math.PI / 8);
  if (c === 0 && l === 0) return [t, r];
  if (c === 0) return [t, o];
  const h = l / c;
  if (h < u) return [i, r];
  if (h > d) return [t, o];
  const f = Math.min(c, l), m = s >= 0 ? 1 : -1, y = a >= 0 ? 1 : -1;
  return [t + f * m, r + f * y];
}
function Fn(e, n, t, r, i) {
  if (!r) return e;
  const o = [...e];
  if (r.shape === "cells") {
    for (let u = 0; u < o.length; u++)
      r.cells.has(u) !== i && (o[u] = n[u]);
    return o;
  }
  const s = Math.min(r.x1, r.x2), a = Math.max(r.x1, r.x2), c = Math.min(r.y1, r.y2), l = Math.max(r.y1, r.y2);
  for (let u = 0; u < o.length; u++) {
    const d = u % t, h = Math.floor(u / t), f = d >= s && d <= a && h >= c && h <= l;
    let m;
    if (!f)
      m = !1;
    else if (r.shape === "rect")
      m = !0;
    else {
      const y = (s + a) / 2, _ = (c + l) / 2, b = (a - s) / 2 + 0.5, k = (l - c) / 2 + 0.5, g = d - y, S = h - _;
      m = b <= 0 || k <= 0 ? !0 : g * g / (b * b) + S * S / (k * k) <= 1;
    }
    m !== i && (o[u] = n[u]);
  }
  return o;
}
function p_(e, n, t, r, i) {
  const o = e.getContext("2d");
  if (o) {
    o.clearRect(0, 0, e.width, e.height), o.fillStyle = "#ffffff", o.fillRect(0, 0, e.width, e.height);
    for (let s = 0; s < n.length; s++) {
      const a = n[s];
      if (!a) continue;
      const c = s % t, l = Math.floor(s / t);
      o.fillStyle = a, o.fillRect(c * i, l * i, i, i);
    }
    o.strokeStyle = r_, o.lineWidth = 1;
    for (let s = 0; s <= t; s++) {
      const a = s === t ? e.width - 0.5 : s * i + 0.5;
      o.beginPath(), o.moveTo(a, 0), o.lineTo(a, r * i), o.stroke();
    }
    for (let s = 0; s <= r; s++) {
      const a = s === r ? e.height - 0.5 : s * i + 0.5;
      o.beginPath(), o.moveTo(0, a), o.lineTo(t * i, a), o.stroke();
    }
  }
}
function Fi(e, n, t, r) {
  const i = e.getContext("2d");
  if (i) {
    i.clearRect(0, 0, e.width, e.height), i.globalAlpha = 0.7, i.fillStyle = t || "#000000";
    for (const [o, s] of n)
      i.fillRect(o * r, s * r, r, r);
    i.globalAlpha = 1;
  }
}
function h_(e, n, t, r, i) {
  const o = e.getContext("2d");
  if (!o) return;
  if (o.clearRect(0, 0, e.width, e.height), n.shape === "cells") {
    const u = i ?? Math.round(e.width / t);
    o.fillStyle = "rgba(100, 160, 255, 0.15)";
    for (const h of n.cells) {
      const f = h % u, m = Math.floor(h / u);
      o.fillRect(f * t, m * t, t, t);
    }
    const d = () => {
      o.beginPath();
      for (const h of n.cells) {
        const f = h % u, m = Math.floor(h / u), y = f * t, _ = m * t;
        n.cells.has((m - 1) * u + f) || (o.moveTo(y, _), o.lineTo(y + t, _)), n.cells.has((m + 1) * u + f) || (o.moveTo(y, _ + t), o.lineTo(y + t, _ + t)), (f === 0 || !n.cells.has(m * u + f - 1)) && (o.moveTo(y, _), o.lineTo(y, _ + t)), (f === u - 1 || !n.cells.has(m * u + f + 1)) && (o.moveTo(y + t, _), o.lineTo(y + t, _ + t));
      }
    };
    o.strokeStyle = "#ffffff", o.lineWidth = 2, o.setLineDash([]), d(), o.stroke(), o.strokeStyle = "#000000", o.lineWidth = 1.5, o.setLineDash([4, 4]), o.lineDashOffset = -r, d(), o.stroke(), o.setLineDash([]);
    return;
  }
  const s = Math.min(n.x1, n.x2) * t, a = Math.min(n.y1, n.y2) * t, c = (Math.abs(n.x2 - n.x1) + 1) * t, l = (Math.abs(n.y2 - n.y1) + 1) * t;
  if (n.shape === "ellipse") {
    o.beginPath(), o.ellipse(s + c / 2, a + l / 2, c / 2, l / 2, 0, 0, Math.PI * 2), o.fillStyle = "rgba(100, 160, 255, 0.15)", o.fill(), o.strokeStyle = "#ffffff", o.lineWidth = 2, o.setLineDash([]), o.stroke(), o.strokeStyle = "#000000", o.lineWidth = 1.5, o.setLineDash([4, 4]), o.lineDashOffset = -r, o.stroke(), o.setLineDash([]);
    return;
  }
  o.fillStyle = "rgba(100, 160, 255, 0.15)", o.fillRect(s, a, c, l), o.strokeStyle = "#ffffff", o.lineWidth = 2, o.setLineDash([]), o.strokeRect(s + 0.5, a + 0.5, c - 1, l - 1), o.strokeStyle = "#000000", o.lineWidth = 1.5, o.setLineDash([4, 4]), o.lineDashOffset = -r, o.strokeRect(s + 0.5, a + 0.5, c - 1, l - 1), o.setLineDash([]);
}
function m_(e, n, t) {
  const r = e.getContext("2d");
  if (!(!r || n.length === 0))
    for (const [i, o] of n) {
      const s = i * t, a = o * t;
      r.fillStyle = "#ffffff", r.fillRect(s, a, t, t), r.strokeStyle = "#000000", r.lineWidth = 1, r.strokeRect(s + 0.5, a + 0.5, t - 1, t - 1);
    }
}
async function g_(e, n, t, r) {
  if (r < 1 || !Number.isFinite(r))
    throw new Error(`pixelsToPngBlob: scale must be >= 1 (got ${r})`);
  const i = document.createElement("canvas");
  i.width = n * r, i.height = t * r;
  const o = i.getContext("2d");
  if (!o) throw new Error("pixelsToPngBlob: 2D context unavailable");
  for (let s = 0; s < e.length; s++) {
    const a = e[s];
    if (!a) continue;
    const c = s % n, l = Math.floor(s / n);
    o.fillStyle = a, o.fillRect(c * r, l * r, r, r);
  }
  return await new Promise((s, a) => {
    i.toBlob(
      (c) => {
        c ? s(c) : a(new Error("pixelsToPngBlob: canvas.toBlob returned null"));
      },
      "image/png"
    );
  });
}
function __(e, n) {
  switch (n.type) {
    case "set":
      return { ...e, present: n.pixels };
    case "commit":
      return { past: [...e.past, e.present].slice(-50), present: n.pixels, future: [] };
    case "undo": {
      if (e.past.length === 0) return e;
      const t = e.past.slice(0, -1), r = e.past[e.past.length - 1], i = [e.present, ...e.future];
      return { past: t, present: r, future: i };
    }
    case "redo": {
      if (e.future.length === 0) return e;
      const t = e.future.slice(1), r = e.future[0];
      return { past: [...e.past, e.present], present: r, future: t };
    }
    default:
      return e;
  }
}
function b_({
  width: e,
  height: n,
  value: t,
  onChange: r
}) {
  const [i, o] = Rc(
    __,
    void 0,
    () => ({
      past: [],
      present: Ms(t, e, n),
      future: []
    })
  ), s = i.present, a = i.past.length > 0, c = i.future.length > 0, l = K((y) => o({ type: "set", pixels: y }), []), u = K((y) => o({ type: "commit", pixels: y }), []), d = K(
    (y) => {
      r && r(or(y, e, n));
    },
    [r, e, n]
  ), h = Y(t);
  ae(() => {
    t !== h.current && (h.current = t, o({ type: "set", pixels: Ms(t, e, n) }));
  }, [t, e, n]);
  const f = K(() => {
    if (i.past.length === 0) return;
    const y = i.past[i.past.length - 1];
    o({ type: "undo" }), r && r(or(y, e, n));
  }, [i, r, e, n]), m = K(() => {
    if (i.future.length === 0) return;
    const y = i.future[0];
    o({ type: "redo" }), r && r(or(y, e, n));
  }, [i, r, e, n]);
  return { pixels: s, canUndo: a, canRedo: c, dispatchPixels: l, commitPixels: u, undo: f, redo: m, emitChange: d };
}
function y_({
  width: e,
  cellSize: n,
  selectionCanvasRef: t
}) {
  const [r, i] = U(null), [o, s] = U(0), a = Y(null), c = Y(null), l = Y(null), u = Y(null), d = Y([0, 0]), h = Y(!0), f = K(
    (m, y) => {
      if (!r) return !1;
      const _ = Math.min(r.x1, r.x2), b = Math.max(r.x1, r.x2), k = Math.min(r.y1, r.y2), g = Math.max(r.y1, r.y2);
      if (m < _ || m > b || y < k || y > g) return !1;
      if (r.shape === "rect") return !0;
      if (r.shape === "cells") return r.cells.has(y * e + m);
      const S = (_ + b) / 2, v = (k + g) / 2, w = (b - _) / 2 + 0.5, $ = (g - k) / 2 + 0.5;
      if (w <= 0 || $ <= 0) return !0;
      const A = m - S, D = y - v;
      return A * A / (w * w) + D * D / ($ * $) <= 1;
    },
    [r, e]
  );
  return ae(() => {
    if (!r) return;
    const m = setInterval(() => {
      s((y) => (y + 1) % l_);
    }, c_);
    return () => clearInterval(m);
  }, [r]), ae(() => {
    if (t.current) {
      if (!r) {
        const m = t.current.getContext("2d");
        m == null || m.clearRect(0, 0, t.current.width, t.current.height);
        return;
      }
      h_(t.current, r, n, o, e);
    }
  }, [r, n, o, e, t]), {
    selection: r,
    setSelection: i,
    marchingAntsOffset: o,
    selectionDragMode: a,
    selectionDragStart: c,
    liftedPixels: l,
    basePixelsAfterLift: u,
    selectionMoveOffset: d,
    strokeInsideSelection: h,
    selectionContainsCell: f
  };
}
function k_({
  width: e,
  height: n,
  pixels: t,
  activeColor: r,
  selection: i,
  selectionContainsCell: o,
  commitPixels: s,
  emitChange: a,
  previewCanvasRef: c,
  liftedPixelsRef: l
}) {
  const u = Y([]), [d, h] = U(null), f = Y(!1), m = K(() => {
    if (c.current) {
      const b = c.current.getContext("2d");
      b == null || b.clearRect(0, 0, c.current.width, c.current.height);
    }
  }, [c]), y = K(() => {
    u.current = [], h(null), l.current = null, m();
  }, [m, l]), _ = K(
    (b = !1) => {
      const k = u.current;
      if (k.length < 2) {
        u.current = [], h(null), m();
        return;
      }
      const g = b ? [...k, k[0]] : k, S = o(k[0][0], k[0][1]), v = [...t];
      for (let $ = 0; $ < g.length - 1; $++) {
        const [A, D] = g[$], [N, T] = g[$ + 1];
        for (const [L, j] of In(A, D, N, T))
          L >= 0 && L < e && j >= 0 && j < n && (v[j * e + L] = r);
      }
      const w = Fn(v, t, e, i, S);
      s(w), a(w), u.current = [], h(null), m();
    },
    [t, e, n, r, a, i, o, s, m]
  );
  return {
    penAnchors: u,
    penCursor: d,
    setPenCursor: h,
    penDblClickPending: f,
    cancelPenPath: y,
    commitPenPath: _
  };
}
function w_({
  disabled: e,
  activeTool: n,
  brushSize: t,
  activeColor: r,
  fillModes: i,
  marqueeShape: o,
  setActiveTool: s,
  setActiveColor: a,
  setIndependentHue: c,
  pixels: l,
  width: u,
  height: d,
  cellSize: h,
  committedCanvasRef: f,
  previewCanvasRef: m,
  commitPixels: y,
  dispatchPixels: _,
  emitChange: b,
  selection: k,
  setSelection: g,
  selectionContainsCell: S,
  selectionDragMode: v,
  selectionDragStart: w,
  liftedPixels: $,
  basePixelsAfterLift: A,
  selectionMoveOffset: D,
  strokeInsideSelection: N,
  penAnchors: T,
  setPenCursor: L,
  penDblClickPending: j,
  commitPenPath: F,
  closePopovers: I
}) {
  const P = Y(!1), H = Y(null), B = Y(null), { rect: O, circle: x, triangle: X, star: ce } = i, E = K(
    (se, Ee, te, ne) => te ? ne === "line" ? f_(se, Ee) : Ts(se, Ee) : Ee,
    []
  ), be = K(
    (se, Ee, te) => {
      if (P.current) {
        if (n === "marquee" && v.current === "draw" && w.current) {
          const [ne, G] = te ? Ts(w.current, [se, Ee]) : [se, Ee];
          g((me) => me ? { ...me, x2: ne, y2: G } : null);
          return;
        }
        if (Yr(n) && H.current && m.current) {
          const ne = E(H.current, [se, Ee], te, n), G = Rs(n, H.current, ne, {
            rect: O,
            circle: x,
            triangle: X,
            star: ce
          });
          Fi(m.current, G, r, h);
        }
      }
    },
    [
      n,
      O,
      x,
      X,
      ce,
      r,
      h,
      g,
      m,
      v,
      w,
      E
    ]
  );
  ae(() => {
    const se = (Ee) => {
      if (Ee.key !== "Shift") return;
      const te = B.current;
      te && be(te[0], te[1], Ee.type === "keydown");
    };
    return document.addEventListener("keydown", se), document.addEventListener("keyup", se), () => {
      document.removeEventListener("keydown", se), document.removeEventListener("keyup", se);
    };
  }, [be]);
  const fe = K(
    (se) => {
      const Ee = f.current;
      if (!Ee) return null;
      const te = Ee.getBoundingClientRect(), ne = se.clientX - te.left, G = se.clientY - te.top, me = Math.floor(ne / h), he = Math.floor(G / h);
      return me < 0 || me >= u || he < 0 || he >= d ? null : [me, he];
    },
    [h, u, d, f]
  ), De = K(
    (se) => {
      if (e || se.button !== 0) return;
      se.preventDefault();
      const Ee = fe(se);
      if (!Ee) return;
      const [te, ne] = Ee;
      if (I(), n === "pen") {
        if (j.current) return;
        const G = T.current;
        if (G.length > 0) {
          const [me, he] = G[0];
          if (Math.abs(te - me) + Math.abs(ne - he) <= 1) {
            F(!0);
            return;
          }
        }
        G.push([te, ne]), L([te, ne]);
        return;
      }
      if (n === "marquee") {
        if (o === "wand") {
          const G = u_(l, u, d, te, ne);
          if (G.size > 0) {
            let me = 1 / 0, he = 1 / 0, Te = -1 / 0, Ie = -1 / 0;
            for (const _e of G) {
              const Me = _e % u, Fe = Math.floor(_e / u);
              Me < me && (me = Me), Me > Te && (Te = Me), Fe < he && (he = Fe), Fe > Ie && (Ie = Fe);
            }
            g({ shape: "cells", cells: G, x1: me, y1: he, x2: Te, y2: Ie });
          } else
            g(null);
          P.current = !1;
          return;
        }
        if (k && S(te, ne)) {
          v.current = "move", w.current = [te, ne], D.current = [0, 0];
          const G = Math.min(k.x1, k.x2), me = Math.max(k.x1, k.x2), he = Math.min(k.y1, k.y2), Te = Math.max(k.y1, k.y2), Ie = [], _e = [...l];
          for (let Me = he; Me <= Te; Me++)
            for (let Fe = G; Fe <= me; Fe++)
              S(Fe, Me) ? (Ie.push(l[Me * u + Fe]), _e[Me * u + Fe] = "") : Ie.push(void 0);
          $.current = { colors: Ie, x1: G, y1: he, x2: me, y2: Te }, A.current = _e, _(_e);
        } else
          v.current = "draw", w.current = [te, ne], g({ shape: o, x1: te, y1: ne, x2: te, y2: ne }), $.current = null, A.current = null;
        P.current = !0;
        return;
      }
      if (P.current = !0, n === "paint") {
        N.current = S(te, ne);
        const G = Fn(Kr(l, te, ne, r, t, u, d), l, u, k, N.current);
        y(G), b(G);
      } else if (n === "eraser") {
        N.current = S(te, ne);
        const G = Fn(Kr(l, te, ne, "", t, u, d), l, u, k, N.current);
        y(G), b(G);
      } else if (n === "fill") {
        if (k)
          if (S(te, ne)) {
            const G = Math.min(k.x1, k.x2), me = Math.max(k.x1, k.x2), he = Math.min(k.y1, k.y2), Te = Math.max(k.y1, k.y2), Ie = [...l];
            for (let _e = he; _e <= Te; _e++)
              for (let Me = G; Me <= me; Me++)
                S(Me, _e) && (Ie[_e * u + Me] = r);
            y(Ie), b(Ie);
          } else {
            const G = Fn(Ls(l, u, d, te, ne, r), l, u, k, !1);
            y(G), b(G);
          }
        else {
          const G = Ls(l, u, d, te, ne, r);
          y(G), b(G);
        }
        P.current = !1;
      } else if (n === "eyedropper") {
        const G = l[ne * u + te];
        G && (a(G), c(null)), s("paint"), P.current = !1;
      } else Yr(n) && (H.current = [te, ne], N.current = S(te, ne));
    },
    [
      e,
      n,
      t,
      r,
      l,
      u,
      d,
      fe,
      b,
      F,
      k,
      S,
      o,
      I,
      g,
      a,
      c,
      s,
      y,
      _,
      T,
      j,
      L,
      v,
      w,
      D,
      $,
      A,
      N
    ]
  ), Je = K(
    (se) => {
      if (e) return;
      const Ee = fe(se);
      if (!Ee) return;
      const [te, ne] = Ee;
      if (n === "pen") {
        L([te, ne]);
        const G = T.current;
        if (G.length > 0 && m.current) {
          const me = [];
          for (let Te = 0; Te < G.length - 1; Te++)
            me.push(...In(G[Te][0], G[Te][1], G[Te + 1][0], G[Te + 1][1]));
          const he = G[G.length - 1];
          me.push(...In(he[0], he[1], te, ne)), Fi(m.current, me, r, h), m_(m.current, G, h);
        }
        return;
      }
      if (n === "paint" || n === "eraser") {
        const G = dl[t].map(
          ([me, he]) => [te + me, ne + he]
        ).filter(([me, he]) => me >= 0 && me < u && he >= 0 && he < d);
        if (m.current) {
          const me = n === "eraser" ? "#ff000033" : r;
          Fi(m.current, G, me, h);
        }
      }
      if (n === "marquee" && P.current && w.current) {
        if (v.current === "draw")
          B.current = [te, ne], be(te, ne, se.shiftKey);
        else if (v.current === "move" && $.current) {
          const [G, me] = w.current, he = te - G, Te = ne - me;
          D.current = [he, Te];
          const Ie = $.current;
          if (g((_e) => _e ? { ..._e, x1: Ie.x1 + he, y1: Ie.y1 + Te, x2: Ie.x2 + he, y2: Ie.y2 + Te } : null), m.current) {
            const _e = Ie.x2 - Ie.x1 + 1, Me = m.current.getContext("2d");
            Me && (Me.clearRect(0, 0, m.current.width, m.current.height), Me.globalAlpha = 0.85, Ie.colors.forEach((Fe, it) => {
              if (Fe === void 0 || !Fe) return;
              const Q = it % _e, R = Math.floor(it / _e), q = Ie.x1 + Q + he, re = Ie.y1 + R + Te;
              q >= 0 && q < u && re >= 0 && re < d && (Me.fillStyle = Fe, Me.fillRect(q * h, re * h, h, h));
            }), Me.globalAlpha = 1);
          }
        }
        return;
      }
      if (P.current)
        if (n === "paint") {
          const G = Fn(Kr(l, te, ne, r, t, u, d), l, u, k, N.current);
          _(G), b(G);
        } else if (n === "eraser") {
          const G = Fn(Kr(l, te, ne, "", t, u, d), l, u, k, N.current);
          _(G), b(G);
        } else Yr(n) && H.current && m.current && (B.current = [te, ne], be(te, ne, se.shiftKey));
    },
    [
      e,
      n,
      O,
      x,
      X,
      ce,
      t,
      r,
      l,
      u,
      d,
      fe,
      b,
      h,
      k,
      g,
      w,
      v,
      D,
      $,
      N,
      _,
      T,
      L,
      m,
      be
    ]
  ), Xe = K(
    (se) => {
      const Ee = [...l];
      for (const [ne, G] of se)
        ne >= 0 && ne < u && G >= 0 && G < d && (Ee[G * u + ne] = r);
      const te = Fn(Ee, l, u, k, N.current);
      y(te), b(te);
    },
    [l, u, d, r, k, b, y, N]
  ), Re = K(
    (se) => {
      if (!P.current || e) return;
      if (n === "marquee") {
        if (P.current = !1, B.current = null, v.current === "move" && $.current) {
          const G = $.current, [me, he] = D.current, Te = G.x2 - G.x1 + 1, Ie = [...A.current ?? l];
          if (G.colors.forEach((_e, Me) => {
            if (_e === void 0 || !_e) return;
            const Fe = Me % Te, it = Math.floor(Me / Te), Q = G.x1 + Fe + me, R = G.y1 + it + he;
            Q >= 0 && Q < u && R >= 0 && R < d && (Ie[R * u + Q] = _e);
          }), y(Ie), b(Ie), $.current = null, A.current = null, m.current) {
            const _e = m.current.getContext("2d");
            _e == null || _e.clearRect(0, 0, m.current.width, m.current.height);
          }
        } else if (v.current === "draw") {
          const G = fe(se);
          if (G) {
            const [me, he] = G;
            w.current && w.current[0] === me && w.current[1] === he && g(null);
          }
        }
        v.current = null, w.current = null;
        return;
      }
      P.current = !1;
      const Ee = fe(se);
      if (m.current) {
        const G = m.current.getContext("2d");
        G == null || G.clearRect(0, 0, m.current.width, m.current.height);
      }
      if (!Ee) {
        H.current = null;
        return;
      }
      const [te, ne] = Ee;
      if (Yr(n) && H.current) {
        const G = E(H.current, [te, ne], se.shiftKey, n);
        Xe(Rs(n, H.current, G, {
          rect: O,
          circle: x,
          triangle: X,
          star: ce
        }));
      }
      H.current = null, B.current = null;
    },
    [
      e,
      n,
      O,
      x,
      X,
      ce,
      fe,
      b,
      l,
      u,
      d,
      Xe,
      y,
      m,
      g,
      A,
      $,
      v,
      w,
      D,
      E
    ]
  ), Ge = K(() => {
    if (n === "marquee" && P.current && v.current === "move" && $.current) {
      const se = $.current, Ee = se.x2 - se.x1 + 1, te = [...A.current ?? l];
      se.colors.forEach((ne, G) => {
        if (ne === void 0) return;
        const me = G % Ee, he = Math.floor(G / Ee);
        te[(se.y1 + he) * u + (se.x1 + me)] = ne;
      }), _(te), $.current = null, A.current = null, g((ne) => ne ? { ...ne, x1: se.x1, y1: se.y1, x2: se.x2, y2: se.y2 } : null);
    }
    if (P.current = !1, v.current = null, B.current = null, m.current) {
      const se = m.current.getContext("2d");
      se == null || se.clearRect(0, 0, m.current.width, m.current.height);
    }
  }, [
    n,
    l,
    u,
    _,
    m,
    g,
    A,
    $,
    v
  ]), wt = K(() => {
    n === "pen" && (j.current = !0, T.current.length > 1 && (T.current = T.current.slice(0, -1)), F(!1), setTimeout(() => {
      j.current = !1;
    }, 300));
  }, [n, F, T, j]);
  return {
    handleMouseDown: De,
    handleMouseMove: Je,
    handleMouseUp: Re,
    handleMouseLeave: Ge,
    handleDoubleClick: wt
  };
}
const x_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ p("line", { x1: "3", y1: "13", x2: "13", y2: "3" }) }), Ds = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "3", y: "3", width: "10", height: "10", fill: "currentColor" }) }), Ps = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "3", y: "3", width: "10", height: "10", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) }), Os = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("circle", { cx: "8", cy: "8", r: "5", fill: "currentColor" }) }), zs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("circle", { cx: "8", cy: "8", r: "5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) }), Bs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 14,13 2,13", fill: "currentColor" }) }), Fs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 14,13 2,13", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" }) }), js = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 9.8,6.5 14.5,6.9 11,10.1 12.1,14.7 8,12.2 3.9,14.7 5,10.1 1.5,6.9 6.2,6.5", fill: "currentColor" }) }), Hs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 9.8,6.5 14.5,6.9 11,10.1 12.1,14.7 8,12.2 3.9,14.7 5,10.1 1.5,6.9 6.2,6.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" }) }), v_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "7", y: "7", width: "2", height: "2", fill: "currentColor" }) }), E_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "6", y: "6", width: "4", height: "4", fill: "currentColor" }) }), S_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "4", y: "4", width: "8", height: "8", fill: "currentColor" }) }), C_ = { sm: v_, md: E_, lg: S_ }, N_ = 400;
function Zr(e, n) {
  const t = Ve.useRef(null), r = Ve.useRef(!1), i = Ve.useCallback(() => {
    r.current = !1, t.current = setTimeout(() => {
      r.current = !0, n();
    }, N_);
  }, [n]), o = Ve.useCallback(() => {
    t.current !== null && (clearTimeout(t.current), t.current = null);
  }, []), s = Ve.useCallback(() => {
    o(), r.current || e();
  }, [o, e]);
  return {
    onMouseDown: i,
    onMouseUp: s,
    onMouseLeave: o,
    onTouchStart: i,
    onTouchEnd: s
  };
}
const $_ = ({
  activeTool: e,
  setActiveTool: n,
  brushSize: t,
  setBrushSize: r,
  activeColor: i,
  setActiveColor: o,
  palette: s,
  customColors: a,
  setCustomColors: c,
  independentHue: l,
  setIndependentHue: u,
  rectFillMode: d,
  setRectFillMode: h,
  circleFillMode: f,
  setCircleFillMode: m,
  triangleFillMode: y,
  setTriangleFillMode: _,
  starFillMode: b,
  setStarFillMode: k,
  lastShape: g,
  setLastShape: S,
  marqueeShape: v,
  setMarqueeShape: w,
  canUndo: $,
  canRedo: A,
  onUndo: D,
  onRedo: N,
  onDownloadSvg: T,
  onDownloadPng: L,
  onClearCanvas: j,
  sizes: F,
  currentSize: I,
  onPickSize: P,
  cancelPenPath: H
}) => {
  const [B, O] = U(!1), [x, X] = U(!1), [ce, E] = U(!1), [be, fe] = U(!1), [De, Je] = U(!1), [Xe, Re] = U(!1), Ge = Y(null), wt = Y(null), se = Y(null), Ee = Y(null), te = Y(null), ne = Y(null), G = Y(null), me = Array.isArray(F) && F.length > 0, he = K(() => {
    O(!1), X(!1), E(!1);
  }, []), Te = Zr(
    () => {
      H(), n("paint"), he();
    },
    () => {
      H(), n("paint"), O(!0), X(!1), E(!1);
    }
  ), Ie = Zr(
    () => {
      H(), n("eraser"), he();
    },
    () => {
      H(), n("eraser"), O(!0), X(!1), E(!1);
    }
  ), _e = K(() => {
    e === "rect" || e === "circle" || e === "triangle" || e === "star" ? e === "rect" ? h((R) => R === "fill" ? "outline" : "fill") : e === "circle" ? m((R) => R === "fill" ? "outline" : "fill") : e === "triangle" ? _((R) => R === "fill" ? "outline" : "fill") : e === "star" && k((R) => R === "fill" ? "outline" : "fill") : (H(), n(g), he());
  }, [e, g, H, n, he, h, m, _, k]), Me = Zr(
    _e,
    () => {
      X(!0), O(!1), E(!1);
    }
  ), Fe = Zr(
    () => {
      H(), n("marquee"), he();
    },
    () => {
      H(), n("marquee"), E(!0), O(!1), X(!1);
    }
  ), it = K(() => {
    fe(!1), Zn.test(i) && !s.includes(i) && !a.includes(i) && c((Q) => [i, ...Q]);
  }, [i, s, a, c]);
  return /* @__PURE__ */ M(kt, { children: [
    /* @__PURE__ */ M("div", { className: ye.toolsRow, role: "toolbar", "aria-label": "Pixel art tools", children: [
      /* @__PURE__ */ M("div", { className: ye.toolsScroll, children: [
        /* @__PURE__ */ M("div", { className: ye.brushAnchor, children: [
          /* @__PURE__ */ p("div", { ref: Ge, ...Te, children: /* @__PURE__ */ p(
            ze,
            {
              icon: zu,
              size: "sm",
              selected: e === "paint",
              "aria-label": "Paint",
              title: "Paint"
            }
          ) }),
          /* @__PURE__ */ p("div", { ref: wt, ...Ie, children: /* @__PURE__ */ p(
            ze,
            {
              icon: Nu,
              size: "sm",
              selected: e === "eraser",
              "aria-label": "Eraser",
              title: "Eraser"
            }
          ) }),
          /* @__PURE__ */ p(
            Ct,
            {
              isOpen: B && (e === "paint" || e === "eraser"),
              onClose: () => O(!1),
              anchorRef: e === "eraser" ? wt : Ge,
              offsetX: -5,
              role: "dialog",
              "aria-label": "Brush size",
              children: /* @__PURE__ */ p("div", { className: ye.brushPopover, children: ["sm", "md", "lg"].map((Q) => /* @__PURE__ */ p(
                ze,
                {
                  icon: C_[Q],
                  size: "sm",
                  selected: t === Q,
                  onClick: () => {
                    r(Q), O(!1);
                  },
                  "aria-label": `Brush size ${Q}`,
                  title: `Brush ${Q}`
                },
                Q
              )) })
            }
          )
        ] }),
        /* @__PURE__ */ p(
          ze,
          {
            icon: Tu,
            size: "sm",
            selected: e === "fill",
            onClick: () => {
              H(), n("fill"), he();
            },
            "aria-label": "Fill",
            title: "Fill"
          }
        ),
        /* @__PURE__ */ p(
          ze,
          {
            icon: x_,
            size: "sm",
            selected: e === "line",
            onClick: () => {
              H(), n("line"), he();
            },
            "aria-label": "Line",
            title: "Line"
          }
        ),
        /* @__PURE__ */ p(
          ze,
          {
            icon: Ou,
            size: "sm",
            selected: e === "pen",
            onClick: () => {
              n("pen"), he();
            },
            "aria-label": "Pen",
            title: "Pen"
          }
        ),
        /* @__PURE__ */ M("div", { className: ye.brushAnchor, children: [
          /* @__PURE__ */ p("div", { ref: Ee, ...Fe, children: /* @__PURE__ */ p(
            ze,
            {
              icon: v === "ellipse" ? hs : v === "wand" ? ms : co,
              size: "sm",
              selected: e === "marquee",
              "aria-label": "Marquee selection",
              title: "Marquee selection (long press for options)"
            }
          ) }),
          /* @__PURE__ */ p(
            Ct,
            {
              isOpen: ce,
              onClose: () => E(!1),
              anchorRef: Ee,
              offsetX: -5,
              role: "dialog",
              "aria-label": "Selection mode",
              children: /* @__PURE__ */ M("div", { className: ye.brushPopover, children: [
                /* @__PURE__ */ p(
                  ze,
                  {
                    icon: co,
                    size: "sm",
                    selected: v === "rect",
                    onClick: () => {
                      w("rect"), n("marquee"), E(!1), H();
                    },
                    "aria-label": "Rectangular marquee",
                    title: "Rectangular marquee"
                  }
                ),
                /* @__PURE__ */ p(
                  ze,
                  {
                    icon: hs,
                    size: "sm",
                    selected: v === "ellipse",
                    onClick: () => {
                      w("ellipse"), n("marquee"), E(!1), H();
                    },
                    "aria-label": "Elliptical marquee",
                    title: "Elliptical marquee"
                  }
                ),
                /* @__PURE__ */ p(
                  ze,
                  {
                    icon: ms,
                    size: "sm",
                    selected: v === "wand",
                    onClick: () => {
                      w("wand"), n("marquee"), E(!1), H();
                    },
                    "aria-label": "Magic wand",
                    title: "Magic wand"
                  }
                )
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ M("div", { className: ye.brushAnchor, children: [
          /* @__PURE__ */ p("div", { ref: se, ...Me, children: /* @__PURE__ */ p(
            ze,
            {
              icon: (() => {
                const Q = ["rect", "circle", "triangle", "star"].includes(e) ? e : g, R = Q === "rect" ? d : Q === "circle" ? f : Q === "triangle" ? y : b;
                return {
                  rect: R === "fill" ? Ds : Ps,
                  circle: R === "fill" ? Os : zs,
                  triangle: R === "fill" ? Bs : Fs,
                  star: R === "fill" ? js : Hs
                }[Q];
              })(),
              size: "sm",
              selected: e === "rect" || e === "circle" || e === "triangle" || e === "star",
              "aria-label": "Shapes",
              title: "Shapes"
            }
          ) }),
          /* @__PURE__ */ p(
            Ct,
            {
              isOpen: x,
              onClose: () => X(!1),
              anchorRef: se,
              offsetX: -5,
              role: "dialog",
              "aria-label": "Shape picker",
              children: /* @__PURE__ */ p("div", { className: ye.brushPopover, children: [
                { shape: "rect", filledIcon: Ds, outlineIcon: Ps, fillMode: d, setFillMode: h, label: "Rectangle" },
                { shape: "circle", filledIcon: Os, outlineIcon: zs, fillMode: f, setFillMode: m, label: "Circle" },
                { shape: "triangle", filledIcon: Bs, outlineIcon: Fs, fillMode: y, setFillMode: _, label: "Triangle" },
                { shape: "star", filledIcon: js, outlineIcon: Hs, fillMode: b, setFillMode: k, label: "Star" }
              ].map(({ shape: Q, filledIcon: R, outlineIcon: q, fillMode: re, setFillMode: ie, label: Ne }) => /* @__PURE__ */ p(
                ze,
                {
                  icon: re === "fill" ? R : q,
                  size: "sm",
                  selected: e === Q,
                  onClick: () => {
                    e === Q ? ie((at) => at === "fill" ? "outline" : "fill") : (H(), n(Q), S(Q)), X(!1);
                  },
                  "aria-label": `${Ne} ${re === "fill" ? "filled" : "outline"}`,
                  title: `${Ne} (${re === "fill" ? "filled" : "outline"}, press again to toggle)`
                },
                Q
              )) })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ M("div", { className: ye.clearFixed, children: [
        /* @__PURE__ */ p(
          ze,
          {
            icon: Xa,
            size: "sm",
            onClick: D,
            disabled: !$,
            "aria-label": "Undo",
            title: "Undo (Cmd+Z)"
          }
        ),
        /* @__PURE__ */ p(
          ze,
          {
            icon: Ga,
            size: "sm",
            onClick: N,
            disabled: !A,
            "aria-label": "Redo",
            title: "Redo (Cmd+Shift+Z)"
          }
        ),
        me && /* @__PURE__ */ M("div", { ref: G, className: ye.brushAnchor, children: [
          /* @__PURE__ */ p(
            ze,
            {
              icon: $u,
              size: "sm",
              selected: Xe,
              onClick: () => Re((Q) => !Q),
              "aria-label": "Grid size",
              "aria-haspopup": "menu",
              "aria-expanded": Xe,
              title: "Grid size"
            }
          ),
          /* @__PURE__ */ p(
            Ct,
            {
              isOpen: Xe,
              onClose: () => Re(!1),
              anchorRef: G,
              offsetX: -5,
              role: "menu",
              "aria-label": "Grid size",
              children: /* @__PURE__ */ p("div", { className: ye.menuPopover, children: F.map((Q) => /* @__PURE__ */ M(
                "button",
                {
                  type: "button",
                  role: "menuitemradio",
                  "aria-checked": I === Q,
                  className: ye.menuItem,
                  onClick: () => {
                    Re(!1), P == null || P(Q);
                  },
                  children: [
                    I === Q ? /* @__PURE__ */ p($o, { size: 14, "aria-hidden": "true" }) : /* @__PURE__ */ p("span", { className: ye.menuItemIconSlot, "aria-hidden": "true" }),
                    Q,
                    " × ",
                    Q
                  ]
                },
                Q
              )) })
            }
          )
        ] }),
        /* @__PURE__ */ M("div", { ref: ne, className: ye.brushAnchor, children: [
          /* @__PURE__ */ p(
            ze,
            {
              icon: qa,
              size: "sm",
              selected: De,
              onClick: () => Je((Q) => !Q),
              "aria-label": "Download",
              "aria-haspopup": "menu",
              "aria-expanded": De,
              title: "Download"
            }
          ),
          /* @__PURE__ */ p(
            Ct,
            {
              isOpen: De,
              onClose: () => Je(!1),
              anchorRef: ne,
              offsetX: -5,
              role: "menu",
              "aria-label": "Download format",
              children: /* @__PURE__ */ M("div", { className: ye.menuPopover, children: [
                /* @__PURE__ */ M(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    className: ye.menuItem,
                    onClick: () => {
                      Je(!1), T();
                    },
                    children: [
                      /* @__PURE__ */ p(Ua, { size: 14, "aria-hidden": "true" }),
                      "Download SVG"
                    ]
                  }
                ),
                /* @__PURE__ */ M(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    className: ye.menuItem,
                    onClick: () => {
                      Je(!1), L();
                    },
                    children: [
                      /* @__PURE__ */ p(Wa, { size: 14, "aria-hidden": "true" }),
                      "Download PNG"
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ p(
          ze,
          {
            icon: Va,
            size: "sm",
            onClick: j,
            "aria-label": "Clear canvas",
            title: "Clear canvas"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ M("div", { className: ye.colorsRow, children: [
      /* @__PURE__ */ p("div", { className: ye.eyedropperFixed, children: /* @__PURE__ */ p(
        ze,
        {
          icon: Bu,
          size: "sm",
          selected: e === "eyedropper",
          onClick: () => {
            H(), n("eyedropper");
          },
          "aria-label": "Eyedropper",
          title: "Eyedropper"
        }
      ) }),
      /* @__PURE__ */ M("div", { className: ye.swatchScroll, children: [
        a.map((Q) => /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: `${ye.swatch} ${i === Q ? ye.swatchActive : ""}`,
            style: { backgroundColor: Q },
            onClick: () => {
              o(Q), u(null);
            },
            "aria-label": `Select color ${Q}`,
            title: Q
          },
          `custom-${Q}`
        )),
        s.map((Q) => /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: `${ye.swatch} ${i === Q ? ye.swatchActive : ""}`,
            style: { backgroundColor: Q },
            onClick: () => {
              o(Q), u(null);
            },
            "aria-label": `Select color ${Q}`,
            title: Q
          },
          Q
        ))
      ] }),
      /* @__PURE__ */ p("div", { className: ye.customSwatchFixed, children: /* @__PURE__ */ M("div", { ref: te, className: ye.customSwatchWrapper, children: [
        /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: `${ye.swatch} ${ye.swatchCustom} ${!s.includes(i) && !a.includes(i) ? ye.swatchActive : ""}`,
            style: { backgroundColor: Zn.test(i) ? i : "#000000" },
            onClick: () => fe((Q) => !Q),
            "aria-label": "Custom color",
            title: "Custom color"
          }
        ),
        /* @__PURE__ */ p(
          Ct,
          {
            isOpen: be,
            onClose: it,
            anchorRef: te,
            role: "dialog",
            className: ye.colorPickerPopover,
            "aria-label": "Color picker",
            children: /* @__PURE__ */ M("div", { children: [
              /* @__PURE__ */ p(
                sl,
                {
                  hue: (() => {
                    const Q = Zn.test(i) ? si(i) : { h: 0 };
                    return l !== null ? l : Q.h;
                  })(),
                  saturation: Zn.test(i) ? si(i).s : 1,
                  brightness: Zn.test(i) ? si(i).v : 1,
                  onChange: (Q, R, q) => {
                    u(Q), o(ll(Q, R, q));
                  }
                }
              ),
              /* @__PURE__ */ p(
                Pt,
                {
                  prefix: "#",
                  value: i.replace(/^#/, ""),
                  onChange: (Q) => {
                    const R = "#" + Q.replace(/^#/, "");
                    Zn.test(R) && (u(null), o(R.toLowerCase()));
                  }
                }
              )
            ] })
          }
        )
      ] }) })
    ] })
  ] });
}, _I = ({
  width: e,
  height: n,
  value: t = "",
  onChange: r,
  palette: i = n_,
  popover: o = !1,
  popoverWidth: s,
  triggerHeight: a,
  disabled: c = !1,
  className: l = "",
  offsetX: u = 0,
  offsetY: d = 0,
  defaultOpen: h = !1,
  pngExportScale: f = 8,
  sizes: m,
  onSizeChange: y
}) => {
  const _ = Array.isArray(m) && m.length > 0, [b, k] = U(e), g = _ ? b : e, S = _ ? b : n, [v, w] = U("paint"), [$, A] = U("sm"), [D, N] = U("rect"), [T, L] = U("outline"), [j, F] = U("outline"), [I, P] = U("outline"), [H, B] = U("outline"), [O, x] = U(i[0] ?? "#000000"), [X, ce] = U(null), [E, be] = U([]), [fe, De] = U("rect"), [Je, Xe] = U(h), [Re, Ge] = U(null), wt = Y(null), [se, Ee] = U(16), te = Y(null), ne = Y(null), G = Y(null), [me, he] = U(!1), Te = K((ke) => {
    te.current = ke, he(ke !== null);
  }, []), Ie = Y(null), { pixels: _e, canUndo: Me, canRedo: Fe, dispatchPixels: it, commitPixels: Q, undo: R, redo: q, emitChange: re } = b_({ width: g, height: S, value: t, onChange: r }), {
    selection: ie,
    setSelection: Ne,
    selectionDragMode: at,
    selectionDragStart: qt,
    liftedPixels: ot,
    basePixelsAfterLift: Qt,
    selectionMoveOffset: un,
    strokeInsideSelection: lt,
    selectionContainsCell: mt
  } = y_({ width: g, cellSize: se, selectionCanvasRef: G }), {
    penAnchors: gt,
    setPenCursor: Or,
    penDblClickPending: zr,
    cancelPenPath: dr,
    commitPenPath: Un
  } = k_({
    width: g,
    height: S,
    pixels: _e,
    activeColor: O,
    selection: ie,
    selectionContainsCell: mt,
    commitPixels: Q,
    emitChange: re,
    previewCanvasRef: ne,
    liftedPixelsRef: ot
  }), _n = K(() => {
  }, []), { handleMouseDown: C, handleMouseMove: z, handleMouseUp: Z, handleMouseLeave: ge, handleDoubleClick: Ke } = w_({
    disabled: c,
    activeTool: v,
    brushSize: $,
    activeColor: O,
    fillModes: { rect: T, circle: j, triangle: I, star: H },
    marqueeShape: fe,
    setActiveTool: w,
    setActiveColor: x,
    setIndependentHue: ce,
    pixels: _e,
    width: g,
    height: S,
    cellSize: se,
    committedCanvasRef: te,
    previewCanvasRef: ne,
    commitPixels: Q,
    dispatchPixels: it,
    emitChange: re,
    selection: ie,
    setSelection: Ne,
    selectionContainsCell: mt,
    selectionDragMode: at,
    selectionDragStart: qt,
    liftedPixels: ot,
    basePixelsAfterLift: Qt,
    selectionMoveOffset: un,
    strokeInsideSelection: lt,
    penAnchors: gt,
    setPenCursor: Or,
    penDblClickPending: zr,
    commitPenPath: Un,
    closePopovers: _n
  }), je = K((ke, Se) => {
    const xt = URL.createObjectURL(ke), zt = document.createElement("a");
    zt.href = xt, zt.download = Se, zt.click(), URL.revokeObjectURL(xt);
  }, []), oe = K(() => {
    const ke = or(_e, g, S);
    je(new Blob([ke], { type: "image/svg+xml" }), "pixel-art.svg");
  }, [_e, g, S, je]), ee = K(async () => {
    const ke = await g_(_e, g, S, f);
    je(ke, "pixel-art.png");
  }, [_e, g, S, f, je]), pe = K(() => {
    if (!ie) return;
    const ke = Math.min(ie.x1, ie.x2), Se = Math.max(ie.x1, ie.x2), xt = Math.min(ie.y1, ie.y2), zt = Math.max(ie.y1, ie.y2), dn = [..._e];
    for (let Ut = xt; Ut <= zt; Ut++)
      for (let Jt = ke; Jt <= Se; Jt++)
        mt(Jt, Ut) && (dn[Ut * g + Jt] = "");
    Q(dn), re(dn);
  }, [ie, _e, g, re, mt, Q]), Qe = K(() => {
    const ke = new Array(g * S).fill("");
    Q(ke), re(ke);
  }, [g, S, Q, re]), Ze = K((ke) => {
    if (!_ || ke === b) return;
    k(ke), Ee((xt) => xt * b / ke);
    const Se = new Array(ke * ke).fill("");
    Q(Se), r && r(or(Se, ke, ke)), y == null || y(ke, ke);
  }, [_, b, Q, r, y]);
  ae(() => {
    h && Xe(!0);
  }, [h]), ae(() => {
    const ke = wt.current;
    if (!ke) return;
    const Se = new ResizeObserver((xt) => {
      for (const zt of xt) {
        const { width: dn } = zt.contentRect;
        if (_ && m && m.length > 0) {
          const Ut = Math.max(...m, e), Jt = Math.max(1, Math.floor(dn / Ut));
          Ee(Jt * Ut / g);
        } else
          Ee(Math.max(1, Math.floor(dn / g)));
      }
    });
    return Se.observe(ke), () => Se.disconnect();
  }, [g, e, me, _, m]), ae(() => {
    const ke = se * g, Se = se * S;
    te.current && (te.current.width = ke, te.current.height = Se), ne.current && (ne.current.width = ke, ne.current.height = Se), G.current && (G.current.width = ke, G.current.height = Se);
  }, [se, g, S, me]), ae(() => {
    te.current && p_(te.current, _e, g, S, se);
  }, [_e, se, g, S, me]), ae(() => {
    if (c) return;
    const ke = (Se) => {
      const xt = Se.target;
      if (xt.tagName === "INPUT" || xt.tagName === "TEXTAREA" || xt.isContentEditable) return;
      if (Se.key === "Enter" && v === "pen") {
        Se.preventDefault(), Un(!1);
        return;
      }
      if (Se.key === "Escape") {
        v === "pen" ? (Se.preventDefault(), dr()) : v === "marquee" && (Se.preventDefault(), Ne(null), ot.current = null);
        return;
      }
      if ((Se.key === "Delete" || Se.key === "Backspace") && v === "marquee") {
        if (Se.preventDefault(), Se.altKey && ie) {
          const Ut = Math.min(ie.x1, ie.x2), Jt = Math.max(ie.x1, ie.x2), Br = Math.min(ie.y1, ie.y2), Wn = Math.max(ie.y1, ie.y2), fr = [..._e];
          for (let Gn = Br; Gn <= Wn; Gn++)
            for (let Vn = Ut; Vn <= Jt; Vn++)
              mt(Vn, Gn) && (fr[Gn * g + Vn] = O);
          Q(fr), re(fr);
        } else
          pe();
        return;
      }
      if (/mac/i.test(navigator.userAgent) ? Se.metaKey : Se.ctrlKey) {
        if (Se.key === "d") {
          Se.preventDefault(), Ne(null), ot.current = null;
          return;
        }
        Se.key === "z" && !Se.shiftKey ? (Se.preventDefault(), R()) : (Se.key === "z" && Se.shiftKey || Se.key === "y") && (Se.preventDefault(), q());
      }
    };
    return document.addEventListener("keydown", ke), () => document.removeEventListener("keydown", ke);
  }, [c, v, Un, dr, pe, ie, _e, O, g, mt, R, q, Ne, ot, Q, re]);
  const bn = /* @__PURE__ */ M(
    "div",
    {
      className: `${ye.wrapper} ${o ? ye.wrapperPopover : ""} ${o ? "" : l}`,
      style: o && s ? { width: s } : void 0,
      children: [
        /* @__PURE__ */ p(
          $_,
          {
            activeTool: v,
            setActiveTool: w,
            brushSize: $,
            setBrushSize: A,
            activeColor: O,
            setActiveColor: x,
            palette: i,
            customColors: E,
            setCustomColors: be,
            independentHue: X,
            setIndependentHue: ce,
            rectFillMode: T,
            setRectFillMode: L,
            circleFillMode: j,
            setCircleFillMode: F,
            triangleFillMode: I,
            setTriangleFillMode: P,
            starFillMode: H,
            setStarFillMode: B,
            lastShape: D,
            setLastShape: N,
            marqueeShape: fe,
            setMarqueeShape: De,
            canUndo: Me,
            canRedo: Fe,
            onUndo: R,
            onRedo: q,
            onDownloadSvg: oe,
            onDownloadPng: ee,
            onClearCanvas: Qe,
            sizes: m,
            currentSize: _ ? b : void 0,
            onPickSize: Ze,
            cancelPenPath: dr
          }
        ),
        /* @__PURE__ */ p("div", { ref: wt, className: ye.canvasContainer, children: /* @__PURE__ */ M("div", { className: ye.canvasInner, style: { width: se * g, height: se * S }, children: [
          /* @__PURE__ */ p(
            "canvas",
            {
              ref: Te,
              className: ye.canvas,
              style: { cursor: c ? "not-allowed" : "crosshair" },
              onMouseDown: C,
              onMouseMove: z,
              onMouseUp: Z,
              onMouseLeave: ge,
              onDoubleClick: Ke,
              onContextMenu: (ke) => {
                ke.preventDefault(), Ge({ x: ke.clientX, y: ke.clientY });
              }
            }
          ),
          /* @__PURE__ */ p(
            "canvas",
            {
              ref: ne,
              className: `${ye.canvas} ${ye.canvasPreview}`,
              style: { pointerEvents: "none" }
            }
          ),
          /* @__PURE__ */ p(
            "canvas",
            {
              ref: G,
              className: `${ye.canvas} ${ye.canvasPreview}`,
              style: { pointerEvents: "none" }
            }
          )
        ] }) }),
        /* @__PURE__ */ p(
          Ng,
          {
            open: Re !== null,
            position: Re ?? void 0,
            onClose: () => Ge(null),
            items: [
              {
                label: "Undo",
                icon: Xa,
                disabled: !Me,
                onClick: () => {
                  R(), Ge(null);
                }
              },
              {
                label: "Redo",
                icon: Ga,
                disabled: !Fe,
                onClick: () => {
                  q(), Ge(null);
                }
              },
              { separator: !0, label: "" },
              {
                label: "Download SVG",
                icon: Ua,
                onClick: () => {
                  oe(), Ge(null);
                }
              },
              {
                label: "Download PNG",
                icon: Wa,
                onClick: () => {
                  ee(), Ge(null);
                }
              },
              ...ie ? [
                { separator: !0, label: "" },
                {
                  label: "Deselect",
                  icon: co,
                  onClick: () => {
                    Ne(null), ot.current = null, Ge(null);
                  }
                }
              ] : [],
              { separator: !0, label: "" },
              {
                label: "Clear canvas",
                icon: Va,
                variant: "destructive",
                onClick: () => {
                  Qe(), Ge(null);
                }
              }
            ]
          }
        )
      ]
    }
  );
  return o ? /* @__PURE__ */ M("div", { className: `${ye.popoverContainer} ${l}`, children: [
    /* @__PURE__ */ p(
      "button",
      {
        ref: Ie,
        type: "button",
        className: `${ye.popoverTrigger} ${Je ? ye.popoverTriggerOpen : ""}`,
        onClick: () => Xe((ke) => !ke),
        disabled: c,
        "aria-label": "Open pixel art editor",
        children: /* @__PURE__ */ p(
          "img",
          {
            src: `data:image/svg+xml,${encodeURIComponent(or(_e, g, S))}`,
            width: g,
            height: S,
            className: ye.miniPreview,
            style: a !== void 0 ? { height: a, width: "auto" } : void 0,
            alt: ""
          }
        )
      }
    ),
    /* @__PURE__ */ p(
      Ct,
      {
        isOpen: Je,
        onClose: () => Xe(!1),
        anchorRef: Ie,
        overlap: !0,
        role: "dialog",
        "aria-label": "Pixel art editor",
        offsetX: u,
        offsetY: d,
        className: ye.editorPopover,
        children: bn
      }
    )
  ] }) : bn;
}, I_ = "_root_7lfjz_1", A_ = "_xs_7lfjz_7", M_ = "_track_7lfjz_8", L_ = "_sm_7lfjz_13", R_ = "_md_7lfjz_19", T_ = "_valueLabel_7lfjz_26", D_ = "_fill_7lfjz_40", P_ = "_success_7lfjz_49", O_ = "_error_7lfjz_53", z_ = "_warning_7lfjz_57", Qn = {
  root: I_,
  xs: A_,
  track: M_,
  sm: L_,
  md: R_,
  valueLabel: T_,
  fill: D_,
  default: "_default_7lfjz_45",
  success: P_,
  error: O_,
  warning: z_
}, bI = ({
  value: e,
  variant: n = "default",
  size: t = "md",
  label: r,
  showValue: i = !1,
  className: o = ""
}) => {
  const s = Math.min(100, Math.max(0, e));
  return /* @__PURE__ */ M("div", { className: `${Qn.root} ${Qn[t]} ${o}`, children: [
    i && /* @__PURE__ */ M("span", { className: Qn.valueLabel, children: [
      s,
      "%"
    ] }),
    /* @__PURE__ */ p(
      "div",
      {
        className: Qn.track,
        role: "progressbar",
        "aria-valuenow": s,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": r,
        children: /* @__PURE__ */ p(
          "div",
          {
            className: `${Qn.fill} ${Qn[n]}`,
            style: { width: `${s}%` }
          }
        )
      }
    )
  ] });
}, B_ = "_root_1mobr_1", F_ = "_sm_1mobr_7", j_ = "_md_1mobr_12", H_ = "_lg_1mobr_17", q_ = "_svg_1mobr_23", U_ = "_track_1mobr_27", W_ = "_progress_1mobr_31", G_ = "_success_1mobr_38", V_ = "_error_1mobr_42", X_ = "_warning_1mobr_46", K_ = "_valueLabel_1mobr_51", Dn = {
  root: B_,
  sm: F_,
  md: j_,
  lg: H_,
  svg: q_,
  track: U_,
  progress: W_,
  default: "_default_1mobr_34",
  success: G_,
  error: V_,
  warning: X_,
  valueLabel: K_
}, Y_ = {
  sm: { diameter: 32, stroke: 3 },
  md: { diameter: 48, stroke: 4 },
  lg: { diameter: 64, stroke: 5 }
}, yI = ({
  value: e,
  variant: n = "default",
  size: t = "md",
  label: r,
  showValue: i = !1,
  className: o = ""
}) => {
  const s = Math.min(100, Math.max(0, e)), { diameter: a, stroke: c } = Y_[t], l = (a - c) / 2, u = 2 * Math.PI * l, d = u * (1 - s / 100), h = a / 2;
  return /* @__PURE__ */ M("div", { className: `${Dn.root} ${Dn[t]} ${o}`, children: [
    /* @__PURE__ */ M(
      "svg",
      {
        width: a,
        height: a,
        viewBox: `0 0 ${a} ${a}`,
        role: "progressbar",
        "aria-valuenow": s,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": r,
        className: Dn.svg,
        children: [
          /* @__PURE__ */ p(
            "circle",
            {
              className: Dn.track,
              cx: h,
              cy: h,
              r: l,
              strokeWidth: c,
              fill: "none"
            }
          ),
          /* @__PURE__ */ p(
            "circle",
            {
              className: `${Dn.progress} ${Dn[n]}`,
              cx: h,
              cy: h,
              r: l,
              strokeWidth: c,
              fill: "none",
              strokeDasharray: u,
              strokeDashoffset: d,
              strokeLinecap: "round",
              transform: `rotate(-90 ${h} ${h})`,
              style: { strokeDashoffset: d }
            }
          )
        ]
      }
    ),
    i && /* @__PURE__ */ M("span", { className: Dn.valueLabel, "aria-hidden": "true", children: [
      s,
      "%"
    ] })
  ] });
}, Z_ = "_wrapper_17vwn_1", Q_ = "_reverse_17vwn_7", J_ = "_disabled_17vwn_11", eb = "_visuallyHidden_17vwn_16", tb = "_circle_17vwn_20", nb = "_checked_17vwn_33", rb = "_label_17vwn_48", ib = "_group_17vwn_54", ob = "_vertical_17vwn_57", sb = "_horizontal_17vwn_62", pn = {
  wrapper: Z_,
  reverse: Q_,
  disabled: J_,
  visuallyHidden: eb,
  circle: tb,
  checked: nb,
  label: rb,
  group: ib,
  vertical: ob,
  horizontal: sb
}, ab = ({
  checked: e,
  onChange: n,
  label: t,
  disabled: r = !1,
  inputPosition: i = "left",
  className: o = "",
  id: s,
  name: a,
  value: c,
  "aria-label": l
}) => /* @__PURE__ */ M(
  "label",
  {
    className: `${pn.wrapper} ${r ? pn.disabled : ""} ${i === "right" ? pn.reverse : ""} ${o}`,
    children: [
      /* @__PURE__ */ p(
        "input",
        {
          id: s,
          type: "radio",
          checked: e,
          onChange: () => n(!e),
          disabled: r,
          className: pn.visuallyHidden,
          name: a,
          value: c,
          "aria-label": l
        }
      ),
      /* @__PURE__ */ p("span", { className: `${pn.circle} ${e ? pn.checked : ""}` }),
      t && /* @__PURE__ */ p("span", { className: pn.label, children: t })
    ]
  }
), kI = ({
  value: e,
  onChange: n,
  options: t,
  name: r,
  disabled: i = !1,
  direction: o = "vertical",
  inputPosition: s = "left",
  className: a = ""
}) => /* @__PURE__ */ p(
  "div",
  {
    role: "radiogroup",
    className: `${pn.group} ${pn[o]} ${a}`,
    children: t.map((c) => /* @__PURE__ */ p(
      ab,
      {
        checked: e === c.value,
        onChange: () => n(c.value),
        label: c.label,
        disabled: i || c.disabled,
        name: r,
        value: c.value,
        inputPosition: s
      },
      c.value
    ))
  }
), lb = "_linkForm_117dp_1", cb = "_urlInput_117dp_8", ub = "_confirmButton_117dp_32", db = "_cancelButton_117dp_59", Qr = {
  linkForm: lb,
  urlInput: cb,
  confirmButton: ub,
  cancelButton: db
}, fb = ({ onSubmit: e, onCancel: n }) => {
  const [t, r] = U(""), i = (s) => {
    s.preventDefault(), t.trim() && e(t.trim());
  }, o = (s) => {
    s.key === "Escape" && n();
  };
  return /* @__PURE__ */ M("form", { className: Qr.linkForm, onSubmit: i, children: [
    /* @__PURE__ */ p(
      "input",
      {
        type: "url",
        className: Qr.urlInput,
        value: t,
        onChange: (s) => r(s.target.value),
        onKeyDown: o,
        placeholder: "https://",
        autoFocus: !0,
        "aria-label": "Link URL"
      }
    ),
    /* @__PURE__ */ p("button", { type: "submit", className: Qr.confirmButton, disabled: !t.trim(), children: "Apply" }),
    /* @__PURE__ */ p("button", { type: "button", className: Qr.cancelButton, onClick: n, children: "Cancel" })
  ] });
}, pb = "_toolbar_r31dh_1", hb = "_disabled_r31dh_13", mb = "_headingSelect_r31dh_18", ji = {
  toolbar: pb,
  disabled: hb,
  headingSelect: mb
}, gb = [
  { value: "p", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" }
], _b = ({
  onBold: e,
  onItalic: n,
  onHeadingChange: t,
  onLinkSubmit: r,
  boldActive: i,
  italicActive: o,
  currentHeading: s,
  disabled: a,
  showLinkInput: c,
  onLinkButtonClick: l,
  onLinkCancel: u
}) => /* @__PURE__ */ M("div", { className: `${ji.toolbar} ${a ? ji.disabled : ""}`, children: [
  /* @__PURE__ */ p(
    Lo,
    {
      options: gb,
      value: s,
      onChange: t,
      disabled: a,
      size: "sm",
      className: ji.headingSelect
    }
  ),
  /* @__PURE__ */ p(
    ze,
    {
      icon: wu,
      onClick: e,
      size: "sm",
      pressed: i,
      "aria-label": "Bold",
      title: "Bold"
    }
  ),
  /* @__PURE__ */ p(
    ze,
    {
      icon: Au,
      onClick: n,
      size: "sm",
      pressed: o,
      "aria-label": "Italic",
      title: "Italic"
    }
  ),
  /* @__PURE__ */ p(
    ze,
    {
      icon: Mu,
      onClick: l,
      size: "sm",
      pressed: c,
      "aria-label": "Insert link",
      title: "Insert link"
    }
  ),
  c && /* @__PURE__ */ p(fb, { onSubmit: r, onCancel: u })
] }), bb = "_wrapper_8in61_1", yb = "_editor_8in61_15", kb = "_editorDisabled_8in61_63", wb = "_editorPopover_8in61_69", xb = "_popoverContainer_8in61_75", vb = "_popoverTrigger_8in61_79", Eb = "_popoverTriggerOpen_8in61_97", Sb = "_popoverPreview_8in61_101", Cb = "_popoverPlaceholder_8in61_109", Nb = "_wrapperPopover_8in61_117", nn = {
  wrapper: bb,
  editor: yb,
  editorDisabled: kb,
  editorPopover: wb,
  popoverContainer: xb,
  popoverTrigger: vb,
  popoverTriggerOpen: Eb,
  popoverPreview: Sb,
  popoverPlaceholder: Cb,
  wrapperPopover: Nb
}, $b = /* @__PURE__ */ new Set(["P", "H1", "H2", "H3", "DIV", "BLOCKQUOTE", "PRE", "LI"]);
function Ib(e) {
  const n = document.getSelection();
  if (!n || n.rangeCount === 0) return "p";
  let t = n.anchorNode;
  for (; t && t !== e; ) {
    if (t.nodeType === Node.ELEMENT_NODE) {
      const r = t.tagName;
      if ($b.has(r))
        return r.toLowerCase() === "div" ? "p" : r.toLowerCase();
    }
    t = t.parentElement;
  }
  return "p";
}
function fl(e) {
  if (e.nodeType === Node.TEXT_NODE)
    return e.textContent ?? "";
  if (e.nodeType !== Node.ELEMENT_NODE) return "";
  const n = e, t = n.tagName.toLowerCase(), r = Array.from(n.childNodes).map(fl).join("");
  switch (t) {
    case "h1":
      return `# ${r}

`;
    case "h2":
      return `## ${r}

`;
    case "h3":
      return `### ${r}

`;
    case "p":
      return r ? `${r}

` : "";
    case "strong":
    case "b":
      return `**${r}**`;
    case "em":
    case "i":
      return `*${r}*`;
    case "a":
      return `[${r}](${n.getAttribute("href") ?? ""})`;
    case "br":
      return `
`;
    case "div":
      return r ? `${r}

` : "";
    default:
      return r;
  }
}
function Ab(e) {
  const n = document.createElement("div");
  return n.innerHTML = e, Array.from(n.childNodes).map(fl).join("").replace(/\n{3,}/g, `

`).trimEnd();
}
function Mb(e) {
  return e.replace(/<[^>]+>/g, "").replace(/#{1,6}\s+/g, "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/\[(.+?)\]\(.+?\)/g, "$1").replace(/\n+/g, " ").trim();
}
const wI = ({
  value: e = "",
  onChange: n,
  placeholder: t,
  disabled: r = !1,
  minHeight: i = "160px",
  outputFormat: o = "html",
  popover: s = !1,
  className: a = "",
  actions: c,
  offsetX: l = 0,
  offsetY: u = 0
}) => {
  const d = Y(null), h = Y(null), [f, m] = U(!1), [y, _] = U(!1), [b, k] = U("p"), [g, S] = U(!1), [v, w] = U(!1), $ = Y(!1);
  ae(() => {
    d.current && !$.current && (d.current.innerHTML = e);
  }, [e, v]), ae(() => {
    v && requestAnimationFrame(() => {
      var B;
      return (B = d.current) == null ? void 0 : B.focus();
    });
  }, [v]), ae(() => {
    const B = d.current;
    if (!B) return;
    const O = () => {
      if (!d.current) return;
      const ce = document.getSelection();
      if (!ce) return;
      const E = ce.anchorNode;
      E && d.current.contains(E) && (m(document.queryCommandState("bold")), _(document.queryCommandState("italic")), k(Ib(d.current)));
    }, x = () => document.addEventListener("selectionchange", O), X = () => document.removeEventListener("selectionchange", O);
    return B.addEventListener("focus", x), B.addEventListener("blur", X), () => {
      B.removeEventListener("focus", x), B.removeEventListener("blur", X), X();
    };
  }, []);
  const A = K((B) => {
    n && n(o === "markdown" ? Ab(B) : B);
  }, [n, o]), D = K(() => {
    d.current && ($.current = !0, A(d.current.innerHTML), requestAnimationFrame(() => {
      $.current = !1;
    }));
  }, [A]), N = K(() => {
    var B;
    (B = d.current) == null || B.focus(), document.execCommand("bold", !1), m(document.queryCommandState("bold"));
  }, []), T = K(() => {
    var B;
    (B = d.current) == null || B.focus(), document.execCommand("italic", !1), _(document.queryCommandState("italic"));
  }, []), L = K((B) => {
    var O;
    (O = d.current) == null || O.focus(), document.execCommand("formatBlock", !1, B), k(B);
  }, []), j = K(() => {
    S((B) => !B);
  }, []), F = K((B) => {
    var O;
    (O = d.current) == null || O.focus(), document.execCommand("createLink", !1, B), S(!1), d.current && A(d.current.innerHTML);
  }, [A]), I = K(() => {
    S(!1);
  }, []), P = /* @__PURE__ */ M("div", { className: `${nn.wrapper} ${s ? nn.wrapperPopover : ""} ${s ? "" : a}`, children: [
    /* @__PURE__ */ p(
      _b,
      {
        onBold: N,
        onItalic: T,
        onHeadingChange: L,
        onLinkSubmit: F,
        boldActive: f,
        italicActive: y,
        currentHeading: b,
        disabled: r,
        showLinkInput: g,
        onLinkButtonClick: j,
        onLinkCancel: I
      }
    ),
    c,
    /* @__PURE__ */ p(
      "div",
      {
        ref: d,
        className: `${nn.editor} ${r ? nn.editorDisabled : ""} ${s ? nn.editorPopover : ""}`,
        contentEditable: r ? "false" : "true",
        suppressContentEditableWarning: !0,
        onInput: D,
        "data-placeholder": t,
        style: { minHeight: i },
        role: "textbox",
        "aria-multiline": "true",
        "aria-disabled": r
      }
    )
  ] });
  if (!s)
    return P;
  const H = Mb(e);
  return /* @__PURE__ */ M("div", { className: `${nn.popoverContainer} ${a}`, children: [
    /* @__PURE__ */ p(
      "button",
      {
        ref: h,
        type: "button",
        className: `${nn.popoverTrigger} ${v ? nn.popoverTriggerOpen : ""}`,
        onClick: () => w((B) => !B),
        disabled: r,
        children: /* @__PURE__ */ p("span", { className: H ? nn.popoverPreview : nn.popoverPlaceholder, children: H || t || "Edit…" })
      }
    ),
    /* @__PURE__ */ p(
      Ct,
      {
        isOpen: v,
        onClose: () => w(!1),
        anchorRef: h,
        matchWidth: !0,
        overlap: !0,
        role: "dialog",
        "aria-label": "Rich text editor",
        offsetX: l,
        offsetY: u,
        children: P
      }
    )
  ] });
}, Lb = "_control_16kf0_1", Rb = "_disabled_16kf0_7", Tb = "_md_16kf0_11", Db = "_segment_16kf0_13", Pb = "_sm_16kf0_19", Ob = "_selected_16kf0_29", zb = "_scroll_16kf0_40", Bb = "_segmentDisabled_16kf0_68", Fb = "_tooltipWrapper_16kf0_89", jb = "_segmentInner_16kf0_93", Hb = "_pinnedLeft_16kf0_99", qb = "_pinnedRight_16kf0_104", Ub = "_shadowLeft_16kf0_109", Wb = "_shadowRight_16kf0_115", Lt = {
  control: Lb,
  disabled: Rb,
  md: Tb,
  segment: Db,
  sm: Pb,
  selected: Ob,
  scroll: zb,
  segmentDisabled: Bb,
  tooltipWrapper: Fb,
  segmentInner: jb,
  pinnedLeft: Hb,
  pinnedRight: qb,
  shadowLeft: Ub,
  shadowRight: Wb
};
function xI({
  options: e,
  value: n,
  onChange: t,
  size: r = "md",
  disabled: i = !1,
  className: o = ""
}) {
  const s = Ve.useRef(null), a = Ve.useRef(null), c = r === "sm" ? 14 : 16, l = e.filter((g) => g.pin === "left"), u = e.filter((g) => g.pin === "right"), d = e.filter((g) => !g.pin), [h, f] = Ve.useState(!1), [m, y] = Ve.useState(!1), _ = Ve.useCallback(() => {
    const g = a.current;
    if (!g) return;
    const S = g.scrollLeft <= 0, v = g.scrollLeft + g.clientWidth >= g.scrollWidth - 1;
    f(!S && l.length > 0), y(!v && u.length > 0);
  }, [l.length, u.length]);
  Ve.useEffect(() => {
    _();
    const g = a.current;
    if (g)
      return g.addEventListener("scroll", _), () => g.removeEventListener("scroll", _);
  }, [_, e]);
  const b = (g) => {
    var T, L;
    if (g.key !== "ArrowLeft" && g.key !== "ArrowRight") return;
    g.preventDefault();
    const S = e.map((j, F) => j.disabled ? -1 : F).filter((j) => j !== -1);
    if (S.length === 0) return;
    const v = e.findIndex((j) => j.value === n), w = S.indexOf(v);
    let $;
    w === -1 ? $ = 0 : g.key === "ArrowRight" ? $ = (w + 1) % S.length : $ = (w - 1 + S.length) % S.length;
    const A = S[$], D = e[A];
    t(D.value);
    const N = (T = s.current) == null ? void 0 : T.querySelectorAll(
      'button[role="radio"]'
    );
    (L = N == null ? void 0 : N[A]) == null || L.focus();
  }, k = (g) => {
    const S = g.value === n, v = i || g.disabled, w = g.ariaLabel ?? (g.label ? void 0 : String(g.value)), $ = /* @__PURE__ */ p(
      "button",
      {
        role: "radio",
        "aria-checked": S,
        disabled: v,
        tabIndex: S ? 0 : -1,
        className: `${Lt.segment} ${S ? Lt.selected : ""} ${v ? Lt.segmentDisabled : ""}`,
        "data-selected": S,
        "data-value": String(g.value),
        "aria-label": w,
        onClick: () => t(g.value),
        onKeyDown: b,
        children: /* @__PURE__ */ M("span", { className: Lt.segmentInner, children: [
          g.icon && /* @__PURE__ */ p(g.icon, { size: c }),
          g.label && /* @__PURE__ */ p("span", { children: g.label })
        ] })
      },
      String(g.value)
    );
    if (!g.tooltip) return $;
    const A = typeof g.tooltip == "string" ? { content: g.tooltip } : g.tooltip;
    return /* @__PURE__ */ p(Oo, { ...A, className: Lt.tooltipWrapper, children: $ }, String(g.value));
  };
  return /* @__PURE__ */ M(
    "div",
    {
      ref: s,
      role: "radiogroup",
      className: `${Lt.control} ${Lt[r]} ${i ? Lt.disabled : ""} ${o}`,
      "data-testid": "segmented-control",
      children: [
        l.length > 0 && /* @__PURE__ */ p("div", { className: `${Lt.pinnedLeft} ${h ? Lt.shadowLeft : ""}`, children: l.map(k) }),
        /* @__PURE__ */ p("div", { ref: a, className: Lt.scroll, children: d.map(k) }),
        u.length > 0 && /* @__PURE__ */ p("div", { className: `${Lt.pinnedRight} ${m ? Lt.shadowRight : ""}`, children: u.map(k) })
      ]
    }
  );
}
const Gb = "_list_13f5i_1", Vb = "_columns1_13f5i_5", Xb = "_columns2_13f5i_9", Kb = "_columns3_13f5i_13", Yb = "_item_13f5i_20", Zb = "_selected_13f5i_43", Qb = "_label_13f5i_52", Jb = "_description_13f5i_57", Jn = {
  list: Gb,
  columns1: Vb,
  columns2: Xb,
  columns3: Kb,
  item: Yb,
  selected: Zb,
  label: Qb,
  description: Jb
}, vI = ({
  items: e,
  value: n,
  onChange: t,
  columns: r = 1,
  className: i = "",
  "aria-label": o
}) => {
  const s = e.findIndex((h) => h.value === n), [a, c] = U(
    s >= 0 ? s : 0
  ), l = Ve.useRef([]), u = K((h) => {
    var f;
    (f = l.current[h]) == null || f.focus(), c(h);
  }, []), d = K(
    (h) => {
      switch (h.key) {
        case "ArrowDown": {
          h.preventDefault();
          const f = (a + 1) % e.length;
          u(f);
          break;
        }
        case "ArrowUp": {
          h.preventDefault();
          const f = (a - 1 + e.length) % e.length;
          u(f);
          break;
        }
        case "Home": {
          h.preventDefault(), u(0);
          break;
        }
        case "End": {
          h.preventDefault(), u(e.length - 1);
          break;
        }
        case "Enter":
        case " ": {
          h.preventDefault(), e[a] && (t == null || t(e[a].value));
          break;
        }
        default:
          return;
      }
    },
    [a, e, t, u]
  );
  return /* @__PURE__ */ p(
    "div",
    {
      role: "listbox",
      "aria-label": o,
      className: `${Jn.list} ${Jn[`columns${r}`]} ${i}`,
      onKeyDown: d,
      children: e.map((h, f) => {
        const m = h.value === n;
        return /* @__PURE__ */ M(
          "button",
          {
            ref: (_) => {
              l.current[f] = _;
            },
            type: "button",
            role: "option",
            "aria-selected": m,
            tabIndex: f === a ? 0 : -1,
            className: `${Jn.item} ${m ? Jn.selected : ""}`,
            onClick: () => {
              c(f), t == null || t(h.value);
            },
            children: [
              /* @__PURE__ */ p("span", { className: Jn.label, children: h.label }),
              h.description && /* @__PURE__ */ p("span", { className: Jn.description, children: h.description })
            ]
          },
          h.value
        );
      })
    }
  );
}, e1 = "_container_he1q8_1", t1 = "_trigger_he1q8_7", n1 = "_triggerLabel_he1q8_25", r1 = "_dropdown_he1q8_34", i1 = "_groupHeader_he1q8_43", o1 = "_group_he1q8_43", s1 = "_presets_he1q8_61", a1 = "_presetSwatch_he1q8_70", rn = {
  container: e1,
  trigger: t1,
  triggerLabel: n1,
  dropdown: r1,
  groupHeader: i1,
  group: o1,
  presets: s1,
  presetSwatch: a1
}, l1 = ["#1f2937", "#111827", "#000000", "#374151", "#4b5563", "#6b7280"], c1 = ["#000000", "#1f2937", "#111827", "#1e3a5f", "#3b0764", "#7f1d1d"], Jr = 48 / 200;
function u1(e) {
  const n = e.shadowOpacity ?? 0;
  if (n === 0) return "none";
  const r = (e.shadowColor ?? "#000000").replace("#", ""), i = parseInt(r.slice(0, 2), 16), o = parseInt(r.slice(2, 4), 16), s = parseInt(r.slice(4, 6), 16), a = Math.round((e.offsetX ?? 0) * Jr), c = Math.round((e.offsetY ?? 0) * Jr), l = Math.round((e.blur ?? 0) * Jr), u = Math.round((e.spread ?? 0) * Jr);
  return `${a}px ${c}px ${l}px ${u}px rgba(${i},${o},${s},${n})`;
}
const EI = ({ value: e, onChange: n, label: t, labelPosition: r, labelWidth: i, showBezel: o = !0, shadowPresets: s, onPresetSelect: a, offsetX: c = 0, offsetY: l = 0 }) => {
  const [u, d] = U(!1), h = Y(null), f = K(
    (_, b) => {
      n({ [_]: b });
    },
    [n]
  ), m = [
    o && e.bezelWidth > 0 ? `Bezel ${e.bezelWidth}px` : null,
    `${e.offsetX}px ${e.offsetY}px ${e.blur}px ${e.spread}px`,
    `${Math.round(e.shadowOpacity * 100)}%`
  ].filter(Boolean).join(" · "), y = /* @__PURE__ */ M("div", { className: rn.container, children: [
    /* @__PURE__ */ p(
      "button",
      {
        ref: h,
        type: "button",
        className: rn.trigger,
        onClick: () => d((_) => !_),
        children: /* @__PURE__ */ p("span", { className: rn.triggerLabel, children: m })
      }
    ),
    /* @__PURE__ */ M(
      Ct,
      {
        isOpen: u,
        onClose: () => d(!1),
        anchorRef: h,
        className: rn.dropdown,
        matchWidth: !0,
        role: "dialog",
        "aria-label": "Shadow editor",
        offsetX: c,
        offsetY: l,
        children: [
          o && /* @__PURE__ */ M("div", { className: rn.group, children: [
            /* @__PURE__ */ p("h5", { className: rn.groupHeader, children: "Bezel" }),
            /* @__PURE__ */ p(
              Pt,
              {
                label: "Width",
                labelPosition: "left",
                prefix: "px",
                type: "number",
                value: String(e.bezelWidth),
                onChange: (_) => f("bezelWidth", Number(_)),
                min: 0,
                max: 16,
                scrub: !0,
                labelWidth: 52
              }
            ),
            /* @__PURE__ */ p(
              po,
              {
                label: "Color",
                labelPosition: "left",
                labelWidth: 52,
                value: e.bezelColor,
                onChange: (_) => f("bezelColor", _),
                swatches: l1
              }
            )
          ] }),
          /* @__PURE__ */ M("div", { className: rn.group, children: [
            o && /* @__PURE__ */ p("h5", { className: rn.groupHeader, children: "Drop shadow" }),
            /* @__PURE__ */ p(
              Pt,
              {
                label: "Offset X",
                labelPosition: "left",
                prefix: "px",
                type: "number",
                value: String(e.offsetX),
                onChange: (_) => f("offsetX", Number(_)),
                min: -40,
                max: 40,
                scrub: !0,
                labelWidth: 52
              }
            ),
            /* @__PURE__ */ p(
              Pt,
              {
                label: "Offset Y",
                labelPosition: "left",
                prefix: "px",
                type: "number",
                value: String(e.offsetY),
                onChange: (_) => f("offsetY", Number(_)),
                min: -40,
                max: 40,
                scrub: !0,
                labelWidth: 52
              }
            ),
            /* @__PURE__ */ p(
              Pt,
              {
                label: "Blur",
                labelPosition: "left",
                prefix: "px",
                type: "number",
                value: String(e.blur),
                onChange: (_) => f("blur", Number(_)),
                min: 0,
                max: 100,
                scrub: !0,
                labelWidth: 52
              }
            ),
            /* @__PURE__ */ p(
              Pt,
              {
                label: "Spread",
                labelPosition: "left",
                prefix: "px",
                type: "number",
                value: String(e.spread),
                onChange: (_) => f("spread", Number(_)),
                min: -20,
                max: 40,
                scrub: !0,
                labelWidth: 52
              }
            ),
            /* @__PURE__ */ p(
              po,
              {
                label: "Color",
                labelPosition: "left",
                labelWidth: 52,
                value: e.shadowColor,
                onChange: (_) => f("shadowColor", _),
                opacity: e.shadowOpacity,
                onOpacityChange: (_) => f("shadowOpacity", _),
                swatches: c1
              }
            )
          ] }),
          s && s.length > 0 && /* @__PURE__ */ p("div", { className: rn.presets, children: s.map((_) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              className: rn.presetSwatch,
              style: { boxShadow: u1(_.value) },
              title: _.label,
              onClick: () => a == null ? void 0 : a(_.value)
            },
            _.label
          )) })
        ]
      }
    )
  ] });
  return t ? /* @__PURE__ */ p(jn, { label: t, labelPosition: r, labelWidth: i, children: y }) : y;
}, d1 = "_skeleton_dbr92_10", f1 = "_shimmer_dbr92_1", p1 = "_text_dbr92_21", h1 = "_circle_dbr92_27", m1 = "_rect_dbr92_31", g1 = "_textGroup_dbr92_36", _r = {
  skeleton: d1,
  shimmer: f1,
  text: p1,
  circle: h1,
  rect: m1,
  textGroup: g1
}, SI = ({
  variant: e = "rect",
  width: n,
  height: t,
  lines: r = 1,
  className: i = ""
}) => e === "text" && r > 1 ? /* @__PURE__ */ p("div", { className: `${_r.textGroup} ${i}`, children: Array.from({ length: r }).map((o, s) => {
  const a = s === r - 1;
  return /* @__PURE__ */ p(
    "div",
    {
      className: `${_r.skeleton} ${_r.text}`,
      style: {
        width: a ? "60%" : n ?? "100%",
        height: t
      }
    },
    s
  );
}) }) : /* @__PURE__ */ p(
  "div",
  {
    className: `${_r.skeleton} ${_r[e]} ${i}`,
    style: { width: n, height: t }
  }
), _1 = "_slider_3xjlg_1", b1 = "_disabled_3xjlg_7", y1 = "_thumb_3xjlg_11", k1 = "_trackArea_3xjlg_15", w1 = "_sm_3xjlg_21", x1 = "_track_3xjlg_15", v1 = "_md_3xjlg_37", E1 = "_fill_3xjlg_69", S1 = "_tooltip_3xjlg_91", C1 = "_tooltipVisible_3xjlg_121", N1 = "_labels_3xjlg_127", $1 = "_label_3xjlg_127", I1 = "_stepLabels_3xjlg_139", A1 = "_stepLabel_3xjlg_139", vt = {
  slider: _1,
  disabled: b1,
  thumb: y1,
  trackArea: k1,
  sm: w1,
  track: x1,
  md: v1,
  fill: E1,
  tooltip: S1,
  tooltipVisible: C1,
  labels: N1,
  label: $1,
  stepLabels: I1,
  stepLabel: A1
};
function pl(e, n, t) {
  return Math.min(Math.max(e, n), t);
}
function Hi(e, n, t, r) {
  return n !== void 0 && (e = Math.round((e - t) / n) * n + t), pl(e, t, r);
}
function br(e, n, t) {
  return t === n ? 0 : (e - n) / (t - n) * 100;
}
const CI = ({
  value: e,
  onChange: n,
  min: t = 0,
  max: r = 100,
  step: i,
  labels: o,
  stepLabels: s,
  showTooltip: a = !1,
  tooltipFormat: c,
  size: l = "md",
  disabled: u = !1,
  className: d = "",
  id: h,
  "aria-label": f
}) => {
  const m = Array.isArray(e), y = Ht(
    () => m ? e : [e, e],
    [m, e]
  ), _ = Y(null), b = Y(null), [k, g] = Ve.useState(null), S = K(
    (I) => {
      var B;
      const P = (B = _.current) == null ? void 0 : B.getBoundingClientRect();
      if (!P) return t;
      const H = pl((I - P.left) / P.width, 0, 1);
      return Hi(t + H * (r - t), i, t, r);
    },
    [t, r, i]
  ), v = K(
    (I, P) => {
      if (m) {
        const H = [...y];
        H[I] = P, I === 0 && P > H[1] && (H[0] = H[1]), I === 1 && P < H[0] && (H[1] = H[0]), n(H);
      } else
        n(P);
    },
    [m, y, n]
  ), w = K(
    (I) => (P) => {
      u || (P.preventDefault(), P.target.setPointerCapture(P.pointerId), b.current = I, g(I));
    },
    [u]
  ), $ = K(
    (I) => (P) => {
      if (b.current !== I) return;
      const H = S(P.clientX);
      v(I, H);
    },
    [S, v]
  ), A = K(
    (I) => (P) => {
      b.current === I && (P.target.releasePointerCapture(P.pointerId), b.current = null, g(null));
    },
    []
  ), D = K(
    (I) => (P) => {
      if (u) return;
      const H = i || (r - t) / 100;
      let B = null;
      switch (P.key) {
        case "ArrowRight":
        case "ArrowUp":
          B = Hi(y[I] + H, i, t, r);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          B = Hi(y[I] - H, i, t, r);
          break;
        case "Home":
          B = t;
          break;
        case "End":
          B = r;
          break;
        default:
          return;
      }
      P.preventDefault(), v(I, B);
    },
    [u, i, t, r, y, v]
  ), N = K(
    (I) => {
      if (u || I.target.getAttribute("role") === "slider") return;
      const P = S(I.clientX);
      if (m) {
        const H = Math.abs(y[0] - P), B = Math.abs(y[1] - P);
        v(H <= B ? 0 : 1, P);
      } else
        n(P);
    },
    [u, S, m, y, v, n]
  ), T = (I) => c ? c(I) : String(I), L = (I, P) => {
    const H = br(P, t, r), B = k === I, O = m ? I === 0 ? "Minimum" : "Maximum" : f ?? "Value", x = c ? c(P) : void 0;
    return /* @__PURE__ */ p(
      "div",
      {
        role: "slider",
        tabIndex: u ? -1 : 0,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuenow": P,
        "aria-orientation": "horizontal",
        "aria-disabled": u || void 0,
        "aria-label": O,
        "aria-valuetext": x,
        className: vt.thumb,
        style: { left: `${H}%` },
        onPointerDown: w(I),
        onPointerMove: $(I),
        onPointerUp: A(I),
        onKeyDown: D(I),
        children: a && /* @__PURE__ */ p(
          "span",
          {
            className: `${vt.tooltip} ${B ? vt.tooltipVisible : ""}`,
            children: T(P)
          }
        )
      },
      I
    );
  }, j = m ? br(y[0], t, r) : 0, F = m ? br(y[1], t, r) - br(y[0], t, r) : br(y[0], t, r);
  return /* @__PURE__ */ M(
    "div",
    {
      id: h,
      className: `${vt.slider} ${vt[l]} ${u ? vt.disabled : ""} ${d}`,
      children: [
        /* @__PURE__ */ M(
          "div",
          {
            className: vt.trackArea,
            ref: _,
            onPointerDown: N,
            children: [
              /* @__PURE__ */ p("div", { className: vt.track, children: /* @__PURE__ */ p(
                "div",
                {
                  className: vt.fill,
                  style: { left: `${j}%`, width: `${F}%` }
                }
              ) }),
              m ? [L(0, y[0]), L(1, y[1])] : L(0, y[0])
            ]
          }
        ),
        o && /* @__PURE__ */ M("div", { className: vt.labels, children: [
          o.start && /* @__PURE__ */ p("span", { className: vt.label, children: o.start }),
          o.end && /* @__PURE__ */ p("span", { className: vt.label, children: o.end })
        ] }),
        s && /* @__PURE__ */ p("div", { className: vt.stepLabels, children: s.map((I, P) => /* @__PURE__ */ p("span", { className: vt.stepLabel, children: I }, P)) })
      ]
    }
  );
}, M1 = "_root_c9jbq_6", L1 = "_svg_c9jbq_12", R1 = "_spin_c9jbq_1", T1 = "_track_c9jbq_19", D1 = "_arc_c9jbq_20", P1 = "_inverted_c9jbq_22", O1 = "_sm_c9jbq_25", z1 = "_md_c9jbq_26", B1 = "_lg_c9jbq_27", F1 = "_srOnly_c9jbq_29", Pn = {
  root: M1,
  svg: L1,
  spin: R1,
  track: T1,
  arc: D1,
  inverted: P1,
  sm: O1,
  md: z1,
  lg: B1,
  srOnly: F1
};
function NI({
  size: e = "md",
  variant: n = "default",
  label: t = "Loading",
  className: r
}) {
  return /* @__PURE__ */ M(
    "div",
    {
      className: `${Pn.root} ${Pn[e]} ${Pn[n]}${r ? ` ${r}` : ""}`,
      role: "status",
      "aria-label": t,
      children: [
        /* @__PURE__ */ M("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: Pn.svg, children: [
          /* @__PURE__ */ p("circle", { cx: "12", cy: "12", r: "10", strokeWidth: "2.5", className: Pn.track }),
          /* @__PURE__ */ p("circle", { cx: "12", cy: "12", r: "10", strokeWidth: "2.5", strokeDasharray: "32 63", strokeLinecap: "round", className: Pn.arc })
        ] }),
        /* @__PURE__ */ p("span", { className: Pn.srOnly, children: t })
      ]
    }
  );
}
const j1 = "_wrapper_bzbsq_1", H1 = "_table_bzbsq_5", q1 = "_headerCell_bzbsq_12", U1 = "_row_bzbsq_26", W1 = "_cell_bzbsq_29", G1 = "_compact_bzbsq_38", V1 = "_striped_bzbsq_45", X1 = "_clickable_bzbsq_52", Sn = {
  wrapper: j1,
  table: H1,
  headerCell: q1,
  row: U1,
  cell: W1,
  compact: G1,
  striped: V1,
  clickable: X1
};
function $I({
  columns: e,
  data: n,
  rowKey: t,
  striped: r = !1,
  compact: i = !1,
  className: o = "",
  onRowClick: s
}) {
  const a = (c, l) => typeof t == "function" ? t(c) : String(c[t] ?? l);
  return /* @__PURE__ */ p("div", { className: `${Sn.wrapper} ${o}`, children: /* @__PURE__ */ M(
    "table",
    {
      className: `${Sn.table} ${r ? Sn.striped : ""} ${i ? Sn.compact : ""}`,
      children: [
        /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p("tr", { children: e.map((c) => /* @__PURE__ */ p(
          "th",
          {
            scope: "col",
            className: Sn.headerCell,
            style: c.width ? { width: c.width } : void 0,
            children: c.header
          },
          c.key
        )) }) }),
        /* @__PURE__ */ p("tbody", { children: n.map((c, l) => /* @__PURE__ */ p(
          "tr",
          {
            className: `${Sn.row}${s ? ` ${Sn.clickable}` : ""}`,
            ...s ? {
              onClick: () => s(c),
              role: "button",
              tabIndex: 0,
              onKeyDown: (u) => {
                (u.key === "Enter" || u.key === " ") && (u.preventDefault(), s(c));
              }
            } : {},
            children: e.map((u) => /* @__PURE__ */ p("td", { className: Sn.cell, children: u.render ? u.render(c[u.key], c) : String(c[u.key] ?? "") }, u.key))
          },
          a(c, l)
        )) })
      ]
    }
  ) });
}
const K1 = "_tabList_1tef9_1", Y1 = "_md_1tef9_18", Z1 = "_tab_1tef9_1", Q1 = "_sm_1tef9_25", J1 = "_active_1tef9_43", ei = {
  tabList: K1,
  md: Y1,
  tab: Z1,
  sm: Q1,
  active: J1
}, II = ({
  tabs: e,
  activeId: n,
  onChange: t,
  size: r = "md",
  className: i = ""
}) => {
  const o = mn(), s = Y([]), a = (d) => `tab-${o}-${d}`, c = (d) => `panel-${o}-${d}`, l = K((d) => {
    var h;
    (h = s.current[d]) == null || h.focus();
  }, []), u = K(
    (d) => {
      const h = e.findIndex((m) => m.id === n);
      let f = null;
      switch (d.key) {
        case "ArrowRight":
        case "ArrowDown":
          d.preventDefault(), f = (h + 1) % e.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          d.preventDefault(), f = (h - 1 + e.length) % e.length;
          break;
        case "Home":
          d.preventDefault(), f = 0;
          break;
        case "End":
          d.preventDefault(), f = e.length - 1;
          break;
        default:
          return;
      }
      f !== null && (t(e[f].id), l(f));
    },
    [e, n, t, l]
  );
  return /* @__PURE__ */ p(
    "div",
    {
      role: "tablist",
      className: `${ei.tabList} ${ei[r]} ${i}`,
      onKeyDown: u,
      children: e.map((d, h) => {
        const f = d.id === n;
        return /* @__PURE__ */ p(
          "button",
          {
            ref: (m) => {
              s.current[h] = m;
            },
            id: a(d.id),
            role: "tab",
            "aria-selected": f,
            "aria-controls": c(d.id),
            tabIndex: f ? 0 : -1,
            className: `${ei.tab} ${f ? ei.active : ""}`,
            onClick: () => t(d.id),
            children: d.label
          },
          d.id
        );
      })
    }
  );
}, ey = "_headingXl_zb4aj_3", ty = "_headingL_zb4aj_7", ny = "_headingM_zb4aj_11", ry = "_headingS_zb4aj_15", iy = "_headingXs_zb4aj_19", oy = "_overline_zb4aj_25", sy = "_bodyM_zb4aj_31", ay = "_bodyS_zb4aj_35", ly = "_bodyXs_zb4aj_39", cy = "_bodyMStrong_zb4aj_45", uy = "_bodySStrong_zb4aj_49", dy = "_bodyXsStrong_zb4aj_53", fy = "_colorPrimary_zb4aj_59", py = "_colorSecondary_zb4aj_63", hy = "_colorSubtle_zb4aj_67", my = "_colorHighlight_zb4aj_71", gy = "_colorWarning_zb4aj_75", _y = "_colorInvertedPrimary_zb4aj_79", qs = {
  headingXl: ey,
  headingL: ty,
  headingM: ny,
  headingS: ry,
  headingXs: iy,
  overline: oy,
  bodyM: sy,
  bodyS: ay,
  bodyXs: ly,
  bodyMStrong: cy,
  bodySStrong: uy,
  bodyXsStrong: dy,
  colorPrimary: fy,
  colorSecondary: py,
  colorSubtle: hy,
  colorHighlight: my,
  colorWarning: gy,
  colorInvertedPrimary: _y
}, by = {
  "heading-xl": "headingXl",
  "heading-l": "headingL",
  "heading-m": "headingM",
  "heading-s": "headingS",
  "heading-xs": "headingXs",
  overline: "overline",
  "body-m": "bodyM",
  "body-s": "bodyS",
  "body-xs": "bodyXs",
  "body-m-strong": "bodyMStrong",
  "body-s-strong": "bodySStrong",
  "body-xs-strong": "bodyXsStrong"
}, yy = {
  primary: "colorPrimary",
  secondary: "colorSecondary",
  subtle: "colorSubtle",
  highlight: "colorHighlight",
  warning: "colorWarning",
  "inverted-primary": "colorInvertedPrimary"
}, AI = ({
  variant: e,
  as: n = "span",
  color: t = "primary",
  className: r = "",
  children: i
}) => {
  const o = qs[by[e]], s = qs[yy[t]];
  return /* @__PURE__ */ p(n, { className: `${o} ${s} ${r}`, children: i });
}, ky = "_textarea_d9sap_1", wy = "_error_d9sap_16", Us = {
  textarea: ky,
  error: wy
}, MI = ({
  value: e,
  defaultValue: n,
  onChange: t,
  placeholder: r,
  label: i,
  error: o,
  helperText: s,
  rows: a = 4,
  resize: c = "vertical",
  disabled: l = !1,
  id: u,
  className: d = ""
}) => {
  const h = mn(), f = mn(), m = o ? h : void 0, y = s && !o ? f : void 0, _ = [m, y].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ p(An, { label: i, htmlFor: u, error: o, helperText: s, disabled: l, errorId: m, helperId: y, children: /* @__PURE__ */ p(
    "textarea",
    {
      id: u,
      value: e,
      defaultValue: n,
      onChange: t,
      placeholder: r,
      rows: a,
      disabled: l,
      style: { resize: c },
      className: `${Us.textarea} ${o ? Us.error : ""} ${d}`.trim(),
      "aria-invalid": o ? !0 : void 0,
      "aria-describedby": _
    }
  ) });
}, xy = "_timeline_rwrwf_1", vy = "_item_rwrwf_7", Ey = "_indicator_rwrwf_13", Sy = "_withLine_rwrwf_19", Cy = "_dot_rwrwf_28", Ny = "_success_rwrwf_37", $y = "_warning_rwrwf_42", Iy = "_info_rwrwf_47", Ay = "_error_rwrwf_52", My = "_avatarWrapper_rwrwf_63", Ly = "_iconWrapper_rwrwf_69", Ry = "_content_rwrwf_95", Ty = "_title_rwrwf_102", Dy = "_timestamp_rwrwf_110", Py = "_description_rwrwf_118", Et = {
  timeline: xy,
  item: vy,
  indicator: Ey,
  withLine: Sy,
  dot: Cy,
  success: Ny,
  warning: $y,
  info: Iy,
  error: Ay,
  default: "_default_rwrwf_57",
  avatarWrapper: My,
  iconWrapper: Ly,
  content: Ry,
  title: Ty,
  timestamp: Dy,
  description: Py
}, LI = ({ items: e, className: n = "" }) => /* @__PURE__ */ p("ol", { className: `${Et.timeline} ${n}`, children: e.map((t, r) => {
  const i = r === e.length - 1, o = t.variant ?? "default";
  return /* @__PURE__ */ M(
    "li",
    {
      className: `${Et.item} ${i ? Et.last : ""}`,
      children: [
        /* @__PURE__ */ p("div", { className: `${Et.indicator} ${i ? "" : Et.withLine}`, children: t.avatar ? /* @__PURE__ */ p("div", { className: Et.avatarWrapper, children: /* @__PURE__ */ p(ja, { src: t.avatar.src, name: t.avatar.name, size: "sm" }) }) : t.icon ? /* @__PURE__ */ p("div", { className: `${Et.iconWrapper} ${Et[o]}`, children: t.icon }) : /* @__PURE__ */ p(
          "div",
          {
            className: `${Et.dot} ${Et[o]}`,
            "aria-hidden": "true"
          }
        ) }),
        /* @__PURE__ */ M("div", { className: Et.content, children: [
          /* @__PURE__ */ p("span", { className: Et.title, children: t.title }),
          /* @__PURE__ */ p("span", { className: Et.timestamp, children: t.timestamp }),
          t.description && /* @__PURE__ */ p("div", { className: Et.description, children: t.description })
        ] })
      ]
    },
    t.id
  );
}) }), Oy = "_timePicker_1r9mn_2", zy = "_inputWrapper_1r9mn_6", By = "_input_1r9mn_6", Fy = "_open_1r9mn_31", jy = "_error_1r9mn_35", Hy = "_clockIcon_1r9mn_44", qy = "_dropdown_1r9mn_54", Uy = "_slot_1r9mn_67", Wy = "_selected_1r9mn_84", Gy = "_slotDisabled_1r9mn_90", Vt = {
  timePicker: Oy,
  inputWrapper: zy,
  input: By,
  open: Fy,
  error: jy,
  clockIcon: Hy,
  dropdown: qy,
  slot: Uy,
  selected: Wy,
  slotDisabled: Gy
};
function Vy(e) {
  const n = [];
  for (let r = 0; r < 1440; r += e) {
    const i = Math.floor(r / 60), o = r % 60;
    n.push(
      `${String(i).padStart(2, "0")}:${String(o).padStart(2, "0")}`
    );
  }
  return n;
}
function yr(e, n) {
  if (!e) return "";
  const [t, r] = e.split(":"), i = parseInt(t, 10), o = r;
  if (n === "24h")
    return `${String(i).padStart(2, "0")}:${o}`;
  const s = i >= 12 ? "PM" : "AM";
  return `${i % 12 || 12}:${o} ${s}`;
}
function Xy(e, n) {
  const t = e.trim();
  if (!t) return null;
  if (n === "24h") {
    const a = t.match(/^(\d{1,2}):(\d{2})$/);
    if (!a) return null;
    const c = parseInt(a[1], 10), l = parseInt(a[2], 10);
    return c < 0 || c > 23 || l < 0 || l > 59 ? null : `${String(c).padStart(2, "0")}:${String(l).padStart(2, "0")}`;
  }
  const r = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/i);
  if (!r) return null;
  let i = parseInt(r[1], 10);
  const o = parseInt(r[2], 10), s = r[3].toUpperCase();
  return i < 1 || i > 12 || o < 0 || o > 59 ? null : (s === "AM" ? i === 12 && (i = 0) : i !== 12 && (i += 12), `${String(i).padStart(2, "0")}:${String(o).padStart(2, "0")}`);
}
const RI = ({
  value: e,
  onChange: n,
  format: t = "24h",
  interval: r = 30,
  min: i,
  max: o,
  label: s,
  error: a,
  helperText: c,
  disabled: l = !1,
  id: u
}) => {
  const [d, h] = U(!1), [f, m] = U(() => yr(e, t)), y = Y(null), _ = Y(null);
  ae(() => {
    m(yr(e, t));
  }, [e, t]);
  const b = Vy(r), k = (A) => !!(i && A < i || o && A > o), g = () => {
    l || h(!0);
  }, S = (A) => {
    m(A.target.value);
  }, v = () => {
    const A = Xy(f, t);
    A ? k(A) ? m(yr(e, t)) : n(A) : f.trim() === "" ? n("") : m(yr(e, t));
  }, w = (A) => {
    n(A), h(!1);
  }, $ = K(
    (A) => {
      A.key === "Escape" && d && h(!1);
    },
    [d]
  );
  return ae(() => {
    const A = (D) => {
      y.current && !y.current.contains(D.target) && h(!1);
    };
    return document.addEventListener("mousedown", A), document.addEventListener("keydown", $), () => {
      document.removeEventListener("mousedown", A), document.removeEventListener("keydown", $);
    };
  }, [$]), ae(() => {
    if (d && _.current && e) {
      const A = _.current.querySelector(
        `.${Vt.selected}`
      );
      A && typeof A.scrollIntoView == "function" && A.scrollIntoView({ block: "nearest" });
    }
  }, [d, e]), /* @__PURE__ */ p(An, { label: s, htmlFor: u, error: a, helperText: c, disabled: l, children: /* @__PURE__ */ M("div", { ref: y, className: Vt.timePicker, children: [
    /* @__PURE__ */ M("div", { className: Vt.inputWrapper, children: [
      /* @__PURE__ */ p(
        "input",
        {
          id: u,
          type: "text",
          className: `${Vt.input} ${d ? Vt.open : ""} ${a ? Vt.error : ""}`,
          value: f,
          onChange: S,
          onBlur: v,
          onClick: g,
          disabled: l,
          placeholder: t === "12h" ? "12:00 AM" : "00:00",
          autoComplete: "off"
        }
      ),
      /* @__PURE__ */ p(Su, { size: 16, className: Vt.clockIcon })
    ] }),
    d && /* @__PURE__ */ p("div", { ref: _, className: Vt.dropdown, role: "listbox", children: b.map((A) => {
      const D = k(A), N = A === e;
      return /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": N,
          className: `${Vt.slot} ${N ? Vt.selected : ""} ${D ? Vt.slotDisabled : ""}`,
          onClick: () => {
            D || w(A);
          },
          disabled: D,
          children: yr(A, t)
        },
        A
      );
    }) })
  ] }) });
}, Ky = "_wrapper_10l7b_1", Yy = "_disabled_10l7b_8", Zy = "_labelRow_10l7b_13", Qy = "_labelRowTop_10l7b_18", Jy = "_labelRowLeft_10l7b_22", ek = "_labelText_10l7b_32", tk = "_track_10l7b_40", nk = "_checked_10l7b_51", rk = "_sm_10l7b_60", ik = "_thumb_10l7b_64", ok = "_md_10l7b_74", dt = {
  wrapper: Ky,
  disabled: Yy,
  labelRow: Zy,
  labelRowTop: Qy,
  labelRowLeft: Jy,
  labelText: ek,
  track: tk,
  checked: nk,
  sm: rk,
  thumb: ik,
  md: ok
}, TI = ({
  checked: e,
  onChange: n,
  label: t,
  labelPosition: r = "left",
  labelWidth: i,
  disabled: o = !1,
  size: s = "md",
  className: a = "",
  id: c,
  "aria-label": l
}) => {
  const u = c;
  return t ? /* @__PURE__ */ M(
    "label",
    {
      className: `${dt.labelRow} ${r === "left" ? dt.labelRowLeft : dt.labelRowTop} ${o ? dt.disabled : ""} ${a}`,
      children: [
        /* @__PURE__ */ p(
          "span",
          {
            className: dt.labelText,
            style: i ? { width: i, flexShrink: 0 } : void 0,
            children: t
          }
        ),
        /* @__PURE__ */ p("div", { className: dt.wrapper, children: /* @__PURE__ */ p(
          "button",
          {
            id: u,
            role: "switch",
            type: "button",
            "aria-checked": e,
            "aria-label": l,
            disabled: o,
            className: `${dt.track} ${dt[s]} ${e ? dt.checked : ""}`,
            onClick: () => n(!e),
            children: /* @__PURE__ */ p("span", { className: dt.thumb })
          }
        ) })
      ]
    }
  ) : /* @__PURE__ */ p("div", { className: `${dt.wrapper} ${o ? dt.disabled : ""} ${a}`, children: /* @__PURE__ */ p(
    "button",
    {
      id: u,
      role: "switch",
      type: "button",
      "aria-checked": e,
      "aria-label": l,
      disabled: o,
      className: `${dt.track} ${dt[s]} ${e ? dt.checked : ""}`,
      onClick: () => n(!e),
      children: /* @__PURE__ */ p("span", { className: dt.thumb })
    }
  ) });
}, sk = "_panel_1mk4b_3", ak = "_inputRow_1mk4b_12", lk = "_searchIcon_1mk4b_21", ck = "_input_1mk4b_12", uk = "_header_1mk4b_42", dk = "_list_1mk4b_50", fk = "_group_1mk4b_59", pk = "_groupLabel_1mk4b_67", hk = "_item_1mk4b_77", mk = "_itemLabel_1mk4b_98", gk = "_empty_1mk4b_107", _k = "_backdrop_1mk4b_116", bk = "_closing_1mk4b_125", yk = "_dialog_1mk4b_130", bt = {
  panel: sk,
  inputRow: ak,
  searchIcon: lk,
  input: ck,
  header: uk,
  list: dk,
  group: fk,
  groupLabel: pk,
  item: hk,
  itemLabel: mk,
  empty: gk,
  backdrop: _k,
  closing: bk,
  dialog: yk
}, kk = No(function({
  groups: n,
  placeholder: t = "Search…",
  emptyMessage: r = "No results.",
  onClose: i,
  className: o,
  header: s
}, a) {
  const [c, l] = U(""), [u, d] = U(0), h = Y(null), f = Y(null);
  Tc(a, () => ({
    focus: () => {
      var g;
      return (g = h.current) == null ? void 0 : g.focus();
    }
  }));
  const m = n.map((g) => ({
    ...g,
    items: g.searchOnly && !c ? [] : g.items.filter(
      (S) => S.label.toLowerCase().includes(c.toLowerCase())
    )
  })).filter((g) => g.items.length > 0), y = m.flatMap((g) => g.items), _ = y.length === 0;
  ae(() => {
    d(0);
  }, [c]), ae(() => {
    var v, w;
    const g = (v = f.current) == null ? void 0 : v.querySelectorAll("[data-command-item]"), S = g == null ? void 0 : g[u];
    (w = S == null ? void 0 : S.scrollIntoView) == null || w.call(S, { block: "nearest" });
  }, [u]);
  const b = K(
    (g) => {
      if (g.key === "ArrowDown")
        g.preventDefault(), d((S) => S < y.length - 1 ? S + 1 : 0);
      else if (g.key === "ArrowUp")
        g.preventDefault(), d((S) => S > 0 ? S - 1 : y.length - 1);
      else if (g.key === "Enter") {
        g.preventDefault();
        const S = y[u];
        S && !S.disabled && (S.onSelect(), i == null || i());
      } else g.key === "Escape" && (g.preventDefault(), i == null || i());
    },
    [y, u, i]
  );
  let k = 0;
  return /* @__PURE__ */ M("div", { className: [bt.panel, o].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ M("div", { className: bt.inputRow, children: [
      /* @__PURE__ */ p(Mo, { size: 16, className: bt.searchIcon, "aria-hidden": "true" }),
      /* @__PURE__ */ p(
        "input",
        {
          ref: h,
          className: bt.input,
          value: c,
          onChange: (g) => l(g.target.value),
          onKeyDown: b,
          placeholder: t,
          autoComplete: "off",
          spellCheck: !1,
          "aria-label": "Search commands"
        }
      )
    ] }),
    s && /* @__PURE__ */ p("div", { className: bt.header, children: s }),
    /* @__PURE__ */ p("div", { className: bt.list, ref: f, children: _ ? /* @__PURE__ */ p("div", { className: bt.empty, children: r }) : m.map((g, S) => /* @__PURE__ */ M("div", { className: bt.group, children: [
      g.label && /* @__PURE__ */ p("div", { className: bt.groupLabel, children: g.label }),
      g.items.map((v) => {
        const w = k++;
        return /* @__PURE__ */ M(
          "button",
          {
            type: "button",
            "data-command-item": !0,
            "data-active": u === w || void 0,
            className: bt.item,
            disabled: v.disabled,
            onMouseEnter: () => d(w),
            onClick: () => {
              v.onSelect(), i == null || i();
            },
            children: [
              v.icon && /* @__PURE__ */ p(v.icon, { size: 16 }),
              /* @__PURE__ */ p("span", { className: bt.itemLabel, children: v.label }),
              v.shortcut && /* @__PURE__ */ p(cg, { children: v.shortcut })
            ]
          },
          v.id
        );
      })
    ] }, S)) })
  ] });
});
function DI({
  open: e,
  onClose: n,
  onOpen: t,
  shortcut: r = "k",
  groups: i,
  placeholder: o,
  emptyMessage: s,
  header: a
}) {
  const c = Y(null), [l, u] = U(e), [d, h] = U(!1);
  ae(() => {
    e ? (u(!0), h(!1)) : h(!0);
  }, [e]);
  const f = K((m) => {
    m.target === m.currentTarget && d && !e && (u(!1), h(!1));
  }, [d, e]);
  return ae(() => {
    function m(y) {
      (y.metaKey || y.ctrlKey) && y.key === r && (y.preventDefault(), t == null || t());
    }
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [r, t]), ae(() => {
    e && requestAnimationFrame(() => {
      var m;
      (m = c.current) == null || m.focus();
    });
  }, [e]), l ? Rr(
    /* @__PURE__ */ M(kt, { children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: `${bt.backdrop}${d ? ` ${bt.closing}` : ""}`,
          onClick: n
        }
      ),
      /* @__PURE__ */ p(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Command palette",
          className: `${bt.dialog}${d ? ` ${bt.closing}` : ""}`,
          onAnimationEnd: f,
          children: /* @__PURE__ */ p(
            kk,
            {
              ref: c,
              groups: i,
              placeholder: o,
              emptyMessage: s,
              onClose: n,
              header: a
            }
          )
        }
      )
    ] }),
    document.body
  ) : null;
}
const wk = "_backdrop_1yy09_1", xk = "_closing_1yy09_13", vk = "_dialog_1yy09_18", Ek = "_title_1yy09_33", Sk = "_description_1yy09_39", Ck = "_footer_1yy09_45", Nk = "_cancelButton_1yy09_51", $k = "_confirmButton_1yy09_66", Ik = "_destructive_1yy09_84", on = {
  backdrop: wk,
  "alertdialog-backdrop-in": "_alertdialog-backdrop-in_1yy09_1",
  "alertdialog-backdrop-out": "_alertdialog-backdrop-out_1yy09_1",
  closing: xk,
  dialog: vk,
  "alertdialog-in": "_alertdialog-in_1yy09_1",
  "alertdialog-out": "_alertdialog-out_1yy09_1",
  title: Ek,
  description: Sk,
  footer: Ck,
  cancelButton: Nk,
  confirmButton: $k,
  default: "_default_1yy09_75",
  destructive: Ik
}, Ws = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', PI = ({
  isOpen: e,
  onConfirm: n,
  onCancel: t,
  title: r,
  description: i,
  confirmLabel: o = "Continue",
  cancelLabel: s = "Cancel",
  variant: a = "default"
}) => {
  const c = Y(null), [l, u] = U(e), [d, h] = U(!1);
  ae(() => {
    e ? (u(!0), h(!1)) : h(!0);
  }, [e]), ae(() => {
    if (!e) return;
    const m = document.activeElement, _ = requestAnimationFrame(() => {
      var g;
      const k = (g = c.current) == null ? void 0 : g.querySelector(Ws);
      k == null || k.focus();
    }), b = (k) => {
      if (k.key !== "Tab" || !c.current) return;
      const g = Array.from(
        c.current.querySelectorAll(Ws)
      );
      if (g.length === 0) return;
      const S = g[0], v = g[g.length - 1];
      k.shiftKey ? document.activeElement === S && (k.preventDefault(), v.focus()) : document.activeElement === v && (k.preventDefault(), S.focus());
    };
    return document.addEventListener("keydown", b), () => {
      cancelAnimationFrame(_), document.removeEventListener("keydown", b), m == null || m.focus();
    };
  }, [e]);
  const f = K((m) => {
    m.target === m.currentTarget && d && !e && (u(!1), h(!1));
  }, [d, e]);
  return l ? /* @__PURE__ */ p(
    "div",
    {
      className: `${on.backdrop}${d ? ` ${on.closing}` : ""}`,
      onAnimationEnd: f,
      onClick: t,
      children: /* @__PURE__ */ M(
        "div",
        {
          ref: c,
          className: `${on.dialog}${d ? ` ${on.closing}` : ""}`,
          onClick: (m) => m.stopPropagation(),
          role: "alertdialog",
          "aria-modal": "true",
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-description",
          children: [
            /* @__PURE__ */ p("h2", { id: "alert-dialog-title", className: on.title, children: r }),
            /* @__PURE__ */ p("p", { id: "alert-dialog-description", className: on.description, children: i }),
            /* @__PURE__ */ M("div", { className: on.footer, children: [
              /* @__PURE__ */ p(
                "button",
                {
                  className: on.cancelButton,
                  onClick: t,
                  type: "button",
                  children: s
                }
              ),
              /* @__PURE__ */ p(
                "button",
                {
                  className: `${on.confirmButton} ${on[a]}`,
                  onClick: n,
                  type: "button",
                  children: o
                }
              )
            ] })
          ]
        }
      )
    }
  ) : null;
}, Ak = "_backdrop_1quue_1", Mk = "_closing_1quue_13", Lk = "_modal_1quue_18", Rk = "_sm_1quue_34", Tk = "_md_1quue_35", Dk = "_lg_1quue_36", Pk = "_full_1quue_37", Ok = "_header_1quue_40", zk = "_headerBorder_1quue_47", Bk = "_title_1quue_52", Fk = "_body_1quue_58", jk = "_footer_1quue_65", Hk = "_footerBorder_1quue_69", Xt = {
  backdrop: Ak,
  "modal-backdrop-in": "_modal-backdrop-in_1quue_1",
  "modal-backdrop-out": "_modal-backdrop-out_1quue_1",
  closing: Mk,
  modal: Lk,
  "modal-in": "_modal-in_1quue_1",
  "modal-out": "_modal-out_1quue_1",
  sm: Rk,
  md: Tk,
  lg: Dk,
  full: Pk,
  header: Ok,
  headerBorder: zk,
  title: Bk,
  body: Fk,
  footer: jk,
  footerBorder: Hk
}, Gs = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', OI = ({
  isOpen: e,
  onClose: n,
  children: t,
  title: r,
  footer: i,
  headerBorder: o = !0,
  footerBorder: s = !0,
  maxWidth: a = "md"
}) => {
  const c = ln(a, "md"), l = mn(), u = Y(null), [d, h] = U(e), [f, m] = U(!1);
  ae(() => {
    e ? (h(!0), m(!1)) : m(!0);
  }, [e]), ae(() => {
    if (!e) return;
    const _ = document.activeElement, k = requestAnimationFrame(() => {
      var v;
      const S = (v = u.current) == null ? void 0 : v.querySelector(Gs);
      S == null || S.focus();
    }), g = (S) => {
      if (S.key !== "Tab" || !u.current) return;
      const v = Array.from(
        u.current.querySelectorAll(Gs)
      );
      if (v.length === 0) return;
      const w = v[0], $ = v[v.length - 1];
      S.shiftKey ? document.activeElement === w && (S.preventDefault(), $.focus()) : document.activeElement === $ && (S.preventDefault(), w.focus());
    };
    return document.addEventListener("keydown", g), () => {
      cancelAnimationFrame(k), document.removeEventListener("keydown", g), _ == null || _.focus();
    };
  }, [e]);
  const y = K((_) => {
    _.target === _.currentTarget && f && !e && (h(!1), m(!1));
  }, [f, e]);
  return d ? /* @__PURE__ */ p(
    "div",
    {
      className: `${Xt.backdrop}${f ? ` ${Xt.closing}` : ""}`,
      onAnimationEnd: y,
      onClick: n,
      children: /* @__PURE__ */ M(
        "div",
        {
          ref: u,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": r ? l : void 0,
          className: `${Xt.modal} ${Xt[c]}${f ? ` ${Xt.closing}` : ""}`,
          onClick: (_) => _.stopPropagation(),
          children: [
            /* @__PURE__ */ M("div", { className: `${Xt.header} ${o ? Xt.headerBorder : ""}`, children: [
              r ? /* @__PURE__ */ p("h2", { id: l, className: Xt.title, children: r }) : /* @__PURE__ */ p("span", {}),
              /* @__PURE__ */ p(
                ze,
                {
                  icon: lr,
                  onClick: n,
                  "aria-label": "Close",
                  title: "Close"
                }
              )
            ] }),
            /* @__PURE__ */ p("div", { className: Xt.body, children: t }),
            i && /* @__PURE__ */ p("div", { className: `${Xt.footer} ${s ? Xt.footerBorder : ""}`, children: i })
          ]
        }
      )
    }
  ) : null;
}, qk = "_backdrop_e6cfg_1", Uk = "_closing_e6cfg_10", Wk = "_panel_e6cfg_15", Gk = "_right_e6cfg_26", Vk = "_left_e6cfg_38", Xk = "_sm_e6cfg_50", Kk = "_md_e6cfg_51", Yk = "_lg_e6cfg_52", Zk = "_xl_e6cfg_53", Qk = "_header_e6cfg_56", Jk = "_headerLeft_e6cfg_66", e0 = "_headerRight_e6cfg_73", t0 = "_title_e6cfg_79", n0 = "_body_e6cfg_85", r0 = "_footer_e6cfg_91", i0 = "_pushPanel_e6cfg_97", o0 = "_pushPanelInner_e6cfg_112", ft = {
  backdrop: qk,
  "sidepanel-backdrop-in": "_sidepanel-backdrop-in_e6cfg_1",
  "sidepanel-backdrop-out": "_sidepanel-backdrop-out_e6cfg_1",
  closing: Uk,
  panel: Wk,
  "sidepanel-slide-in-right": "_sidepanel-slide-in-right_e6cfg_1",
  "sidepanel-slide-out-right": "_sidepanel-slide-out-right_e6cfg_1",
  "sidepanel-slide-in-left": "_sidepanel-slide-in-left_e6cfg_1",
  "sidepanel-slide-out-left": "_sidepanel-slide-out-left_e6cfg_1",
  right: Gk,
  left: Vk,
  sm: Xk,
  md: Kk,
  lg: Yk,
  xl: Zk,
  header: Qk,
  headerLeft: Jk,
  headerRight: e0,
  title: t0,
  body: n0,
  footer: r0,
  pushPanel: i0,
  "sidepanel-push-in": "_sidepanel-push-in_e6cfg_1",
  "sidepanel-push-out": "_sidepanel-push-out_e6cfg_1",
  pushPanelInner: o0
}, Vs = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', s0 = {
  sm: 280,
  md: 320,
  lg: 400,
  xl: 540
}, a0 = ({
  isOpen: e,
  onClose: n,
  children: t,
  title: r,
  footer: i,
  actions: o,
  width: s = "md",
  mode: a = "overlay",
  side: c = "right",
  "data-testid": l
}) => {
  const u = typeof s == "string" ? ln(s, "md") : s, d = typeof u == "string", h = d ? s0[u] : u, f = mn(), m = Y(null), y = c === "left" ? ft.left : ft.right, [_, b] = U(e), [k, g] = U(!1);
  ae(() => {
    e ? (b(!0), g(!1)) : g(!0);
  }, [e]), ae(() => {
    if (!e || a !== "overlay") return;
    const A = document.activeElement, N = requestAnimationFrame(() => {
      var j;
      const L = (j = m.current) == null ? void 0 : j.querySelector(Vs);
      L == null || L.focus();
    }), T = (L) => {
      if (L.key !== "Tab" || !m.current) return;
      const j = Array.from(
        m.current.querySelectorAll(Vs)
      );
      if (j.length === 0) return;
      const F = j[0], I = j[j.length - 1];
      L.shiftKey ? document.activeElement === F && (L.preventDefault(), I.focus()) : document.activeElement === I && (L.preventDefault(), F.focus());
    };
    return document.addEventListener("keydown", T), () => {
      cancelAnimationFrame(N), document.removeEventListener("keydown", T), A == null || A.focus();
    };
  }, [e, a]);
  const S = K((A) => {
    A.target === A.currentTarget && k && !e && (b(!1), g(!1));
  }, [k, e]), v = typeof r == "string", w = /* @__PURE__ */ M(kt, { children: [
    /* @__PURE__ */ M("div", { className: ft.header, children: [
      /* @__PURE__ */ p("div", { className: ft.headerLeft, children: v ? /* @__PURE__ */ p("h2", { id: f, className: ft.title, children: r }) : r }),
      /* @__PURE__ */ M("div", { className: ft.headerRight, children: [
        o,
        /* @__PURE__ */ p(
          ze,
          {
            icon: lr,
            onClick: n,
            "aria-label": "Close",
            title: "Close",
            size: "sm"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: ft.body, children: t }),
    i && /* @__PURE__ */ p("div", { className: ft.footer, children: i })
  ] });
  if (!_) return null;
  if (a === "push")
    return /* @__PURE__ */ p(
      "div",
      {
        className: `${ft.pushPanel}${k ? ` ${ft.closing}` : ""}`,
        "data-testid": l,
        style: { "--panel-target-width": `${h}px` },
        onAnimationEnd: S,
        children: /* @__PURE__ */ p("div", { className: ft.pushPanelInner, style: { width: h }, children: w })
      }
    );
  const $ = d ? void 0 : { width: `min(${u}px, 100vw)` };
  return /* @__PURE__ */ p(
    "div",
    {
      className: `${ft.backdrop}${k ? ` ${ft.closing}` : ""}`,
      "data-testid": l,
      onClick: n,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: m,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": v ? f : void 0,
          className: `${ft.panel} ${y} ${d ? ft[u] : ""}${k ? ` ${ft.closing}` : ""}`,
          style: $,
          onAnimationEnd: S,
          onClick: (A) => A.stopPropagation(),
          children: w
        }
      )
    }
  );
}, l0 = "_toast_b7q8l_23", c0 = "_exiting_b7q8l_36", u0 = "_icon_b7q8l_42", d0 = "_message_b7q8l_51", f0 = "_dismiss_b7q8l_60", p0 = "_stack_b7q8l_76", h0 = "_bottomRight_b7q8l_85", m0 = "_bottomLeft_b7q8l_90", g0 = "_topRight_b7q8l_95", _0 = "_topLeft_b7q8l_100", Yt = {
  toast: l0,
  "toast-in": "_toast-in_b7q8l_1",
  exiting: c0,
  "toast-out": "_toast-out_b7q8l_1",
  icon: u0,
  message: d0,
  dismiss: f0,
  stack: p0,
  bottomRight: h0,
  bottomLeft: m0,
  topRight: g0,
  topLeft: _0
}, b0 = {
  info: Iu,
  success: vu,
  warning: qu,
  error: Eu
}, Xs = 300;
function y0({
  id: e,
  message: n,
  variant: t = "info",
  autoDismiss: r,
  onDismiss: i,
  className: o = ""
}) {
  const [s, a] = U(!1), c = b0[t], l = () => {
    a(!0), setTimeout(() => i == null ? void 0 : i(e), Xs);
  };
  ae(() => {
    if (!r) return;
    const m = setTimeout(() => {
      a(!0), setTimeout(() => i == null ? void 0 : i(e), Xs);
    }, r);
    return () => clearTimeout(m);
  }, [r, e, i]);
  const u = [
    Yt.toast,
    Yt[t],
    s ? Yt.exiting : "",
    o
  ].filter(Boolean).join(" "), d = t === "error" || t === "warning";
  return /* @__PURE__ */ M("div", { role: d ? "alert" : "status", "aria-live": d ? void 0 : "polite", "aria-atomic": "true", className: u, children: [
    /* @__PURE__ */ p("span", { className: Yt.icon, "aria-hidden": "true", children: /* @__PURE__ */ p(c, { size: 16 }) }),
    /* @__PURE__ */ p("p", { className: Yt.message, children: n }),
    i && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: Yt.dismiss,
        "aria-label": "Dismiss",
        onClick: l,
        children: /* @__PURE__ */ p(lr, { size: 14 })
      }
    )
  ] });
}
const k0 = {
  "bottom-right": Yt.bottomRight,
  "bottom-left": Yt.bottomLeft,
  "top-right": Yt.topRight,
  "top-left": Yt.topLeft
};
function zI({
  toasts: e,
  onDismiss: n,
  position: t = "bottom-right",
  className: r = ""
}) {
  const i = [
    Yt.stack,
    k0[t],
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: i, children: e.map((o) => /* @__PURE__ */ p(
    y0,
    {
      id: o.id,
      message: o.message,
      variant: o.variant,
      autoDismiss: o.autoDismiss,
      onDismiss: n
    },
    o.id
  )) });
}
function w0(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const x0 = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, v0 = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, E0 = {};
function Ks(e, n) {
  return (E0.jsx ? v0 : x0).test(e);
}
const S0 = /[ \t\n\f\r]/g;
function C0(e) {
  return typeof e == "object" ? e.type === "text" ? Ys(e.value) : !1 : Ys(e);
}
function Ys(e) {
  return e.replace(S0, "") === "";
}
class Tr {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(n, t, r) {
    this.normal = t, this.property = n, r && (this.space = r);
  }
}
Tr.prototype.normal = {};
Tr.prototype.property = {};
Tr.prototype.space = void 0;
function hl(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new Tr(t, r, n);
}
function mo(e) {
  return e.toLowerCase();
}
class $t {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(n, t) {
    this.attribute = t, this.property = n;
  }
}
$t.prototype.attribute = "";
$t.prototype.booleanish = !1;
$t.prototype.boolean = !1;
$t.prototype.commaOrSpaceSeparated = !1;
$t.prototype.commaSeparated = !1;
$t.prototype.defined = !1;
$t.prototype.mustUseProperty = !1;
$t.prototype.number = !1;
$t.prototype.overloadedBoolean = !1;
$t.prototype.property = "";
$t.prototype.spaceSeparated = !1;
$t.prototype.space = void 0;
let N0 = 0;
const ve = qn(), et = qn(), go = qn(), W = qn(), We = qn(), sr = qn(), Tt = qn();
function qn() {
  return 2 ** ++N0;
}
const _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ve,
  booleanish: et,
  commaOrSpaceSeparated: Tt,
  commaSeparated: sr,
  number: W,
  overloadedBoolean: go,
  spaceSeparated: We
}, Symbol.toStringTag, { value: "Module" })), qi = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(_o)
);
class Ho extends $t {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(n, t, r, i) {
    let o = -1;
    if (super(n, t), Zs(this, "space", i), typeof r == "number")
      for (; ++o < qi.length; ) {
        const s = qi[o];
        Zs(this, qi[o], (r & _o[s]) === _o[s]);
      }
  }
}
Ho.prototype.defined = !0;
function Zs(e, n, t) {
  t && (e[n] = t);
}
function cr(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new Ho(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), n[r] = o, t[mo(r)] = r, t[mo(o.attribute)] = r;
  }
  return new Tr(n, t, e.space);
}
const ml = cr({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: et,
    ariaAutoComplete: null,
    ariaBusy: et,
    ariaChecked: et,
    ariaColCount: W,
    ariaColIndex: W,
    ariaColSpan: W,
    ariaControls: We,
    ariaCurrent: null,
    ariaDescribedBy: We,
    ariaDetails: null,
    ariaDisabled: et,
    ariaDropEffect: We,
    ariaErrorMessage: null,
    ariaExpanded: et,
    ariaFlowTo: We,
    ariaGrabbed: et,
    ariaHasPopup: null,
    ariaHidden: et,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: We,
    ariaLevel: W,
    ariaLive: null,
    ariaModal: et,
    ariaMultiLine: et,
    ariaMultiSelectable: et,
    ariaOrientation: null,
    ariaOwns: We,
    ariaPlaceholder: null,
    ariaPosInSet: W,
    ariaPressed: et,
    ariaReadOnly: et,
    ariaRelevant: null,
    ariaRequired: et,
    ariaRoleDescription: We,
    ariaRowCount: W,
    ariaRowIndex: W,
    ariaRowSpan: W,
    ariaSelected: et,
    ariaSetSize: W,
    ariaSort: null,
    ariaValueMax: W,
    ariaValueMin: W,
    ariaValueNow: W,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function gl(e, n) {
  return n in e ? e[n] : n;
}
function _l(e, n) {
  return gl(e, n.toLowerCase());
}
const $0 = cr({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: sr,
    acceptCharset: We,
    accessKey: We,
    action: null,
    allow: null,
    allowFullScreen: ve,
    allowPaymentRequest: ve,
    allowUserMedia: ve,
    alt: null,
    as: null,
    async: ve,
    autoCapitalize: null,
    autoComplete: We,
    autoFocus: ve,
    autoPlay: ve,
    blocking: We,
    capture: null,
    charSet: null,
    checked: ve,
    cite: null,
    className: We,
    cols: W,
    colSpan: null,
    content: null,
    contentEditable: et,
    controls: ve,
    controlsList: We,
    coords: W | sr,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: ve,
    defer: ve,
    dir: null,
    dirName: null,
    disabled: ve,
    download: go,
    draggable: et,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: ve,
    formTarget: null,
    headers: We,
    height: W,
    hidden: go,
    high: W,
    href: null,
    hrefLang: null,
    htmlFor: We,
    httpEquiv: We,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: ve,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: ve,
    itemId: null,
    itemProp: We,
    itemRef: We,
    itemScope: ve,
    itemType: We,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: ve,
    low: W,
    manifest: null,
    max: null,
    maxLength: W,
    media: null,
    method: null,
    min: null,
    minLength: W,
    multiple: ve,
    muted: ve,
    name: null,
    nonce: null,
    noModule: ve,
    noValidate: ve,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: ve,
    optimum: W,
    pattern: null,
    ping: We,
    placeholder: null,
    playsInline: ve,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: ve,
    referrerPolicy: null,
    rel: We,
    required: ve,
    reversed: ve,
    rows: W,
    rowSpan: W,
    sandbox: We,
    scope: null,
    scoped: ve,
    seamless: ve,
    selected: ve,
    shadowRootClonable: ve,
    shadowRootDelegatesFocus: ve,
    shadowRootMode: null,
    shape: null,
    size: W,
    sizes: null,
    slot: null,
    span: W,
    spellCheck: et,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: W,
    step: null,
    style: null,
    tabIndex: W,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: ve,
    useMap: null,
    value: et,
    width: W,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: We,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: W,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: W,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: ve,
    // Lists. Use CSS to reduce space between items instead
    declare: ve,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: W,
    // `<img>` and `<object>`
    leftMargin: W,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: W,
    // `<body>`
    marginWidth: W,
    // `<body>`
    noResize: ve,
    // `<frame>`
    noHref: ve,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: ve,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: ve,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: W,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: et,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: W,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: W,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: ve,
    disableRemotePlayback: ve,
    prefix: null,
    property: null,
    results: W,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: _l
}), I0 = cr({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: Tt,
    accentHeight: W,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: W,
    amplitude: W,
    arabicForm: null,
    ascent: W,
    attributeName: null,
    attributeType: null,
    azimuth: W,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: W,
    by: null,
    calcMode: null,
    capHeight: W,
    className: We,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: W,
    diffuseConstant: W,
    direction: null,
    display: null,
    dur: null,
    divisor: W,
    dominantBaseline: null,
    download: ve,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: W,
    enableBackground: null,
    end: null,
    event: null,
    exponent: W,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: W,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: sr,
    g2: sr,
    glyphName: sr,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: W,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: W,
    horizOriginX: W,
    horizOriginY: W,
    id: null,
    ideographic: W,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: W,
    k: W,
    k1: W,
    k2: W,
    k3: W,
    k4: W,
    kernelMatrix: Tt,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: W,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: W,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: W,
    overlineThickness: W,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: W,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: We,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: W,
    pointsAtY: W,
    pointsAtZ: W,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Tt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Tt,
    rev: Tt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Tt,
    requiredFeatures: Tt,
    requiredFonts: Tt,
    requiredFormats: Tt,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: W,
    specularExponent: W,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: W,
    strikethroughThickness: W,
    string: null,
    stroke: null,
    strokeDashArray: Tt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: W,
    strokeOpacity: W,
    strokeWidth: null,
    style: null,
    surfaceScale: W,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Tt,
    tabIndex: W,
    tableValues: null,
    target: null,
    targetX: W,
    targetY: W,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Tt,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: W,
    underlineThickness: W,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: W,
    values: null,
    vAlphabetic: W,
    vMathematical: W,
    vectorEffect: null,
    vHanging: W,
    vIdeographic: W,
    version: null,
    vertAdvY: W,
    vertOriginX: W,
    vertOriginY: W,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: W,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: gl
}), bl = cr({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  }
}), yl = cr({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: _l
}), kl = cr({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), A0 = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, M0 = /[A-Z]/g, Qs = /-[a-z]/g, L0 = /^data[-\w.:]+$/i;
function R0(e, n) {
  const t = mo(n);
  let r = n, i = $t;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && L0.test(n)) {
    if (n.charAt(4) === "-") {
      const o = n.slice(5).replace(Qs, D0);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = n.slice(4);
      if (!Qs.test(o)) {
        let s = o.replace(M0, T0);
        s.charAt(0) !== "-" && (s = "-" + s), n = "data" + s;
      }
    }
    i = Ho;
  }
  return new i(r, n);
}
function T0(e) {
  return "-" + e.toLowerCase();
}
function D0(e) {
  return e.charAt(1).toUpperCase();
}
const P0 = hl([ml, $0, bl, yl, kl], "html"), qo = hl([ml, I0, bl, yl, kl], "svg");
function O0(e) {
  return e.join(" ").trim();
}
var er = {}, Ui, Js;
function z0() {
  if (Js) return Ui;
  Js = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, n = /\n/g, t = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, i = /^:\s*/, o = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, s = /^[;\s]*/, a = /^\s+|\s+$/g, c = `
`, l = "/", u = "*", d = "", h = "comment", f = "declaration";
  function m(_, b) {
    if (typeof _ != "string")
      throw new TypeError("First argument must be a string");
    if (!_) return [];
    b = b || {};
    var k = 1, g = 1;
    function S(F) {
      var I = F.match(n);
      I && (k += I.length);
      var P = F.lastIndexOf(c);
      g = ~P ? F.length - P : g + F.length;
    }
    function v() {
      var F = { line: k, column: g };
      return function(I) {
        return I.position = new w(F), D(), I;
      };
    }
    function w(F) {
      this.start = F, this.end = { line: k, column: g }, this.source = b.source;
    }
    w.prototype.content = _;
    function $(F) {
      var I = new Error(
        b.source + ":" + k + ":" + g + ": " + F
      );
      if (I.reason = F, I.filename = b.source, I.line = k, I.column = g, I.source = _, !b.silent) throw I;
    }
    function A(F) {
      var I = F.exec(_);
      if (I) {
        var P = I[0];
        return S(P), _ = _.slice(P.length), I;
      }
    }
    function D() {
      A(t);
    }
    function N(F) {
      var I;
      for (F = F || []; I = T(); )
        I !== !1 && F.push(I);
      return F;
    }
    function T() {
      var F = v();
      if (!(l != _.charAt(0) || u != _.charAt(1))) {
        for (var I = 2; d != _.charAt(I) && (u != _.charAt(I) || l != _.charAt(I + 1)); )
          ++I;
        if (I += 2, d === _.charAt(I - 1))
          return $("End of comment missing");
        var P = _.slice(2, I - 2);
        return g += 2, S(P), _ = _.slice(I), g += 2, F({
          type: h,
          comment: P
        });
      }
    }
    function L() {
      var F = v(), I = A(r);
      if (I) {
        if (T(), !A(i)) return $("property missing ':'");
        var P = A(o), H = F({
          type: f,
          property: y(I[0].replace(e, d)),
          value: P ? y(P[0].replace(e, d)) : d
        });
        return A(s), H;
      }
    }
    function j() {
      var F = [];
      N(F);
      for (var I; I = L(); )
        I !== !1 && (F.push(I), N(F));
      return F;
    }
    return D(), j();
  }
  function y(_) {
    return _ ? _.replace(a, d) : d;
  }
  return Ui = m, Ui;
}
var ea;
function B0() {
  if (ea) return er;
  ea = 1;
  var e = er && er.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(er, "__esModule", { value: !0 }), er.default = t;
  const n = e(z0());
  function t(r, i) {
    let o = null;
    if (!r || typeof r != "string")
      return o;
    const s = (0, n.default)(r), a = typeof i == "function";
    return s.forEach((c) => {
      if (c.type !== "declaration")
        return;
      const { property: l, value: u } = c;
      a ? i(l, u, c) : u && (o = o || {}, o[l] = u);
    }), o;
  }
  return er;
}
var kr = {}, ta;
function F0() {
  if (ta) return kr;
  ta = 1, Object.defineProperty(kr, "__esModule", { value: !0 }), kr.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, t = /^[^-]+$/, r = /^-(webkit|moz|ms|o|khtml)-/, i = /^-(ms)-/, o = function(l) {
    return !l || t.test(l) || e.test(l);
  }, s = function(l, u) {
    return u.toUpperCase();
  }, a = function(l, u) {
    return "".concat(u, "-");
  }, c = function(l, u) {
    return u === void 0 && (u = {}), o(l) ? l : (l = l.toLowerCase(), u.reactCompat ? l = l.replace(i, a) : l = l.replace(r, a), l.replace(n, s));
  };
  return kr.camelCase = c, kr;
}
var wr, na;
function j0() {
  if (na) return wr;
  na = 1;
  var e = wr && wr.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  }, n = e(B0()), t = F0();
  function r(i, o) {
    var s = {};
    return !i || typeof i != "string" || (0, n.default)(i, function(a, c) {
      a && c && (s[(0, t.camelCase)(a, o)] = c);
    }), s;
  }
  return r.default = r, wr = r, wr;
}
var H0 = j0();
const q0 = /* @__PURE__ */ zo(H0), wl = xl("end"), Uo = xl("start");
function xl(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function U0(e) {
  const n = Uo(e), t = wl(e);
  if (n && t)
    return { start: n, end: t };
}
function Nr(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ra(e.position) : "start" in e || "end" in e ? ra(e) : "line" in e || "column" in e ? bo(e) : "";
}
function bo(e) {
  return ia(e && e.line) + ":" + ia(e && e.column);
}
function ra(e) {
  return bo(e && e.start) + "-" + bo(e && e.end);
}
function ia(e) {
  return e && typeof e == "number" ? e : 1;
}
class ht extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", o = {}, s = !1;
    if (t && ("line" in t && "column" in t ? o = { place: t } : "start" in t && "end" in t ? o = { place: t } : "type" in t ? o = {
      ancestors: [t],
      place: t.position
    } : o = { ...t }), typeof n == "string" ? i = n : !o.cause && n && (s = !0, i = n.message, o.cause = n), !o.ruleId && !o.source && typeof r == "string") {
      const c = r.indexOf(":");
      c === -1 ? o.ruleId = r : (o.source = r.slice(0, c), o.ruleId = r.slice(c + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const c = o.ancestors[o.ancestors.length - 1];
      c && (o.place = c.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Nr(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = s && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ht.prototype.file = "";
ht.prototype.name = "";
ht.prototype.reason = "";
ht.prototype.message = "";
ht.prototype.stack = "";
ht.prototype.column = void 0;
ht.prototype.line = void 0;
ht.prototype.ancestors = void 0;
ht.prototype.cause = void 0;
ht.prototype.fatal = void 0;
ht.prototype.place = void 0;
ht.prototype.ruleId = void 0;
ht.prototype.source = void 0;
const Wo = {}.hasOwnProperty, W0 = /* @__PURE__ */ new Map(), G0 = /[A-Z]/g, V0 = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), X0 = /* @__PURE__ */ new Set(["td", "th"]), vl = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function K0(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = rw(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = nw(t, n.jsx, n.jsxs);
  }
  const i = {
    Fragment: n.Fragment,
    ancestors: [],
    components: n.components || {},
    create: r,
    elementAttributeNameCase: n.elementAttributeNameCase || "react",
    evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
    filePath: t,
    ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
    passKeys: n.passKeys !== !1,
    passNode: n.passNode || !1,
    schema: n.space === "svg" ? qo : P0,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, o = El(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function El(e, n, t) {
  if (n.type === "element")
    return Y0(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return Z0(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return J0(e, n, t);
  if (n.type === "mdxjsEsm")
    return Q0(e, n);
  if (n.type === "root")
    return ew(e, n, t);
  if (n.type === "text")
    return tw(e, n);
}
function Y0(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = qo, e.schema = i), e.ancestors.push(n);
  const o = Cl(e, n.tagName, !1), s = iw(e, n);
  let a = Vo(e, n);
  return V0.has(n.tagName) && (a = a.filter(function(c) {
    return typeof c == "string" ? !C0(c) : !0;
  })), Sl(e, s, o, n), Go(s, a), e.ancestors.pop(), e.schema = r, e.create(n, o, s, t);
}
function Z0(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Mr(e, n.position);
}
function Q0(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Mr(e, n.position);
}
function J0(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = qo, e.schema = i), e.ancestors.push(n);
  const o = n.name === null ? e.Fragment : Cl(e, n.name, !0), s = ow(e, n), a = Vo(e, n);
  return Sl(e, s, o, n), Go(s, a), e.ancestors.pop(), e.schema = r, e.create(n, o, s, t);
}
function ew(e, n, t) {
  const r = {};
  return Go(r, Vo(e, n)), e.create(n, e.Fragment, r, t);
}
function tw(e, n) {
  return n.value;
}
function Sl(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function Go(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function nw(e, n, t) {
  return r;
  function r(i, o, s, a) {
    const l = Array.isArray(s.children) ? t : n;
    return a ? l(o, s, a) : l(o, s);
  }
}
function rw(e, n) {
  return t;
  function t(r, i, o, s) {
    const a = Array.isArray(o.children), c = Uo(r);
    return n(
      i,
      o,
      s,
      a,
      {
        columnNumber: c ? c.column - 1 : void 0,
        fileName: e,
        lineNumber: c ? c.line : void 0
      },
      void 0
    );
  }
}
function iw(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && Wo.call(n.properties, i)) {
      const o = sw(e, i, n.properties[i]);
      if (o) {
        const [s, a] = o;
        e.tableCellAlignToStyle && s === "align" && typeof a == "string" && X0.has(n.tagName) ? r = a : t[s] = a;
      }
    }
  if (r) {
    const o = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function ow(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const s = o.expression;
        s.type;
        const a = s.properties[0];
        a.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Mr(e, n.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          Mr(e, n.position);
      else
        o = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return t;
}
function Vo(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : W0;
  for (; ++r < n.children.length; ) {
    const o = n.children[r];
    let s;
    if (e.passKeys) {
      const c = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (c) {
        const l = i.get(c) || 0;
        s = c + "-" + l, i.set(c, l + 1);
      }
    }
    const a = El(e, o, s);
    a !== void 0 && t.push(a);
  }
  return t;
}
function sw(e, n, t) {
  const r = R0(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? w0(t) : O0(t)), r.property === "style") {
      let i = typeof t == "object" ? t : aw(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = lw(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? A0[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function aw(e, n) {
  try {
    return q0(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), i = new ht("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = vl + "#cannot-parse-style-attribute", i;
  }
}
function Cl(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let o = -1, s;
    for (; ++o < i.length; ) {
      const a = Ks(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = s;
  } else
    r = Ks(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Wo.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Mr(e);
}
function Mr(e, n) {
  const t = new ht(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = vl + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function lw(e) {
  const n = {};
  let t;
  for (t in e)
    Wo.call(e, t) && (n[cw(t)] = e[t]);
  return n;
}
function cw(e) {
  let n = e.replace(G0, uw);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function uw(e) {
  return "-" + e.toLowerCase();
}
const Wi = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, dw = {};
function Xo(e, n) {
  const t = dw, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Nl(e, r, i);
}
function Nl(e, n, t) {
  if (fw(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return oa(e.children, n, t);
  }
  return Array.isArray(e) ? oa(e, n, t) : "";
}
function oa(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Nl(e[i], n, t);
  return r.join("");
}
function fw(e) {
  return !!(e && typeof e == "object");
}
const sa = document.createElement("i");
function Ko(e) {
  const n = "&" + e + ";";
  sa.innerHTML = n;
  const t = sa.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function Ot(e, n, t, r) {
  const i = e.length;
  let o = 0, s;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    s = Array.from(r), s.unshift(n, t), e.splice(...s);
  else
    for (t && e.splice(n, t); o < r.length; )
      s = r.slice(o, o + 1e4), s.unshift(n, 0), e.splice(...s), o += 1e4, n += 1e4;
}
function jt(e, n) {
  return e.length > 0 ? (Ot(e, e.length, 0, n), e) : n;
}
const aa = {}.hasOwnProperty;
function $l(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    pw(n, e[t]);
  return n;
}
function pw(e, n) {
  let t;
  for (t in n) {
    const i = (aa.call(e, t) ? e[t] : void 0) || (e[t] = {}), o = n[t];
    let s;
    if (o)
      for (s in o) {
        aa.call(i, s) || (i[s] = []);
        const a = o[s];
        hw(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function hw(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  Ot(e, 0, 0, r);
}
function Il(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function Zt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const yt = Mn(/[A-Za-z]/), pt = Mn(/[\dA-Za-z]/), mw = Mn(/[#-'*+\--9=?A-Z^-~]/);
function di(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const yo = Mn(/\d/), gw = Mn(/[\dA-Fa-f]/), _w = Mn(/[!-/:-@[-`{-~]/);
function de(e) {
  return e !== null && e < -2;
}
function Be(e) {
  return e !== null && (e < 0 || e === 32);
}
function $e(e) {
  return e === -2 || e === -1 || e === 32;
}
const bi = Mn(new RegExp("\\p{P}|\\p{S}", "u")), Hn = Mn(/\s/);
function Mn(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function ur(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const o = e.charCodeAt(t);
    let s = "";
    if (o === 37 && pt(e.charCodeAt(t + 1)) && pt(e.charCodeAt(t + 2)))
      i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (s = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(t + 1);
      o < 56320 && a > 56319 && a < 57344 ? (s = String.fromCharCode(o, a), i = 1) : s = "�";
    } else
      s = String.fromCharCode(o);
    s && (n.push(e.slice(r, t), encodeURIComponent(s)), r = t + i + 1, s = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
function Le(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return s;
  function s(c) {
    return $e(c) ? (e.enter(t), a(c)) : n(c);
  }
  function a(c) {
    return $e(c) && o++ < i ? (e.consume(c), a) : (e.exit(t), n(c));
  }
}
const bw = {
  tokenize: yw
};
function yw(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), Le(e, n, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const c = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = c), t = c, s(a);
  }
  function s(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return de(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), s);
  }
}
const kw = {
  tokenize: ww
}, la = {
  tokenize: xw
};
function ww(e) {
  const n = this, t = [];
  let r = 0, i, o, s;
  return a;
  function a(g) {
    if (r < t.length) {
      const S = t[r];
      return n.containerState = S[1], e.attempt(S[0].continuation, c, l)(g);
    }
    return l(g);
  }
  function c(g) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && k();
      const S = n.events.length;
      let v = S, w;
      for (; v--; )
        if (n.events[v][0] === "exit" && n.events[v][1].type === "chunkFlow") {
          w = n.events[v][1].end;
          break;
        }
      b(r);
      let $ = S;
      for (; $ < n.events.length; )
        n.events[$][1].end = {
          ...w
        }, $++;
      return Ot(n.events, v + 1, 0, n.events.slice(S)), n.events.length = $, l(g);
    }
    return a(g);
  }
  function l(g) {
    if (r === t.length) {
      if (!i)
        return h(g);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return m(g);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(la, u, d)(g);
  }
  function u(g) {
    return i && k(), b(r), h(g);
  }
  function d(g) {
    return n.parser.lazy[n.now().line] = r !== t.length, s = n.now().offset, m(g);
  }
  function h(g) {
    return n.containerState = {}, e.attempt(la, f, m)(g);
  }
  function f(g) {
    return r++, t.push([n.currentConstruct, n.containerState]), h(g);
  }
  function m(g) {
    if (g === null) {
      i && k(), b(0), e.consume(g);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: o
    }), y(g);
  }
  function y(g) {
    if (g === null) {
      _(e.exit("chunkFlow"), !0), b(0), e.consume(g);
      return;
    }
    return de(g) ? (e.consume(g), _(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(g), y);
  }
  function _(g, S) {
    const v = n.sliceStream(g);
    if (S && v.push(null), g.previous = o, o && (o.next = g), o = g, i.defineSkip(g.start), i.write(v), n.parser.lazy[g.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < s && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > s)
        )
          return;
      const $ = n.events.length;
      let A = $, D, N;
      for (; A--; )
        if (n.events[A][0] === "exit" && n.events[A][1].type === "chunkFlow") {
          if (D) {
            N = n.events[A][1].end;
            break;
          }
          D = !0;
        }
      for (b(r), w = $; w < n.events.length; )
        n.events[w][1].end = {
          ...N
        }, w++;
      Ot(n.events, A + 1, 0, n.events.slice($)), n.events.length = w;
    }
  }
  function b(g) {
    let S = t.length;
    for (; S-- > g; ) {
      const v = t[S];
      n.containerState = v[1], v[0].exit.call(n, e);
    }
    t.length = g;
  }
  function k() {
    i.write([null]), o = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function xw(e, n, t) {
  return Le(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function ar(e) {
  if (e === null || Be(e) || Hn(e))
    return 1;
  if (bi(e))
    return 2;
}
function yi(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (n = o(n, t), r.push(o));
  }
  return n;
}
const ko = {
  name: "attention",
  resolveAll: vw,
  tokenize: Ew
};
function vw(e, n) {
  let t = -1, r, i, o, s, a, c, l, u;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const d = {
            ...e[r][1].end
          }, h = {
            ...e[t][1].start
          };
          ca(d, -c), ca(h, c), s = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: h
          }, o = {
            type: c > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, i = {
            type: c > 1 ? "strong" : "emphasis",
            start: {
              ...s.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...s.start
          }, e[t][1].start = {
            ...a.end
          }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = jt(l, [["enter", e[r][1], n], ["exit", e[r][1], n]])), l = jt(l, [["enter", i, n], ["enter", s, n], ["exit", s, n], ["enter", o, n]]), l = jt(l, yi(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), l = jt(l, [["exit", o, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (u = 2, l = jt(l, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : u = 0, Ot(e, r - 1, t - r + 3, l), t = r + l.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Ew(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = ar(r);
  let o;
  return s;
  function s(c) {
    return o = c, e.enter("attentionSequence"), a(c);
  }
  function a(c) {
    if (c === o)
      return e.consume(c), a;
    const l = e.exit("attentionSequence"), u = ar(c), d = !u || u === 2 && i || t.includes(c), h = !i || i === 2 && u || t.includes(r);
    return l._open = !!(o === 42 ? d : d && (i || !h)), l._close = !!(o === 42 ? h : h && (u || !d)), n(c);
  }
}
function ca(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Sw = {
  name: "autolink",
  tokenize: Cw
};
function Cw(e, n, t) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(f) {
    return yt(f) ? (e.consume(f), s) : f === 64 ? t(f) : l(f);
  }
  function s(f) {
    return f === 43 || f === 45 || f === 46 || pt(f) ? (r = 1, a(f)) : l(f);
  }
  function a(f) {
    return f === 58 ? (e.consume(f), r = 0, c) : (f === 43 || f === 45 || f === 46 || pt(f)) && r++ < 32 ? (e.consume(f), a) : (r = 0, l(f));
  }
  function c(f) {
    return f === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : f === null || f === 32 || f === 60 || di(f) ? t(f) : (e.consume(f), c);
  }
  function l(f) {
    return f === 64 ? (e.consume(f), u) : mw(f) ? (e.consume(f), l) : t(f);
  }
  function u(f) {
    return pt(f) ? d(f) : t(f);
  }
  function d(f) {
    return f === 46 ? (e.consume(f), r = 0, u) : f === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : h(f);
  }
  function h(f) {
    if ((f === 45 || pt(f)) && r++ < 63) {
      const m = f === 45 ? h : d;
      return e.consume(f), m;
    }
    return t(f);
  }
}
const Dr = {
  partial: !0,
  tokenize: Nw
};
function Nw(e, n, t) {
  return r;
  function r(o) {
    return $e(o) ? Le(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || de(o) ? n(o) : t(o);
  }
}
const Al = {
  continuation: {
    tokenize: Iw
  },
  exit: Aw,
  name: "blockQuote",
  tokenize: $w
};
function $w(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    if (s === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(s), e.exit("blockQuoteMarker"), o;
    }
    return t(s);
  }
  function o(s) {
    return $e(s) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(s), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(s));
  }
}
function Iw(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return $e(s) ? Le(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : o(s);
  }
  function o(s) {
    return e.attempt(Al, n, t)(s);
  }
}
function Aw(e) {
  e.exit("blockQuote");
}
const Ml = {
  name: "characterEscape",
  tokenize: Mw
};
function Mw(e, n, t) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return _w(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(o);
  }
}
const Ll = {
  name: "characterReference",
  tokenize: Lw
};
function Lw(e, n, t) {
  const r = this;
  let i = 0, o, s;
  return a;
  function a(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), c;
  }
  function c(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), o = 31, s = pt, u(d));
  }
  function l(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, s = gw, u) : (e.enter("characterReferenceValue"), o = 7, s = yo, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const h = e.exit("characterReferenceValue");
      return s === pt && !Ko(r.sliceSerialize(h)) ? t(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return s(d) && i++ < o ? (e.consume(d), u) : t(d);
  }
}
const ua = {
  partial: !0,
  tokenize: Tw
}, da = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Rw
};
function Rw(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: v
  };
  let o = 0, s = 0, a;
  return c;
  function c(w) {
    return l(w);
  }
  function l(w) {
    const $ = r.events[r.events.length - 1];
    return o = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(w);
  }
  function u(w) {
    return w === a ? (s++, e.consume(w), u) : s < 3 ? t(w) : (e.exit("codeFencedFenceSequence"), $e(w) ? Le(e, d, "whitespace")(w) : d(w));
  }
  function d(w) {
    return w === null || de(w) ? (e.exit("codeFencedFence"), r.interrupt ? n(w) : e.check(ua, y, S)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), h(w));
  }
  function h(w) {
    return w === null || de(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(w)) : $e(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Le(e, f, "whitespace")(w)) : w === 96 && w === a ? t(w) : (e.consume(w), h);
  }
  function f(w) {
    return w === null || de(w) ? d(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), m(w));
  }
  function m(w) {
    return w === null || de(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(w)) : w === 96 && w === a ? t(w) : (e.consume(w), m);
  }
  function y(w) {
    return e.attempt(i, S, _)(w);
  }
  function _(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), b;
  }
  function b(w) {
    return o > 0 && $e(w) ? Le(e, k, "linePrefix", o + 1)(w) : k(w);
  }
  function k(w) {
    return w === null || de(w) ? e.check(ua, y, S)(w) : (e.enter("codeFlowValue"), g(w));
  }
  function g(w) {
    return w === null || de(w) ? (e.exit("codeFlowValue"), k(w)) : (e.consume(w), g);
  }
  function S(w) {
    return e.exit("codeFenced"), n(w);
  }
  function v(w, $, A) {
    let D = 0;
    return N;
    function N(I) {
      return w.enter("lineEnding"), w.consume(I), w.exit("lineEnding"), T;
    }
    function T(I) {
      return w.enter("codeFencedFence"), $e(I) ? Le(w, L, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(I) : L(I);
    }
    function L(I) {
      return I === a ? (w.enter("codeFencedFenceSequence"), j(I)) : A(I);
    }
    function j(I) {
      return I === a ? (D++, w.consume(I), j) : D >= s ? (w.exit("codeFencedFenceSequence"), $e(I) ? Le(w, F, "whitespace")(I) : F(I)) : A(I);
    }
    function F(I) {
      return I === null || de(I) ? (w.exit("codeFencedFence"), $(I)) : A(I);
    }
  }
}
function Tw(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return s === null ? t(s) : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), o);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? t(s) : n(s);
  }
}
const Gi = {
  name: "codeIndented",
  tokenize: Pw
}, Dw = {
  partial: !0,
  tokenize: Ow
};
function Pw(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("codeIndented"), Le(e, o, "linePrefix", 5)(l);
  }
  function o(l) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? s(l) : t(l);
  }
  function s(l) {
    return l === null ? c(l) : de(l) ? e.attempt(Dw, s, c)(l) : (e.enter("codeFlowValue"), a(l));
  }
  function a(l) {
    return l === null || de(l) ? (e.exit("codeFlowValue"), s(l)) : (e.consume(l), a);
  }
  function c(l) {
    return e.exit("codeIndented"), n(l);
  }
}
function Ow(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? t(s) : de(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i) : Le(e, o, "linePrefix", 5)(s);
  }
  function o(s) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(s) : de(s) ? i(s) : t(s);
  }
}
const zw = {
  name: "codeText",
  previous: Fw,
  resolve: Bw,
  tokenize: jw
};
function Bw(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Fw(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function jw(e, n, t) {
  let r = 0, i, o;
  return s;
  function s(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(d);
  }
  function a(d) {
    return d === 96 ? (e.consume(d), r++, a) : (e.exit("codeTextSequence"), c(d));
  }
  function c(d) {
    return d === null ? t(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), c) : d === 96 ? (o = e.enter("codeTextSequence"), i = 0, u(d)) : de(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(d));
  }
  function l(d) {
    return d === null || d === 32 || d === 96 || de(d) ? (e.exit("codeTextData"), c(d)) : (e.consume(d), l);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(d)) : (o.type = "codeTextData", l(d));
  }
}
class Hw {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && xr(this.left, r), o.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), xr(this.left, n);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(n) {
    this.setCursor(0), xr(this.right, n.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        xr(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        xr(this.left, t.reverse());
      }
  }
}
function xr(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function Rl(e) {
  const n = {};
  let t = -1, r, i, o, s, a, c, l;
  const u = new Hw(e);
  for (; ++t < u.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = u.get(t), t && r[1].type === "chunkFlow" && u.get(t - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, o = 0, o < c.length && c[o][1].type === "lineEndingBlank" && (o += 2), o < c.length && c[o][1].type === "content"))
      for (; ++o < c.length && c[o][1].type !== "content"; )
        c[o][1].type === "chunkText" && (c[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, qw(u, t)), t = n[t], l = !0);
    else if (r[1]._container) {
      for (o = t, i = void 0; o--; )
        if (s = u.get(o), s[1].type === "lineEnding" || s[1].type === "lineEndingBlank")
          s[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), s[1].type = "lineEnding", i = o);
        else if (!(s[1].type === "linePrefix" || s[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, a = u.slice(i, t), a.unshift(r), u.splice(i, t - i + 1, a));
    }
  }
  return Ot(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !l;
}
function qw(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const o = [];
  let s = t._tokenizer;
  s || (s = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const a = s.events, c = [], l = {};
  let u, d, h = -1, f = t, m = 0, y = 0;
  const _ = [y];
  for (; f; ) {
    for (; e.get(++i)[1] !== f; )
      ;
    o.push(i), f._tokenizer || (u = r.sliceStream(f), f.next || u.push(null), d && s.defineSkip(f.start), f._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(u), f._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), d = f, f = f.next;
  }
  for (f = t; ++h < a.length; )
    // Find a void token that includes a break.
    a[h][0] === "exit" && a[h - 1][0] === "enter" && a[h][1].type === a[h - 1][1].type && a[h][1].start.line !== a[h][1].end.line && (y = h + 1, _.push(y), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (s.events = [], f ? (f._tokenizer = void 0, f.previous = void 0) : _.pop(), h = _.length; h--; ) {
    const b = a.slice(_[h], _[h + 1]), k = o.pop();
    c.push([k, k + b.length - 1]), e.splice(k, 2, b);
  }
  for (c.reverse(), h = -1; ++h < c.length; )
    l[m + c[h][0]] = m + c[h][1], m += c[h][1] - c[h][0] - 1;
  return l;
}
const Uw = {
  resolve: Gw,
  tokenize: Vw
}, Ww = {
  partial: !0,
  tokenize: Xw
};
function Gw(e) {
  return Rl(e), e;
}
function Vw(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : de(a) ? e.check(Ww, s, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function s(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function Xw(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), Le(e, o, "linePrefix");
  }
  function o(s) {
    if (s === null || de(s))
      return t(s);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(s) : e.interrupt(r.parser.constructs.flow, t, n)(s);
  }
}
function Tl(e, n, t, r, i, o, s, a, c) {
  const l = c || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(b), e.exit(o), h) : b === null || b === 32 || b === 41 || di(b) ? t(b) : (e.enter(r), e.enter(s), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), y(b));
  }
  function h(b) {
    return b === 62 ? (e.enter(o), e.consume(b), e.exit(o), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), f(b));
  }
  function f(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), h(b)) : b === null || b === 60 || de(b) ? t(b) : (e.consume(b), b === 92 ? m : f);
  }
  function m(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), f) : f(b);
  }
  function y(b) {
    return !u && (b === null || b === 41 || Be(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(s), e.exit(r), n(b)) : u < l && b === 40 ? (e.consume(b), u++, y) : b === 41 ? (e.consume(b), u--, y) : b === null || b === 32 || b === 40 || di(b) ? t(b) : (e.consume(b), b === 92 ? _ : y);
  }
  function _(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), y) : y(b);
  }
}
function Dl(e, n, t, r, i, o) {
  const s = this;
  let a = 0, c;
  return l;
  function l(f) {
    return e.enter(r), e.enter(i), e.consume(f), e.exit(i), e.enter(o), u;
  }
  function u(f) {
    return a > 999 || f === null || f === 91 || f === 93 && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    f === 94 && !a && "_hiddenFootnoteSupport" in s.parser.constructs ? t(f) : f === 93 ? (e.exit(o), e.enter(i), e.consume(f), e.exit(i), e.exit(r), n) : de(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(f));
  }
  function d(f) {
    return f === null || f === 91 || f === 93 || de(f) || a++ > 999 ? (e.exit("chunkString"), u(f)) : (e.consume(f), c || (c = !$e(f)), f === 92 ? h : d);
  }
  function h(f) {
    return f === 91 || f === 92 || f === 93 ? (e.consume(f), a++, d) : d(f);
  }
}
function Pl(e, n, t, r, i, o) {
  let s;
  return a;
  function a(h) {
    return h === 34 || h === 39 || h === 40 ? (e.enter(r), e.enter(i), e.consume(h), e.exit(i), s = h === 40 ? 41 : h, c) : t(h);
  }
  function c(h) {
    return h === s ? (e.enter(i), e.consume(h), e.exit(i), e.exit(r), n) : (e.enter(o), l(h));
  }
  function l(h) {
    return h === s ? (e.exit(o), c(s)) : h === null ? t(h) : de(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), Le(e, l, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(h));
  }
  function u(h) {
    return h === s || h === null || de(h) ? (e.exit("chunkString"), l(h)) : (e.consume(h), h === 92 ? d : u);
  }
  function d(h) {
    return h === s || h === 92 ? (e.consume(h), u) : u(h);
  }
}
function $r(e, n) {
  let t;
  return r;
  function r(i) {
    return de(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : $e(i) ? Le(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const Kw = {
  name: "definition",
  tokenize: Zw
}, Yw = {
  partial: !0,
  tokenize: Qw
};
function Zw(e, n, t) {
  const r = this;
  let i;
  return o;
  function o(f) {
    return e.enter("definition"), s(f);
  }
  function s(f) {
    return Dl.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(f);
  }
  function a(f) {
    return i = Zt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), f === 58 ? (e.enter("definitionMarker"), e.consume(f), e.exit("definitionMarker"), c) : t(f);
  }
  function c(f) {
    return Be(f) ? $r(e, l)(f) : l(f);
  }
  function l(f) {
    return Tl(
      e,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(f);
  }
  function u(f) {
    return e.attempt(Yw, d, d)(f);
  }
  function d(f) {
    return $e(f) ? Le(e, h, "whitespace")(f) : h(f);
  }
  function h(f) {
    return f === null || de(f) ? (e.exit("definition"), r.parser.defined.push(i), n(f)) : t(f);
  }
}
function Qw(e, n, t) {
  return r;
  function r(a) {
    return Be(a) ? $r(e, i)(a) : t(a);
  }
  function i(a) {
    return Pl(e, o, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return $e(a) ? Le(e, s, "whitespace")(a) : s(a);
  }
  function s(a) {
    return a === null || de(a) ? n(a) : t(a);
  }
}
const Jw = {
  name: "hardBreakEscape",
  tokenize: ex
};
function ex(e, n, t) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), i;
  }
  function i(o) {
    return de(o) ? (e.exit("hardBreakEscape"), n(o)) : t(o);
  }
}
const tx = {
  name: "headingAtx",
  resolve: nx,
  tokenize: rx
};
function nx(e, n) {
  let t = e.length - 2, r = 3, i, o;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, Ot(e, r, t - r + 1, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["exit", i, n]])), e;
}
function rx(e, n, t) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), o(u);
  }
  function o(u) {
    return e.enter("atxHeadingSequence"), s(u);
  }
  function s(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), s) : u === null || Be(u) ? (e.exit("atxHeadingSequence"), a(u)) : t(u);
  }
  function a(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), c(u)) : u === null || de(u) ? (e.exit("atxHeading"), n(u)) : $e(u) ? Le(e, a, "whitespace")(u) : (e.enter("atxHeadingText"), l(u));
  }
  function c(u) {
    return u === 35 ? (e.consume(u), c) : (e.exit("atxHeadingSequence"), a(u));
  }
  function l(u) {
    return u === null || u === 35 || Be(u) ? (e.exit("atxHeadingText"), a(u)) : (e.consume(u), l);
  }
}
const ix = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], fa = ["pre", "script", "style", "textarea"], ox = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: lx,
  tokenize: cx
}, sx = {
  partial: !0,
  tokenize: dx
}, ax = {
  partial: !0,
  tokenize: ux
};
function lx(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function cx(e, n, t) {
  const r = this;
  let i, o, s, a, c;
  return l;
  function l(E) {
    return u(E);
  }
  function u(E) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(E), d;
  }
  function d(E) {
    return E === 33 ? (e.consume(E), h) : E === 47 ? (e.consume(E), o = !0, y) : E === 63 ? (e.consume(E), i = 3, r.interrupt ? n : x) : yt(E) ? (e.consume(E), s = String.fromCharCode(E), _) : t(E);
  }
  function h(E) {
    return E === 45 ? (e.consume(E), i = 2, f) : E === 91 ? (e.consume(E), i = 5, a = 0, m) : yt(E) ? (e.consume(E), i = 4, r.interrupt ? n : x) : t(E);
  }
  function f(E) {
    return E === 45 ? (e.consume(E), r.interrupt ? n : x) : t(E);
  }
  function m(E) {
    const be = "CDATA[";
    return E === be.charCodeAt(a++) ? (e.consume(E), a === be.length ? r.interrupt ? n : L : m) : t(E);
  }
  function y(E) {
    return yt(E) ? (e.consume(E), s = String.fromCharCode(E), _) : t(E);
  }
  function _(E) {
    if (E === null || E === 47 || E === 62 || Be(E)) {
      const be = E === 47, fe = s.toLowerCase();
      return !be && !o && fa.includes(fe) ? (i = 1, r.interrupt ? n(E) : L(E)) : ix.includes(s.toLowerCase()) ? (i = 6, be ? (e.consume(E), b) : r.interrupt ? n(E) : L(E)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(E) : o ? k(E) : g(E));
    }
    return E === 45 || pt(E) ? (e.consume(E), s += String.fromCharCode(E), _) : t(E);
  }
  function b(E) {
    return E === 62 ? (e.consume(E), r.interrupt ? n : L) : t(E);
  }
  function k(E) {
    return $e(E) ? (e.consume(E), k) : N(E);
  }
  function g(E) {
    return E === 47 ? (e.consume(E), N) : E === 58 || E === 95 || yt(E) ? (e.consume(E), S) : $e(E) ? (e.consume(E), g) : N(E);
  }
  function S(E) {
    return E === 45 || E === 46 || E === 58 || E === 95 || pt(E) ? (e.consume(E), S) : v(E);
  }
  function v(E) {
    return E === 61 ? (e.consume(E), w) : $e(E) ? (e.consume(E), v) : g(E);
  }
  function w(E) {
    return E === null || E === 60 || E === 61 || E === 62 || E === 96 ? t(E) : E === 34 || E === 39 ? (e.consume(E), c = E, $) : $e(E) ? (e.consume(E), w) : A(E);
  }
  function $(E) {
    return E === c ? (e.consume(E), c = null, D) : E === null || de(E) ? t(E) : (e.consume(E), $);
  }
  function A(E) {
    return E === null || E === 34 || E === 39 || E === 47 || E === 60 || E === 61 || E === 62 || E === 96 || Be(E) ? v(E) : (e.consume(E), A);
  }
  function D(E) {
    return E === 47 || E === 62 || $e(E) ? g(E) : t(E);
  }
  function N(E) {
    return E === 62 ? (e.consume(E), T) : t(E);
  }
  function T(E) {
    return E === null || de(E) ? L(E) : $e(E) ? (e.consume(E), T) : t(E);
  }
  function L(E) {
    return E === 45 && i === 2 ? (e.consume(E), P) : E === 60 && i === 1 ? (e.consume(E), H) : E === 62 && i === 4 ? (e.consume(E), X) : E === 63 && i === 3 ? (e.consume(E), x) : E === 93 && i === 5 ? (e.consume(E), O) : de(E) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(sx, ce, j)(E)) : E === null || de(E) ? (e.exit("htmlFlowData"), j(E)) : (e.consume(E), L);
  }
  function j(E) {
    return e.check(ax, F, ce)(E);
  }
  function F(E) {
    return e.enter("lineEnding"), e.consume(E), e.exit("lineEnding"), I;
  }
  function I(E) {
    return E === null || de(E) ? j(E) : (e.enter("htmlFlowData"), L(E));
  }
  function P(E) {
    return E === 45 ? (e.consume(E), x) : L(E);
  }
  function H(E) {
    return E === 47 ? (e.consume(E), s = "", B) : L(E);
  }
  function B(E) {
    if (E === 62) {
      const be = s.toLowerCase();
      return fa.includes(be) ? (e.consume(E), X) : L(E);
    }
    return yt(E) && s.length < 8 ? (e.consume(E), s += String.fromCharCode(E), B) : L(E);
  }
  function O(E) {
    return E === 93 ? (e.consume(E), x) : L(E);
  }
  function x(E) {
    return E === 62 ? (e.consume(E), X) : E === 45 && i === 2 ? (e.consume(E), x) : L(E);
  }
  function X(E) {
    return E === null || de(E) ? (e.exit("htmlFlowData"), ce(E)) : (e.consume(E), X);
  }
  function ce(E) {
    return e.exit("htmlFlow"), n(E);
  }
}
function ux(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return de(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), o) : t(s);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? t(s) : n(s);
  }
}
function dx(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Dr, n, t);
  }
}
const fx = {
  name: "htmlText",
  tokenize: px
};
function px(e, n, t) {
  const r = this;
  let i, o, s;
  return a;
  function a(x) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(x), c;
  }
  function c(x) {
    return x === 33 ? (e.consume(x), l) : x === 47 ? (e.consume(x), v) : x === 63 ? (e.consume(x), g) : yt(x) ? (e.consume(x), A) : t(x);
  }
  function l(x) {
    return x === 45 ? (e.consume(x), u) : x === 91 ? (e.consume(x), o = 0, m) : yt(x) ? (e.consume(x), k) : t(x);
  }
  function u(x) {
    return x === 45 ? (e.consume(x), f) : t(x);
  }
  function d(x) {
    return x === null ? t(x) : x === 45 ? (e.consume(x), h) : de(x) ? (s = d, H(x)) : (e.consume(x), d);
  }
  function h(x) {
    return x === 45 ? (e.consume(x), f) : d(x);
  }
  function f(x) {
    return x === 62 ? P(x) : x === 45 ? h(x) : d(x);
  }
  function m(x) {
    const X = "CDATA[";
    return x === X.charCodeAt(o++) ? (e.consume(x), o === X.length ? y : m) : t(x);
  }
  function y(x) {
    return x === null ? t(x) : x === 93 ? (e.consume(x), _) : de(x) ? (s = y, H(x)) : (e.consume(x), y);
  }
  function _(x) {
    return x === 93 ? (e.consume(x), b) : y(x);
  }
  function b(x) {
    return x === 62 ? P(x) : x === 93 ? (e.consume(x), b) : y(x);
  }
  function k(x) {
    return x === null || x === 62 ? P(x) : de(x) ? (s = k, H(x)) : (e.consume(x), k);
  }
  function g(x) {
    return x === null ? t(x) : x === 63 ? (e.consume(x), S) : de(x) ? (s = g, H(x)) : (e.consume(x), g);
  }
  function S(x) {
    return x === 62 ? P(x) : g(x);
  }
  function v(x) {
    return yt(x) ? (e.consume(x), w) : t(x);
  }
  function w(x) {
    return x === 45 || pt(x) ? (e.consume(x), w) : $(x);
  }
  function $(x) {
    return de(x) ? (s = $, H(x)) : $e(x) ? (e.consume(x), $) : P(x);
  }
  function A(x) {
    return x === 45 || pt(x) ? (e.consume(x), A) : x === 47 || x === 62 || Be(x) ? D(x) : t(x);
  }
  function D(x) {
    return x === 47 ? (e.consume(x), P) : x === 58 || x === 95 || yt(x) ? (e.consume(x), N) : de(x) ? (s = D, H(x)) : $e(x) ? (e.consume(x), D) : P(x);
  }
  function N(x) {
    return x === 45 || x === 46 || x === 58 || x === 95 || pt(x) ? (e.consume(x), N) : T(x);
  }
  function T(x) {
    return x === 61 ? (e.consume(x), L) : de(x) ? (s = T, H(x)) : $e(x) ? (e.consume(x), T) : D(x);
  }
  function L(x) {
    return x === null || x === 60 || x === 61 || x === 62 || x === 96 ? t(x) : x === 34 || x === 39 ? (e.consume(x), i = x, j) : de(x) ? (s = L, H(x)) : $e(x) ? (e.consume(x), L) : (e.consume(x), F);
  }
  function j(x) {
    return x === i ? (e.consume(x), i = void 0, I) : x === null ? t(x) : de(x) ? (s = j, H(x)) : (e.consume(x), j);
  }
  function F(x) {
    return x === null || x === 34 || x === 39 || x === 60 || x === 61 || x === 96 ? t(x) : x === 47 || x === 62 || Be(x) ? D(x) : (e.consume(x), F);
  }
  function I(x) {
    return x === 47 || x === 62 || Be(x) ? D(x) : t(x);
  }
  function P(x) {
    return x === 62 ? (e.consume(x), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(x);
  }
  function H(x) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), B;
  }
  function B(x) {
    return $e(x) ? Le(e, O, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(x) : O(x);
  }
  function O(x) {
    return e.enter("htmlTextData"), s(x);
  }
}
const Yo = {
  name: "labelEnd",
  resolveAll: _x,
  resolveTo: bx,
  tokenize: yx
}, hx = {
  tokenize: kx
}, mx = {
  tokenize: wx
}, gx = {
  tokenize: xx
};
function _x(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && Ot(e, 0, e.length, t), e;
}
function bx(e, n) {
  let t = e.length, r = 0, i, o, s, a;
  for (; t--; )
    if (i = e[t][1], o) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (s) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (s = t);
  const c = {
    type: e[o][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, l = {
    type: "label",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[s][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...e[o + r + 2][1].end
    },
    end: {
      ...e[s - 2][1].start
    }
  };
  return a = [["enter", c, n], ["enter", l, n]], a = jt(a, e.slice(o + 1, o + r + 3)), a = jt(a, [["enter", u, n]]), a = jt(a, yi(n.parser.constructs.insideSpan.null, e.slice(o + r + 4, s - 3), n)), a = jt(a, [["exit", u, n], e[s - 2], e[s - 1], ["exit", l, n]]), a = jt(a, e.slice(s + 1)), a = jt(a, [["exit", c, n]]), Ot(e, o, e.length, a), e;
}
function yx(e, n, t) {
  const r = this;
  let i = r.events.length, o, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(h) {
    return o ? o._inactive ? d(h) : (s = r.parser.defined.includes(Zt(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), c) : t(h);
  }
  function c(h) {
    return h === 40 ? e.attempt(hx, u, s ? u : d)(h) : h === 91 ? e.attempt(mx, u, s ? l : d)(h) : s ? u(h) : d(h);
  }
  function l(h) {
    return e.attempt(gx, u, d)(h);
  }
  function u(h) {
    return n(h);
  }
  function d(h) {
    return o._balanced = !0, t(h);
  }
}
function kx(e, n, t) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return Be(d) ? $r(e, o)(d) : o(d);
  }
  function o(d) {
    return d === 41 ? u(d) : Tl(e, s, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function s(d) {
    return Be(d) ? $r(e, c)(d) : u(d);
  }
  function a(d) {
    return t(d);
  }
  function c(d) {
    return d === 34 || d === 39 || d === 40 ? Pl(e, l, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function l(d) {
    return Be(d) ? $r(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), n) : t(d);
  }
}
function wx(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return Dl.call(r, e, o, s, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(Zt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function s(a) {
    return t(a);
  }
}
function xx(e, n, t) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), n) : t(o);
  }
}
const vx = {
  name: "labelStartImage",
  resolveAll: Yo.resolveAll,
  tokenize: Ex
};
function Ex(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), s) : t(a);
  }
  function s(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const Sx = {
  name: "labelStartLink",
  resolveAll: Yo.resolveAll,
  tokenize: Cx
};
function Cx(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(s), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(s) : n(s);
  }
}
const Vi = {
  name: "lineEnding",
  tokenize: Nx
};
function Nx(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), Le(e, n, "linePrefix");
  }
}
const ai = {
  name: "thematicBreak",
  tokenize: $x
};
function $x(e, n, t) {
  let r = 0, i;
  return o;
  function o(l) {
    return e.enter("thematicBreak"), s(l);
  }
  function s(l) {
    return i = l, a(l);
  }
  function a(l) {
    return l === i ? (e.enter("thematicBreakSequence"), c(l)) : r >= 3 && (l === null || de(l)) ? (e.exit("thematicBreak"), n(l)) : t(l);
  }
  function c(l) {
    return l === i ? (e.consume(l), r++, c) : (e.exit("thematicBreakSequence"), $e(l) ? Le(e, a, "whitespace")(l) : a(l));
  }
}
const St = {
  continuation: {
    tokenize: Lx
  },
  exit: Tx,
  name: "list",
  tokenize: Mx
}, Ix = {
  partial: !0,
  tokenize: Dx
}, Ax = {
  partial: !0,
  tokenize: Rx
};
function Mx(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return a;
  function a(f) {
    const m = r.containerState.type || (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (m === "listUnordered" ? !r.containerState.marker || f === r.containerState.marker : yo(f)) {
      if (r.containerState.type || (r.containerState.type = m, e.enter(m, {
        _container: !0
      })), m === "listUnordered")
        return e.enter("listItemPrefix"), f === 42 || f === 45 ? e.check(ai, t, l)(f) : l(f);
      if (!r.interrupt || f === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), c(f);
    }
    return t(f);
  }
  function c(f) {
    return yo(f) && ++s < 10 ? (e.consume(f), c) : (!r.interrupt || s < 2) && (r.containerState.marker ? f === r.containerState.marker : f === 41 || f === 46) ? (e.exit("listItemValue"), l(f)) : t(f);
  }
  function l(f) {
    return e.enter("listItemMarker"), e.consume(f), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || f, e.check(
      Dr,
      // Can’t be empty when interrupting.
      r.interrupt ? t : u,
      e.attempt(Ix, h, d)
    );
  }
  function u(f) {
    return r.containerState.initialBlankLine = !0, o++, h(f);
  }
  function d(f) {
    return $e(f) ? (e.enter("listItemPrefixWhitespace"), e.consume(f), e.exit("listItemPrefixWhitespace"), h) : t(f);
  }
  function h(f) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(f);
  }
}
function Lx(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Dr, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Le(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !$e(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ax, n, s)(a));
  }
  function s(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, Le(e, e.attempt(St, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Rx(e, n, t) {
  const r = this;
  return Le(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? n(o) : t(o);
  }
}
function Tx(e) {
  e.exit(this.containerState.type);
}
function Dx(e, n, t) {
  const r = this;
  return Le(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return !$e(o) && s && s[1].type === "listItemPrefixWhitespace" ? n(o) : t(o);
  }
}
const pa = {
  name: "setextUnderline",
  resolveTo: Px,
  tokenize: Ox
};
function Px(e, n) {
  let t = e.length, r, i, o;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !o && e[t][1].type === "definition" && (o = t);
  const s = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", o ? (e.splice(i, 0, ["enter", s, n]), e.splice(o + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[o][1].end
  }) : e[r][1] = s, e.push(["exit", s, n]), e;
}
function Ox(e, n, t) {
  const r = this;
  let i;
  return o;
  function o(l) {
    let u = r.events.length, d;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        d = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = l, s(l)) : t(l);
  }
  function s(l) {
    return e.enter("setextHeadingLineSequence"), a(l);
  }
  function a(l) {
    return l === i ? (e.consume(l), a) : (e.exit("setextHeadingLineSequence"), $e(l) ? Le(e, c, "lineSuffix")(l) : c(l));
  }
  function c(l) {
    return l === null || de(l) ? (e.exit("setextHeadingLine"), n(l)) : t(l);
  }
}
const zx = {
  tokenize: Bx
};
function Bx(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Dr,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, Le(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Uw, i)), "linePrefix"))
  );
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const Fx = {
  resolveAll: zl()
}, jx = Ol("string"), Hx = Ol("text");
function Ol(e) {
  return {
    resolveAll: zl(e === "text" ? qx : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], o = t.attempt(i, s, a);
    return s;
    function s(u) {
      return l(u) ? o(u) : a(u);
    }
    function a(u) {
      if (u === null) {
        t.consume(u);
        return;
      }
      return t.enter("data"), t.consume(u), c;
    }
    function c(u) {
      return l(u) ? (t.exit("data"), o(u)) : (t.consume(u), c);
    }
    function l(u) {
      if (u === null)
        return !0;
      const d = i[u];
      let h = -1;
      if (d)
        for (; ++h < d.length; ) {
          const f = d[h];
          if (!f.previous || f.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function zl(e) {
  return n;
  function n(t, r) {
    let i = -1, o;
    for (; ++i <= t.length; )
      o === void 0 ? t[i] && t[i][1].type === "data" && (o = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== o + 2 && (t[o][1].end = t[i - 1][1].end, t.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(t, r) : t;
  }
}
function qx(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let o = i.length, s = -1, a = 0, c;
      for (; o--; ) {
        const l = i[o];
        if (typeof l == "string") {
          for (s = l.length; l.charCodeAt(s - 1) === 32; )
            a++, s--;
          if (s) break;
          s = -1;
        } else if (l === -2)
          c = !0, a++;
        else if (l !== -1) {
          o++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (a = 0), a) {
        const l = {
          type: t === e.length || c || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: o ? s : r.start._bufferIndex + s,
            _index: r.start._index + o,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...l.start
        }, r.start.offset === r.end.offset ? Object.assign(r, l) : (e.splice(t, 0, ["enter", l, n], ["exit", l, n]), t += 2);
      }
      t++;
    }
  return e;
}
const Ux = {
  42: St,
  43: St,
  45: St,
  48: St,
  49: St,
  50: St,
  51: St,
  52: St,
  53: St,
  54: St,
  55: St,
  56: St,
  57: St,
  62: Al
}, Wx = {
  91: Kw
}, Gx = {
  [-2]: Gi,
  [-1]: Gi,
  32: Gi
}, Vx = {
  35: tx,
  42: ai,
  45: [pa, ai],
  60: ox,
  61: pa,
  95: ai,
  96: da,
  126: da
}, Xx = {
  38: Ll,
  92: Ml
}, Kx = {
  [-5]: Vi,
  [-4]: Vi,
  [-3]: Vi,
  33: vx,
  38: Ll,
  42: ko,
  60: [Sw, fx],
  91: Sx,
  92: [Jw, Ml],
  93: Yo,
  95: ko,
  96: zw
}, Yx = {
  null: [ko, Fx]
}, Zx = {
  null: [42, 95]
}, Qx = {
  null: []
}, Jx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Zx,
  contentInitial: Wx,
  disable: Qx,
  document: Ux,
  flow: Vx,
  flowInitial: Gx,
  insideSpan: Yx,
  string: Xx,
  text: Kx
}, Symbol.toStringTag, { value: "Module" }));
function ev(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, o = [];
  let s = [], a = [];
  const c = {
    attempt: $(v),
    check: $(w),
    consume: k,
    enter: g,
    exit: S,
    interrupt: $(w, {
      interrupt: !0
    })
  }, l = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: m,
    parser: e,
    previous: null,
    sliceSerialize: h,
    sliceStream: f,
    write: d
  };
  let u = n.tokenize.call(l, c);
  return n.resolveAll && o.push(n), l;
  function d(T) {
    return s = jt(s, T), _(), s[s.length - 1] !== null ? [] : (A(n, 0), l.events = yi(o, l.events, l), l.events);
  }
  function h(T, L) {
    return nv(f(T), L);
  }
  function f(T) {
    return tv(s, T);
  }
  function m() {
    const {
      _bufferIndex: T,
      _index: L,
      line: j,
      column: F,
      offset: I
    } = r;
    return {
      _bufferIndex: T,
      _index: L,
      line: j,
      column: F,
      offset: I
    };
  }
  function y(T) {
    i[T.line] = T.column, N();
  }
  function _() {
    let T;
    for (; r._index < s.length; ) {
      const L = s[r._index];
      if (typeof L == "string")
        for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < L.length; )
          b(L.charCodeAt(r._bufferIndex));
      else
        b(L);
    }
  }
  function b(T) {
    u = u(T);
  }
  function k(T) {
    de(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, N()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = T;
  }
  function g(T, L) {
    const j = L || {};
    return j.type = T, j.start = m(), l.events.push(["enter", j, l]), a.push(j), j;
  }
  function S(T) {
    const L = a.pop();
    return L.end = m(), l.events.push(["exit", L, l]), L;
  }
  function v(T, L) {
    A(T, L.from);
  }
  function w(T, L) {
    L.restore();
  }
  function $(T, L) {
    return j;
    function j(F, I, P) {
      let H, B, O, x;
      return Array.isArray(F) ? (
        /* c8 ignore next 1 */
        ce(F)
      ) : "tokenize" in F ? (
        // Looks like a construct.
        ce([
          /** @type {Construct} */
          F
        ])
      ) : X(F);
      function X(De) {
        return Je;
        function Je(Xe) {
          const Re = Xe !== null && De[Xe], Ge = Xe !== null && De.null, wt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Re) ? Re : Re ? [Re] : [],
            ...Array.isArray(Ge) ? Ge : Ge ? [Ge] : []
          ];
          return ce(wt)(Xe);
        }
      }
      function ce(De) {
        return H = De, B = 0, De.length === 0 ? P : E(De[B]);
      }
      function E(De) {
        return Je;
        function Je(Xe) {
          return x = D(), O = De, De.partial || (l.currentConstruct = De), De.name && l.parser.constructs.disable.null.includes(De.name) ? fe() : De.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(l), L) : l,
            c,
            be,
            fe
          )(Xe);
        }
      }
      function be(De) {
        return T(O, x), I;
      }
      function fe(De) {
        return x.restore(), ++B < H.length ? E(H[B]) : P;
      }
    }
  }
  function A(T, L) {
    T.resolveAll && !o.includes(T) && o.push(T), T.resolve && Ot(l.events, L, l.events.length - L, T.resolve(l.events.slice(L), l)), T.resolveTo && (l.events = T.resolveTo(l.events, l));
  }
  function D() {
    const T = m(), L = l.previous, j = l.currentConstruct, F = l.events.length, I = Array.from(a);
    return {
      from: F,
      restore: P
    };
    function P() {
      r = T, l.previous = L, l.currentConstruct = j, l.events.length = F, a = I, N();
    }
  }
  function N() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function tv(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, o = n.end._bufferIndex;
  let s;
  if (t === i)
    s = [e[t].slice(r, o)];
  else {
    if (s = e.slice(t, i), r > -1) {
      const a = s[0];
      typeof a == "string" ? s[0] = a.slice(r) : s.shift();
    }
    o > 0 && s.push(e[i].slice(0, o));
  }
  return s;
}
function nv(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const o = e[t];
    let s;
    if (typeof o == "string")
      s = o;
    else switch (o) {
      case -5: {
        s = "\r";
        break;
      }
      case -4: {
        s = `
`;
        break;
      }
      case -3: {
        s = `\r
`;
        break;
      }
      case -2: {
        s = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        s = " ";
        break;
      }
      default:
        s = String.fromCharCode(o);
    }
    i = o === -2, r.push(s);
  }
  return r.join("");
}
function rv(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      $l([Jx, ...(e || {}).extensions || []])
    ),
    content: i(bw),
    defined: [],
    document: i(kw),
    flow: i(zx),
    lazy: {},
    string: i(jx),
    text: i(Hx)
  };
  return r;
  function i(o) {
    return s;
    function s(a) {
      return ev(r, o, a);
    }
  }
}
function iv(e) {
  for (; !Rl(e); )
    ;
  return e;
}
const ha = /[\0\t\n\r]/g;
function ov() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(o, s, a) {
    const c = [];
    let l, u, d, h, f;
    for (o = n + (typeof o == "string" ? o.toString() : new TextDecoder(s || void 0).decode(o)), d = 0, n = "", t && (o.charCodeAt(0) === 65279 && d++, t = void 0); d < o.length; ) {
      if (ha.lastIndex = d, l = ha.exec(o), h = l && l.index !== void 0 ? l.index : o.length, f = o.charCodeAt(h), !l) {
        n = o.slice(d);
        break;
      }
      if (f === 10 && d === h && r)
        c.push(-3), r = void 0;
      else
        switch (r && (c.push(-5), r = void 0), d < h && (c.push(o.slice(d, h)), e += h - d), f) {
          case 0: {
            c.push(65533), e++;
            break;
          }
          case 9: {
            for (u = Math.ceil(e / 4) * 4, c.push(-2); e++ < u; ) c.push(-1);
            break;
          }
          case 10: {
            c.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      d = h + 1;
    }
    return a && (r && c.push(-5), n && c.push(n), c.push(null)), c;
  }
}
const sv = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function av(e) {
  return e.replace(sv, lv);
}
function lv(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), o = i === 120 || i === 88;
    return Il(t.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return Ko(t) || e;
}
const Bl = {}.hasOwnProperty;
function cv(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), uv(t)(iv(rv(t).document().write(ov()(e, n, !0))));
}
function uv(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(Te),
      autolinkProtocol: D,
      autolinkEmail: D,
      atxHeading: o(ne),
      blockQuote: o(Ge),
      characterEscape: D,
      characterReference: D,
      codeFenced: o(wt),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: o(wt, s),
      codeText: o(se, s),
      codeTextData: D,
      data: D,
      codeFlowValue: D,
      definition: o(Ee),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: o(te),
      hardBreakEscape: o(G),
      hardBreakTrailing: o(G),
      htmlFlow: o(me, s),
      htmlFlowData: D,
      htmlText: o(me, s),
      htmlTextData: D,
      image: o(he),
      label: s,
      link: o(Te),
      listItem: o(_e),
      listItemValue: h,
      listOrdered: o(Ie, d),
      listUnordered: o(Ie),
      paragraph: o(Me),
      reference: E,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: o(ne),
      strong: o(Fe),
      thematicBreak: o(Q)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: v,
      autolink: c(),
      autolinkEmail: Re,
      autolinkProtocol: Xe,
      blockQuote: c(),
      characterEscapeValue: N,
      characterReferenceMarkerHexadecimal: fe,
      characterReferenceMarkerNumeric: fe,
      characterReferenceValue: De,
      characterReference: Je,
      codeFenced: c(_),
      codeFencedFence: y,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: m,
      codeFlowValue: N,
      codeIndented: c(b),
      codeText: c(I),
      codeTextData: N,
      data: N,
      definition: c(),
      definitionDestinationString: S,
      definitionLabelString: k,
      definitionTitleString: g,
      emphasis: c(),
      hardBreakEscape: c(L),
      hardBreakTrailing: c(L),
      htmlFlow: c(j),
      htmlFlowData: N,
      htmlText: c(F),
      htmlTextData: N,
      image: c(H),
      label: O,
      labelText: B,
      lineEnding: T,
      link: c(P),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: be,
      resourceDestinationString: x,
      resourceTitleString: X,
      resource: ce,
      setextHeading: c(A),
      setextHeadingLineSequence: $,
      setextHeadingText: w,
      strong: c(),
      thematicBreak: c()
    }
  };
  Fl(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(R) {
    let q = {
      type: "root",
      children: []
    };
    const re = {
      stack: [q],
      tokenStack: [],
      config: n,
      enter: a,
      exit: l,
      buffer: s,
      resume: u,
      data: t
    }, ie = [];
    let Ne = -1;
    for (; ++Ne < R.length; )
      if (R[Ne][1].type === "listOrdered" || R[Ne][1].type === "listUnordered")
        if (R[Ne][0] === "enter")
          ie.push(Ne);
        else {
          const at = ie.pop();
          Ne = i(R, at, Ne);
        }
    for (Ne = -1; ++Ne < R.length; ) {
      const at = n[R[Ne][0]];
      Bl.call(at, R[Ne][1].type) && at[R[Ne][1].type].call(Object.assign({
        sliceSerialize: R[Ne][2].sliceSerialize
      }, re), R[Ne][1]);
    }
    if (re.tokenStack.length > 0) {
      const at = re.tokenStack[re.tokenStack.length - 1];
      (at[1] || ma).call(re, void 0, at[0]);
    }
    for (q.position = {
      start: Cn(R.length > 0 ? R[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Cn(R.length > 0 ? R[R.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Ne = -1; ++Ne < n.transforms.length; )
      q = n.transforms[Ne](q) || q;
    return q;
  }
  function i(R, q, re) {
    let ie = q - 1, Ne = -1, at = !1, qt, ot, Qt, un;
    for (; ++ie <= re; ) {
      const lt = R[ie];
      switch (lt[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          lt[0] === "enter" ? Ne++ : Ne--, un = void 0;
          break;
        }
        case "lineEndingBlank": {
          lt[0] === "enter" && (qt && !un && !Ne && !Qt && (Qt = ie), un = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          un = void 0;
      }
      if (!Ne && lt[0] === "enter" && lt[1].type === "listItemPrefix" || Ne === -1 && lt[0] === "exit" && (lt[1].type === "listUnordered" || lt[1].type === "listOrdered")) {
        if (qt) {
          let mt = ie;
          for (ot = void 0; mt--; ) {
            const gt = R[mt];
            if (gt[1].type === "lineEnding" || gt[1].type === "lineEndingBlank") {
              if (gt[0] === "exit") continue;
              ot && (R[ot][1].type = "lineEndingBlank", at = !0), gt[1].type = "lineEnding", ot = mt;
            } else if (!(gt[1].type === "linePrefix" || gt[1].type === "blockQuotePrefix" || gt[1].type === "blockQuotePrefixWhitespace" || gt[1].type === "blockQuoteMarker" || gt[1].type === "listItemIndent")) break;
          }
          Qt && (!ot || Qt < ot) && (qt._spread = !0), qt.end = Object.assign({}, ot ? R[ot][1].start : lt[1].end), R.splice(ot || ie, 0, ["exit", qt, lt[2]]), ie++, re++;
        }
        if (lt[1].type === "listItemPrefix") {
          const mt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, lt[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          qt = mt, R.splice(ie, 0, ["enter", mt, lt[2]]), ie++, re++, Qt = void 0, un = !0;
        }
      }
    }
    return R[q][1]._spread = at, re;
  }
  function o(R, q) {
    return re;
    function re(ie) {
      a.call(this, R(ie), ie), q && q.call(this, ie);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(R, q, re) {
    this.stack[this.stack.length - 1].children.push(R), this.stack.push(R), this.tokenStack.push([q, re || void 0]), R.position = {
      start: Cn(q.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(R) {
    return q;
    function q(re) {
      R && R.call(this, re), l.call(this, re);
    }
  }
  function l(R, q) {
    const re = this.stack.pop(), ie = this.tokenStack.pop();
    if (ie)
      ie[0].type !== R.type && (q ? q.call(this, R, ie[0]) : (ie[1] || ma).call(this, R, ie[0]));
    else throw new Error("Cannot close `" + R.type + "` (" + Nr({
      start: R.start,
      end: R.end
    }) + "): it’s not open");
    re.position.end = Cn(R.end);
  }
  function u() {
    return Xo(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(R) {
    if (this.data.expectingFirstListItemValue) {
      const q = this.stack[this.stack.length - 2];
      q.start = Number.parseInt(this.sliceSerialize(R), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.lang = R;
  }
  function m() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.meta = R;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function _() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.value = R.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.value = R.replace(/(\r?\n|\r)$/g, "");
  }
  function k(R) {
    const q = this.resume(), re = this.stack[this.stack.length - 1];
    re.label = q, re.identifier = Zt(this.sliceSerialize(R)).toLowerCase();
  }
  function g() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.title = R;
  }
  function S() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.url = R;
  }
  function v(R) {
    const q = this.stack[this.stack.length - 1];
    if (!q.depth) {
      const re = this.sliceSerialize(R).length;
      q.depth = re;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function $(R) {
    const q = this.stack[this.stack.length - 1];
    q.depth = this.sliceSerialize(R).codePointAt(0) === 61 ? 1 : 2;
  }
  function A() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function D(R) {
    const re = this.stack[this.stack.length - 1].children;
    let ie = re[re.length - 1];
    (!ie || ie.type !== "text") && (ie = it(), ie.position = {
      start: Cn(R.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, re.push(ie)), this.stack.push(ie);
  }
  function N(R) {
    const q = this.stack.pop();
    q.value += this.sliceSerialize(R), q.position.end = Cn(R.end);
  }
  function T(R) {
    const q = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const re = q.children[q.children.length - 1];
      re.position.end = Cn(R.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(q.type) && (D.call(this, R), N.call(this, R));
  }
  function L() {
    this.data.atHardBreak = !0;
  }
  function j() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.value = R;
  }
  function F() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.value = R;
  }
  function I() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.value = R;
  }
  function P() {
    const R = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const q = this.data.referenceType || "shortcut";
      R.type += "Reference", R.referenceType = q, delete R.url, delete R.title;
    } else
      delete R.identifier, delete R.label;
    this.data.referenceType = void 0;
  }
  function H() {
    const R = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const q = this.data.referenceType || "shortcut";
      R.type += "Reference", R.referenceType = q, delete R.url, delete R.title;
    } else
      delete R.identifier, delete R.label;
    this.data.referenceType = void 0;
  }
  function B(R) {
    const q = this.sliceSerialize(R), re = this.stack[this.stack.length - 2];
    re.label = av(q), re.identifier = Zt(q).toLowerCase();
  }
  function O() {
    const R = this.stack[this.stack.length - 1], q = this.resume(), re = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, re.type === "link") {
      const ie = R.children;
      re.children = ie;
    } else
      re.alt = q;
  }
  function x() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.url = R;
  }
  function X() {
    const R = this.resume(), q = this.stack[this.stack.length - 1];
    q.title = R;
  }
  function ce() {
    this.data.inReference = void 0;
  }
  function E() {
    this.data.referenceType = "collapsed";
  }
  function be(R) {
    const q = this.resume(), re = this.stack[this.stack.length - 1];
    re.label = q, re.identifier = Zt(this.sliceSerialize(R)).toLowerCase(), this.data.referenceType = "full";
  }
  function fe(R) {
    this.data.characterReferenceType = R.type;
  }
  function De(R) {
    const q = this.sliceSerialize(R), re = this.data.characterReferenceType;
    let ie;
    re ? (ie = Il(q, re === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : ie = Ko(q);
    const Ne = this.stack[this.stack.length - 1];
    Ne.value += ie;
  }
  function Je(R) {
    const q = this.stack.pop();
    q.position.end = Cn(R.end);
  }
  function Xe(R) {
    N.call(this, R);
    const q = this.stack[this.stack.length - 1];
    q.url = this.sliceSerialize(R);
  }
  function Re(R) {
    N.call(this, R);
    const q = this.stack[this.stack.length - 1];
    q.url = "mailto:" + this.sliceSerialize(R);
  }
  function Ge() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function wt() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function se() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ee() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function te() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function ne() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function G() {
    return {
      type: "break"
    };
  }
  function me() {
    return {
      type: "html",
      value: ""
    };
  }
  function he() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Te() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Ie(R) {
    return {
      type: "list",
      ordered: R.type === "listOrdered",
      start: null,
      spread: R._spread,
      children: []
    };
  }
  function _e(R) {
    return {
      type: "listItem",
      spread: R._spread,
      checked: null,
      children: []
    };
  }
  function Me() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Fe() {
    return {
      type: "strong",
      children: []
    };
  }
  function it() {
    return {
      type: "text",
      value: ""
    };
  }
  function Q() {
    return {
      type: "thematicBreak"
    };
  }
}
function Cn(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Fl(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Fl(e, r) : dv(e, r);
  }
}
function dv(e, n) {
  let t;
  for (t in n)
    if (Bl.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function ma(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Nr({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Nr({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Nr({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function fv(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return cv(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
function pv(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function hv(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function mv(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, i = n.lang ? n.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let o = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (o.data = { meta: n.meta }), e.patch(n, o), o = e.applyData(n, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(n, o), o;
}
function gv(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function _v(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function bv(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = ur(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let s, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), s = e.footnoteOrder.length) : s = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const c = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(s) }]
  };
  e.patch(n, c);
  const l = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(n, l), e.applyData(n, l);
}
function yv(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function kv(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function jl(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function wv(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return jl(e, n);
  const i = { src: ur(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, o), e.applyData(n, o);
}
function xv(e, n) {
  const t = { src: ur(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function vv(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Ev(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return jl(e, n);
  const i = { href: ur(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Sv(e, n) {
  const t = { href: ur(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Cv(e, n, t) {
  const r = e.all(n), i = t ? Nv(t) : Hl(n), o = {}, s = [];
  if (typeof n.checked == "boolean") {
    const u = r[0];
    let d;
    u && u.type === "element" && u.tagName === "p" ? d = u : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const u = r[a];
    (i || a !== 0 || u.type !== "element" || u.tagName !== "p") && s.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? s.push(...u.children) : s.push(u);
  }
  const c = r[r.length - 1];
  c && (i || c.type !== "element" || c.tagName !== "p") && s.push({ type: "text", value: `
` });
  const l = { type: "element", tagName: "li", properties: o, children: s };
  return e.patch(n, l), e.applyData(n, l);
}
function Nv(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Hl(t[r]);
  }
  return n;
}
function Hl(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function $v(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const s = r[i];
    if (s.type === "element" && s.tagName === "li" && s.properties && Array.isArray(s.properties.className) && s.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Iv(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Av(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Mv(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Lv(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], s), i.push(s);
  }
  if (t.length > 0) {
    const s = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = Uo(n.children[1]), c = wl(n.children[n.children.length - 1]);
    a && c && (s.position = { start: a, end: c }), i.push(s);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Rv(e, n, t) {
  const r = t ? t.children : void 0, o = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", s = t && t.type === "table" ? t.align : void 0, a = s ? s.length : n.children.length;
  let c = -1;
  const l = [];
  for (; ++c < a; ) {
    const d = n.children[c], h = {}, f = s ? s[c] : void 0;
    f && (h.align = f);
    let m = { type: "element", tagName: o, properties: h, children: [] };
    d && (m.children = e.all(d), e.patch(d, m), m = e.applyData(d, m)), l.push(m);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(l, !0)
  };
  return e.patch(n, u), e.applyData(n, u);
}
function Tv(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const ga = 9, _a = 32;
function Dv(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const o = [];
  for (; r; )
    o.push(
      ba(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return o.push(ba(n.slice(i), i > 0, !1)), o.join("");
}
function ba(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let o = e.codePointAt(r);
    for (; o === ga || o === _a; )
      r++, o = e.codePointAt(r);
  }
  if (t) {
    let o = e.codePointAt(i - 1);
    for (; o === ga || o === _a; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Pv(e, n) {
  const t = { type: "text", value: Dv(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Ov(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const zv = {
  blockquote: pv,
  break: hv,
  code: mv,
  delete: gv,
  emphasis: _v,
  footnoteReference: bv,
  heading: yv,
  html: kv,
  imageReference: wv,
  image: xv,
  inlineCode: vv,
  linkReference: Ev,
  link: Sv,
  listItem: Cv,
  list: $v,
  paragraph: Iv,
  // @ts-expect-error: root is different, but hard to type.
  root: Av,
  strong: Mv,
  table: Lv,
  tableCell: Tv,
  tableRow: Rv,
  text: Pv,
  thematicBreak: Ov,
  toml: ti,
  yaml: ti,
  definition: ti,
  footnoteDefinition: ti
};
function ti() {
}
const ql = -1, ki = 0, Ir = 1, fi = 2, Zo = 3, Qo = 4, Jo = 5, es = 6, Ul = 7, Wl = 8, ya = typeof self == "object" ? self : globalThis, Bv = (e, n) => {
  const t = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, s] = n[i];
    switch (o) {
      case ki:
      case ql:
        return t(s, i);
      case Ir: {
        const a = t([], i);
        for (const c of s)
          a.push(r(c));
        return a;
      }
      case fi: {
        const a = t({}, i);
        for (const [c, l] of s)
          a[r(c)] = r(l);
        return a;
      }
      case Zo:
        return t(new Date(s), i);
      case Qo: {
        const { source: a, flags: c } = s;
        return t(new RegExp(a, c), i);
      }
      case Jo: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [c, l] of s)
          a.set(r(c), r(l));
        return a;
      }
      case es: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const c of s)
          a.add(r(c));
        return a;
      }
      case Ul: {
        const { name: a, message: c } = s;
        return t(new ya[a](c), i);
      }
      case Wl:
        return t(BigInt(s), i);
      case "BigInt":
        return t(Object(BigInt(s)), i);
      case "ArrayBuffer":
        return t(new Uint8Array(s).buffer, s);
      case "DataView": {
        const { buffer: a } = new Uint8Array(s);
        return t(new DataView(a), s);
      }
    }
    return t(new ya[o](s), i);
  };
  return r;
}, ka = (e) => Bv(/* @__PURE__ */ new Map(), e)(0), tr = "", { toString: Fv } = {}, { keys: jv } = Object, vr = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [ki, n];
  const t = Fv.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Ir, tr];
    case "Object":
      return [fi, tr];
    case "Date":
      return [Zo, tr];
    case "RegExp":
      return [Qo, tr];
    case "Map":
      return [Jo, tr];
    case "Set":
      return [es, tr];
    case "DataView":
      return [Ir, t];
  }
  return t.includes("Array") ? [Ir, t] : t.includes("Error") ? [Ul, t] : [fi, t];
}, ni = ([e, n]) => e === ki && (n === "function" || n === "symbol"), Hv = (e, n, t, r) => {
  const i = (s, a) => {
    const c = r.push(s) - 1;
    return t.set(a, c), c;
  }, o = (s) => {
    if (t.has(s))
      return t.get(s);
    let [a, c] = vr(s);
    switch (a) {
      case ki: {
        let u = s;
        switch (c) {
          case "bigint":
            a = Wl, u = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            u = null;
            break;
          case "undefined":
            return i([ql], s);
        }
        return i([a, u], s);
      }
      case Ir: {
        if (c) {
          let h = s;
          return c === "DataView" ? h = new Uint8Array(s.buffer) : c === "ArrayBuffer" && (h = new Uint8Array(s)), i([c, [...h]], s);
        }
        const u = [], d = i([a, u], s);
        for (const h of s)
          u.push(o(h));
        return d;
      }
      case fi: {
        if (c)
          switch (c) {
            case "BigInt":
              return i([c, s.toString()], s);
            case "Boolean":
            case "Number":
            case "String":
              return i([c, s.valueOf()], s);
          }
        if (n && "toJSON" in s)
          return o(s.toJSON());
        const u = [], d = i([a, u], s);
        for (const h of jv(s))
          (e || !ni(vr(s[h]))) && u.push([o(h), o(s[h])]);
        return d;
      }
      case Zo:
        return i([a, s.toISOString()], s);
      case Qo: {
        const { source: u, flags: d } = s;
        return i([a, { source: u, flags: d }], s);
      }
      case Jo: {
        const u = [], d = i([a, u], s);
        for (const [h, f] of s)
          (e || !(ni(vr(h)) || ni(vr(f)))) && u.push([o(h), o(f)]);
        return d;
      }
      case es: {
        const u = [], d = i([a, u], s);
        for (const h of s)
          (e || !ni(vr(h))) && u.push(o(h));
        return d;
      }
    }
    const { message: l } = s;
    return i([a, { name: c, message: l }], s);
  };
  return o;
}, wa = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Hv(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, pi = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? ka(wa(e, n)) : structuredClone(e)
) : (e, n) => ka(wa(e, n));
function qv(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function Uv(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Wv(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || qv, r = e.options.footnoteBackLabel || Uv, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const l = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!l)
      continue;
    const u = e.all(l), d = String(l.identifier).toUpperCase(), h = ur(d.toLowerCase());
    let f = 0;
    const m = [], y = e.footnoteCounts.get(d);
    for (; y !== void 0 && ++f <= y; ) {
      m.length > 0 && m.push({ type: "text", value: " " });
      let k = typeof t == "string" ? t : t(c, f);
      typeof k == "string" && (k = { type: "text", value: k }), m.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + h + (f > 1 ? "-" + f : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, f),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(k) ? k : [k]
      });
    }
    const _ = u[u.length - 1];
    if (_ && _.type === "element" && _.tagName === "p") {
      const k = _.children[_.children.length - 1];
      k && k.type === "text" ? k.value += " " : _.children.push({ type: "text", value: " " }), _.children.push(...m);
    } else
      u.push(...m);
    const b = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + h },
      children: e.wrap(u, !0)
    };
    e.patch(l, b), a.push(b);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: o,
          properties: {
            ...pi(s),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const wi = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(e) {
    if (e == null)
      return Kv;
    if (typeof e == "function")
      return xi(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Gv(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        Vv(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Xv(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function Gv(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = wi(e[t]);
  return xi(r);
  function r(...i) {
    let o = -1;
    for (; ++o < n.length; )
      if (n[o].apply(this, i)) return !0;
    return !1;
  }
}
function Vv(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return xi(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (i[o] !== n[o]) return !1;
    return !0;
  }
}
function Xv(e) {
  return xi(n);
  function n(t) {
    return t && t.type === e;
  }
}
function xi(e) {
  return n;
  function n(t, r, i) {
    return !!(Yv(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Kv() {
  return !0;
}
function Yv(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Gl = [], Zv = !0, wo = !1, Qv = "skip";
function Vl(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const o = wi(i), s = r ? -1 : 1;
  a(e, void 0, [])();
  function a(c, l, u) {
    const d = (
      /** @type {Record<string, unknown>} */
      c && typeof c == "object" ? c : {}
    );
    if (typeof d.type == "string") {
      const f = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(h, "name", {
        value: "node (" + (c.type + (f ? "<" + f + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let f = Gl, m, y, _;
      if ((!n || o(c, l, u[u.length - 1] || void 0)) && (f = Jv(t(c, u)), f[0] === wo))
        return f;
      if ("children" in c && c.children) {
        const b = (
          /** @type {UnistParent} */
          c
        );
        if (b.children && f[0] !== Qv)
          for (y = (r ? b.children.length : -1) + s, _ = u.concat(b); y > -1 && y < b.children.length; ) {
            const k = b.children[y];
            if (m = a(k, y, _)(), m[0] === wo)
              return m;
            y = typeof m[1] == "number" ? m[1] : y + s;
          }
      }
      return f;
    }
  }
}
function Jv(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Zv, e] : e == null ? Gl : [e];
}
function ts(e, n, t, r) {
  let i, o, s;
  typeof n == "function" && typeof t != "function" ? (o = void 0, s = n, i = t) : (o = n, s = t, i = r), Vl(e, o, a, i);
  function a(c, l) {
    const u = l[l.length - 1], d = u ? u.children.indexOf(c) : void 0;
    return s(c, d, u);
  }
}
const xo = {}.hasOwnProperty, eE = {};
function tE(e, n) {
  const t = n || eE, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = { ...zv, ...t.handlers }, a = {
    all: l,
    applyData: rE,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: s,
    one: c,
    options: t,
    patch: nE,
    wrap: oE
  };
  return ts(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, h = String(u.identifier).toUpperCase();
      d.has(h) || d.set(h, u);
    }
  }), a;
  function c(u, d) {
    const h = u.type, f = a.handlers[h];
    if (xo.call(a.handlers, h) && f)
      return f(a, u, d);
    if (a.options.passThrough && a.options.passThrough.includes(h)) {
      if ("children" in u) {
        const { children: y, ..._ } = u, b = pi(_);
        return b.children = a.all(u), b;
      }
      return pi(u);
    }
    return (a.options.unknownHandler || iE)(a, u, d);
  }
  function l(u) {
    const d = [];
    if ("children" in u) {
      const h = u.children;
      let f = -1;
      for (; ++f < h.length; ) {
        const m = a.one(h[f], u);
        if (m) {
          if (f && h[f - 1].type === "break" && (!Array.isArray(m) && m.type === "text" && (m.value = xa(m.value)), !Array.isArray(m) && m.type === "element")) {
            const y = m.children[0];
            y && y.type === "text" && (y.value = xa(y.value));
          }
          Array.isArray(m) ? d.push(...m) : d.push(m);
        }
      }
    }
    return d;
  }
}
function nE(e, n) {
  e.position && (n.position = U0(e));
}
function rE(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const s = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: s };
      }
    t.type === "element" && o && Object.assign(t.properties, pi(o)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function iE(e, n) {
  const t = n.data || {}, r = "value" in n && !(xo.call(t, "hProperties") || xo.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function oE(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function xa(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function va(e, n) {
  const t = tE(e, n), r = t.one(e, void 0), i = Wv(t), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function sE(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      va(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      va(t, { file: r, ...e || n })
    );
  };
}
function Ea(e) {
  if (e)
    throw e;
}
var Xi, Sa;
function aE() {
  if (Sa) return Xi;
  Sa = 1;
  var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(l) {
    return typeof Array.isArray == "function" ? Array.isArray(l) : n.call(l) === "[object Array]";
  }, o = function(l) {
    if (!l || n.call(l) !== "[object Object]")
      return !1;
    var u = e.call(l, "constructor"), d = l.constructor && l.constructor.prototype && e.call(l.constructor.prototype, "isPrototypeOf");
    if (l.constructor && !u && !d)
      return !1;
    var h;
    for (h in l)
      ;
    return typeof h > "u" || e.call(l, h);
  }, s = function(l, u) {
    t && u.name === "__proto__" ? t(l, u.name, {
      enumerable: !0,
      configurable: !0,
      value: u.newValue,
      writable: !0
    }) : l[u.name] = u.newValue;
  }, a = function(l, u) {
    if (u === "__proto__")
      if (e.call(l, u)) {
        if (r)
          return r(l, u).value;
      } else return;
    return l[u];
  };
  return Xi = function c() {
    var l, u, d, h, f, m, y = arguments[0], _ = 1, b = arguments.length, k = !1;
    for (typeof y == "boolean" && (k = y, y = arguments[1] || {}, _ = 2), (y == null || typeof y != "object" && typeof y != "function") && (y = {}); _ < b; ++_)
      if (l = arguments[_], l != null)
        for (u in l)
          d = a(y, u), h = a(l, u), y !== h && (k && h && (o(h) || (f = i(h))) ? (f ? (f = !1, m = d && i(d) ? d : []) : m = d && o(d) ? d : {}, s(y, { name: u, newValue: c(k, m, h) })) : typeof h < "u" && s(y, { name: u, newValue: h }));
    return y;
  }, Xi;
}
var lE = aE();
const Ki = /* @__PURE__ */ zo(lE);
function vo(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function cE() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let o = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    a(null, ...i);
    function a(c, ...l) {
      const u = e[++o];
      let d = -1;
      if (c) {
        s(c);
        return;
      }
      for (; ++d < i.length; )
        (l[d] === null || l[d] === void 0) && (l[d] = i[d]);
      i = l, u ? uE(u, a)(...l) : s(null, ...l);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function uE(e, n) {
  let t;
  return r;
  function r(...s) {
    const a = e.length > s.length;
    let c;
    a && s.push(i);
    try {
      c = e.apply(this, s);
    } catch (l) {
      const u = (
        /** @type {Error} */
        l
      );
      if (a && t)
        throw u;
      return i(u);
    }
    a || (c && c.then && typeof c.then == "function" ? c.then(o, i) : c instanceof Error ? i(c) : o(c));
  }
  function i(s, ...a) {
    t || (t = !0, n(s, ...a));
  }
  function o(s) {
    i(null, s);
  }
}
const an = { basename: dE, dirname: fE, extname: pE, join: hE, sep: "/" };
function dE(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  Pr(e);
  let t = 0, r = -1, i = e.length, o;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (o) {
          t = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let s = -1, a = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (o) {
        t = i + 1;
        break;
      }
    } else
      s < 0 && (o = !0, s = i + 1), a > -1 && (e.codePointAt(i) === n.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = s));
  return t === r ? r = s : r < 0 && (r = e.length), e.slice(t, r);
}
function fE(e) {
  if (Pr(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function pE(e) {
  Pr(e);
  let n = e.length, t = -1, r = 0, i = -1, o = 0, s;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (s) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (s = !0, t = n + 1), a === 46 ? i < 0 ? i = n : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function hE(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    Pr(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : mE(t);
}
function mE(e) {
  Pr(e);
  const n = e.codePointAt(0) === 47;
  let t = gE(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function gE(e, n) {
  let t = "", r = 0, i = -1, o = 0, s = -1, a, c;
  for (; ++s <= e.length; ) {
    if (s < e.length)
      a = e.codePointAt(s);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === s - 1 || o === 1)) if (i !== s - 1 && o === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (c = t.lastIndexOf("/"), c !== t.length - 1) {
              c < 0 ? (t = "", r = 0) : (t = t.slice(0, c), r = t.length - 1 - t.lastIndexOf("/")), i = s, o = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = s, o = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, s) : t = e.slice(i + 1, s), r = s - i - 1;
      i = s, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return t;
}
function Pr(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const _E = { cwd: bE };
function bE() {
  return "/";
}
function Eo(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function yE(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Eo(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return kE(e);
}
function kE(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const Yi = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Xl {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(n) {
    let t;
    n ? Eo(n) ? t = { path: n } : typeof n == "string" || wE(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : _E.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Yi.length; ) {
      const o = Yi[r];
      o in t && t[o] !== void 0 && t[o] !== null && (this[o] = o === "history" ? [...t[o]] : t[o]);
    }
    let i;
    for (i in t)
      Yi.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? an.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(n) {
    Qi(n, "basename"), Zi(n, "basename"), this.path = an.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? an.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(n) {
    Ca(this.basename, "dirname"), this.path = an.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? an.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(n) {
    if (Zi(n, "extname"), Ca(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = an.join(this.dirname, this.stem + (n || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(n) {
    Eo(n) && (n = yE(n)), Qi(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? an.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(n) {
    Qi(n, "stem"), Zi(n, "stem"), this.path = an.join(this.dirname || "", n + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(n, t, r) {
    const i = this.message(n, t, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(n, t, r) {
    const i = this.message(n, t, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(n, t, r) {
    const i = new ht(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function Zi(e, n) {
  if (e && e.includes(an.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + an.sep + "`"
    );
}
function Qi(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function Ca(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function wE(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const xE = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], o = function() {
      return i.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  })
), vE = {}.hasOwnProperty;
class ns extends xE {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = cE();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new ns()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(Ki(!0, {}, this.namespace)), n;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (to("data", this.frozen), this.namespace[n] = t, this) : vE.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (to("data", this.frozen), this.namespace = n, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(n) {
    this.freeze();
    const t = ri(n), r = this.parser || this.Parser;
    return Ji("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(n, t) {
    const r = this;
    return this.freeze(), Ji("process", this.parser || this.Parser), eo("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(o, s) {
      const a = ri(n), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(c, a, function(u, d, h) {
        if (u || !d || !h)
          return l(u);
        const f = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), m = r.stringify(f, h);
        CE(m) ? h.value = m : h.result = m, l(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function l(u, d) {
        u || !d ? s(u) : o ? o(d) : t(void 0, d);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(n) {
    let t = !1, r;
    return this.freeze(), Ji("processSync", this.parser || this.Parser), eo("processSync", this.compiler || this.Compiler), this.process(n, i), $a("processSync", "process", t), r;
    function i(o, s) {
      t = !0, Ea(o), r = s;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(n, t, r) {
    Na(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? o(void 0, r) : new Promise(o);
    function o(s, a) {
      const c = ri(t);
      i.run(n, c, l);
      function l(u, d, h) {
        const f = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || n
        );
        u ? a(u) : s ? s(f) : r(void 0, f, h);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(n, t) {
    let r = !1, i;
    return this.run(n, t, o), $a("runSync", "run", r), i;
    function o(s, a) {
      Ea(s), i = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(n, t) {
    this.freeze();
    const r = ri(t), i = this.compiler || this.Compiler;
    return eo("stringify", i), Na(n), i(n, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(n, ...t) {
    const r = this.attachers, i = this.namespace;
    if (to("use", this.frozen), n != null) if (typeof n == "function")
      c(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : s(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function o(l) {
      if (typeof l == "function")
        c(l, []);
      else if (typeof l == "object")
        if (Array.isArray(l)) {
          const [u, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            l
          );
          c(u, d);
        } else
          s(l);
      else
        throw new TypeError("Expected usable value, not `" + l + "`");
    }
    function s(l) {
      if (!("plugins" in l) && !("settings" in l))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(l.plugins), l.settings && (i.settings = Ki(!0, i.settings, l.settings));
    }
    function a(l) {
      let u = -1;
      if (l != null) if (Array.isArray(l))
        for (; ++u < l.length; ) {
          const d = l[u];
          o(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + l + "`");
    }
    function c(l, u) {
      let d = -1, h = -1;
      for (; ++d < r.length; )
        if (r[d][0] === l) {
          h = d;
          break;
        }
      if (h === -1)
        r.push([l, ...u]);
      else if (u.length > 0) {
        let [f, ...m] = u;
        const y = r[h][1];
        vo(y) && vo(f) && (f = Ki(!0, y, f)), r[h] = [l, f, ...m];
      }
    }
  }
}
const EE = new ns().freeze();
function Ji(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function eo(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function to(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Na(e) {
  if (!vo(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function $a(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function ri(e) {
  return SE(e) ? e : new Xl(e);
}
function SE(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function CE(e) {
  return typeof e == "string" || NE(e);
}
function NE(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const $E = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ia = [], Aa = { allowDangerousHtml: !0 }, IE = /^(https?|ircs?|mailto|xmpp)$/i, AE = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function ME(e) {
  const n = LE(e), t = RE(e);
  return TE(n.runSync(n.parse(t), t), e);
}
function LE(e) {
  const n = e.rehypePlugins || Ia, t = e.remarkPlugins || Ia, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Aa } : Aa;
  return EE().use(fv).use(t).use(sE, r).use(n);
}
function RE(e) {
  const n = e.children || "", t = new Xl();
  return typeof n == "string" && (t.value = n), t;
}
function TE(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, o = n.disallowedElements, s = n.skipHtml, a = n.unwrapDisallowed, c = n.urlTransform || DE;
  for (const u of AE)
    Object.hasOwn(n, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + $E + u.id, void 0);
  return ts(e, l), K0(e, {
    Fragment: kt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: M,
    passKeys: !0,
    passNode: !0
  });
  function l(u, d, h) {
    if (u.type === "raw" && h && typeof d == "number")
      return s ? h.children.splice(d, 1) : h.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let f;
      for (f in Wi)
        if (Object.hasOwn(Wi, f) && Object.hasOwn(u.properties, f)) {
          const m = u.properties[f], y = Wi[f];
          (y === null || y.includes(u.tagName)) && (u.properties[f] = c(String(m || ""), f, u));
        }
    }
    if (u.type === "element") {
      let f = t ? !t.includes(u.tagName) : o ? o.includes(u.tagName) : !1;
      if (!f && r && typeof d == "number" && (f = !r(u, d, h)), f && h && typeof d == "number")
        return a && u.children ? h.children.splice(d, 1, ...u.children) : h.children.splice(d, 1), d;
    }
  }
}
function DE(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    IE.test(e.slice(0, n)) ? e : ""
  );
}
function Ma(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, i = t.indexOf(n);
  for (; i !== -1; )
    r++, i = t.indexOf(n, i + n.length);
  return r;
}
function PE(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function OE(e, n, t) {
  const i = wi((t || {}).ignore || []), o = zE(n);
  let s = -1;
  for (; ++s < o.length; )
    Vl(e, "text", a);
  function a(l, u) {
    let d = -1, h;
    for (; ++d < u.length; ) {
      const f = u[d], m = h ? h.children : void 0;
      if (i(
        f,
        m ? m.indexOf(f) : void 0,
        h
      ))
        return;
      h = f;
    }
    if (h)
      return c(l, u);
  }
  function c(l, u) {
    const d = u[u.length - 1], h = o[s][0], f = o[s][1];
    let m = 0;
    const _ = d.children.indexOf(l);
    let b = !1, k = [];
    h.lastIndex = 0;
    let g = h.exec(l.value);
    for (; g; ) {
      const S = g.index, v = {
        index: g.index,
        input: g.input,
        stack: [...u, l]
      };
      let w = f(...g, v);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === !1 ? h.lastIndex = S + 1 : (m !== S && k.push({
        type: "text",
        value: l.value.slice(m, S)
      }), Array.isArray(w) ? k.push(...w) : w && k.push(w), m = S + g[0].length, b = !0), !h.global)
        break;
      g = h.exec(l.value);
    }
    return b ? (m < l.value.length && k.push({ type: "text", value: l.value.slice(m) }), d.children.splice(_, 1, ...k)) : k = [l], _ + k.length;
  }
}
function zE(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const i = t[r];
    n.push([BE(i[0]), FE(i[1])]);
  }
  return n;
}
function BE(e) {
  return typeof e == "string" ? new RegExp(PE(e), "g") : e;
}
function FE(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const no = "phrasing", ro = ["autolink", "link", "image", "label"];
function jE() {
  return {
    transforms: [XE],
    enter: {
      literalAutolink: qE,
      literalAutolinkEmail: io,
      literalAutolinkHttp: io,
      literalAutolinkWww: io
    },
    exit: {
      literalAutolink: VE,
      literalAutolinkEmail: GE,
      literalAutolinkHttp: UE,
      literalAutolinkWww: WE
    }
  };
}
function HE() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: no,
        notInConstruct: ro
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: no,
        notInConstruct: ro
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: no,
        notInConstruct: ro
      }
    ]
  };
}
function qE(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function io(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function UE(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function WE(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function GE(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function VE(e) {
  this.exit(e);
}
function XE(e) {
  OE(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, KE],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), YE]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function KE(e, n, t, r, i) {
  let o = "";
  if (!Kl(i) || (/^w/i.test(n) && (t = n + t, n = "", o = "http://"), !ZE(t)))
    return !1;
  const s = QE(t + r);
  if (!s[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + n + s[0],
    children: [{ type: "text", value: n + s[0] }]
  };
  return s[1] ? [a, { type: "text", value: s[1] }] : a;
}
function YE(e, n, t, r) {
  return (
    // Not an expected previous character.
    !Kl(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function ZE(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function QE(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const i = Ma(e, "(");
  let o = Ma(e, ")");
  for (; r !== -1 && i > o; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), o++;
  return [e, t];
}
function Kl(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || Hn(t) || bi(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
Yl.peek = aS;
function JE() {
  this.buffer();
}
function eS(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function tS() {
  this.buffer();
}
function nS(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function rS(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Zt(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function iS(e) {
  this.exit(e);
}
function oS(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Zt(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function sS(e) {
  this.exit(e);
}
function aS() {
  return "[";
}
function Yl(e, n, t, r) {
  const i = t.createTracker(r);
  let o = i.move("[^");
  const s = t.enter("footnoteReference"), a = t.enter("reference");
  return o += i.move(
    t.safe(t.associationId(e), { after: "]", before: o })
  ), a(), s(), o += i.move("]"), o;
}
function lS() {
  return {
    enter: {
      gfmFootnoteCallString: JE,
      gfmFootnoteCall: eS,
      gfmFootnoteDefinitionLabelString: tS,
      gfmFootnoteDefinition: nS
    },
    exit: {
      gfmFootnoteCallString: rS,
      gfmFootnoteCall: iS,
      gfmFootnoteDefinitionLabelString: oS,
      gfmFootnoteDefinition: sS
    }
  };
}
function cS(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: Yl },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, i, o, s) {
    const a = o.createTracker(s);
    let c = a.move("[^");
    const l = o.enter("footnoteDefinition"), u = o.enter("label");
    return c += a.move(
      o.safe(o.associationId(r), { before: c, after: "]" })
    ), u(), c += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), c += a.move(
      (n ? `
` : " ") + o.indentLines(
        o.containerFlow(r, a.current()),
        n ? Zl : uS
      )
    )), l(), c;
  }
}
function uS(e, n, t) {
  return n === 0 ? e : Zl(e, n, t);
}
function Zl(e, n, t) {
  return (t ? "" : "    ") + e;
}
const dS = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Ql.peek = gS;
function fS() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: hS },
    exit: { strikethrough: mS }
  };
}
function pS() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: dS
      }
    ],
    handlers: { delete: Ql }
  };
}
function hS(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function mS(e) {
  this.exit(e);
}
function Ql(e, n, t, r) {
  const i = t.createTracker(r), o = t.enter("strikethrough");
  let s = i.move("~~");
  return s += t.containerPhrasing(e, {
    ...i.current(),
    before: s,
    after: "~"
  }), s += i.move("~~"), o(), s;
}
function gS() {
  return "~";
}
function _S(e) {
  return e.length;
}
function bS(e, n) {
  const t = n || {}, r = (t.align || []).concat(), i = t.stringLength || _S, o = [], s = [], a = [], c = [];
  let l = 0, u = -1;
  for (; ++u < e.length; ) {
    const y = [], _ = [];
    let b = -1;
    for (e[u].length > l && (l = e[u].length); ++b < e[u].length; ) {
      const k = yS(e[u][b]);
      if (t.alignDelimiters !== !1) {
        const g = i(k);
        _[b] = g, (c[b] === void 0 || g > c[b]) && (c[b] = g);
      }
      y.push(k);
    }
    s[u] = y, a[u] = _;
  }
  let d = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++d < l; )
      o[d] = La(r[d]);
  else {
    const y = La(r);
    for (; ++d < l; )
      o[d] = y;
  }
  d = -1;
  const h = [], f = [];
  for (; ++d < l; ) {
    const y = o[d];
    let _ = "", b = "";
    y === 99 ? (_ = ":", b = ":") : y === 108 ? _ = ":" : y === 114 && (b = ":");
    let k = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      c[d] - _.length - b.length
    );
    const g = _ + "-".repeat(k) + b;
    t.alignDelimiters !== !1 && (k = _.length + k + b.length, k > c[d] && (c[d] = k), f[d] = k), h[d] = g;
  }
  s.splice(1, 0, h), a.splice(1, 0, f), u = -1;
  const m = [];
  for (; ++u < s.length; ) {
    const y = s[u], _ = a[u];
    d = -1;
    const b = [];
    for (; ++d < l; ) {
      const k = y[d] || "";
      let g = "", S = "";
      if (t.alignDelimiters !== !1) {
        const v = c[d] - (_[d] || 0), w = o[d];
        w === 114 ? g = " ".repeat(v) : w === 99 ? v % 2 ? (g = " ".repeat(v / 2 + 0.5), S = " ".repeat(v / 2 - 0.5)) : (g = " ".repeat(v / 2), S = g) : S = " ".repeat(v);
      }
      t.delimiterStart !== !1 && !d && b.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && k === "") && (t.delimiterStart !== !1 || d) && b.push(" "), t.alignDelimiters !== !1 && b.push(g), b.push(k), t.alignDelimiters !== !1 && b.push(S), t.padding !== !1 && b.push(" "), (t.delimiterEnd !== !1 || d !== l - 1) && b.push("|");
    }
    m.push(
      t.delimiterEnd === !1 ? b.join("").replace(/ +$/, "") : b.join("")
    );
  }
  return m.join(`
`);
}
function yS(e) {
  return e == null ? "" : String(e);
}
function La(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function kS(e, n, t, r) {
  const i = t.enter("blockquote"), o = t.createTracker(r);
  o.move("> "), o.shift(2);
  const s = t.indentLines(
    t.containerFlow(e, o.current()),
    wS
  );
  return i(), s;
}
function wS(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function xS(e, n) {
  return Ra(e, n.inConstruct, !0) && !Ra(e, n.notInConstruct, !1);
}
function Ra(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function Ta(e, n, t, r) {
  let i = -1;
  for (; ++i < t.unsafe.length; )
    if (t.unsafe[i].character === `
` && xS(t.stack, t.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function vS(e, n) {
  const t = String(e);
  let r = t.indexOf(n), i = r, o = 0, s = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++o > s && (s = o) : o = 1, i = r + n.length, r = t.indexOf(n, i);
  return s;
}
function ES(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function SS(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function CS(e, n, t, r) {
  const i = SS(t), o = e.value || "", s = i === "`" ? "GraveAccent" : "Tilde";
  if (ES(e, t)) {
    const d = t.enter("codeIndented"), h = t.indentLines(o, NS);
    return d(), h;
  }
  const a = t.createTracker(r), c = i.repeat(Math.max(vS(o, i) + 1, 3)), l = t.enter("codeFenced");
  let u = a.move(c);
  if (e.lang) {
    const d = t.enter(`codeFencedLang${s}`);
    u += a.move(
      t.safe(e.lang, {
        before: u,
        after: " ",
        encode: ["`"],
        ...a.current()
      })
    ), d();
  }
  if (e.lang && e.meta) {
    const d = t.enter(`codeFencedMeta${s}`);
    u += a.move(" "), u += a.move(
      t.safe(e.meta, {
        before: u,
        after: `
`,
        encode: ["`"],
        ...a.current()
      })
    ), d();
  }
  return u += a.move(`
`), o && (u += a.move(o + `
`)), u += a.move(c), l(), u;
}
function NS(e, n, t) {
  return (t ? "" : "    ") + e;
}
function rs(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function $S(e, n, t, r) {
  const i = rs(t), o = i === '"' ? "Quote" : "Apostrophe", s = t.enter("definition");
  let a = t.enter("label");
  const c = t.createTracker(r);
  let l = c.move("[");
  return l += c.move(
    t.safe(t.associationId(e), {
      before: l,
      after: "]",
      ...c.current()
    })
  ), l += c.move("]: "), a(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = t.enter("destinationLiteral"), l += c.move("<"), l += c.move(
    t.safe(e.url, { before: l, after: ">", ...c.current() })
  ), l += c.move(">")) : (a = t.enter("destinationRaw"), l += c.move(
    t.safe(e.url, {
      before: l,
      after: e.title ? " " : `
`,
      ...c.current()
    })
  )), a(), e.title && (a = t.enter(`title${o}`), l += c.move(" " + i), l += c.move(
    t.safe(e.title, {
      before: l,
      after: i,
      ...c.current()
    })
  ), l += c.move(i), a()), s(), l;
}
function IS(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function Lr(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function hi(e, n, t) {
  const r = ar(e), i = ar(n);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
Jl.peek = AS;
function Jl(e, n, t, r) {
  const i = IS(t), o = t.enter("emphasis"), s = t.createTracker(r), a = s.move(i);
  let c = s.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...s.current()
    })
  );
  const l = c.charCodeAt(0), u = hi(
    r.before.charCodeAt(r.before.length - 1),
    l,
    i
  );
  u.inside && (c = Lr(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), h = hi(r.after.charCodeAt(0), d, i);
  h.inside && (c = c.slice(0, -1) + Lr(d));
  const f = s.move(i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  }, a + c + f;
}
function AS(e, n, t) {
  return t.options.emphasis || "*";
}
function MS(e, n) {
  let t = !1;
  return ts(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, wo;
  }), !!((!e.depth || e.depth < 3) && Xo(e) && (n.options.setext || t));
}
function LS(e, n, t, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), o = t.createTracker(r);
  if (MS(e, t)) {
    const u = t.enter("headingSetext"), d = t.enter("phrasing"), h = t.containerPhrasing(e, {
      ...o.current(),
      before: `
`,
      after: `
`
    });
    return d(), u(), h + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      h.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(h.lastIndexOf("\r"), h.lastIndexOf(`
`)) + 1)
    );
  }
  const s = "#".repeat(i), a = t.enter("headingAtx"), c = t.enter("phrasing");
  o.move(s + " ");
  let l = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(l) && (l = Lr(l.charCodeAt(0)) + l.slice(1)), l = l ? s + " " + l : s, t.options.closeAtx && (l += " " + s), c(), a(), l;
}
ec.peek = RS;
function ec(e) {
  return e.value || "";
}
function RS() {
  return "<";
}
tc.peek = TS;
function tc(e, n, t, r) {
  const i = rs(t), o = i === '"' ? "Quote" : "Apostrophe", s = t.enter("image");
  let a = t.enter("label");
  const c = t.createTracker(r);
  let l = c.move("![");
  return l += c.move(
    t.safe(e.alt, { before: l, after: "]", ...c.current() })
  ), l += c.move("]("), a(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = t.enter("destinationLiteral"), l += c.move("<"), l += c.move(
    t.safe(e.url, { before: l, after: ">", ...c.current() })
  ), l += c.move(">")) : (a = t.enter("destinationRaw"), l += c.move(
    t.safe(e.url, {
      before: l,
      after: e.title ? " " : ")",
      ...c.current()
    })
  )), a(), e.title && (a = t.enter(`title${o}`), l += c.move(" " + i), l += c.move(
    t.safe(e.title, {
      before: l,
      after: i,
      ...c.current()
    })
  ), l += c.move(i), a()), l += c.move(")"), s(), l;
}
function TS() {
  return "!";
}
nc.peek = DS;
function nc(e, n, t, r) {
  const i = e.referenceType, o = t.enter("imageReference");
  let s = t.enter("label");
  const a = t.createTracker(r);
  let c = a.move("![");
  const l = t.safe(e.alt, {
    before: c,
    after: "]",
    ...a.current()
  });
  c += a.move(l + "]["), s();
  const u = t.stack;
  t.stack = [], s = t.enter("reference");
  const d = t.safe(t.associationId(e), {
    before: c,
    after: "]",
    ...a.current()
  });
  return s(), t.stack = u, o(), i === "full" || !l || l !== d ? c += a.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += a.move("]"), c;
}
function DS() {
  return "!";
}
rc.peek = PS;
function rc(e, n, t) {
  let r = e.value || "", i = "`", o = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < t.unsafe.length; ) {
    const s = t.unsafe[o], a = t.compilePattern(s);
    let c;
    if (s.atBreak)
      for (; c = a.exec(r); ) {
        let l = c.index;
        r.charCodeAt(l) === 10 && r.charCodeAt(l - 1) === 13 && l--, r = r.slice(0, l) + " " + r.slice(c.index + 1);
      }
  }
  return i + r + i;
}
function PS() {
  return "`";
}
function ic(e, n) {
  const t = Xo(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
oc.peek = OS;
function oc(e, n, t, r) {
  const i = rs(t), o = i === '"' ? "Quote" : "Apostrophe", s = t.createTracker(r);
  let a, c;
  if (ic(e, t)) {
    const u = t.stack;
    t.stack = [], a = t.enter("autolink");
    let d = s.move("<");
    return d += s.move(
      t.containerPhrasing(e, {
        before: d,
        after: ">",
        ...s.current()
      })
    ), d += s.move(">"), a(), t.stack = u, d;
  }
  a = t.enter("link"), c = t.enter("label");
  let l = s.move("[");
  return l += s.move(
    t.containerPhrasing(e, {
      before: l,
      after: "](",
      ...s.current()
    })
  ), l += s.move("]("), c(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (c = t.enter("destinationLiteral"), l += s.move("<"), l += s.move(
    t.safe(e.url, { before: l, after: ">", ...s.current() })
  ), l += s.move(">")) : (c = t.enter("destinationRaw"), l += s.move(
    t.safe(e.url, {
      before: l,
      after: e.title ? " " : ")",
      ...s.current()
    })
  )), c(), e.title && (c = t.enter(`title${o}`), l += s.move(" " + i), l += s.move(
    t.safe(e.title, {
      before: l,
      after: i,
      ...s.current()
    })
  ), l += s.move(i), c()), l += s.move(")"), a(), l;
}
function OS(e, n, t) {
  return ic(e, t) ? "<" : "[";
}
sc.peek = zS;
function sc(e, n, t, r) {
  const i = e.referenceType, o = t.enter("linkReference");
  let s = t.enter("label");
  const a = t.createTracker(r);
  let c = a.move("[");
  const l = t.containerPhrasing(e, {
    before: c,
    after: "]",
    ...a.current()
  });
  c += a.move(l + "]["), s();
  const u = t.stack;
  t.stack = [], s = t.enter("reference");
  const d = t.safe(t.associationId(e), {
    before: c,
    after: "]",
    ...a.current()
  });
  return s(), t.stack = u, o(), i === "full" || !l || l !== d ? c += a.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += a.move("]"), c;
}
function zS() {
  return "[";
}
function is(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function BS(e) {
  const n = is(e), t = e.options.bulletOther;
  if (!t)
    return n === "*" ? "-" : "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (t === n)
    throw new Error(
      "Expected `bullet` (`" + n + "`) and `bulletOther` (`" + t + "`) to be different"
    );
  return t;
}
function FS(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function ac(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function jS(e, n, t, r) {
  const i = t.enter("list"), o = t.bulletCurrent;
  let s = e.ordered ? FS(t) : is(t);
  const a = e.ordered ? s === "." ? ")" : "." : BS(t);
  let c = n && t.bulletLastUsed ? s === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const u = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (s === "*" || s === "-") && // Empty first list item:
      u && (!u.children || !u.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (c = !0), ac(t) === s && u
    ) {
      let d = -1;
      for (; ++d < e.children.length; ) {
        const h = e.children[d];
        if (h && h.type === "listItem" && h.children && h.children[0] && h.children[0].type === "thematicBreak") {
          c = !0;
          break;
        }
      }
    }
  }
  c && (s = a), t.bulletCurrent = s;
  const l = t.containerFlow(e, r);
  return t.bulletLastUsed = s, t.bulletCurrent = o, i(), l;
}
function HS(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function qS(e, n, t, r) {
  const i = HS(t);
  let o = t.bulletCurrent || is(t);
  n && n.type === "list" && n.ordered && (o = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + o);
  let s = o.length + 1;
  (i === "tab" || i === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (s = Math.ceil(s / 4) * 4);
  const a = t.createTracker(r);
  a.move(o + " ".repeat(s - o.length)), a.shift(s);
  const c = t.enter("listItem"), l = t.indentLines(
    t.containerFlow(e, a.current()),
    u
  );
  return c(), l;
  function u(d, h, f) {
    return h ? (f ? "" : " ".repeat(s)) + d : (f ? o : o + " ".repeat(s - o.length)) + d;
  }
}
function US(e, n, t, r) {
  const i = t.enter("paragraph"), o = t.enter("phrasing"), s = t.containerPhrasing(e, r);
  return o(), i(), s;
}
const WS = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  wi([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function GS(e, n, t, r) {
  return (e.children.some(function(s) {
    return WS(s);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function VS(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
lc.peek = XS;
function lc(e, n, t, r) {
  const i = VS(t), o = t.enter("strong"), s = t.createTracker(r), a = s.move(i + i);
  let c = s.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...s.current()
    })
  );
  const l = c.charCodeAt(0), u = hi(
    r.before.charCodeAt(r.before.length - 1),
    l,
    i
  );
  u.inside && (c = Lr(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), h = hi(r.after.charCodeAt(0), d, i);
  h.inside && (c = c.slice(0, -1) + Lr(d));
  const f = s.move(i + i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  }, a + c + f;
}
function XS(e, n, t) {
  return t.options.strong || "*";
}
function KS(e, n, t, r) {
  return t.safe(e.value, r);
}
function YS(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function ZS(e, n, t) {
  const r = (ac(t) + (t.options.ruleSpaces ? " " : "")).repeat(YS(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const cc = {
  blockquote: kS,
  break: Ta,
  code: CS,
  definition: $S,
  emphasis: Jl,
  hardBreak: Ta,
  heading: LS,
  html: ec,
  image: tc,
  imageReference: nc,
  inlineCode: rc,
  link: oc,
  linkReference: sc,
  list: jS,
  listItem: qS,
  paragraph: US,
  root: GS,
  strong: lc,
  text: KS,
  thematicBreak: ZS
};
function QS() {
  return {
    enter: {
      table: JS,
      tableData: Da,
      tableHeader: Da,
      tableRow: t2
    },
    exit: {
      codeText: n2,
      table: e2,
      tableData: oo,
      tableHeader: oo,
      tableRow: oo
    }
  };
}
function JS(e) {
  const n = e._align;
  this.enter(
    {
      type: "table",
      align: n.map(function(t) {
        return t === "none" ? null : t;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function e2(e) {
  this.exit(e), this.data.inTable = void 0;
}
function t2(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function oo(e) {
  this.exit(e);
}
function Da(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function n2(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, r2));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function r2(e, n) {
  return n === "|" ? n : e;
}
function i2(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, i = n.stringLength, o = t ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: h,
      table: s,
      tableCell: c,
      tableRow: a
    }
  };
  function s(f, m, y, _) {
    return l(u(f, y, _), f.align);
  }
  function a(f, m, y, _) {
    const b = d(f, y, _), k = l([b]);
    return k.slice(0, k.indexOf(`
`));
  }
  function c(f, m, y, _) {
    const b = y.enter("tableCell"), k = y.enter("phrasing"), g = y.containerPhrasing(f, {
      ..._,
      before: o,
      after: o
    });
    return k(), b(), g;
  }
  function l(f, m) {
    return bS(f, {
      align: m,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function u(f, m, y) {
    const _ = f.children;
    let b = -1;
    const k = [], g = m.enter("table");
    for (; ++b < _.length; )
      k[b] = d(_[b], m, y);
    return g(), k;
  }
  function d(f, m, y) {
    const _ = f.children;
    let b = -1;
    const k = [], g = m.enter("tableRow");
    for (; ++b < _.length; )
      k[b] = c(_[b], f, m, y);
    return g(), k;
  }
  function h(f, m, y) {
    let _ = cc.inlineCode(f, m, y);
    return y.stack.includes("tableCell") && (_ = _.replace(/\|/g, "\\$&")), _;
  }
}
function o2() {
  return {
    exit: {
      taskListCheckValueChecked: Pa,
      taskListCheckValueUnchecked: Pa,
      paragraph: a2
    }
  };
}
function s2() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: l2 }
  };
}
function Pa(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function a2(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const i = n.children;
      let o = -1, s;
      for (; ++o < i.length; ) {
        const a = i[o];
        if (a.type === "paragraph") {
          s = a;
          break;
        }
      }
      s === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function l2(e, n, t, r) {
  const i = e.children[0], o = typeof e.checked == "boolean" && i && i.type === "paragraph", s = "[" + (e.checked ? "x" : " ") + "] ", a = t.createTracker(r);
  o && a.move(s);
  let c = cc.listItem(e, n, t, {
    ...r,
    ...a.current()
  });
  return o && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
  function l(u) {
    return u + s;
  }
}
function c2() {
  return [
    jE(),
    lS(),
    fS(),
    QS(),
    o2()
  ];
}
function u2(e) {
  return {
    extensions: [
      HE(),
      cS(e),
      pS(),
      i2(e),
      s2()
    ]
  };
}
const d2 = {
  tokenize: _2,
  partial: !0
}, uc = {
  tokenize: b2,
  partial: !0
}, dc = {
  tokenize: y2,
  partial: !0
}, fc = {
  tokenize: k2,
  partial: !0
}, f2 = {
  tokenize: w2,
  partial: !0
}, pc = {
  name: "wwwAutolink",
  tokenize: m2,
  previous: mc
}, hc = {
  name: "protocolAutolink",
  tokenize: g2,
  previous: gc
}, gn = {
  name: "emailAutolink",
  tokenize: h2,
  previous: _c
}, cn = {};
function p2() {
  return {
    text: cn
  };
}
let On = 48;
for (; On < 123; )
  cn[On] = gn, On++, On === 58 ? On = 65 : On === 91 && (On = 97);
cn[43] = gn;
cn[45] = gn;
cn[46] = gn;
cn[95] = gn;
cn[72] = [gn, hc];
cn[104] = [gn, hc];
cn[87] = [gn, pc];
cn[119] = [gn, pc];
function h2(e, n, t) {
  const r = this;
  let i, o;
  return s;
  function s(d) {
    return !So(d) || !_c.call(r, r.previous) || os(r.events) ? t(d) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(d));
  }
  function a(d) {
    return So(d) ? (e.consume(d), a) : d === 64 ? (e.consume(d), c) : t(d);
  }
  function c(d) {
    return d === 46 ? e.check(f2, u, l)(d) : d === 45 || d === 95 || pt(d) ? (o = !0, e.consume(d), c) : u(d);
  }
  function l(d) {
    return e.consume(d), i = !0, c;
  }
  function u(d) {
    return o && i && yt(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(d)) : t(d);
  }
}
function m2(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return s !== 87 && s !== 119 || !mc.call(r, r.previous) || os(r.events) ? t(s) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(d2, e.attempt(uc, e.attempt(dc, o), t), t)(s));
  }
  function o(s) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(s);
  }
}
function g2(e, n, t) {
  const r = this;
  let i = "", o = !1;
  return s;
  function s(d) {
    return (d === 72 || d === 104) && gc.call(r, r.previous) && !os(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(d), e.consume(d), a) : t(d);
  }
  function a(d) {
    if (yt(d) && i.length < 5)
      return i += String.fromCodePoint(d), e.consume(d), a;
    if (d === 58) {
      const h = i.toLowerCase();
      if (h === "http" || h === "https")
        return e.consume(d), c;
    }
    return t(d);
  }
  function c(d) {
    return d === 47 ? (e.consume(d), o ? l : (o = !0, c)) : t(d);
  }
  function l(d) {
    return d === null || di(d) || Be(d) || Hn(d) || bi(d) ? t(d) : e.attempt(uc, e.attempt(dc, u), t)(d);
  }
  function u(d) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(d);
  }
}
function _2(e, n, t) {
  let r = 0;
  return i;
  function i(s) {
    return (s === 87 || s === 119) && r < 3 ? (r++, e.consume(s), i) : s === 46 && r === 3 ? (e.consume(s), o) : t(s);
  }
  function o(s) {
    return s === null ? t(s) : n(s);
  }
}
function b2(e, n, t) {
  let r, i, o;
  return s;
  function s(l) {
    return l === 46 || l === 95 ? e.check(fc, c, a)(l) : l === null || Be(l) || Hn(l) || l !== 45 && bi(l) ? c(l) : (o = !0, e.consume(l), s);
  }
  function a(l) {
    return l === 95 ? r = !0 : (i = r, r = void 0), e.consume(l), s;
  }
  function c(l) {
    return i || r || !o ? t(l) : n(l);
  }
}
function y2(e, n) {
  let t = 0, r = 0;
  return i;
  function i(s) {
    return s === 40 ? (t++, e.consume(s), i) : s === 41 && r < t ? o(s) : s === 33 || s === 34 || s === 38 || s === 39 || s === 41 || s === 42 || s === 44 || s === 46 || s === 58 || s === 59 || s === 60 || s === 63 || s === 93 || s === 95 || s === 126 ? e.check(fc, n, o)(s) : s === null || Be(s) || Hn(s) ? n(s) : (e.consume(s), i);
  }
  function o(s) {
    return s === 41 && r++, e.consume(s), i;
  }
}
function k2(e, n, t) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), o) : a === 93 ? (e.consume(a), i) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || Be(a) || Hn(a) ? n(a) : t(a)
    );
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || Be(a) || Hn(a) ? n(a) : r(a);
  }
  function o(a) {
    return yt(a) ? s(a) : t(a);
  }
  function s(a) {
    return a === 59 ? (e.consume(a), r) : yt(a) ? (e.consume(a), s) : t(a);
  }
}
function w2(e, n, t) {
  return r;
  function r(o) {
    return e.consume(o), i;
  }
  function i(o) {
    return pt(o) ? t(o) : n(o);
  }
}
function mc(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || Be(e);
}
function gc(e) {
  return !yt(e);
}
function _c(e) {
  return !(e === 47 || So(e));
}
function So(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || pt(e);
}
function os(e) {
  let n = e.length, t = !1;
  for (; n--; ) {
    const r = e[n][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      t = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      t = !1;
      break;
    }
  }
  return e.length > 0 && !t && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), t;
}
const x2 = {
  tokenize: A2,
  partial: !0
};
function v2() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: N2,
        continuation: {
          tokenize: $2
        },
        exit: I2
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: C2
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: E2,
        resolveTo: S2
      }
    }
  };
}
function E2(e, n, t) {
  const r = this;
  let i = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let s;
  for (; i--; ) {
    const c = r.events[i][1];
    if (c.type === "labelImage") {
      s = c;
      break;
    }
    if (c.type === "gfmFootnoteCall" || c.type === "labelLink" || c.type === "label" || c.type === "image" || c.type === "link")
      break;
  }
  return a;
  function a(c) {
    if (!s || !s._balanced)
      return t(c);
    const l = Zt(r.sliceSerialize({
      start: s.end,
      end: r.now()
    }));
    return l.codePointAt(0) !== 94 || !o.includes(l.slice(1)) ? t(c) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), n(c));
  }
}
function S2(e, n) {
  let t = e.length;
  for (; t--; )
    if (e[t][1].type === "labelImage" && e[t][0] === "enter") {
      e[t][1];
      break;
    }
  e[t + 1][1].type = "data", e[t + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[t + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, s = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, o.start),
    end: Object.assign({}, o.end)
  }, a = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[t + 1],
    e[t + 2],
    ["enter", r, n],
    // The `[`
    e[t + 3],
    e[t + 4],
    // The `^`.
    ["enter", i, n],
    ["exit", i, n],
    // Everything in between.
    ["enter", o, n],
    ["enter", s, n],
    ["exit", s, n],
    ["exit", o, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...a), e;
}
function C2(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, s;
  return a;
  function a(d) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(d), e.exit("gfmFootnoteCallLabelMarker"), c;
  }
  function c(d) {
    return d !== 94 ? t(d) : (e.enter("gfmFootnoteCallMarker"), e.consume(d), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l);
  }
  function l(d) {
    if (
      // Too long.
      o > 999 || // Closing brace with nothing.
      d === 93 && !s || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      d === null || d === 91 || Be(d)
    )
      return t(d);
    if (d === 93) {
      e.exit("chunkString");
      const h = e.exit("gfmFootnoteCallString");
      return i.includes(Zt(r.sliceSerialize(h))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(d), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(d);
    }
    return Be(d) || (s = !0), o++, e.consume(d), d === 92 ? u : l;
  }
  function u(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), o++, l) : l(d);
  }
}
function N2(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, s = 0, a;
  return c;
  function c(m) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(m), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
  }
  function l(m) {
    return m === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(m), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : t(m);
  }
  function u(m) {
    if (
      // Too long.
      s > 999 || // Closing brace with nothing.
      m === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      m === null || m === 91 || Be(m)
    )
      return t(m);
    if (m === 93) {
      e.exit("chunkString");
      const y = e.exit("gfmFootnoteDefinitionLabelString");
      return o = Zt(r.sliceSerialize(y)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(m), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), h;
    }
    return Be(m) || (a = !0), s++, e.consume(m), m === 92 ? d : u;
  }
  function d(m) {
    return m === 91 || m === 92 || m === 93 ? (e.consume(m), s++, u) : u(m);
  }
  function h(m) {
    return m === 58 ? (e.enter("definitionMarker"), e.consume(m), e.exit("definitionMarker"), i.includes(o) || i.push(o), Le(e, f, "gfmFootnoteDefinitionWhitespace")) : t(m);
  }
  function f(m) {
    return n(m);
  }
}
function $2(e, n, t) {
  return e.check(Dr, n, e.attempt(x2, n, t));
}
function I2(e) {
  e.exit("gfmFootnoteDefinition");
}
function A2(e, n, t) {
  const r = this;
  return Le(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "gfmFootnoteDefinitionIndent" && s[2].sliceSerialize(s[1], !0).length === 4 ? n(o) : t(o);
  }
}
function M2(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: i
  };
  return t == null && (t = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function i(s, a) {
    let c = -1;
    for (; ++c < s.length; )
      if (s[c][0] === "enter" && s[c][1].type === "strikethroughSequenceTemporary" && s[c][1]._close) {
        let l = c;
        for (; l--; )
          if (s[l][0] === "exit" && s[l][1].type === "strikethroughSequenceTemporary" && s[l][1]._open && // If the sizes are the same:
          s[c][1].end.offset - s[c][1].start.offset === s[l][1].end.offset - s[l][1].start.offset) {
            s[c][1].type = "strikethroughSequence", s[l][1].type = "strikethroughSequence";
            const u = {
              type: "strikethrough",
              start: Object.assign({}, s[l][1].start),
              end: Object.assign({}, s[c][1].end)
            }, d = {
              type: "strikethroughText",
              start: Object.assign({}, s[l][1].end),
              end: Object.assign({}, s[c][1].start)
            }, h = [["enter", u, a], ["enter", s[l][1], a], ["exit", s[l][1], a], ["enter", d, a]], f = a.parser.constructs.insideSpan.null;
            f && Ot(h, h.length, 0, yi(f, s.slice(l + 1, c), a)), Ot(h, h.length, 0, [["exit", d, a], ["enter", s[c][1], a], ["exit", s[c][1], a], ["exit", u, a]]), Ot(s, l - 1, c - l + 3, h), c = l + h.length - 2;
            break;
          }
      }
    for (c = -1; ++c < s.length; )
      s[c][1].type === "strikethroughSequenceTemporary" && (s[c][1].type = "data");
    return s;
  }
  function o(s, a, c) {
    const l = this.previous, u = this.events;
    let d = 0;
    return h;
    function h(m) {
      return l === 126 && u[u.length - 1][1].type !== "characterEscape" ? c(m) : (s.enter("strikethroughSequenceTemporary"), f(m));
    }
    function f(m) {
      const y = ar(l);
      if (m === 126)
        return d > 1 ? c(m) : (s.consume(m), d++, f);
      if (d < 2 && !t) return c(m);
      const _ = s.exit("strikethroughSequenceTemporary"), b = ar(m);
      return _._open = !b || b === 2 && !!y, _._close = !y || y === 2 && !!b, a(m);
    }
  }
}
class L2 {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(n, t, r) {
    R2(this, n, t, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(n) {
    if (this.map.sort(function(o, s) {
      return o[0] - s[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const o of i)
        n.push(o);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function R2(e, n, t, r) {
  let i = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === n) {
        e.map[i][1] += t, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([n, t, r]);
  }
}
function T2(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const i = e[n];
    if (t) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function D2() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: P2,
        resolveAll: O2
      }
    }
  };
}
function P2(e, n, t) {
  const r = this;
  let i = 0, o = 0, s;
  return a;
  function a(N) {
    let T = r.events.length - 1;
    for (; T > -1; ) {
      const F = r.events[T][1].type;
      if (F === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      F === "linePrefix") T--;
      else break;
    }
    const L = T > -1 ? r.events[T][1].type : null, j = L === "tableHead" || L === "tableRow" ? w : c;
    return j === w && r.parser.lazy[r.now().line] ? t(N) : j(N);
  }
  function c(N) {
    return e.enter("tableHead"), e.enter("tableRow"), l(N);
  }
  function l(N) {
    return N === 124 || (s = !0, o += 1), u(N);
  }
  function u(N) {
    return N === null ? t(N) : de(N) ? o > 1 ? (o = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(N), e.exit("lineEnding"), f) : t(N) : $e(N) ? Le(e, u, "whitespace")(N) : (o += 1, s && (s = !1, i += 1), N === 124 ? (e.enter("tableCellDivider"), e.consume(N), e.exit("tableCellDivider"), s = !0, u) : (e.enter("data"), d(N)));
  }
  function d(N) {
    return N === null || N === 124 || Be(N) ? (e.exit("data"), u(N)) : (e.consume(N), N === 92 ? h : d);
  }
  function h(N) {
    return N === 92 || N === 124 ? (e.consume(N), d) : d(N);
  }
  function f(N) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(N) : (e.enter("tableDelimiterRow"), s = !1, $e(N) ? Le(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(N) : m(N));
  }
  function m(N) {
    return N === 45 || N === 58 ? _(N) : N === 124 ? (s = !0, e.enter("tableCellDivider"), e.consume(N), e.exit("tableCellDivider"), y) : v(N);
  }
  function y(N) {
    return $e(N) ? Le(e, _, "whitespace")(N) : _(N);
  }
  function _(N) {
    return N === 58 ? (o += 1, s = !0, e.enter("tableDelimiterMarker"), e.consume(N), e.exit("tableDelimiterMarker"), b) : N === 45 ? (o += 1, b(N)) : N === null || de(N) ? S(N) : v(N);
  }
  function b(N) {
    return N === 45 ? (e.enter("tableDelimiterFiller"), k(N)) : v(N);
  }
  function k(N) {
    return N === 45 ? (e.consume(N), k) : N === 58 ? (s = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(N), e.exit("tableDelimiterMarker"), g) : (e.exit("tableDelimiterFiller"), g(N));
  }
  function g(N) {
    return $e(N) ? Le(e, S, "whitespace")(N) : S(N);
  }
  function S(N) {
    return N === 124 ? m(N) : N === null || de(N) ? !s || i !== o ? v(N) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(N)) : v(N);
  }
  function v(N) {
    return t(N);
  }
  function w(N) {
    return e.enter("tableRow"), $(N);
  }
  function $(N) {
    return N === 124 ? (e.enter("tableCellDivider"), e.consume(N), e.exit("tableCellDivider"), $) : N === null || de(N) ? (e.exit("tableRow"), n(N)) : $e(N) ? Le(e, $, "whitespace")(N) : (e.enter("data"), A(N));
  }
  function A(N) {
    return N === null || N === 124 || Be(N) ? (e.exit("data"), $(N)) : (e.consume(N), N === 92 ? D : A);
  }
  function D(N) {
    return N === 92 || N === 124 ? (e.consume(N), A) : A(N);
  }
}
function O2(e, n) {
  let t = -1, r = !0, i = 0, o = [0, 0, 0, 0], s = [0, 0, 0, 0], a = !1, c = 0, l, u, d;
  const h = new L2();
  for (; ++t < e.length; ) {
    const f = e[t], m = f[1];
    f[0] === "enter" ? m.type === "tableHead" ? (a = !1, c !== 0 && (Oa(h, n, c, l, u), u = void 0, c = 0), l = {
      type: "table",
      start: Object.assign({}, m.start),
      // Note: correct end is set later.
      end: Object.assign({}, m.end)
    }, h.add(t, 0, [["enter", l, n]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, d = void 0, o = [0, 0, 0, 0], s = [0, t + 1, 0, 0], a && (a = !1, u = {
      type: "tableBody",
      start: Object.assign({}, m.start),
      // Note: correct end is set later.
      end: Object.assign({}, m.end)
    }, h.add(t, 0, [["enter", u, n]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, s[2] === 0 && (o[1] !== 0 && (s[0] = s[1], d = ii(h, n, o, i, void 0, d), o = [0, 0, 0, 0]), s[2] = t)) : m.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (s[0] = s[1], d = ii(h, n, o, i, void 0, d)), o = s, s = [o[1], t, 0, 0])) : m.type === "tableHead" ? (a = !0, c = t) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = t, o[1] !== 0 ? (s[0] = s[1], d = ii(h, n, o, i, t, d)) : s[1] !== 0 && (d = ii(h, n, s, i, t, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (s[3] = t);
  }
  for (c !== 0 && Oa(h, n, c, l, u), h.consume(n.events), t = -1; ++t < n.events.length; ) {
    const f = n.events[t];
    f[0] === "enter" && f[1].type === "table" && (f[1]._align = T2(n.events, t));
  }
  return e;
}
function ii(e, n, t, r, i, o) {
  const s = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  t[0] !== 0 && (o.end = Object.assign({}, ir(n.events, t[0])), e.add(t[0], 0, [["exit", o, n]]));
  const c = ir(n.events, t[1]);
  if (o = {
    type: s,
    start: Object.assign({}, c),
    // Note: correct end is set later.
    end: Object.assign({}, c)
  }, e.add(t[1], 0, [["enter", o, n]]), t[2] !== 0) {
    const l = ir(n.events, t[2]), u = ir(n.events, t[3]), d = {
      type: a,
      start: Object.assign({}, l),
      end: Object.assign({}, u)
    };
    if (e.add(t[2], 0, [["enter", d, n]]), r !== 2) {
      const h = n.events[t[2]], f = n.events[t[3]];
      if (h[1].end = Object.assign({}, f[1].end), h[1].type = "chunkText", h[1].contentType = "text", t[3] > t[2] + 1) {
        const m = t[2] + 1, y = t[3] - t[2] - 1;
        e.add(m, y, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", d, n]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, ir(n.events, i)), e.add(i, 0, [["exit", o, n]]), o = void 0), o;
}
function Oa(e, n, t, r, i) {
  const o = [], s = ir(n.events, t);
  i && (i.end = Object.assign({}, s), o.push(["exit", i, n])), r.end = Object.assign({}, s), o.push(["exit", r, n]), e.add(t + 1, 0, o);
}
function ir(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const z2 = {
  name: "tasklistCheck",
  tokenize: F2
};
function B2() {
  return {
    text: {
      91: z2
    }
  };
}
function F2(e, n, t) {
  const r = this;
  return i;
  function i(c) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(c) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(c), e.exit("taskListCheckMarker"), o)
    );
  }
  function o(c) {
    return Be(c) ? (e.enter("taskListCheckValueUnchecked"), e.consume(c), e.exit("taskListCheckValueUnchecked"), s) : c === 88 || c === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(c), e.exit("taskListCheckValueChecked"), s) : t(c);
  }
  function s(c) {
    return c === 93 ? (e.enter("taskListCheckMarker"), e.consume(c), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : t(c);
  }
  function a(c) {
    return de(c) ? n(c) : $e(c) ? e.check({
      tokenize: j2
    }, n, t)(c) : t(c);
  }
}
function j2(e, n, t) {
  return Le(e, r, "whitespace");
  function r(i) {
    return i === null ? t(i) : n(i);
  }
}
function H2(e) {
  return $l([
    p2(),
    v2(),
    M2(e),
    D2(),
    B2()
  ]);
}
const q2 = {};
function U2(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || q2, r = n.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), s = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(H2(t)), o.push(c2()), s.push(u2(t));
}
const W2 = "_actions_18y0c_1", G2 = "_root_18y0c_8", V2 = "_centered_18y0c_11", so = {
  actions: W2,
  root: G2,
  centered: V2
};
function Co(e) {
  return String(e).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
function X2(e) {
  return Co(
    Array.isArray(e) ? e.map((n) => typeof n == "string" ? n : "").join("") : String(e ?? "")
  );
}
const K2 = ["h1", "h2", "h3", "h4", "h5", "h6"].reduce((e, n) => (e[n] = ({ children: t, ...r }) => {
  const i = X2(t);
  return Ve.createElement(n, { id: i, ...r }, t);
}, e), {});
function BI(e) {
  const n = e.split(`
`), t = [];
  let r = null;
  for (const i of n) {
    const o = i.match(/^##\s+(.+)/), s = i.match(/^#\s+(.+)/);
    if (o) {
      const a = o[1].trim(), c = { label: a, href: `#${Co(a)}` };
      r ? (r.children = r.children ?? [], r.children.push(c)) : t.push(c);
    } else if (s) {
      const a = s[1].trim();
      r = { label: a, href: `#${Co(a)}` }, t.push(r);
    }
  }
  return t;
}
function Y2(e) {
  const n = e.match(/^#\s+(.+)/m);
  return n ? n[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".md" : "document.md";
}
function FI({ content: e, centered: n = !0, maxWidth: t, className: r }) {
  const [i, o] = U(!1), s = () => {
    navigator.clipboard.writeText(e).catch((c) => {
      console.error("[DocPage] Clipboard write failed:", c);
    }), o(!0), setTimeout(() => o(!1), 1500);
  }, a = () => {
    const c = new Blob([e], { type: "text/markdown" }), l = URL.createObjectURL(c), u = document.createElement("a");
    u.href = l, u.download = Y2(e), u.click(), URL.revokeObjectURL(l);
  };
  return /* @__PURE__ */ M(
    "div",
    {
      className: [so.root, n && so.centered, r].filter(Boolean).join(" "),
      style: t !== void 0 ? { maxWidth: t } : void 0,
      children: [
        /* @__PURE__ */ M("div", { className: so.actions, children: [
          /* @__PURE__ */ p(
            ze,
            {
              icon: i ? $o : Cu,
              size: "sm",
              onClick: s,
              "aria-label": "Copy as markdown",
              tooltip: "Copy as markdown"
            }
          ),
          /* @__PURE__ */ p(
            ze,
            {
              icon: qa,
              size: "sm",
              onClick: a,
              "aria-label": "Download .md",
              tooltip: "Download .md"
            }
          )
        ] }),
        /* @__PURE__ */ p(ME, { remarkPlugins: [U2], components: K2, children: e })
      ]
    }
  );
}
const Z2 = "_footer_fnr00_1", Q2 = "_border_fnr00_11", J2 = "_alignLeft_fnr00_15", eC = "_alignCenter_fnr00_19", tC = "_alignRight_fnr00_23", Ar = {
  footer: Z2,
  border: Q2,
  alignLeft: J2,
  alignCenter: eC,
  alignRight: tC
}, nC = {
  left: Ar.alignLeft,
  center: Ar.alignCenter,
  right: Ar.alignRight
}, jI = ({
  children: e,
  align: n = "right",
  border: t = !0,
  className: r = ""
}) => {
  const i = [
    Ar.footer,
    nC[n],
    t && Ar.border,
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("footer", { className: i, children: e });
}, rC = "_root_qdh7w_1", iC = "_content_qdh7w_14", oC = "_title_qdh7w_21", sC = "_description_qdh7w_28", aC = "_actions_qdh7w_35", Er = {
  root: rC,
  content: iC,
  title: oC,
  description: sC,
  actions: aC
}, HI = ({
  title: e,
  description: n,
  actions: t,
  className: r = ""
}) => /* @__PURE__ */ M("div", { className: `${Er.root} ${r}`, children: [
  /* @__PURE__ */ M("div", { className: Er.content, children: [
    /* @__PURE__ */ p("h1", { className: Er.title, children: e }),
    n && /* @__PURE__ */ p("p", { className: Er.description, children: n })
  ] }),
  t && /* @__PURE__ */ p("div", { className: Er.actions, children: t })
] }), lC = "_wrapper_1itot_1", cC = "_row_1itot_5", uC = "_content_1itot_12", dC = "_title_1itot_16", fC = "_description_1itot_21", pC = "_lg_1itot_26", hC = "_md_1itot_37", mC = "_sm_1itot_48", gC = "_actions_1itot_59", zn = {
  wrapper: lC,
  row: cC,
  content: uC,
  title: dC,
  description: fC,
  lg: pC,
  md: hC,
  sm: mC,
  actions: gC
}, _C = {
  lg: "h2",
  md: "h3",
  sm: "h4"
}, qI = ({
  title: e,
  description: n,
  size: t = "md",
  actions: r,
  className: i = ""
}) => {
  const o = ln(t, "md"), s = _C[o];
  return /* @__PURE__ */ p("div", { className: `${zn.wrapper} ${i}`, children: /* @__PURE__ */ M("div", { className: zn.row, children: [
    /* @__PURE__ */ M("div", { className: `${zn.content} ${zn[o]}`, children: [
      /* @__PURE__ */ p(s, { className: zn.title, children: e }),
      n && /* @__PURE__ */ p("p", { className: zn.description, children: n })
    ] }),
    r && /* @__PURE__ */ p("div", { className: zn.actions, children: r })
  ] }) });
}, bc = "(max-width: 767px)";
function yc(e) {
  const [n, t] = U(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches);
  return ae(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const r = window.matchMedia(e), i = (o) => {
      t(o.matches);
    };
    return t(r.matches), r.addEventListener("change", i), () => r.removeEventListener("change", i);
  }, [e]), n;
}
const bC = "_appLayout_1kk39_1", yC = "_topNav_1kk39_8", kC = "_body_1kk39_15", wC = "_sideNav_1kk39_20", xC = "_content_1kk39_32", vC = "_panel_1kk39_37", nr = {
  appLayout: bC,
  topNav: yC,
  body: kC,
  sideNav: wC,
  content: xC,
  panel: vC
}, UI = ({
  topNav: e,
  sideNav: n,
  sideNavWidth: t,
  panel: r,
  children: i,
  mobileNavOpen: o = !1,
  onMobileNavOpenChange: s,
  className: a = ""
}) => {
  const c = yc(bc), l = t !== void 0 ? { width: typeof t == "number" ? `${t}px` : t } : void 0, u = typeof t == "number" ? t : typeof t == "string" && /^\d+$/.test(t) ? Number(t) : 320;
  return /* @__PURE__ */ M("div", { className: `${nr.appLayout} ${a}`, children: [
    /* @__PURE__ */ p("div", { className: nr.topNav, children: e }),
    /* @__PURE__ */ M("div", { className: nr.body, children: [
      n && /* @__PURE__ */ p("div", { className: nr.sideNav, style: l, children: c ? null : n }),
      /* @__PURE__ */ p("div", { className: nr.content, children: i }),
      r && /* @__PURE__ */ p("div", { className: nr.panel, children: r })
    ] }),
    n && /* @__PURE__ */ p(
      a0,
      {
        isOpen: c && o,
        onClose: () => s == null ? void 0 : s(!1),
        side: "left",
        width: u,
        "data-testid": "app-layout-mobile-nav",
        children: c ? n : null
      }
    )
  ] });
}, EC = "_root_9igar_1", SC = "_column_9igar_6", CC = "_row_9igar_7", NC = "_alignStart_9igar_9", $C = "_alignCenter_9igar_10", IC = "_alignEnd_9igar_11", AC = "_alignStretch_9igar_12", MC = "_wrap_9igar_14", Nn = {
  root: EC,
  column: SC,
  row: CC,
  alignStart: NC,
  alignCenter: $C,
  alignEnd: IC,
  alignStretch: AC,
  wrap: MC
};
function WI({
  direction: e = "column",
  gap: n = "m",
  align: t = "stretch",
  wrap: r = !1,
  className: i,
  style: o,
  children: s,
  ...a
}) {
  const c = {
    start: Nn.alignStart,
    center: Nn.alignCenter,
    end: Nn.alignEnd,
    stretch: Nn.alignStretch
  }[t];
  return /* @__PURE__ */ p(
    "div",
    {
      className: [
        Nn.root,
        e === "row" ? Nn.row : Nn.column,
        c,
        r && Nn.wrap,
        i
      ].filter(Boolean).join(" "),
      style: { "--stack-gap": `var(--admin-space-${n})`, ...o },
      ...a,
      children: s
    }
  );
}
const LC = "_root_aclsr_1", RC = "_cols2_aclsr_6", TC = "_cols3_aclsr_7", DC = "_cols4_aclsr_8", oi = {
  root: LC,
  cols2: RC,
  cols3: TC,
  cols4: DC
};
function GI({
  count: e = 2,
  gap: n = "m",
  className: t,
  style: r,
  children: i,
  ...o
}) {
  const s = {
    2: oi.cols2,
    3: oi.cols3,
    4: oi.cols4
  }[e];
  return /* @__PURE__ */ p(
    "div",
    {
      className: [oi.root, s, t].filter(Boolean).join(" "),
      style: { "--columns-gap": `var(--admin-space-${n})`, ...r },
      ...o,
      children: i
    }
  );
}
const PC = "_root_la9pg_1", OC = {
  root: PC
};
function VI({ gap: e = "m", className: n, style: t, children: r, ...i }) {
  return /* @__PURE__ */ p(
    "div",
    {
      className: [OC.root, n].filter(Boolean).join(" "),
      style: { "--card-grid-gap": `var(--admin-space-${e})`, ...t },
      ...i,
      children: r
    }
  );
}
const zC = "_root_16rwa_1", BC = "_section_16rwa_6", FC = "_bare_16rwa_14", jC = "_header_16rwa_21", HC = "_description_16rwa_27", qC = "_items_16rwa_33", UC = "_link_16rwa_40", WC = "_separator_16rwa_60", $n = {
  root: zC,
  section: BC,
  bare: FC,
  header: jC,
  description: HC,
  items: qC,
  link: UC,
  separator: WC
};
function XI({ sections: e, bare: n, className: t, ...r }) {
  return /* @__PURE__ */ p("div", { className: [$n.root, t].filter(Boolean).join(" "), ...r, children: e.map((i, o) => /* @__PURE__ */ M("div", { className: [$n.section, n ? $n.bare : void 0].filter(Boolean).join(" "), children: [
    i.header && /* @__PURE__ */ p("h2", { className: $n.header, children: i.header }),
    i.description && /* @__PURE__ */ p("p", { className: $n.description, children: i.description }),
    /* @__PURE__ */ p("div", { className: $n.items, children: i.items.map((s, a) => /* @__PURE__ */ M(Ve.Fragment, { children: [
      /* @__PURE__ */ p("button", { className: $n.link, onClick: s.onClick, children: s.label }),
      a < i.items.length - 1 && /* @__PURE__ */ p("span", { "aria-hidden": !0, className: $n.separator, children: "/" })
    ] }, s.id)) })
  ] }, o)) });
}
const GC = "_sideNav_j8ym4_5", VC = "_tabbedRow_j8ym4_30", XC = "_nav_j8ym4_36", KC = "_tabContent_j8ym4_42", YC = "_toggleButton_j8ym4_56", ZC = "_collapsed_j8ym4_70", QC = "_globalSearchWrapper_j8ym4_78", JC = "_searchWrapper_j8ym4_83", eN = "_noResults_j8ym4_88", tN = "_navWrapper_j8ym4_95", nN = "_list_j8ym4_111", rN = "_footer_j8ym4_117", iN = "_section_j8ym4_124", oN = "_sectionLabel_j8ym4_132", sN = "_sectionLabelCollapsible_j8ym4_140", aN = "_sectionChevron_j8ym4_169", lN = "_sectionChevronClosed_j8ym4_175", cN = "_collapsibleSection_j8ym4_189", uN = "_collapsibleSectionOpen_j8ym4_194", dN = "_topLevelSection_j8ym4_200", fN = "_topLevelSectionWithBorder_j8ym4_205", pN = "_topLevelHeader_j8ym4_209", hN = "_topLevelLabel_j8ym4_235", mN = "_topLevelChevron_j8ym4_240", gN = "_topLevelChevronClosed_j8ym4_247", _N = "_topLevelContent_j8ym4_251", Pe = {
  sideNav: GC,
  tabbedRow: VC,
  nav: XC,
  tabContent: KC,
  toggleButton: YC,
  collapsed: ZC,
  globalSearchWrapper: QC,
  searchWrapper: JC,
  noResults: eN,
  navWrapper: tN,
  list: nN,
  footer: rN,
  section: iN,
  sectionLabel: oN,
  sectionLabelCollapsible: sN,
  sectionChevron: aN,
  sectionChevronClosed: lN,
  collapsibleSection: cN,
  collapsibleSectionOpen: uN,
  topLevelSection: dN,
  topLevelSectionWithBorder: fN,
  topLevelHeader: pN,
  topLevelLabel: hN,
  topLevelChevron: mN,
  topLevelChevronClosed: gN,
  topLevelContent: _N
}, bN = ({
  collapsed: e,
  onToggle: n
}) => /* @__PURE__ */ p(
  ze,
  {
    icon: e ? Pu : Du,
    onClick: n,
    size: "sm",
    "aria-label": e ? "Expand sidebar" : "Collapse sidebar",
    tooltip: e ? "Expand sidebar" : "Collapse sidebar",
    className: Pe.toggleButton
  }
), kc = Dc({
  onSelect: () => {
  },
  highContrast: !1,
  fullWidth: !1,
  activeId: void 0
});
function yN() {
  return Pc(kc);
}
const kN = "_button_1yxs4_1", wN = "_active_1yxs4_30", xN = "_index_1yxs4_34", vN = "_detail_1yxs4_35", EN = "_highContrast_1yxs4_40", SN = "_child_1yxs4_45", CN = "_hasDetail_1yxs4_49", NN = "_fullWidth_1yxs4_54", $N = "_label_1yxs4_68", IN = "_nestedList_1yxs4_86", AN = "_badge_1yxs4_96", Bt = {
  button: kN,
  "button--group": "_button--group_1yxs4_2",
  active: wN,
  index: xN,
  detail: vN,
  highContrast: EN,
  child: SN,
  hasDetail: CN,
  fullWidth: NN,
  label: $N,
  nestedList: IN,
  badge: AN
}, MN = Ve.memo(function e({
  item: n,
  className: t = "",
  child: r = !1
}) {
  const { onSelect: i, highContrast: o, fullWidth: s, activeId: a } = yN(), c = n.id === a, l = o ? Bt.highContrast : "", u = s ? Bt.fullWidth : "", d = Bt["button--group"], h = !!n.children && n.children.length > 0, f = !!n.detail, m = /* @__PURE__ */ M(kt, { children: [
    n.index !== void 0 && /* @__PURE__ */ p("span", { className: Bt.index, children: n.index }),
    /* @__PURE__ */ p("span", { className: Bt.label, children: n.label }),
    n.badge && /* @__PURE__ */ p("span", { className: Bt.badge }),
    n.detail && /* @__PURE__ */ p("span", { className: Bt.detail, children: n.detail })
  ] }), y = [
    h ? d : Bt.button,
    c ? Bt.active : "",
    l,
    u,
    t,
    r ? Bt.child : "",
    f ? Bt.hasDetail : ""
  ].filter(Boolean).join(" "), _ = /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: y,
      "data-nav-id": n.id,
      "data-nav-child": r ? "true" : void 0,
      "data-sidenav-item": "",
      "aria-current": c ? "page" : void 0,
      onClick: () => i(n.id),
      onContextMenu: (b) => {
        var k;
        return (k = n.onContextMenu) == null ? void 0 : k.call(n, n.id, b);
      },
      children: m
    }
  );
  return h ? /* @__PURE__ */ M("li", { children: [
    _,
    /* @__PURE__ */ p("ul", { className: Bt.nestedList, children: n.children.map((b) => /* @__PURE__ */ p(e, { child: !0, item: b }, b.id)) })
  ] }) : /* @__PURE__ */ p("li", { children: _ });
}), ss = ({ section: e }) => {
  const n = e.collapsible && !!e.label, [t, r] = U(e.defaultOpen !== !1), i = e.label ? `section-${e.label.replace(/\s+/g, "-").toLowerCase()}` : void 0;
  return /* @__PURE__ */ M("div", { className: `${Pe.section}${n ? ` ${Pe.collapsibleSection}` : ""}${n && t ? ` ${Pe.collapsibleSectionOpen}` : ""}`, children: [
    e.label && (n ? /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        className: Pe.sectionLabelCollapsible,
        onClick: () => r((o) => !o),
        "aria-expanded": t,
        "aria-controls": i,
        "data-sidenav-item": "",
        children: [
          /* @__PURE__ */ p("span", { children: e.label }),
          /* @__PURE__ */ p(
            gi,
            {
              size: 12,
              className: `${Pe.sectionChevron} ${t ? "" : Pe.sectionChevronClosed}`
            }
          )
        ]
      }
    ) : /* @__PURE__ */ p("p", { className: Pe.sectionLabel, children: e.label })),
    (!n || t) && /* @__PURE__ */ p("ul", { className: Pe.list, id: i, children: e.items.map((o) => /* @__PURE__ */ p(MN, { item: o }, o.id)) })
  ] });
}, LN = ({
  section: e,
  isLast: n = !1
}) => {
  const [t, r] = U(e.defaultOpen ?? !0);
  return /* @__PURE__ */ M("div", { className: `${Pe.topLevelSection}${n ? "" : ` ${Pe.topLevelSectionWithBorder}`}`, children: [
    /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        className: Pe.topLevelHeader,
        onClick: () => r((i) => !i),
        "aria-expanded": t,
        "aria-controls": `sidenav-toplevel-${e.label.replace(/\s+/g, "-").toLowerCase()}`,
        "data-sidenav-item": "",
        children: [
          /* @__PURE__ */ p("span", { className: Pe.topLevelLabel, children: e.label }),
          /* @__PURE__ */ p(
            gi,
            {
              size: 16,
              className: `${Pe.topLevelChevron} ${t ? "" : Pe.topLevelChevronClosed}`,
              "aria-hidden": !0
            }
          )
        ]
      }
    ),
    t && /* @__PURE__ */ p(
      "div",
      {
        id: `sidenav-toplevel-${e.label.replace(/\s+/g, "-").toLowerCase()}`,
        className: Pe.topLevelContent,
        role: "region",
        children: e.sections.map((i, o) => /* @__PURE__ */ p(
          ss,
          {
            section: i
          },
          i.label ?? `__section_${o}`
        ))
      }
    )
  ] });
}, RN = ({
  sections: e,
  topLevelSections: n,
  searchActive: t
}) => n.length > 0 ? /* @__PURE__ */ M(kt, { children: [
  n.map((i, o) => /* @__PURE__ */ p(
    LN,
    {
      section: i,
      isLast: o === n.length - 1
    },
    i.label
  )),
  t && n.length === 0 && /* @__PURE__ */ p("p", { className: Pe.noResults, children: "No results" })
] }) : /* @__PURE__ */ M(kt, { children: [
  e.map((i, o) => /* @__PURE__ */ p(
    ss,
    {
      section: i
    },
    i.label ?? `__section_${o}`
  )),
  t && e.length === 0 && /* @__PURE__ */ p("p", { className: Pe.noResults, children: "No results" })
] }), wc = Ve.forwardRef(
  ({ results: e }, n) => /* @__PURE__ */ p("div", { ref: n, className: Pe.navWrapper, children: /* @__PURE__ */ p("nav", { className: Pe.nav, "aria-label": "Primary navigation", children: e.length > 0 ? e.flatMap(
    ({ tab: t, sections: r }) => r.map((i, o) => /* @__PURE__ */ M("div", { className: Pe.section, children: [
      /* @__PURE__ */ p("p", { className: Pe.sectionLabel, children: i.label ? `${t.label} / ${i.label}` : t.label }),
      /* @__PURE__ */ p(ss, { section: { ...i, label: void 0 } })
    ] }, `${t.id}-${o}`))
  ) : /* @__PURE__ */ p("p", { className: Pe.noResults, children: "No results" }) }) })
);
wc.displayName = "SideNavGlobalSearchView";
const za = ({
  value: e,
  onChange: n,
  placeholder: t,
  icon: r,
  variant: i = "local"
}) => /* @__PURE__ */ p(
  "div",
  {
    className: i === "global" ? Pe.globalSearchWrapper : Pe.searchWrapper,
    children: /* @__PURE__ */ p(
      ul,
      {
        value: e,
        onChange: n,
        placeholder: t,
        icon: r
      }
    )
  }
), TN = "_tabStrip_fyaf9_1", DN = "_separator_fyaf9_17", PN = "_tab_fyaf9_1", ON = "_active_fyaf9_52", zN = "_highContrast_fyaf9_62", BN = "_tabIcon_fyaf9_69", rr = {
  tabStrip: TN,
  separator: DN,
  tab: PN,
  active: ON,
  highContrast: zN,
  tabIcon: BN
}, FN = ({
  tabs: e,
  activeTabId: n,
  onTabSelect: t,
  highContrast: r = !1
}) => /* @__PURE__ */ p("nav", { className: rr.tabStrip, "aria-label": "Tab navigation", children: e.map((i) => {
  const o = i.id === n;
  return /* @__PURE__ */ M(Ve.Fragment, { children: [
    i.separator && /* @__PURE__ */ p("hr", { className: rr.separator }),
    /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        className: `${rr.tab} ${o ? rr.active : ""} ${o && r ? rr.highContrast : ""}`,
        onClick: () => t(i.id),
        "aria-current": o ? "page" : void 0,
        children: [
          i.icon && /* @__PURE__ */ p(i.icon, { size: 14, className: rr.tabIcon }),
          i.label
        ]
      }
    )
  ] }, i.id);
}) }), jN = ({
  tabs: e,
  activeTabId: n,
  onTabSelect: t,
  highContrast: r,
  hideTabStrip: i,
  children: o
}) => /* @__PURE__ */ M("div", { className: Pe.tabbedRow, children: [
  !i && /* @__PURE__ */ p(
    FN,
    {
      tabs: e,
      activeTabId: n,
      onTabSelect: t,
      highContrast: r
    }
  ),
  /* @__PURE__ */ p("div", { className: Pe.tabContent, children: o })
] });
function ao(e, n) {
  if (!n) return e;
  const t = n.toLowerCase();
  return e.map((r) => ({
    ...r,
    items: r.items.map((i) => {
      if (i.children) {
        const o = i.children.filter(
          (s) => s.label.toLowerCase().includes(t)
        );
        return i.label.toLowerCase().includes(t) ? i : o.length > 0 ? { ...i, children: o } : null;
      }
      return i.label.toLowerCase().includes(t) ? i : null;
    }).filter((i) => i !== null)
  })).filter((r) => r.items.length > 0);
}
function HN({
  activeTab: e,
  sections: n,
  topLevelSections: t,
  searchable: r,
  searchPlaceholder: i,
  searchIconType: o,
  globalSearchable: s
}) {
  const a = e ? e.sections : n, c = e ? e.topLevelSections : t, l = s ? !1 : e ? e.searchable ?? !1 : r, u = e ? e.searchPlaceholder ?? "Search…" : i, d = e ? e.searchIconType ?? "search" : o;
  return {
    effectiveSections: a,
    effectiveTopLevelSections: c,
    effectiveSearchable: l,
    effectiveSearchPlaceholder: u,
    effectiveSearchIconType: d
  };
}
const qN = 500;
function mi(e) {
  return !(e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true");
}
function UN(e) {
  return Array.from(
    e.querySelectorAll("[data-sidenav-item]")
  ).filter(mi);
}
function Ba(e) {
  const n = e.getAttribute("aria-label");
  return n && n.trim() ? n.trim() : (e.textContent ?? "").trim();
}
function Sr(e, n) {
  const t = Array.from(
    e.querySelectorAll("[data-sidenav-item]")
  ), r = t.filter(mi);
  if (r.length === 0) return;
  const i = n && r.includes(n) ? n : r[0];
  for (const o of t) {
    if (!mi(o)) {
      o.tabIndex = -1;
      continue;
    }
    o.tabIndex = o === i ? 0 : -1;
  }
}
function WN({ onEscape: e } = {}) {
  const n = Y(""), t = Y(null), r = Y(null), i = Y(null), o = K(() => {
    n.current = "", t.current && (clearTimeout(t.current), t.current = null);
  }, []);
  ae(() => () => {
    t.current && clearTimeout(t.current), i.current && i.current.disconnect();
  }, []);
  const s = K(
    (l) => {
      const u = l.currentTarget, d = l.key;
      if (d === "Escape") {
        e && (e(), l.preventDefault()), o();
        return;
      }
      const h = l.target;
      if (h) {
        const k = h.tagName;
        if (k === "INPUT" || k === "TEXTAREA" || k === "SELECT" || h.isContentEditable) return;
      }
      const f = UN(u);
      if (f.length === 0) return;
      const m = document.activeElement, _ = !!m && u.contains(m) && m ? f.indexOf(m) : -1, b = (k) => {
        const g = f[k];
        g && (g.focus(), Sr(u, g));
      };
      if (d === "ArrowDown") {
        l.preventDefault(), o();
        const k = _ < 0 ? 0 : Math.min(f.length - 1, _ + 1);
        b(k);
        return;
      }
      if (d === "ArrowUp") {
        l.preventDefault(), o();
        const k = _ < 0 ? f.length - 1 : Math.max(0, _ - 1);
        b(k);
        return;
      }
      if (d === "Home") {
        l.preventDefault(), o(), b(0);
        return;
      }
      if (d === "End") {
        l.preventDefault(), o(), b(f.length - 1);
        return;
      }
      if (d === "ArrowRight" || d === "ArrowLeft") {
        if (_ < 0) return;
        const k = f[_], g = k.getAttribute("aria-expanded");
        if (g === null) return;
        const S = g === "true";
        (d === "ArrowRight" && !S || d === "ArrowLeft" && S) && (l.preventDefault(), o(), k.click());
        return;
      }
      if (d.length === 1 && !l.ctrlKey && !l.altKey && !l.metaKey) {
        if (d === " ") return;
        const k = d.toLowerCase(), g = n.current, S = g.length > 0 && g.split("").every((D) => D === k);
        n.current = S ? k : g + k;
        const v = n.current;
        t.current && clearTimeout(t.current), t.current = setTimeout(() => {
          n.current = "", t.current = null;
        }, qN);
        const w = f.length, $ = v.length === 1, A = _ < 0 ? -1 : _;
        if (!$ && _ >= 0 && Ba(f[_]).toLowerCase().startsWith(v)) {
          l.preventDefault(), Sr(u, f[_]);
          return;
        }
        for (let D = 1; D <= w; D++) {
          const N = ((A + D) % w + w) % w;
          if (Ba(f[N]).toLowerCase().startsWith(v)) {
            l.preventDefault(), b(N);
            return;
          }
        }
      }
    },
    [e, o]
  ), a = K((l) => {
    const u = r.current;
    if (!u) return;
    const d = l.target;
    !d || !d.hasAttribute("data-sidenav-item") || mi(d) && Sr(u, d);
  }, []), c = K((l) => {
    const u = r.current;
    if (u && u.removeEventListener("focusin", a), i.current && (i.current.disconnect(), i.current = null), r.current = l, !l) return;
    l.addEventListener("focusin", a), Sr(l);
    const d = new MutationObserver(() => {
      const h = r.current;
      if (!h) return;
      const f = document.activeElement, m = f && h.contains(f) && f.hasAttribute("data-sidenav-item") ? f : void 0;
      Sr(h, m);
    });
    d.observe(l, { childList: !0, subtree: !0 }), i.current = d;
  }, [a]);
  return { handleKeyDown: s, containerRef: c };
}
function GN(e, n, t, r) {
  ae(() => {
    !n || !e.current || requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const i = e.current, o = i == null ? void 0 : i.querySelector(
          `[data-nav-id="${CSS.escape(n)}"]`
        );
        if (!o || !i) return;
        const s = i.getBoundingClientRect(), a = o.getBoundingClientRect();
        a.top < s.top ? i.scrollTop += a.top - s.top - t : a.bottom > s.bottom && (i.scrollTop += a.bottom - s.bottom + t);
      });
    });
  }, [n, t, ...r]);
}
const KI = ({
  sections: e,
  topLevelSections: n,
  activeId: t,
  onSelect: r,
  searchable: i = !1,
  searchPlaceholder: o = "Search…",
  searchIconType: s = "search",
  footer: a,
  scrollOffset: c = 40,
  highContrast: l = !1,
  fullWidth: u = !1,
  className: d = "",
  tabs: h,
  activeTabId: f,
  onTabSelect: m,
  collapsible: y = !0,
  defaultCollapsed: _ = !1,
  onCollapsedChange: b,
  globalSearchable: k = !1,
  globalSearchPlaceholder: g = "Search all…",
  globalSearchIconType: S = "search"
}) => {
  const [v, w] = U(""), [$, A] = U(""), [D, N] = U(_), T = Y(null), L = !!h && h.length > 0, j = L ? h.find((Re) => Re.id === f) ?? h[0] : null;
  ae(() => {
    L && w("");
  }, [f]);
  const {
    effectiveSections: F,
    effectiveTopLevelSections: I,
    effectiveSearchable: P,
    effectiveSearchPlaceholder: H,
    effectiveSearchIconType: B
  } = HN({
    activeTab: j,
    sections: e,
    topLevelSections: n,
    searchable: i,
    searchPlaceholder: o,
    searchIconType: s,
    globalSearchable: k
  });
  GN(T, t, c, [F]);
  const O = Ht(
    () => ao(F, v),
    [F, v]
  ), x = Ht(() => I ? v ? I.map((Re) => ({ ...Re, sections: ao(Re.sections, v) })).filter((Re) => Re.sections.length > 0) : I : [], [I, v]), X = Ht(() => !L || !$ || !h ? [] : h.map((Re) => ({ tab: Re, sections: ao(Re.sections, $) })).filter((Re) => Re.sections.length > 0), [L, $, h]), ce = Ht(
    () => ({ onSelect: r, highContrast: l, fullWidth: u, activeId: t }),
    [r, l, u, t]
  ), E = (Re) => {
    A(""), m == null || m(Re);
  }, be = () => {
    const Re = !D;
    N(Re), b == null || b(Re);
  }, { handleKeyDown: fe, containerRef: De } = WN({
    onEscape: () => {
      $ ? A("") : v && w("");
    }
  }), Je = /* @__PURE__ */ M(kt, { children: [
    P && /* @__PURE__ */ p(
      za,
      {
        value: v,
        onChange: w,
        placeholder: H,
        icon: B
      }
    ),
    /* @__PURE__ */ p("div", { ref: T, className: Pe.navWrapper, children: /* @__PURE__ */ p("nav", { className: Pe.nav, "aria-label": "Primary navigation", children: /* @__PURE__ */ p(
      RN,
      {
        sections: O,
        topLevelSections: x,
        searchActive: !!P && !!v
      }
    ) }) })
  ] }), Xe = k && !!$;
  return /* @__PURE__ */ p(kc.Provider, { value: ce, children: /* @__PURE__ */ M(
    "div",
    {
      ref: De,
      className: `${Pe.sideNav} ${D ? Pe.collapsed : ""} ${d}`,
      onKeyDown: fe,
      children: [
        y && /* @__PURE__ */ p(bN, { collapsed: D, onToggle: be }),
        !D && /* @__PURE__ */ M(kt, { children: [
          L ? /* @__PURE__ */ M(kt, { children: [
            k && /* @__PURE__ */ p(
              za,
              {
                value: $,
                onChange: A,
                placeholder: g,
                icon: S,
                variant: "global"
              }
            ),
            /* @__PURE__ */ p(
              jN,
              {
                tabs: h,
                activeTabId: j == null ? void 0 : j.id,
                onTabSelect: E,
                highContrast: l,
                hideTabStrip: !!$,
                children: Xe ? /* @__PURE__ */ p(wc, { ref: T, results: X }) : Je
              }
            )
          ] }) : Je,
          a && /* @__PURE__ */ p("div", { className: Pe.footer, children: a })
        ] })
      ]
    }
  ) });
}, VN = "_wrapper_s8efr_1", XN = "_chevron_s8efr_7", KN = "_chevronOpen_s8efr_13", YN = "_tab_s8efr_17", ZN = "_sm_s8efr_30", QN = "_lg_s8efr_35", JN = "_active_s8efr_50", sn = {
  wrapper: VN,
  chevron: XN,
  chevronOpen: KN,
  tab: YN,
  sm: ZN,
  lg: QN,
  active: JN
}, e$ = "_panel_57hns_1", t$ = "_groupHeader_57hns_13", n$ = "_divider_57hns_20", r$ = "_item_57hns_26", i$ = "_disabled_57hns_45", o$ = "_icon_57hns_50", s$ = "_label_57hns_57", Bn = {
  panel: e$,
  groupHeader: t$,
  divider: n$,
  item: r$,
  disabled: i$,
  icon: o$,
  label: s$
}, a$ = ({
  groups: e,
  anchorRef: n,
  autoFocus: t = !1,
  onClose: r,
  onMouseEnter: i,
  onMouseLeave: o
}) => {
  const s = Y([]), a = Y(null), [c, l] = U({ top: -9999, left: -9999 }), u = K(() => {
    const _ = n.current, b = a.current;
    if (!_ || !b) return;
    const k = _.getBoundingClientRect(), g = b.offsetWidth, S = window.innerWidth, v = 4;
    let w = k.left;
    w + g > S - v && (w = Math.max(v, S - g - v)), l({
      top: `${k.bottom + 2}px`,
      left: `${w}px`
    });
  }, [n]), d = [];
  let h = 0;
  e.forEach((_, b) => {
    b > 0 && d.push({ kind: "divider", key: `divider-${b}` }), _.header && d.push({ kind: "header", key: `header-${b}`, text: _.header }), _.items.forEach((k) => {
      d.push({ kind: "item", key: k.id, item: k, flatIndex: h++ });
    });
  });
  const f = h;
  ae(() => {
    t && s.current[0] && s.current[0].focus();
  }, [t]), ae(() => (requestAnimationFrame(u), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), () => {
    window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0);
  }), [u]);
  const m = (_, b) => {
    var k, g;
    _.key === "ArrowDown" ? (_.preventDefault(), (k = s.current[Math.min(b + 1, f - 1)]) == null || k.focus()) : _.key === "ArrowUp" ? (_.preventDefault(), (g = s.current[Math.max(b - 1, 0)]) == null || g.focus()) : _.key === "Escape" && (_.preventDefault(), r == null || r());
  }, y = (_) => {
    var b;
    _.disabled || ((b = _.onClick) == null || b.call(_), r == null || r());
  };
  return Rr(
    /* @__PURE__ */ p(
      "div",
      {
        ref: a,
        className: Bn.panel,
        style: c,
        role: "menu",
        onMouseEnter: i,
        onMouseLeave: o,
        children: d.map((_) => {
          if (_.kind === "divider")
            return /* @__PURE__ */ p("div", { className: Bn.divider, role: "separator" }, _.key);
          if (_.kind === "header")
            return /* @__PURE__ */ p("div", { className: Bn.groupHeader, role: "presentation", children: _.text }, _.key);
          const { item: b, flatIndex: k } = _;
          return /* @__PURE__ */ M(
            "div",
            {
              ref: (g) => {
                s.current[k] = g;
              },
              className: `${Bn.item} ${b.disabled ? Bn.disabled : ""}`,
              role: "menuitem",
              tabIndex: b.disabled ? -1 : 0,
              "aria-disabled": b.disabled,
              onClick: () => y(b),
              onKeyDown: (g) => {
                g.key === "Enter" || g.key === " " ? (g.preventDefault(), y(b)) : m(g, k);
              },
              children: [
                b.icon && /* @__PURE__ */ p(b.icon, { size: 14, className: Bn.icon }),
                /* @__PURE__ */ p("span", { className: Bn.label, children: b.label })
              ]
            },
            _.key
          );
        })
      }
    ),
    document.body
  );
}, l$ = ({
  tab: e,
  isActive: n = !1,
  onSelect: t,
  size: r = "sm",
  className: i = "",
  isDropdownOpen: o = !1,
  onDropdownOpen: s,
  onDropdownClose: a,
  onDropdownScheduleClose: c
}) => {
  var _;
  const l = !!((_ = e.dropdownGroups) != null && _.length), [u, d] = U(!1), h = Y(null), f = () => {
    d(!1), s == null || s();
  }, m = () => {
    d(!0), s == null || s();
  }, y = () => {
    var b;
    a == null || a(), (b = h.current) == null || b.focus();
  };
  return l ? /* @__PURE__ */ M(
    "div",
    {
      className: sn.wrapper,
      onMouseEnter: f,
      onMouseLeave: c,
      children: [
        /* @__PURE__ */ M(
          "button",
          {
            ref: h,
            type: "button",
            className: `${sn.tab} ${sn[r]} ${sn.hasDropdown} ${n ? sn.active : ""} ${i}`,
            "aria-haspopup": "menu",
            "aria-expanded": o,
            onClick: () => t == null ? void 0 : t(e.id),
            onKeyDown: (b) => {
              b.key === "ArrowDown" || b.key === "Enter" ? (b.preventDefault(), m()) : b.key === "Escape" && (a == null || a());
            },
            children: [
              e.label,
              /* @__PURE__ */ p(
                gi,
                {
                  size: 14,
                  className: `${sn.chevron} ${o ? sn.chevronOpen : ""}`,
                  "aria-hidden": "true"
                }
              )
            ]
          }
        ),
        o && /* @__PURE__ */ p(
          a$,
          {
            groups: e.dropdownGroups,
            anchorRef: h,
            autoFocus: u,
            onClose: y,
            onMouseEnter: f,
            onMouseLeave: c
          }
        )
      ]
    }
  ) : /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: `${sn.tab} ${sn[r]} ${n ? sn.active : ""} ${i}`,
      onClick: () => t == null ? void 0 : t(e.id),
      "aria-current": n ? "page" : void 0,
      children: e.label
    }
  );
}, c$ = "_topNav_1733i_8", u$ = "_sm_1733i_23", d$ = "_lg_1733i_27", f$ = "_bar_1733i_4", p$ = "_left_1733i_65", h$ = "_leading_1733i_79", m$ = "_brand_1733i_85", g$ = "_tabs_1733i_101", _$ = "_tabsCollapsed_1733i_137", b$ = "_tabsRevealed_1733i_151", y$ = "_separator_1733i_163", k$ = "_right_1733i_170", w$ = "_actions_1733i_182", Ft = {
  topNav: c$,
  sm: u$,
  lg: d$,
  bar: f$,
  left: p$,
  leading: h$,
  brand: m$,
  tabs: g$,
  tabsCollapsed: _$,
  tabsRevealed: b$,
  separator: y$,
  right: k$,
  actions: w$
}, x$ = ({ children: e }) => /* @__PURE__ */ p("div", { className: Ft.actions, children: e }), Fa = 4, v$ = 8, YI = ({
  leading: e,
  brand: n,
  onBrandClick: t,
  tabs: r,
  activeTabId: i,
  onTabSelect: o,
  actions: s,
  search: a,
  size: c = "sm",
  className: l = ""
}) => {
  const u = ln(c, "sm"), d = yc(bc), [h, f] = U(!0), m = Y(0), [y, _] = U(null), b = Y(null);
  ae(() => () => {
    b.current && clearTimeout(b.current);
  }, []), ae(() => {
    if (!d) {
      f(!0);
      return;
    }
    m.current = window.scrollY;
    const w = () => {
      const $ = window.scrollY, A = m.current, D = $ - A;
      $ <= v$ ? f(!0) : D > Fa ? f(!1) : D < -Fa && f(!0), m.current = $;
    };
    return window.addEventListener("scroll", w, { passive: !0 }), () => window.removeEventListener("scroll", w);
  }, [d]);
  const k = (w) => {
    b.current && clearTimeout(b.current), _(w);
  }, g = () => {
    b.current && clearTimeout(b.current), b.current = setTimeout(() => _(null), 150);
  }, S = () => {
    _(null);
  }, v = r.map((w) => /* @__PURE__ */ M(Ve.Fragment, { children: [
    w.separator && /* @__PURE__ */ p("div", { className: Ft.separator, role: "separator" }),
    /* @__PURE__ */ p(
      l$,
      {
        tab: w,
        isActive: w.id === i,
        onSelect: o,
        size: u,
        isDropdownOpen: y === w.id,
        onDropdownOpen: () => k(w.id),
        onDropdownClose: S,
        onDropdownScheduleClose: g
      }
    )
  ] }, w.id));
  return /* @__PURE__ */ M(
    "nav",
    {
      "aria-label": "Main navigation",
      className: [
        Ft.topNav,
        Ft[u],
        h ? Ft.tabsRevealed : Ft.tabsCollapsed,
        l
      ].filter(Boolean).join(" "),
      "data-testid": "top-nav",
      children: [
        /* @__PURE__ */ M("div", { className: Ft.bar, children: [
          /* @__PURE__ */ M("div", { className: Ft.left, children: [
            e && /* @__PURE__ */ p("div", { className: Ft.leading, children: e }),
            n && /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                className: Ft.brand,
                onClick: t,
                children: n
              }
            )
          ] }),
          (a || s) && /* @__PURE__ */ M("div", { className: Ft.right, children: [
            a,
            s && /* @__PURE__ */ p(x$, { children: s })
          ] })
        ] }),
        r.length > 0 && /* @__PURE__ */ p("div", { className: Ft.tabs, "data-testid": "top-nav-tabs", children: v })
      ]
    }
  );
}, E$ = "_pagination_1013i_4", S$ = "_disabled_1013i_11", C$ = "_pageIndicator_1013i_17", N$ = "_pageNumbers_1013i_27", $$ = "_pageButton_1013i_33", I$ = "_pageButtonActive_1013i_50", A$ = "_ellipsis_1013i_57", M$ = "_dots_1013i_70", L$ = "_dot_1013i_70", R$ = "_dotActive_1013i_94", Kt = {
  pagination: E$,
  disabled: S$,
  pageIndicator: C$,
  pageNumbers: N$,
  pageButton: $$,
  pageButtonActive: I$,
  ellipsis: A$,
  dots: M$,
  dot: L$,
  dotActive: R$
};
function T$(e, n) {
  if (n <= 7)
    return Array.from({ length: n }, (o, s) => s + 1);
  const t = /* @__PURE__ */ new Set();
  t.add(1), t.add(n);
  for (let o = e - 2; o <= e + 2; o++)
    o >= 1 && o <= n && t.add(o);
  const r = Array.from(t).sort((o, s) => o - s), i = [];
  for (let o = 0; o < r.length; o++)
    o > 0 && r[o] - r[o - 1] > 1 && i.push("ellipsis"), i.push(r[o]);
  return i;
}
const ZI = ({
  currentPage: e,
  totalPages: n,
  onPageChange: t,
  variant: r = "numbered",
  className: i = ""
}) => {
  const o = e <= 1, s = e >= n, a = /* @__PURE__ */ p(
    ze,
    {
      icon: Io,
      size: "sm",
      "aria-label": "Previous page",
      onClick: () => t(e - 1),
      disabled: o,
      className: o ? Kt.disabled : void 0
    }
  ), c = /* @__PURE__ */ p(
    ze,
    {
      icon: Ao,
      size: "sm",
      "aria-label": "Next page",
      onClick: () => t(e + 1),
      disabled: s,
      className: s ? Kt.disabled : void 0
    }
  );
  return /* @__PURE__ */ M("nav", { className: `${Kt.pagination} ${i}`, "aria-label": "Pagination", children: [
    r === "buttons" && /* @__PURE__ */ M(kt, { children: [
      a,
      /* @__PURE__ */ M("span", { className: Kt.pageIndicator, children: [
        "Page ",
        e,
        " of ",
        n
      ] }),
      c
    ] }),
    r === "numbered" && /* @__PURE__ */ M(kt, { children: [
      a,
      /* @__PURE__ */ p("div", { className: Kt.pageNumbers, children: T$(e, n).map(
        (l, u) => l === "ellipsis" ? /* @__PURE__ */ p("span", { className: Kt.ellipsis, children: "…" }, `ellipsis-${u}`) : /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: `${Kt.pageButton} ${l === e ? Kt.pageButtonActive : ""}`,
            onClick: () => t(l),
            "aria-label": `Page ${l}`,
            "aria-current": l === e ? "page" : void 0,
            children: l
          },
          l
        )
      ) }),
      c
    ] }),
    r === "dots" && /* @__PURE__ */ M(kt, { children: [
      a,
      /* @__PURE__ */ p("div", { className: Kt.dots, children: Array.from({ length: n }, (l, u) => u + 1).map((l) => /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: `${Kt.dot} ${l === e ? Kt.dotActive : ""}`,
          onClick: () => t(l),
          "aria-label": `Page ${l}`,
          "aria-current": l === e ? "page" : void 0
        },
        l
      )) }),
      c
    ] })
  ] });
}, D$ = "_nav_la800_1", P$ = "_label_la800_5", O$ = "_list_la800_13", z$ = "_childList_la800_22", B$ = "_item_la800_31", F$ = "_link_la800_36", j$ = "_active_la800_54", H$ = "_childLink_la800_60", q$ = "_truncate_la800_64", Rt = {
  nav: D$,
  label: P$,
  list: O$,
  childList: z$,
  item: B$,
  link: F$,
  active: j$,
  childLink: H$,
  truncate: q$
};
function U$(e) {
  const n = [];
  for (const t of e)
    if (n.push(t.href), t.children)
      for (const r of t.children)
        n.push(r.href);
  return n;
}
function W$(e, n) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e) {
    if (r.children) {
      for (const i of r.children)
        if (i.href === n)
          return t.add(i.href), t.add(r.href), t;
    }
    if (r.href === n)
      return t.add(r.href), t;
  }
  return t;
}
const QI = ({ items: e, label: n, truncate: t = !1 }) => {
  const [r, i] = U(null), o = Y(/* @__PURE__ */ new Map());
  ae(() => {
    const c = U$(e);
    if (c.length === 0) return;
    const l = o.current, u = c[c.length - 1], d = c.flatMap((y) => {
      const _ = y.startsWith("#") ? y.slice(1) : y, b = document.getElementById(_);
      return b ? [{ href: y, el: b }] : [];
    });
    if (d.length === 0) return;
    const h = () => window.innerHeight + window.scrollY >= document.body.offsetHeight - 5, f = new IntersectionObserver(
      (y) => {
        for (const S of y) {
          const v = d.find((w) => w.el === S.target);
          v && (S.isIntersecting ? l.set(
            v.href,
            S.boundingClientRect.top
          ) : l.delete(v.href));
        }
        if (h()) {
          i(u);
          return;
        }
        if (l.size === 0) return;
        let _ = null, b = 1 / 0, k = 1 / 0, g = null;
        for (const [S, v] of l)
          v >= 0 && v < b && (b = v, _ = S), v < k && (k = v, g = S);
        i(_ ?? g);
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );
    for (const { el: y } of d)
      f.observe(y);
    function m() {
      h() && i(u);
    }
    return window.addEventListener("scroll", m, { passive: !0 }), () => {
      f.disconnect(), l.clear(), window.removeEventListener("scroll", m);
    };
  }, [e]);
  const s = r ? W$(e, r) : /* @__PURE__ */ new Set(), a = (c, l) => {
    var u;
    c.preventDefault(), i(l), (u = document.querySelector(l)) == null || u.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ M("nav", { "aria-label": n ?? "Page contents", className: Rt.nav, children: [
    n && /* @__PURE__ */ p("p", { className: Rt.label, children: n }),
    /* @__PURE__ */ p("ul", { className: Rt.list, children: e.map((c) => /* @__PURE__ */ M("li", { className: Rt.item, children: [
      /* @__PURE__ */ p(
        "a",
        {
          href: c.href,
          className: [Rt.link, t && Rt.truncate, s.has(c.href) && Rt.active].filter(Boolean).join(" "),
          onClick: (l) => a(l, c.href),
          children: c.label
        }
      ),
      c.children && c.children.length > 0 && /* @__PURE__ */ p("ul", { className: Rt.childList, children: c.children.map((l) => /* @__PURE__ */ p("li", { className: Rt.item, children: /* @__PURE__ */ p(
        "a",
        {
          href: l.href,
          className: [Rt.link, Rt.childLink, t && Rt.truncate, s.has(l.href) && Rt.active].filter(Boolean).join(" "),
          onClick: (u) => a(u, l.href),
          children: l.label
        }
      ) }, l.href)) })
    ] }, c.href)) })
  ] });
};
export {
  bc as ADMIN_MOBILE_QUERY,
  PI as AlertDialog,
  K$ as AnimationPicker,
  UI as AppLayout,
  ja as Avatar,
  Y$ as Badge,
  Z$ as Banner,
  Q$ as Blockquote,
  J$ as Breadcrumb,
  eI as BulletList,
  tI as Button,
  nI as ButtonGroup,
  rI as Card,
  VI as CardGrid,
  iI as Carousel,
  vs as Checkbox,
  oI as Chip,
  sI as CodeBlock,
  po as ColorPicker,
  GI as Columns,
  kk as Command,
  DI as CommandDialog,
  Pt as CompactInput,
  Ng as ContextMenu,
  aI as DataGrid,
  lI as DatePicker,
  cI as Divider,
  FI as DocPage,
  uI as EditableText,
  dI as EmptyState,
  An as FieldGroup,
  jn as FieldLabel,
  fI as GlobalSearch,
  pI as GradientPicker,
  hI as ImagePicker,
  ul as InlineSearch,
  mI as Input,
  cg as Kbd,
  li as LabeledField,
  XI as LinkList,
  OI as Modal,
  gI as NumberedList,
  QI as PageContents,
  jI as PageFooter,
  HI as PageHeading,
  ZI as Pagination,
  _I as PixelArtEditor,
  Ct as Popover,
  bI as ProgressBar,
  yI as ProgressCircular,
  ab as Radio,
  kI as RadioGroup,
  wI as RichTextEditor,
  qI as SectionHeading,
  xI as SegmentedControl,
  Lo as Select,
  vI as SelectionList,
  EI as ShadowEditor,
  KI as SideNav,
  a0 as SidePanel,
  SI as Skeleton,
  CI as Slider,
  NI as Spinner,
  WI as Stack,
  $I as Table,
  II as Tabs,
  AI as Text,
  MI as Textarea,
  RI as TimePicker,
  LI as Timeline,
  y0 as Toast,
  zI as ToastStack,
  TI as Toggle,
  ze as ToolbarButton,
  Oo as Tooltip,
  YI as TopNav,
  BI as extractHeadings,
  Oi as parseCssGradient,
  zi as serializeCssGradient,
  yc as useMediaQuery
};
