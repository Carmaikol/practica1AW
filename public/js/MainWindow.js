function changePrincipal(seleccion) {
	switch(seleccion) {
		case 0: 
			window.location.href="/logout";
			break;
		case 1: 
			div = document.getElementById("principal")
			div.innerHTML='<object type="text/html" data="index" style="width:100%; height: 100%;" ></object>';
			div.style.height = "750px"
			break;
		case 2: 
			div = document.getElementById("principal")
			div.innerHTML='<object type="text/html" data="joingame" style="width:100%; height: 100%;" ></object>';
			div.style.height = "750px";
			break;
		case 3: 
			div = document.getElementById("principal")
			div.innerHTML='<object type="text/html" data="creategame" style="width:100%; height: 100%;" ></object>';
			div.style.height = "750px";
			break;
	}
	
}
