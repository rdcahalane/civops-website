/* live-dash.js — Cell 056 representative dashboards (Asset Health + OEE).
   CSS lives in styles.css (.ld-* rules). No external connections. */
(function(){

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
    function row(list){return list.map(function(r){
      return '<div class="ld-r '+band(r.a)+'"><div class="i">'+r.i+(r.live?' &#183; live':'')+'</div><div class="s">'+r.a+'%</div></div>';
    }).join('');}
    return '<div class="ld">'
      +'<div class="ld-hd"><h4>Cell 056 &#183; Base Coat</h4><span class="sub">roll-up '+MODEL.cellAHI+'% &#183; Watch</span></div>'
      +'<div class="ld-rob">'+row(MODEL.robots.slice(0,5))+'</div>'
      +'<div class="ld-cv"><span>Conveyor 056</span><b>'+MODEL.conveyor+'%</b></div>'
      +'<div class="ld-rob">'+row(MODEL.robots.slice(5))+'</div>'
      +'<div class="ld-lg">'
        +'<span><i style="background:#49bd8d"></i>Healthy &#8805; 80</span>'
        +'<span><i style="background:#ffb15b"></i>Watch 60&#8211;79</span>'
        +'<span><i style="background:#ef6a5b"></i>Alert &lt; 60</span>'
      +'</div>'
      +'<div class="ld-tq"><div class="h">&#9679; BC5602 axis torque (Nm) &#183; Ignition &#8594; HighByte &#8594; UNS</div>'
      +'<div class="g">'+MODEL.torque.map(function(t,i){
        return '<div class="ax"><div class="n">A'+(i+1)+'</div><div class="t">'+t.toFixed(1)+'</div></div>';
      }).join('')+'</div></div>'
      +'<div class="ld-flag">&#9650; BC5604 driving the cell &#8212; 42%, 7 emergency callouts in June</div>'
      +'</div>';
  }

  function oee(){
    var o=MODEL.oee, val=oeeVal(o), deg=Math.round(val*3.6);
    var tr=o.hourly.map(function(h,i){
      var c=(i===2?'dip':(i===o.hourly.length-1?'now':''));
      return '<div class="b '+c+'" style="height:'+h+'%"></div>';
    }).join('');
    return '<div class="ld">'
      +'<div class="ld-hd"><h4>OEE &#8212; current shift</h4><span class="sub">Availability &#215; Performance &#215; Quality</span></div>'
      +'<div class="ld-oee">'
        +'<div>'
          +'<div class="ld-donut" style="background:conic-gradient(#ffb15b '+deg+'deg,#173049 0)">'
            +'<div class="in"><b>'+val+'%</b><span>OEE</span></div>'
          +'</div>'
          +'<div style="text-align:center;color:#9fb6c6;font-size:11px;margin-top:9px">World-class &#8805; 85% &#183; target 78%</div>'
        +'</div>'
        +'<div class="ld-bars">'
          +'<div class="row"><div class="lab"><span>Availability</span><span>'+o.avail+'%</span></div><div class="trk"><div class="fl" style="width:'+o.avail+'%"></div></div></div>'
          +'<div class="row"><div class="lab"><span>Performance</span><span>'+o.perf+'%</span></div><div class="trk"><div class="fl" style="width:'+o.perf+'%"></div></div></div>'
          +'<div class="row"><div class="lab"><span>Quality<span class="est">est &#183; no feed yet</span></span><span>'+o.quality+'%</span></div><div class="trk"><div class="fl est" style="width:'+o.quality+'%"></div></div></div>'
          +'<div style="font-size:11px;color:#9fb6c6;margin-top:2px">OEE by hour &#8212; this shift</div>'
          +'<div class="ld-trend">'+tr+'</div>'
        +'</div>'
      +'</div>'
      +'</div>';
  }

  function render(){
    document.querySelectorAll('[data-livedash]').forEach(function(el){
      var k=el.getAttribute('data-livedash');
      el.innerHTML = k==='health' ? health() : k==='oee' ? oee() : '';
    });
  }

  var ticks=0;
  function tick(){
    ticks++;
    MODEL.torque=MODEL.torque.map(function(t){return jit(t,3.4,40,130);});
    MODEL.oee.avail=Math.round(jit(MODEL.oee.avail,1.2,78,92));
    MODEL.oee.perf =Math.round(jit(MODEL.oee.perf,1.2,84,96));
    var h=MODEL.oee.hourly; h[h.length-1]=Math.round(jit(h[h.length-1],2.5,55,88));
    if(ticks%3===0){
      var idx=1+Math.floor(Math.random()*8);
      if(!MODEL.robots[idx].alert){ MODEL.robots[idx].a=Math.max(55,Math.min(92,MODEL.robots[idx].a+(Math.random()<0.5?-1:1))); }
    }
    render();
  }

  render();
  setInterval(tick, 2600);
})();
