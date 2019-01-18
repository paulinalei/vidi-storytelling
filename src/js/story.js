export const stories = [
    {
        'title': 'Periodic Temperature Effects on Biodiversity',
        'titlePage': true,
        'explanation':' <font size="2">INSTRUCTION: Please use the left and right keyboard arrows to navigate through the rest of the visualization.</font> </br> <font size="2">DISCLAIMER: This visualization works best in 1280x800 or larger screen sizes on WebGL supported browsers.</font>'    
},
    {
        'explanation': 'Marine biodiversity is threatened by climate change and increasing human-related stressors',
        'image': './src/img/biodiversity.jpg',
        'image-src':'https://cdn.reefs.com/blog/wp-content/uploads/2016/04/Lampanyctus-alatus-osezaki-Ryo-Minemizu.jpg'
    },
    {
        'explanation': 'Periodic changes of sea surface temperature -- El Nino and La Nina -- in the Pacific Ocean have impacts all over the globe. How is biodiversity affected by climate change?', 
        'explanation-src': "https://www.americangeosciences.org/critical-issues/faq/what-are-el-nino-and-la-nina", 
        'image': './src/img/biodiversity.jpg',
        'image-src':'https://cdn.reefs.com/blog/wp-content/uploads/2016/04/Lampanyctus-alatus-osezaki-Ryo-Minemizu.jpg'
    },
    {
        'title': 'We know that changes in ocean temperature can affect species...',
        'explanation': 'But is there a correlation between a rise in certain species during certain changes in the ocean?'
    }, 
    {
        'title': 'We will be exploring the relationship between species and climate change using data from NOAA[*].',
        'explanation': 'There are thousands of marine species. We have grouped them into 9 groups following the specific categories provided by NOAA.',
        'explanation-src':'https://coastwatch.pfeg.noaa.gov/data.html'
    },
    {
        'explanation': 'We will be observing a range of the ocean in the San Francisco Bay Area from the period of 2009 - 2015.',
        'image': './src/img/sfBay.jpg',
        'image-src':'https://eoimages.gsfc.nasa.gov/images/imagerecords/81000/81238/sfbay_oli_2013106_lrg.jpg'
    },
    {
        'explanation': "To understand how climate affects species we needed to consider several variables.",
        'image': './src/img/step1.png'
    },
    {
        'explanation': "In order to see these all in a single view we constructed a glyph.",
        'image': './src/img/step2.png'
    },
    {
        'explanation': "The color of the tile indicates the sea surface temperature",
        'image': './src/img/p1.png'
    },
    {
        'explanation': "The center of our glyph has an arrow indicating wind direction",
        'image': './src/img/p2.png'
    },
    {
        'explanation': "The color of the circle below denotes cholorophyll levels where brighter means higher presence",
        'image': './src/img/p3.png'
    },
    {
        'explanation': "Lastly, each bar represents a species that was found in that area and its size indicates increase from previous year average",
        'image': './src/img/p4.png'
    },
    {
        'explanation': "We then applied our glyph on a tiled map of the SF Bay.",
        'image': './src/img/final.png'
    },
    {
        'title': 'This is our visualization of species in a specific latitude and longitude range of the ocean in the San Francisco Bay Area (2009).',
        'canvas': [
            {
                'containerID': 'panel-1',
                'initialYear': 2009,
            }
        ]
    },
    {
        'title': 'We can see that the sea surface temperatures for this year were rather cold.',
        'canvas': [
            {
                'containerID': 'panel-1',
                'initialYear': 2009,
            }
        ]
    },
    {
        'title': 'Cooler ocean temperatures and strong upwelling favor production of groundfish.'
    },
    {
        'title': 'Warmer ocean temperatures with weak upwelling favor production of forage species.'
    },
    {
        'title': 'From 2011 to 2014, (left to right) we see sea surface temperatures increase as well as diversity and abundance of species.',
        'canvas': [
            {
                'containerID': 'panel-1',
                'initialYear': 2011,
            },
            {
                'containerID': 'panel-2',
                'initialYear': 2012,
            },
            {
                'containerID': 'panel-3',
                'initialYear': 2013,
            },
            {
                'containerID': 'panel-4',
                'initialYear': 2014,
            }
        ]
    },
    {
        'title': 'In 2015, we saw an increase in biodiversity with warmer sea surface temperatures.'
    },
    {
        'title':'Warmer sea surface temperatures, normal upwelling as seen in wind direction, and high chlorophyll levels...',
        'explanation': 'These factors all came together and created an environment that allowed for both groundfish and forage species to thrive.'
        
    },
    {
        'title': 'Here, we see the interaction of a warm water mass with high chlorophyll levels and wind direction consistent with previous years.',
        'canvas': [
            {
                'containerID': 'panel-1',
                'initialYear': 2015,
            }
        ]
    },
    {
        'title': 'Changes in the marine ecosystem are also seen in changes in the food web.',
        'explanation': 'In previous years, we saw that there was an abundance of plankton and euphausiids, which fish tend to feed on. However, in the recent warm years, we see that there is a higher proportion of gelatinous plankton. This shows a shift in the food web from a system dominated by euphausiids to gelatinous organisms.'
    },
    {
        'title': 'In conclusion, we can see that climate change has intense impact on marine ecosystems.',
    }
]