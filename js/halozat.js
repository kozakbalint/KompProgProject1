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
    var numOfHosts = hostCount(tmpMask)
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

//Kiszámolja a maszkból a prefixet (hálózat biteket).
function octetToPrefix(arrMask){
    var mask = octetToDecimal(arrMask)
    //átalakítja binárissá
    mask = mask.toString(2)
    //visszatér a maszk hosszával 
    return mask.indexOf(0) 
}