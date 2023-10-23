var e = function(t) {
    let o = Math.random().toString(16).substr(2)
      , n = null
      , s = !0
      , r = ["❌", "⭕️"]
      , i = r[1]
      , l = [["❔", "❔", "❔"], ["❔", "❔", "❔"], ["❔", "❔", "❔"]];
    const a = new CustomEvent("vgtv-action",{
        detail: {
            type: "play"
        }
    });
    function c() {
        console.clear(),
        l.reverse().map((e=>{
            console.log("%c" + "_".repeat(11), "margin-top: -20px;font-weight:bold; font-size: 24px"),
            console.log("%c" + e.join(" | "), "font-weight:bold; margin:0; font-size: 24px")
        }
        )),
        l.reverse(),
        async function() {
            let e = [].concat(l)
              , t = [].concat(e).concat(e.map(((t,o)=>e.map((e=>e[o]))))).concat([e.map(((e,t)=>e[t]))]).concat([e.reverse().map(((e,t)=>e[t]))]).map((e=>e.filter((e=>e)))).filter((e=>e.length));
            for (let e in t) {
                let o = t[e];
                if (1 === new Set(o).size && o.length === l[0].length && "❔" !== o[0])
                    return console.log("We got a winner", o[0]),
                    o[0]
            }
            throw Error("Not finished")
        }().then((e=>{
            window.alert("Winner is " + e),
            g()
        }
        )).catch((()=>{
            l.flat().filter((e=>"❔" !== e)).length === l.flat().length && (window.alert("The game is draw. Good work. Press OK to restart game"),
            g()),
            function() {
                s = !0;
                const e = l.flat().filter((e=>"❔" !== e)).length % 2 == 0;
                console.log("%cNext player is " + r[e ? 0 : 1], "font-weight:bold; margin:0; font-size: 24px"),
                0 === i.localeCompare(r[e ? 0 : 1]) && (console.log("%cIt's your turn. Type set(x,y) to play.", "font-weight:bold; margin:0; font-size: 24px"),
                console.log("%cExample: set(0,0)", "font-weight:bold; margin:0; font-size: 15px"),
                console.log("%c(0,2) | (1,2) | (2,2)", "font-weight:bold; margin:0; font-size: 14px"),
                console.log("%c(0,1) | (1,1) | (2,1)", "font-weight:bold; margin:0; font-size: 14px"),
                console.log("%c(0,0) | (1,0) | (2,0)", "font-weight:bold; margin:0; font-size: 14px"),
                s = !1)
            }()
        }
        ))
    }
    function g() {
        s = !0,
        t.unsubscribeAll(),
        new e(t)
    }
    function d(e, s) {
        n || (console.log("Sending handshake to", s, n),
        t.publish("ttt/games/" + s, JSON.stringify({
            gameId: e,
            playerId: o
        })))
    }
    document.dispatchEvent(a),
    t.subscribe("ttt/games/" + o, (function(e) {
        const s = JSON.parse(e.message);
        var r;
        s.playerId !== o && (d(s.gameId, s.playerId),
        s.gameId && (r = s.gameId,
        n || (n = r,
        console.log("Joining game", n),
        c(),
        t.subscribe("ttt/games/" + n, (function(e) {
            const t = JSON.parse(e.message);
            t.playerId !== o && (l = t.state,
            c())
        }
        )))))
    }
    )).then((e=>{
        t.publish("ttt/games/request", JSON.stringify({
            playerId: o
        }))
    }
    ));
    setTimeout((()=>{
        t.subscribe("ttt/games/request", (function(e) {
            console.log("Got game request", n, e);
            const t = JSON.parse(e.message);
            t.playerId !== o && (i = r[0],
            d(o + "-" + t.playerId, t.playerId))
        }
        ))
    }
    ), 500);
    window.set = (e,r)=>{
        if (s)
            throw Error("Not your turn");
        if (r < 0 || r > l.length - 1)
            throw Error("Outside of board");
        if (e < 0 || e > l[r].length - 1)
            throw Error("Outside of board");
        if ("❔" !== l[r][e])
            throw Error("Occupied");
        l[r][e] = i,
        c(),
        n && t.publish("ttt/games/" + n, JSON.stringify({
            state: l,
            playerId: o
        }))
    }
};
window.startTTT = function() {
    var t, o, n, s, r, i, l = ["Starter spillet...", "...venter på motstander"];
    console.clear(),
    l.map((e=>{
        console.log("%c" + e, "font-weight:bold; font-size: 24px")
    }
    )),
    window,
    t = document,
    o = "https://cdn.vgc.no/js/libs/eventhub-js/eventhub.umd.js?_4",
    n = ()=>{
        let t = new Eventhub("wss://direktehub.vg.no","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFkIjpbInR0dC8jIl0sIndyaXRlIjpbInR0dC8jIl19._z2FcA2SRzk-10ORwdLYy427eu36MzFMjp3l2bYA2hI");
        t.connect().then((()=>new e(t)))
    }
    ,
    s = "script",
    r = t.createElement(s),
    i = t.getElementsByTagName(s)[0],
    r.onload = n,
    r.async = 1,
    r.src = o,
    i.parentNode.insertBefore(r, i)
}
;
var t = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  , o = /Firefox/.test(navigator.userAgent);
(t || o) && console.log("%cLyst til å spille Tic Tac Toe? Skriv startTTT(); i console.", "font-weight:bold; font-size: 24px");
