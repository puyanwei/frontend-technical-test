# Vehicle Showroom

This app displays vehicle information for cars that are available for sale.

Desktop view

![desktop](https://user-images.githubusercontent.com/14803518/137533655-ab8b319d-3d8c-4ac3-bd22-19b80a4786fb.png)

Tablet view

![tablet](https://user-images.githubusercontent.com/14803518/137533657-d09bceea-c04b-4bc4-87c7-87be4f5b5288.png)

Mobile view

![mobile](https://user-images.githubusercontent.com/14803518/137533653-2e3da32a-7447-4b18-b94b-76f50c06ed6a.png)


## Planning

I approached this task by spending some time to plan out the details and work out which order would be best to do them in.

![1](https://user-images.githubusercontent.com/14803518/137533219-4a2628f1-1411-4863-a90d-0c461f580feb.jpg)

One of the first things I did was to pull in the data from the API to see the data structure in the console. I noticed that within the initial API, it contained other API urls in the array of objects for each specific car which pulled in more details about it.

I decided that the best approach would be to loop through all of them, fetch their data and then create a new object which nested that information to the original JSON hash so that all the information was available in `vehicles` for the page to use.

After that I was able to build out the page mobile first, and move on to larger sizes.

## Hurdles

It was challenging in dealing with so many objects, nesting promises and making sure the correct data was being passed down, as well as making sure the new final object to be used for `vehicles` made sense. My approach was to break things down into smaller stages and slowly build them up to the desired result.

Testing was an interesting challenge as I had not used Jest before, and working out I had to create a copy of the mocked data by following the error messages given out.

## Future Improvements

Apologies for being unable to complete the extra tasks of adding extra info to a modal after clicking a read more button. I am currently being overwhelmed by multiple tech tests so I have trying to divide up my time efficiently.

I look forward to the feedback.