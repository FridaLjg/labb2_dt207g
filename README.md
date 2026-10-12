# CV Webbtjänst - Laboration 2
Detta respository innehåller kod för en REST-webbtjänst skapad med Node.js, Express och MySQL för hantering av arbetserfarenheter.
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
API:et är tillgängligt på följande adress vid lokal körning:
http://localhost:3000/workexperience

## Installation, databas
APIet använder en MySQL-databas.
Klona ner källkodsfilerna, kör kommando npm install för att installeranödvändiga npm-paket. Kör installations-skriptet install.js. 
Installations-skriptet skapar databastabeller enligt nedanstående: 

Tabell:workexperience

Fält:
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- companyname (VARCHAR(100), NOT NULL)
- jobtitle (VARCHAR(100), NOT NULL)
- location (VARCHAR(100), NOT NULL)

## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/workexperience     |Hämtar alla registrerade arbetserfarenheter.                                                      |
|POST   |/workexperience      |Lagrar en ny arbetserfarenhet.               |
|PUT    |/workexperience/:ID |Uppdaterar en existerande kurs med angivet ID. Kräver att ett kurs-objekt skickas med.|
|DELETE |/workexperience /:ID |Raderar en arbetserfarenhet med angivet ID.                                                       |

Ett arbetserfarenhetsobjekt returneras/skickas som JSON med följande struktur:
```
{
   "id": "1",
   "companyname": "Göteborgs Stad",
   "jobtitle": "Lärare",
   "location": "Göteborg"
}
```
