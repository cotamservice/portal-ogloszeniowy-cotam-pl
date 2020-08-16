const express = require('express');
const router = express.Router();
const soapRequest = require('easy-soap-request');

const wsdl = string = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/wsdl/UslugaBIRzewnPubl-ver11-prod.wsdl';
const url = string = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc';
const userKey = string = 'b70e75efa5da47fda9ea';

// const wsdl = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/wsdl/UslugaBIRzewnPubl-ver11-test.wsdl';
// const url = 'https://Wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc';
// const userKey = 'abcde12345abcde12345';


router.get('/login', (req, res) => {
    login((result) => {
        if (result) {
            res.json({success: true, sid: result});
        } else {
            res.json({success: false});
        }
    });
})

function login(cb) {
    const xml = `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>
        </soap:Header>
           <soap:Body>
              <ns:Zaloguj>
                 <ns:pKluczUzytkownika>${userKey}</ns:pKluczUzytkownika>
              </ns:Zaloguj>
           </soap:Body>
        </soap:Envelope>
    `;

    makeSOAPRequest(url, genHeaders(), xml, (result) => {
        cb(result.ZalogujResponse.ZalogujResult.toString());
    });
}

router.get('/logout/:sid', (req, res) => {
    let sid = req.params.sid;
    logout(sid, (result) => {
        console.log("SERVER GUS LOGOUT: " + result);
        if (result) {
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    });
})

function logout(sid, cb) {
    const xml = `
       <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
        xmlns:ns="http://CIS/BIR/PUBL/2014/07"> 
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"> 
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To> 
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj</wsa:Action> 
        </soap:Header> 
           <soap:Body> 
              <ns:Wyloguj> 
                 <ns:pIdentyfikatorSesji>${sid}</ns:pIdentyfikatorSesji> 
              </ns:Wyloguj> 
           </soap:Body> 
        </soap:Envelope> 
    `;

    makeSOAPRequest(url, genHeaders(sid), xml, (result) => {
        cb(result.WylogujResponse.WylogujResult);
    });
}

router.post('/get', (req, res) => {
    let data = {
        sid: req.body.sid,
        regon: req.body.regon,
        nip: req.body.nip,
        krs: req.body.krs,
    };
    getByData(data, (result) => {
        // console.log("GET RES: " + JSON.stringify(result, null, 4));
        if (result) {
            res.json({success: true, data: result});
        } else {
            res.json({success: false, data: null});
        }
    });
})

function getByData(data, cb) {
    const sid = data.sid;
    const regon = data.regon;
    const nip = data.nip;
    const krs = data.krs;

    let xml = `
       <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
        xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract"> 
           <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"> 
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To> 
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty</wsa:Action> 
        </soap:Header> 
           <soap:Body> 
              <ns:DaneSzukajPodmioty> 
                 <ns:pParametryWyszukiwania> 
                 `;
    if (regon && regon.length > 0) {
        xml += `<dat:Regon>${regon}</dat:Regon>`;
    }
    if (nip && nip.length > 0) {
        xml += `<dat:Nip>${nip}</dat:Nip>  `;
    }
    if (krs && krs.length > 0) {
        xml += `<dat:Krs>${krs}</dat:Krs>`;
    }
    xml += `             
                 </ns:pParametryWyszukiwania> 
              </ns:DaneSzukajPodmioty> 
           </soap:Body> 
        </soap:Envelope> 
    `;

    makeSOAPRequest(url, genHeaders(sid), xml, (result) => {
        xmlBody = result.DaneSzukajPodmiotyResponse.DaneSzukajPodmiotyResult;
        convertStringXml2Json(xmlBody, result => {
            cb(result.root.dane);
        });
    });
}

async function makeSOAPRequest(locationUrl, headers, xml, callback) {
    const {response} = await soapRequest({url: locationUrl, headers: headers, xml: xml, timeout: 1000});
    const {body} = response;

    let startIndex = body.indexOf('<s:Body') + 8;
    let endIndex = body.indexOf('</s:Body');
    let xmlBody = body.substring(startIndex, endIndex);

    convertStringXml2Json(xmlBody, result => {
        callback(result);
    });
}

function genHeaders(sid = '') {
    return {
        'Content-type': 'application/soap+xml; charset=utf-8',
        'soap_version': '2',
        'Accept': 'application/xop+xml',
        'sid': sid,
    };
}

function convertStringXml2Json(xml, cb) {
    const xml2js = require('xml2js');
    xml2js.parseString(xml, (parseErr, result) => {
        if (parseErr) throw parseErr
        let json = JSON.stringify(result, null, 4);
        json = JSON.parse(json);
        // console.log('SERVER GUS XML + JSON: ' + JSON.stringify(json));
        cb(json);
    });
}

module.exports = router;