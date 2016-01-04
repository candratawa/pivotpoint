var a, b, low, high, sinyal, spot = []
	, spots = [];
var pp = 0
	, r1 = 0
	, r2 = 0
	, r3 = 0
	, r4 = 0
	, s1 = 0
	, s2 = 0
	, s3 = 0
	, s4 = 0
	, tutup;
var midr1 = 0
	, midr2 = 0
	, midr3 = 0
	, mids1 = 0
	, mids2 = 0
	, mids3 = 0;
var op = 0
	, ww = 0
	, ll = 0
	, win = 1
	, loss = 1
	, myTotal = 0
	, profit = 0
	, hasil = 0
	, totaloss = 0
	, sesi = 0
	, wait = 0;
var periode = Number(prompt("Periode analisa (tick)", 30));
var tik = Number(prompt("Tick :", 5));
var stake = Number(prompt("Input Stake ", 1));
var tp = Number(prompt("Target Profit?", 10));
var tp1 = tp;
var sl = Number(prompt("Stop Loss", 20));
var slx = -sl;
var stake1 = stake;
//var jlhS = Number(prompt("Berapa Sesi Trading?",5));
//var jeda = Number(prompt("Sesi Selanjutnya Setelah (Menit)",1));
//var mnt = jeda * 60;
macro = "CODE:";
macro += "TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:form0 ATTR=ID:amount CONTENT=" + stake + "\n";
macro += "TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:form0 ATTR=ID:duration_amount CONTENT=" + tik + "\n";
macro += "\nTAG POS=1 TYPE=SELECT FORM=NAME:form0 ATTR=ID:duration_units CONTENT=%t\n";
macro += "TAG POS=1 TYPE=SELECT FORM=NAME:form0 ATTR=NAME:amount_type&&ID:amount_type&&CLASS:unbind_later CONTENT=%stake\n";
macro += "TAG POS=1 TYPE=BUTTON FORM=NAME:form0 ATTR=TXT:Get<SP>Prices\n";
macro += "WAIT SECONDS=3\n";
iimPlay(macro);
// Perulangan membaca spot
for (b = 0;; b++)
{
	macro = "CODE:";
	macro += "WAIT SECONDS=1.8";
	macro += "\nTAG POS=1 TYPE=SPAN ATTR=ID:spot extract=txt";
	iimPlay(macro);
	spots[b] = Number(iimGetLastExtract(1));
	spot[b] = spots[b - 1];
	tutup = spots[b - 1];
	// Kondisi mengamati periode spot
	if (b <= periode)
	{
		iimDisplay("Periode Analisa " + periode + " tik\nMenghitung spot.. " + (periode - b) + "\nOP : " + op + " Win : " + ww + " Los : " + ll + "\nHasil $ " + myTotal.toFixed(2));
	}
	if (spots[b] !== spots[b - 1] && spots[b] !== null)
	{
		if (b == periode)
		{
			low = Math.min.apply(Math, spots);
			high = Math.max.apply(Math, spots);
			/*	
				pp = (high+low+close)/3;
				r1 = (2*(pp))-low;
				r2 = pp+(high-low);
				r3 = high+(2*(pp-low));
				r4 = high+(3*(pp-low));
				s1 = (2*(pp))-high;
				s2 = pp-(high-low);
				s3 = low-(2*(high-pp));
				s4 = low-(3*(high-pp));
			*/
			pp = (high + low + tutup) / 3;
			r4 = pp + (2.000 * (high - low));
			r3 = pp + (1.000 * (high - low));
			r2 = pp + (0.618 * (high - low));
			r1 = pp + (0.382 * (high - low));
			s1 = pp - (0.382 * (high - low));
			s2 = pp - (0.618 * (high - low));
			s3 = pp - (1.000 * (high - low));
			s4 = pp - (2.000 * (high - low));
			midr1 = ((r1 + r2) / 2);
			midr2 = ((r2 + r3) / 2);
			midr3 = ((r3 + r4) / 2);
			mids1 = ((s1 + s2) / 2);
			mids2 = ((s2 + s3) / 2);
			mids3 = ((s3 + s4) / 2);
			iimDisplay("HL " + periode + " H: " + high + " L: " + low + " C: " + tutup + "\nPIVOT POINT: " + pp.toFixed(4) + "\nR1: " + r1.toFixed(4) + " | S1: " + s1.toFixed(4) + "\nMIDR1 : " + midr1.toFixed(4) + " | MIDS1 : " + mids1.toFixed(4) + "\nR2: " + r2.toFixed(4) + " | S2: " + s2.toFixed(4) + "\nMIDR2 : " + midr2.toFixed(4) + " | MIDS2 : " + mids2.toFixed(4) + "\nR3: " + r3.toFixed(4) + " | S3: " + s3.toFixed(4) + "\nMIDR3 : " + midr3.toFixed(4) + " | MIDS3 : " + mids3.toFixed(4) + "\nR4: " + r4.toFixed(4) + " | S4: " + s4.toFixed(4) + "\nOP : " + op + " Win : " + ww + " Los : " + ll + "\nHasil $ " + myTotal.toFixed(2));
		}
	}
	else
	{
		wait += 1;
	}
	if (wait == 6)
	{
		iimPlay("CODE:TAG POS=1 TYPE=BUTTON FORM=NAME:form0 ATTR=ID:bet_calculate");
		wait = 0;
		//b = 0;
	}
	if (b > periode)
	{
		iimDisplay(spots[b] + "\nR1: " + r1.toFixed(4) + " | S1: " + s1.toFixed(4) + "\nMIDR1 : " + midr1.toFixed(4) + " | MIDS1 : " + mids1.toFixed(4) + "\nR2: " + r2.toFixed(4) + " | S2: " + s2.toFixed(4) + "\nMIDR2 : " + midr2.toFixed(4) + " | MIDS2 : " + mids2.toFixed(4) + "\nR3: " + r3.toFixed(4) + " | S3: " + s3.toFixed(4) + "\nMIDR3 : " + midr3.toFixed(4) + " | MIDS3 : " + mids3.toFixed(4) + "\nR4: " + r4.toFixed(4) + " | S4: " + s4.toFixed(4) + "\nOP : " + op + " Win : " + ww + " Los : " + ll + "\nHasil $ " + myTotal.toFixed(2));
		if (spots[b] <= mids3)
		{
			macro = "CODE:";
			macro += "TAG POS=1 TYPE=BUTTON FORM=NAME:orderform ATTR=NAME:btn_buybet_10 \n";
			macro += "WAIT SECONDS=" + ((5 * 2) + 10) + "\n";
			macro += "TAG POS=1 TYPE=SPAN ATTR=ID:contract-outcome-label extract=txt" + "\n";
			iimPlay(macro);
			hasil = iimGetLastExtract(1);
			macro = "CODE:";
			macro += "TAG POS=1 TYPE=SPAN ATTR=ID:contract-outcome-profit extract=txt" + "\n";
			iimPlay(macro);
			profit = Number(iimGetLastExtract(1));
			if (hasil == "Loss")
			{
				loss++;
				ll += 1;
				myTotal += (profit);
				totaloss -= profit;
				stake1 = (0.5 + totaloss) * 100 / 97;
				iimPlay("CODE:TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:form0 ATTR=NAME:amount CONTENT=" + stake1);
				win = 0;
				op++;
				//b=0;
			}
			else if (hasil == "Profit")
			{
				win++;
				loss = 0;
				ww += 1;
				myTotal += profit;
				totaloss = 0;
				stake1 = stake;
				iimPlay("CODE:TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:form0 ATTR=NAME:amount CONTENT=" + stake1);
				op++;
				b = 0;
			}
			macro = "CODE:";
			macro += "TAB T=1\n";
			macro += "TAG POS=1 TYPE=A ATTR=TXT:x\n";
			iimPlay(macro);
		}
		if (spots[b] >= midr3)
		{
			macro = "CODE:";
			macro += "TAG POS=1 TYPE=BUTTON FORM=NAME:orderform ATTR=NAME:btn_buybet_20 \n";
			macro += "WAIT SECONDS=" + ((5 * 2) + 10) + "\n";
			macro += "TAG POS=1 TYPE=SPAN ATTR=ID:contract-outcome-label extract=txt" + "\n";
			iimPlay(macro);
			hasil = iimGetLastExtract(1);
			macro = "CODE:";
			macro += "TAG POS=1 TYPE=SPAN ATTR=ID:contract-outcome-profit extract=txt" + "\n";
			iimPlay(macro);
			profit = Number(iimGetLastExtract(1));
			if (hasil == "Loss")
			{
				loss++;
				ll += 1;
				myTotal += (profit);
				totaloss -= profit;
				stake1 = (0.5 + totaloss) * 100 / 97;
				iimPlay("CODE:TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:form0 ATTR=NAME:amount CONTENT=" + stake1);
				win = 0;
				op++;
				//b=0;
			}
			else if (hasil == "Profit")
			{
				win++;
				loss = 0;
				ww += 1;
				myTotal += profit;
				totaloss = 0;
				stake1 = stake;
				iimPlay("CODE:TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:form0 ATTR=NAME:amount CONTENT=" + stake1);
				op++;
				b = 0;
			}
			macro = "CODE:";
			macro += "TAB T=1\n";
			macro += "TAG POS=1 TYPE=A ATTR=TXT:x\n";
			iimPlay(macro);
		}
	}
	if (myTotal.toFixed(2) <= slx)
	{
		alert("Stop Loss" + "\n" + "Masih Ada Kesempatan Lain Waktu :)");
		break;
	}
	if (myTotal.toFixed(2) >= tp)
	{
		alert("Hasil : $ " + myTotal.toFixed(2) + "\nAlhamdulillah");
		break;
	}
}
