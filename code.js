var screen;
var W=850,H=600;
var q=[],HeapSize=0,N,id_interval=null;
var arr=[];


function SLEEP(ms){
	const date= Date.now();
	let currentDate=null;
	do{
		currentDate=Date.now();
	}while(currentDate-date<ms)
}

function screen_clear(){
	screen.innerHTML='<script xlink:href="code.js"></script>';
}
function draw_line(x1,y1,x2,y2,color,width){
	screen.innerHTML+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'"/>';
}
function draw_circle(x,y,r,color,width){
	screen.innerHTML+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" stroke="'+color+'" stroke-width="'+width+'" fill="'+color+'"/>';
}
function draw_text(x,y,txt,color,height){
	screen.innerHTML+='<text x="'+x+'" y="'+y+'" font-size="'+height+'" stroke="'+color+'">'+txt+'</text>'
}
function rand(l,r){
	return Math.floor(Math.random()*Math.floor(r-l)+l);
}
function rand_color(){
	let abc="0123456789ABCDEF";
	return "#"+abc[rand(0,15)]+abc[rand(0,15)]+abc[rand(0,15)]+abc[rand(0,15)]+abc[rand(0,15)]+abc[rand(0,15)];
}
var coor=[],st="Sorted array:";
function draw_heap(posa=-1,posb=-1){
	screen_clear();
	draw_text(0,48,st,"#00FF00",40);
	let n=1,lev=1;
	coor=[];
	for(let i=0;i<q.length;++lev){
		let d=Math.floor(W/(2*n));
		for(let j=i;j<i+n && j<q.length;++j){
			let X=(2*(j-i)+1)*d;
			let Y=lev*100;
			coor.push([X,Y]);
		}
		i+=n;n*=2;
	}
	for(let i=0;i<coor.length;++i){
		let l=2*i+1,r=2*i+2;
		if(l<coor.length){
			draw_line(coor[i][0],coor[i][1],coor[l][0],coor[l][1],"#000000",3);
		}
		if(r<coor.length){
			draw_line(coor[i][0],coor[i][1],coor[r][0],coor[r][1],"#000000",3);
		}
	}
	n=1;lev=1;
	for(let i=0;i<q.length;++lev){
		let d=Math.floor(W/(2*n));
		for(let j=i;j<i+n && j<q.length;++j){
			let X=(2*(j-i)+1)*d;
			let Y=lev*100;
			coor.push([X,Y]);
			if(j!=posa && j!=posb)
				draw_circle(X,Y,20,"#00FFFF",3);
			else 
				draw_circle(X,Y,20,"#FF0000",3);
			draw_text(X-7,Y+7,""+q[j],"#FF0000",28);
		}
		i+=n;n*=2;
	}
}

//////////////////////////////////////////////////////////
function otherStyle(pos){
	let elem=document.getElementById("Style");
	pos=Number.parseInt(pos);
	elem.href=styles[pos];
}



function siftDown_(index_2){
	let maxi = index_2;
    let ind;
    while(true){
	    ind = 2*index_2+1;
	    if(ind < HeapSize && q[ind] < q[index_2])
	      	 maxi = ind;
	    ind++;
	    if(ind < HeapSize && q[ind] < q[maxi])
	       	maxi = ind;
        if(maxi == index_2)
	       break;
	    [q[index_2],q[maxi]]=[q[maxi],q[index_2]];
	    draw_heap(index_2,maxi);
	    index_2 = maxi;
   	}	
} 

function siftUp_(i){
	while(i>0 && 0+q[i]<0+q[Math.floor((i-1)/2)]){
		[q[i],q[Math.floor((i-1)/2)]]=[q[Math.floor((i-1)/2)],q[i]];
		i=Math.floor((i-1)/2);
	}
}

function extractMin_(){
	let MIN_=q[0];
	q[0]=q[HeapSize-1];
	HeapSize--;
	q.pop();
	siftDown_(0);
	return MIN_;
}

function Insert_(key){
	HeapSize++;
	q.push(key);
	siftUp_(HeapSize-1);
}

function check_NaN_null(a){
	if(a==null)return true;
	if(!(a<0) && !(a==0) && !(a>0))return true;
	return false;
}
function STOP(){
	if(!check_NaN_null(id_interval))clearInterval(id_interval);
}
function Sorting(){
	document.getElementById("Output").innerHTML='<svg id="pole" xmlns="http://www.w3.org/2000/svg" version="1.1" width="850" height="600"><script xlink:href="code.js"></script></svg>';
	screen=document.getElementById("pole")
	q=[];
	arr=[];
	HeapSize=0;
	st="Sorted array:";
	for(let i=0;i<N;++i){
		let tmp=Number.parseInt(document.getElementById("input"+i).value);
		if(check_NaN_null(tmp)){
			alert("Все поля должны быть заполнены числами");
			return;
		}
		Insert_(tmp);
	}
	var NumberStep=0;
	var id_interval=setInterval(()=>{
		if(NumberStep<=N){
		draw_heap();
		let ttmp=extractMin_();
		arr.push(ttmp);
		st+=' '+ttmp;
		++NumberStep;
		if(NumberStep==N){STOP();}
	}
	},1000);
	elem.innerHTML=tmp;
}

function Gen(){
	STOP();
	document.getElementById("Output").innerHTML="";
	q=[]
	arr=[];HeapSize=0;
	N=Number.parseInt(document.getElementById("inputN").value);
	if(check_NaN_null(N)){
		alert("Введите число");
		return;
	}
	let elem=document.getElementById("Input");
	ht='';
	for(let i=0;i<N;++i){
		ht+='<input type="text" size="5" id="input'+i+'"/>';
	}
	ht+='<br><button onClick="Sorting();">Отсортировать</button>'
	elem.innerHTML=ht;
}



