/* =========================================================================
   live-dash.js — realtime Cell 056 dashboards (Asset Health + OEE) for the
   Live Proof page. Data-driven + UNS-ready: today Feed animates representative
   values with realistic live motion; production swaps Feed.tick() for a UNS
   subscription (see connectUNS note) — the render code is unchanged.
   Mount points:  <div data-livedash="health"></div>  <div data-livedash="oee"></div>
   ========================================================================= */
(function(){
  // ---- one-time CSS inject ----
  var css = ''
   + '.ld{padding:16px;color:#e6eef5;font-family:inherit}'
   + '.ld-hd{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px}'
   + '.ld-hd h4{margin:0;color:#fff;font-size:16px}.ld-hd .sub{color:#9fb6c6;font-size:11.5px}'
   + '.ld-rob{display:grid;grid-template-columns:repeat(5,1fr);gap:9px}'
   + '@media(max-width:520px){.ld-rob{grid-template-columns:repeat(3,1fr)}}'
   + '.ld-r{background:#15324c;border:1.5px solid #24425f;border-radius:11px;padding:9px 6px;text-align:center}'
   + '.ld-r .i{font-size:11px;color:#cfe0ec}.ld-r .s{font-size:18px;font-weight:800;margin-top:2px}'
   + '.ld-r.g{border-color:#49bd8d}.ld-r.g .s{color:#49bd8d}.ld-r.w{border-color:#ffb15b}.ld-r.w .s{color:#ffb15b}'
   + '.ld-r.a{border-color:#ef6a5b;border-width:2.5px}.ld-r.a .s{color:#ef6a5b}'
   + '.ld-cv{background:#16314c;border:1px solid #3f627d;border-radius:11px;padding:10px 14px;margin:9px 0;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#cfe0ec}'
   + '.ld-cv b{color:#49bd8d;font-size:17px}'
   + '.ld-lg{display:flex;gap:16px;margin-top:10px;font-size:11px;color:#9fb6c6;flex-wrap:wrap}'
   + '.ld-lg i{width:9px;height:9px;border-radius:50%;display:inline-block;margin-right:6px;vertical-align:middle}'
   + '.ld-flag{margin-top:11px;background:#241a06;border:1px solid #5a3d12;border-radius:10px;padding:9px 13px;color:#ffcf9a;font-size:12px}'
   + '.ld-tq{margin-top:11px;background:#0f2b1f;border:1px solid #1f7a55;border-radius:10px;padding:9px 13px}'
   + '.ld-tq .h{font-size:11px;color:#6fe0a8;font-weight:700;margin-bottom:6px}'
   + '.ld-tq .g{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}'
   + '.ld-tq .ax{text-align:center}.ld-tq .ax .n{font-size:9.5px;color:#7fbfa0}.ld-tq .ax .t{font-size:14px;font-weight:800;color:#8fe6c0}'
   + '.ld-oee{display:grid;grid-template-columns:190px 1fr;gap:18px;align-items:center}'
   + '@media(max-width:520px){.ld-oee{grid-template-columns:1fr}}'
   + '.ld-donut{width:174px;height:174px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;transition:background .6s}'
   + '.ld-donut .in{width:128px;height:128px;border-radius:50%;background:#0e2236;display:flex;flex-direction:column;align-items:center;justify-content:center}'
   + '.ld-donut .in b{font-size:38px;color:#fff;line-height:1}.ld-donut .in span{font-size:11px;color:#9fb6c6}'
   + '.ld-bars .row{margin-bottom:12px}.ld-bars .lab{display:flex;justify-content:space-between;font-size:12.5px;color:#e6eef5;margin-bottom:5px}'
   + '.ld-bars .est{font-size:9.5px;font-weight:800;color:#ffb15b;background:#241a06;border:1px solid #5a3d12;border-radius:6px;padding:1px 6px;margin-left:6px}'
   + '.ld-bars .trk{height:13px;background:#173049;border-radius:6px;overflow:hidden}.ld-bars .fl{height:100%;background:#49bd8d;border-radius:6px;transition:width .6s}'
   + '.ld-bars .fl.est{background:repeating-linear-gradient(45deg,#c77700,#c77700 6px,#9a5c00 6px,#9a5c00 12px)}'
   + '.ld-trend{display:flex;align-items:flex-end;gap:5px;height:70px;margin-top:8px}'
   + '.ld-trend .b{flex:1;background:#3f7fa0;border-radius:3px 3px 0 0;transition:height .6s}.ld-trend .b.dip{background:#c77700}.ld-trend .b.now{background:#49bd8d}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  // ---- model ----
  var MODEL = {
    cellAHI:66, conveyor:85,
    robots:[{i:'BC5601',a:88},{i:'BC5602',a:83,live:true},{i:'BC5603',a:71},{i:'BC5604',a:42,alert:true},{i:'BC5605',a:80},
            {i:'BC5606',a:72},{i:'BC5607',a:62},{i:'BC5608',a:81},{i:'BC5609',a:69},{i:'BC5610',a:84}],
    torque:[95.2,101.8,88.4,76.1,94.7,102.3],
    oee:{avail:84,perf:91,quality:95,hourly:[62,71,48,67,76,58,80,69]}
  };
  function band(a){return a>=80?'g':(a>=60?'w':'a');}
  function oeeVal(o){return Math.round(o.avail*o.perf*o.quality/10000);}
  function jit(v,amt,lo,hi){v+=(Math.random()-0.5)*amt;return Math.max(lo,Math.min(hi,v));}

  function health(){
    function row(list){return list.map(function(r){return '<div class="ld-r '+band(r.a)+'"><div class="i">'+r.i+(r.live?' &#183; live':'')+'</div><div class="s">'+r.a+'%</div></div>';}).join('');}
    return '<div class="ld"><div class="ld-hd"><h4>Cell 056 &#183; Base Coat</h4><span class="sub">roll-up '+MODEL.cellAHI+'% &#183; Watch</span></div>'
      +'<div class="ld-rob">'+row(MODEL.robots.slice(0,5))+'</div>'
      +'<div class="ld-cv"><span>Conveyor 056</span><b>'+MODEL.conveyor+'%</b></div>'
      +'<div class="ld-rob">'+row(MODEL.robots.slice(5))+'</div>'
      +'<div class="ld-lg"><span><i style="background:#49bd8d"></i>Healthy &#8805; 80</span><span><i style="background:#ffb15b"></i>Watch 60&#8211;79</span><span><i style="background:#ef6a5b"></i>Alert &lt; 60</span></div>'
      +'<div class="ld-tq"><div class="h">&#9679; BC5602 live axis torque (Nm) &#183; Ignition &#8594; HighByte &#8594; UNS</div><div class="g">'
      +MODEL.torque.map(function(t,i){return '<div class="ax"><div class="n">A'+(i+1)+'</div><div class="t">'+t.toFixed(1)+'</div></div>';}).join('')
      +'</div></div>'
      +'<div class="ld-flag">&#9650; BC5604 driving the cell &#8212; 42%, 7 emergency callouts in June</div></div>';
  }
  function oee(){
    var o=MODEL.oee,val=oeeVal(o),deg=Math.round(val*3.6);
    var tr=o.hourly.map(function(h,i){var c=(i===2?'dip':(i===o.hourly.length-1?'now':''));return '<div class="b '+c+'" style="height:'+h+'%"></div>';}).join('');
    return '<div class="ld"><div class="ld-hd"><h4>OEE &#8212; current shift</h4><span class="sub">Availability &#215; Performance &#215; Quality</span></div>'
      +'<div class="ld-oee"><div><div class="ld-donut" style="background:conic-gradient(#ffb15b '+deg+'deg,#173049 0)"><div class="in"><b>'+val+'%</b><span>OEE</span></div></div>'
      +'<div style="text-align:center;color:#9fb6c6;font-size:11px;margin-top:9px">World-class &#8805; 85% &#183; target 78%</div></div>'
      +'<div class="ld-bars">'
      +'<div class="row"><div class="lab"><span>Availability</span><span>'+o.avail+'%</span></div><div class="trk"><div class="fl" style="width:'+o.avail+'%"></div></div></div>'
      +'<div class="row"><div class="lab"><span>Performance</span><span>'+o.perf+'%</span></div><div class="trk"><div class="fl" style="width:'+o.perf+'%"></div></div></div>'
      +'<div class="row"><div class="lab"><span>Quality<span class="est">est &#183; no feed yet</span></span><span>'+o.quality+'%</span></div><div class="trk"><div class="fl est" style="width:'+o.quality+'%"></div></div></div>'
      +'<div style="font-size:11px;color:#9fb6c6;margin-top:2px">OEE by hour &#8212; this shift</div><div class="ld-trend">'+tr+'</div>'
      +'</div></div></div>';
  }
  function render(){
    document.querySelectorAll('[data-livedash]').forEach(function(el){
      var k=el.getAttribute('data-livedash');
      el.innerHTML = k==='health'?health():k==='oee'?oee():'';
    });
  }
  // Public UNS bridge (Canoe HighByte broker :1885 -> SSE, via Cloudflare tunnel).
  // Override with window.UNS_BRIDGE before this script loads if needed.
  var BRIDGE = (typeof window!=='undefined' && window.UNS_BRIDGE) || 'https://nissan-uns.civops.io';

  var ticks=0;
  var Feed = {
    liveTorque:false,   // true only while fresh bc5602 messages are arriving
    _lastTorque:0,
    tick:function(){
      ticks++;
      // If the real bc5602 leg goes quiet (Ignition sim paused / retained value only),
      // drop back to simulated motion so the figure never freezes or mislabels itself.
      if(Feed.liveTorque && Date.now()-Feed._lastTorque>8000){ Feed.liveTorque=false; }
      // BC5602 axis torque: driven by the real UNS feed when connected; otherwise
      // it wanders like the live Ignition sim so the figure still shows motion.
      if(!Feed.liveTorque){ MODEL.torque=MODEL.torque.map(function(t){return jit(t,3.4,40,130);}); }
      // OEE breathes; newest hour bar moves (representative — no scrap/rework feed yet)
      MODEL.oee.avail=Math.round(jit(MODEL.oee.avail,1.2,78,92));
      MODEL.oee.perf =Math.round(jit(MODEL.oee.perf,1.2,84,96));
      var h=MODEL.oee.hourly; h[h.length-1]=Math.round(jit(h[h.length-1],2.5,55,88));
      // AHI is a slow index — nudge one non-alert robot occasionally
      if(ticks%3===0){ var idx=1+Math.floor(Math.random()*8); if(!MODEL.robots[idx].alert){ MODEL.robots[idx].a=Math.max(55,Math.min(92,MODEL.robots[idx].a+(Math.random()<0.5?-1:1))); } }
      render();
    },
    // connectUNS(): PRODUCTION path, now live. Subscribes to the bridge's SSE stream
    // and maps the real bc5602 axis-torque payload straight into MODEL.torque. The
    // render code is unchanged — same MODEL shape. Falls back to the sim on any error.
    connectUNS:function(){
      if(typeof EventSource==='undefined') return;
      var es;
      try{ es=new EventSource(BRIDGE+'/stream'); }catch(e){ return; }
      es.addEventListener('uns',function(ev){
        var msg; try{ msg=JSON.parse(ev.data); }catch(e){ return; }
        var t=msg.topic||'', p=msg.payload||{};
        // BC5602 base-coat robot: real per-axis max torque, Ignition -> HighByte -> UNS
        if(/\/bc5602$/i.test(t) && p.torqueMaxA1!=null && !msg.snapshot){
          MODEL.torque=[p.torqueMaxA1,p.torqueMaxA2,p.torqueMaxA3,p.torqueMaxA4,p.torqueMaxA5,p.torqueMaxA6]
            .map(function(v){return +(+v).toFixed(1);});
          Feed.liveTorque=true; Feed._lastTorque=Date.now();
          render();
        }
      });
      es.onerror=function(){ /* auto-reconnects; sim keeps the figure alive meanwhile */ };
    }
  };
  render();
  setInterval(function(){ Feed.tick(); }, 2600);
  Feed.connectUNS();
})();
