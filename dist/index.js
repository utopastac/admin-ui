import { jsx as p, jsxs as M, Fragment as kt } from "react/jsx-runtime";
import Ve, { useState as W, useRef as Y, useEffect as le, useCallback as K, forwardRef as No, createElement as lo, useId as mn, useMemo as jt, useReducer as Ac, useImperativeHandle as Mc, createContext as Lc, useContext as Rc } from "react";
import Tc, { createPortal as mi } from "react-dom";
const Dc = "_avatar_17tt1_1", Pc = "_xs_17tt1_8", Oc = "_xl_17tt1_14", zc = "_sm_17tt1_20", Bc = "_md_17tt1_26", Fc = "_lg_17tt1_32", jc = "_image_17tt1_39", Hc = "_initials_17tt1_45", qr = {
  avatar: Dc,
  xs: Pc,
  xl: Oc,
  sm: zc,
  md: Bc,
  lg: Fc,
  image: jc,
  initials: Hc
}, qc = {
  s: "sm",
  small: "sm",
  m: "md",
  medium: "md",
  l: "lg",
  large: "lg"
};
function an(e, n) {
  return e === void 0 ? n : qc[e] ?? e;
}
function Uc(e) {
  var t;
  const n = e.trim().split(/\s+/);
  return n.length === 1 ? ((t = n[0][0]) == null ? void 0 : t.toUpperCase()) ?? "" : (n[0][0] + n[n.length - 1][0]).toUpperCase();
}
const Fa = ({
  src: e,
  name: n,
  size: t = "md",
  className: r = ""
}) => {
  const [i, o] = W(!1), s = e && !i, a = an(t, "md");
  return /* @__PURE__ */ p("div", { className: `${qr.avatar} ${qr[a]} ${r}`, title: n, children: s ? /* @__PURE__ */ p("img", { src: e, alt: n, className: qr.image, onError: () => o(!0) }) : /* @__PURE__ */ p("span", { className: qr.initials, children: Uc(n) }) });
}, Wc = "_field_15wo2_1", Gc = "_fieldTop_15wo2_6", Vc = "_fieldLeft_15wo2_10", Xc = "_label_15wo2_15", Kc = "_sm_15wo2_20", Yc = "_lg_15wo2_26", Zc = "_disabled_15wo2_31", Xn = {
  field: Wc,
  fieldTop: Gc,
  fieldLeft: Vc,
  label: Xc,
  sm: Kc,
  lg: Yc,
  disabled: Zc
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
] }), Qc = "_wrapper_mit8j_1", Jc = "_error_mit8j_12", eu = "_prefix_mit8j_17", tu = "_scrub_mit8j_26", nu = "_input_mit8j_30", pr = {
  wrapper: Qc,
  error: Jc,
  prefix: eu,
  scrub: tu,
  input: nu
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
  g.current = { onChange: s, min: c, max: l, step: u, value: o }, le(() => {
    const v = k.current;
    if (!v || !d) return;
    let x = 0, $ = 0;
    const I = (O) => {
      var w;
      const { onChange: D, min: q, max: F, step: A } = g.current, T = O.clientX - x, j = A < 1 ? A : 1;
      let B = $ + Math.round(T / 2) * j;
      B = Math.round(B / A) * A, q !== void 0 && (B = Math.max(q, B)), F !== void 0 && (B = Math.min(F, B));
      const P = A < 1 ? B.toFixed(((w = String(A).split(".")[1]) == null ? void 0 : w.length) || 2) : String(B);
      D(P);
    }, R = () => {
      document.removeEventListener("mousemove", I), document.removeEventListener("mouseup", R), document.body.style.cursor = "", document.body.style.userSelect = "";
    }, N = (O) => {
      O.preventDefault(), x = O.clientX, $ = parseFloat(g.current.value) || 0, document.body.style.cursor = "ew-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", I), document.addEventListener("mouseup", R);
    };
    return v.addEventListener("mousedown", N), () => {
      v.removeEventListener("mousedown", N), document.removeEventListener("mousemove", I), document.removeEventListener("mouseup", R);
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
}, ru = "_fieldGroup_1skan_1", iu = "_label_1skan_8", ou = "_errorText_1skan_13", su = "_helperText_1skan_19", au = "_disabled_1skan_25", hr = {
  fieldGroup: ru,
  label: iu,
  errorText: ou,
  helperText: su,
  disabled: au
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
] }), lu = "_popover_zb6dh_1", cu = {
  popover: lu
}, At = 4;
function uu(e) {
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
  const d = Y(null), [h, f] = W(null), m = K(() => {
    const y = t.current, _ = d.current;
    if (!y || !_) return;
    const b = y.getBoundingClientRect(), k = _.offsetHeight, g = window.innerHeight;
    let S;
    if (s)
      g - b.top - At >= k ? S = b.top : S = Math.max(At, g - k - At);
    else {
      const I = g - b.bottom - At, R = b.top - At;
      I >= k ? S = b.bottom + At : R >= k ? S = b.top - k - At : S = Math.max(At, g - k - At);
    }
    S += c;
    const v = _.offsetWidth, x = window.innerWidth;
    let $ = b.left + a;
    $ + v > x - At && ($ = Math.max(At, x - v - At)), f({
      top: `${S}px`,
      left: `${$}px`,
      ...o ? { width: `${b.width}px` } : {},
      maxHeight: `${g - At * 2}px`
    });
  }, [t, o, s, a, c]);
  return le(() => {
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
    const y = () => m(), _ = uu(t.current);
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
  }, [e, m, o, t]), le(() => {
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
  }, [e]), le(() => {
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
  }, [e, n, t]), e ? mi(
    /* @__PURE__ */ p(
      "div",
      {
        ref: d,
        className: `${cu.popover} ${i || ""}`,
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
const du = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ja = (...e) => e.filter((n, t, r) => !!n && r.indexOf(n) === t).join(" ");
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var fu = {
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
const pu = No(
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
      ...fu,
      width: n,
      height: n,
      stroke: e,
      strokeWidth: r ? Number(t) * 24 / Number(n) : t,
      className: ja("lucide", i),
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
    ({ className: r, ...i }, o) => lo(pu, {
      ref: o,
      iconNode: n,
      className: ja(`lucide-${du(e)}`, r),
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
const hu = xe("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mu = xe("ArrowLeftRight", [
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
const gu = xe("ArrowUpDown", [
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
const _u = xe("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bu = xe("Bold", [
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
const yu = xe("Calendar", [
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
const ku = xe("CircleCheckBig", [
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
const wu = xe("CircleX", [
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
const xu = xe("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vu = xe("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ha = xe("Download", [
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
const Eu = xe("Eraser", [
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
const qa = xe("FileCode", [
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
const Ua = xe("FileImage", [
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
const Su = xe("Grid3x3", [
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
const Cu = xe("Info", [
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
const Nu = xe("Italic", [
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
const $u = xe("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iu = xe("ListFilter", [
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
const Au = xe("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mu = xe("PaintBucket", [
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
const Lu = xe("PanelLeftClose", [
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
const Ru = xe("PanelLeftOpen", [
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
const Tu = xe("PenTool", [
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
const Du = xe("Pencil", [
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
const Pu = xe("Pipette", [
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
const Ou = xe("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wa = xe("Redo2", [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zu = xe("RefreshCw", [
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
const Bu = xe("RotateCcw", [
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
const Ga = xe("Trash2", [
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
const Fu = xe("TriangleAlert", [
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
const Va = xe("Undo2", [
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
]), ai = ({
  label: e,
  labelPosition: n,
  labelWidth: t,
  htmlFor: r,
  disabled: i,
  error: o,
  helperText: s,
  children: a
}) => n === "left" && e ? /* @__PURE__ */ p(jn, { label: e, labelPosition: "left", labelWidth: t, htmlFor: r, disabled: i, children: a }) : /* @__PURE__ */ p(An, { label: e, htmlFor: r, error: o, helperText: s, disabled: i, children: a }), ju = "_container_ei498_1", Hu = "_trigger_ei498_8", qu = "_open_ei498_31", Uu = "_sm_ei498_41", Wu = "_md_ei498_47", Gu = "_triggerContent_ei498_55", Vu = "_accessory_ei498_64", Xu = "_selectedText_ei498_71", Ku = "_placeholder_ei498_75", Yu = "_chevron_ei498_80", Zu = "_chevronOpen_ei498_86", Qu = "_dropdown_ei498_91", Ju = "_option_ei498_99", ed = "_optionSelected_ei498_128", td = "_optionDisabled_ei498_134", nd = "_optionLabel_ei498_140", rd = "_optionDescription_ei498_147", id = "_checkIcon_ei498_156", nt = {
  container: ju,
  trigger: Hu,
  open: qu,
  sm: Uu,
  md: Wu,
  triggerContent: Gu,
  accessory: Vu,
  selectedText: Xu,
  placeholder: Ku,
  chevron: Yu,
  chevronOpen: Zu,
  dropdown: Qu,
  option: Ju,
  optionSelected: ed,
  optionDisabled: td,
  optionLabel: nd,
  optionDescription: rd,
  checkIcon: id
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
  const [f, m] = W(!1), [y, _] = W(-1), b = Y(null), k = Y(null), g = Y(null), S = an(o, "md"), v = mn(), x = e.find((A) => A.value === n), $ = (A) => `${v}-option-${A}`, I = K(() => {
    if (i) return;
    const A = e.findIndex((T) => T.value === n && !T.disabled);
    _(A >= 0 ? A : e.findIndex((T) => !T.disabled)), m(!0);
  }, [i, e, n]), R = K(() => {
    m(!1), _(-1);
  }, []), N = () => {
    f ? R() : I();
  }, O = K((A) => {
    var T;
    t(A), R(), (T = k.current) == null || T.focus();
  }, [t, R]);
  le(() => {
    var A;
    if (f && y >= 0 && g.current) {
      const T = g.current.querySelector(
        `[id="${$((A = e[y]) == null ? void 0 : A.value)}"]`
      );
      T == null || T.focus();
    }
  }, [f, y]);
  const D = K(
    (A) => {
      var B, P;
      const T = e.map((w, X) => ({ opt: w, idx: X })).filter(({ opt: w }) => !w.disabled).map(({ idx: w }) => w);
      if (T.length === 0) return;
      const j = T.indexOf(y);
      switch (A.key) {
        case "ArrowDown": {
          A.preventDefault();
          const w = j < T.length - 1 ? j + 1 : 0;
          _(T[w]);
          break;
        }
        case "ArrowUp": {
          A.preventDefault();
          const w = j > 0 ? j - 1 : T.length - 1;
          _(T[w]);
          break;
        }
        case "Home": {
          A.preventDefault(), _(T[0]);
          break;
        }
        case "End": {
          A.preventDefault(), _(T[T.length - 1]);
          break;
        }
        case "Enter":
        case " ": {
          A.preventDefault(), y >= 0 && !((B = e[y]) != null && B.disabled) && O(e[y].value);
          break;
        }
        case "Escape": {
          A.preventDefault(), R(), (P = k.current) == null || P.focus();
          break;
        }
        case "Tab": {
          R();
          break;
        }
      }
    },
    [e, y, R, O]
  ), q = S === "sm" ? 14 : 16, F = /* @__PURE__ */ M(
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
                (x == null ? void 0 : x.start) && /* @__PURE__ */ p("span", { className: nt.accessory, "aria-hidden": "true", children: x.start }),
                /* @__PURE__ */ p("span", { className: x ? nt.selectedText : nt.placeholder, children: x ? x.label : r })
              ] }),
              /* @__PURE__ */ p("span", { "aria-hidden": "true", children: /* @__PURE__ */ p(
                gi,
                {
                  size: q,
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
            onClose: R,
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
                onKeyDown: D,
                children: e.map((A, T) => /* @__PURE__ */ M(
                  "button",
                  {
                    id: $(A.value),
                    type: "button",
                    role: "option",
                    "aria-selected": A.value === n,
                    className: `${nt.option} ${nt[S]} ${A.value === n ? nt.optionSelected : ""} ${A.disabled ? nt.optionDisabled : ""}`,
                    onClick: () => {
                      A.disabled || O(A.value);
                    },
                    disabled: A.disabled,
                    tabIndex: T === y ? 0 : -1,
                    children: [
                      A.start && /* @__PURE__ */ p("span", { className: nt.accessory, "aria-hidden": "true", children: A.start }),
                      /* @__PURE__ */ M("span", { className: nt.optionLabel, children: [
                        A.label,
                        A.description && /* @__PURE__ */ p("span", { className: nt.optionDescription, children: A.description })
                      ] }),
                      A.value === n && /* @__PURE__ */ p("span", { "aria-hidden": "true", children: /* @__PURE__ */ p($o, { size: q, className: nt.checkIcon }) })
                    ]
                  },
                  A.value
                ))
              }
            )
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ p(ai, { label: a, labelPosition: c, labelWidth: l, htmlFor: h, disabled: i, error: u, helperText: d, children: F });
}, od = "_canvas_p80dg_1", sd = {
  canvas: od
}, Ci = "var(--admin-border-highlight)", gs = "var(--admin-border-highlight)", ad = "var(--admin-surface-info-secondary)", ld = "var(--admin-surface-info-secondary)", _s = "var(--admin-surface-primary)", bs = "var(--admin-border-highlight)", ys = 4, ks = 5, uo = 200, fo = 200, _i = 50, Ro = _i, To = _i, Do = uo - _i * 2, Po = fo - _i * 2;
function Ur(e, n) {
  return {
    x: Ro + e * Do,
    y: To + (1 - n) * Po
  };
}
function cd(e, n) {
  return {
    vx: (e - Ro) / Do,
    vy: 1 - (n - To) / Po
  };
}
const ud = ({ value: e, onChange: n }) => {
  const t = Y(null), r = Y(null), [i, o, s, a] = e, c = Ur(0, 0), l = Ur(1, 1), u = Ur(i, o), d = Ur(s, a), h = (y) => (_) => {
    _.currentTarget.setPointerCapture(_.pointerId), r.current = y;
  }, f = (y) => {
    if (!r.current || !t.current) return;
    const _ = t.current.getBoundingClientRect(), b = uo / _.width, k = fo / _.height, g = (y.clientX - _.left) * b, S = (y.clientY - _.top) * k, { vx: v, vy: x } = cd(g, S), $ = Math.max(0, Math.min(1, v));
    r.current === "p1" ? n([$, x, e[2], e[3]]) : n([e[0], e[1], $, x]);
  }, m = () => {
    r.current = null;
  };
  return /* @__PURE__ */ M(
    "svg",
    {
      ref: t,
      viewBox: `0 0 ${uo} ${fo}`,
      className: sd.canvas,
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
            stroke: ad,
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
            stroke: ld,
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
}, dd = "_toolbarButton_1l0xe_1", fd = "_pressed_1l0xe_19", pd = "_selected_1l0xe_29", hd = "_inUse_1l0xe_41", md = "_sm_1l0xe_53", gd = "_md_1l0xe_67", mr = {
  toolbarButton: dd,
  pressed: fd,
  selected: pd,
  inUse: hd,
  sm: md,
  md: gd
}, _d = "_wrapper_s1588_1", bd = "_tooltip_s1588_5", yd = "_top_s1588_24", kd = "_bottom_s1588_30", wd = "_left_s1588_36", xd = "_right_s1588_42", Ni = {
  wrapper: _d,
  tooltip: bd,
  top: yd,
  bottom: kd,
  left: wd,
  right: xd
}, Wr = 6;
function vd(e, n) {
  switch (n) {
    case "bottom":
      return { top: e.bottom + Wr, left: e.left + e.width / 2, transform: "translateX(-50%)" };
    case "left":
      return { top: e.top + e.height / 2, left: e.left - Wr, transform: "translate(-100%, -50%)" };
    case "right":
      return { top: e.top + e.height / 2, left: e.right + Wr, transform: "translateY(-50%)" };
    default:
      return { top: e.top - Wr, left: e.left + e.width / 2, transform: "translate(-50%, -100%)" };
  }
}
function Oo({
  content: e,
  placement: n = "top",
  delay: t = 0,
  children: r,
  className: i
}) {
  const [o, s] = W(!1), [a, c] = W({ top: 0, left: 0, transform: "" }), l = Y(), u = Y(null), d = mn(), h = K(() => {
    const m = () => {
      var _;
      const y = ((_ = u.current) == null ? void 0 : _.firstElementChild) ?? u.current;
      if (y) {
        const b = y.getBoundingClientRect();
        c(vd(b, n));
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
    o && mi(
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
  const h = an(t, "md"), f = h === "sm" ? 16 : 20, m = r !== void 0, y = Object.fromEntries(
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
}, Ed = "_previewContainer_1yfcm_1", Sd = "_previewTrack_1yfcm_8", Cd = "_previewBox_1yfcm_18", $i = {
  previewContainer: Ed,
  previewTrack: Sd,
  previewBox: Cd
}, Nd = ({ duration: e, timingFunction: n }) => {
  const t = Y(null), r = K(() => {
    const i = t.current;
    i && (i.style.transition = "none", i.style.left = "var(--admin-space-xs)", i.getBoundingClientRect(), i.style.transition = `left ${e}ms ${n}`, i.style.left = "calc(100% - var(--admin-space-xl))");
  }, [e, n]);
  return le(() => {
    const i = setTimeout(r, 300);
    return () => clearTimeout(i);
  }, [r]), /* @__PURE__ */ M("div", { className: $i.previewContainer, children: [
    /* @__PURE__ */ p("div", { className: $i.previewTrack, children: /* @__PURE__ */ p("div", { ref: t, className: $i.previewBox }) }),
    /* @__PURE__ */ p(ze, { icon: Bu, onClick: r, size: "sm", "aria-label": "Replay preview" })
  ] });
}, $d = "_inputRow_nwwav_1", Id = "_triggerInput_nwwav_8", Ad = "_triggerValue_nwwav_32", Md = "_dropdown_nwwav_39", Ld = "_panel_nwwav_44", Rd = "_row_nwwav_52", Td = "_rowFill_nwwav_58", Dd = "_fillInput_nwwav_64", Pd = "_bezierSection_nwwav_74", Od = "_bezierReadout_nwwav_81", zd = "_bezierInputs_nwwav_89", Mt = {
  inputRow: $d,
  triggerInput: Id,
  triggerValue: Ad,
  dropdown: Md,
  panel: Ld,
  row: Rd,
  rowFill: Td,
  fillInput: Dd,
  bezierSection: Pd,
  bezierReadout: Od,
  bezierInputs: zd
}, Bd = [
  { value: "linear", label: "Linear" },
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease in" },
  { value: "ease-out", label: "Ease out" },
  { value: "ease-in-out", label: "Ease in out" },
  { value: "ios", label: "iOS" },
  { value: "custom", label: "Custom bezier" }
], li = {
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
    ], c = li.ios, l = a.every((u, d) => u === c[d]);
    return { duration: i, easing: l ? "ios" : "custom", bezier: a };
  }
  const s = ["ease-in-out", "ease-in", "ease-out", "ease", "linear"];
  for (const a of s)
    if (t.includes(a))
      return {
        duration: i,
        easing: a,
        bezier: li[a]
      };
  return n;
}
function Fd(e) {
  if (e.easing === "custom" || e.easing === "ios") {
    const [n, t, r, i] = e.bezier;
    return `${e.duration}ms cubic-bezier(${n}, ${t}, ${r}, ${i})`;
  }
  return `${e.duration}ms ${e.easing}`;
}
const U$ = ({
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
  const [u, d] = W(
    () => ws(e ?? "")
  ), [h, f] = W(!1), m = Y(null);
  le(() => {
    d(ws(e ?? ""));
  }, [e]);
  const y = K(
    ($) => {
      d($), n(Fd($)), t == null || t($);
    },
    [n, t]
  ), _ = ($) => {
    const I = parseInt($, 10), R = isNaN(I) ? 0 : Math.max(0, Math.min(9999, I));
    y({ ...u, duration: R });
  }, b = ($) => {
    const I = $;
    let R = u.bezier;
    I === "custom" && (R = li[u.easing] ?? li.custom), y({ ...u, easing: I, bezier: R });
  }, k = ($) => {
    y({ ...u, bezier: $ });
  }, g = ($, I) => {
    const R = parseFloat(I);
    if (isNaN(R)) return;
    const N = [0, -2, 0, -2], O = [1, 3, 1, 3], D = Math.max(N[$], Math.min(O[$], R)), q = [...u.bezier];
    q[$] = D, y({ ...u, bezier: q });
  }, S = u.easing === "custom" || u.easing === "ios" ? `cubic-bezier(${u.bezier.join(", ")})` : u.easing, v = /* @__PURE__ */ M("div", { className: Mt.panel, children: [
    /* @__PURE__ */ p("div", { className: Mt.row, children: /* @__PURE__ */ p("div", { className: Mt.rowFill, children: /* @__PURE__ */ p(
      Lo,
      {
        options: Bd,
        value: u.easing,
        onChange: b,
        labelPosition: "left",
        labelWidth: 56,
        label: "Curve",
        size: "sm"
      }
    ) }) }),
    u.easing === "custom" && /* @__PURE__ */ M("div", { className: Mt.bezierSection, children: [
      /* @__PURE__ */ p(ud, { value: u.bezier, onChange: k }),
      /* @__PURE__ */ p("div", { className: Mt.bezierReadout, children: /* @__PURE__ */ p(jn, { label: "Bezier", labelPosition: "left", labelWidth: 56, className: Mt.rowFill, children: /* @__PURE__ */ p("div", { className: Mt.bezierInputs, children: u.bezier.map(($, I) => /* @__PURE__ */ p(
        Pt,
        {
          type: "number",
          value: String(parseFloat($.toFixed(2))),
          onChange: (R) => g(I, R),
          step: 0.01,
          min: [0, -2, 0, -2][I],
          max: [1, 3, 1, 3][I],
          prefix: "",
          width: 44
        },
        I
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
    /* @__PURE__ */ p(Nd, { duration: u.duration, timingFunction: S })
  ] });
  if (r)
    return i && o === "left" ? /* @__PURE__ */ p(jn, { label: i, labelPosition: "left", labelWidth: s, htmlFor: a, children: v }) : /* @__PURE__ */ p(An, { label: i, htmlFor: a, children: v });
  const x = /* @__PURE__ */ M("div", { className: Mt.inputRow, children: [
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
  return i && o === "left" ? /* @__PURE__ */ p(jn, { label: i, labelPosition: "left", labelWidth: s, htmlFor: a, children: x }) : /* @__PURE__ */ p(An, { label: i, htmlFor: a, children: x });
}, jd = "_badge_1jkaz_1", Hd = "_sm_1jkaz_11", qd = "_md_1jkaz_16", Ud = "_success_1jkaz_27", Wd = "_warning_1jkaz_32", Gd = "_info_1jkaz_37", Ii = {
  badge: jd,
  sm: Hd,
  md: qd,
  default: "_default_1jkaz_22",
  success: Ud,
  warning: Wd,
  info: Gd
}, W$ = ({
  variant: e = "default",
  size: n = "md",
  children: t,
  className: r = ""
}) => {
  const i = an(n, "md");
  return /* @__PURE__ */ p("span", { className: `${Ii.badge} ${Ii[e]} ${Ii[i]} ${r}`, children: t });
}, Vd = "_banner_d4n89_1", Xd = "_inline_d4n89_14", Kd = "_full_d4n89_18", Yd = "_info_d4n89_30", Zd = "_success_d4n89_36", Qd = "_warning_d4n89_42", Jd = "_error_d4n89_48", ef = "_icon_d4n89_56", tf = "_content_d4n89_65", nf = "_title_d4n89_73", rf = "_message_d4n89_77", of = "_dismiss_d4n89_84", wn = {
  banner: Vd,
  inline: Xd,
  full: Kd,
  default: "_default_d4n89_24",
  info: Yd,
  success: Zd,
  warning: Qd,
  error: Jd,
  icon: ef,
  content: tf,
  title: nf,
  message: rf,
  dismiss: of
};
function G$({
  variant: e,
  message: n,
  title: t,
  icon: r,
  dismissible: i = !1,
  onDismiss: o,
  layout: s = "inline",
  className: a = ""
}) {
  const [c, l] = W(!0);
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
const sf = "_blockquote_otdsv_1", af = "_content_otdsv_9", lf = "_cite_otdsv_17", Ai = {
  blockquote: sf,
  content: af,
  cite: lf
}, V$ = ({
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
}, cf = "_breadcrumb_1c1a8_1", uf = "_list_1c1a8_5", df = "_item_1c1a8_13", ff = "_link_1c1a8_18", pf = "_current_1c1a8_33", hf = "_separator_1c1a8_38", xn = {
  breadcrumb: cf,
  list: uf,
  item: df,
  link: ff,
  current: pf,
  separator: hf
}, X$ = ({
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
}) }) }), mf = "_list_1cqdw_1", gf = "_md_1cqdw_11", _f = "_sm_1cqdw_15", bf = "_item_1cqdw_20", Mi = {
  list: mf,
  md: gf,
  sm: _f,
  item: bf
}, K$ = ({
  items: e,
  size: n = "md",
  className: t = ""
}) => {
  const r = [Mi.list, Mi[n], t].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("ul", { className: r, children: e.map((i, o) => /* @__PURE__ */ p("li", { className: Mi.item, children: i }, o)) });
}, yf = "_button_15jhx_1", kf = "_sm_15jhx_19", wf = "_md_15jhx_24", xf = "_lg_15jhx_29", vf = "_primary_15jhx_35", Ef = "_secondary_15jhx_44", Sf = "_ghost_15jhx_54", Li = {
  button: yf,
  sm: kf,
  md: wf,
  lg: xf,
  primary: vf,
  secondary: Ef,
  ghost: Sf
}, Y$ = ({
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
  const d = an(n, "md"), h = d === "sm" ? 14 : d === "lg" ? 20 : 16, f = /* @__PURE__ */ M(
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
}, Cf = "_buttonGroup_ik7fp_1", Nf = "_start_ik7fp_5", $f = "_center_ik7fp_9", If = "_end_ik7fp_13", xs = {
  buttonGroup: Cf,
  start: Nf,
  center: $f,
  end: If
}, Z$ = ({
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
), Af = "_card_1uo8k_1", Mf = "_hoverable_1uo8k_8", Lf = "_active_1uo8k_16", Ri = {
  card: Af,
  hoverable: Mf,
  active: Lf
}, Q$ = ({
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
}, Rf = "_carousel_k6wqp_1", Tf = "_viewport_k6wqp_6", Df = "_track_k6wqp_11", Pf = "_slide_k6wqp_16", Of = "_navButton_k6wqp_20", zf = "_navButtonPrev_k6wqp_48", Bf = "_navButtonNext_k6wqp_52", vn = {
  carousel: Rf,
  viewport: Tf,
  track: Df,
  slide: Pf,
  navButton: Of,
  navButtonPrev: zf,
  navButtonNext: Bf
}, J$ = ({
  children: e,
  slidesPerView: n = 1,
  gap: t = 16,
  loop: r = !1,
  className: i = ""
}) => {
  const o = Ve.Children.toArray(e), s = o.length, a = Math.max(0, s - n), [c, l] = W(0), u = r || c > 0, d = r || c < a, h = K(() => {
    l((k) => k > 0 ? k - 1 : r ? a : k);
  }, [r, a]), f = K(() => {
    l((k) => k < a ? k + 1 : r ? 0 : k);
  }, [r, a]), m = jt(
    () => `calc((100% - ${t * (n - 1)}px) / ${n})`,
    [t, n]
  ), y = jt(
    () => `calc(-${c} * (${m} + ${t}px))`,
    [c, m, t]
  ), _ = jt(
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
}, Ff = "_wrapper_v651u_1", jf = "_reverse_v651u_7", Hf = "_disabled_v651u_11", qf = "_visuallyHidden_v651u_16", Uf = "_box_v651u_20", Wf = "_checked_v651u_33", Gf = "_label_v651u_52", Rn = {
  wrapper: Ff,
  reverse: jf,
  disabled: Hf,
  visuallyHidden: qf,
  box: Uf,
  checked: Wf,
  label: Gf
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
), Vf = "_chip_21kob_1", Xf = "_selected_21kob_28", Kf = "_success_21kob_35", Yf = "_warning_21kob_46", Zf = "_info_21kob_57", Qf = "_error_21kob_68", Jf = "_icon_21kob_81", ep = "_hasAvatar_21kob_88", tp = "_avatar_21kob_97", np = "_removeButton_21kob_101", Tn = {
  chip: Vf,
  default: "_default_21kob_23",
  selected: Xf,
  success: Kf,
  warning: Yf,
  info: Zf,
  error: Qf,
  icon: Jf,
  hasAvatar: ep,
  avatar: tp,
  removeButton: np
}, eI = ({
  variant: e = "default",
  icon: n,
  avatar: t,
  onRemove: r,
  selected: i = !1,
  onSelect: o,
  children: s,
  className: a = ""
}) => {
  const c = t ? /* @__PURE__ */ p(Fa, { src: t.src, name: t.name, size: "xs", className: Tn.avatar }) : n ? /* @__PURE__ */ p("span", { className: Tn.icon, "aria-hidden": "true", children: n }) : null, l = r ? /* @__PURE__ */ p(
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
function rp() {
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
  const x = /\b\B/, $ = "[a-zA-Z]\\w*", I = "[a-zA-Z_]\\w*", R = "\\b\\d+(\\.\\d+)?", N = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", O = "\\b(0b[01]+)", D = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", q = (C = {}) => {
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
  }, A = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [F]
  }, T = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [F]
  }, j = {
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
  }, P = B("//", "$"), w = B("/\\*", "\\*/"), X = B("#", "$"), ce = {
    scope: "number",
    begin: R,
    relevance: 0
  }, E = {
    scope: "number",
    begin: N,
    relevance: 0
  }, be = {
    scope: "number",
    begin: O,
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
    begin: I,
    relevance: 0
  }, Xe = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + I,
    relevance: 0
  };
  var Ge = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: A,
    BACKSLASH_ESCAPE: F,
    BINARY_NUMBER_MODE: be,
    BINARY_NUMBER_RE: O,
    COMMENT: B,
    C_BLOCK_COMMENT_MODE: w,
    C_LINE_COMMENT_MODE: P,
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
    MATCH_NOTHING_RE: x,
    METHOD_GUARD: Xe,
    NUMBER_MODE: ce,
    NUMBER_RE: R,
    PHRASAL_WORDS_MODE: j,
    QUOTE_STRING_MODE: T,
    REGEXP_MODE: fe,
    RE_STARTERS_RE: D,
    SHEBANG: q,
    TITLE_MODE: De,
    UNDERSCORE_IDENT_RE: I,
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
  }, L = (C, z) => {
    Fe[`${C}/${z}`] || (console.log(`Deprecated as of ${C}. ${z}`), Fe[`${C}/${z}`] = !0);
  }, H = new Error();
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
        throw it("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), H;
      if (typeof C.beginScope != "object" || C.beginScope === null)
        throw it("beginScope must be object"), H;
      re(C, C.begin, { key: "beginScope" }), C.begin = v(C.begin, { joinWith: "" });
    }
  }
  function Ne(C) {
    if (Array.isArray(C.end)) {
      if (C.skip || C.excludeEnd || C.returnEnd)
        throw it("skip, excludeEnd, returnEnd not compatible with endScope: {}"), H;
      if (typeof C.endScope != "object" || C.endScope === null)
        throw it("endScope must be object"), H;
      re(C, C.end, { key: "endScope" }), C.end = v(C.end, { joinWith: "" });
    }
  }
  function at(C) {
    C.scope && typeof C.scope == "object" && C.scope !== null && (C.beginScope = C.scope, delete C.scope);
  }
  function Ht(C) {
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
        Ht,
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
        return cn(Ze === "self" ? oe : Ze);
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
  function Zt(C) {
    return C ? C.endsWithParent || Zt(C.starts) : !1;
  }
  function cn(C) {
    return C.variants && !C.cachedVariants && (C.cachedVariants = C.variants.map(function(z) {
      return r(C, { variants: null }, z);
    })), C.cachedVariants ? C.cachedVariants : Zt(C) ? r(C, { starts: C.starts ? r(C.starts) : null }) : Object.isFrozen(C) ? r(C) : C;
  }
  var lt = "11.11.1";
  class mt extends Error {
    constructor(z, Z) {
      super(z), this.name = "HTMLInjectionError", this.html = Z;
    }
  }
  const gt = t, Pr = r, Or = Symbol("nomatch"), dr = 7, Un = function(C) {
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
      typeof ue == "object" ? (He = V, Ae = ue.ignoreIllegals, tt = ue.language) : (L("10.7.0", "highlight(lang, code, ...args) has been deprecated."), L("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), tt = V, He = ue), Ae === void 0 && (Ae = !0);
      const Ut = {
        code: He,
        language: tt
      };
      Br("before:highlight", Ut);
      const kn = Ut.result ? Ut.result : bn(Ut.language, Ut.code, Ae);
      return kn.code = Ut.code, Br("after:highlight", kn), kn;
    }
    function bn(V, ue, Ae, He) {
      const tt = /* @__PURE__ */ Object.create(null);
      function Ut(J, ae) {
        return J.keywords[ae];
      }
      function kn() {
        if (!we.keywords) {
          ct.addText(qe);
          return;
        }
        let J = 0;
        we.keywordPatternRe.lastIndex = 0;
        let ae = we.keywordPatternRe.exec(qe), Ce = "";
        for (; ae; ) {
          Ce += qe.substring(J, ae.index);
          const Oe = en.case_insensitive ? ae[0].toLowerCase() : ae[0], ut = Ut(we, Oe);
          if (ut) {
            const [dn, $c] = ut;
            if (ct.addText(Ce), Ce = "", tt[Oe] = (tt[Oe] || 0) + 1, tt[Oe] <= dr && (Hr += $c), dn.startsWith("_"))
              Ce += ae[0];
            else {
              const Ic = en.classNameAliases[dn] || dn;
              Jt(ae[0], Ic);
            }
          } else
            Ce += ae[0];
          J = we.keywordPatternRe.lastIndex, ae = we.keywordPatternRe.exec(qe);
        }
        Ce += qe.substring(J), ct.addText(Ce);
      }
      function Fr() {
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
        we.relevance > 0 && (Hr += J.relevance), ct.__addSublanguage(J._emitter, J.language);
      }
      function It() {
        we.subLanguage != null ? Fr() : kn(), qe = "";
      }
      function Jt(J, ae) {
        J !== "" && (ct.startScope(ae), ct.addText(J), ct.endScope());
      }
      function cs(J, ae) {
        let Ce = 1;
        const Oe = ae.length - 1;
        for (; Ce <= Oe; ) {
          if (!J._emit[Ce]) {
            Ce++;
            continue;
          }
          const ut = en.classNameAliases[J[Ce]] || J[Ce], dn = ae[Ce];
          ut ? Jt(dn, ut) : (qe = dn, kn(), qe = ""), Ce++;
        }
      }
      function us(J, ae) {
        return J.scope && typeof J.scope == "string" && ct.openNode(en.classNameAliases[J.scope] || J.scope), J.beginScope && (J.beginScope._wrap ? (Jt(qe, en.classNameAliases[J.beginScope._wrap] || J.beginScope._wrap), qe = "") : J.beginScope._multi && (cs(J.beginScope, ae), qe = "")), we = Object.create(J, { parent: { value: we } }), we;
      }
      function ds(J, ae, Ce) {
        let Oe = g(J.endRe, Ce);
        if (Oe) {
          if (J["on:end"]) {
            const ut = new n(J);
            J["on:end"](ae, ut), ut.isMatchIgnored && (Oe = !1);
          }
          if (Oe) {
            for (; J.endsParent && J.parent; )
              J = J.parent;
            return J;
          }
        }
        if (J.endsWithParent)
          return ds(J.parent, ae, Ce);
      }
      function vc(J) {
        return we.matcher.regexIndex === 0 ? (qe += J[0], 1) : (Si = !0, 0);
      }
      function Ec(J) {
        const ae = J[0], Ce = J.rule, Oe = new n(Ce), ut = [Ce.__beforeBegin, Ce["on:begin"]];
        for (const dn of ut)
          if (dn && (dn(J, Oe), Oe.isMatchIgnored))
            return vc(ae);
        return Ce.skip ? qe += ae : (Ce.excludeBegin && (qe += ae), It(), !Ce.returnBegin && !Ce.excludeBegin && (qe = ae)), us(Ce, J), Ce.returnBegin ? 0 : ae.length;
      }
      function Sc(J) {
        const ae = J[0], Ce = ue.substring(J.index), Oe = ds(we, J, Ce);
        if (!Oe)
          return Or;
        const ut = we;
        we.endScope && we.endScope._wrap ? (It(), Jt(ae, we.endScope._wrap)) : we.endScope && we.endScope._multi ? (It(), cs(we.endScope, J)) : ut.skip ? qe += ae : (ut.returnEnd || ut.excludeEnd || (qe += ae), It(), ut.excludeEnd && (qe = ae));
        do
          we.scope && ct.closeNode(), !we.skip && !we.subLanguage && (Hr += we.relevance), we = we.parent;
        while (we !== Oe.parent);
        return Oe.starts && us(Oe.starts, J), ut.returnEnd ? 0 : ae.length;
      }
      function Cc() {
        const J = [];
        for (let ae = we; ae !== en; ae = ae.parent)
          ae.scope && J.unshift(ae.scope);
        J.forEach((ae) => ct.openNode(ae));
      }
      let jr = {};
      function fs(J, ae) {
        const Ce = ae && ae[0];
        if (qe += J, Ce == null)
          return It(), 0;
        if (jr.type === "begin" && ae.type === "end" && jr.index === ae.index && Ce === "") {
          if (qe += ue.slice(ae.index, ae.index + 1), !Ke) {
            const Oe = new Error(`0 width match regex (${V})`);
            throw Oe.languageName = V, Oe.badRule = jr.rule, Oe;
          }
          return 1;
        }
        if (jr = ae, ae.type === "begin")
          return Ec(ae);
        if (ae.type === "illegal" && !Ae) {
          const Oe = new Error('Illegal lexeme "' + Ce + '" for mode "' + (we.scope || "<unnamed>") + '"');
          throw Oe.mode = we, Oe;
        } else if (ae.type === "end") {
          const Oe = Sc(ae);
          if (Oe !== Or)
            return Oe;
        }
        if (ae.type === "illegal" && Ce === "")
          return qe += `
`, 1;
        if (Ei > 1e5 && Ei > ae.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return qe += Ce, Ce.length;
      }
      const en = yn(V);
      if (!en)
        throw it(je.replace("{}", V)), new Error('Unknown language: "' + V + '"');
      const Nc = ot(en);
      let vi = "", we = He || Nc;
      const ps = {}, ct = new ee.__emitter(ee);
      Cc();
      let qe = "", Hr = 0, Ln = 0, Ei = 0, Si = !1;
      try {
        if (en.__emitTokens)
          en.__emitTokens(ue, ct);
        else {
          for (we.matcher.considerAll(); ; ) {
            Ei++, Si ? Si = !1 : we.matcher.considerAll(), we.matcher.lastIndex = Ln;
            const J = we.matcher.exec(ue);
            if (!J) break;
            const ae = ue.substring(Ln, J.index), Ce = fs(ae, J);
            Ln = J.index + Ce;
          }
          fs(ue.substring(Ln));
        }
        return ct.finalize(), vi = ct.toHTML(), {
          language: V,
          value: vi,
          relevance: Hr,
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
      const tt = He.sort((It, Jt) => {
        if (It.relevance !== Jt.relevance) return Jt.relevance - It.relevance;
        if (It.language && Jt.language) {
          if (yn(It.language).supersetOf === Jt.language)
            return 1;
          if (yn(Jt.language).supersetOf === It.language)
            return -1;
        }
        return 0;
      }), [Ut, kn] = tt, Fr = Ut;
      return Fr.secondBest = kn, Fr;
    }
    function xt(V, ue, Ae) {
      const He = ue && Z[ue] || Ae;
      V.classList.add("hljs"), V.classList.add(`language-${He}`);
    }
    function zt(V) {
      let ue = null;
      const Ae = Qe(V);
      if (pe(Ae)) return;
      if (Br(
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
      }), Br("after:highlightElement", { el: V, result: tt, text: He });
    }
    function un(V) {
      ee = Pr(ee, V);
    }
    const qt = () => {
      Wn(), L("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Qt() {
      Wn(), L("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let zr = !1;
    function Wn() {
      function V() {
        Wn();
      }
      if (document.readyState === "loading") {
        zr || window.addEventListener("DOMContentLoaded", V, !1), zr = !0;
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
    function yc(V) {
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
    function kc(V) {
      yc(V), ge.push(V);
    }
    function wc(V) {
      const ue = ge.indexOf(V);
      ue !== -1 && ge.splice(ue, 1);
    }
    function Br(V, ue) {
      const Ae = V;
      ge.forEach(function(He) {
        He[Ae] && He[Ae](ue);
      });
    }
    function xc(V) {
      return L("10.7.0", "highlightBlock will be removed entirely in v12.0"), L("10.7.0", "Please use highlightElement now."), zt(V);
    }
    Object.assign(C, {
      highlight: Ze,
      highlightAuto: Se,
      highlightAll: Wn,
      highlightElement: zt,
      // TODO: Remove with v12 API
      highlightBlock: xc,
      configure: un,
      initHighlighting: qt,
      initHighlightingOnLoad: Qt,
      registerLanguage: fr,
      unregisterLanguage: Gn,
      listLanguages: Vn,
      getLanguage: yn,
      registerAliases: as,
      autoDetection: ls,
      inherit: Pr,
      addPlugin: kc,
      removePlugin: wc
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
var ip = /* @__PURE__ */ rp();
const Nt = /* @__PURE__ */ zo(ip), ci = "[A-Za-z$_][0-9A-Za-z$_]*", Xa = [
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
], Ka = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Ya = [
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
], Za = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Qa = [
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
], Ja = [
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
], el = [].concat(
  Qa,
  Ya,
  Za
);
function op(e) {
  const n = e.regex, t = (B, { after: P }) => {
    const w = "</" + B[0].slice(1);
    return B.input.indexOf(w, P) !== -1;
  }, r = ci, i = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, s = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (B, P) => {
      const w = B[0].length + B.index, X = B.input[w];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        X === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        X === ","
      ) {
        P.ignoreMatch();
        return;
      }
      X === ">" && (t(B, { after: w }) || P.ignoreMatch());
      let ce;
      const E = B.input.substring(w);
      if (ce = E.match(/^\s*=/)) {
        P.ignoreMatch();
        return;
      }
      if ((ce = E.match(/^\s+extends\s+/)) && ce.index === 0) {
        P.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: ci,
    keyword: Xa,
    literal: Ka,
    built_in: el,
    "variable.language": Ja
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
  ]), x = {
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
  }, I = {
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
        ...Ya,
        ...Za
      ]
    }
  }, R = {
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
    contains: [x],
    illegal: /%/
  }, O = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function D(B) {
    return n.concat("(?!", B.join("|"), ")");
  }
  const q = {
    match: n.concat(
      /\b/,
      D([
        ...Qa,
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
  }, A = {
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
      x
    ]
  }, T = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", j = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(T)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      x
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: v, CLASS_REFERENCE: I },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      R,
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
      I,
      {
        scope: "attr",
        match: r + n.lookahead(":"),
        relevance: 0
      },
      j,
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
            begin: T,
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
          x,
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
        contains: [x]
      },
      q,
      O,
      $,
      A,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Bo(e) {
  const n = e.regex, t = op(e), r = ci, i = [
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
    $pattern: ci,
    keyword: Xa.concat(c),
    literal: Ka,
    built_in: el.concat(i),
    "variable.language": Ja
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
const Ss = "[A-Za-z$_][0-9A-Za-z$_]*", sp = [
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
], ap = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], tl = [
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
], nl = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], rl = [
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
], lp = [
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
], cp = [].concat(
  rl,
  tl,
  nl
);
function Fo(e) {
  const n = e.regex, t = (B, { after: P }) => {
    const w = "</" + B[0].slice(1);
    return B.input.indexOf(w, P) !== -1;
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
    isTrulyOpeningTag: (B, P) => {
      const w = B[0].length + B.index, X = B.input[w];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        X === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        X === ","
      ) {
        P.ignoreMatch();
        return;
      }
      X === ">" && (t(B, { after: w }) || P.ignoreMatch());
      let ce;
      const E = B.input.substring(w);
      if (ce = E.match(/^\s*=/)) {
        P.ignoreMatch();
        return;
      }
      if ((ce = E.match(/^\s+extends\s+/)) && ce.index === 0) {
        P.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: Ss,
    keyword: sp,
    literal: ap,
    built_in: cp,
    "variable.language": lp
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
  ]), x = {
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
  }, I = {
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
        ...tl,
        ...nl
      ]
    }
  }, R = {
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
    contains: [x],
    illegal: /%/
  }, O = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function D(B) {
    return n.concat("(?!", B.join("|"), ")");
  }
  const q = {
    match: n.concat(
      /\b/,
      D([
        ...rl,
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
  }, A = {
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
      x
    ]
  }, T = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", j = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(T)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      x
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: v, CLASS_REFERENCE: I },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      R,
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
      I,
      {
        scope: "attr",
        match: r + n.lookahead(":"),
        relevance: 0
      },
      j,
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
            begin: T,
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
          x,
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
        contains: [x]
      },
      q,
      O,
      $,
      A,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function il(e) {
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
const up = (e) => ({
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
}), dp = [
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
], fp = [
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
], pp = [
  ...dp,
  ...fp
], hp = [
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
].sort().reverse(), mp = [
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
].sort().reverse(), gp = [
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
].sort().reverse(), _p = [
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
function bp(e) {
  const n = e.regex, t = up(e), r = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, i = "and or not only", o = /@-?\w[\w]*(-\w+)*/, s = "[a-zA-Z-][a-zA-Z0-9_-]*", a = [
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
          { begin: ":(" + mp.join("|") + ")" },
          { begin: ":(:)?(" + gp.join("|") + ")" }
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
        begin: "\\b(" + _p.join("|") + ")\\b"
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
              attribute: hp.join(" ")
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
        begin: "\\b(" + pp.join("|") + ")\\b"
      }
    ]
  };
}
function yp(e) {
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
Nt.registerLanguage("html", il);
Nt.registerLanguage("xml", il);
Nt.registerLanguage("css", bp);
Nt.registerLanguage("json", yp);
Nt.registerLanguage("bash", jo);
Nt.registerLanguage("sh", jo);
Nt.registerLanguage("shell", jo);
const kp = "_container_1b601_1", wp = "_copyButtonFloating_1b601_7", xp = "_header_1b601_13", vp = "_language_1b601_21", Ep = "_pre_1b601_31", Sp = "_code_1b601_37", Cp = "_line_1b601_50", Np = "_lineNumber_1b601_54", $p = "_lineContent_1b601_64", Ip = "_copyButton_1b601_7", Ap = "_copied_1b601_89", Mp = "_copyLabel_1b601_94", st = {
  container: kp,
  copyButtonFloating: wp,
  header: xp,
  language: vp,
  pre: Ep,
  code: Sp,
  line: Cp,
  lineNumber: Np,
  lineContent: $p,
  copyButton: Ip,
  copied: Ap,
  copyLabel: Mp
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
), tI = ({
  children: e,
  language: n,
  showLineNumbers: t = !1,
  className: r = ""
}) => {
  const [i, o] = W(!1), s = K(() => {
    navigator.clipboard.writeText(e).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3);
    });
  }, [e]), a = jt(() => {
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
const Gr = 18, Lp = 8, ol = ({
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
    const [_, b, k] = sl(e / 360, 1, 1);
    m.fillStyle = `rgb(${_},${b},${k})`, m.fillRect(0, 0, i, c);
    const g = m.createLinearGradient(0, 0, i, 0);
    g.addColorStop(0, "rgba(255,255,255,1)"), g.addColorStop(1, "rgba(255,255,255,0)"), m.fillStyle = g, m.fillRect(0, 0, i, c);
    const S = m.createLinearGradient(0, 0, 0, c);
    S.addColorStop(0, "rgba(0,0,0,0)"), S.addColorStop(1, "rgba(0,0,0,1)"), m.fillStyle = S, m.fillRect(0, 0, i, c);
    const v = n * i, x = (1 - t) * c;
    m.beginPath(), m.arc(v, x, 6, 0, Math.PI * 2), m.strokeStyle = "#ffffff", m.lineWidth = 2, m.stroke(), m.beginPath(), m.arc(v, x, 7.5, 0, Math.PI * 2), m.strokeStyle = "rgba(0,0,0,0.25)", m.lineWidth = 1, m.stroke();
  }, [e, n, t, i, c]), u = K(() => {
    const f = s.current;
    if (!f) return;
    const m = f.getContext("2d");
    if (!m) return;
    const y = window.devicePixelRatio || 1;
    f.width = i * y, f.height = Gr * y, m.scale(y, y);
    const _ = m.createLinearGradient(0, 0, i, 0);
    for (let g = 0; g <= 6; g++)
      _.addColorStop(g / 6, `hsl(${g * 60}, 100%, 50%)`);
    m.fillStyle = _, m.fillRect(0, 0, i, Gr);
    const b = e / 360 * i, k = Gr / 2;
    m.beginPath(), m.arc(b, k, 6, 0, Math.PI * 2), m.strokeStyle = "#ffffff", m.lineWidth = 2, m.stroke(), m.beginPath(), m.arc(b, k, 7.5, 0, Math.PI * 2), m.strokeStyle = "rgba(0,0,0,0.25)", m.lineWidth = 1, m.stroke();
  }, [e, i]);
  le(() => {
    l();
  }, [l]), le(() => {
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
  return le(() => {
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
        gap: Lp,
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
            style: { width: i, height: Gr, cursor: "crosshair", display: "block" }
          }
        ) })
      ]
    }
  );
};
function sl(e, n, t) {
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
function al(e, n, t) {
  return "#" + sl(e / 360, n, t).map((i) => i.toString(16).padStart(2, "0")).join("");
}
function oi(e) {
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
const Rp = "_colorPicker_kodlw_1", Tp = "_inputRow_kodlw_9", Dp = "_swatch_kodlw_15", Pp = "_swatchFrame_kodlw_30", Op = "_swatchFrameError_kodlw_43", zp = "_opacityInput_kodlw_48", Bp = "_dropdown_kodlw_53", Fp = "_wheelContainer_kodlw_62", jp = "_swatchGrid_kodlw_66", Hp = "_swatchOption_kodlw_74", qp = "_swatchSelected_kodlw_88", Wt = {
  colorPicker: Rp,
  inputRow: Tp,
  swatch: Dp,
  swatchFrame: Pp,
  swatchFrameError: Op,
  opacityInput: zp,
  dropdown: Bp,
  wheelContainer: Fp,
  swatchGrid: jp,
  swatchOption: Hp,
  swatchSelected: qp
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
  const b = y !== void 0, [k, g] = W(!1), S = b ? y : k, [v, x] = W(null), $ = Y(null), I = jt(
    () => Pi.test(e) ? oi(e) : { h: 0, s: 1, v: 1 },
    [e]
  ), R = {
    ...I,
    h: v !== null ? v : I.h
  }, N = (T) => {
    b ? _ == null || _(T) : g(T);
  }, O = () => {
    l || N(!S);
  }, D = (T) => {
    const j = "#" + T.replace(/^#/, "");
    Pi.test(j) && (x(null), n(j.toLowerCase()));
  }, q = (T, j, B) => {
    x(T), n(al(T, j, B));
  }, F = /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: Wt.swatch,
      style: {
        backgroundColor: Pi.test(e) ? e : "#000000",
        opacity: t !== void 0 ? t : 1
      },
      onClick: O,
      disabled: l,
      "aria-label": "Open color picker",
      "data-testid": "color-swatch"
    }
  ), A = /* @__PURE__ */ M("div", { ref: $, className: Wt.colorPicker, children: [
    /* @__PURE__ */ M("div", { className: Wt.inputRow, children: [
      h ? /* @__PURE__ */ p(
        Pt,
        {
          id: u,
          prefix: "#",
          value: e.replace(/^#/, ""),
          onChange: D,
          error: !!a,
          prefixSlot: F
        }
      ) : /* @__PURE__ */ p("div", { className: `${Wt.swatchFrame} ${a ? Wt.swatchFrameError : ""}`, children: F }),
      r && /* @__PURE__ */ p(
        Pt,
        {
          prefix: "%",
          type: "number",
          value: String(Math.round((t ?? 1) * 100)),
          onChange: (T) => r(Math.min(100, Math.max(0, Number(T))) / 100),
          min: 0,
          max: 100,
          scrub: !0,
          className: Wt.opacityInput
        }
      )
    ] }),
    /* @__PURE__ */ M(
      Ct,
      {
        isOpen: S,
        onClose: () => N(!1),
        anchorRef: $,
        className: Wt.dropdown,
        role: "dialog",
        "aria-label": "Color picker",
        offsetX: f,
        offsetY: m,
        children: [
          /* @__PURE__ */ p("div", { className: Wt.wheelContainer, children: /* @__PURE__ */ p(
            ol,
            {
              hue: R.h,
              saturation: R.s,
              brightness: R.v,
              onChange: q
            }
          ) }),
          d && d.length > 0 && /* @__PURE__ */ p("div", { className: Wt.swatchGrid, children: d.map((T) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              className: `${Wt.swatchOption} ${e.toLowerCase() === T.toLowerCase() ? Wt.swatchSelected : ""}`,
              style: { backgroundColor: T },
              onClick: () => {
                x(null), n(T.toLowerCase()), N(!1);
              },
              "aria-label": `Select color ${T}`
            },
            T
          )) }),
          /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p(
            Pt,
            {
              prefix: "#",
              value: e.replace(/^#/, ""),
              onChange: D
            }
          ) })
        ]
      }
    )
  ] });
  return /* @__PURE__ */ p(ai, { label: i, labelPosition: o, labelWidth: s, htmlFor: u, disabled: l, error: a, helperText: c, children: A });
}, Up = "_wrapper_qs2di_1", Wp = "_table_qs2di_5", Gp = "_checkboxCol_qs2di_11", Vp = "_headerCell_qs2di_16", Xp = "_checkboxCell_qs2di_29", Kp = "_sortButton_qs2di_40", Yp = "_sortIcon_qs2di_59", Zp = "_row_qs2di_66", Qp = "_cell_qs2di_69", Jp = "_sortedCell_qs2di_78", eh = "_selected_qs2di_81", th = "_clickable_qs2di_86", nh = "_compact_qs2di_95", rh = "_striped_qs2di_102", ih = "_emptyCell_qs2di_109", rt = {
  wrapper: Up,
  table: Wp,
  checkboxCol: Gp,
  headerCell: Vp,
  checkboxCell: Xp,
  sortButton: Kp,
  sortIcon: Yp,
  row: Zp,
  cell: Qp,
  sortedCell: Jp,
  selected: eh,
  clickable: th,
  compact: nh,
  striped: rh,
  emptyCell: ih
};
function $s(e, n, t) {
  return typeof n == "function" ? n(e) : String(e[n] ?? t);
}
function nI({
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
  const [y, _] = W([]), [b, k] = W(void 0), [g, S] = W("asc"), v = i !== void 0, x = v ? i : y, $ = l !== void 0, I = $ ? a : b, R = $ ? c ?? "asc" : g, N = (w) => {
    let X = "asc";
    I === w && (X = R === "asc" ? "desc" : "asc"), $ ? l(w, X) : (k(w), S(X));
  }, O = (w, X) => {
    const ce = X ? [...x, w] : x.filter((E) => E !== w);
    v || _(ce), o == null || o(ce);
  }, D = Ve.useMemo(
    () => n.map((w, X) => $s(w, t, X)),
    [n, t]
  ), q = Ve.useMemo(() => new Set(x), [x]), F = D.length > 0 && D.every((w) => q.has(w)), A = !F && D.some((w) => q.has(w)), T = (w) => {
    const X = w ? D : [];
    v || _(X), o == null || o(X);
  }, j = Ve.useMemo(() => !I || $ ? n : [...n].sort((w, X) => {
    const ce = w[I], E = X[I], be = String(ce ?? ""), fe = String(E ?? ""), De = be.localeCompare(fe, void 0, { numeric: !0 });
    return R === "asc" ? De : -De;
  }), [n, I, R, $]), B = e.length + (r ? 1 : 0), P = [
    rt.table,
    u ? rt.striped : "",
    d ? rt.compact : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: `${rt.wrapper} ${f}`, children: /* @__PURE__ */ M("table", { className: P, children: [
    m && /* @__PURE__ */ p("caption", { children: m }),
    /* @__PURE__ */ M("colgroup", { children: [
      r && /* @__PURE__ */ p("col", { className: rt.checkboxCol }),
      e.map((w) => /* @__PURE__ */ p("col", { style: w.width ? { width: w.width } : void 0 }, w.key))
    ] }),
    /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ M("tr", { children: [
      r && /* @__PURE__ */ p("th", { scope: "col", className: `${rt.headerCell} ${rt.checkboxCell}`, children: /* @__PURE__ */ p(
        vs,
        {
          checked: F || A,
          onChange: T
        }
      ) }),
      e.map((w) => {
        const X = I === w.key, ce = w.sortable ? X ? R === "asc" ? "ascending" : "descending" : "none" : void 0;
        return /* @__PURE__ */ p(
          "th",
          {
            scope: "col",
            className: `${rt.headerCell}${X ? ` ${rt.sorted}` : ""}`,
            "aria-sort": ce,
            children: w.sortable ? /* @__PURE__ */ M(
              "button",
              {
                type: "button",
                className: rt.sortButton,
                onClick: () => N(w.key),
                "aria-label": `Sort by ${w.header}`,
                children: [
                  w.header,
                  /* @__PURE__ */ p("span", { className: rt.sortIcon, "aria-hidden": "true", children: X ? R === "asc" ? /* @__PURE__ */ p(_u, { size: 14 }) : /* @__PURE__ */ p(hu, { size: 14 }) : /* @__PURE__ */ p(gu, { size: 14 }) })
                ]
              }
            ) : w.header
          },
          w.key
        );
      })
    ] }) }),
    /* @__PURE__ */ p("tbody", { children: j.length === 0 ? /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", { colSpan: B, className: rt.emptyCell, children: h }) }) : j.map((w, X) => {
      const ce = $s(w, t, X), E = q.has(ce), be = [
        rt.row,
        s ? rt.clickable : "",
        E ? rt.selected : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ M(
        "tr",
        {
          className: be,
          tabIndex: s ? 0 : void 0,
          onClick: s ? () => s(w) : void 0,
          onKeyDown: s ? (fe) => {
            (fe.key === "Enter" || fe.key === " ") && (fe.preventDefault(), s(w));
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
                    onChange: (fe) => O(ce, fe)
                  }
                )
              }
            ),
            e.map((fe) => /* @__PURE__ */ p(
              "td",
              {
                className: `${rt.cell}${I === fe.key ? ` ${rt.sortedCell}` : ""}`,
                children: fe.render ? fe.render(w[fe.key], w) : String(w[fe.key] ?? "")
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
const oh = "_datePicker_23zmh_2", sh = "_inputRow_23zmh_7", ah = "_input_23zmh_7", lh = "_inputOpen_23zmh_30", ch = "_inputError_23zmh_34", uh = "_inputDisabled_23zmh_38", dh = "_calendarIcon_23zmh_48", fh = "_dropdown_23zmh_60", ph = "_calendarHeader_23zmh_71", hh = "_navButton_23zmh_78", mh = "_monthYear_23zmh_91", gh = "_weekHeader_23zmh_98", _h = "_weekDay_23zmh_105", bh = "_dayGrid_23zmh_112", yh = "_day_23zmh_112", kh = "_disabled_23zmh_134", wh = "_selected_23zmh_134", xh = "_rangeStart_23zmh_134", vh = "_rangeEnd_23zmh_134", Eh = "_today_23zmh_138", Sh = "_inRange_23zmh_148", Ch = "_emptyDay_23zmh_176", Ye = {
  datePicker: oh,
  inputRow: sh,
  input: ah,
  inputOpen: lh,
  inputError: ch,
  inputDisabled: uh,
  calendarIcon: dh,
  dropdown: fh,
  calendarHeader: ph,
  navButton: hh,
  monthYear: mh,
  weekHeader: gh,
  weekDay: _h,
  dayGrid: bh,
  day: yh,
  disabled: kh,
  selected: wh,
  rangeStart: xh,
  rangeEnd: vh,
  today: Eh,
  inRange: Sh,
  emptyDay: Ch
}, Nh = [
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
], $h = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function Ih(e, n) {
  return new Date(e, n + 1, 0).getDate();
}
function Ah(e, n) {
  return new Date(e, n, 1).getDay();
}
function ll(e, n, t) {
  const r = String(n + 1).padStart(2, "0"), i = String(t).padStart(2, "0");
  return `${e}-${r}-${i}`;
}
function Mh() {
  const e = /* @__PURE__ */ new Date();
  return ll(e.getFullYear(), e.getMonth(), e.getDate());
}
function Lh(e) {
  if (!e) return null;
  const n = e.split("-");
  return n.length !== 3 ? null : {
    year: parseInt(n[0], 10),
    month: parseInt(n[1], 10) - 1,
    day: parseInt(n[2], 10)
  };
}
const Rh = ({
  mode: e,
  selectedDate: n,
  selectedEndDate: t,
  onSelectDate: r,
  min: i,
  max: o
}) => {
  const s = Lh(n), a = /* @__PURE__ */ new Date(), [c, l] = W(s ? s.year : a.getFullYear()), [u, d] = W(s ? s.month : a.getMonth()), h = Mh(), f = Ih(c, u), m = Ah(c, u), y = () => {
    u === 0 ? (d(11), l(c - 1)) : d(u - 1);
  }, _ = () => {
    u === 11 ? (d(0), l(c + 1)) : d(u + 1);
  }, b = (x) => !!(i && x < i || o && x > o), k = (x) => e !== "range" || !n || !t ? !1 : x > n && x < t, g = (x) => e !== "range" || !n ? !1 : x === n, S = (x) => e !== "range" || !t ? !1 : x === t, v = [];
  for (let x = 0; x < m; x++)
    v.push(/* @__PURE__ */ p("div", { className: Ye.emptyDay }, `empty-${x}`));
  for (let x = 1; x <= f; x++) {
    const $ = ll(c, u, x), I = b($), R = e === "single" && $ === n, N = g($), O = S($), D = k($), q = $ === h, F = [
      Ye.day,
      q && Ye.today,
      R && Ye.selected,
      N && Ye.rangeStart,
      O && Ye.rangeEnd,
      D && Ye.inRange,
      I && Ye.disabled
    ].filter(Boolean).join(" ");
    v.push(
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: F,
          onClick: () => r($),
          disabled: I,
          "aria-label": $,
          children: x
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
        Nh[u],
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
    /* @__PURE__ */ p("div", { className: Ye.weekHeader, children: $h.map((x) => /* @__PURE__ */ p("span", { className: Ye.weekDay, children: x }, x)) }),
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
function Th(e, n) {
  if (!e && !n) return "";
  if (e && !n) return Cr(e);
  if (!e && n) return Cr(n);
  const t = e.split("-"), r = n.split("-"), i = parseInt(t[1], 10) - 1, o = parseInt(t[2], 10), s = parseInt(t[0], 10), a = parseInt(r[1], 10) - 1, c = parseInt(r[2], 10), l = parseInt(r[0], 10);
  return s === l ? `${ho[i]} ${o} – ${ho[a]} ${c}, ${l}` : `${Cr(e)} – ${Cr(n)}`;
}
const rI = ({
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
  const [d, h] = W(!1), [f, m] = W(""), y = Y(null), _ = typeof n == "string" ? n : "", b = Array.isArray(n) ? n : ["", ""], k = e === "single" ? Cr(_) : Th(b[0], b[1]), g = () => {
    c || (h((R) => !R), d || m(""));
  }, S = (R) => {
    if (e === "single")
      t(R), h(!1);
    else if (!f)
      m(R);
    else {
      let N = f, O = R;
      O < N && ([N, O] = [O, N]), t([N, O]), m(""), u && h(!1);
    }
  }, v = K(
    (R) => {
      R.key === "Escape" && d && h(!1);
    },
    [d]
  );
  le(() => {
    const R = (N) => {
      y.current && !y.current.contains(N.target) && h(!1);
    };
    return document.addEventListener("mousedown", R), document.addEventListener("keydown", v), () => {
      document.removeEventListener("mousedown", R), document.removeEventListener("keydown", v);
    };
  }, [v]);
  const x = e === "single" ? _ : f || b[0], $ = e === "range" && !f ? b[1] : void 0, I = [
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
          className: I,
          placeholder: e === "range" ? "Select date range" : "Select date",
          disabled: c
        }
      ),
      /* @__PURE__ */ p("span", { className: Ye.calendarIcon, children: /* @__PURE__ */ p(yu, { size: 16 }) })
    ] }),
    d && /* @__PURE__ */ p("div", { className: Ye.dropdown, children: /* @__PURE__ */ p(
      Rh,
      {
        mode: e,
        selectedDate: x,
        selectedEndDate: $,
        onSelectDate: S,
        min: r,
        max: i
      }
    ) })
  ] }) });
}, Dh = "_divider_19a9q_1", Ph = "_sm_19a9q_3", Oh = "_md_19a9q_7", zh = "_lg_19a9q_11", Bh = "_horizontal_19a9q_16", Fh = "_vertical_19a9q_23", Kn = {
  divider: Dh,
  sm: Ph,
  md: Oh,
  lg: zh,
  horizontal: Bh,
  vertical: Fh
}, iI = ({
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
), jh = "_field_1fe9s_1", Hh = "_sm_1fe9s_12", qh = "_md_1fe9s_16", Uh = "_lg_1fe9s_20", Wh = "_editable_1fe9s_24", Gh = "_disabled_1fe9s_32", Vh = "_placeholder_1fe9s_37", Xh = "_editing_1fe9s_41", hn = {
  field: jh,
  sm: Hh,
  md: qh,
  lg: Uh,
  editable: Wh,
  disabled: Gh,
  placeholder: Vh,
  editing: Xh
}, Kh = {
  sm: hn.sm,
  md: hn.md,
  lg: hn.lg
}, oI = ({
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
  const u = an(t, "md"), d = Kh[u], [h, f] = W(!1), [m, y] = W(e), [_, b] = W(null), k = Y(null), g = Y(null);
  le(() => {
    h && g.current && (g.current.focus(), g.current.select());
  }, [h]);
  const S = () => {
    r || (k.current && b(k.current.offsetWidth), y(e), f(!0), a == null || a());
  }, v = () => {
    const D = m.trim();
    if (D === "") {
      x();
      return;
    }
    D !== e && n(m), f(!1), c == null || c("commit");
  }, x = () => {
    f(!1), l == null || l(), c == null || c("cancel");
  }, $ = (D) => {
    D.key === "Enter" && (D.preventDefault(), S());
  }, I = (D) => {
    D.key === "Enter" ? (D.preventDefault(), v()) : D.key === "Escape" && (D.preventDefault(), x());
  };
  if (h) {
    const D = [hn.field, d, hn.editing, s].filter(Boolean).join(" ");
    return /* @__PURE__ */ p(
      "input",
      {
        ref: g,
        type: "text",
        className: D,
        value: m,
        placeholder: i,
        "aria-label": o ?? e,
        onChange: (q) => y(q.target.value),
        onKeyDown: I,
        onBlur: v,
        style: _ !== null ? { width: _ } : void 0
      }
    );
  }
  const R = e === "" ? i ?? "" : e, N = e === "", O = [
    hn.field,
    d,
    r ? "" : hn.editable,
    r ? hn.disabled : "",
    N ? hn.placeholder : "",
    s
  ].filter(Boolean).join(" ");
  return r ? /* @__PURE__ */ p("span", { ref: k, className: O, children: R }) : /* @__PURE__ */ p(
    "span",
    {
      ref: k,
      className: O,
      role: "button",
      tabIndex: 0,
      "aria-label": o ?? e,
      onDoubleClick: S,
      onKeyDown: $,
      children: R
    }
  );
}, Yh = "_root_1s2xm_1", Zh = "_illustration_1s2xm_13", Qh = "_title_1s2xm_23", Jh = "_description_1s2xm_31", em = "_actions_1s2xm_38", gr = {
  root: Yh,
  illustration: Zh,
  title: Qh,
  description: Jh,
  actions: em
}, sI = ({ illustration: e, title: n, description: t, className: r = "", children: i }) => /* @__PURE__ */ M("div", { className: `${gr.root} ${r}`, children: [
  e && /* @__PURE__ */ p("div", { className: gr.illustration, children: e }),
  /* @__PURE__ */ p("p", { className: gr.title, children: n }),
  t && /* @__PURE__ */ p("p", { className: gr.description, children: t }),
  i && /* @__PURE__ */ p("div", { className: gr.actions, children: i })
] }), tm = "_wrapper_1t29v_1", nm = "_inputWrapper_1t29v_5", rm = "_input_1t29v_5", im = "_searchIcon_1t29v_24", om = "_dropdown_1t29v_33", sm = "_result_1t29v_58", am = "_resultActive_1t29v_77", lm = "_resultIcon_1t29v_84", cm = "_resultContent_1t29v_92", um = "_resultTitle_1t29v_99", dm = "_resultDescription_1t29v_106", fm = "_statusMessage_1t29v_115", Dt = {
  wrapper: tm,
  inputWrapper: nm,
  input: rm,
  searchIcon: im,
  dropdown: om,
  result: sm,
  resultActive: am,
  resultIcon: lm,
  resultContent: cm,
  resultTitle: um,
  resultDescription: dm,
  statusMessage: fm
}, pm = ({ result: e, active: n }) => /* @__PURE__ */ M("div", { className: `${Dt.result} ${n ? Dt.resultActive : ""}`, children: [
  e.icon && /* @__PURE__ */ p("span", { className: Dt.resultIcon, children: e.icon }),
  /* @__PURE__ */ M("div", { className: Dt.resultContent, children: [
    /* @__PURE__ */ p("span", { className: Dt.resultTitle, children: e.title }),
    e.description && /* @__PURE__ */ p("span", { className: Dt.resultDescription, children: e.description })
  ] })
] }), aI = ({
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
  const [u, d] = W(!1), [h, f] = W(-1), m = Y(null), y = Y(null), _ = Y(null), b = Y(null), k = u && (e.length > 0 || i);
  le(() => {
    f(-1);
  }, [t]), le(() => {
    function $(I) {
      m.current && !m.current.contains(I.target) && d(!1);
    }
    return document.addEventListener("mousedown", $), () => document.removeEventListener("mousedown", $);
  }, []), le(() => {
    if (!c) return;
    function $(I) {
      var R;
      (I.metaKey || I.ctrlKey) && I.key === "k" && (I.preventDefault(), (R = y.current) == null || R.focus());
    }
    return document.addEventListener("keydown", $), () => document.removeEventListener("keydown", $);
  }, [c]), le(() => {
    if (!(h < 0 || !_.current))
      return b.current !== null && clearTimeout(b.current), b.current = setTimeout(() => {
        var R;
        if (b.current = null, !_.current) return;
        const I = _.current.querySelectorAll("[data-result-index]")[h];
        (R = I == null ? void 0 : I.scrollIntoView) == null || R.call(I, { block: "nearest" });
      }, 50), () => {
        b.current !== null && (clearTimeout(b.current), b.current = null);
      };
  }, [h]);
  const g = K(
    ($) => {
      var I, R;
      if (k)
        switch ($.key) {
          case "ArrowDown":
            $.preventDefault(), f(
              (N) => N < t.length - 1 ? N + 1 : 0
            );
            break;
          case "ArrowUp":
            $.preventDefault(), f(
              (N) => N > 0 ? N - 1 : t.length - 1
            );
            break;
          case "Enter":
            $.preventDefault(), h >= 0 && h < t.length && (r(t[h].id), d(!1), (I = y.current) == null || I.blur());
            break;
          case "Escape":
            $.preventDefault(), d(!1), (R = y.current) == null || R.blur();
            break;
        }
    },
    [k, t, h, r]
  ), S = ($) => {
    n($.target.value), d(!0);
  }, v = () => {
    (e.length > 0 || i) && d(!0);
  }, x = ($) => {
    var I;
    r($), d(!1), (I = y.current) == null || I.blur();
  };
  return /* @__PURE__ */ M(
    "div",
    {
      ref: m,
      className: `${Dt.wrapper}${l ? ` ${l}` : ""}`,
      children: [
        /* @__PURE__ */ M("div", { className: Dt.inputWrapper, children: [
          /* @__PURE__ */ p(Mo, { size: 14, className: Dt.searchIcon }),
          /* @__PURE__ */ p(
            "input",
            {
              ref: y,
              type: "text",
              value: e,
              onChange: S,
              onFocus: v,
              onKeyDown: g,
              placeholder: o,
              className: Dt.input,
              role: "combobox",
              "aria-expanded": k,
              "aria-haspopup": "listbox",
              "aria-autocomplete": "list",
              "aria-label": "Search"
            }
          )
        ] }),
        k && /* @__PURE__ */ p("div", { ref: _, className: Dt.dropdown, role: "listbox", children: i && t.length === 0 ? /* @__PURE__ */ p("div", { className: Dt.statusMessage, children: "Searching..." }) : t.length === 0 ? /* @__PURE__ */ p("div", { className: Dt.statusMessage, children: s }) : t.map(($, I) => /* @__PURE__ */ p(
          "div",
          {
            "data-result-index": I,
            role: "option",
            "aria-selected": I === h,
            onClick: () => x($.id),
            onMouseEnter: () => f(I),
            children: a ? a($) : /* @__PURE__ */ p(
              pm,
              {
                result: $,
                active: I === h
              }
            )
          },
          $.id
        )) })
      ]
    }
  );
}, hm = "_inputRow_a7agn_3", mm = "_triggerInput_a7agn_7", gm = "_triggerSwatch_a7agn_19", _m = "_triggerValue_a7agn_27", bm = "_dropdown_a7agn_35", ym = "_gradientPicker_a7agn_43", km = "_typeRow_a7agn_51", wm = "_typeRowActions_a7agn_58", xm = "_typeSelect_a7agn_65", vm = "_angleInput_a7agn_69", Em = "_iconButton_a7agn_73", Sm = "_barWrapper_a7agn_99", Cm = "_bar_a7agn_99", Nm = "_stopHandle_a7agn_111", $m = "_stopHandleSelected_a7agn_128", Im = "_stopsHeader_a7agn_136", Am = "_stopsLabel_a7agn_142", Mm = "_stopsList_a7agn_148", Lm = "_stopEntry_a7agn_154", Rm = "_stopRow_a7agn_161", Tm = "_stopRowSelected_a7agn_177", Dm = "_positionInput_a7agn_182", Pm = "_colorPickerWrapper_a7agn_186", Ue = {
  inputRow: hm,
  triggerInput: mm,
  triggerSwatch: gm,
  triggerValue: _m,
  dropdown: bm,
  gradientPicker: ym,
  typeRow: km,
  typeRowActions: wm,
  typeSelect: xm,
  angleInput: vm,
  iconButton: Em,
  barWrapper: Sm,
  bar: Cm,
  stopHandle: Nm,
  stopHandleSelected: $m,
  stopsHeader: Im,
  stopsLabel: Am,
  stopsList: Mm,
  stopEntry: Lm,
  stopRow: Rm,
  stopRowSelected: Tm,
  positionInput: Dm,
  colorPickerWrapper: Pm
};
function Om(e) {
  const n = [];
  let t = 0, r = "";
  for (const i of e)
    i === "(" ? (t++, r += i) : i === ")" ? (t--, r += i) : i === "," && t === 0 ? (n.push(r), r = "") : r += i;
  return r.trim() && n.push(r), n;
}
function zm(e, n) {
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
  const o = t.slice(t.indexOf("(") + 1, t.lastIndexOf(")")), s = Om(o);
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
    const h = zm(s[d], String(++l));
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
const lI = ({
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
  const [l, u] = W(() => Oi(e)), [d, h] = W(() => {
    var P;
    return ((P = Oi(e).stops[0]) == null ? void 0 : P.id) ?? "";
  }), [f, m] = W(!1), [y, _] = W(null), b = Y(null), k = Y(null), g = Y(null), S = Y(e), v = K(
    (P) => {
      const w = zi(P);
      S.current = w, u(P), n(w);
    },
    [n]
  );
  le(() => {
    var P;
    if (e !== S.current) {
      S.current = e;
      const w = Oi(e);
      u(w), h(((P = w.stops[0]) == null ? void 0 : P.id) ?? "");
    }
  }, [e]);
  const x = jt(
    () => zi({ ...l, type: "linear", angle: 90 }),
    [l]
  ), $ = (P) => {
    if (P.target !== P.currentTarget) return;
    _(null);
    const w = k.current;
    if (!w) return;
    const X = w.getBoundingClientRect(), ce = Math.round(Math.max(0, Math.min(100, (P.clientX - X.left) / X.width * 100))), E = As(l.stops, ce), be = { id: Is(), color: E, position: ce, opacity: 1 }, fe = { ...l, stops: [...l.stops, be] };
    h(be.id), v(fe);
  }, I = (P, w) => {
    P.preventDefault(), _(null), h(w);
    const X = l.stops.find((ce) => ce.id === w);
    X && (g.current = { id: w, startX: P.clientX, startPos: X.position }, P.currentTarget.setPointerCapture(P.pointerId));
  }, R = (P) => {
    if (!g.current) return;
    const w = k.current;
    if (!w) return;
    const X = w.getBoundingClientRect(), ce = (P.clientX - g.current.startX) / X.width * 100, E = Math.round(Math.max(0, Math.min(100, g.current.startPos + ce))), be = {
      ...l,
      stops: l.stops.map((fe) => fe.id === g.current.id ? { ...fe, position: E } : fe)
    };
    u(be), n(zi(be));
  }, N = () => {
    g.current = null;
  }, O = () => {
    const P = [...l.stops].sort((E, be) => E.position - be.position);
    let w = 50;
    if (P.length >= 2) {
      let E = 0;
      for (let be = 0; be < P.length - 1; be++) {
        const fe = P[be + 1].position - P[be].position;
        fe > E && (E = fe, w = Math.round((P[be].position + P[be + 1].position) / 2));
      }
    }
    const X = { id: Is(), color: As(l.stops, w), position: w, opacity: 1 }, ce = { ...l, stops: [...l.stops, X] };
    h(X.id), v(ce);
  }, D = (P) => {
    if (l.stops.length <= 2) return;
    const w = { ...l, stops: l.stops.filter((X) => X.id !== P) };
    d === P && h(w.stops[0].id), v(w);
  }, q = (P, w) => {
    v({ ...l, stops: l.stops.map((X) => X.id === P ? { ...X, ...w } : X) });
  }, F = () => {
    v({ ...l, angle: (l.angle + 180) % 360 });
  }, A = () => {
    v({ ...l, stops: l.stops.map((P) => ({ ...P, position: 100 - P.position })) });
  }, T = jt(
    () => [...l.stops].sort((P, w) => P.position - w.position),
    [l.stops]
  ), j = /* @__PURE__ */ M("div", { className: Ue.gradientPicker, children: [
    /* @__PURE__ */ M("div", { className: Ue.typeRow, children: [
      /* @__PURE__ */ p(
        Lo,
        {
          size: "sm",
          value: l.type,
          onChange: (P) => v({ ...l, type: P }),
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
          onChange: (P) => v({ ...l, angle: ((parseInt(P) || 0) + 360) % 360 }),
          min: 0,
          max: 359,
          scrub: !0,
          className: Ue.angleInput
        }
      ),
      /* @__PURE__ */ M("div", { className: Ue.typeRowActions, children: [
        l.type === "linear" && /* @__PURE__ */ p("button", { type: "button", className: Ue.iconButton, onClick: F, "aria-label": "Flip direction", children: /* @__PURE__ */ p(mu, { size: 14 }) }),
        /* @__PURE__ */ p("button", { type: "button", className: Ue.iconButton, onClick: A, "aria-label": "Reverse stops", children: /* @__PURE__ */ p(zu, { size: 14 }) })
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: Ue.barWrapper, children: /* @__PURE__ */ p(
      "div",
      {
        ref: k,
        className: Ue.bar,
        style: { background: x },
        onClick: $,
        "aria-label": "Gradient bar — click to add a stop",
        children: l.stops.map((P) => /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: `${Ue.stopHandle} ${P.id === d ? Ue.stopHandleSelected : ""}`,
            style: { left: `${P.position}%`, backgroundColor: P.color },
            onPointerDown: (w) => I(w, P.id),
            onPointerMove: R,
            onPointerUp: N,
            onClick: (w) => {
              w.stopPropagation(), h(P.id);
            },
            "aria-label": `Color stop at ${P.position}%`
          },
          P.id
        ))
      }
    ) }),
    /* @__PURE__ */ M("div", { className: Ue.stopsHeader, children: [
      /* @__PURE__ */ p("span", { className: Ue.stopsLabel, children: "Stops" }),
      /* @__PURE__ */ p("button", { type: "button", className: Ue.iconButton, onClick: O, "aria-label": "Add stop", children: /* @__PURE__ */ p(Ou, { size: 14 }) })
    ] }),
    /* @__PURE__ */ p("div", { className: Ue.stopsList, children: T.map((P) => /* @__PURE__ */ M("div", { className: Ue.stopEntry, children: [
      /* @__PURE__ */ M(
        "div",
        {
          className: `${Ue.stopRow} ${P.id === d ? Ue.stopRowSelected : ""}`,
          onClick: () => h(P.id),
          children: [
            /* @__PURE__ */ p(
              Pt,
              {
                prefix: "%",
                type: "number",
                value: String(P.position),
                onChange: (w) => q(P.id, { position: Math.max(0, Math.min(100, parseInt(w) || 0)) }),
                min: 0,
                max: 100,
                scrub: !0,
                className: Ue.positionInput
              }
            ),
            /* @__PURE__ */ p("div", { className: Ue.colorPickerWrapper, children: /* @__PURE__ */ p(
              po,
              {
                value: P.color,
                onChange: (w) => q(P.id, { color: w }),
                opacity: P.opacity,
                onOpacityChange: (w) => q(P.id, { opacity: w }),
                isOpen: y === P.id,
                onOpenChange: (w) => _(w ? P.id : null)
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
          onClick: (w) => {
            w.stopPropagation(), D(P.id);
          },
          disabled: l.stops.length <= 2,
          "aria-label": `Remove stop at ${P.position}%`,
          children: /* @__PURE__ */ p(Au, { size: 14 })
        }
      )
    ] }, P.id)) })
  ] });
  if (t)
    return /* @__PURE__ */ p(ai, { label: r, labelPosition: i, labelWidth: o, htmlFor: s, children: j });
  const B = /* @__PURE__ */ M("div", { ref: b, className: Ue.inputRow, children: [
    /* @__PURE__ */ M(
      "button",
      {
        type: "button",
        id: s,
        className: Ue.triggerInput,
        onClick: () => m((P) => !P),
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
        children: j
      }
    )
  ] });
  return /* @__PURE__ */ p(ai, { label: r, labelPosition: i, labelWidth: o, htmlFor: s, children: B });
}, Bm = "_wrapper_9fk1n_1", Fm = "_icon_9fk1n_5", jm = "_input_9fk1n_14", Hm = "_clearButton_9fk1n_28", Vr = {
  wrapper: Bm,
  icon: Fm,
  input: jm,
  clearButton: Hm
}, cl = ({
  value: e,
  onChange: n,
  placeholder: t,
  icon: r = "search",
  clearable: i = !0,
  id: o,
  className: s = "",
  onBlur: a
}) => {
  const c = r === "filter" ? Iu : Mo;
  return /* @__PURE__ */ M("div", { className: `${Vr.wrapper} ${s}`, children: [
    /* @__PURE__ */ p(c, { size: 14, className: Vr.icon }),
    /* @__PURE__ */ p(
      "input",
      {
        id: o,
        type: "text",
        value: e,
        onChange: (l) => n(l.target.value),
        onBlur: a,
        placeholder: t,
        className: Vr.input,
        "aria-label": t ?? "Search"
      }
    ),
    i && e && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        onClick: () => n(""),
        className: Vr.clearButton,
        "aria-label": "Clear",
        children: /* @__PURE__ */ p(lr, { size: 14 })
      }
    )
  ] });
}, qm = "_inputRow_3izwz_1", Um = "_trigger_3izwz_7", Wm = "_triggerLabel_3izwz_29", Gm = "_triggerLabelEmpty_3izwz_40", Vm = "_thumbnail_3izwz_49", Xm = "_placeholder_3izwz_57", Km = "_dropdown_3izwz_65", Ym = "_panel_3izwz_71", Zm = "_search_3izwz_78", Qm = "_list_3izwz_83", Jm = "_item_3izwz_92", eg = "_itemSelected_3izwz_115", tg = "_itemImage_3izwz_124", ng = "_itemLabel_3izwz_133", rg = "_empty_3izwz_143", _t = {
  inputRow: qm,
  trigger: Um,
  triggerLabel: Wm,
  triggerLabelEmpty: Gm,
  thumbnail: Vm,
  placeholder: Xm,
  dropdown: Km,
  panel: Ym,
  search: Zm,
  list: Qm,
  item: Jm,
  itemSelected: eg,
  itemImage: tg,
  itemLabel: ng,
  empty: rg
}, cI = ({
  value: e,
  onChange: n,
  images: t,
  label: r,
  labelPosition: i = "top",
  labelWidth: o,
  id: s
}) => {
  const [a, c] = W(!1), [l, u] = W(""), d = Y(null), h = Y(null), f = t.find((k) => k.key === e), m = l.trim() ? t.filter((k) => k.label.toLowerCase().includes(l.toLowerCase())) : t;
  le(() => {
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
      cl,
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
}, ig = "_kbd_umkq8_1", og = {
  kbd: ig
};
function sg({ children: e, className: n, ...t }) {
  return /* @__PURE__ */ p("kbd", { className: [og.kbd, n].filter(Boolean).join(" "), ...t, children: e });
}
const ag = "_input_1aobs_1", lg = "_error_1aobs_5", cg = "_prefixWrapper_1aobs_10", ug = "_prefix_1aobs_10", dg = "_prefixInput_1aobs_33", Yn = {
  input: ag,
  error: lg,
  prefixWrapper: cg,
  prefix: ug,
  prefixInput: dg
}, uI = ({
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
      onChange: (x) => t(x.target.value),
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
}, fg = "_numberedList_1dvtz_1", pg = "_md_1dvtz_11", hg = "_sm_1dvtz_15", mg = "_item_1dvtz_20", Bi = {
  numberedList: fg,
  md: pg,
  sm: hg,
  item: mg
}, dI = ({
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
}, gg = "_menu_1lj7a_1", _g = "_item_1lj7a_10", bg = "_destructive_1lj7a_30", yg = "_disabled_1lj7a_38", kg = "_icon_1lj7a_42", wg = "_label_1lj7a_49", xg = "_shortcut_1lj7a_53", vg = "_separator_1lj7a_60", En = {
  menu: gg,
  item: _g,
  destructive: bg,
  disabled: yg,
  icon: kg,
  label: wg,
  shortcut: xg,
  separator: vg
}, Eg = ({
  children: e,
  items: n,
  className: t = "",
  open: r,
  position: i,
  onClose: o
}) => {
  const s = r !== void 0, [a, c] = W(!1), [l, u] = W({ x: 0, y: 0 }), [d, h] = W(-1), f = Y(null), m = Y(null), y = s ? r : a, _ = s ? i ?? l : l, b = n.map((x, $) => ({ item: x, idx: $ })).filter(({ item: x }) => !x.separator && !x.disabled).map(({ idx: x }) => x), k = K(() => {
    s ? o == null || o() : c(!1), h(-1), m.current && m.current.focus();
  }, [s, o]), g = K(
    (x) => {
      x.preventDefault(), x.stopPropagation(), m.current = x.target instanceof HTMLElement ? x.target : null, u({ x: x.clientX, y: x.clientY }), c(!0);
    },
    []
  ), S = K(
    (x) => {
      var $;
      x.disabled || (k(), ($ = x.onClick) == null || $.call(x));
    },
    [k]
  );
  le(() => {
    y && b.length > 0 && h(b[0]);
  }, [y]), le(() => {
    if (y && d >= 0 && f.current) {
      const x = f.current.querySelector(
        `[data-item-index="${d}"]`
      );
      x == null || x.focus();
    }
  }, [y, d]), le(() => {
    if (y && f.current) {
      const $ = f.current.getBoundingClientRect(), I = window.innerWidth, R = window.innerHeight;
      let N = _.x, O = _.y;
      _.x + $.width > I && (N = _.x - $.width), _.y + $.height > R && (O = _.y - $.height), !s && (N !== _.x || O !== _.y) && u({ x: N, y: O });
    }
  }, [y, _, s]), le(() => {
    if (!y) return;
    const x = (I) => {
      f.current && !f.current.contains(I.target) && k();
    }, $ = (I) => {
      const R = b.indexOf(d);
      switch (I.key) {
        case "ArrowDown": {
          I.preventDefault();
          const N = R < b.length - 1 ? R + 1 : 0;
          h(b[N]);
          break;
        }
        case "ArrowUp": {
          I.preventDefault();
          const N = R > 0 ? R - 1 : b.length - 1;
          h(b[N]);
          break;
        }
        case "Home": {
          I.preventDefault(), h(b[0]);
          break;
        }
        case "End": {
          I.preventDefault(), h(b[b.length - 1]);
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
    return document.addEventListener("mousedown", x), document.addEventListener("keydown", $), () => {
      document.removeEventListener("mousedown", x), document.removeEventListener("keydown", $);
    };
  }, [y, k, d, b]);
  const v = y ? Tc.createPortal(
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
        children: n.map((x, $) => {
          if (x.separator)
            return /* @__PURE__ */ p("div", { className: En.separator, role: "separator" }, $);
          const I = [
            En.item,
            x.variant === "destructive" && En.destructive,
            x.disabled && En.disabled
          ].filter(Boolean).join(" ");
          return /* @__PURE__ */ M(
            "button",
            {
              type: "button",
              className: I,
              onClick: () => S(x),
              role: "menuitem",
              "aria-disabled": x.disabled,
              disabled: x.disabled,
              tabIndex: $ === d ? 0 : -1,
              "data-item-index": $,
              children: [
                x.icon && /* @__PURE__ */ p(x.icon, { size: 14, className: En.icon, "aria-hidden": "true" }),
                /* @__PURE__ */ p("span", { className: En.label, children: x.label }),
                x.shortcut && /* @__PURE__ */ p("span", { className: En.shortcut, children: x.shortcut })
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
}, Sg = "_wrapper_5glzu_1", Cg = "_wrapperPopover_5glzu_10", Ng = "_editorPopover_5glzu_14", $g = "_toolsRow_5glzu_22", Ig = "_toolsScroll_5glzu_35", Ag = "_clearFixed_5glzu_50", Mg = "_brushAnchor_5glzu_59", Lg = "_brushPopover_5glzu_65", Rg = "_menuPopover_5glzu_74", Tg = "_menuItem_5glzu_81", Dg = "_menuItemIconSlot_5glzu_104", Pg = "_colorsRow_5glzu_120", Og = "_swatchScroll_5glzu_130", zg = "_eyedropperFixed_5glzu_145", Bg = "_customSwatchFixed_5glzu_153", Fg = "_swatch_5glzu_130", jg = "_swatchActive_5glzu_182", Hg = "_swatchCustom_5glzu_187", qg = "_customSwatchWrapper_5glzu_192", Ug = "_colorPickerPopover_5glzu_199", Wg = "_canvasContainer_5glzu_206", Gg = "_canvasInner_5glzu_215", Vg = "_canvas_5glzu_206", Xg = "_canvasPreview_5glzu_228", Kg = "_popoverContainer_5glzu_235", Yg = "_popoverTrigger_5glzu_240", Zg = "_popoverTriggerOpen_5glzu_261", Qg = "_miniPreview_5glzu_265", ye = {
  wrapper: Sg,
  wrapperPopover: Cg,
  editorPopover: Ng,
  toolsRow: $g,
  toolsScroll: Ig,
  clearFixed: Ag,
  brushAnchor: Mg,
  brushPopover: Lg,
  menuPopover: Rg,
  menuItem: Tg,
  menuItemIconSlot: Dg,
  colorsRow: Pg,
  swatchScroll: Og,
  eyedropperFixed: zg,
  customSwatchFixed: Bg,
  swatch: Fg,
  swatchActive: jg,
  swatchCustom: Hg,
  customSwatchWrapper: qg,
  colorPickerPopover: Ug,
  canvasContainer: Wg,
  canvasInner: Gg,
  canvas: Vg,
  canvasPreview: Xg,
  popoverContainer: Kg,
  popoverTrigger: Yg,
  popoverTriggerOpen: Zg,
  miniPreview: Qg
}, Zn = /^#[0-9a-fA-F]{6}$/, Jg = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff8800",
  "#8800ff"
], e_ = "#e0e0e0", ul = {
  sm: [[0, 0]],
  md: [[0, 0], [1, 0], [0, 1], [1, 1]],
  lg: [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
};
function Xr(e, n, t, r, i, o, s) {
  const a = [...e];
  for (const [c, l] of ul[i]) {
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
function t_(e, n, t, r, i = "fill") {
  const o = Math.min(e, t), s = Math.max(e, t), a = Math.min(n, r), c = Math.max(n, r), l = [];
  for (let u = a; u <= c; u++)
    for (let d = o; d <= s; d++)
      (i === "fill" || d === o || d === s || u === a || u === c) && l.push([d, u]);
  return l;
}
function n_(e, n, t, r, i = "fill") {
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
function r_(e, n, t, r, i = "fill") {
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
    for (let x = Math.min(S, v); x <= Math.max(S, v); x++) b(x, k);
  }
  return _;
}
function i_(e, n, t, r, i = "fill") {
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
      const [S, v] = f[g], [x, $] = f[(g + 1) % f.length];
      for (const [I, R] of In(S, v, x, $)) _(I, R);
    }
    return y;
  }
  const b = Math.min(...f.map(([, g]) => g)), k = Math.max(...f.map(([, g]) => g));
  for (let g = b; g <= k; g++) {
    const S = [];
    for (let v = 0; v < f.length; v++) {
      const [x, $] = f[v], [I, R] = f[(v + 1) % f.length];
      ($ <= g && R > g || R <= g && $ > g) && S.push(x + (g - $) / (R - $) * (I - x));
    }
    S.sort((v, x) => v - x);
    for (let v = 0; v + 1 < S.length; v += 2)
      for (let x = Math.round(S[v]); x <= Math.round(S[v + 1]); x++) _(x, g);
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
const o_ = 8, s_ = 80;
function a_(e, n, t, r, i) {
  const o = e[i * n + r], s = /* @__PURE__ */ new Set(), a = [[r, i]];
  for (; a.length > 0; ) {
    const [c, l] = a.shift();
    if (c < 0 || c >= n || l < 0 || l >= t) continue;
    const u = l * n + c;
    s.has(u) || e[u] === o && (s.add(u), a.push([c + 1, l], [c - 1, l], [c, l + 1], [c, l - 1]));
  }
  return s;
}
const l_ = ["line", "rect", "circle", "triangle", "star"];
function Kr(e) {
  return l_.includes(e);
}
function Rs(e, n, t, r) {
  const [i, o] = n, [s, a] = t;
  switch (e) {
    case "line":
      return In(i, o, s, a);
    case "rect":
      return t_(i, o, s, a, r.rect);
    case "circle":
      return n_(i, o, s, a, r.circle);
    case "triangle":
      return r_(i, o, s, a, r.triangle);
    case "star":
      return i_(i, o, s, a, r.star);
  }
}
function Ts(e, n) {
  const [t, r] = e, [i, o] = n, s = i - t, a = o - r, c = Math.max(Math.abs(s), Math.abs(a)), l = s >= 0 ? 1 : -1, u = a >= 0 ? 1 : -1;
  return [t + c * l, r + c * u];
}
function c_(e, n) {
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
function u_(e, n, t, r, i) {
  const o = e.getContext("2d");
  if (o) {
    o.clearRect(0, 0, e.width, e.height), o.fillStyle = "#ffffff", o.fillRect(0, 0, e.width, e.height);
    for (let s = 0; s < n.length; s++) {
      const a = n[s];
      if (!a) continue;
      const c = s % t, l = Math.floor(s / t);
      o.fillStyle = a, o.fillRect(c * i, l * i, i, i);
    }
    o.strokeStyle = e_, o.lineWidth = 1;
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
function d_(e, n, t, r, i) {
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
function f_(e, n, t) {
  const r = e.getContext("2d");
  if (!(!r || n.length === 0))
    for (const [i, o] of n) {
      const s = i * t, a = o * t;
      r.fillStyle = "#ffffff", r.fillRect(s, a, t, t), r.strokeStyle = "#000000", r.lineWidth = 1, r.strokeRect(s + 0.5, a + 0.5, t - 1, t - 1);
    }
}
async function p_(e, n, t, r) {
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
function h_(e, n) {
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
function m_({
  width: e,
  height: n,
  value: t,
  onChange: r
}) {
  const [i, o] = Ac(
    h_,
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
  le(() => {
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
function g_({
  width: e,
  cellSize: n,
  selectionCanvasRef: t
}) {
  const [r, i] = W(null), [o, s] = W(0), a = Y(null), c = Y(null), l = Y(null), u = Y(null), d = Y([0, 0]), h = Y(!0), f = K(
    (m, y) => {
      if (!r) return !1;
      const _ = Math.min(r.x1, r.x2), b = Math.max(r.x1, r.x2), k = Math.min(r.y1, r.y2), g = Math.max(r.y1, r.y2);
      if (m < _ || m > b || y < k || y > g) return !1;
      if (r.shape === "rect") return !0;
      if (r.shape === "cells") return r.cells.has(y * e + m);
      const S = (_ + b) / 2, v = (k + g) / 2, x = (b - _) / 2 + 0.5, $ = (g - k) / 2 + 0.5;
      if (x <= 0 || $ <= 0) return !0;
      const I = m - S, R = y - v;
      return I * I / (x * x) + R * R / ($ * $) <= 1;
    },
    [r, e]
  );
  return le(() => {
    if (!r) return;
    const m = setInterval(() => {
      s((y) => (y + 1) % o_);
    }, s_);
    return () => clearInterval(m);
  }, [r]), le(() => {
    if (t.current) {
      if (!r) {
        const m = t.current.getContext("2d");
        m == null || m.clearRect(0, 0, t.current.width, t.current.height);
        return;
      }
      d_(t.current, r, n, o, e);
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
function __({
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
  const u = Y([]), [d, h] = W(null), f = Y(!1), m = K(() => {
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
        const [I, R] = g[$], [N, O] = g[$ + 1];
        for (const [D, q] of In(I, R, N, O))
          D >= 0 && D < e && q >= 0 && q < n && (v[q * e + D] = r);
      }
      const x = Fn(v, t, e, i, S);
      s(x), a(x), u.current = [], h(null), m();
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
function b_({
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
  selectionDragStart: x,
  liftedPixels: $,
  basePixelsAfterLift: I,
  selectionMoveOffset: R,
  strokeInsideSelection: N,
  penAnchors: O,
  setPenCursor: D,
  penDblClickPending: q,
  commitPenPath: F,
  closePopovers: A
}) {
  const T = Y(!1), j = Y(null), B = Y(null), { rect: P, circle: w, triangle: X, star: ce } = i, E = K(
    (se, Ee, te, ne) => te ? ne === "line" ? c_(se, Ee) : Ts(se, Ee) : Ee,
    []
  ), be = K(
    (se, Ee, te) => {
      if (T.current) {
        if (n === "marquee" && v.current === "draw" && x.current) {
          const [ne, G] = te ? Ts(x.current, [se, Ee]) : [se, Ee];
          g((me) => me ? { ...me, x2: ne, y2: G } : null);
          return;
        }
        if (Kr(n) && j.current && m.current) {
          const ne = E(j.current, [se, Ee], te, n), G = Rs(n, j.current, ne, {
            rect: P,
            circle: w,
            triangle: X,
            star: ce
          });
          Fi(m.current, G, r, h);
        }
      }
    },
    [
      n,
      P,
      w,
      X,
      ce,
      r,
      h,
      g,
      m,
      v,
      x,
      E
    ]
  );
  le(() => {
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
      if (A(), n === "pen") {
        if (q.current) return;
        const G = O.current;
        if (G.length > 0) {
          const [me, he] = G[0];
          if (Math.abs(te - me) + Math.abs(ne - he) <= 1) {
            F(!0);
            return;
          }
        }
        G.push([te, ne]), D([te, ne]);
        return;
      }
      if (n === "marquee") {
        if (o === "wand") {
          const G = a_(l, u, d, te, ne);
          if (G.size > 0) {
            let me = 1 / 0, he = 1 / 0, Te = -1 / 0, Ie = -1 / 0;
            for (const _e of G) {
              const Me = _e % u, Fe = Math.floor(_e / u);
              Me < me && (me = Me), Me > Te && (Te = Me), Fe < he && (he = Fe), Fe > Ie && (Ie = Fe);
            }
            g({ shape: "cells", cells: G, x1: me, y1: he, x2: Te, y2: Ie });
          } else
            g(null);
          T.current = !1;
          return;
        }
        if (k && S(te, ne)) {
          v.current = "move", x.current = [te, ne], R.current = [0, 0];
          const G = Math.min(k.x1, k.x2), me = Math.max(k.x1, k.x2), he = Math.min(k.y1, k.y2), Te = Math.max(k.y1, k.y2), Ie = [], _e = [...l];
          for (let Me = he; Me <= Te; Me++)
            for (let Fe = G; Fe <= me; Fe++)
              S(Fe, Me) ? (Ie.push(l[Me * u + Fe]), _e[Me * u + Fe] = "") : Ie.push(void 0);
          $.current = { colors: Ie, x1: G, y1: he, x2: me, y2: Te }, I.current = _e, _(_e);
        } else
          v.current = "draw", x.current = [te, ne], g({ shape: o, x1: te, y1: ne, x2: te, y2: ne }), $.current = null, I.current = null;
        T.current = !0;
        return;
      }
      if (T.current = !0, n === "paint") {
        N.current = S(te, ne);
        const G = Fn(Xr(l, te, ne, r, t, u, d), l, u, k, N.current);
        y(G), b(G);
      } else if (n === "eraser") {
        N.current = S(te, ne);
        const G = Fn(Xr(l, te, ne, "", t, u, d), l, u, k, N.current);
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
        T.current = !1;
      } else if (n === "eyedropper") {
        const G = l[ne * u + te];
        G && (a(G), c(null)), s("paint"), T.current = !1;
      } else Kr(n) && (j.current = [te, ne], N.current = S(te, ne));
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
      A,
      g,
      a,
      c,
      s,
      y,
      _,
      O,
      q,
      D,
      v,
      x,
      R,
      $,
      I,
      N
    ]
  ), Je = K(
    (se) => {
      if (e) return;
      const Ee = fe(se);
      if (!Ee) return;
      const [te, ne] = Ee;
      if (n === "pen") {
        D([te, ne]);
        const G = O.current;
        if (G.length > 0 && m.current) {
          const me = [];
          for (let Te = 0; Te < G.length - 1; Te++)
            me.push(...In(G[Te][0], G[Te][1], G[Te + 1][0], G[Te + 1][1]));
          const he = G[G.length - 1];
          me.push(...In(he[0], he[1], te, ne)), Fi(m.current, me, r, h), f_(m.current, G, h);
        }
        return;
      }
      if (n === "paint" || n === "eraser") {
        const G = ul[t].map(
          ([me, he]) => [te + me, ne + he]
        ).filter(([me, he]) => me >= 0 && me < u && he >= 0 && he < d);
        if (m.current) {
          const me = n === "eraser" ? "#ff000033" : r;
          Fi(m.current, G, me, h);
        }
      }
      if (n === "marquee" && T.current && x.current) {
        if (v.current === "draw")
          B.current = [te, ne], be(te, ne, se.shiftKey);
        else if (v.current === "move" && $.current) {
          const [G, me] = x.current, he = te - G, Te = ne - me;
          R.current = [he, Te];
          const Ie = $.current;
          if (g((_e) => _e ? { ..._e, x1: Ie.x1 + he, y1: Ie.y1 + Te, x2: Ie.x2 + he, y2: Ie.y2 + Te } : null), m.current) {
            const _e = Ie.x2 - Ie.x1 + 1, Me = m.current.getContext("2d");
            Me && (Me.clearRect(0, 0, m.current.width, m.current.height), Me.globalAlpha = 0.85, Ie.colors.forEach((Fe, it) => {
              if (Fe === void 0 || !Fe) return;
              const Q = it % _e, L = Math.floor(it / _e), H = Ie.x1 + Q + he, re = Ie.y1 + L + Te;
              H >= 0 && H < u && re >= 0 && re < d && (Me.fillStyle = Fe, Me.fillRect(H * h, re * h, h, h));
            }), Me.globalAlpha = 1);
          }
        }
        return;
      }
      if (T.current)
        if (n === "paint") {
          const G = Fn(Xr(l, te, ne, r, t, u, d), l, u, k, N.current);
          _(G), b(G);
        } else if (n === "eraser") {
          const G = Fn(Xr(l, te, ne, "", t, u, d), l, u, k, N.current);
          _(G), b(G);
        } else Kr(n) && j.current && m.current && (B.current = [te, ne], be(te, ne, se.shiftKey));
    },
    [
      e,
      n,
      P,
      w,
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
      x,
      v,
      R,
      $,
      N,
      _,
      O,
      D,
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
      if (!T.current || e) return;
      if (n === "marquee") {
        if (T.current = !1, B.current = null, v.current === "move" && $.current) {
          const G = $.current, [me, he] = R.current, Te = G.x2 - G.x1 + 1, Ie = [...I.current ?? l];
          if (G.colors.forEach((_e, Me) => {
            if (_e === void 0 || !_e) return;
            const Fe = Me % Te, it = Math.floor(Me / Te), Q = G.x1 + Fe + me, L = G.y1 + it + he;
            Q >= 0 && Q < u && L >= 0 && L < d && (Ie[L * u + Q] = _e);
          }), y(Ie), b(Ie), $.current = null, I.current = null, m.current) {
            const _e = m.current.getContext("2d");
            _e == null || _e.clearRect(0, 0, m.current.width, m.current.height);
          }
        } else if (v.current === "draw") {
          const G = fe(se);
          if (G) {
            const [me, he] = G;
            x.current && x.current[0] === me && x.current[1] === he && g(null);
          }
        }
        v.current = null, x.current = null;
        return;
      }
      T.current = !1;
      const Ee = fe(se);
      if (m.current) {
        const G = m.current.getContext("2d");
        G == null || G.clearRect(0, 0, m.current.width, m.current.height);
      }
      if (!Ee) {
        j.current = null;
        return;
      }
      const [te, ne] = Ee;
      if (Kr(n) && j.current) {
        const G = E(j.current, [te, ne], se.shiftKey, n);
        Xe(Rs(n, j.current, G, {
          rect: P,
          circle: w,
          triangle: X,
          star: ce
        }));
      }
      j.current = null, B.current = null;
    },
    [
      e,
      n,
      P,
      w,
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
      I,
      $,
      v,
      x,
      R,
      E
    ]
  ), Ge = K(() => {
    if (n === "marquee" && T.current && v.current === "move" && $.current) {
      const se = $.current, Ee = se.x2 - se.x1 + 1, te = [...I.current ?? l];
      se.colors.forEach((ne, G) => {
        if (ne === void 0) return;
        const me = G % Ee, he = Math.floor(G / Ee);
        te[(se.y1 + he) * u + (se.x1 + me)] = ne;
      }), _(te), $.current = null, I.current = null, g((ne) => ne ? { ...ne, x1: se.x1, y1: se.y1, x2: se.x2, y2: se.y2 } : null);
    }
    if (T.current = !1, v.current = null, B.current = null, m.current) {
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
    I,
    $,
    v
  ]), wt = K(() => {
    n === "pen" && (q.current = !0, O.current.length > 1 && (O.current = O.current.slice(0, -1)), F(!1), setTimeout(() => {
      q.current = !1;
    }, 300));
  }, [n, F, O, q]);
  return {
    handleMouseDown: De,
    handleMouseMove: Je,
    handleMouseUp: Re,
    handleMouseLeave: Ge,
    handleDoubleClick: wt
  };
}
const y_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ p("line", { x1: "3", y1: "13", x2: "13", y2: "3" }) }), Ds = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "3", y: "3", width: "10", height: "10", fill: "currentColor" }) }), Ps = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "3", y: "3", width: "10", height: "10", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) }), Os = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("circle", { cx: "8", cy: "8", r: "5", fill: "currentColor" }) }), zs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("circle", { cx: "8", cy: "8", r: "5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) }), Bs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 14,13 2,13", fill: "currentColor" }) }), Fs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 14,13 2,13", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" }) }), js = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 9.8,6.5 14.5,6.9 11,10.1 12.1,14.7 8,12.2 3.9,14.7 5,10.1 1.5,6.9 6.2,6.5", fill: "currentColor" }) }), Hs = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("polygon", { points: "8,2 9.8,6.5 14.5,6.9 11,10.1 12.1,14.7 8,12.2 3.9,14.7 5,10.1 1.5,6.9 6.2,6.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" }) }), k_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "7", y: "7", width: "2", height: "2", fill: "currentColor" }) }), w_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "6", y: "6", width: "4", height: "4", fill: "currentColor" }) }), x_ = () => /* @__PURE__ */ p("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ p("rect", { x: "4", y: "4", width: "8", height: "8", fill: "currentColor" }) }), v_ = { sm: k_, md: w_, lg: x_ }, E_ = 400;
function Yr(e, n) {
  const t = Ve.useRef(null), r = Ve.useRef(!1), i = Ve.useCallback(() => {
    r.current = !1, t.current = setTimeout(() => {
      r.current = !0, n();
    }, E_);
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
const S_ = ({
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
  setMarqueeShape: x,
  canUndo: $,
  canRedo: I,
  onUndo: R,
  onRedo: N,
  onDownloadSvg: O,
  onDownloadPng: D,
  onClearCanvas: q,
  sizes: F,
  currentSize: A,
  onPickSize: T,
  cancelPenPath: j
}) => {
  const [B, P] = W(!1), [w, X] = W(!1), [ce, E] = W(!1), [be, fe] = W(!1), [De, Je] = W(!1), [Xe, Re] = W(!1), Ge = Y(null), wt = Y(null), se = Y(null), Ee = Y(null), te = Y(null), ne = Y(null), G = Y(null), me = Array.isArray(F) && F.length > 0, he = K(() => {
    P(!1), X(!1), E(!1);
  }, []), Te = Yr(
    () => {
      j(), n("paint"), he();
    },
    () => {
      j(), n("paint"), P(!0), X(!1), E(!1);
    }
  ), Ie = Yr(
    () => {
      j(), n("eraser"), he();
    },
    () => {
      j(), n("eraser"), P(!0), X(!1), E(!1);
    }
  ), _e = K(() => {
    e === "rect" || e === "circle" || e === "triangle" || e === "star" ? e === "rect" ? h((L) => L === "fill" ? "outline" : "fill") : e === "circle" ? m((L) => L === "fill" ? "outline" : "fill") : e === "triangle" ? _((L) => L === "fill" ? "outline" : "fill") : e === "star" && k((L) => L === "fill" ? "outline" : "fill") : (j(), n(g), he());
  }, [e, g, j, n, he, h, m, _, k]), Me = Yr(
    _e,
    () => {
      X(!0), P(!1), E(!1);
    }
  ), Fe = Yr(
    () => {
      j(), n("marquee"), he();
    },
    () => {
      j(), n("marquee"), E(!0), P(!1), X(!1);
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
              icon: Du,
              size: "sm",
              selected: e === "paint",
              "aria-label": "Paint",
              title: "Paint"
            }
          ) }),
          /* @__PURE__ */ p("div", { ref: wt, ...Ie, children: /* @__PURE__ */ p(
            ze,
            {
              icon: Eu,
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
              onClose: () => P(!1),
              anchorRef: e === "eraser" ? wt : Ge,
              offsetX: -5,
              role: "dialog",
              "aria-label": "Brush size",
              children: /* @__PURE__ */ p("div", { className: ye.brushPopover, children: ["sm", "md", "lg"].map((Q) => /* @__PURE__ */ p(
                ze,
                {
                  icon: v_[Q],
                  size: "sm",
                  selected: t === Q,
                  onClick: () => {
                    r(Q), P(!1);
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
            icon: Mu,
            size: "sm",
            selected: e === "fill",
            onClick: () => {
              j(), n("fill"), he();
            },
            "aria-label": "Fill",
            title: "Fill"
          }
        ),
        /* @__PURE__ */ p(
          ze,
          {
            icon: y_,
            size: "sm",
            selected: e === "line",
            onClick: () => {
              j(), n("line"), he();
            },
            "aria-label": "Line",
            title: "Line"
          }
        ),
        /* @__PURE__ */ p(
          ze,
          {
            icon: Tu,
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
                      x("rect"), n("marquee"), E(!1), j();
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
                      x("ellipse"), n("marquee"), E(!1), j();
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
                      x("wand"), n("marquee"), E(!1), j();
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
                const Q = ["rect", "circle", "triangle", "star"].includes(e) ? e : g, L = Q === "rect" ? d : Q === "circle" ? f : Q === "triangle" ? y : b;
                return {
                  rect: L === "fill" ? Ds : Ps,
                  circle: L === "fill" ? Os : zs,
                  triangle: L === "fill" ? Bs : Fs,
                  star: L === "fill" ? js : Hs
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
              isOpen: w,
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
              ].map(({ shape: Q, filledIcon: L, outlineIcon: H, fillMode: re, setFillMode: ie, label: Ne }) => /* @__PURE__ */ p(
                ze,
                {
                  icon: re === "fill" ? L : H,
                  size: "sm",
                  selected: e === Q,
                  onClick: () => {
                    e === Q ? ie((at) => at === "fill" ? "outline" : "fill") : (j(), n(Q), S(Q)), X(!1);
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
            icon: Va,
            size: "sm",
            onClick: R,
            disabled: !$,
            "aria-label": "Undo",
            title: "Undo (Cmd+Z)"
          }
        ),
        /* @__PURE__ */ p(
          ze,
          {
            icon: Wa,
            size: "sm",
            onClick: N,
            disabled: !I,
            "aria-label": "Redo",
            title: "Redo (Cmd+Shift+Z)"
          }
        ),
        me && /* @__PURE__ */ M("div", { ref: G, className: ye.brushAnchor, children: [
          /* @__PURE__ */ p(
            ze,
            {
              icon: Su,
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
                  "aria-checked": A === Q,
                  className: ye.menuItem,
                  onClick: () => {
                    Re(!1), T == null || T(Q);
                  },
                  children: [
                    A === Q ? /* @__PURE__ */ p($o, { size: 14, "aria-hidden": "true" }) : /* @__PURE__ */ p("span", { className: ye.menuItemIconSlot, "aria-hidden": "true" }),
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
              icon: Ha,
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
                      Je(!1), O();
                    },
                    children: [
                      /* @__PURE__ */ p(qa, { size: 14, "aria-hidden": "true" }),
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
                      Je(!1), D();
                    },
                    children: [
                      /* @__PURE__ */ p(Ua, { size: 14, "aria-hidden": "true" }),
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
            icon: Ga,
            size: "sm",
            onClick: q,
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
          icon: Pu,
          size: "sm",
          selected: e === "eyedropper",
          onClick: () => {
            j(), n("eyedropper");
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
                ol,
                {
                  hue: (() => {
                    const Q = Zn.test(i) ? oi(i) : { h: 0 };
                    return l !== null ? l : Q.h;
                  })(),
                  saturation: Zn.test(i) ? oi(i).s : 1,
                  brightness: Zn.test(i) ? oi(i).v : 1,
                  onChange: (Q, L, H) => {
                    u(Q), o(al(Q, L, H));
                  }
                }
              ),
              /* @__PURE__ */ p(
                Pt,
                {
                  prefix: "#",
                  value: i.replace(/^#/, ""),
                  onChange: (Q) => {
                    const L = "#" + Q.replace(/^#/, "");
                    Zn.test(L) && (u(null), o(L.toLowerCase()));
                  }
                }
              )
            ] })
          }
        )
      ] }) })
    ] })
  ] });
}, fI = ({
  width: e,
  height: n,
  value: t = "",
  onChange: r,
  palette: i = Jg,
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
  const _ = Array.isArray(m) && m.length > 0, [b, k] = W(e), g = _ ? b : e, S = _ ? b : n, [v, x] = W("paint"), [$, I] = W("sm"), [R, N] = W("rect"), [O, D] = W("outline"), [q, F] = W("outline"), [A, T] = W("outline"), [j, B] = W("outline"), [P, w] = W(i[0] ?? "#000000"), [X, ce] = W(null), [E, be] = W([]), [fe, De] = W("rect"), [Je, Xe] = W(h), [Re, Ge] = W(null), wt = Y(null), [se, Ee] = W(16), te = Y(null), ne = Y(null), G = Y(null), [me, he] = W(!1), Te = K((ke) => {
    te.current = ke, he(ke !== null);
  }, []), Ie = Y(null), { pixels: _e, canUndo: Me, canRedo: Fe, dispatchPixels: it, commitPixels: Q, undo: L, redo: H, emitChange: re } = m_({ width: g, height: S, value: t, onChange: r }), {
    selection: ie,
    setSelection: Ne,
    selectionDragMode: at,
    selectionDragStart: Ht,
    liftedPixels: ot,
    basePixelsAfterLift: Zt,
    selectionMoveOffset: cn,
    strokeInsideSelection: lt,
    selectionContainsCell: mt
  } = g_({ width: g, cellSize: se, selectionCanvasRef: G }), {
    penAnchors: gt,
    setPenCursor: Pr,
    penDblClickPending: Or,
    cancelPenPath: dr,
    commitPenPath: Un
  } = __({
    width: g,
    height: S,
    pixels: _e,
    activeColor: P,
    selection: ie,
    selectionContainsCell: mt,
    commitPixels: Q,
    emitChange: re,
    previewCanvasRef: ne,
    liftedPixelsRef: ot
  }), _n = K(() => {
  }, []), { handleMouseDown: C, handleMouseMove: z, handleMouseUp: Z, handleMouseLeave: ge, handleDoubleClick: Ke } = b_({
    disabled: c,
    activeTool: v,
    brushSize: $,
    activeColor: P,
    fillModes: { rect: O, circle: q, triangle: A, star: j },
    marqueeShape: fe,
    setActiveTool: x,
    setActiveColor: w,
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
    selectionDragStart: Ht,
    liftedPixels: ot,
    basePixelsAfterLift: Zt,
    selectionMoveOffset: cn,
    strokeInsideSelection: lt,
    penAnchors: gt,
    setPenCursor: Pr,
    penDblClickPending: Or,
    commitPenPath: Un,
    closePopovers: _n
  }), je = K((ke, Se) => {
    const xt = URL.createObjectURL(ke), zt = document.createElement("a");
    zt.href = xt, zt.download = Se, zt.click(), URL.revokeObjectURL(xt);
  }, []), oe = K(() => {
    const ke = or(_e, g, S);
    je(new Blob([ke], { type: "image/svg+xml" }), "pixel-art.svg");
  }, [_e, g, S, je]), ee = K(async () => {
    const ke = await p_(_e, g, S, f);
    je(ke, "pixel-art.png");
  }, [_e, g, S, f, je]), pe = K(() => {
    if (!ie) return;
    const ke = Math.min(ie.x1, ie.x2), Se = Math.max(ie.x1, ie.x2), xt = Math.min(ie.y1, ie.y2), zt = Math.max(ie.y1, ie.y2), un = [..._e];
    for (let qt = xt; qt <= zt; qt++)
      for (let Qt = ke; Qt <= Se; Qt++)
        mt(Qt, qt) && (un[qt * g + Qt] = "");
    Q(un), re(un);
  }, [ie, _e, g, re, mt, Q]), Qe = K(() => {
    const ke = new Array(g * S).fill("");
    Q(ke), re(ke);
  }, [g, S, Q, re]), Ze = K((ke) => {
    if (!_ || ke === b) return;
    k(ke), Ee((xt) => xt * b / ke);
    const Se = new Array(ke * ke).fill("");
    Q(Se), r && r(or(Se, ke, ke)), y == null || y(ke, ke);
  }, [_, b, Q, r, y]);
  le(() => {
    h && Xe(!0);
  }, [h]), le(() => {
    const ke = wt.current;
    if (!ke) return;
    const Se = new ResizeObserver((xt) => {
      for (const zt of xt) {
        const { width: un } = zt.contentRect;
        if (_ && m && m.length > 0) {
          const qt = Math.max(...m, e), Qt = Math.max(1, Math.floor(un / qt));
          Ee(Qt * qt / g);
        } else
          Ee(Math.max(1, Math.floor(un / g)));
      }
    });
    return Se.observe(ke), () => Se.disconnect();
  }, [g, e, me, _, m]), le(() => {
    const ke = se * g, Se = se * S;
    te.current && (te.current.width = ke, te.current.height = Se), ne.current && (ne.current.width = ke, ne.current.height = Se), G.current && (G.current.width = ke, G.current.height = Se);
  }, [se, g, S, me]), le(() => {
    te.current && u_(te.current, _e, g, S, se);
  }, [_e, se, g, S, me]), le(() => {
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
          const qt = Math.min(ie.x1, ie.x2), Qt = Math.max(ie.x1, ie.x2), zr = Math.min(ie.y1, ie.y2), Wn = Math.max(ie.y1, ie.y2), fr = [..._e];
          for (let Gn = zr; Gn <= Wn; Gn++)
            for (let Vn = qt; Vn <= Qt; Vn++)
              mt(Vn, Gn) && (fr[Gn * g + Vn] = P);
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
        Se.key === "z" && !Se.shiftKey ? (Se.preventDefault(), L()) : (Se.key === "z" && Se.shiftKey || Se.key === "y") && (Se.preventDefault(), H());
      }
    };
    return document.addEventListener("keydown", ke), () => document.removeEventListener("keydown", ke);
  }, [c, v, Un, dr, pe, ie, _e, P, g, mt, L, H, Ne, ot, Q, re]);
  const bn = /* @__PURE__ */ M(
    "div",
    {
      className: `${ye.wrapper} ${o ? ye.wrapperPopover : ""} ${o ? "" : l}`,
      style: o && s ? { width: s } : void 0,
      children: [
        /* @__PURE__ */ p(
          S_,
          {
            activeTool: v,
            setActiveTool: x,
            brushSize: $,
            setBrushSize: I,
            activeColor: P,
            setActiveColor: w,
            palette: i,
            customColors: E,
            setCustomColors: be,
            independentHue: X,
            setIndependentHue: ce,
            rectFillMode: O,
            setRectFillMode: D,
            circleFillMode: q,
            setCircleFillMode: F,
            triangleFillMode: A,
            setTriangleFillMode: T,
            starFillMode: j,
            setStarFillMode: B,
            lastShape: R,
            setLastShape: N,
            marqueeShape: fe,
            setMarqueeShape: De,
            canUndo: Me,
            canRedo: Fe,
            onUndo: L,
            onRedo: H,
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
          Eg,
          {
            open: Re !== null,
            position: Re ?? void 0,
            onClose: () => Ge(null),
            items: [
              {
                label: "Undo",
                icon: Va,
                disabled: !Me,
                onClick: () => {
                  L(), Ge(null);
                }
              },
              {
                label: "Redo",
                icon: Wa,
                disabled: !Fe,
                onClick: () => {
                  H(), Ge(null);
                }
              },
              { separator: !0, label: "" },
              {
                label: "Download SVG",
                icon: qa,
                onClick: () => {
                  oe(), Ge(null);
                }
              },
              {
                label: "Download PNG",
                icon: Ua,
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
                icon: Ga,
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
}, C_ = "_root_7lfjz_1", N_ = "_xs_7lfjz_7", $_ = "_track_7lfjz_8", I_ = "_sm_7lfjz_13", A_ = "_md_7lfjz_19", M_ = "_valueLabel_7lfjz_26", L_ = "_fill_7lfjz_40", R_ = "_success_7lfjz_49", T_ = "_error_7lfjz_53", D_ = "_warning_7lfjz_57", Qn = {
  root: C_,
  xs: N_,
  track: $_,
  sm: I_,
  md: A_,
  valueLabel: M_,
  fill: L_,
  default: "_default_7lfjz_45",
  success: R_,
  error: T_,
  warning: D_
}, pI = ({
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
}, P_ = "_root_1mobr_1", O_ = "_sm_1mobr_7", z_ = "_md_1mobr_12", B_ = "_lg_1mobr_17", F_ = "_svg_1mobr_23", j_ = "_track_1mobr_27", H_ = "_progress_1mobr_31", q_ = "_success_1mobr_38", U_ = "_error_1mobr_42", W_ = "_warning_1mobr_46", G_ = "_valueLabel_1mobr_51", Dn = {
  root: P_,
  sm: O_,
  md: z_,
  lg: B_,
  svg: F_,
  track: j_,
  progress: H_,
  default: "_default_1mobr_34",
  success: q_,
  error: U_,
  warning: W_,
  valueLabel: G_
}, V_ = {
  sm: { diameter: 32, stroke: 3 },
  md: { diameter: 48, stroke: 4 },
  lg: { diameter: 64, stroke: 5 }
}, hI = ({
  value: e,
  variant: n = "default",
  size: t = "md",
  label: r,
  showValue: i = !1,
  className: o = ""
}) => {
  const s = Math.min(100, Math.max(0, e)), { diameter: a, stroke: c } = V_[t], l = (a - c) / 2, u = 2 * Math.PI * l, d = u * (1 - s / 100), h = a / 2;
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
}, X_ = "_wrapper_17vwn_1", K_ = "_reverse_17vwn_7", Y_ = "_disabled_17vwn_11", Z_ = "_visuallyHidden_17vwn_16", Q_ = "_circle_17vwn_20", J_ = "_checked_17vwn_33", e1 = "_label_17vwn_48", t1 = "_group_17vwn_54", n1 = "_vertical_17vwn_57", r1 = "_horizontal_17vwn_62", pn = {
  wrapper: X_,
  reverse: K_,
  disabled: Y_,
  visuallyHidden: Z_,
  circle: Q_,
  checked: J_,
  label: e1,
  group: t1,
  vertical: n1,
  horizontal: r1
}, i1 = ({
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
), mI = ({
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
      i1,
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
), o1 = "_linkForm_117dp_1", s1 = "_urlInput_117dp_8", a1 = "_confirmButton_117dp_32", l1 = "_cancelButton_117dp_59", Zr = {
  linkForm: o1,
  urlInput: s1,
  confirmButton: a1,
  cancelButton: l1
}, c1 = ({ onSubmit: e, onCancel: n }) => {
  const [t, r] = W(""), i = (s) => {
    s.preventDefault(), t.trim() && e(t.trim());
  }, o = (s) => {
    s.key === "Escape" && n();
  };
  return /* @__PURE__ */ M("form", { className: Zr.linkForm, onSubmit: i, children: [
    /* @__PURE__ */ p(
      "input",
      {
        type: "url",
        className: Zr.urlInput,
        value: t,
        onChange: (s) => r(s.target.value),
        onKeyDown: o,
        placeholder: "https://",
        autoFocus: !0,
        "aria-label": "Link URL"
      }
    ),
    /* @__PURE__ */ p("button", { type: "submit", className: Zr.confirmButton, disabled: !t.trim(), children: "Apply" }),
    /* @__PURE__ */ p("button", { type: "button", className: Zr.cancelButton, onClick: n, children: "Cancel" })
  ] });
}, u1 = "_toolbar_r31dh_1", d1 = "_disabled_r31dh_13", f1 = "_headingSelect_r31dh_18", ji = {
  toolbar: u1,
  disabled: d1,
  headingSelect: f1
}, p1 = [
  { value: "p", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" }
], h1 = ({
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
      options: p1,
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
      icon: bu,
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
      icon: Nu,
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
      icon: $u,
      onClick: l,
      size: "sm",
      pressed: c,
      "aria-label": "Insert link",
      title: "Insert link"
    }
  ),
  c && /* @__PURE__ */ p(c1, { onSubmit: r, onCancel: u })
] }), m1 = "_wrapper_8in61_1", g1 = "_editor_8in61_15", _1 = "_editorDisabled_8in61_63", b1 = "_editorPopover_8in61_69", y1 = "_popoverContainer_8in61_75", k1 = "_popoverTrigger_8in61_79", w1 = "_popoverTriggerOpen_8in61_97", x1 = "_popoverPreview_8in61_101", v1 = "_popoverPlaceholder_8in61_109", E1 = "_wrapperPopover_8in61_117", tn = {
  wrapper: m1,
  editor: g1,
  editorDisabled: _1,
  editorPopover: b1,
  popoverContainer: y1,
  popoverTrigger: k1,
  popoverTriggerOpen: w1,
  popoverPreview: x1,
  popoverPlaceholder: v1,
  wrapperPopover: E1
}, S1 = /* @__PURE__ */ new Set(["P", "H1", "H2", "H3", "DIV", "BLOCKQUOTE", "PRE", "LI"]);
function C1(e) {
  const n = document.getSelection();
  if (!n || n.rangeCount === 0) return "p";
  let t = n.anchorNode;
  for (; t && t !== e; ) {
    if (t.nodeType === Node.ELEMENT_NODE) {
      const r = t.tagName;
      if (S1.has(r))
        return r.toLowerCase() === "div" ? "p" : r.toLowerCase();
    }
    t = t.parentElement;
  }
  return "p";
}
function dl(e) {
  if (e.nodeType === Node.TEXT_NODE)
    return e.textContent ?? "";
  if (e.nodeType !== Node.ELEMENT_NODE) return "";
  const n = e, t = n.tagName.toLowerCase(), r = Array.from(n.childNodes).map(dl).join("");
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
function N1(e) {
  const n = document.createElement("div");
  return n.innerHTML = e, Array.from(n.childNodes).map(dl).join("").replace(/\n{3,}/g, `

`).trimEnd();
}
function $1(e) {
  return e.replace(/<[^>]+>/g, "").replace(/#{1,6}\s+/g, "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/\[(.+?)\]\(.+?\)/g, "$1").replace(/\n+/g, " ").trim();
}
const gI = ({
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
  const d = Y(null), h = Y(null), [f, m] = W(!1), [y, _] = W(!1), [b, k] = W("p"), [g, S] = W(!1), [v, x] = W(!1), $ = Y(!1);
  le(() => {
    d.current && !$.current && (d.current.innerHTML = e);
  }, [e, v]), le(() => {
    v && requestAnimationFrame(() => {
      var B;
      return (B = d.current) == null ? void 0 : B.focus();
    });
  }, [v]), le(() => {
    const B = d.current;
    if (!B) return;
    const P = () => {
      if (!d.current) return;
      const ce = document.getSelection();
      if (!ce) return;
      const E = ce.anchorNode;
      E && d.current.contains(E) && (m(document.queryCommandState("bold")), _(document.queryCommandState("italic")), k(C1(d.current)));
    }, w = () => document.addEventListener("selectionchange", P), X = () => document.removeEventListener("selectionchange", P);
    return B.addEventListener("focus", w), B.addEventListener("blur", X), () => {
      B.removeEventListener("focus", w), B.removeEventListener("blur", X), X();
    };
  }, []);
  const I = K((B) => {
    n && n(o === "markdown" ? N1(B) : B);
  }, [n, o]), R = K(() => {
    d.current && ($.current = !0, I(d.current.innerHTML), requestAnimationFrame(() => {
      $.current = !1;
    }));
  }, [I]), N = K(() => {
    var B;
    (B = d.current) == null || B.focus(), document.execCommand("bold", !1), m(document.queryCommandState("bold"));
  }, []), O = K(() => {
    var B;
    (B = d.current) == null || B.focus(), document.execCommand("italic", !1), _(document.queryCommandState("italic"));
  }, []), D = K((B) => {
    var P;
    (P = d.current) == null || P.focus(), document.execCommand("formatBlock", !1, B), k(B);
  }, []), q = K(() => {
    S((B) => !B);
  }, []), F = K((B) => {
    var P;
    (P = d.current) == null || P.focus(), document.execCommand("createLink", !1, B), S(!1), d.current && I(d.current.innerHTML);
  }, [I]), A = K(() => {
    S(!1);
  }, []), T = /* @__PURE__ */ M("div", { className: `${tn.wrapper} ${s ? tn.wrapperPopover : ""} ${s ? "" : a}`, children: [
    /* @__PURE__ */ p(
      h1,
      {
        onBold: N,
        onItalic: O,
        onHeadingChange: D,
        onLinkSubmit: F,
        boldActive: f,
        italicActive: y,
        currentHeading: b,
        disabled: r,
        showLinkInput: g,
        onLinkButtonClick: q,
        onLinkCancel: A
      }
    ),
    c,
    /* @__PURE__ */ p(
      "div",
      {
        ref: d,
        className: `${tn.editor} ${r ? tn.editorDisabled : ""} ${s ? tn.editorPopover : ""}`,
        contentEditable: r ? "false" : "true",
        suppressContentEditableWarning: !0,
        onInput: R,
        "data-placeholder": t,
        style: { minHeight: i },
        role: "textbox",
        "aria-multiline": "true",
        "aria-disabled": r
      }
    )
  ] });
  if (!s)
    return T;
  const j = $1(e);
  return /* @__PURE__ */ M("div", { className: `${tn.popoverContainer} ${a}`, children: [
    /* @__PURE__ */ p(
      "button",
      {
        ref: h,
        type: "button",
        className: `${tn.popoverTrigger} ${v ? tn.popoverTriggerOpen : ""}`,
        onClick: () => x((B) => !B),
        disabled: r,
        children: /* @__PURE__ */ p("span", { className: j ? tn.popoverPreview : tn.popoverPlaceholder, children: j || t || "Edit…" })
      }
    ),
    /* @__PURE__ */ p(
      Ct,
      {
        isOpen: v,
        onClose: () => x(!1),
        anchorRef: h,
        matchWidth: !0,
        overlap: !0,
        role: "dialog",
        "aria-label": "Rich text editor",
        offsetX: l,
        offsetY: u,
        children: T
      }
    )
  ] });
}, I1 = "_control_16kf0_1", A1 = "_disabled_16kf0_7", M1 = "_md_16kf0_11", L1 = "_segment_16kf0_13", R1 = "_sm_16kf0_19", T1 = "_selected_16kf0_29", D1 = "_scroll_16kf0_40", P1 = "_segmentDisabled_16kf0_68", O1 = "_tooltipWrapper_16kf0_89", z1 = "_segmentInner_16kf0_93", B1 = "_pinnedLeft_16kf0_99", F1 = "_pinnedRight_16kf0_104", j1 = "_shadowLeft_16kf0_109", H1 = "_shadowRight_16kf0_115", Lt = {
  control: I1,
  disabled: A1,
  md: M1,
  segment: L1,
  sm: R1,
  selected: T1,
  scroll: D1,
  segmentDisabled: P1,
  tooltipWrapper: O1,
  segmentInner: z1,
  pinnedLeft: B1,
  pinnedRight: F1,
  shadowLeft: j1,
  shadowRight: H1
};
function _I({
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
    var O, D;
    if (g.key !== "ArrowLeft" && g.key !== "ArrowRight") return;
    g.preventDefault();
    const S = e.map((q, F) => q.disabled ? -1 : F).filter((q) => q !== -1);
    if (S.length === 0) return;
    const v = e.findIndex((q) => q.value === n), x = S.indexOf(v);
    let $;
    x === -1 ? $ = 0 : g.key === "ArrowRight" ? $ = (x + 1) % S.length : $ = (x - 1 + S.length) % S.length;
    const I = S[$], R = e[I];
    t(R.value);
    const N = (O = s.current) == null ? void 0 : O.querySelectorAll(
      'button[role="radio"]'
    );
    (D = N == null ? void 0 : N[I]) == null || D.focus();
  }, k = (g) => {
    const S = g.value === n, v = i || g.disabled, x = g.ariaLabel ?? (g.label ? void 0 : String(g.value)), $ = /* @__PURE__ */ p(
      "button",
      {
        role: "radio",
        "aria-checked": S,
        disabled: v,
        tabIndex: S ? 0 : -1,
        className: `${Lt.segment} ${S ? Lt.selected : ""} ${v ? Lt.segmentDisabled : ""}`,
        "data-selected": S,
        "data-value": String(g.value),
        "aria-label": x,
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
    const I = typeof g.tooltip == "string" ? { content: g.tooltip } : g.tooltip;
    return /* @__PURE__ */ p(Oo, { ...I, className: Lt.tooltipWrapper, children: $ }, String(g.value));
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
const q1 = "_list_13f5i_1", U1 = "_columns1_13f5i_5", W1 = "_columns2_13f5i_9", G1 = "_columns3_13f5i_13", V1 = "_item_13f5i_20", X1 = "_selected_13f5i_43", K1 = "_label_13f5i_52", Y1 = "_description_13f5i_57", Jn = {
  list: q1,
  columns1: U1,
  columns2: W1,
  columns3: G1,
  item: V1,
  selected: X1,
  label: K1,
  description: Y1
}, bI = ({
  items: e,
  value: n,
  onChange: t,
  columns: r = 1,
  className: i = "",
  "aria-label": o
}) => {
  const s = e.findIndex((h) => h.value === n), [a, c] = W(
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
}, Z1 = "_container_he1q8_1", Q1 = "_trigger_he1q8_7", J1 = "_triggerLabel_he1q8_25", eb = "_dropdown_he1q8_34", tb = "_groupHeader_he1q8_43", nb = "_group_he1q8_43", rb = "_presets_he1q8_61", ib = "_presetSwatch_he1q8_70", nn = {
  container: Z1,
  trigger: Q1,
  triggerLabel: J1,
  dropdown: eb,
  groupHeader: tb,
  group: nb,
  presets: rb,
  presetSwatch: ib
}, ob = ["#1f2937", "#111827", "#000000", "#374151", "#4b5563", "#6b7280"], sb = ["#000000", "#1f2937", "#111827", "#1e3a5f", "#3b0764", "#7f1d1d"], Qr = 48 / 200;
function ab(e) {
  const n = e.shadowOpacity ?? 0;
  if (n === 0) return "none";
  const r = (e.shadowColor ?? "#000000").replace("#", ""), i = parseInt(r.slice(0, 2), 16), o = parseInt(r.slice(2, 4), 16), s = parseInt(r.slice(4, 6), 16), a = Math.round((e.offsetX ?? 0) * Qr), c = Math.round((e.offsetY ?? 0) * Qr), l = Math.round((e.blur ?? 0) * Qr), u = Math.round((e.spread ?? 0) * Qr);
  return `${a}px ${c}px ${l}px ${u}px rgba(${i},${o},${s},${n})`;
}
const yI = ({ value: e, onChange: n, label: t, labelPosition: r, labelWidth: i, showBezel: o = !0, shadowPresets: s, onPresetSelect: a, offsetX: c = 0, offsetY: l = 0 }) => {
  const [u, d] = W(!1), h = Y(null), f = K(
    (_, b) => {
      n({ [_]: b });
    },
    [n]
  ), m = [
    o && e.bezelWidth > 0 ? `Bezel ${e.bezelWidth}px` : null,
    `${e.offsetX}px ${e.offsetY}px ${e.blur}px ${e.spread}px`,
    `${Math.round(e.shadowOpacity * 100)}%`
  ].filter(Boolean).join(" · "), y = /* @__PURE__ */ M("div", { className: nn.container, children: [
    /* @__PURE__ */ p(
      "button",
      {
        ref: h,
        type: "button",
        className: nn.trigger,
        onClick: () => d((_) => !_),
        children: /* @__PURE__ */ p("span", { className: nn.triggerLabel, children: m })
      }
    ),
    /* @__PURE__ */ M(
      Ct,
      {
        isOpen: u,
        onClose: () => d(!1),
        anchorRef: h,
        className: nn.dropdown,
        matchWidth: !0,
        role: "dialog",
        "aria-label": "Shadow editor",
        offsetX: c,
        offsetY: l,
        children: [
          o && /* @__PURE__ */ M("div", { className: nn.group, children: [
            /* @__PURE__ */ p("h5", { className: nn.groupHeader, children: "Bezel" }),
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
                swatches: ob
              }
            )
          ] }),
          /* @__PURE__ */ M("div", { className: nn.group, children: [
            o && /* @__PURE__ */ p("h5", { className: nn.groupHeader, children: "Drop shadow" }),
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
                swatches: sb
              }
            )
          ] }),
          s && s.length > 0 && /* @__PURE__ */ p("div", { className: nn.presets, children: s.map((_) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              className: nn.presetSwatch,
              style: { boxShadow: ab(_.value) },
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
}, lb = "_skeleton_dbr92_10", cb = "_shimmer_dbr92_1", ub = "_text_dbr92_21", db = "_circle_dbr92_27", fb = "_rect_dbr92_31", pb = "_textGroup_dbr92_36", _r = {
  skeleton: lb,
  shimmer: cb,
  text: ub,
  circle: db,
  rect: fb,
  textGroup: pb
}, kI = ({
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
), hb = "_slider_3xjlg_1", mb = "_disabled_3xjlg_7", gb = "_thumb_3xjlg_11", _b = "_trackArea_3xjlg_15", bb = "_sm_3xjlg_21", yb = "_track_3xjlg_15", kb = "_md_3xjlg_37", wb = "_fill_3xjlg_69", xb = "_tooltip_3xjlg_91", vb = "_tooltipVisible_3xjlg_121", Eb = "_labels_3xjlg_127", Sb = "_label_3xjlg_127", Cb = "_stepLabels_3xjlg_139", Nb = "_stepLabel_3xjlg_139", vt = {
  slider: hb,
  disabled: mb,
  thumb: gb,
  trackArea: _b,
  sm: bb,
  track: yb,
  md: kb,
  fill: wb,
  tooltip: xb,
  tooltipVisible: vb,
  labels: Eb,
  label: Sb,
  stepLabels: Cb,
  stepLabel: Nb
};
function fl(e, n, t) {
  return Math.min(Math.max(e, n), t);
}
function Hi(e, n, t, r) {
  return n !== void 0 && (e = Math.round((e - t) / n) * n + t), fl(e, t, r);
}
function br(e, n, t) {
  return t === n ? 0 : (e - n) / (t - n) * 100;
}
const wI = ({
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
  const m = Array.isArray(e), y = jt(
    () => m ? e : [e, e],
    [m, e]
  ), _ = Y(null), b = Y(null), [k, g] = Ve.useState(null), S = K(
    (A) => {
      var B;
      const T = (B = _.current) == null ? void 0 : B.getBoundingClientRect();
      if (!T) return t;
      const j = fl((A - T.left) / T.width, 0, 1);
      return Hi(t + j * (r - t), i, t, r);
    },
    [t, r, i]
  ), v = K(
    (A, T) => {
      if (m) {
        const j = [...y];
        j[A] = T, A === 0 && T > j[1] && (j[0] = j[1]), A === 1 && T < j[0] && (j[1] = j[0]), n(j);
      } else
        n(T);
    },
    [m, y, n]
  ), x = K(
    (A) => (T) => {
      u || (T.preventDefault(), T.target.setPointerCapture(T.pointerId), b.current = A, g(A));
    },
    [u]
  ), $ = K(
    (A) => (T) => {
      if (b.current !== A) return;
      const j = S(T.clientX);
      v(A, j);
    },
    [S, v]
  ), I = K(
    (A) => (T) => {
      b.current === A && (T.target.releasePointerCapture(T.pointerId), b.current = null, g(null));
    },
    []
  ), R = K(
    (A) => (T) => {
      if (u) return;
      const j = i || (r - t) / 100;
      let B = null;
      switch (T.key) {
        case "ArrowRight":
        case "ArrowUp":
          B = Hi(y[A] + j, i, t, r);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          B = Hi(y[A] - j, i, t, r);
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
      T.preventDefault(), v(A, B);
    },
    [u, i, t, r, y, v]
  ), N = K(
    (A) => {
      if (u || A.target.getAttribute("role") === "slider") return;
      const T = S(A.clientX);
      if (m) {
        const j = Math.abs(y[0] - T), B = Math.abs(y[1] - T);
        v(j <= B ? 0 : 1, T);
      } else
        n(T);
    },
    [u, S, m, y, v, n]
  ), O = (A) => c ? c(A) : String(A), D = (A, T) => {
    const j = br(T, t, r), B = k === A, P = m ? A === 0 ? "Minimum" : "Maximum" : f ?? "Value", w = c ? c(T) : void 0;
    return /* @__PURE__ */ p(
      "div",
      {
        role: "slider",
        tabIndex: u ? -1 : 0,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuenow": T,
        "aria-orientation": "horizontal",
        "aria-disabled": u || void 0,
        "aria-label": P,
        "aria-valuetext": w,
        className: vt.thumb,
        style: { left: `${j}%` },
        onPointerDown: x(A),
        onPointerMove: $(A),
        onPointerUp: I(A),
        onKeyDown: R(A),
        children: a && /* @__PURE__ */ p(
          "span",
          {
            className: `${vt.tooltip} ${B ? vt.tooltipVisible : ""}`,
            children: O(T)
          }
        )
      },
      A
    );
  }, q = m ? br(y[0], t, r) : 0, F = m ? br(y[1], t, r) - br(y[0], t, r) : br(y[0], t, r);
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
                  style: { left: `${q}%`, width: `${F}%` }
                }
              ) }),
              m ? [D(0, y[0]), D(1, y[1])] : D(0, y[0])
            ]
          }
        ),
        o && /* @__PURE__ */ M("div", { className: vt.labels, children: [
          o.start && /* @__PURE__ */ p("span", { className: vt.label, children: o.start }),
          o.end && /* @__PURE__ */ p("span", { className: vt.label, children: o.end })
        ] }),
        s && /* @__PURE__ */ p("div", { className: vt.stepLabels, children: s.map((A, T) => /* @__PURE__ */ p("span", { className: vt.stepLabel, children: A }, T)) })
      ]
    }
  );
}, $b = "_root_c9jbq_6", Ib = "_svg_c9jbq_12", Ab = "_spin_c9jbq_1", Mb = "_track_c9jbq_19", Lb = "_arc_c9jbq_20", Rb = "_inverted_c9jbq_22", Tb = "_sm_c9jbq_25", Db = "_md_c9jbq_26", Pb = "_lg_c9jbq_27", Ob = "_srOnly_c9jbq_29", Pn = {
  root: $b,
  svg: Ib,
  spin: Ab,
  track: Mb,
  arc: Lb,
  inverted: Rb,
  sm: Tb,
  md: Db,
  lg: Pb,
  srOnly: Ob
};
function xI({
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
const zb = "_wrapper_bzbsq_1", Bb = "_table_bzbsq_5", Fb = "_headerCell_bzbsq_12", jb = "_row_bzbsq_26", Hb = "_cell_bzbsq_29", qb = "_compact_bzbsq_38", Ub = "_striped_bzbsq_45", Wb = "_clickable_bzbsq_52", Sn = {
  wrapper: zb,
  table: Bb,
  headerCell: Fb,
  row: jb,
  cell: Hb,
  compact: qb,
  striped: Ub,
  clickable: Wb
};
function vI({
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
const Gb = "_tabList_1tef9_1", Vb = "_md_1tef9_18", Xb = "_tab_1tef9_1", Kb = "_sm_1tef9_25", Yb = "_active_1tef9_43", Jr = {
  tabList: Gb,
  md: Vb,
  tab: Xb,
  sm: Kb,
  active: Yb
}, EI = ({
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
      className: `${Jr.tabList} ${Jr[r]} ${i}`,
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
            className: `${Jr.tab} ${f ? Jr.active : ""}`,
            onClick: () => t(d.id),
            children: d.label
          },
          d.id
        );
      })
    }
  );
}, Zb = "_headingXl_zb4aj_3", Qb = "_headingL_zb4aj_7", Jb = "_headingM_zb4aj_11", ey = "_headingS_zb4aj_15", ty = "_headingXs_zb4aj_19", ny = "_overline_zb4aj_25", ry = "_bodyM_zb4aj_31", iy = "_bodyS_zb4aj_35", oy = "_bodyXs_zb4aj_39", sy = "_bodyMStrong_zb4aj_45", ay = "_bodySStrong_zb4aj_49", ly = "_bodyXsStrong_zb4aj_53", cy = "_colorPrimary_zb4aj_59", uy = "_colorSecondary_zb4aj_63", dy = "_colorSubtle_zb4aj_67", fy = "_colorHighlight_zb4aj_71", py = "_colorWarning_zb4aj_75", hy = "_colorInvertedPrimary_zb4aj_79", qs = {
  headingXl: Zb,
  headingL: Qb,
  headingM: Jb,
  headingS: ey,
  headingXs: ty,
  overline: ny,
  bodyM: ry,
  bodyS: iy,
  bodyXs: oy,
  bodyMStrong: sy,
  bodySStrong: ay,
  bodyXsStrong: ly,
  colorPrimary: cy,
  colorSecondary: uy,
  colorSubtle: dy,
  colorHighlight: fy,
  colorWarning: py,
  colorInvertedPrimary: hy
}, my = {
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
}, gy = {
  primary: "colorPrimary",
  secondary: "colorSecondary",
  subtle: "colorSubtle",
  highlight: "colorHighlight",
  warning: "colorWarning",
  "inverted-primary": "colorInvertedPrimary"
}, SI = ({
  variant: e,
  as: n = "span",
  color: t = "primary",
  className: r = "",
  children: i
}) => {
  const o = qs[my[e]], s = qs[gy[t]];
  return /* @__PURE__ */ p(n, { className: `${o} ${s} ${r}`, children: i });
}, _y = "_textarea_d9sap_1", by = "_error_d9sap_16", Us = {
  textarea: _y,
  error: by
}, CI = ({
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
}, yy = "_timeline_rwrwf_1", ky = "_item_rwrwf_7", wy = "_indicator_rwrwf_13", xy = "_withLine_rwrwf_19", vy = "_dot_rwrwf_28", Ey = "_success_rwrwf_37", Sy = "_warning_rwrwf_42", Cy = "_info_rwrwf_47", Ny = "_error_rwrwf_52", $y = "_avatarWrapper_rwrwf_63", Iy = "_iconWrapper_rwrwf_69", Ay = "_content_rwrwf_95", My = "_title_rwrwf_102", Ly = "_timestamp_rwrwf_110", Ry = "_description_rwrwf_118", Et = {
  timeline: yy,
  item: ky,
  indicator: wy,
  withLine: xy,
  dot: vy,
  success: Ey,
  warning: Sy,
  info: Cy,
  error: Ny,
  default: "_default_rwrwf_57",
  avatarWrapper: $y,
  iconWrapper: Iy,
  content: Ay,
  title: My,
  timestamp: Ly,
  description: Ry
}, NI = ({ items: e, className: n = "" }) => /* @__PURE__ */ p("ol", { className: `${Et.timeline} ${n}`, children: e.map((t, r) => {
  const i = r === e.length - 1, o = t.variant ?? "default";
  return /* @__PURE__ */ M(
    "li",
    {
      className: `${Et.item} ${i ? Et.last : ""}`,
      children: [
        /* @__PURE__ */ p("div", { className: `${Et.indicator} ${i ? "" : Et.withLine}`, children: t.avatar ? /* @__PURE__ */ p("div", { className: Et.avatarWrapper, children: /* @__PURE__ */ p(Fa, { src: t.avatar.src, name: t.avatar.name, size: "sm" }) }) : t.icon ? /* @__PURE__ */ p("div", { className: `${Et.iconWrapper} ${Et[o]}`, children: t.icon }) : /* @__PURE__ */ p(
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
}) }), Ty = "_timePicker_1r9mn_2", Dy = "_inputWrapper_1r9mn_6", Py = "_input_1r9mn_6", Oy = "_open_1r9mn_31", zy = "_error_1r9mn_35", By = "_clockIcon_1r9mn_44", Fy = "_dropdown_1r9mn_54", jy = "_slot_1r9mn_67", Hy = "_selected_1r9mn_84", qy = "_slotDisabled_1r9mn_90", Gt = {
  timePicker: Ty,
  inputWrapper: Dy,
  input: Py,
  open: Oy,
  error: zy,
  clockIcon: By,
  dropdown: Fy,
  slot: jy,
  selected: Hy,
  slotDisabled: qy
};
function Uy(e) {
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
function Wy(e, n) {
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
const $I = ({
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
  const [d, h] = W(!1), [f, m] = W(() => yr(e, t)), y = Y(null), _ = Y(null);
  le(() => {
    m(yr(e, t));
  }, [e, t]);
  const b = Uy(r), k = (I) => !!(i && I < i || o && I > o), g = () => {
    l || h(!0);
  }, S = (I) => {
    m(I.target.value);
  }, v = () => {
    const I = Wy(f, t);
    I ? k(I) ? m(yr(e, t)) : n(I) : f.trim() === "" ? n("") : m(yr(e, t));
  }, x = (I) => {
    n(I), h(!1);
  }, $ = K(
    (I) => {
      I.key === "Escape" && d && h(!1);
    },
    [d]
  );
  return le(() => {
    const I = (R) => {
      y.current && !y.current.contains(R.target) && h(!1);
    };
    return document.addEventListener("mousedown", I), document.addEventListener("keydown", $), () => {
      document.removeEventListener("mousedown", I), document.removeEventListener("keydown", $);
    };
  }, [$]), le(() => {
    if (d && _.current && e) {
      const I = _.current.querySelector(
        `.${Gt.selected}`
      );
      I && typeof I.scrollIntoView == "function" && I.scrollIntoView({ block: "nearest" });
    }
  }, [d, e]), /* @__PURE__ */ p(An, { label: s, htmlFor: u, error: a, helperText: c, disabled: l, children: /* @__PURE__ */ M("div", { ref: y, className: Gt.timePicker, children: [
    /* @__PURE__ */ M("div", { className: Gt.inputWrapper, children: [
      /* @__PURE__ */ p(
        "input",
        {
          id: u,
          type: "text",
          className: `${Gt.input} ${d ? Gt.open : ""} ${a ? Gt.error : ""}`,
          value: f,
          onChange: S,
          onBlur: v,
          onClick: g,
          disabled: l,
          placeholder: t === "12h" ? "12:00 AM" : "00:00",
          autoComplete: "off"
        }
      ),
      /* @__PURE__ */ p(xu, { size: 16, className: Gt.clockIcon })
    ] }),
    d && /* @__PURE__ */ p("div", { ref: _, className: Gt.dropdown, role: "listbox", children: b.map((I) => {
      const R = k(I), N = I === e;
      return /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": N,
          className: `${Gt.slot} ${N ? Gt.selected : ""} ${R ? Gt.slotDisabled : ""}`,
          onClick: () => {
            R || x(I);
          },
          disabled: R,
          children: yr(I, t)
        },
        I
      );
    }) })
  ] }) });
}, Gy = "_wrapper_10l7b_1", Vy = "_disabled_10l7b_8", Xy = "_labelRow_10l7b_13", Ky = "_labelRowTop_10l7b_18", Yy = "_labelRowLeft_10l7b_22", Zy = "_labelText_10l7b_32", Qy = "_track_10l7b_40", Jy = "_checked_10l7b_51", ek = "_sm_10l7b_60", tk = "_thumb_10l7b_64", nk = "_md_10l7b_74", dt = {
  wrapper: Gy,
  disabled: Vy,
  labelRow: Xy,
  labelRowTop: Ky,
  labelRowLeft: Yy,
  labelText: Zy,
  track: Qy,
  checked: Jy,
  sm: ek,
  thumb: tk,
  md: nk
}, II = ({
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
}, rk = "_panel_1mk4b_3", ik = "_inputRow_1mk4b_12", ok = "_searchIcon_1mk4b_21", sk = "_input_1mk4b_12", ak = "_header_1mk4b_42", lk = "_list_1mk4b_50", ck = "_group_1mk4b_59", uk = "_groupLabel_1mk4b_67", dk = "_item_1mk4b_77", fk = "_itemLabel_1mk4b_98", pk = "_empty_1mk4b_107", hk = "_backdrop_1mk4b_116", mk = "_closing_1mk4b_125", gk = "_dialog_1mk4b_130", bt = {
  panel: rk,
  inputRow: ik,
  searchIcon: ok,
  input: sk,
  header: ak,
  list: lk,
  group: ck,
  groupLabel: uk,
  item: dk,
  itemLabel: fk,
  empty: pk,
  backdrop: hk,
  closing: mk,
  dialog: gk
}, _k = No(function({
  groups: n,
  placeholder: t = "Search…",
  emptyMessage: r = "No results.",
  onClose: i,
  className: o,
  header: s
}, a) {
  const [c, l] = W(""), [u, d] = W(0), h = Y(null), f = Y(null);
  Mc(a, () => ({
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
  le(() => {
    d(0);
  }, [c]), le(() => {
    var v, x;
    const g = (v = f.current) == null ? void 0 : v.querySelectorAll("[data-command-item]"), S = g == null ? void 0 : g[u];
    (x = S == null ? void 0 : S.scrollIntoView) == null || x.call(S, { block: "nearest" });
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
        const x = k++;
        return /* @__PURE__ */ M(
          "button",
          {
            type: "button",
            "data-command-item": !0,
            "data-active": u === x || void 0,
            className: bt.item,
            disabled: v.disabled,
            onMouseEnter: () => d(x),
            onClick: () => {
              v.onSelect(), i == null || i();
            },
            children: [
              v.icon && /* @__PURE__ */ p(v.icon, { size: 16 }),
              /* @__PURE__ */ p("span", { className: bt.itemLabel, children: v.label }),
              v.shortcut && /* @__PURE__ */ p(sg, { children: v.shortcut })
            ]
          },
          v.id
        );
      })
    ] }, S)) })
  ] });
});
function AI({
  open: e,
  onClose: n,
  onOpen: t,
  shortcut: r = "k",
  groups: i,
  placeholder: o,
  emptyMessage: s,
  header: a
}) {
  const c = Y(null), [l, u] = W(e), [d, h] = W(!1);
  le(() => {
    e ? (u(!0), h(!1)) : h(!0);
  }, [e]);
  const f = K((m) => {
    m.target === m.currentTarget && d && !e && (u(!1), h(!1));
  }, [d, e]);
  return le(() => {
    function m(y) {
      (y.metaKey || y.ctrlKey) && y.key === r && (y.preventDefault(), t == null || t());
    }
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [r, t]), le(() => {
    e && requestAnimationFrame(() => {
      var m;
      (m = c.current) == null || m.focus();
    });
  }, [e]), l ? mi(
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
            _k,
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
const bk = "_backdrop_1yy09_1", yk = "_closing_1yy09_13", kk = "_dialog_1yy09_18", wk = "_title_1yy09_33", xk = "_description_1yy09_39", vk = "_footer_1yy09_45", Ek = "_cancelButton_1yy09_51", Sk = "_confirmButton_1yy09_66", Ck = "_destructive_1yy09_84", rn = {
  backdrop: bk,
  "alertdialog-backdrop-in": "_alertdialog-backdrop-in_1yy09_1",
  "alertdialog-backdrop-out": "_alertdialog-backdrop-out_1yy09_1",
  closing: yk,
  dialog: kk,
  "alertdialog-in": "_alertdialog-in_1yy09_1",
  "alertdialog-out": "_alertdialog-out_1yy09_1",
  title: wk,
  description: xk,
  footer: vk,
  cancelButton: Ek,
  confirmButton: Sk,
  default: "_default_1yy09_75",
  destructive: Ck
}, Ws = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', MI = ({
  isOpen: e,
  onConfirm: n,
  onCancel: t,
  title: r,
  description: i,
  confirmLabel: o = "Continue",
  cancelLabel: s = "Cancel",
  variant: a = "default"
}) => {
  const c = Y(null), [l, u] = W(e), [d, h] = W(!1);
  le(() => {
    e ? (u(!0), h(!1)) : h(!0);
  }, [e]), le(() => {
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
      className: `${rn.backdrop}${d ? ` ${rn.closing}` : ""}`,
      onAnimationEnd: f,
      onClick: t,
      children: /* @__PURE__ */ M(
        "div",
        {
          ref: c,
          className: `${rn.dialog}${d ? ` ${rn.closing}` : ""}`,
          onClick: (m) => m.stopPropagation(),
          role: "alertdialog",
          "aria-modal": "true",
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-description",
          children: [
            /* @__PURE__ */ p("h2", { id: "alert-dialog-title", className: rn.title, children: r }),
            /* @__PURE__ */ p("p", { id: "alert-dialog-description", className: rn.description, children: i }),
            /* @__PURE__ */ M("div", { className: rn.footer, children: [
              /* @__PURE__ */ p(
                "button",
                {
                  className: rn.cancelButton,
                  onClick: t,
                  type: "button",
                  children: s
                }
              ),
              /* @__PURE__ */ p(
                "button",
                {
                  className: `${rn.confirmButton} ${rn[a]}`,
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
}, Nk = "_backdrop_1quue_1", $k = "_closing_1quue_13", Ik = "_modal_1quue_18", Ak = "_sm_1quue_34", Mk = "_md_1quue_35", Lk = "_lg_1quue_36", Rk = "_full_1quue_37", Tk = "_header_1quue_40", Dk = "_headerBorder_1quue_47", Pk = "_title_1quue_52", Ok = "_body_1quue_58", zk = "_footer_1quue_65", Bk = "_footerBorder_1quue_69", Vt = {
  backdrop: Nk,
  "modal-backdrop-in": "_modal-backdrop-in_1quue_1",
  "modal-backdrop-out": "_modal-backdrop-out_1quue_1",
  closing: $k,
  modal: Ik,
  "modal-in": "_modal-in_1quue_1",
  "modal-out": "_modal-out_1quue_1",
  sm: Ak,
  md: Mk,
  lg: Lk,
  full: Rk,
  header: Tk,
  headerBorder: Dk,
  title: Pk,
  body: Ok,
  footer: zk,
  footerBorder: Bk
}, Gs = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', LI = ({
  isOpen: e,
  onClose: n,
  children: t,
  title: r,
  footer: i,
  headerBorder: o = !0,
  footerBorder: s = !0,
  maxWidth: a = "md"
}) => {
  const c = an(a, "md"), l = mn(), u = Y(null), [d, h] = W(e), [f, m] = W(!1);
  le(() => {
    e ? (h(!0), m(!1)) : m(!0);
  }, [e]), le(() => {
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
      const x = v[0], $ = v[v.length - 1];
      S.shiftKey ? document.activeElement === x && (S.preventDefault(), $.focus()) : document.activeElement === $ && (S.preventDefault(), x.focus());
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
      className: `${Vt.backdrop}${f ? ` ${Vt.closing}` : ""}`,
      onAnimationEnd: y,
      onClick: n,
      children: /* @__PURE__ */ M(
        "div",
        {
          ref: u,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": r ? l : void 0,
          className: `${Vt.modal} ${Vt[c]}${f ? ` ${Vt.closing}` : ""}`,
          onClick: (_) => _.stopPropagation(),
          children: [
            /* @__PURE__ */ M("div", { className: `${Vt.header} ${o ? Vt.headerBorder : ""}`, children: [
              r ? /* @__PURE__ */ p("h2", { id: l, className: Vt.title, children: r }) : /* @__PURE__ */ p("span", {}),
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
            /* @__PURE__ */ p("div", { className: Vt.body, children: t }),
            i && /* @__PURE__ */ p("div", { className: `${Vt.footer} ${s ? Vt.footerBorder : ""}`, children: i })
          ]
        }
      )
    }
  ) : null;
}, Fk = "_backdrop_e6cfg_1", jk = "_closing_e6cfg_10", Hk = "_panel_e6cfg_15", qk = "_right_e6cfg_26", Uk = "_left_e6cfg_38", Wk = "_sm_e6cfg_50", Gk = "_md_e6cfg_51", Vk = "_lg_e6cfg_52", Xk = "_xl_e6cfg_53", Kk = "_header_e6cfg_56", Yk = "_headerLeft_e6cfg_66", Zk = "_headerRight_e6cfg_73", Qk = "_title_e6cfg_79", Jk = "_body_e6cfg_85", e0 = "_footer_e6cfg_91", t0 = "_pushPanel_e6cfg_97", n0 = "_pushPanelInner_e6cfg_112", ft = {
  backdrop: Fk,
  "sidepanel-backdrop-in": "_sidepanel-backdrop-in_e6cfg_1",
  "sidepanel-backdrop-out": "_sidepanel-backdrop-out_e6cfg_1",
  closing: jk,
  panel: Hk,
  "sidepanel-slide-in-right": "_sidepanel-slide-in-right_e6cfg_1",
  "sidepanel-slide-out-right": "_sidepanel-slide-out-right_e6cfg_1",
  "sidepanel-slide-in-left": "_sidepanel-slide-in-left_e6cfg_1",
  "sidepanel-slide-out-left": "_sidepanel-slide-out-left_e6cfg_1",
  right: qk,
  left: Uk,
  sm: Wk,
  md: Gk,
  lg: Vk,
  xl: Xk,
  header: Kk,
  headerLeft: Yk,
  headerRight: Zk,
  title: Qk,
  body: Jk,
  footer: e0,
  pushPanel: t0,
  "sidepanel-push-in": "_sidepanel-push-in_e6cfg_1",
  "sidepanel-push-out": "_sidepanel-push-out_e6cfg_1",
  pushPanelInner: n0
}, Vs = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', r0 = {
  sm: 280,
  md: 320,
  lg: 400,
  xl: 540
}, i0 = ({
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
  const u = typeof s == "string" ? an(s, "md") : s, d = typeof u == "string", h = d ? r0[u] : u, f = mn(), m = Y(null), y = c === "left" ? ft.left : ft.right, [_, b] = W(e), [k, g] = W(!1);
  le(() => {
    e ? (b(!0), g(!1)) : g(!0);
  }, [e]), le(() => {
    if (!e || a !== "overlay") return;
    const I = document.activeElement, N = requestAnimationFrame(() => {
      var q;
      const D = (q = m.current) == null ? void 0 : q.querySelector(Vs);
      D == null || D.focus();
    }), O = (D) => {
      if (D.key !== "Tab" || !m.current) return;
      const q = Array.from(
        m.current.querySelectorAll(Vs)
      );
      if (q.length === 0) return;
      const F = q[0], A = q[q.length - 1];
      D.shiftKey ? document.activeElement === F && (D.preventDefault(), A.focus()) : document.activeElement === A && (D.preventDefault(), F.focus());
    };
    return document.addEventListener("keydown", O), () => {
      cancelAnimationFrame(N), document.removeEventListener("keydown", O), I == null || I.focus();
    };
  }, [e, a]);
  const S = K((I) => {
    I.target === I.currentTarget && k && !e && (b(!1), g(!1));
  }, [k, e]), v = typeof r == "string", x = /* @__PURE__ */ M(kt, { children: [
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
        children: /* @__PURE__ */ p("div", { className: ft.pushPanelInner, style: { width: h }, children: x })
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
          onClick: (I) => I.stopPropagation(),
          children: x
        }
      )
    }
  );
}, o0 = "_toast_b7q8l_23", s0 = "_exiting_b7q8l_36", a0 = "_icon_b7q8l_42", l0 = "_message_b7q8l_51", c0 = "_dismiss_b7q8l_60", u0 = "_stack_b7q8l_76", d0 = "_bottomRight_b7q8l_85", f0 = "_bottomLeft_b7q8l_90", p0 = "_topRight_b7q8l_95", h0 = "_topLeft_b7q8l_100", Kt = {
  toast: o0,
  "toast-in": "_toast-in_b7q8l_1",
  exiting: s0,
  "toast-out": "_toast-out_b7q8l_1",
  icon: a0,
  message: l0,
  dismiss: c0,
  stack: u0,
  bottomRight: d0,
  bottomLeft: f0,
  topRight: p0,
  topLeft: h0
}, m0 = {
  info: Cu,
  success: ku,
  warning: Fu,
  error: wu
}, Xs = 300;
function g0({
  id: e,
  message: n,
  variant: t = "info",
  autoDismiss: r,
  onDismiss: i,
  className: o = ""
}) {
  const [s, a] = W(!1), c = m0[t], l = () => {
    a(!0), setTimeout(() => i == null ? void 0 : i(e), Xs);
  };
  le(() => {
    if (!r) return;
    const m = setTimeout(() => {
      a(!0), setTimeout(() => i == null ? void 0 : i(e), Xs);
    }, r);
    return () => clearTimeout(m);
  }, [r, e, i]);
  const u = [
    Kt.toast,
    Kt[t],
    s ? Kt.exiting : "",
    o
  ].filter(Boolean).join(" "), d = t === "error" || t === "warning";
  return /* @__PURE__ */ M("div", { role: d ? "alert" : "status", "aria-live": d ? void 0 : "polite", "aria-atomic": "true", className: u, children: [
    /* @__PURE__ */ p("span", { className: Kt.icon, "aria-hidden": "true", children: /* @__PURE__ */ p(c, { size: 16 }) }),
    /* @__PURE__ */ p("p", { className: Kt.message, children: n }),
    i && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: Kt.dismiss,
        "aria-label": "Dismiss",
        onClick: l,
        children: /* @__PURE__ */ p(lr, { size: 14 })
      }
    )
  ] });
}
const _0 = {
  "bottom-right": Kt.bottomRight,
  "bottom-left": Kt.bottomLeft,
  "top-right": Kt.topRight,
  "top-left": Kt.topLeft
};
function RI({
  toasts: e,
  onDismiss: n,
  position: t = "bottom-right",
  className: r = ""
}) {
  const i = [
    Kt.stack,
    _0[t],
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: i, children: e.map((o) => /* @__PURE__ */ p(
    g0,
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
function b0(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const y0 = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, k0 = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, w0 = {};
function Ks(e, n) {
  return (w0.jsx ? k0 : y0).test(e);
}
const x0 = /[ \t\n\f\r]/g;
function v0(e) {
  return typeof e == "object" ? e.type === "text" ? Ys(e.value) : !1 : Ys(e);
}
function Ys(e) {
  return e.replace(x0, "") === "";
}
class Rr {
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
Rr.prototype.normal = {};
Rr.prototype.property = {};
Rr.prototype.space = void 0;
function pl(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new Rr(t, r, n);
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
let E0 = 0;
const ve = qn(), et = qn(), go = qn(), U = qn(), We = qn(), sr = qn(), Tt = qn();
function qn() {
  return 2 ** ++E0;
}
const _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ve,
  booleanish: et,
  commaOrSpaceSeparated: Tt,
  commaSeparated: sr,
  number: U,
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
  return new Rr(n, t, e.space);
}
const hl = cr({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: et,
    ariaAutoComplete: null,
    ariaBusy: et,
    ariaChecked: et,
    ariaColCount: U,
    ariaColIndex: U,
    ariaColSpan: U,
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
    ariaLevel: U,
    ariaLive: null,
    ariaModal: et,
    ariaMultiLine: et,
    ariaMultiSelectable: et,
    ariaOrientation: null,
    ariaOwns: We,
    ariaPlaceholder: null,
    ariaPosInSet: U,
    ariaPressed: et,
    ariaReadOnly: et,
    ariaRelevant: null,
    ariaRequired: et,
    ariaRoleDescription: We,
    ariaRowCount: U,
    ariaRowIndex: U,
    ariaRowSpan: U,
    ariaSelected: et,
    ariaSetSize: U,
    ariaSort: null,
    ariaValueMax: U,
    ariaValueMin: U,
    ariaValueNow: U,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function ml(e, n) {
  return n in e ? e[n] : n;
}
function gl(e, n) {
  return ml(e, n.toLowerCase());
}
const S0 = cr({
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
    cols: U,
    colSpan: null,
    content: null,
    contentEditable: et,
    controls: ve,
    controlsList: We,
    coords: U | sr,
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
    height: U,
    hidden: go,
    high: U,
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
    low: U,
    manifest: null,
    max: null,
    maxLength: U,
    media: null,
    method: null,
    min: null,
    minLength: U,
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
    optimum: U,
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
    rows: U,
    rowSpan: U,
    sandbox: We,
    scope: null,
    scoped: ve,
    seamless: ve,
    selected: ve,
    shadowRootClonable: ve,
    shadowRootDelegatesFocus: ve,
    shadowRootMode: null,
    shape: null,
    size: U,
    sizes: null,
    slot: null,
    span: U,
    spellCheck: et,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: U,
    step: null,
    style: null,
    tabIndex: U,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: ve,
    useMap: null,
    value: et,
    width: U,
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
    border: U,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: U,
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
    hSpace: U,
    // `<img>` and `<object>`
    leftMargin: U,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: U,
    // `<body>`
    marginWidth: U,
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
    rightMargin: U,
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
    topMargin: U,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: U,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: ve,
    disableRemotePlayback: ve,
    prefix: null,
    property: null,
    results: U,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: gl
}), C0 = cr({
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
    accentHeight: U,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: U,
    amplitude: U,
    arabicForm: null,
    ascent: U,
    attributeName: null,
    attributeType: null,
    azimuth: U,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: U,
    by: null,
    calcMode: null,
    capHeight: U,
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
    descent: U,
    diffuseConstant: U,
    direction: null,
    display: null,
    dur: null,
    divisor: U,
    dominantBaseline: null,
    download: ve,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: U,
    enableBackground: null,
    end: null,
    event: null,
    exponent: U,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: U,
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
    hanging: U,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: U,
    horizOriginX: U,
    horizOriginY: U,
    id: null,
    ideographic: U,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: U,
    k: U,
    k1: U,
    k2: U,
    k3: U,
    k4: U,
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
    limitingConeAngle: U,
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
    mediaSize: U,
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
    overlinePosition: U,
    overlineThickness: U,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: U,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: We,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: U,
    pointsAtY: U,
    pointsAtZ: U,
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
    specularConstant: U,
    specularExponent: U,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: U,
    strikethroughThickness: U,
    string: null,
    stroke: null,
    strokeDashArray: Tt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: U,
    strokeOpacity: U,
    strokeWidth: null,
    style: null,
    surfaceScale: U,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Tt,
    tabIndex: U,
    tableValues: null,
    target: null,
    targetX: U,
    targetY: U,
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
    underlinePosition: U,
    underlineThickness: U,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: U,
    values: null,
    vAlphabetic: U,
    vMathematical: U,
    vectorEffect: null,
    vHanging: U,
    vIdeographic: U,
    version: null,
    vertAdvY: U,
    vertOriginX: U,
    vertOriginY: U,
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
    xHeight: U,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: ml
}), _l = cr({
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
}), bl = cr({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: gl
}), yl = cr({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), N0 = {
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
}, $0 = /[A-Z]/g, Qs = /-[a-z]/g, I0 = /^data[-\w.:]+$/i;
function A0(e, n) {
  const t = mo(n);
  let r = n, i = $t;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && I0.test(n)) {
    if (n.charAt(4) === "-") {
      const o = n.slice(5).replace(Qs, L0);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = n.slice(4);
      if (!Qs.test(o)) {
        let s = o.replace($0, M0);
        s.charAt(0) !== "-" && (s = "-" + s), n = "data" + s;
      }
    }
    i = Ho;
  }
  return new i(r, n);
}
function M0(e) {
  return "-" + e.toLowerCase();
}
function L0(e) {
  return e.charAt(1).toUpperCase();
}
const R0 = pl([hl, S0, _l, bl, yl], "html"), qo = pl([hl, C0, _l, bl, yl], "svg");
function T0(e) {
  return e.join(" ").trim();
}
var er = {}, Ui, Js;
function D0() {
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
      var A = F.match(n);
      A && (k += A.length);
      var T = F.lastIndexOf(c);
      g = ~T ? F.length - T : g + F.length;
    }
    function v() {
      var F = { line: k, column: g };
      return function(A) {
        return A.position = new x(F), R(), A;
      };
    }
    function x(F) {
      this.start = F, this.end = { line: k, column: g }, this.source = b.source;
    }
    x.prototype.content = _;
    function $(F) {
      var A = new Error(
        b.source + ":" + k + ":" + g + ": " + F
      );
      if (A.reason = F, A.filename = b.source, A.line = k, A.column = g, A.source = _, !b.silent) throw A;
    }
    function I(F) {
      var A = F.exec(_);
      if (A) {
        var T = A[0];
        return S(T), _ = _.slice(T.length), A;
      }
    }
    function R() {
      I(t);
    }
    function N(F) {
      var A;
      for (F = F || []; A = O(); )
        A !== !1 && F.push(A);
      return F;
    }
    function O() {
      var F = v();
      if (!(l != _.charAt(0) || u != _.charAt(1))) {
        for (var A = 2; d != _.charAt(A) && (u != _.charAt(A) || l != _.charAt(A + 1)); )
          ++A;
        if (A += 2, d === _.charAt(A - 1))
          return $("End of comment missing");
        var T = _.slice(2, A - 2);
        return g += 2, S(T), _ = _.slice(A), g += 2, F({
          type: h,
          comment: T
        });
      }
    }
    function D() {
      var F = v(), A = I(r);
      if (A) {
        if (O(), !I(i)) return $("property missing ':'");
        var T = I(o), j = F({
          type: f,
          property: y(A[0].replace(e, d)),
          value: T ? y(T[0].replace(e, d)) : d
        });
        return I(s), j;
      }
    }
    function q() {
      var F = [];
      N(F);
      for (var A; A = D(); )
        A !== !1 && (F.push(A), N(F));
      return F;
    }
    return R(), q();
  }
  function y(_) {
    return _ ? _.replace(a, d) : d;
  }
  return Ui = m, Ui;
}
var ea;
function P0() {
  if (ea) return er;
  ea = 1;
  var e = er && er.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(er, "__esModule", { value: !0 }), er.default = t;
  const n = e(D0());
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
function O0() {
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
function z0() {
  if (na) return wr;
  na = 1;
  var e = wr && wr.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  }, n = e(P0()), t = O0();
  function r(i, o) {
    var s = {};
    return !i || typeof i != "string" || (0, n.default)(i, function(a, c) {
      a && c && (s[(0, t.camelCase)(a, o)] = c);
    }), s;
  }
  return r.default = r, wr = r, wr;
}
var B0 = z0();
const F0 = /* @__PURE__ */ zo(B0), kl = wl("end"), Uo = wl("start");
function wl(e) {
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
function j0(e) {
  const n = Uo(e), t = kl(e);
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
const Wo = {}.hasOwnProperty, H0 = /* @__PURE__ */ new Map(), q0 = /[A-Z]/g, U0 = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), W0 = /* @__PURE__ */ new Set(["td", "th"]), xl = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function G0(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = ew(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = J0(t, n.jsx, n.jsxs);
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
    schema: n.space === "svg" ? qo : R0,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, o = vl(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function vl(e, n, t) {
  if (n.type === "element")
    return V0(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return X0(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return Y0(e, n, t);
  if (n.type === "mdxjsEsm")
    return K0(e, n);
  if (n.type === "root")
    return Z0(e, n, t);
  if (n.type === "text")
    return Q0(e, n);
}
function V0(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = qo, e.schema = i), e.ancestors.push(n);
  const o = Sl(e, n.tagName, !1), s = tw(e, n);
  let a = Vo(e, n);
  return U0.has(n.tagName) && (a = a.filter(function(c) {
    return typeof c == "string" ? !v0(c) : !0;
  })), El(e, s, o, n), Go(s, a), e.ancestors.pop(), e.schema = r, e.create(n, o, s, t);
}
function X0(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Mr(e, n.position);
}
function K0(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Mr(e, n.position);
}
function Y0(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = qo, e.schema = i), e.ancestors.push(n);
  const o = n.name === null ? e.Fragment : Sl(e, n.name, !0), s = nw(e, n), a = Vo(e, n);
  return El(e, s, o, n), Go(s, a), e.ancestors.pop(), e.schema = r, e.create(n, o, s, t);
}
function Z0(e, n, t) {
  const r = {};
  return Go(r, Vo(e, n)), e.create(n, e.Fragment, r, t);
}
function Q0(e, n) {
  return n.value;
}
function El(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function Go(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function J0(e, n, t) {
  return r;
  function r(i, o, s, a) {
    const l = Array.isArray(s.children) ? t : n;
    return a ? l(o, s, a) : l(o, s);
  }
}
function ew(e, n) {
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
function tw(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && Wo.call(n.properties, i)) {
      const o = rw(e, i, n.properties[i]);
      if (o) {
        const [s, a] = o;
        e.tableCellAlignToStyle && s === "align" && typeof a == "string" && W0.has(n.tagName) ? r = a : t[s] = a;
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
function nw(e, n) {
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
  const i = e.passKeys ? /* @__PURE__ */ new Map() : H0;
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
    const a = vl(e, o, s);
    a !== void 0 && t.push(a);
  }
  return t;
}
function rw(e, n, t) {
  const r = A0(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? b0(t) : T0(t)), r.property === "style") {
      let i = typeof t == "object" ? t : iw(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = ow(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? N0[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function iw(e, n) {
  try {
    return F0(n, { reactCompat: !0 });
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
    throw i.file = e.filePath || void 0, i.url = xl + "#cannot-parse-style-attribute", i;
  }
}
function Sl(e, n, t) {
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
  throw t.file = e.filePath || void 0, t.url = xl + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function ow(e) {
  const n = {};
  let t;
  for (t in e)
    Wo.call(e, t) && (n[sw(t)] = e[t]);
  return n;
}
function sw(e) {
  let n = e.replace(q0, aw);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function aw(e) {
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
}, lw = {};
function Xo(e, n) {
  const t = lw, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Cl(e, r, i);
}
function Cl(e, n, t) {
  if (cw(e)) {
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
    r[i] = Cl(e[i], n, t);
  return r.join("");
}
function cw(e) {
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
function Ft(e, n) {
  return e.length > 0 ? (Ot(e, e.length, 0, n), e) : n;
}
const aa = {}.hasOwnProperty;
function Nl(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    uw(n, e[t]);
  return n;
}
function uw(e, n) {
  let t;
  for (t in n) {
    const i = (aa.call(e, t) ? e[t] : void 0) || (e[t] = {}), o = n[t];
    let s;
    if (o)
      for (s in o) {
        aa.call(i, s) || (i[s] = []);
        const a = o[s];
        dw(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function dw(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  Ot(e, 0, 0, r);
}
function $l(e, n) {
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
function Yt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const yt = Mn(/[A-Za-z]/), pt = Mn(/[\dA-Za-z]/), fw = Mn(/[#-'*+\--9=?A-Z^-~]/);
function ui(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const yo = Mn(/\d/), pw = Mn(/[\dA-Fa-f]/), hw = Mn(/[!-/:-@[-`{-~]/);
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
const mw = {
  tokenize: gw
};
function gw(e) {
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
const _w = {
  tokenize: bw
}, la = {
  tokenize: yw
};
function bw(e) {
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
      let v = S, x;
      for (; v--; )
        if (n.events[v][0] === "exit" && n.events[v][1].type === "chunkFlow") {
          x = n.events[v][1].end;
          break;
        }
      b(r);
      let $ = S;
      for (; $ < n.events.length; )
        n.events[$][1].end = {
          ...x
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
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < s && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > s)
        )
          return;
      const $ = n.events.length;
      let I = $, R, N;
      for (; I--; )
        if (n.events[I][0] === "exit" && n.events[I][1].type === "chunkFlow") {
          if (R) {
            N = n.events[I][1].end;
            break;
          }
          R = !0;
        }
      for (b(r), x = $; x < n.events.length; )
        n.events[x][1].end = {
          ...N
        }, x++;
      Ot(n.events, I + 1, 0, n.events.slice($)), n.events.length = x;
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
function yw(e, n, t) {
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
  resolveAll: kw,
  tokenize: ww
};
function kw(e, n) {
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
          }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = Ft(l, [["enter", e[r][1], n], ["exit", e[r][1], n]])), l = Ft(l, [["enter", i, n], ["enter", s, n], ["exit", s, n], ["enter", o, n]]), l = Ft(l, yi(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), l = Ft(l, [["exit", o, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (u = 2, l = Ft(l, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : u = 0, Ot(e, r - 1, t - r + 3, l), t = r + l.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function ww(e, n) {
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
const xw = {
  name: "autolink",
  tokenize: vw
};
function vw(e, n, t) {
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
    return f === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : f === null || f === 32 || f === 60 || ui(f) ? t(f) : (e.consume(f), c);
  }
  function l(f) {
    return f === 64 ? (e.consume(f), u) : fw(f) ? (e.consume(f), l) : t(f);
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
const Tr = {
  partial: !0,
  tokenize: Ew
};
function Ew(e, n, t) {
  return r;
  function r(o) {
    return $e(o) ? Le(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || de(o) ? n(o) : t(o);
  }
}
const Il = {
  continuation: {
    tokenize: Cw
  },
  exit: Nw,
  name: "blockQuote",
  tokenize: Sw
};
function Sw(e, n, t) {
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
function Cw(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return $e(s) ? Le(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : o(s);
  }
  function o(s) {
    return e.attempt(Il, n, t)(s);
  }
}
function Nw(e) {
  e.exit("blockQuote");
}
const Al = {
  name: "characterEscape",
  tokenize: $w
};
function $w(e, n, t) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return hw(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(o);
  }
}
const Ml = {
  name: "characterReference",
  tokenize: Iw
};
function Iw(e, n, t) {
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
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, s = pw, u) : (e.enter("characterReferenceValue"), o = 7, s = yo, u(d));
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
  tokenize: Mw
}, da = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Aw
};
function Aw(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: v
  };
  let o = 0, s = 0, a;
  return c;
  function c(x) {
    return l(x);
  }
  function l(x) {
    const $ = r.events[r.events.length - 1];
    return o = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, a = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(x);
  }
  function u(x) {
    return x === a ? (s++, e.consume(x), u) : s < 3 ? t(x) : (e.exit("codeFencedFenceSequence"), $e(x) ? Le(e, d, "whitespace")(x) : d(x));
  }
  function d(x) {
    return x === null || de(x) ? (e.exit("codeFencedFence"), r.interrupt ? n(x) : e.check(ua, y, S)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), h(x));
  }
  function h(x) {
    return x === null || de(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(x)) : $e(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Le(e, f, "whitespace")(x)) : x === 96 && x === a ? t(x) : (e.consume(x), h);
  }
  function f(x) {
    return x === null || de(x) ? d(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), m(x));
  }
  function m(x) {
    return x === null || de(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(x)) : x === 96 && x === a ? t(x) : (e.consume(x), m);
  }
  function y(x) {
    return e.attempt(i, S, _)(x);
  }
  function _(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), b;
  }
  function b(x) {
    return o > 0 && $e(x) ? Le(e, k, "linePrefix", o + 1)(x) : k(x);
  }
  function k(x) {
    return x === null || de(x) ? e.check(ua, y, S)(x) : (e.enter("codeFlowValue"), g(x));
  }
  function g(x) {
    return x === null || de(x) ? (e.exit("codeFlowValue"), k(x)) : (e.consume(x), g);
  }
  function S(x) {
    return e.exit("codeFenced"), n(x);
  }
  function v(x, $, I) {
    let R = 0;
    return N;
    function N(A) {
      return x.enter("lineEnding"), x.consume(A), x.exit("lineEnding"), O;
    }
    function O(A) {
      return x.enter("codeFencedFence"), $e(A) ? Le(x, D, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(A) : D(A);
    }
    function D(A) {
      return A === a ? (x.enter("codeFencedFenceSequence"), q(A)) : I(A);
    }
    function q(A) {
      return A === a ? (R++, x.consume(A), q) : R >= s ? (x.exit("codeFencedFenceSequence"), $e(A) ? Le(x, F, "whitespace")(A) : F(A)) : I(A);
    }
    function F(A) {
      return A === null || de(A) ? (x.exit("codeFencedFence"), $(A)) : I(A);
    }
  }
}
function Mw(e, n, t) {
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
  tokenize: Rw
}, Lw = {
  partial: !0,
  tokenize: Tw
};
function Rw(e, n, t) {
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
    return l === null ? c(l) : de(l) ? e.attempt(Lw, s, c)(l) : (e.enter("codeFlowValue"), a(l));
  }
  function a(l) {
    return l === null || de(l) ? (e.exit("codeFlowValue"), s(l)) : (e.consume(l), a);
  }
  function c(l) {
    return e.exit("codeIndented"), n(l);
  }
}
function Tw(e, n, t) {
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
const Dw = {
  name: "codeText",
  previous: Ow,
  resolve: Pw,
  tokenize: zw
};
function Pw(e) {
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
function Ow(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function zw(e, n, t) {
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
class Bw {
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
function Ll(e) {
  const n = {};
  let t = -1, r, i, o, s, a, c, l;
  const u = new Bw(e);
  for (; ++t < u.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = u.get(t), t && r[1].type === "chunkFlow" && u.get(t - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, o = 0, o < c.length && c[o][1].type === "lineEndingBlank" && (o += 2), o < c.length && c[o][1].type === "content"))
      for (; ++o < c.length && c[o][1].type !== "content"; )
        c[o][1].type === "chunkText" && (c[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, Fw(u, t)), t = n[t], l = !0);
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
function Fw(e, n) {
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
const jw = {
  resolve: qw,
  tokenize: Uw
}, Hw = {
  partial: !0,
  tokenize: Ww
};
function qw(e) {
  return Ll(e), e;
}
function Uw(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : de(a) ? e.check(Hw, s, o)(a) : (e.consume(a), i);
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
function Ww(e, n, t) {
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
function Rl(e, n, t, r, i, o, s, a, c) {
  const l = c || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(b), e.exit(o), h) : b === null || b === 32 || b === 41 || ui(b) ? t(b) : (e.enter(r), e.enter(s), e.enter(a), e.enter("chunkString", {
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
    return !u && (b === null || b === 41 || Be(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(s), e.exit(r), n(b)) : u < l && b === 40 ? (e.consume(b), u++, y) : b === 41 ? (e.consume(b), u--, y) : b === null || b === 32 || b === 40 || ui(b) ? t(b) : (e.consume(b), b === 92 ? _ : y);
  }
  function _(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), y) : y(b);
  }
}
function Tl(e, n, t, r, i, o) {
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
function Dl(e, n, t, r, i, o) {
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
const Gw = {
  name: "definition",
  tokenize: Xw
}, Vw = {
  partial: !0,
  tokenize: Kw
};
function Xw(e, n, t) {
  const r = this;
  let i;
  return o;
  function o(f) {
    return e.enter("definition"), s(f);
  }
  function s(f) {
    return Tl.call(
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
    return i = Yt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), f === 58 ? (e.enter("definitionMarker"), e.consume(f), e.exit("definitionMarker"), c) : t(f);
  }
  function c(f) {
    return Be(f) ? $r(e, l)(f) : l(f);
  }
  function l(f) {
    return Rl(
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
    return e.attempt(Vw, d, d)(f);
  }
  function d(f) {
    return $e(f) ? Le(e, h, "whitespace")(f) : h(f);
  }
  function h(f) {
    return f === null || de(f) ? (e.exit("definition"), r.parser.defined.push(i), n(f)) : t(f);
  }
}
function Kw(e, n, t) {
  return r;
  function r(a) {
    return Be(a) ? $r(e, i)(a) : t(a);
  }
  function i(a) {
    return Dl(e, o, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return $e(a) ? Le(e, s, "whitespace")(a) : s(a);
  }
  function s(a) {
    return a === null || de(a) ? n(a) : t(a);
  }
}
const Yw = {
  name: "hardBreakEscape",
  tokenize: Zw
};
function Zw(e, n, t) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), i;
  }
  function i(o) {
    return de(o) ? (e.exit("hardBreakEscape"), n(o)) : t(o);
  }
}
const Qw = {
  name: "headingAtx",
  resolve: Jw,
  tokenize: ex
};
function Jw(e, n) {
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
function ex(e, n, t) {
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
const tx = [
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
], fa = ["pre", "script", "style", "textarea"], nx = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ox,
  tokenize: sx
}, rx = {
  partial: !0,
  tokenize: lx
}, ix = {
  partial: !0,
  tokenize: ax
};
function ox(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function sx(e, n, t) {
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
    return E === 33 ? (e.consume(E), h) : E === 47 ? (e.consume(E), o = !0, y) : E === 63 ? (e.consume(E), i = 3, r.interrupt ? n : w) : yt(E) ? (e.consume(E), s = String.fromCharCode(E), _) : t(E);
  }
  function h(E) {
    return E === 45 ? (e.consume(E), i = 2, f) : E === 91 ? (e.consume(E), i = 5, a = 0, m) : yt(E) ? (e.consume(E), i = 4, r.interrupt ? n : w) : t(E);
  }
  function f(E) {
    return E === 45 ? (e.consume(E), r.interrupt ? n : w) : t(E);
  }
  function m(E) {
    const be = "CDATA[";
    return E === be.charCodeAt(a++) ? (e.consume(E), a === be.length ? r.interrupt ? n : D : m) : t(E);
  }
  function y(E) {
    return yt(E) ? (e.consume(E), s = String.fromCharCode(E), _) : t(E);
  }
  function _(E) {
    if (E === null || E === 47 || E === 62 || Be(E)) {
      const be = E === 47, fe = s.toLowerCase();
      return !be && !o && fa.includes(fe) ? (i = 1, r.interrupt ? n(E) : D(E)) : tx.includes(s.toLowerCase()) ? (i = 6, be ? (e.consume(E), b) : r.interrupt ? n(E) : D(E)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(E) : o ? k(E) : g(E));
    }
    return E === 45 || pt(E) ? (e.consume(E), s += String.fromCharCode(E), _) : t(E);
  }
  function b(E) {
    return E === 62 ? (e.consume(E), r.interrupt ? n : D) : t(E);
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
    return E === 61 ? (e.consume(E), x) : $e(E) ? (e.consume(E), v) : g(E);
  }
  function x(E) {
    return E === null || E === 60 || E === 61 || E === 62 || E === 96 ? t(E) : E === 34 || E === 39 ? (e.consume(E), c = E, $) : $e(E) ? (e.consume(E), x) : I(E);
  }
  function $(E) {
    return E === c ? (e.consume(E), c = null, R) : E === null || de(E) ? t(E) : (e.consume(E), $);
  }
  function I(E) {
    return E === null || E === 34 || E === 39 || E === 47 || E === 60 || E === 61 || E === 62 || E === 96 || Be(E) ? v(E) : (e.consume(E), I);
  }
  function R(E) {
    return E === 47 || E === 62 || $e(E) ? g(E) : t(E);
  }
  function N(E) {
    return E === 62 ? (e.consume(E), O) : t(E);
  }
  function O(E) {
    return E === null || de(E) ? D(E) : $e(E) ? (e.consume(E), O) : t(E);
  }
  function D(E) {
    return E === 45 && i === 2 ? (e.consume(E), T) : E === 60 && i === 1 ? (e.consume(E), j) : E === 62 && i === 4 ? (e.consume(E), X) : E === 63 && i === 3 ? (e.consume(E), w) : E === 93 && i === 5 ? (e.consume(E), P) : de(E) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(rx, ce, q)(E)) : E === null || de(E) ? (e.exit("htmlFlowData"), q(E)) : (e.consume(E), D);
  }
  function q(E) {
    return e.check(ix, F, ce)(E);
  }
  function F(E) {
    return e.enter("lineEnding"), e.consume(E), e.exit("lineEnding"), A;
  }
  function A(E) {
    return E === null || de(E) ? q(E) : (e.enter("htmlFlowData"), D(E));
  }
  function T(E) {
    return E === 45 ? (e.consume(E), w) : D(E);
  }
  function j(E) {
    return E === 47 ? (e.consume(E), s = "", B) : D(E);
  }
  function B(E) {
    if (E === 62) {
      const be = s.toLowerCase();
      return fa.includes(be) ? (e.consume(E), X) : D(E);
    }
    return yt(E) && s.length < 8 ? (e.consume(E), s += String.fromCharCode(E), B) : D(E);
  }
  function P(E) {
    return E === 93 ? (e.consume(E), w) : D(E);
  }
  function w(E) {
    return E === 62 ? (e.consume(E), X) : E === 45 && i === 2 ? (e.consume(E), w) : D(E);
  }
  function X(E) {
    return E === null || de(E) ? (e.exit("htmlFlowData"), ce(E)) : (e.consume(E), X);
  }
  function ce(E) {
    return e.exit("htmlFlow"), n(E);
  }
}
function ax(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return de(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), o) : t(s);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? t(s) : n(s);
  }
}
function lx(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Tr, n, t);
  }
}
const cx = {
  name: "htmlText",
  tokenize: ux
};
function ux(e, n, t) {
  const r = this;
  let i, o, s;
  return a;
  function a(w) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(w), c;
  }
  function c(w) {
    return w === 33 ? (e.consume(w), l) : w === 47 ? (e.consume(w), v) : w === 63 ? (e.consume(w), g) : yt(w) ? (e.consume(w), I) : t(w);
  }
  function l(w) {
    return w === 45 ? (e.consume(w), u) : w === 91 ? (e.consume(w), o = 0, m) : yt(w) ? (e.consume(w), k) : t(w);
  }
  function u(w) {
    return w === 45 ? (e.consume(w), f) : t(w);
  }
  function d(w) {
    return w === null ? t(w) : w === 45 ? (e.consume(w), h) : de(w) ? (s = d, j(w)) : (e.consume(w), d);
  }
  function h(w) {
    return w === 45 ? (e.consume(w), f) : d(w);
  }
  function f(w) {
    return w === 62 ? T(w) : w === 45 ? h(w) : d(w);
  }
  function m(w) {
    const X = "CDATA[";
    return w === X.charCodeAt(o++) ? (e.consume(w), o === X.length ? y : m) : t(w);
  }
  function y(w) {
    return w === null ? t(w) : w === 93 ? (e.consume(w), _) : de(w) ? (s = y, j(w)) : (e.consume(w), y);
  }
  function _(w) {
    return w === 93 ? (e.consume(w), b) : y(w);
  }
  function b(w) {
    return w === 62 ? T(w) : w === 93 ? (e.consume(w), b) : y(w);
  }
  function k(w) {
    return w === null || w === 62 ? T(w) : de(w) ? (s = k, j(w)) : (e.consume(w), k);
  }
  function g(w) {
    return w === null ? t(w) : w === 63 ? (e.consume(w), S) : de(w) ? (s = g, j(w)) : (e.consume(w), g);
  }
  function S(w) {
    return w === 62 ? T(w) : g(w);
  }
  function v(w) {
    return yt(w) ? (e.consume(w), x) : t(w);
  }
  function x(w) {
    return w === 45 || pt(w) ? (e.consume(w), x) : $(w);
  }
  function $(w) {
    return de(w) ? (s = $, j(w)) : $e(w) ? (e.consume(w), $) : T(w);
  }
  function I(w) {
    return w === 45 || pt(w) ? (e.consume(w), I) : w === 47 || w === 62 || Be(w) ? R(w) : t(w);
  }
  function R(w) {
    return w === 47 ? (e.consume(w), T) : w === 58 || w === 95 || yt(w) ? (e.consume(w), N) : de(w) ? (s = R, j(w)) : $e(w) ? (e.consume(w), R) : T(w);
  }
  function N(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || pt(w) ? (e.consume(w), N) : O(w);
  }
  function O(w) {
    return w === 61 ? (e.consume(w), D) : de(w) ? (s = O, j(w)) : $e(w) ? (e.consume(w), O) : R(w);
  }
  function D(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96 ? t(w) : w === 34 || w === 39 ? (e.consume(w), i = w, q) : de(w) ? (s = D, j(w)) : $e(w) ? (e.consume(w), D) : (e.consume(w), F);
  }
  function q(w) {
    return w === i ? (e.consume(w), i = void 0, A) : w === null ? t(w) : de(w) ? (s = q, j(w)) : (e.consume(w), q);
  }
  function F(w) {
    return w === null || w === 34 || w === 39 || w === 60 || w === 61 || w === 96 ? t(w) : w === 47 || w === 62 || Be(w) ? R(w) : (e.consume(w), F);
  }
  function A(w) {
    return w === 47 || w === 62 || Be(w) ? R(w) : t(w);
  }
  function T(w) {
    return w === 62 ? (e.consume(w), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(w);
  }
  function j(w) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), B;
  }
  function B(w) {
    return $e(w) ? Le(e, P, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(w) : P(w);
  }
  function P(w) {
    return e.enter("htmlTextData"), s(w);
  }
}
const Yo = {
  name: "labelEnd",
  resolveAll: hx,
  resolveTo: mx,
  tokenize: gx
}, dx = {
  tokenize: _x
}, fx = {
  tokenize: bx
}, px = {
  tokenize: yx
};
function hx(e) {
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
function mx(e, n) {
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
  return a = [["enter", c, n], ["enter", l, n]], a = Ft(a, e.slice(o + 1, o + r + 3)), a = Ft(a, [["enter", u, n]]), a = Ft(a, yi(n.parser.constructs.insideSpan.null, e.slice(o + r + 4, s - 3), n)), a = Ft(a, [["exit", u, n], e[s - 2], e[s - 1], ["exit", l, n]]), a = Ft(a, e.slice(s + 1)), a = Ft(a, [["exit", c, n]]), Ot(e, o, e.length, a), e;
}
function gx(e, n, t) {
  const r = this;
  let i = r.events.length, o, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(h) {
    return o ? o._inactive ? d(h) : (s = r.parser.defined.includes(Yt(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), c) : t(h);
  }
  function c(h) {
    return h === 40 ? e.attempt(dx, u, s ? u : d)(h) : h === 91 ? e.attempt(fx, u, s ? l : d)(h) : s ? u(h) : d(h);
  }
  function l(h) {
    return e.attempt(px, u, d)(h);
  }
  function u(h) {
    return n(h);
  }
  function d(h) {
    return o._balanced = !0, t(h);
  }
}
function _x(e, n, t) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return Be(d) ? $r(e, o)(d) : o(d);
  }
  function o(d) {
    return d === 41 ? u(d) : Rl(e, s, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function s(d) {
    return Be(d) ? $r(e, c)(d) : u(d);
  }
  function a(d) {
    return t(d);
  }
  function c(d) {
    return d === 34 || d === 39 || d === 40 ? Dl(e, l, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function l(d) {
    return Be(d) ? $r(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), n) : t(d);
  }
}
function bx(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return Tl.call(r, e, o, s, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(Yt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function s(a) {
    return t(a);
  }
}
function yx(e, n, t) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), n) : t(o);
  }
}
const kx = {
  name: "labelStartImage",
  resolveAll: Yo.resolveAll,
  tokenize: wx
};
function wx(e, n, t) {
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
const xx = {
  name: "labelStartLink",
  resolveAll: Yo.resolveAll,
  tokenize: vx
};
function vx(e, n, t) {
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
  tokenize: Ex
};
function Ex(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), Le(e, n, "linePrefix");
  }
}
const si = {
  name: "thematicBreak",
  tokenize: Sx
};
function Sx(e, n, t) {
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
    tokenize: Ix
  },
  exit: Mx,
  name: "list",
  tokenize: $x
}, Cx = {
  partial: !0,
  tokenize: Lx
}, Nx = {
  partial: !0,
  tokenize: Ax
};
function $x(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return a;
  function a(f) {
    const m = r.containerState.type || (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (m === "listUnordered" ? !r.containerState.marker || f === r.containerState.marker : yo(f)) {
      if (r.containerState.type || (r.containerState.type = m, e.enter(m, {
        _container: !0
      })), m === "listUnordered")
        return e.enter("listItemPrefix"), f === 42 || f === 45 ? e.check(si, t, l)(f) : l(f);
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
      Tr,
      // Can’t be empty when interrupting.
      r.interrupt ? t : u,
      e.attempt(Cx, h, d)
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
function Ix(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Tr, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Le(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !$e(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Nx, n, s)(a));
  }
  function s(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, Le(e, e.attempt(St, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Ax(e, n, t) {
  const r = this;
  return Le(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? n(o) : t(o);
  }
}
function Mx(e) {
  e.exit(this.containerState.type);
}
function Lx(e, n, t) {
  const r = this;
  return Le(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return !$e(o) && s && s[1].type === "listItemPrefixWhitespace" ? n(o) : t(o);
  }
}
const pa = {
  name: "setextUnderline",
  resolveTo: Rx,
  tokenize: Tx
};
function Rx(e, n) {
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
function Tx(e, n, t) {
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
const Dx = {
  tokenize: Px
};
function Px(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Tr,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, Le(e, e.attempt(this.parser.constructs.flow, i, e.attempt(jw, i)), "linePrefix"))
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
const Ox = {
  resolveAll: Ol()
}, zx = Pl("string"), Bx = Pl("text");
function Pl(e) {
  return {
    resolveAll: Ol(e === "text" ? Fx : void 0),
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
function Ol(e) {
  return n;
  function n(t, r) {
    let i = -1, o;
    for (; ++i <= t.length; )
      o === void 0 ? t[i] && t[i][1].type === "data" && (o = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== o + 2 && (t[o][1].end = t[i - 1][1].end, t.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(t, r) : t;
  }
}
function Fx(e, n) {
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
const jx = {
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
  62: Il
}, Hx = {
  91: Gw
}, qx = {
  [-2]: Gi,
  [-1]: Gi,
  32: Gi
}, Ux = {
  35: Qw,
  42: si,
  45: [pa, si],
  60: nx,
  61: pa,
  95: si,
  96: da,
  126: da
}, Wx = {
  38: Ml,
  92: Al
}, Gx = {
  [-5]: Vi,
  [-4]: Vi,
  [-3]: Vi,
  33: kx,
  38: Ml,
  42: ko,
  60: [xw, cx],
  91: xx,
  92: [Yw, Al],
  93: Yo,
  95: ko,
  96: Dw
}, Vx = {
  null: [ko, Ox]
}, Xx = {
  null: [42, 95]
}, Kx = {
  null: []
}, Yx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Xx,
  contentInitial: Hx,
  disable: Kx,
  document: jx,
  flow: Ux,
  flowInitial: qx,
  insideSpan: Vx,
  string: Wx,
  text: Gx
}, Symbol.toStringTag, { value: "Module" }));
function Zx(e, n, t) {
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
    check: $(x),
    consume: k,
    enter: g,
    exit: S,
    interrupt: $(x, {
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
  function d(O) {
    return s = Ft(s, O), _(), s[s.length - 1] !== null ? [] : (I(n, 0), l.events = yi(o, l.events, l), l.events);
  }
  function h(O, D) {
    return Jx(f(O), D);
  }
  function f(O) {
    return Qx(s, O);
  }
  function m() {
    const {
      _bufferIndex: O,
      _index: D,
      line: q,
      column: F,
      offset: A
    } = r;
    return {
      _bufferIndex: O,
      _index: D,
      line: q,
      column: F,
      offset: A
    };
  }
  function y(O) {
    i[O.line] = O.column, N();
  }
  function _() {
    let O;
    for (; r._index < s.length; ) {
      const D = s[r._index];
      if (typeof D == "string")
        for (O = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === O && r._bufferIndex < D.length; )
          b(D.charCodeAt(r._bufferIndex));
      else
        b(D);
    }
  }
  function b(O) {
    u = u(O);
  }
  function k(O) {
    de(O) ? (r.line++, r.column = 1, r.offset += O === -3 ? 2 : 1, N()) : O !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = O;
  }
  function g(O, D) {
    const q = D || {};
    return q.type = O, q.start = m(), l.events.push(["enter", q, l]), a.push(q), q;
  }
  function S(O) {
    const D = a.pop();
    return D.end = m(), l.events.push(["exit", D, l]), D;
  }
  function v(O, D) {
    I(O, D.from);
  }
  function x(O, D) {
    D.restore();
  }
  function $(O, D) {
    return q;
    function q(F, A, T) {
      let j, B, P, w;
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
        return j = De, B = 0, De.length === 0 ? T : E(De[B]);
      }
      function E(De) {
        return Je;
        function Je(Xe) {
          return w = R(), P = De, De.partial || (l.currentConstruct = De), De.name && l.parser.constructs.disable.null.includes(De.name) ? fe() : De.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            D ? Object.assign(Object.create(l), D) : l,
            c,
            be,
            fe
          )(Xe);
        }
      }
      function be(De) {
        return O(P, w), A;
      }
      function fe(De) {
        return w.restore(), ++B < j.length ? E(j[B]) : T;
      }
    }
  }
  function I(O, D) {
    O.resolveAll && !o.includes(O) && o.push(O), O.resolve && Ot(l.events, D, l.events.length - D, O.resolve(l.events.slice(D), l)), O.resolveTo && (l.events = O.resolveTo(l.events, l));
  }
  function R() {
    const O = m(), D = l.previous, q = l.currentConstruct, F = l.events.length, A = Array.from(a);
    return {
      from: F,
      restore: T
    };
    function T() {
      r = O, l.previous = D, l.currentConstruct = q, l.events.length = F, a = A, N();
    }
  }
  function N() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Qx(e, n) {
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
function Jx(e, n) {
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
function ev(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Nl([Yx, ...(e || {}).extensions || []])
    ),
    content: i(mw),
    defined: [],
    document: i(_w),
    flow: i(Dx),
    lazy: {},
    string: i(zx),
    text: i(Bx)
  };
  return r;
  function i(o) {
    return s;
    function s(a) {
      return Zx(r, o, a);
    }
  }
}
function tv(e) {
  for (; !Ll(e); )
    ;
  return e;
}
const ha = /[\0\t\n\r]/g;
function nv() {
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
const rv = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function iv(e) {
  return e.replace(rv, ov);
}
function ov(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), o = i === 120 || i === 88;
    return $l(t.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return Ko(t) || e;
}
const zl = {}.hasOwnProperty;
function sv(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), av(t)(tv(ev(t).document().write(nv()(e, n, !0))));
}
function av(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(Te),
      autolinkProtocol: R,
      autolinkEmail: R,
      atxHeading: o(ne),
      blockQuote: o(Ge),
      characterEscape: R,
      characterReference: R,
      codeFenced: o(wt),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: o(wt, s),
      codeText: o(se, s),
      codeTextData: R,
      data: R,
      codeFlowValue: R,
      definition: o(Ee),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: o(te),
      hardBreakEscape: o(G),
      hardBreakTrailing: o(G),
      htmlFlow: o(me, s),
      htmlFlowData: R,
      htmlText: o(me, s),
      htmlTextData: R,
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
      codeText: c(A),
      codeTextData: N,
      data: N,
      definition: c(),
      definitionDestinationString: S,
      definitionLabelString: k,
      definitionTitleString: g,
      emphasis: c(),
      hardBreakEscape: c(D),
      hardBreakTrailing: c(D),
      htmlFlow: c(q),
      htmlFlowData: N,
      htmlText: c(F),
      htmlTextData: N,
      image: c(j),
      label: P,
      labelText: B,
      lineEnding: O,
      link: c(T),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: be,
      resourceDestinationString: w,
      resourceTitleString: X,
      resource: ce,
      setextHeading: c(I),
      setextHeadingLineSequence: $,
      setextHeadingText: x,
      strong: c(),
      thematicBreak: c()
    }
  };
  Bl(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(L) {
    let H = {
      type: "root",
      children: []
    };
    const re = {
      stack: [H],
      tokenStack: [],
      config: n,
      enter: a,
      exit: l,
      buffer: s,
      resume: u,
      data: t
    }, ie = [];
    let Ne = -1;
    for (; ++Ne < L.length; )
      if (L[Ne][1].type === "listOrdered" || L[Ne][1].type === "listUnordered")
        if (L[Ne][0] === "enter")
          ie.push(Ne);
        else {
          const at = ie.pop();
          Ne = i(L, at, Ne);
        }
    for (Ne = -1; ++Ne < L.length; ) {
      const at = n[L[Ne][0]];
      zl.call(at, L[Ne][1].type) && at[L[Ne][1].type].call(Object.assign({
        sliceSerialize: L[Ne][2].sliceSerialize
      }, re), L[Ne][1]);
    }
    if (re.tokenStack.length > 0) {
      const at = re.tokenStack[re.tokenStack.length - 1];
      (at[1] || ma).call(re, void 0, at[0]);
    }
    for (H.position = {
      start: Cn(L.length > 0 ? L[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Cn(L.length > 0 ? L[L.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Ne = -1; ++Ne < n.transforms.length; )
      H = n.transforms[Ne](H) || H;
    return H;
  }
  function i(L, H, re) {
    let ie = H - 1, Ne = -1, at = !1, Ht, ot, Zt, cn;
    for (; ++ie <= re; ) {
      const lt = L[ie];
      switch (lt[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          lt[0] === "enter" ? Ne++ : Ne--, cn = void 0;
          break;
        }
        case "lineEndingBlank": {
          lt[0] === "enter" && (Ht && !cn && !Ne && !Zt && (Zt = ie), cn = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          cn = void 0;
      }
      if (!Ne && lt[0] === "enter" && lt[1].type === "listItemPrefix" || Ne === -1 && lt[0] === "exit" && (lt[1].type === "listUnordered" || lt[1].type === "listOrdered")) {
        if (Ht) {
          let mt = ie;
          for (ot = void 0; mt--; ) {
            const gt = L[mt];
            if (gt[1].type === "lineEnding" || gt[1].type === "lineEndingBlank") {
              if (gt[0] === "exit") continue;
              ot && (L[ot][1].type = "lineEndingBlank", at = !0), gt[1].type = "lineEnding", ot = mt;
            } else if (!(gt[1].type === "linePrefix" || gt[1].type === "blockQuotePrefix" || gt[1].type === "blockQuotePrefixWhitespace" || gt[1].type === "blockQuoteMarker" || gt[1].type === "listItemIndent")) break;
          }
          Zt && (!ot || Zt < ot) && (Ht._spread = !0), Ht.end = Object.assign({}, ot ? L[ot][1].start : lt[1].end), L.splice(ot || ie, 0, ["exit", Ht, lt[2]]), ie++, re++;
        }
        if (lt[1].type === "listItemPrefix") {
          const mt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, lt[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ht = mt, L.splice(ie, 0, ["enter", mt, lt[2]]), ie++, re++, Zt = void 0, cn = !0;
        }
      }
    }
    return L[H][1]._spread = at, re;
  }
  function o(L, H) {
    return re;
    function re(ie) {
      a.call(this, L(ie), ie), H && H.call(this, ie);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(L, H, re) {
    this.stack[this.stack.length - 1].children.push(L), this.stack.push(L), this.tokenStack.push([H, re || void 0]), L.position = {
      start: Cn(H.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(L) {
    return H;
    function H(re) {
      L && L.call(this, re), l.call(this, re);
    }
  }
  function l(L, H) {
    const re = this.stack.pop(), ie = this.tokenStack.pop();
    if (ie)
      ie[0].type !== L.type && (H ? H.call(this, L, ie[0]) : (ie[1] || ma).call(this, L, ie[0]));
    else throw new Error("Cannot close `" + L.type + "` (" + Nr({
      start: L.start,
      end: L.end
    }) + "): it’s not open");
    re.position.end = Cn(L.end);
  }
  function u() {
    return Xo(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(L) {
    if (this.data.expectingFirstListItemValue) {
      const H = this.stack[this.stack.length - 2];
      H.start = Number.parseInt(this.sliceSerialize(L), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.lang = L;
  }
  function m() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.meta = L;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function _() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.value = L.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.value = L.replace(/(\r?\n|\r)$/g, "");
  }
  function k(L) {
    const H = this.resume(), re = this.stack[this.stack.length - 1];
    re.label = H, re.identifier = Yt(this.sliceSerialize(L)).toLowerCase();
  }
  function g() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.title = L;
  }
  function S() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.url = L;
  }
  function v(L) {
    const H = this.stack[this.stack.length - 1];
    if (!H.depth) {
      const re = this.sliceSerialize(L).length;
      H.depth = re;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function $(L) {
    const H = this.stack[this.stack.length - 1];
    H.depth = this.sliceSerialize(L).codePointAt(0) === 61 ? 1 : 2;
  }
  function I() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function R(L) {
    const re = this.stack[this.stack.length - 1].children;
    let ie = re[re.length - 1];
    (!ie || ie.type !== "text") && (ie = it(), ie.position = {
      start: Cn(L.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, re.push(ie)), this.stack.push(ie);
  }
  function N(L) {
    const H = this.stack.pop();
    H.value += this.sliceSerialize(L), H.position.end = Cn(L.end);
  }
  function O(L) {
    const H = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const re = H.children[H.children.length - 1];
      re.position.end = Cn(L.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(H.type) && (R.call(this, L), N.call(this, L));
  }
  function D() {
    this.data.atHardBreak = !0;
  }
  function q() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.value = L;
  }
  function F() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.value = L;
  }
  function A() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.value = L;
  }
  function T() {
    const L = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const H = this.data.referenceType || "shortcut";
      L.type += "Reference", L.referenceType = H, delete L.url, delete L.title;
    } else
      delete L.identifier, delete L.label;
    this.data.referenceType = void 0;
  }
  function j() {
    const L = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const H = this.data.referenceType || "shortcut";
      L.type += "Reference", L.referenceType = H, delete L.url, delete L.title;
    } else
      delete L.identifier, delete L.label;
    this.data.referenceType = void 0;
  }
  function B(L) {
    const H = this.sliceSerialize(L), re = this.stack[this.stack.length - 2];
    re.label = iv(H), re.identifier = Yt(H).toLowerCase();
  }
  function P() {
    const L = this.stack[this.stack.length - 1], H = this.resume(), re = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, re.type === "link") {
      const ie = L.children;
      re.children = ie;
    } else
      re.alt = H;
  }
  function w() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.url = L;
  }
  function X() {
    const L = this.resume(), H = this.stack[this.stack.length - 1];
    H.title = L;
  }
  function ce() {
    this.data.inReference = void 0;
  }
  function E() {
    this.data.referenceType = "collapsed";
  }
  function be(L) {
    const H = this.resume(), re = this.stack[this.stack.length - 1];
    re.label = H, re.identifier = Yt(this.sliceSerialize(L)).toLowerCase(), this.data.referenceType = "full";
  }
  function fe(L) {
    this.data.characterReferenceType = L.type;
  }
  function De(L) {
    const H = this.sliceSerialize(L), re = this.data.characterReferenceType;
    let ie;
    re ? (ie = $l(H, re === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : ie = Ko(H);
    const Ne = this.stack[this.stack.length - 1];
    Ne.value += ie;
  }
  function Je(L) {
    const H = this.stack.pop();
    H.position.end = Cn(L.end);
  }
  function Xe(L) {
    N.call(this, L);
    const H = this.stack[this.stack.length - 1];
    H.url = this.sliceSerialize(L);
  }
  function Re(L) {
    N.call(this, L);
    const H = this.stack[this.stack.length - 1];
    H.url = "mailto:" + this.sliceSerialize(L);
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
  function Ie(L) {
    return {
      type: "list",
      ordered: L.type === "listOrdered",
      start: null,
      spread: L._spread,
      children: []
    };
  }
  function _e(L) {
    return {
      type: "listItem",
      spread: L._spread,
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
function Bl(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Bl(e, r) : lv(e, r);
  }
}
function lv(e, n) {
  let t;
  for (t in n)
    if (zl.call(n, t))
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
function cv(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return sv(r, {
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
function uv(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function dv(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function fv(e, n) {
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
function pv(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function hv(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function mv(e, n) {
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
function gv(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function _v(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function Fl(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function bv(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Fl(e, n);
  const i = { src: ur(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, o), e.applyData(n, o);
}
function yv(e, n) {
  const t = { src: ur(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function kv(e, n) {
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
function wv(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Fl(e, n);
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
function xv(e, n) {
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
function vv(e, n, t) {
  const r = e.all(n), i = t ? Ev(t) : jl(n), o = {}, s = [];
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
function Ev(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = jl(t[r]);
  }
  return n;
}
function jl(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function Sv(e, n) {
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
function Cv(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Nv(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function $v(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Iv(e, n) {
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
    }, a = Uo(n.children[1]), c = kl(n.children[n.children.length - 1]);
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
function Av(e, n, t) {
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
function Mv(e, n) {
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
function Lv(e) {
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
function Rv(e, n) {
  const t = { type: "text", value: Lv(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Tv(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Dv = {
  blockquote: uv,
  break: dv,
  code: fv,
  delete: pv,
  emphasis: hv,
  footnoteReference: mv,
  heading: gv,
  html: _v,
  imageReference: bv,
  image: yv,
  inlineCode: kv,
  linkReference: wv,
  link: xv,
  listItem: vv,
  list: Sv,
  paragraph: Cv,
  // @ts-expect-error: root is different, but hard to type.
  root: Nv,
  strong: $v,
  table: Iv,
  tableCell: Mv,
  tableRow: Av,
  text: Rv,
  thematicBreak: Tv,
  toml: ei,
  yaml: ei,
  definition: ei,
  footnoteDefinition: ei
};
function ei() {
}
const Hl = -1, ki = 0, Ir = 1, di = 2, Zo = 3, Qo = 4, Jo = 5, es = 6, ql = 7, Ul = 8, ya = typeof self == "object" ? self : globalThis, Pv = (e, n) => {
  const t = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, s] = n[i];
    switch (o) {
      case ki:
      case Hl:
        return t(s, i);
      case Ir: {
        const a = t([], i);
        for (const c of s)
          a.push(r(c));
        return a;
      }
      case di: {
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
      case ql: {
        const { name: a, message: c } = s;
        return t(new ya[a](c), i);
      }
      case Ul:
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
}, ka = (e) => Pv(/* @__PURE__ */ new Map(), e)(0), tr = "", { toString: Ov } = {}, { keys: zv } = Object, vr = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [ki, n];
  const t = Ov.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Ir, tr];
    case "Object":
      return [di, tr];
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
  return t.includes("Array") ? [Ir, t] : t.includes("Error") ? [ql, t] : [di, t];
}, ti = ([e, n]) => e === ki && (n === "function" || n === "symbol"), Bv = (e, n, t, r) => {
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
            a = Ul, u = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            u = null;
            break;
          case "undefined":
            return i([Hl], s);
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
      case di: {
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
        for (const h of zv(s))
          (e || !ti(vr(s[h]))) && u.push([o(h), o(s[h])]);
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
          (e || !(ti(vr(h)) || ti(vr(f)))) && u.push([o(h), o(f)]);
        return d;
      }
      case es: {
        const u = [], d = i([a, u], s);
        for (const h of s)
          (e || !ti(vr(h))) && u.push(o(h));
        return d;
      }
    }
    const { message: l } = s;
    return i([a, { name: c, message: l }], s);
  };
  return o;
}, wa = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Bv(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, fi = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? ka(wa(e, n)) : structuredClone(e)
) : (e, n) => ka(wa(e, n));
function Fv(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function jv(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Hv(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || Fv, r = e.options.footnoteBackLabel || jv, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
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
            ...fi(s),
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
      return Gv;
    if (typeof e == "function")
      return xi(e);
    if (typeof e == "object")
      return Array.isArray(e) ? qv(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        Uv(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Wv(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function qv(e) {
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
function Uv(e) {
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
function Wv(e) {
  return xi(n);
  function n(t) {
    return t && t.type === e;
  }
}
function xi(e) {
  return n;
  function n(t, r, i) {
    return !!(Vv(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Gv() {
  return !0;
}
function Vv(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Wl = [], Xv = !0, wo = !1, Kv = "skip";
function Gl(e, n, t, r) {
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
      let f = Wl, m, y, _;
      if ((!n || o(c, l, u[u.length - 1] || void 0)) && (f = Yv(t(c, u)), f[0] === wo))
        return f;
      if ("children" in c && c.children) {
        const b = (
          /** @type {UnistParent} */
          c
        );
        if (b.children && f[0] !== Kv)
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
function Yv(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Xv, e] : e == null ? Wl : [e];
}
function ts(e, n, t, r) {
  let i, o, s;
  typeof n == "function" && typeof t != "function" ? (o = void 0, s = n, i = t) : (o = n, s = t, i = r), Gl(e, o, a, i);
  function a(c, l) {
    const u = l[l.length - 1], d = u ? u.children.indexOf(c) : void 0;
    return s(c, d, u);
  }
}
const xo = {}.hasOwnProperty, Zv = {};
function Qv(e, n) {
  const t = n || Zv, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = { ...Dv, ...t.handlers }, a = {
    all: l,
    applyData: eE,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: s,
    one: c,
    options: t,
    patch: Jv,
    wrap: nE
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
        const { children: y, ..._ } = u, b = fi(_);
        return b.children = a.all(u), b;
      }
      return fi(u);
    }
    return (a.options.unknownHandler || tE)(a, u, d);
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
function Jv(e, n) {
  e.position && (n.position = j0(e));
}
function eE(e, n) {
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
    t.type === "element" && o && Object.assign(t.properties, fi(o)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function tE(e, n) {
  const t = n.data || {}, r = "value" in n && !(xo.call(t, "hProperties") || xo.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function nE(e, n) {
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
  const t = Qv(e, n), r = t.one(e, void 0), i = Hv(t), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function rE(e, n) {
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
function iE() {
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
var oE = iE();
const Ki = /* @__PURE__ */ zo(oE);
function vo(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function sE() {
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
      i = l, u ? aE(u, a)(...l) : s(null, ...l);
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
function aE(e, n) {
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
const sn = { basename: lE, dirname: cE, extname: uE, join: dE, sep: "/" };
function lE(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  Dr(e);
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
function cE(e) {
  if (Dr(e), e.length === 0)
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
function uE(e) {
  Dr(e);
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
function dE(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    Dr(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : fE(t);
}
function fE(e) {
  Dr(e);
  const n = e.codePointAt(0) === 47;
  let t = pE(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function pE(e, n) {
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
function Dr(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const hE = { cwd: mE };
function mE() {
  return "/";
}
function Eo(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function gE(e) {
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
  return _E(e);
}
function _E(e) {
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
class Vl {
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
    n ? Eo(n) ? t = { path: n } : typeof n == "string" || bE(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : hE.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    return typeof this.path == "string" ? sn.basename(this.path) : void 0;
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
    Qi(n, "basename"), Zi(n, "basename"), this.path = sn.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? sn.dirname(this.path) : void 0;
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
    Ca(this.basename, "dirname"), this.path = sn.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? sn.extname(this.path) : void 0;
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
    this.path = sn.join(this.dirname, this.stem + (n || ""));
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
    Eo(n) && (n = gE(n)), Qi(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? sn.basename(this.path, this.extname) : void 0;
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
    Qi(n, "stem"), Zi(n, "stem"), this.path = sn.join(this.dirname || "", n + (this.extname || ""));
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
  if (e && e.includes(sn.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + sn.sep + "`"
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
function bE(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const yE = (
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
), kE = {}.hasOwnProperty;
class ns extends yE {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = sE();
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
    return typeof n == "string" ? arguments.length === 2 ? (to("data", this.frozen), this.namespace[n] = t, this) : kE.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (to("data", this.frozen), this.namespace = n, this) : this.namespace;
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
    const t = ni(n), r = this.parser || this.Parser;
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
      const a = ni(n), c = (
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
        vE(m) ? h.value = m : h.result = m, l(
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
      const c = ni(t);
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
    const r = ni(t), i = this.compiler || this.Compiler;
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
const wE = new ns().freeze();
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
function ni(e) {
  return xE(e) ? e : new Vl(e);
}
function xE(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function vE(e) {
  return typeof e == "string" || EE(e);
}
function EE(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const SE = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ia = [], Aa = { allowDangerousHtml: !0 }, CE = /^(https?|ircs?|mailto|xmpp)$/i, NE = [
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
function $E(e) {
  const n = IE(e), t = AE(e);
  return ME(n.runSync(n.parse(t), t), e);
}
function IE(e) {
  const n = e.rehypePlugins || Ia, t = e.remarkPlugins || Ia, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Aa } : Aa;
  return wE().use(cv).use(t).use(rE, r).use(n);
}
function AE(e) {
  const n = e.children || "", t = new Vl();
  return typeof n == "string" && (t.value = n), t;
}
function ME(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, o = n.disallowedElements, s = n.skipHtml, a = n.unwrapDisallowed, c = n.urlTransform || LE;
  for (const u of NE)
    Object.hasOwn(n, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + SE + u.id, void 0);
  return ts(e, l), G0(e, {
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
function LE(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    CE.test(e.slice(0, n)) ? e : ""
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
function RE(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function TE(e, n, t) {
  const i = wi((t || {}).ignore || []), o = DE(n);
  let s = -1;
  for (; ++s < o.length; )
    Gl(e, "text", a);
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
      let x = f(...g, v);
      if (typeof x == "string" && (x = x.length > 0 ? { type: "text", value: x } : void 0), x === !1 ? h.lastIndex = S + 1 : (m !== S && k.push({
        type: "text",
        value: l.value.slice(m, S)
      }), Array.isArray(x) ? k.push(...x) : x && k.push(x), m = S + g[0].length, b = !0), !h.global)
        break;
      g = h.exec(l.value);
    }
    return b ? (m < l.value.length && k.push({ type: "text", value: l.value.slice(m) }), d.children.splice(_, 1, ...k)) : k = [l], _ + k.length;
  }
}
function DE(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const i = t[r];
    n.push([PE(i[0]), OE(i[1])]);
  }
  return n;
}
function PE(e) {
  return typeof e == "string" ? new RegExp(RE(e), "g") : e;
}
function OE(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const no = "phrasing", ro = ["autolink", "link", "image", "label"];
function zE() {
  return {
    transforms: [WE],
    enter: {
      literalAutolink: FE,
      literalAutolinkEmail: io,
      literalAutolinkHttp: io,
      literalAutolinkWww: io
    },
    exit: {
      literalAutolink: UE,
      literalAutolinkEmail: qE,
      literalAutolinkHttp: jE,
      literalAutolinkWww: HE
    }
  };
}
function BE() {
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
function FE(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function io(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function jE(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function HE(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function qE(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function UE(e) {
  this.exit(e);
}
function WE(e) {
  TE(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, GE],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), VE]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function GE(e, n, t, r, i) {
  let o = "";
  if (!Xl(i) || (/^w/i.test(n) && (t = n + t, n = "", o = "http://"), !XE(t)))
    return !1;
  const s = KE(t + r);
  if (!s[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + n + s[0],
    children: [{ type: "text", value: n + s[0] }]
  };
  return s[1] ? [a, { type: "text", value: s[1] }] : a;
}
function VE(e, n, t, r) {
  return (
    // Not an expected previous character.
    !Xl(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function XE(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function KE(e) {
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
function Xl(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || Hn(t) || bi(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
Kl.peek = iS;
function YE() {
  this.buffer();
}
function ZE(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function QE() {
  this.buffer();
}
function JE(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function eS(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Yt(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function tS(e) {
  this.exit(e);
}
function nS(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Yt(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function rS(e) {
  this.exit(e);
}
function iS() {
  return "[";
}
function Kl(e, n, t, r) {
  const i = t.createTracker(r);
  let o = i.move("[^");
  const s = t.enter("footnoteReference"), a = t.enter("reference");
  return o += i.move(
    t.safe(t.associationId(e), { after: "]", before: o })
  ), a(), s(), o += i.move("]"), o;
}
function oS() {
  return {
    enter: {
      gfmFootnoteCallString: YE,
      gfmFootnoteCall: ZE,
      gfmFootnoteDefinitionLabelString: QE,
      gfmFootnoteDefinition: JE
    },
    exit: {
      gfmFootnoteCallString: eS,
      gfmFootnoteCall: tS,
      gfmFootnoteDefinitionLabelString: nS,
      gfmFootnoteDefinition: rS
    }
  };
}
function sS(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: Kl },
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
        n ? Yl : aS
      )
    )), l(), c;
  }
}
function aS(e, n, t) {
  return n === 0 ? e : Yl(e, n, t);
}
function Yl(e, n, t) {
  return (t ? "" : "    ") + e;
}
const lS = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Zl.peek = pS;
function cS() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: dS },
    exit: { strikethrough: fS }
  };
}
function uS() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: lS
      }
    ],
    handlers: { delete: Zl }
  };
}
function dS(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function fS(e) {
  this.exit(e);
}
function Zl(e, n, t, r) {
  const i = t.createTracker(r), o = t.enter("strikethrough");
  let s = i.move("~~");
  return s += t.containerPhrasing(e, {
    ...i.current(),
    before: s,
    after: "~"
  }), s += i.move("~~"), o(), s;
}
function pS() {
  return "~";
}
function hS(e) {
  return e.length;
}
function mS(e, n) {
  const t = n || {}, r = (t.align || []).concat(), i = t.stringLength || hS, o = [], s = [], a = [], c = [];
  let l = 0, u = -1;
  for (; ++u < e.length; ) {
    const y = [], _ = [];
    let b = -1;
    for (e[u].length > l && (l = e[u].length); ++b < e[u].length; ) {
      const k = gS(e[u][b]);
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
        const v = c[d] - (_[d] || 0), x = o[d];
        x === 114 ? g = " ".repeat(v) : x === 99 ? v % 2 ? (g = " ".repeat(v / 2 + 0.5), S = " ".repeat(v / 2 - 0.5)) : (g = " ".repeat(v / 2), S = g) : S = " ".repeat(v);
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
function gS(e) {
  return e == null ? "" : String(e);
}
function La(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function _S(e, n, t, r) {
  const i = t.enter("blockquote"), o = t.createTracker(r);
  o.move("> "), o.shift(2);
  const s = t.indentLines(
    t.containerFlow(e, o.current()),
    bS
  );
  return i(), s;
}
function bS(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function yS(e, n) {
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
` && yS(t.stack, t.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function kS(e, n) {
  const t = String(e);
  let r = t.indexOf(n), i = r, o = 0, s = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++o > s && (s = o) : o = 1, i = r + n.length, r = t.indexOf(n, i);
  return s;
}
function wS(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function xS(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function vS(e, n, t, r) {
  const i = xS(t), o = e.value || "", s = i === "`" ? "GraveAccent" : "Tilde";
  if (wS(e, t)) {
    const d = t.enter("codeIndented"), h = t.indentLines(o, ES);
    return d(), h;
  }
  const a = t.createTracker(r), c = i.repeat(Math.max(kS(o, i) + 1, 3)), l = t.enter("codeFenced");
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
function ES(e, n, t) {
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
function SS(e, n, t, r) {
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
function CS(e) {
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
function pi(e, n, t) {
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
Ql.peek = NS;
function Ql(e, n, t, r) {
  const i = CS(t), o = t.enter("emphasis"), s = t.createTracker(r), a = s.move(i);
  let c = s.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...s.current()
    })
  );
  const l = c.charCodeAt(0), u = pi(
    r.before.charCodeAt(r.before.length - 1),
    l,
    i
  );
  u.inside && (c = Lr(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), h = pi(r.after.charCodeAt(0), d, i);
  h.inside && (c = c.slice(0, -1) + Lr(d));
  const f = s.move(i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  }, a + c + f;
}
function NS(e, n, t) {
  return t.options.emphasis || "*";
}
function $S(e, n) {
  let t = !1;
  return ts(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, wo;
  }), !!((!e.depth || e.depth < 3) && Xo(e) && (n.options.setext || t));
}
function IS(e, n, t, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), o = t.createTracker(r);
  if ($S(e, t)) {
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
Jl.peek = AS;
function Jl(e) {
  return e.value || "";
}
function AS() {
  return "<";
}
ec.peek = MS;
function ec(e, n, t, r) {
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
function MS() {
  return "!";
}
tc.peek = LS;
function tc(e, n, t, r) {
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
function LS() {
  return "!";
}
nc.peek = RS;
function nc(e, n, t) {
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
function RS() {
  return "`";
}
function rc(e, n) {
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
ic.peek = TS;
function ic(e, n, t, r) {
  const i = rs(t), o = i === '"' ? "Quote" : "Apostrophe", s = t.createTracker(r);
  let a, c;
  if (rc(e, t)) {
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
function TS(e, n, t) {
  return rc(e, t) ? "<" : "[";
}
oc.peek = DS;
function oc(e, n, t, r) {
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
function DS() {
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
function PS(e) {
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
function OS(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function sc(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function zS(e, n, t, r) {
  const i = t.enter("list"), o = t.bulletCurrent;
  let s = e.ordered ? OS(t) : is(t);
  const a = e.ordered ? s === "." ? ")" : "." : PS(t);
  let c = n && t.bulletLastUsed ? s === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const u = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (s === "*" || s === "-") && // Empty first list item:
      u && (!u.children || !u.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (c = !0), sc(t) === s && u
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
function BS(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function FS(e, n, t, r) {
  const i = BS(t);
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
function jS(e, n, t, r) {
  const i = t.enter("paragraph"), o = t.enter("phrasing"), s = t.containerPhrasing(e, r);
  return o(), i(), s;
}
const HS = (
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
function qS(e, n, t, r) {
  return (e.children.some(function(s) {
    return HS(s);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function US(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
ac.peek = WS;
function ac(e, n, t, r) {
  const i = US(t), o = t.enter("strong"), s = t.createTracker(r), a = s.move(i + i);
  let c = s.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...s.current()
    })
  );
  const l = c.charCodeAt(0), u = pi(
    r.before.charCodeAt(r.before.length - 1),
    l,
    i
  );
  u.inside && (c = Lr(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), h = pi(r.after.charCodeAt(0), d, i);
  h.inside && (c = c.slice(0, -1) + Lr(d));
  const f = s.move(i + i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  }, a + c + f;
}
function WS(e, n, t) {
  return t.options.strong || "*";
}
function GS(e, n, t, r) {
  return t.safe(e.value, r);
}
function VS(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function XS(e, n, t) {
  const r = (sc(t) + (t.options.ruleSpaces ? " " : "")).repeat(VS(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const lc = {
  blockquote: _S,
  break: Ta,
  code: vS,
  definition: SS,
  emphasis: Ql,
  hardBreak: Ta,
  heading: IS,
  html: Jl,
  image: ec,
  imageReference: tc,
  inlineCode: nc,
  link: ic,
  linkReference: oc,
  list: zS,
  listItem: FS,
  paragraph: jS,
  root: qS,
  strong: ac,
  text: GS,
  thematicBreak: XS
};
function KS() {
  return {
    enter: {
      table: YS,
      tableData: Da,
      tableHeader: Da,
      tableRow: QS
    },
    exit: {
      codeText: JS,
      table: ZS,
      tableData: oo,
      tableHeader: oo,
      tableRow: oo
    }
  };
}
function YS(e) {
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
function ZS(e) {
  this.exit(e), this.data.inTable = void 0;
}
function QS(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function oo(e) {
  this.exit(e);
}
function Da(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function JS(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, e2));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function e2(e, n) {
  return n === "|" ? n : e;
}
function t2(e) {
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
    return mS(f, {
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
    let _ = lc.inlineCode(f, m, y);
    return y.stack.includes("tableCell") && (_ = _.replace(/\|/g, "\\$&")), _;
  }
}
function n2() {
  return {
    exit: {
      taskListCheckValueChecked: Pa,
      taskListCheckValueUnchecked: Pa,
      paragraph: i2
    }
  };
}
function r2() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: o2 }
  };
}
function Pa(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function i2(e) {
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
function o2(e, n, t, r) {
  const i = e.children[0], o = typeof e.checked == "boolean" && i && i.type === "paragraph", s = "[" + (e.checked ? "x" : " ") + "] ", a = t.createTracker(r);
  o && a.move(s);
  let c = lc.listItem(e, n, t, {
    ...r,
    ...a.current()
  });
  return o && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
  function l(u) {
    return u + s;
  }
}
function s2() {
  return [
    zE(),
    oS(),
    cS(),
    KS(),
    n2()
  ];
}
function a2(e) {
  return {
    extensions: [
      BE(),
      sS(e),
      uS(),
      t2(e),
      r2()
    ]
  };
}
const l2 = {
  tokenize: h2,
  partial: !0
}, cc = {
  tokenize: m2,
  partial: !0
}, uc = {
  tokenize: g2,
  partial: !0
}, dc = {
  tokenize: _2,
  partial: !0
}, c2 = {
  tokenize: b2,
  partial: !0
}, fc = {
  name: "wwwAutolink",
  tokenize: f2,
  previous: hc
}, pc = {
  name: "protocolAutolink",
  tokenize: p2,
  previous: mc
}, gn = {
  name: "emailAutolink",
  tokenize: d2,
  previous: gc
}, ln = {};
function u2() {
  return {
    text: ln
  };
}
let On = 48;
for (; On < 123; )
  ln[On] = gn, On++, On === 58 ? On = 65 : On === 91 && (On = 97);
ln[43] = gn;
ln[45] = gn;
ln[46] = gn;
ln[95] = gn;
ln[72] = [gn, pc];
ln[104] = [gn, pc];
ln[87] = [gn, fc];
ln[119] = [gn, fc];
function d2(e, n, t) {
  const r = this;
  let i, o;
  return s;
  function s(d) {
    return !So(d) || !gc.call(r, r.previous) || os(r.events) ? t(d) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(d));
  }
  function a(d) {
    return So(d) ? (e.consume(d), a) : d === 64 ? (e.consume(d), c) : t(d);
  }
  function c(d) {
    return d === 46 ? e.check(c2, u, l)(d) : d === 45 || d === 95 || pt(d) ? (o = !0, e.consume(d), c) : u(d);
  }
  function l(d) {
    return e.consume(d), i = !0, c;
  }
  function u(d) {
    return o && i && yt(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(d)) : t(d);
  }
}
function f2(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return s !== 87 && s !== 119 || !hc.call(r, r.previous) || os(r.events) ? t(s) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(l2, e.attempt(cc, e.attempt(uc, o), t), t)(s));
  }
  function o(s) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(s);
  }
}
function p2(e, n, t) {
  const r = this;
  let i = "", o = !1;
  return s;
  function s(d) {
    return (d === 72 || d === 104) && mc.call(r, r.previous) && !os(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(d), e.consume(d), a) : t(d);
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
    return d === null || ui(d) || Be(d) || Hn(d) || bi(d) ? t(d) : e.attempt(cc, e.attempt(uc, u), t)(d);
  }
  function u(d) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(d);
  }
}
function h2(e, n, t) {
  let r = 0;
  return i;
  function i(s) {
    return (s === 87 || s === 119) && r < 3 ? (r++, e.consume(s), i) : s === 46 && r === 3 ? (e.consume(s), o) : t(s);
  }
  function o(s) {
    return s === null ? t(s) : n(s);
  }
}
function m2(e, n, t) {
  let r, i, o;
  return s;
  function s(l) {
    return l === 46 || l === 95 ? e.check(dc, c, a)(l) : l === null || Be(l) || Hn(l) || l !== 45 && bi(l) ? c(l) : (o = !0, e.consume(l), s);
  }
  function a(l) {
    return l === 95 ? r = !0 : (i = r, r = void 0), e.consume(l), s;
  }
  function c(l) {
    return i || r || !o ? t(l) : n(l);
  }
}
function g2(e, n) {
  let t = 0, r = 0;
  return i;
  function i(s) {
    return s === 40 ? (t++, e.consume(s), i) : s === 41 && r < t ? o(s) : s === 33 || s === 34 || s === 38 || s === 39 || s === 41 || s === 42 || s === 44 || s === 46 || s === 58 || s === 59 || s === 60 || s === 63 || s === 93 || s === 95 || s === 126 ? e.check(dc, n, o)(s) : s === null || Be(s) || Hn(s) ? n(s) : (e.consume(s), i);
  }
  function o(s) {
    return s === 41 && r++, e.consume(s), i;
  }
}
function _2(e, n, t) {
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
function b2(e, n, t) {
  return r;
  function r(o) {
    return e.consume(o), i;
  }
  function i(o) {
    return pt(o) ? t(o) : n(o);
  }
}
function hc(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || Be(e);
}
function mc(e) {
  return !yt(e);
}
function gc(e) {
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
const y2 = {
  tokenize: N2,
  partial: !0
};
function k2() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: E2,
        continuation: {
          tokenize: S2
        },
        exit: C2
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: v2
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: w2,
        resolveTo: x2
      }
    }
  };
}
function w2(e, n, t) {
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
    const l = Yt(r.sliceSerialize({
      start: s.end,
      end: r.now()
    }));
    return l.codePointAt(0) !== 94 || !o.includes(l.slice(1)) ? t(c) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), n(c));
  }
}
function x2(e, n) {
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
function v2(e, n, t) {
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
      return i.includes(Yt(r.sliceSerialize(h))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(d), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(d);
    }
    return Be(d) || (s = !0), o++, e.consume(d), d === 92 ? u : l;
  }
  function u(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), o++, l) : l(d);
  }
}
function E2(e, n, t) {
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
      return o = Yt(r.sliceSerialize(y)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(m), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), h;
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
function S2(e, n, t) {
  return e.check(Tr, n, e.attempt(y2, n, t));
}
function C2(e) {
  e.exit("gfmFootnoteDefinition");
}
function N2(e, n, t) {
  const r = this;
  return Le(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "gfmFootnoteDefinitionIndent" && s[2].sliceSerialize(s[1], !0).length === 4 ? n(o) : t(o);
  }
}
function $2(e) {
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
class I2 {
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
    A2(this, n, t, r);
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
function A2(e, n, t, r) {
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
function M2(e, n) {
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
function L2() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: R2,
        resolveAll: T2
      }
    }
  };
}
function R2(e, n, t) {
  const r = this;
  let i = 0, o = 0, s;
  return a;
  function a(N) {
    let O = r.events.length - 1;
    for (; O > -1; ) {
      const F = r.events[O][1].type;
      if (F === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      F === "linePrefix") O--;
      else break;
    }
    const D = O > -1 ? r.events[O][1].type : null, q = D === "tableHead" || D === "tableRow" ? x : c;
    return q === x && r.parser.lazy[r.now().line] ? t(N) : q(N);
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
  function x(N) {
    return e.enter("tableRow"), $(N);
  }
  function $(N) {
    return N === 124 ? (e.enter("tableCellDivider"), e.consume(N), e.exit("tableCellDivider"), $) : N === null || de(N) ? (e.exit("tableRow"), n(N)) : $e(N) ? Le(e, $, "whitespace")(N) : (e.enter("data"), I(N));
  }
  function I(N) {
    return N === null || N === 124 || Be(N) ? (e.exit("data"), $(N)) : (e.consume(N), N === 92 ? R : I);
  }
  function R(N) {
    return N === 92 || N === 124 ? (e.consume(N), I) : I(N);
  }
}
function T2(e, n) {
  let t = -1, r = !0, i = 0, o = [0, 0, 0, 0], s = [0, 0, 0, 0], a = !1, c = 0, l, u, d;
  const h = new I2();
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
    }, h.add(t, 0, [["enter", u, n]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, s[2] === 0 && (o[1] !== 0 && (s[0] = s[1], d = ri(h, n, o, i, void 0, d), o = [0, 0, 0, 0]), s[2] = t)) : m.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (s[0] = s[1], d = ri(h, n, o, i, void 0, d)), o = s, s = [o[1], t, 0, 0])) : m.type === "tableHead" ? (a = !0, c = t) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = t, o[1] !== 0 ? (s[0] = s[1], d = ri(h, n, o, i, t, d)) : s[1] !== 0 && (d = ri(h, n, s, i, t, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (s[3] = t);
  }
  for (c !== 0 && Oa(h, n, c, l, u), h.consume(n.events), t = -1; ++t < n.events.length; ) {
    const f = n.events[t];
    f[0] === "enter" && f[1].type === "table" && (f[1]._align = M2(n.events, t));
  }
  return e;
}
function ri(e, n, t, r, i, o) {
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
const D2 = {
  name: "tasklistCheck",
  tokenize: O2
};
function P2() {
  return {
    text: {
      91: D2
    }
  };
}
function O2(e, n, t) {
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
      tokenize: z2
    }, n, t)(c) : t(c);
  }
}
function z2(e, n, t) {
  return Le(e, r, "whitespace");
  function r(i) {
    return i === null ? t(i) : n(i);
  }
}
function B2(e) {
  return Nl([
    u2(),
    k2(),
    $2(e),
    L2(),
    P2()
  ]);
}
const F2 = {};
function j2(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || F2, r = n.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), s = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(B2(t)), o.push(s2()), s.push(a2(t));
}
const H2 = "_actions_18y0c_1", q2 = "_root_18y0c_8", U2 = "_centered_18y0c_11", so = {
  actions: H2,
  root: q2,
  centered: U2
};
function Co(e) {
  return String(e).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
function W2(e) {
  return Co(
    Array.isArray(e) ? e.map((n) => typeof n == "string" ? n : "").join("") : String(e ?? "")
  );
}
const G2 = ["h1", "h2", "h3", "h4", "h5", "h6"].reduce((e, n) => (e[n] = ({ children: t, ...r }) => {
  const i = W2(t);
  return Ve.createElement(n, { id: i, ...r }, t);
}, e), {});
function TI(e) {
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
function V2(e) {
  const n = e.match(/^#\s+(.+)/m);
  return n ? n[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".md" : "document.md";
}
function DI({ content: e, centered: n = !0, maxWidth: t, className: r }) {
  const [i, o] = W(!1), s = () => {
    navigator.clipboard.writeText(e).catch((c) => {
      console.error("[DocPage] Clipboard write failed:", c);
    }), o(!0), setTimeout(() => o(!1), 1500);
  }, a = () => {
    const c = new Blob([e], { type: "text/markdown" }), l = URL.createObjectURL(c), u = document.createElement("a");
    u.href = l, u.download = V2(e), u.click(), URL.revokeObjectURL(l);
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
              icon: i ? $o : vu,
              size: "sm",
              onClick: s,
              "aria-label": "Copy as markdown",
              tooltip: "Copy as markdown"
            }
          ),
          /* @__PURE__ */ p(
            ze,
            {
              icon: Ha,
              size: "sm",
              onClick: a,
              "aria-label": "Download .md",
              tooltip: "Download .md"
            }
          )
        ] }),
        /* @__PURE__ */ p($E, { remarkPlugins: [j2], components: G2, children: e })
      ]
    }
  );
}
const X2 = "_footer_fnr00_1", K2 = "_border_fnr00_11", Y2 = "_alignLeft_fnr00_15", Z2 = "_alignCenter_fnr00_19", Q2 = "_alignRight_fnr00_23", Ar = {
  footer: X2,
  border: K2,
  alignLeft: Y2,
  alignCenter: Z2,
  alignRight: Q2
}, J2 = {
  left: Ar.alignLeft,
  center: Ar.alignCenter,
  right: Ar.alignRight
}, PI = ({
  children: e,
  align: n = "right",
  border: t = !0,
  className: r = ""
}) => {
  const i = [
    Ar.footer,
    J2[n],
    t && Ar.border,
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("footer", { className: i, children: e });
}, eC = "_root_qdh7w_1", tC = "_content_qdh7w_14", nC = "_title_qdh7w_21", rC = "_description_qdh7w_28", iC = "_actions_qdh7w_35", Er = {
  root: eC,
  content: tC,
  title: nC,
  description: rC,
  actions: iC
}, OI = ({
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
] }), oC = "_wrapper_1itot_1", sC = "_row_1itot_5", aC = "_content_1itot_12", lC = "_title_1itot_16", cC = "_description_1itot_21", uC = "_lg_1itot_26", dC = "_md_1itot_37", fC = "_sm_1itot_48", pC = "_actions_1itot_59", zn = {
  wrapper: oC,
  row: sC,
  content: aC,
  title: lC,
  description: cC,
  lg: uC,
  md: dC,
  sm: fC,
  actions: pC
}, hC = {
  lg: "h2",
  md: "h3",
  sm: "h4"
}, zI = ({
  title: e,
  description: n,
  size: t = "md",
  actions: r,
  className: i = ""
}) => {
  const o = an(t, "md"), s = hC[o];
  return /* @__PURE__ */ p("div", { className: `${zn.wrapper} ${i}`, children: /* @__PURE__ */ M("div", { className: zn.row, children: [
    /* @__PURE__ */ M("div", { className: `${zn.content} ${zn[o]}`, children: [
      /* @__PURE__ */ p(s, { className: zn.title, children: e }),
      n && /* @__PURE__ */ p("p", { className: zn.description, children: n })
    ] }),
    r && /* @__PURE__ */ p("div", { className: zn.actions, children: r })
  ] }) });
}, mC = "(max-width: 767px)";
function gC(e) {
  const [n, t] = W(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches);
  return le(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const r = window.matchMedia(e), i = (o) => {
      t(o.matches);
    };
    return t(r.matches), r.addEventListener("change", i), () => r.removeEventListener("change", i);
  }, [e]), n;
}
const _C = "_appLayout_1kk39_1", bC = "_topNav_1kk39_8", yC = "_body_1kk39_15", kC = "_sideNav_1kk39_20", wC = "_content_1kk39_32", xC = "_panel_1kk39_37", nr = {
  appLayout: _C,
  topNav: bC,
  body: yC,
  sideNav: kC,
  content: wC,
  panel: xC
}, BI = ({
  topNav: e,
  sideNav: n,
  sideNavWidth: t,
  panel: r,
  children: i,
  mobileNavOpen: o = !1,
  onMobileNavOpenChange: s,
  className: a = ""
}) => {
  const c = gC(mC), l = t !== void 0 ? { width: typeof t == "number" ? `${t}px` : t } : void 0, u = typeof t == "number" ? t : typeof t == "string" && /^\d+$/.test(t) ? Number(t) : 320;
  return /* @__PURE__ */ M("div", { className: `${nr.appLayout} ${a}`, children: [
    /* @__PURE__ */ p("div", { className: nr.topNav, children: e }),
    /* @__PURE__ */ M("div", { className: nr.body, children: [
      n && /* @__PURE__ */ p("div", { className: nr.sideNav, style: l, children: c ? null : n }),
      /* @__PURE__ */ p("div", { className: nr.content, children: i }),
      r && /* @__PURE__ */ p("div", { className: nr.panel, children: r })
    ] }),
    n && /* @__PURE__ */ p(
      i0,
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
}, vC = "_root_9igar_1", EC = "_column_9igar_6", SC = "_row_9igar_7", CC = "_alignStart_9igar_9", NC = "_alignCenter_9igar_10", $C = "_alignEnd_9igar_11", IC = "_alignStretch_9igar_12", AC = "_wrap_9igar_14", Nn = {
  root: vC,
  column: EC,
  row: SC,
  alignStart: CC,
  alignCenter: NC,
  alignEnd: $C,
  alignStretch: IC,
  wrap: AC
};
function FI({
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
const MC = "_root_aclsr_1", LC = "_cols2_aclsr_6", RC = "_cols3_aclsr_7", TC = "_cols4_aclsr_8", ii = {
  root: MC,
  cols2: LC,
  cols3: RC,
  cols4: TC
};
function jI({
  count: e = 2,
  gap: n = "m",
  className: t,
  style: r,
  children: i,
  ...o
}) {
  const s = {
    2: ii.cols2,
    3: ii.cols3,
    4: ii.cols4
  }[e];
  return /* @__PURE__ */ p(
    "div",
    {
      className: [ii.root, s, t].filter(Boolean).join(" "),
      style: { "--columns-gap": `var(--admin-space-${n})`, ...r },
      ...o,
      children: i
    }
  );
}
const DC = "_root_la9pg_1", PC = {
  root: DC
};
function HI({ gap: e = "m", className: n, style: t, children: r, ...i }) {
  return /* @__PURE__ */ p(
    "div",
    {
      className: [PC.root, n].filter(Boolean).join(" "),
      style: { "--card-grid-gap": `var(--admin-space-${e})`, ...t },
      ...i,
      children: r
    }
  );
}
const OC = "_root_16rwa_1", zC = "_section_16rwa_6", BC = "_bare_16rwa_14", FC = "_header_16rwa_21", jC = "_description_16rwa_27", HC = "_items_16rwa_33", qC = "_link_16rwa_40", UC = "_separator_16rwa_60", $n = {
  root: OC,
  section: zC,
  bare: BC,
  header: FC,
  description: jC,
  items: HC,
  link: qC,
  separator: UC
};
function qI({ sections: e, bare: n, className: t, ...r }) {
  return /* @__PURE__ */ p("div", { className: [$n.root, t].filter(Boolean).join(" "), ...r, children: e.map((i, o) => /* @__PURE__ */ M("div", { className: [$n.section, n ? $n.bare : void 0].filter(Boolean).join(" "), children: [
    i.header && /* @__PURE__ */ p("h2", { className: $n.header, children: i.header }),
    i.description && /* @__PURE__ */ p("p", { className: $n.description, children: i.description }),
    /* @__PURE__ */ p("div", { className: $n.items, children: i.items.map((s, a) => /* @__PURE__ */ M(Ve.Fragment, { children: [
      /* @__PURE__ */ p("button", { className: $n.link, onClick: s.onClick, children: s.label }),
      a < i.items.length - 1 && /* @__PURE__ */ p("span", { "aria-hidden": !0, className: $n.separator, children: "/" })
    ] }, s.id)) })
  ] }, o)) });
}
const WC = "_sideNav_j8ym4_5", GC = "_tabbedRow_j8ym4_30", VC = "_nav_j8ym4_36", XC = "_tabContent_j8ym4_42", KC = "_toggleButton_j8ym4_56", YC = "_collapsed_j8ym4_70", ZC = "_globalSearchWrapper_j8ym4_78", QC = "_searchWrapper_j8ym4_83", JC = "_noResults_j8ym4_88", eN = "_navWrapper_j8ym4_95", tN = "_list_j8ym4_111", nN = "_footer_j8ym4_117", rN = "_section_j8ym4_124", iN = "_sectionLabel_j8ym4_132", oN = "_sectionLabelCollapsible_j8ym4_140", sN = "_sectionChevron_j8ym4_169", aN = "_sectionChevronClosed_j8ym4_175", lN = "_collapsibleSection_j8ym4_189", cN = "_collapsibleSectionOpen_j8ym4_194", uN = "_topLevelSection_j8ym4_200", dN = "_topLevelSectionWithBorder_j8ym4_205", fN = "_topLevelHeader_j8ym4_209", pN = "_topLevelLabel_j8ym4_235", hN = "_topLevelChevron_j8ym4_240", mN = "_topLevelChevronClosed_j8ym4_247", gN = "_topLevelContent_j8ym4_251", Pe = {
  sideNav: WC,
  tabbedRow: GC,
  nav: VC,
  tabContent: XC,
  toggleButton: KC,
  collapsed: YC,
  globalSearchWrapper: ZC,
  searchWrapper: QC,
  noResults: JC,
  navWrapper: eN,
  list: tN,
  footer: nN,
  section: rN,
  sectionLabel: iN,
  sectionLabelCollapsible: oN,
  sectionChevron: sN,
  sectionChevronClosed: aN,
  collapsibleSection: lN,
  collapsibleSectionOpen: cN,
  topLevelSection: uN,
  topLevelSectionWithBorder: dN,
  topLevelHeader: fN,
  topLevelLabel: pN,
  topLevelChevron: hN,
  topLevelChevronClosed: mN,
  topLevelContent: gN
}, _N = ({
  collapsed: e,
  onToggle: n
}) => /* @__PURE__ */ p(
  ze,
  {
    icon: e ? Ru : Lu,
    onClick: n,
    size: "sm",
    "aria-label": e ? "Expand sidebar" : "Collapse sidebar",
    tooltip: e ? "Expand sidebar" : "Collapse sidebar",
    className: Pe.toggleButton
  }
), _c = Lc({
  onSelect: () => {
  },
  highContrast: !1,
  fullWidth: !1,
  activeId: void 0
});
function bN() {
  return Rc(_c);
}
const yN = "_button_1yxs4_1", kN = "_active_1yxs4_30", wN = "_index_1yxs4_34", xN = "_detail_1yxs4_35", vN = "_highContrast_1yxs4_40", EN = "_child_1yxs4_45", SN = "_hasDetail_1yxs4_49", CN = "_fullWidth_1yxs4_54", NN = "_label_1yxs4_68", $N = "_nestedList_1yxs4_86", IN = "_badge_1yxs4_96", Bt = {
  button: yN,
  "button--group": "_button--group_1yxs4_2",
  active: kN,
  index: wN,
  detail: xN,
  highContrast: vN,
  child: EN,
  hasDetail: SN,
  fullWidth: CN,
  label: NN,
  nestedList: $N,
  badge: IN
}, AN = Ve.memo(function e({
  item: n,
  className: t = "",
  child: r = !1
}) {
  const { onSelect: i, highContrast: o, fullWidth: s, activeId: a } = bN(), c = n.id === a, l = o ? Bt.highContrast : "", u = s ? Bt.fullWidth : "", d = Bt["button--group"], h = !!n.children && n.children.length > 0, f = !!n.detail, m = /* @__PURE__ */ M(kt, { children: [
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
  const n = e.collapsible && !!e.label, [t, r] = W(e.defaultOpen !== !1), i = e.label ? `section-${e.label.replace(/\s+/g, "-").toLowerCase()}` : void 0;
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
    (!n || t) && /* @__PURE__ */ p("ul", { className: Pe.list, id: i, children: e.items.map((o) => /* @__PURE__ */ p(AN, { item: o }, o.id)) })
  ] });
}, MN = ({
  section: e,
  isLast: n = !1
}) => {
  const [t, r] = W(e.defaultOpen ?? !0);
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
}, LN = ({
  sections: e,
  topLevelSections: n,
  searchActive: t
}) => n.length > 0 ? /* @__PURE__ */ M(kt, { children: [
  n.map((i, o) => /* @__PURE__ */ p(
    MN,
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
] }), bc = Ve.forwardRef(
  ({ results: e }, n) => /* @__PURE__ */ p("div", { ref: n, className: Pe.navWrapper, children: /* @__PURE__ */ p("nav", { className: Pe.nav, "aria-label": "Primary navigation", children: e.length > 0 ? e.flatMap(
    ({ tab: t, sections: r }) => r.map((i, o) => /* @__PURE__ */ M("div", { className: Pe.section, children: [
      /* @__PURE__ */ p("p", { className: Pe.sectionLabel, children: i.label ? `${t.label} / ${i.label}` : t.label }),
      /* @__PURE__ */ p(ss, { section: { ...i, label: void 0 } })
    ] }, `${t.id}-${o}`))
  ) : /* @__PURE__ */ p("p", { className: Pe.noResults, children: "No results" }) }) })
);
bc.displayName = "SideNavGlobalSearchView";
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
      cl,
      {
        value: e,
        onChange: n,
        placeholder: t,
        icon: r
      }
    )
  }
), RN = "_tabStrip_fyaf9_1", TN = "_separator_fyaf9_17", DN = "_tab_fyaf9_1", PN = "_active_fyaf9_52", ON = "_highContrast_fyaf9_62", zN = "_tabIcon_fyaf9_69", rr = {
  tabStrip: RN,
  separator: TN,
  tab: DN,
  active: PN,
  highContrast: ON,
  tabIcon: zN
}, BN = ({
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
}) }), FN = ({
  tabs: e,
  activeTabId: n,
  onTabSelect: t,
  highContrast: r,
  hideTabStrip: i,
  children: o
}) => /* @__PURE__ */ M("div", { className: Pe.tabbedRow, children: [
  !i && /* @__PURE__ */ p(
    BN,
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
function jN({
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
const HN = 500;
function hi(e) {
  return !(e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true");
}
function qN(e) {
  return Array.from(
    e.querySelectorAll("[data-sidenav-item]")
  ).filter(hi);
}
function Ba(e) {
  const n = e.getAttribute("aria-label");
  return n && n.trim() ? n.trim() : (e.textContent ?? "").trim();
}
function Sr(e, n) {
  const t = Array.from(
    e.querySelectorAll("[data-sidenav-item]")
  ), r = t.filter(hi);
  if (r.length === 0) return;
  const i = n && r.includes(n) ? n : r[0];
  for (const o of t) {
    if (!hi(o)) {
      o.tabIndex = -1;
      continue;
    }
    o.tabIndex = o === i ? 0 : -1;
  }
}
function UN({ onEscape: e } = {}) {
  const n = Y(""), t = Y(null), r = Y(null), i = Y(null), o = K(() => {
    n.current = "", t.current && (clearTimeout(t.current), t.current = null);
  }, []);
  le(() => () => {
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
      const f = qN(u);
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
        const k = d.toLowerCase(), g = n.current, S = g.length > 0 && g.split("").every((R) => R === k);
        n.current = S ? k : g + k;
        const v = n.current;
        t.current && clearTimeout(t.current), t.current = setTimeout(() => {
          n.current = "", t.current = null;
        }, HN);
        const x = f.length, $ = v.length === 1, I = _ < 0 ? -1 : _;
        if (!$ && _ >= 0 && Ba(f[_]).toLowerCase().startsWith(v)) {
          l.preventDefault(), Sr(u, f[_]);
          return;
        }
        for (let R = 1; R <= x; R++) {
          const N = ((I + R) % x + x) % x;
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
    !d || !d.hasAttribute("data-sidenav-item") || hi(d) && Sr(u, d);
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
function WN(e, n, t, r) {
  le(() => {
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
const UI = ({
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
  const [v, x] = W(""), [$, I] = W(""), [R, N] = W(_), O = Y(null), D = !!h && h.length > 0, q = D ? h.find((Re) => Re.id === f) ?? h[0] : null;
  le(() => {
    D && x("");
  }, [f]);
  const {
    effectiveSections: F,
    effectiveTopLevelSections: A,
    effectiveSearchable: T,
    effectiveSearchPlaceholder: j,
    effectiveSearchIconType: B
  } = jN({
    activeTab: q,
    sections: e,
    topLevelSections: n,
    searchable: i,
    searchPlaceholder: o,
    searchIconType: s,
    globalSearchable: k
  });
  WN(O, t, c, [F]);
  const P = jt(
    () => ao(F, v),
    [F, v]
  ), w = jt(() => A ? v ? A.map((Re) => ({ ...Re, sections: ao(Re.sections, v) })).filter((Re) => Re.sections.length > 0) : A : [], [A, v]), X = jt(() => !D || !$ || !h ? [] : h.map((Re) => ({ tab: Re, sections: ao(Re.sections, $) })).filter((Re) => Re.sections.length > 0), [D, $, h]), ce = jt(
    () => ({ onSelect: r, highContrast: l, fullWidth: u, activeId: t }),
    [r, l, u, t]
  ), E = (Re) => {
    I(""), m == null || m(Re);
  }, be = () => {
    const Re = !R;
    N(Re), b == null || b(Re);
  }, { handleKeyDown: fe, containerRef: De } = UN({
    onEscape: () => {
      $ ? I("") : v && x("");
    }
  }), Je = /* @__PURE__ */ M(kt, { children: [
    T && /* @__PURE__ */ p(
      za,
      {
        value: v,
        onChange: x,
        placeholder: j,
        icon: B
      }
    ),
    /* @__PURE__ */ p("div", { ref: O, className: Pe.navWrapper, children: /* @__PURE__ */ p("nav", { className: Pe.nav, "aria-label": "Primary navigation", children: /* @__PURE__ */ p(
      LN,
      {
        sections: P,
        topLevelSections: w,
        searchActive: !!T && !!v
      }
    ) }) })
  ] }), Xe = k && !!$;
  return /* @__PURE__ */ p(_c.Provider, { value: ce, children: /* @__PURE__ */ M(
    "div",
    {
      ref: De,
      className: `${Pe.sideNav} ${R ? Pe.collapsed : ""} ${d}`,
      onKeyDown: fe,
      children: [
        y && /* @__PURE__ */ p(_N, { collapsed: R, onToggle: be }),
        !R && /* @__PURE__ */ M(kt, { children: [
          D ? /* @__PURE__ */ M(kt, { children: [
            k && /* @__PURE__ */ p(
              za,
              {
                value: $,
                onChange: I,
                placeholder: g,
                icon: S,
                variant: "global"
              }
            ),
            /* @__PURE__ */ p(
              FN,
              {
                tabs: h,
                activeTabId: q == null ? void 0 : q.id,
                onTabSelect: E,
                highContrast: l,
                hideTabStrip: !!$,
                children: Xe ? /* @__PURE__ */ p(bc, { ref: O, results: X }) : Je
              }
            )
          ] }) : Je,
          a && /* @__PURE__ */ p("div", { className: Pe.footer, children: a })
        ] })
      ]
    }
  ) });
}, GN = "_wrapper_s8efr_1", VN = "_chevron_s8efr_7", XN = "_chevronOpen_s8efr_13", KN = "_tab_s8efr_17", YN = "_sm_s8efr_30", ZN = "_lg_s8efr_35", QN = "_active_s8efr_50", on = {
  wrapper: GN,
  chevron: VN,
  chevronOpen: XN,
  tab: KN,
  sm: YN,
  lg: ZN,
  active: QN
}, JN = "_panel_57hns_1", e$ = "_groupHeader_57hns_13", t$ = "_divider_57hns_20", n$ = "_item_57hns_26", r$ = "_disabled_57hns_45", i$ = "_icon_57hns_50", o$ = "_label_57hns_57", Bn = {
  panel: JN,
  groupHeader: e$,
  divider: t$,
  item: n$,
  disabled: r$,
  icon: i$,
  label: o$
}, s$ = ({
  groups: e,
  anchorRef: n,
  autoFocus: t = !1,
  onClose: r,
  onMouseEnter: i,
  onMouseLeave: o
}) => {
  const s = Y([]), a = Y(null), [c, l] = W({ top: -9999, left: -9999 }), u = K(() => {
    const _ = n.current, b = a.current;
    if (!_ || !b) return;
    const k = _.getBoundingClientRect(), g = b.offsetWidth, S = window.innerWidth, v = 4;
    let x = k.left;
    x + g > S - v && (x = Math.max(v, S - g - v)), l({
      top: `${k.bottom + 2}px`,
      left: `${x}px`
    });
  }, [n]), d = [];
  let h = 0;
  e.forEach((_, b) => {
    b > 0 && d.push({ kind: "divider", key: `divider-${b}` }), _.header && d.push({ kind: "header", key: `header-${b}`, text: _.header }), _.items.forEach((k) => {
      d.push({ kind: "item", key: k.id, item: k, flatIndex: h++ });
    });
  });
  const f = h;
  le(() => {
    t && s.current[0] && s.current[0].focus();
  }, [t]), le(() => (requestAnimationFrame(u), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), () => {
    window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0);
  }), [u]);
  const m = (_, b) => {
    var k, g;
    _.key === "ArrowDown" ? (_.preventDefault(), (k = s.current[Math.min(b + 1, f - 1)]) == null || k.focus()) : _.key === "ArrowUp" ? (_.preventDefault(), (g = s.current[Math.max(b - 1, 0)]) == null || g.focus()) : _.key === "Escape" && (_.preventDefault(), r == null || r());
  }, y = (_) => {
    var b;
    _.disabled || ((b = _.onClick) == null || b.call(_), r == null || r());
  };
  return mi(
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
}, a$ = ({
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
  const l = !!((_ = e.dropdownGroups) != null && _.length), [u, d] = W(!1), h = Y(null), f = () => {
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
      className: on.wrapper,
      onMouseEnter: f,
      onMouseLeave: c,
      children: [
        /* @__PURE__ */ M(
          "button",
          {
            ref: h,
            type: "button",
            className: `${on.tab} ${on[r]} ${on.hasDropdown} ${n ? on.active : ""} ${i}`,
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
                  className: `${on.chevron} ${o ? on.chevronOpen : ""}`,
                  "aria-hidden": "true"
                }
              )
            ]
          }
        ),
        o && /* @__PURE__ */ p(
          s$,
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
      className: `${on.tab} ${on[r]} ${n ? on.active : ""} ${i}`,
      onClick: () => t == null ? void 0 : t(e.id),
      "aria-current": n ? "page" : void 0,
      children: e.label
    }
  );
}, l$ = "_topNav_r8foe_4", c$ = "_sm_r8foe_23", u$ = "_lg_r8foe_27", d$ = "_left_r8foe_32", f$ = "_leading_r8foe_41", p$ = "_brand_r8foe_47", h$ = "_tabs_r8foe_63", m$ = "_separator_r8foe_81", g$ = "_right_r8foe_88", _$ = "_actions_r8foe_95", fn = {
  topNav: l$,
  sm: c$,
  lg: u$,
  left: d$,
  leading: f$,
  brand: p$,
  tabs: h$,
  separator: m$,
  right: g$,
  actions: _$
}, b$ = ({ children: e }) => /* @__PURE__ */ p("div", { className: fn.actions, children: e }), WI = ({
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
  const u = an(c, "sm"), [d, h] = W(null), f = Y(null);
  le(() => () => {
    f.current && clearTimeout(f.current);
  }, []);
  const m = (b) => {
    f.current && clearTimeout(f.current), h(b);
  }, y = () => {
    f.current && clearTimeout(f.current), f.current = setTimeout(() => h(null), 150);
  }, _ = () => {
    h(null);
  };
  return /* @__PURE__ */ M("nav", { "aria-label": "Main navigation", className: `${fn.topNav} ${fn[u]} ${l}`, "data-testid": "top-nav", children: [
    /* @__PURE__ */ M("div", { className: fn.left, children: [
      e && /* @__PURE__ */ p("div", { className: fn.leading, children: e }),
      n && /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: fn.brand,
          onClick: t,
          children: n
        }
      ),
      /* @__PURE__ */ p("div", { className: fn.tabs, children: r.map((b) => /* @__PURE__ */ M(Ve.Fragment, { children: [
        b.separator && /* @__PURE__ */ p("div", { className: fn.separator, role: "separator" }),
        /* @__PURE__ */ p(
          a$,
          {
            tab: b,
            isActive: b.id === i,
            onSelect: o,
            size: u,
            isDropdownOpen: d === b.id,
            onDropdownOpen: () => m(b.id),
            onDropdownClose: _,
            onDropdownScheduleClose: y
          }
        )
      ] }, b.id)) })
    ] }),
    (a || s) && /* @__PURE__ */ M("div", { className: fn.right, children: [
      a,
      s && /* @__PURE__ */ p(b$, { children: s })
    ] })
  ] });
}, y$ = "_pagination_1013i_4", k$ = "_disabled_1013i_11", w$ = "_pageIndicator_1013i_17", x$ = "_pageNumbers_1013i_27", v$ = "_pageButton_1013i_33", E$ = "_pageButtonActive_1013i_50", S$ = "_ellipsis_1013i_57", C$ = "_dots_1013i_70", N$ = "_dot_1013i_70", $$ = "_dotActive_1013i_94", Xt = {
  pagination: y$,
  disabled: k$,
  pageIndicator: w$,
  pageNumbers: x$,
  pageButton: v$,
  pageButtonActive: E$,
  ellipsis: S$,
  dots: C$,
  dot: N$,
  dotActive: $$
};
function I$(e, n) {
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
const GI = ({
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
      className: o ? Xt.disabled : void 0
    }
  ), c = /* @__PURE__ */ p(
    ze,
    {
      icon: Ao,
      size: "sm",
      "aria-label": "Next page",
      onClick: () => t(e + 1),
      disabled: s,
      className: s ? Xt.disabled : void 0
    }
  );
  return /* @__PURE__ */ M("nav", { className: `${Xt.pagination} ${i}`, "aria-label": "Pagination", children: [
    r === "buttons" && /* @__PURE__ */ M(kt, { children: [
      a,
      /* @__PURE__ */ M("span", { className: Xt.pageIndicator, children: [
        "Page ",
        e,
        " of ",
        n
      ] }),
      c
    ] }),
    r === "numbered" && /* @__PURE__ */ M(kt, { children: [
      a,
      /* @__PURE__ */ p("div", { className: Xt.pageNumbers, children: I$(e, n).map(
        (l, u) => l === "ellipsis" ? /* @__PURE__ */ p("span", { className: Xt.ellipsis, children: "…" }, `ellipsis-${u}`) : /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: `${Xt.pageButton} ${l === e ? Xt.pageButtonActive : ""}`,
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
      /* @__PURE__ */ p("div", { className: Xt.dots, children: Array.from({ length: n }, (l, u) => u + 1).map((l) => /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          className: `${Xt.dot} ${l === e ? Xt.dotActive : ""}`,
          onClick: () => t(l),
          "aria-label": `Page ${l}`,
          "aria-current": l === e ? "page" : void 0
        },
        l
      )) }),
      c
    ] })
  ] });
}, A$ = "_nav_la800_1", M$ = "_label_la800_5", L$ = "_list_la800_13", R$ = "_childList_la800_22", T$ = "_item_la800_31", D$ = "_link_la800_36", P$ = "_active_la800_54", O$ = "_childLink_la800_60", z$ = "_truncate_la800_64", Rt = {
  nav: A$,
  label: M$,
  list: L$,
  childList: R$,
  item: T$,
  link: D$,
  active: P$,
  childLink: O$,
  truncate: z$
};
function B$(e) {
  const n = [];
  for (const t of e)
    if (n.push(t.href), t.children)
      for (const r of t.children)
        n.push(r.href);
  return n;
}
function F$(e, n) {
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
const VI = ({ items: e, label: n, truncate: t = !1 }) => {
  const [r, i] = W(null), o = Y(/* @__PURE__ */ new Map());
  le(() => {
    const c = B$(e);
    if (c.length === 0) return;
    const l = o.current, u = c[c.length - 1], d = c.flatMap((y) => {
      const _ = y.startsWith("#") ? y.slice(1) : y, b = document.getElementById(_);
      return b ? [{ href: y, el: b }] : [];
    });
    if (d.length === 0) return;
    const h = () => window.innerHeight + window.scrollY >= document.body.offsetHeight - 5, f = new IntersectionObserver(
      (y) => {
        for (const S of y) {
          const v = d.find((x) => x.el === S.target);
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
  const s = r ? F$(e, r) : /* @__PURE__ */ new Set(), a = (c, l) => {
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
  mC as ADMIN_MOBILE_QUERY,
  MI as AlertDialog,
  U$ as AnimationPicker,
  BI as AppLayout,
  Fa as Avatar,
  W$ as Badge,
  G$ as Banner,
  V$ as Blockquote,
  X$ as Breadcrumb,
  K$ as BulletList,
  Y$ as Button,
  Z$ as ButtonGroup,
  Q$ as Card,
  HI as CardGrid,
  J$ as Carousel,
  vs as Checkbox,
  eI as Chip,
  tI as CodeBlock,
  po as ColorPicker,
  jI as Columns,
  _k as Command,
  AI as CommandDialog,
  Pt as CompactInput,
  Eg as ContextMenu,
  nI as DataGrid,
  rI as DatePicker,
  iI as Divider,
  DI as DocPage,
  oI as EditableText,
  sI as EmptyState,
  An as FieldGroup,
  jn as FieldLabel,
  aI as GlobalSearch,
  lI as GradientPicker,
  cI as ImagePicker,
  cl as InlineSearch,
  uI as Input,
  sg as Kbd,
  ai as LabeledField,
  qI as LinkList,
  LI as Modal,
  dI as NumberedList,
  VI as PageContents,
  PI as PageFooter,
  OI as PageHeading,
  GI as Pagination,
  fI as PixelArtEditor,
  Ct as Popover,
  pI as ProgressBar,
  hI as ProgressCircular,
  i1 as Radio,
  mI as RadioGroup,
  gI as RichTextEditor,
  zI as SectionHeading,
  _I as SegmentedControl,
  Lo as Select,
  bI as SelectionList,
  yI as ShadowEditor,
  UI as SideNav,
  i0 as SidePanel,
  kI as Skeleton,
  wI as Slider,
  xI as Spinner,
  FI as Stack,
  vI as Table,
  EI as Tabs,
  SI as Text,
  CI as Textarea,
  $I as TimePicker,
  NI as Timeline,
  g0 as Toast,
  RI as ToastStack,
  II as Toggle,
  ze as ToolbarButton,
  Oo as Tooltip,
  WI as TopNav,
  TI as extractHeadings,
  Oi as parseCssGradient,
  zi as serializeCssGradient,
  gC as useMediaQuery
};
