var Instagram=function(){var t=[],i=function(t){for(var i in t)for(var a=0,e=t[i].srclist.length;a<e;a++){var n=t[i].bigSrclist[a],r=new Image;r.src=n}},a=function(t){for(var a in t){for(var e="",n=0,r=t[a].srclist.length;n<r;n++)e+='<li>\t\t\t\t\t\t\t\t<div class="img-box">\t\t\t\t\t\t\t\t\t<a class="img-bg" rel="example_group" href="'+t[a].bigSrclist[n]+'" title="'+t[a].text[n]+'"></a>\t\t\t\t\t\t\t\t\t<img lazy-src="'+t[a].srclist[n]+'" alt="">\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</li>';$('<section class="archives album"><h1 class="year">'+t[a].year+"<em>"+t[a].month+'月</em></h1>\t\t\t\t<ul class="img-box-ul">'+e+"</ul>\t\t\t\t</section>").appendTo($(".instagram"))}$(".instagram").lazyload(),o(),setTimeout(function(){i(t)},3e3),$("a[rel=example_group]").fancybox()},e=function(t){if(t.indexOf("outbound-distilleryimage")>=0){var i=t.match(/outbound-distilleryimage([\s\S]*?)\//)[1],a=t.split("/");return"https://distilleryimage"+i+".ak.instagram.com/"+a[a.length-1]}var e="https://photos-g.ak.instagram.com/hphotos-ak-xpf1/",a=t.split("/");return e+a[a.length-1]},n=function(t){for(var i={},n=0,r=t.length;n<r;n++){var o=new Date(1e3*t[n].created_time),s=o.getFullYear(),l=o.getMonth()+1,c=e(t[n].images.low_resolution.url),u=e(t[n].images.standard_resolution.url),m=t[n].caption?t[n].caption.text:"",g=s+"-"+l;i[g]?(i[g].srclist.push(c),i[g].bigSrclist.push(u),i[g].text.push(m)):i[g]={year:s,month:l,srclist:[u],bigSrclist:[u],text:[m]}}a(i)},r=function(i){$(".open-ins").html("图片来自instagram，正在加载中…"),$.ajax({url:i,type:"GET",dataType:"jsonp",success:function(i){if(200==i.meta.code){t=t.concat(i.data);var a=i.pagination.next_url;a?r(a):($(".open-ins").html("图片来自instagram，点此访问"),n(t))}else alert("access_token timeout!")}})},o=function(){if($(document).width()<=600)$(".img-box").css({width:"auto",height:"auto"});else{var t=$(".img-box-ul").width(),i=Math.max(.26*t,157);$(".img-box").width(i).height(i)}},s=function(){$(window).resize(function(){o()})};return{init:function(){var t=$(".instagram").attr("data-client-id"),i=$(".instagram").attr("data-user-id");return t?(r("https://api.instagram.com/v1/users/"+i+"/media/recent/?client_id="+t+"&count=100"),void s()):(alert("Didn't set your instagram client_id.\nPlease see the info on the console of your brower."),void console.log("Please open 'https://instagram.com/developer/clients/manage/' to get your client-id."))}}}();$(function(){Instagram.init()});