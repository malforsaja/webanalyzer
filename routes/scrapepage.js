var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();


router.get('/scrapepage', function (req, res) {

    //var url = 'https://www.w3schools.com/';
    var url = req.query.searchvalue;

    request(url, function(err, resp, body) {

        var totalLinks = [];
        var internalLinks = [];
        var externalLinks = [];
        var inactiveLinks = [];
        var header1 = 0;
        var header2 = 0;
        var header3 = 0;
        var header4 = 0;
        var header5 = 0;
        var header6 = 0;
        if (!err && resp.statusCode === 200){
            var $ = cheerio.load(body);
            // find number of links on the page
            $('a').each(function () {
                var uri =  $(this).attr('href');
                totalLinks.push(uri);
                if(uri.includes(url) == true){
                    internalLinks.push(uri);
                }else {
                    externalLinks.push(uri);
                }
                if (uri.includes(url) === true){
                    request(uri, function (error, response, html) {
                        //console.log(response.statusCode);
                        if (response.statusCode == 200 ){
                            console.log('eshte link aktiv');
                        }
                    })
                }
                //console.log(uri.statusCode);
                //console.log(uri);

            })
            // Find title of the page
            // var title = $('title')
            var pageTitle = $('head title').text();
            //console.log(title);
            var pageHeading = $('html').parent('').html();

            //Find the language of the site
            var siteLanguage = $('html').attr('lang');
            var htmlVersion = $('html meta').attr('charset');
            var htmlVersion2 = $('html meta').attr('content');
            if(htmlVersion === 'utf-8'  || htmlVersion === 'UTF-8'
                || htmlVersion2.includes('charset=UTF-8') === true || htmlVersion2.includes('charset=utf-8') === true){
                var versionHTML = 'HTML5';
                //console.log('HTML version is: ' + 'HTML5');
            }else {
                versionHTML = 'We couldn\'t identify the HTML version';
                //console.log('HTML version is: ' + 'We couldn\'t identify the HTML version');
            }

            // check different levels of headings
            var pageHeading = $('body h1').text();
            $('body h1').each(function () {
                header1++;
            })
            $('body h2').each(function () {
                header2++;
            })
            $('body h3').each(function () {
                header3++;
            })
            $('body h4').each(function () {
                header4++;
            })
            $('body h5').each(function () {
                header5++;
            })
            $('body h6').each(function () {
                header6++;
            })
            // Finds if the page has a login form
            var loginForm = $('body input').serializeArray();
            var email = $('body input[type=email]').attr('type');
            var password = $('body input[type=password]').attr('type');
            if (email === 'email' && password === 'password'){
                var hasLogin = 'The page contains Login Form!';
                //console.log('The page contains Login Form!')
            }else {
                hasLogin = 'The page does not contain Login Form!';
                //console.log('The page does not contain Login Form!')
            }



            console.log(email);
            console.log(password);
            console.log('Number of h1: ' + header1);
            console.log('Number of h2: ' + header2);
            console.log('Number of h3: ' + header3);
            console.log('Number of h4: ' + header4);
            console.log('Number of h5: ' + header5);
            console.log('Number of h6: ' + header6);


            console.log('Number of total links: ' + totalLinks.length);
            console.log('Number of internal links: ' + internalLinks.length);
            console.log('Number of external links: ' + externalLinks.length);
            console.log('Number of INACTIVE links: ' + inactiveLinks.length);
            console.log('Title of the page: ' + pageTitle.trim());
            console.log('Site language is: ' + siteLanguage);
            console.log($._root.children[0].data);
            var scrapeObj = {
                htmlver: versionHTML,
                pagetitle: pageTitle,
                header1: header1,
                header2: header2,
                header3: header3,
                header4: header4,
                header5: header5,
                header6: header6,
                loginForm: hasLogin,
                //websiteLanguage: siteLanguage,
                totalLinks: totalLinks.length,
                internalLinks: internalLinks.length,
                externalLinks: externalLinks.length

            };

        }
        //res.json(scrapeObj);
        //console.log(scrapeObj);
        res.render('scrapepage', {scrape: scrapeObj} );

    });




// get the title of specific page
//     request(url, function(err, res, body){
//         if (!err && res.statusCode == 200){
//             if(body != null){
//                 var $ = cheerio.load(body);
//                 var title = $('title')
//                 var pageTitle = $('head:first-child').text();
//                 //console.log(title);
//                 console.log('Title of the page: ' + pageTitle);
//             }else{
//                 // body is null or empty
//                 console.log('Body is null')
//             }
//         }
//     });

// html5 is found
//     request(url, function(err, res, html){
//         if (!err && res.statusCode == 200){
//
//             var $ = cheerio.load(html);
//             var pageHeading = $('html').parent('').html();
//             var siteLanguage = $('html').attr('lang');
//             var htmlVersion = $('html meta').attr('charset');
//             var htmlVersion2 = $('html meta').attr('content');
//             if(htmlVersion === 'utf-8'  || htmlVersion === 'UTF-8'
//                 || htmlVersion2.includes('charset=UTF-8') === true || htmlVersion2.includes('charset=utf-8') === true){
//                 console.log('HTML version is: ' + 'HTML5');
//             }else {
//                 console.log('HTML version is: ' + 'We couldn\'t identify the HTML version');
//             }
//             //console.log(pageHeading);
//             console.log('Site language is: ' + siteLanguage);
//             //console.log(htmlVersion);
//             //console.log(htmlVersion2);
//         }
//     });

//Number of heading in a page
//     var header1 = 0;
//     var header2 = 0;
//     var header3 = 0;
//     var header4 = 0;
//     var header5 = 0;
//     var header6 = 0;
//     request(url, function(err, resp, body) {
//         if (!err && resp.statusCode == 200){
//             var $ = cheerio.load(body);
//             var pageHeading = $('body h1').text();
//             $('body h1').each(function () {
//                 header1++;
//             })
//             $('body h2').each(function () {
//                 header2++;
//             })
//             $('body h3').each(function () {
//                 header3++;
//             })
//             $('body h4').each(function () {
//                 header4++;
//             })
//             $('body h5').each(function () {
//                 header5++;
//             })
//             $('body h6').each(function () {
//                 header6++;
//             })
//             console.log('Number of h1: ' + header1);
//             console.log('Number of h2: ' + header2);
//             console.log('Number of h3: ' + header3);
//             console.log('Number of h4: ' + header4);
//             console.log('Number of h5: ' + header5);
//             console.log('Number of h6: ' + header6);
//             console.log('Page headings: ' + pageHeading);
//         }
//     });
});



module.exports = router;