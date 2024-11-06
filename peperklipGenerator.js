

function peperklipGenerator(){

// capitalization functions
        function firstCapitalizer(word){
        word = word.split("");
        capWord = ""
        word[0] = word[0].toUpperCase();
        for (let i = 0; i<word.length; i++){
            capWord += word[i]
        }
        return (capWord)
    }
    
    function lastCapitalizer(lastName){
        let wordcounter= lastName.split(" ")
        wordcounter = wordcounter.length
        
        if (wordcounter==1){
            return firstCapitalizer(lastName)
        }else{
            let last = lastName.split(" ")
            last.push(firstCapitalizer(last.pop()))
            let capLast = "";
            for (let i = 0; i<last.length; i++){
                capLast+=last[i] + " "
            }
            return capLast
        }
    }
    

//Fetching form data:
    //Persona
const voornaam_leerling =   firstCapitalizer(document.getElementById('voornaam-leerling').value);
const achternaam_leerling = lastCapitalizer(document.getElementById('achternaam-leerling').value);
const voor_achternaam =     voornaam_leerling + " " + achternaam_leerling;  
const datum_afname =        document.getElementById('datum').value.split("-").reverse().join("-");
const afgenomen_door =      document.getElementById('afname-door').value;
const geslacht_leerling =   document.querySelector('input[name="geslacht-leerling"]:checked').value;
//const vestiging =           document.getElementById('vestiging').value;
    //Scores
const score_visueel =     document.getElementById('score-visueel').value;
const score_auditief =    document.getElementById('score-auditief').value;
const score_tekstueel =   document.getElementById('score-tekstueel').value;
const score_samen_leren = document.getElementById('score-samenleren').value;
const score_planning =    document.getElementById('score-planning').value;
const score_beweging =    document.getElementById('score-beweging').value;
    
//image data
const imgLogo1 = fimg1();
const imgLogo2 = fimg2();
const imgLogo3 = fimg3();
const imgLogo4 = fimg4();
const ulPage2  = fimg5();
var scoreGraph = document.getElementById('grafiek').value;


/*
// development variables activate for maintenance.   
const voornaam_leerling = "Friso";
const achternaam_leerling = "de Rooij";
const voor_achternaam = voornaam_leerling +" " + achternaam_leerling;  
const datum_afname = "04-12-2000";
const afgenomen_door = "Frisoderooij";
const geslacht_leerling = "Man";
const score_visueel = Math.random()*20;
const score_auditief = Math.random()*20;
const score_tekstueel = Math.random()*20;
const score_samen_leren = Math.random()*20;
const score_planning = Math.random()*20;
const score_beweging = Math.random()*20; 
*/

//verwerking geslacht variabelen
  if(geslacht_leerling == "Man"){
  var hz = "hij";
  var zh = "zijn";
 }else{
  var hz = "zij";
  var zh = "haar";
 }


//---------------------jsPDF setup & global variables----------------------
var doc = new jsPDF('p','cm','a4'); //ppi 72
doc.setTextColor(5,20,78);
var margin_left = 2.5;
var margin_left_H1 = 3.75;
var margin_top = 5;
var line_distance = 1.15;
    
// personalized section variables
var yPos = 5;
var lastLine = 26;
//add info
    //---------------------first page (frontpage)----------------------
    doc.addImage(imgLogo2, 'jpg', 4.59,4.32,11.8,7.88);
    doc.addImage(imgLogo4, 'jpg', 5.54,12.63,9.9,6.4);
    doc.setFont('Arial','bold').setFontSize(15).text("Verslaglegging",2.5,22.48).setFont('Arial','bold').setFontSize(11);
        //Shaping & positioning table 
    let top = 23.25;
    let bottom = top +(4*1.0+0*0.176-0.4);
    let left = 2.5;
    let right = 17.5;
    doc.setLineWidth(0.0352777778).line(left,top,right,top); //outer line top horizontal
    doc.line(left,top,left,bottom); //outer line left vertical
    doc.line(left,bottom,right,bottom);//outer line bottom horizontal
    doc.line(right,top,right,bottom);//outer line right vertical
    doc.line(left,top+1,right,top+1); //line 2 horizontal
    doc.line(left,top+2,right,top+2); //line 3 horizontal
    doc.line(left+3.36,top,left+3.36,bottom);//line 2 vertical
        // contents table
    doc.text("Naam leerling", left+0.178, top+0.6);
    doc.text("Datum afname", left+0.178, top+1.6);
    doc.text("Afgenomen", left+0.178, top+2.6);
    doc.text("door", left+0.178, top+3.2);
    doc.text(voor_achternaam, left+3.36+0.178,top+0.6);
    doc.text(datum_afname, left+3.36+0.178, top+1.6);
    doc.text(afgenomen_door, left+3.36+0.178, top+2.6);
    
    //---------------------Second Page (introduction)---------------------- 
        //page setup
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
        //page contents
    doc.text("Inleiding",margin_left_H1,5).setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');
    doc.text(margin_left,5.75, doc.splitTextToSize('Wij hebben de Peperklip geschreven en ontworpen, omdat wij geloven dat ieder mens zijn of haar eigen leervoorkeuren heeft. Iedereen kan leren, maar wel op zijn of haar eigen manier. Als je je bewust bent van jouw leervoorkeuren kan leren weer leuk worden. Het gaat dus om het ontdekken van jouw leertalent! ',16));
    doc.text(margin_left,5.75+2.30,"De Peperklip doet dit op een zestal gebieden:");
    doc.addImage(ulPage2,0,5.75+2.45,21,3)
    doc.text(margin_left,5.75+6.15, doc.splitTextToSize('In deze verslaglegging wordt er gekeken naar de interpretatie van de scores en wordt een persoonlijk advies gegeven. In de bijlage vindt u de score.',16));
    
    //---------------------Third Page (Table of Contents)----------------------
        //page setup
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
        //page contents
    doc.text("Inhoudsopgave",margin_left,5).setFontSize(11);
    doc.text("Uitleg interpretatie scores Peperklip",margin_left,6.15).setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');
    doc.text("Hoge scores",margin_left+0.75,6.75);
    doc.text("Gemiddelde scores",margin_left+0.75,6.75+0.6);
    doc.text("Lage scores",margin_left+0.75,6.75+1.2).setFontSize(11).setFont('arial','bold');
    
    doc.text("Persoonlijk advies "+ voor_achternaam, margin_left,7.95+1.15).setFontSize(11).setFont('arial','normal');
    doc.text("Visueel",margin_left+0.75,9.1+1*0.6);
    doc.text("Auditief",margin_left+0.75,9.1+2*0.6);
    doc.text("Tekstueel",margin_left+0.75,9.1+3*0.6);
    doc.text("Samen leren",margin_left+0.75,9.1+4*0.6);
    doc.text("Planning",margin_left+0.75,9.1+5*0.6);
    doc.text("Bewegingsbehoefte",margin_left+0.75,9.1+6*0.6).setFont('arial','bold');
    
    doc.text("Bijlage scores "+ voor_achternaam, margin_left,12.7+1.15).setFontSize(11).setFont('arial','normal')
    
    //---------------------fourth Page (explanation scores)----------------------
        //page setup
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    doc.text("Uitleg interpretatie scores Peperklip",margin_left,5).setFontSize(11).setFont('arial','normal');

        //page contents
    doc.text(margin_left,6.15, doc.splitTextToSize('In dit hoofdstuk wordt toegelicht hoe de scores van de Peperklip geïnterpreteerd moeten worden. Iedere leervoorkeur heeft 20 stellingen en er kan dus maximaal 20 keer voor een leervoorkeur gekozen worden. Het diagram geeft de scores weer in punten. ',16));
    doc.text('0 – 5 punten',margin_left,7.95).setFont('arial','bold'); doc.text('Laag',7.50,7.95).setFont('arial','normal');
    doc.text('6 – 10 punten',margin_left,7.95+0.6).setFont('arial','bold'); doc.text('Laag gemiddeld',7.50,7.95+0.6).setFont('arial','normal');
    doc.text('11 – 15 punten',margin_left,7.95+1.2).setFont('arial','bold'); doc.text('Hoog gemiddeld',7.50,7.95+1.2).setFont('arial','normal');
    doc.text('16 – 20 punten',margin_left,7.95+1.8).setFont('arial','bold'); doc.text('Hoog',7.50,7.95+1.8).setFont('arial','normal');
    doc.addImage(imgLogo3,'jpg',margin_left,10.35,15.11,7.74)
    doc.text('De leerling in bovenstaand voorbeeld heeft de volgende scores:',margin_left,18.09).setFontSize(11).setFont('arial','bold');
    
    doc.text('Leervoorkeur',margin_left, 18.69); doc.text('Score',margin_left+6, 18.69);doc.text('Interpretatie',margin_left+12, 18.69).setFont('arial','normal');
    doc.text('Tekstueel',margin_left, 19.29); doc.text('7 punten',margin_left+6, 19.29);doc.text('Laag gemiddeld',margin_left+12, 19.29);
    doc.text('Visueel',margin_left, 19.89); doc.text('14 punten',margin_left+6, 19.89);doc.text('Hoog gemiddeld',margin_left+12, 19.89);
    doc.text('Auditief',margin_left, 20.49); doc.text('10 punten',margin_left+6, 20.49);doc.text('Laag gemiddeld',margin_left+12, 20.49);
    doc.text('Planningsbehoefte',margin_left, 21.09); doc.text('7 punten',margin_left+6, 21.09);doc.text('Laag gemiddeld',margin_left+12, 21.09);
    doc.text('Bewegingsbehoefte',margin_left, 21.69); doc.text('6 punten',margin_left+6, 21.69);doc.text('Laag gemiddeld',margin_left+12, 21.69);
    doc.text('Samen leren',margin_left, 22.29); doc.text('16 punten',margin_left+6, 22.29);doc.text('Hoog',margin_left+12, 22.29);
    
    //---------------------fourth Page (explanation scores)----------------------
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold','emphasis');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    
    doc.text("Hoge scores",margin_left,5).setFontSize(11).setFont('arial','normal');
    doc.text(margin_left,6.15,doc.splitTextToSize("Voor een hoge score geldt dat de informatie via die ingang goed of zeer goed binnenkomt. De leervoorkeur past goed bij de leerling en is een belangrijke manier van leren. Het is fijn als de leerling weet welke leerstrategieën goed passen bij deze hoge score.",16));
    
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold','emphasis')
    doc.text("Gemiddelde scores",margin_left,9.15).setFontSize(11).setFont('arial','normal');
    doc.text(margin_left,10.30,doc.splitTextToSize("Leervoorkeuren met gemiddelde scores zijn prima manieren van leren voor de leerling. Een hoge score kost waarschijnlijk minder moeite, maar ook gemiddelde scores worden meestal veelvuldig gebruikt bij het leren.",16));
    
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold','emphasis')
    doc.text("Lage scores",margin_left,13.3).setFontSize(11).setFont('arial','normal');
    doc.text(margin_left,14.45,doc.splitTextToSize("Voor een lage score geldt dat de informatie via die ingang niet of nauwelijks binnenkomt. Het is aan jou als coach om de leerling leerstrategieën aan te leren die wel passen of om combinaties te maken van verschillende leervoorkeuren. Hieronder zijn per leervoorkeur een aantal passende combinaties gemaakt.",16));
    
    //---------------------fifth Page (start personalized section)----------------------
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold','emphasis');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    doc.text("Persoonlijk advies " + voor_achternaam,margin_left,margin_top).setFontSize(11).setFont('arial','normal');
    yPos += 0.6
    //doc.text(margin_left,5.75,doc.splitTextToSize(("In dit hoofdstuk wordt een kort advies gegeven aan de hand van de scores van " + voornaam_leerling + ". De staafdiagram met deze scores is bijgevoegd als bijlage."),16))
    
        //---------------------setting up functions for appending modules to document----------------------
    function appendParagraph(par, addSpacing){
        var lineHeight = doc.getLineHeight(par) / doc.internal.scaleFactor;
        var splittedText = doc.splitTextToSize(par, 16);
        var lines = splittedText.length;
        var blockHeight = lines * lineHeight;
        //test if paragraph to append fits within current page
        if ((yPos + blockHeight)<lastLine){
            doc.text(margin_left,yPos, splittedText);
            yPos += blockHeight + lineHeight * addSpacing
            return lineHeight
        }else{
            doc.addPage();
            //doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold','emphasis');
            doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
            yPos = 5;
            doc.text(margin_left,yPos, splittedText)
            yPos += blockHeight;
        }
    }
    function appendH1(header, scoreType, addSpacing){
        // scoreType header
        doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold','emphasis');
        var lineHeight = doc.getLineHeight(header) / doc.internal.scaleFactor;
        doc.text(header,margin_left, yPos);
        yPos += lineHeight + 0.15
        // scoreType score
        doc.setFontSize(11).setFont('arial','bold')
        doc.text(("SCORE: " + scoreType.toString()),margin_left, yPos)
        var lineHeight = doc.getLineHeight(header) / doc.internal.scaleFactor;
        yPos += lineHeight+0.1 + lineHeight*addSpacing;
        doc.setFontSize(11).setFont('arial','normal')
    }
    function appendScoreDesc(desc){
        var lineHeight = doc.getLineHeight(desc) / doc.internal.scaleFactor;
        var splittedText = doc.splitTextToSize(desc, 16);
        var lines = splittedText.length;
        var blockHeight = lines * lineHeight;
        doc.text(splittedText,margin_left,yPos);
        yPos += blockHeight + lineHeight
    }
    function appendHML(head, HML, addSpacing){
        var lineHeight = doc.getLineHeight(HML) / doc.internal.scaleFactor;
        var splittedText = doc.splitTextToSize(HML, 16);
        var lines = splittedText.length;
        var blockHeight = lines * lineHeight;
        //test if paragraph to append fits within current page
        if ((yPos + blockHeight+lineHeight)<lastLine){
            doc.setFontSize(11).setFont('arial','bold')
            doc.text(margin_left, yPos, head);
            yPos += lineHeight;
            doc.setFontSize(11).setFont('arial','normal');
            doc.text(margin_left,yPos, splittedText);
            yPos += blockHeight + lineHeight * addSpacing;
            return lineHeight
        }else{
            doc.addPage();
            //doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold','emphasis');
            doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
            yPos = 5;
            doc.setFontSize(11).setFont('arial','bold')
            doc.text(margin_left, yPos, head);
            yPos += lineHeight;
            doc.setFontSize(11).setFont('arial','normal');
            doc.text(margin_left,yPos, splittedText);
            yPos += blockHeight + lineHeight * addSpacing
        }
    }
    function appendStrategy(arr){
        if((yPos + arr.length * 0.4462647814166666)>= lastLine){
            doc.addPage();
            doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
            yPos = 5;
        }
        for(let i =0; i<arr.length; i++){
            appendParagraph(arr[i],0)
        }
        yPos += 3*0.4462647814166666
    }
    
    appendParagraph("In dit hoofdstuk wordt een kort advies gegeven aan de hand van de scores van " + voornaam_leerling + ". De staafdiagram met deze scores is bijgevoegd als bijlage.", 2)
    
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
            //chapter visueel section 1
    const stratHVisueel = ["Leerstrategieën","- Kleur gebruiken bij het maken van samenvattingen of aantekeningen;","- Mindmaps maken met kleur en afbeeldingen;","- Tekeningen maken over de lesstof;","- Filmpjes bekijken over de lesstof."]
    const stratLVisueel = ["Leerstrategieën","- De begeleidende tekst gebruiken om de afbeelding te begrijpen;","- De afbeelding doorspreken met een klasgenoot, leerkracht of ouder/verzorger;","- Een stappenplan gebruiken om de afbeelding te begrijpen."]
    
    appendH1("Visueel", score_visueel,0)
    appendScoreDesc("Deze leervoorkeur gaat over alle informatie die via beelden aangeboden wordt. Dit zijn afbeeldingen, bronnen, diagrammen of filmpjes.", 1);
    if(score_visueel < 5){
       appendHML("Laag - visueel", ("Een leerling met een lage score op visueel heeft vaak moeite om de juiste informatie uit een afbeelding of bron te halen. Zij zijn gewend om de geschreven ondertitel te gebruiken of slaan de afbeeldingen in een tekst over. Afbeeldingen in een tekst kunnen ook storend zijn, net als het gebruik van (te)veel kleuren. Het is voor "+ voornaam_leerling +" belangrijk om zijn andere leervoorkeuren te gebruiken ter ondersteuning van zijn lage visuele score."), 1) 
    }else if (score_visueel < 10){
        appendHML("Gemiddeld (laag en hoog)", ("Leerlingen met een gemiddelde visuele score kunnen prima leren met behulp van afbeeldingen of filmpjes. Er zijn waarschijnlijk andere leervoorkeuren die beter bij "+ voornaam_leerling +" passen, maar de informatie komt wel binnen."), 1)
    }else if (score_visueel < 15){
        appendHML("Gemiddeld (laag en hoog)", ("Leerlingen met een gemiddelde visuele score kunnen prima leren met behulp van afbeeldingen of filmpjes. Er zijn waarschijnlijk andere leervoorkeuren die beter bij "+ voornaam_leerling +" passen, maar de informatie komt wel binnen."), 1);
        appendStrategy(stratHVisueel);
    }else{
        appendHML("Hoog- visueel", ("Een hoge visuele score betekent dat de leerling informatie uit afbeeldingen goed kan opnemen. "+ voornaam_leerling +" vindt het vaak fijn om kleur te gebruiken of filmpjes te kijken over de leerstof."), 1);
        appendStrategy(stratHVisueel);
    }
    
            //chapter visueel section 2 (Only if score is below 10)
    if(score_visueel < 10  & score_tekstueel >=10){
        appendHML("Visueel laag in combinatie met tekstueel hoog",voornaam_leerling + " scoort visueel laag, maar kan met " + zh + " hoge tekstuele score goed gebruik maken van het geschreven onderschrift bij afbeeldingen. Ook kan "+ voornaam_leerling + " eerst de tekst goed doornemen en met die kennis daarna de afbeeldingen bestuderen.",1)
    }
    if(score_visueel < 10  & score_auditief >=10){
        appendHML("Visueel laag in combinatie met auditief hoog",voornaam_leerling + " scoort visueel laag, maar kan met " + zh + " hoge auditieve score het beste gebruik maken van filmpjes waarin ook gesproken tekst gebruikt wordt. Tevens kan "+ voornaam_leerling + " de mondelinge uitleg van de leerkracht afwachten, alvorens naar een afbeelding te kijken.",1)
    }
    if(score_visueel < 10  & score_planning >=10){
        appendHML("Visueel laag in combinatie met planning hoog",voornaam_leerling + " scoort visueel laag, maar kan met " + zh + " hoge planningsbehoefte bij voorkeur gebruik maken van stappenplannen bij het bekijken en analyseren van afbeeldingen of bronnen.",1)
    }
            //chapter visueel section 3 (only if score is below 10)
    if(score_visueel < 10){
        appendStrategy(stratLVisueel)
    }
    
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
            //chapter auditief section 1
    if(yPos > 22.6){
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    yPos = 5
    }
    
    const stratHAuditief = ["Leerstrategieën:","- Teksten hardop voorlezen;", "- Filmpjes luisteren over de leerstof;", "- Teksten laten voorlezen;","- Mondeling uitleg opnemen en later terugluisteren."];
    const stratLAuditief = ["Leerstrategieën:", "- Maak aantekeningen tijdens het luisteren in de les;", "- Bereid de les voor door het hoofdstuk alvast te lezen;","- Bespreek na de les met een klasgenoot wat de leerkracht verteld heeft."];
    
    appendH1("Auditief", score_auditief,0)
    appendScoreDesc("Deze leervoorkeur gaat over alle informatie die via de oren binnenkomt. Mondelinge uitleg, filmpjes waarin gesproken wordt of voorgelezen teksten.", 1);
    
    if(score_auditief < 5){
       appendHML("Laag - auditief", ("Een leerling die laag scoort op auditief neemt informatie die via zijn of haar oren binnenkomt niet goed op. Auditieve informatie is vaak storend en vermoeiend. Om de auditieve informatie toch op te nemen, is het belangrijk dat "+ voornaam_leerling +" andere leervoorkeuren inzet."), 1) 
    }else if(score_auditief < 10){
       appendHML("Gemiddeld (laag en hoog) - auditief", ("Bij leerlingen met een gemiddelde auditieve score komt de informatie die de leerling hoort wel binnen. Waarschijnlijk zijn er andere leervoorkeuren die "+ voornaam_leerling +" prettiger vindt, maar de informatie komt wel binnen. Het is voor "+voornaam_leerling+" aan te raden om andere leervoorkeuren te gebruiken als er geluisterd moet worden."), 1) 
    }else if(score_auditief < 15){
       appendHML("Gemiddeld (laag en hoog) - auditief", ("Bij leerlingen met een gemiddelde auditieve score komt de informatie die de leerling hoort wel binnen. Waarschijnlijk zijn er andere leervoorkeuren die "+ voornaam_leerling +" prettiger vindt, maar de informatie komt wel binnen. Het is voor "+voornaam_leerling+" aan te raden om andere leervoorkeuren te gebruiken als er geluisterd moet worden."), 1) 
       appendStrategy(stratHAuditief)
    }else{
       appendHML("Hoog- auditief", ("Een leerling die auditief hoog scoort vindt het waarschijnlijk fijn om naar informatie te luisteren. Een leerkracht die tijdens de les veel informatie geeft door te vertellen, heeft "+ zh +" voorkeur. Als er niemand is om te vertellen over de leerstof, dan kan "+voornaam_leerling+" de tekst hardop voorlezen en luisteren naar " +zh+" eigen stem."), 1) 
       appendStrategy(stratHAuditief)
    }
    
    //chapter visueel section 2 (Only if score is below 10)
    if(score_auditief < 10  & score_tekstueel >=10){
        appendHML("Auditief laag in combinatie met tekstueel hoog",voornaam_leerling + " heeft een lage score op auditief, maar kan met " + zh + " hoge tekstuele score goed aantekeningen maken tijdens het luisteren. Ook kan "+ voornaam_leerling + " zich voorbereiden op een les door het hoofdstuk of de paragraaf goed door te lezen.",1)
    }
    if(score_auditief < 10  & score_beweging >=10){
        appendHML("Auditief laag in combinatie met bewegingsbehoefte hoog",voornaam_leerling + " heeft een lage score op auditief, maar kan met " + zh + " hoge bewegingsbehoefte knijpen in een stressballetje of spelen met een tangle tijdens het luisteren. Dit verhoogt de concentratie die "+ voornaam_leerling + " juist zo nodig heeft voor het luisteren.",1)
    }
    if(score_auditief < 10  & score_samen_leren >=10){
        appendHML("Auditief laag in combinatie met samen leren hoog",voornaam_leerling + " heeft een lage score op auditief, maar kan met " + zh + " hoge score op samen leren bij voorkeur ook ‘samen’ luisteren. Dit kan door zo nu en dan vragen te stellen aan een klasgenoot en dit kan ook door na de les de besproken stof door te spreken met een klasgenoot of met de leerkracht.",1)
    }
    
    
    //chapter auditief section 3 (only if score is below 10)
    if(score_auditief < 10){
        appendStrategy(stratLAuditief)
    }
    
    
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //chapter tekstueel section 1
    if(yPos > 22.6){
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    yPos = 5
    }
    
    const stratHTekstueel = ["Leerstrategieën", "- Aantekeningen maken tijdens de les;", "- De paragraaf of het hoofdstuk alvast voorbereiden door het helemaal te lezen;", "- Samenvattingen maken van de lesstof."];
    const stratLTekstueel = ["Leerstrategieën:", "- Tekeningen maken bij de tekst;", "- Kleur gebruiken tijdens het lezen van de tekst;", "- De tekst laten voorlezen door een klasgenoot of ouder/verzorger;", "- De tekst nabespreken met een klasgenoot."];
    
    appendH1("Tekstueel", score_tekstueel,0)
    appendScoreDesc("Deze leervoorkeur gaat over alle informatie die via tekst aangeboden wordt. Het onderwijssysteem in Nederland is tekstueel ingericht. De leerlingen leren het meest uit boeken.",1);
    
    if(score_tekstueel < 5){
       appendHML("Laag - tekstueel", ("Informatie die aangeboden wordt door tekst komt bij een leerling met een lage score niet goed binnen. Het is in dit geval belangrijk om leervoorkeuren met een gemiddelde of hoge score te combineren met het leren van teksten. Het lezen van teksten kan vermoeiend zijn en is voor "+ voornaam_leerling +" meestal niet ontspannend."), 1) 
    }else if(score_tekstueel < 10){
       appendHML("Gemiddeld (laag en hoog) - tekstueel", ("Een gemiddelde score geeft aan dat informatie via tekst binnenkomt, maar dat er wellicht andere leervoorkeuren zijn waar "+ voornaam_leerling +" meer mee kan bereiken. Een gemiddelde score geeft aan dat "+voornaam_leerling+" een tekst meerdere keren moet lezen om de informatie goed te kunnen onthouden."), 1) 
    }else if(score_tekstueel < 15){
       appendHML("Gemiddeld (laag en hoog) - tekstueel", ("Een gemiddelde score geeft aan dat informatie via tekst binnenkomt, maar dat er wellicht andere leervoorkeuren zijn waar "+ voornaam_leerling +" meer mee kan bereiken. Een gemiddelde score geeft aan dat "+voornaam_leerling+" een tekst meerdere keren moet lezen om de informatie goed te kunnen onthouden."), 1);
       appendStrategy(stratHTekstueel)
    }else{
       appendHML("Hoog- tekstueel", ("Als een leerling hoog scoort op tekstueel dan is het lezen van tekst voor hem of haar een fijne en belangrijke manier van leren. Als "+voornaam_leerling+" een tekst één of twee keer goed doorgelezen heeft, dan zit de informatie vaak wel in " +zh+" hoofd. Deze leerlingen lezen vaak ook in hun vrije tijd."), 1)
       appendStrategy(stratHTekstueel)}

    //chapter tekstueel section 2 (Only if score is below 10)
    if(score_tekstueel < 10  & score_auditief >=10){
        appendHML("Tekstueel laag in combinatie met auditief hoog",voornaam_leerling + " scoort tekstueel laag, maar kan met " + zh + " hoge auditieve score wel veel informatie opnemen tijdens de les zelf. Leerkrachten vertellen vaak veel en "+ voornaam_leerling + " kan deze informatie goed opnemen. Ook kan "+voornaam_leerling+" de tekst laten voorlezen of zelf hardop voorlezen.",1);
    }
    if(score_tekstueel < 10  & score_visueel >=10){
        appendHML("Tekstueel laag in combinatie met visueel hoog",voornaam_leerling + " scoort tekstueel laag, maar kan met " + zh + " hoge visuele score het beste gebruik maken van kleuren en afbeeldingen om de hersenen de informatie beter te laten opnemen. Ook kan "+ voornaam_leerling + " de tekst omzetten in schema’s, afbeeldingen of mindmaps.",1);
    }
    if(score_tekstueel < 10  & score_planning >=10){
        appendHML("Tekstueel laag in combinatie met planningsbehoefte hoog",voornaam_leerling + " scoort tekstueel laag, maar kan in combinatie met " + zh + " hoge planningsbehoefte, het beste schema’s en overzichten maken van de tekst. Zo krijgt "+ voornaam_leerling + " zoveel mogelijk overzicht.",1);
    }
    if(score_tekstueel < 10  & score_beweging >=10){
        appendHML("Tekstueel laag in combinatie met bewegingsbehoefte hoog",voornaam_leerling + " scoort tekstueel laag, maar kan met " + zh + " hoge bewegingsbehoefte teksten gaan lezen terwijl hij of zij aan het fietsen is op een hometrainer. Ook kan "+ voornaam_leerling + " gebruik maken van stressballetjes en tangles om de hersenen beweging te laten registreren.",1);
    }
    if(score_tekstueel < 10  & score_samen_leren >=10){
        appendHML("Tekstueel laag in combinatie met samen leren hoog",voornaam_leerling + " scoort tekstueel laag, maar kan met " + zh + " hoge score op samen leren bij voorkeur de tekst samen met iemand anders doornemen. Dit kan per paragraaf met een leerkracht of een begeleider, maar dit kan ook naast een klasgenoot waardoor er zo nu en dan overlegd kan worden.",1);
    }
    
    //chapter tekstueel section 3 (only if score is below 10)
    if(score_tekstueel < 10){
        appendStrategy(stratLTekstueel)
    }
    
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //chapter Samen Leren section 1
    if(yPos > 22.6){
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    yPos = 5
    }
    
    const stratHSamenleren = ["Leerstrategieën:", "- De lesstof na de les doorspreken met een klasgenoot;", "- De leerstof laten overhoren door een begeleider of ouder/verzorger;","- Tijdens het huiswerk maken via e-mail of sms vragen stellen aan klasgenoten;","- Leren in een omgeving met andere mensen."];
    const stratLSamenleren = ["Leerstrategieën:","- Duidelijke afspraken maken en taken verdelen als er samengewerkt moet worden;","- Een rustige werkplek creëren als er geleerd moet worden;","- Afspreken om te communiceren via e-mail of sms."];
    
    appendH1("Samen leren", score_samen_leren,1)
    
    if(score_samen_leren < 5){
       appendHML("Laag - samen leren", ("Een leerling met een lage score op samen leren vindt het meestal niet fijn om met iemand anders te leren. Dit kan variëren van het maken van een opdracht samen tot het leren in een ruimte met andere mensen. Soms kan samen leren storend zijn voor "+ voornaam_leerling), 1); 
    }else if(score_samen_leren < 10){
       appendHML("Gemiddeld (laag en hoog) - samen leren", ("Een leerling met een gemiddelde score kan goed samenwerken met anderen, maar kan het ook prettig vinden om alleen te leren. Het kan zijn dat "+ voornaam_leerling +" een voorkeur heeft voor alleen leren, maar dat neemt niet weg dat "+voornaam_leerling+" wel samen kan leren."), 1);
    }else if(score_samen_leren < 15){
       appendHML("Gemiddeld (laag en hoog) - samen leren", ("Een leerling met een gemiddelde score kan goed samenwerken met anderen, maar kan het ook prettig vinden om alleen te leren. Het kan zijn dat "+ voornaam_leerling +" een voorkeur heeft voor alleen leren, maar dat neemt niet weg dat "+voornaam_leerling+" wel samen kan leren."), 1);
       appendStrategy(stratHSamenleren)
    }else{
       appendHML("Hoog - samen leren", ("Leerlingen met een hoge score op samen leren vinden het prettig om samen met anderen te leren. Zij leren het liefst beneden aan de keukentafel en bespreken graag de leerstof door met een klasgenoot, leerkracht of ouder/verzorger. In sommige gevallen heeft "+voornaam_leerling+" samen leren nodig om te kunnen leren."), 1)
       appendStrategy(stratHSamenleren)}
    
    
    //chapter tekstueel section 2 (Only if score is below 10)
    if(score_samen_leren < 10  & score_tekstueel >=10){
        appendHML("Samen leren laag in combinatie met tekstueel hoog",voornaam_leerling + " heeft een lage score op samen leren, maar in combinatie met " + zh + " hoge tekstuele score kan "+ hz + " soms beter communiceren per e-mail of what’s app. "+voornaam_leerling+" kan vaak beter verwoorden wat hij of zij wil in geschreven tekst.",1);
    }
     if(score_samen_leren < 10  & score_planning >=10){
        appendHML("Samen leren laag in combinatie met planningsbehoefte hoog",voornaam_leerling + " heeft een lage score op samen leren en in combinatie met " + zh + " hoge planningsbehoefte heeft "+ voornaam_leerling + " er baat bij als er duidelijke afspraken gemaakt worden. Een stappenplan, een taakverdeling en een lijst met afspraken.",1);
    }
    
    //chapter Samen Leren section 3 (only if score is below 10)
    if(score_samen_leren < 10){
        appendStrategy(stratLSamenleren)
    }
    
    
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //chapter planning section 1
    if(yPos > 22.6){
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    yPos = 5
    }
    
    const stratHPlanning = ["Leerstrategieën:", "- Werken met stappenplannen;","- Werken met planningen voor huiswerk en proefwerken;","- Aantekeningen maken op gestructureerde bladen;","- Tijdbalken en schema’s maken voor informatie die ongestructureerd aangeboden wordt."];
    const stratLPlanning = ["Leerstrategieën:","- Eerst de samenvatting lezen voor je aan het hoofdstuk begint;","- Voor ieder nieuw hoofdstuk een tijdbalk maken;","- Voor ieder nieuw hoofdstuk de grote lijnen doorspreken met een klasgenoot of de leerkracht."];
    
    appendH1("Planning", score_planning,1)
    
    if(score_planning < 5){
       appendHML("Laag - planningsbehoefte", ("Een leerling met een lage planningsbehoefte vindt het niet prettig als informatie te gestructureerd aangeboden wordt. Het is voor "+ voornaam_leerling + " fijn en belangrijk om eerst de hoofdlijnen te kennen en dan de details in te vullen. Leerkrachten die informatie zeer gestructureerd en stap voor stap aanbieden, hebben meestal niet " + zh + " voorkeur."), 1); 
    }else if(score_planning < 10){
       appendHML("Gemiddeld (laag en hoog) - planningsbehoefte", ("Een leerling met een gemiddelde planningsbehoefte heeft meestal een voorkeur voor informatie die gestructureerd wordt aangeboden. "+ voornaam_leerling +" kan over het algemeen ook omgaan met informatie die minder gestructureerd wordt aangeboden."), 1);
    }else if(score_planning < 15){
       appendHML("Gemiddeld (laag en hoog) - planningsbehoefte", ("Een leerling met een gemiddelde planningsbehoefte heeft meestal een voorkeur voor informatie die gestructureerd wordt aangeboden. "+ voornaam_leerling +" kan over het algemeen ook omgaan met informatie die minder gestructureerd wordt aangeboden."), 1);
       appendStrategy(stratHPlanning)
    }else{
       appendHML("Hoog - planningsbehoefte", ("Een hoge planningsbehoefte betekent dat "+voornaam_leerling+" de voorkeur heeft voor informatie die gestructureerd wordt aangeboden. " + voornaam_leerling + " vindt het fijn als er gewerkt wordt met een stappenplan of een studiewijzer. Informatie die ongestructureerd aangeboden wordt, kan " +voornaam_leerling + " vaak niet plaatsen en wordt als onprettig ervaren."), 1)
       appendStrategy(stratHPlanning)}
    
    //chapter planning section 2 (Only if score is below 10)
    if(score_planning < 10  & score_tekstueel >=10){
        appendHML("Planningsbehoefte laag in combinatie met tekstueel hoog",voornaam_leerling + " heeft een lage planningsbehoefte en heeft er met " + zh + " hoge tekstuele score baat bij om eerst de samenvatting van een hoofdstuk door te lezen. Zo weet "+ voornaam_leerling + " wat de hoofdlijnen van de paragraaf of het hoofdstuk zijn om zo de details te kunnen invullen.",1);
    }
    if(score_planning < 10  & score_visueel >=10){
        appendHML("Planningsbehoefte laag in combinatie met visueel hoog",voornaam_leerling + " heeft een lage planningsbehoefte en heeft er met " + zh + " hoge visuele score baat bij om een visueel overzicht te maken van een paragraaf of hoofdstuk. Dit kan met een tijdbalk of een overzicht met de hoofdlijnen.",1);
    }
    if(score_planning < 10  & score_samen_leren >=10){
        appendHML("Planningsbehoefte laag in combinatie met samen leren hoog",voornaam_leerling + " heeft een lage planningsbehoefte en heeft er met " + zh + " hoge score op samen leren baat bij om duidelijke afspraken te maken bij een samenwerking. Als "+ voornaam_leerling + " samenwerkt met een leerling met een hoge planningsbehoefte, dan zullen zij beiden anders aan de slag gaan.",1);
    }
    
    //chapter planning section 3 (only if score is below 10)
    if(score_planning < 10){
        appendStrategy(stratLPlanning)
    }
    
    
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    //chapter beweging section 1
    if(yPos > 22.6){
    doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
    yPos = 5
    }
    
    const stratHBeweging = ["Leerstrategieën:","- Regelmatig een rondje lopen tijdens het leren;","- Knijpen in een stressballetje tijdens het lezen;","- Woordjes leren fietsend of springend op een trampoline;","- Schema’s leren door stappen of klappen."];
    const stratLBeweging = ["Leerstrategieën:","- Een vaste plek kiezen waar voor langere tijd gewerkt kan worden;","- Zorgen voor een rustige leeromgeving zonder bewegende objecten;","- Zo nu en dan wisselen van vak of taak."];
    
    appendH1("Bewegingsbehoefte", score_beweging,1)
    
    if(score_beweging < 5){
       appendHML("Laag - bewegingsbehoefte", ("Leerlingen met een lage bewegingsbehoefte kunnen vrij lang geconcentreerd werken zonder te bewegen. Het kan zijn dat beweging "+ voornaam_leerling + " alleen maar afleidt en dat " + hz + " een opdracht liever in één keer afmaakt of een proefwerk in één keer leert."), 1); 
       appendStrategy(stratLBeweging);
    }else if(score_beweging < 10){
       appendHML("Gemiddeld (laag en hoog) - bewegingsbehoefte", ("Een leerling met een gemiddelde bewegingsbehoefte kan meestal een lesuur lang stilzitten en geconcentreerd werken. Dit is wel afhankelijk van "+ zh +" interesse en motivatie. Als "+voornaam_leerling+" aan het leren is, is het belangrijk dat er met enige regelmaat gewisseld wordt van vak of taak. Meestal vindt "+voornaam_leerling+" het fijn om na een lesuur weer even te mogen lopen."), 1);
       appendStrategy(stratLBeweging);
    }else if(score_beweging < 15){
       appendHML("Gemiddeld (laag en hoog) - bewegingsbehoefte", ("Een leerling met een gemiddelde bewegingsbehoefte kan meestal een lesuur lang stilzitten en geconcentreerd werken. Dit is wel afhankelijk van "+ zh +" interesse en motivatie. Als "+voornaam_leerling+" aan het leren is, is het belangrijk dat er met enige regelmaat gewisseld wordt van vak of taak. Meestal vindt "+voornaam_leerling+" het fijn om na een lesuur weer even te mogen lopen."), 1);
       appendStrategy(stratHBeweging)
    }else{
       appendHML("Hoog - bewegingsbehoefte", ("Leerlingen met een hoge bewegingsbehoefte hebben vaker beweging nodig om geconcentreerd te kunnen leren. Een heel lesuur leren zonder beweging is voor "+voornaam_leerling+" lastig. " + voornaam_leerling + " moet regelmatig wisselen van vak of taak."), 1)
       appendStrategy(stratHBeweging)}
    
    
    
 //---------------------Final Page (appendix)----------------------   
 doc.addPage();
    doc.setTextColor(5,20,78).setFontSize(15).setFont('arial','bold');
    doc.addImage(imgLogo1,'jpg',13.77,26.78,5.29,3.5);
        //page contents
    doc.text(("Bijlage scores "+voor_achternaam),margin_left_H1,5).setTextColor(5,20,78).setFontSize(11).setFont('arial','normal');   
    
    //convert image to base64 and adding it to the document
var inputse = document.getElementById("grafiek");
var fReader = new FileReader();
 function getBase64(file) {
    myPromise = new Promise(function(resolve) {
      var reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result)
      }
      reader.readAsDataURL(file);
    })
  }
 getBase64(inputse.files[0]);
const img = new Image()
var imageBase = "";
 myPromise.then((result) => {
  //console.log(result);
  img.src = result;
});
    
img.onload = () => {
  // await for the image to be fully loaded
    var contrast = 19.84375/9.2604166667
    var graphWidth = 15
    var graphHeight = 15/contrast
  doc.addImage(img,'png',2.5,5.5,graphWidth,graphHeight);
  
  //...
  // Closing line -> saving file file to user's desktop
  doc.save("Peperklip verslag "+voornaam_leerling+" "+ achternaam_leerling +".pdf")
};
}
