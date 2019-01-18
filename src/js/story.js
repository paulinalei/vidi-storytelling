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
        'title': 'We will be exploring the relationship between species and climate change.',
        'explanation': 'There are thousands of marine species. We have grouped them into 9 groups following the specific categories provided by NOAA.'
    },
    {
        'explanation': 'We will be observing from the period of 2009 - 2015 a range of the ocean in the San Francisco Bay Area.',
        'image': './src/img/sfBay.jpg',
        'image-src':'https://eoimages.gsfc.nasa.gov/images/imagerecords/81000/81238/sfbay_oli_2013106_lrg.jpg'
    },
    {
        'title': 'This is our visualization of species in a specific latitude and longitude range of the ocean in the San Francisco Bay Area.',
        'canvas': [
            {
                'containerID': 'panel-1',
                'initialYear': 2011,
            }
        ]
    },
    {
        'title': 'Here we see in 2009 the corresponding sea surface temperatures and diversity of marine populations.',
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
        'title': 'From 2010 to 2014, there was an abundance in krill, which is represented by the euphausiids group.',
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
        'title': 'In 2015, we saw an increase in biodiversity with warmer sea surface temperatures.',
        'canvas': [
            {
                'containerID': 'panel-1',
                'initialYear': 2015,
            }
        ]
    }
]