//Ideiglenes cím és maszk
var tmpAddr = new Array(192,168,0,1)
var tmpMask = new Array(255,255,255,0)

//Megjeleníti az adatokat
function displayData(){ 
    //Hálózat cím
    document.getElementById("network").value = tmpAddr[0]+"."+tmpAddr[1]+"."+tmpAddr[2]+"."+tmpAddr[3]
    //Alhálózati cím
    document.getElementById("mask").value = tmpMask[0]+"."+tmpMask[1]+"."+tmpMask[2]+"."+tmpMask[3]
    //Prefix
    var prefix = octetToPrefix(tmpMask)
    document.getElementById("prefix").value = prefix
    //Hostcímek száma
    var numOfHosts = hostsCount(tmpMask)
    document.getElementById("hosts").value = numOfHosts
    //Legelső IP cím (hálózatcím)
    var netIp = firstIp(tmpAddr,tmpMask)
    document.getElementById("first").value = netIp[0] + "." + netIp[1] + "." + netIp[2] + "." + netIp[3]
    //Wild Card (a subnet mask ellentetje pl.:255.255.255.0 => 0.0.0.255)
    var wc = wildCard(tmpMask)
    //Legutolsó IP cím (broadcats)
    var bcast = broadcast(tmpAddr,wc)
    document.getElementById("broadcast").value = bcast[0] + "." + bcast[1] + "." + bcast[2] + "." + bcast[3]
    //Első használható IP cím
    var firstUIp = firstUseableIp(tmpAddr,tmpMask)
    document.getElementById("firstU").value = firstUIp[0] + "." + firstUIp[1] + "." + firstUIp[2] + "." + firstUIp[3]
    //Utolsó használható IP cím
    var lastUIp = lastUseableIp(tmpAddr,wc)
    document.getElementById("lastU").value = lastUIp[0] + "." + lastUIp[1] + "." + lastUIp[2] + "." + lastUIp[3]
}

//A hostok számát adja meg.
function hostsCount(arrMask) {
    var bits = 32 - octetToPrefix(arrMask);
    return Math.pow(2,bits) -2; //visszatér a hálózatban lévő címek számával-2 (-2 => broadcast, network) 
}

//Kiszámolja a Ip címből és a maszkból a hálózatcímet
function firstIp(arrAddr, arrMask){
    var a = new Array(0,0,0,0)
    for (var i = 0; i < 4; i++) {
        //Bitwise AND művelet
        a[i] = arrAddr[i] & arrMask[i]
    }
    return a
}

//Kiszámolja a maskból a wildcard maskot
function wildCard(arrMask){
    var a = new Array(0,0,0,0)
    for (var i = 0; i < 4; i++) {
        a[i] = 255 - arrMask[i]
    }
    return a
}

//A broadcast címet számolja ki az IP címből és a Wild Cardból 
function broadcast(arrAddr, wildcard){
    var a = new Array(0,0,0,0)
    for(var i = 0; i < 4; i++){
        //Bitwise OR művelet
        a[i] = arrAddr[i] | wildcard[i] 
    }
    return a 
}

//Kiszámolja az első használható IP címet
function firstUseableIp(arrAddr, arrMask){
    var a = firstIp(arrAddr,arrMask)
    var d = octetToDecimal(a)
    //Hálózat címhez hozzáadok egyet.
    d = d + 1
    return decimalToOctet(d)
}

//Kiszámolja az utolsó használható IP címet
function lastUseableIp(arrAddr, wildcard){
    var a = new broadcast(arrAddr,wildcard)
    var d = octetToDecimal(a)
    //A broadcast címből elvesz egyet
    d = d-1
    return decimalToOctet(d) 
}

//Átalakítja a 4 octetet decimális számmá
function octetToDecimal(a){
    var d = 0;
    d = d + parseInt(a[0]) * Math.pow(2,24)
    d = d + a[1] * Math.pow(2,16)
    d = d + a[2] * Math.pow(2,8)
    d = d + a[3]
    //visszatér a decimális számmal
    return d
}

//Kiszámolja a maszkból a prefixet (hálózat biteket).
function octetToPrefix(arrMask){
    var mask = octetToDecimal(arrMask)
    //átalakítja binárissá
    mask = mask.toString(2)
    //visszatér a maszk hosszával 
    return mask.indexOf(0) 
}

//Átalakítja a decimális számot 4 octetté
function decimalToOctet(d){
    var bits = "00000000000000000000000000000000"
    var b = d.toString(2)
    var b = bits.substring(0,32-b.length) + b
    var a = new Array(parseInt(b.substring(0,8),2)
                        , (d & 16711680)/65536	  
                        , (d & 65280)/256		 
                        , (d & 255)
                        );
    return a;
}