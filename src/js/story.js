export const stories = [
    {
        'title': 'Periodic Temperature Effects on Biodiversity',
        'titlePage': true,
        'explanation':' <font size="2">INSTRUCTION: Please use the left and right keyboard arrows to navigate through the rest of the visualization.</font> </br> <font size="2">DISCLAIMER: This visualization works best in 1280x800 or larger screen sizes on WebGL supported browsers.</font>'    
    },
    {
        'explanation': 'Marine biodiversity is threatened by climate change and increasing human-related stressors.',
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
        'explanation': 'But is there a correlation between a rise in the population of certain species during certain changes in the ocean?'
    }, 
    {
        'title': 'We will be exploring the relationship between species and climate change using data from NOAA*.',
        'explanation': 'There are thousands of marine species. We have grouped them into 9 groups following the specific categories provided by NOAA.',
        'title-explanation-src':'[*]https://coastwatch.pfeg.noaa.gov/data.html'
    },
    {
        'explanation': 'We will be observing a range of the ocean from the Monterey Bay up to the San Francisco Bay Area from the period of 2009 to 2015.',
        'image': './src/img/region.PNG',
        'image-src':'Google Maps'
    },
    {
        'explanation': 'NOAA scientists trawled the ocean in the middle of the every year to gather data on the species.',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Krabbenkutter_Ivonne_Pellworm_P5242390jm.JPG',
        'image-src':'https://upload.wikimedia.org/wikipedia/commons/2/2d/Krabbenkutter_Ivonne_Pellworm_P5242390jm.JPG'
    },
    {
        'explanation': "In order to represent the data, we constructed a glyph.",
        'image': './src/img/p0.png'
    },
    {
        'explanation': "To understand how climate affects species diversity we needed to consider several variables.",
        'image': './src/img/step1.png'
    },
    {
        'explanation': "The center of our glyph has an arrow indicating wind direction.",
        'image': './src/img/p1.png'
    },
    {
        'explanation': "The color of the circle below denotes cholorophyll levels where brighter means higher presence.",
        'image': './src/img/p2.png'
    },
    {
        'explanation': "Each bar represents a species category that was found in that area up to 9 bars. The more bars present in an area the higher the diversity.",
        'image': './src/img/p3.png'
    },
    {
        'explanation': "The height of the bar indicates number of unique species in this category.",
        'image': './src/img/p4.png'
    },
    {
        'explanation': "The color of the tile indicates the sea surface temperature",
        'image': './src/img/p5.png'
    },
    {
        'explanation': "We then applied our glyph on a tiled map of the area.",
        'image': './src/img/final.png'
    },
    {
        'explanation': 'This is our visualization of the trawl in 2009.',
        'image':  './src/img/popOnly_2009.png'
    },
    {
        'explanation': 'We can see that the sea surface temperatures for this year were rather cold, and chlorophyll levels are rather low.',
        'image': './src/img/weathercholo_2009.png'
    },
    {
        'explanation': 'Just looking at the population, we see there is some species diversity.',
        'image': './src/img/popOnly_2009.png'
    },
    {
        'title': 'Cooler ocean temperatures and strong upwelling favor production of groundfish*.',
        'title-explanation-src': '[*]J. A. Santora, E. L. Hazen, I. D. Schroeder, S. J. Bograd, K. M. Sakuma, and J. C. Field. Impacts of ocean climate variability on biodiversityof pelagic forage species in an upwelling ecosystem. Marine EcologyProgress Series, 580:205–220, 2017.'
    },
    {
        'explanation': 'In 2011, which was a peak cold year*, we see that this caused a decrease in species diversity in 2012.',
        'image': './src/img/2011_2012_compare.png',
        'image-src': '[*]https://ggweather.com/enso/oni.htm'
    },
    {
        'explanation': 'We see a decrease in the diversity of <span style="color:red">Rockfish</span> and an increase for <span style="color:#a65628">Gelatinous</span> species.',
        'image': './src/img/2011_2012_compare.png'
    },
    {
        'explanation': 'If we look at the conditions of the trawl from 2011 to 2014, we see that waters are getting warmer.',
        'image': './src/img/2011to2014horizontal.png'
    },
    {
        'explanation': 'We see that in 2013, a warmer water mass, which is seen in <span style="color:#89bcdd">light blue</span>, begins to appear. Then in 2014, the warm water mass takes over.',
        'image': './src/img/2011to2014caption.png'
    },
    {
        'title': 'We also observed the food web during this time.',
        'explanation': 'From 2011 to 2014, we saw that there was an abundance of plankton and euphausiids, which fish tend to feed on.'
    },
    {
        'explanation': 'Here we drew a histogram of species abundance from 2011 to 2015. Years are read from left to right. Each histogram corresponds to a specific species and is color coordinated with the legend. The histograms are mirrored horizontally except for <span style="color:#f781bf">Krill</span> and <span style="color:#a65628">Gelatinous</span>, as their scales are much larger in comparison to other species.',
        'image': './src/img/infographic.png'
    },
    {
        'explanation': '<span style="color:#f781bf">Krill</span> and <span style="color:#a65628">Gelatinous</span> species are shown as fins at the head of the fish. <span style="color:#f781bf">Krill</span> grew exponentially until 2014 and then experienced a drop in 2015. <span style="color:#a65628">Gelatinous</span> was not collected in 2011. However, krill grew exponentially from 2012 and peaked in 2014. Then, it dropped quickly in 2015.',
        'image': './src/img/gel_krill_infographic.png',
        'image-src': 'Krill image: https://commons.wikimedia.org/wiki/File:Krill666.jpg, Gelatinous image: https://www.flickr.com/photos/jlambus/2348695979'
    },
    {
        'explanation': '<span style="color:#42d4f4">Forage</span> species had low abundance in 2011, a peak cold year, but began to increase in population as sea surface temperatures got warmer. This is seen as a peak in 2014, a warm year.',
        'image': './src/img/forage.png',
        'image-src': 'Forage image: https://en.wikipedia.org/wiki/Pacific_herring#/media/File:Clupea_pallasii_by_OpenCage.jpg'
    },
    {
        'title': 'Warmer ocean temperatures with weak upwelling favor production of forage species and a decrease in krill*.',
        'title-explanation-src': '[*]J. A. Santora, E. L. Hazen, I. D. Schroeder, S. J. Bograd, K. M. Sakuma, and J. C. Field. Impacts of ocean climate variability on biodiversityof pelagic forage species in an upwelling ecosystem. Marine EcologyProgress Series, 580:205–220, 2017.'
    },
    {
        'title': 'All the factors from 2011 to 2014 came together and led to an abnormal increase in biodiversity in 2015.'
    },
    {
        'explanation': 'Here, we see the interaction of a warm water mass with high chlorophyll levels and wind direction consistent with previous years. This led to an increase in species diversity in 2015.',
        'image': './src/img/popOnly_2015.png'
    },
    {
        'title': 'Changes in the marine ecosystem are also seen in changes in the food web.'
    },
    {
        'explanation': 'In 2015, we see that there is a higher proportion of gelatinous plankton. This shows a shift in the food web from a system dominated by euphausiids to gelatinous organisms.',
        'image': './src/img/krill_gel_2015.png',
        'image-src': 'Krill image: https://commons.wikimedia.org/wiki/File:Krill666.jpg, Gelatinous image: https://www.flickr.com/photos/jlambus/2348695979'
    },
    {
        'title': 'In conclusion, we can see that climate change has intense impact on marine ecosystems.',
    }
]