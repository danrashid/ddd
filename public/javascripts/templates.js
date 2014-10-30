if (!!!templates) var templates = {};
templates["things"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("things",c,p,1),c,p,0,11,32,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <li>");t.b(t.v(t.f("name",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }});
