* Create an HTML and JavaScript file for the project (don't do this project in CodePen or online editor)
    * To view the site in web browser just open the file in your web browser
    * Use Bootstrap to create a simple layout for your website with a header and a place for the content.
    * Include your JavaScript file using a script tag
    * You can edit the files using a text editor, but you may want to consider using and IDE like Visual Studio Code or Sublime.
        * Don't forget, you need to save the files for changes to show up in the web browser!

* Add a map to your website using one of the JavaScript web mapping clients discussed in the Web Visualization Course. Display at least the following on your map:
  * A basemap like Open Street Map or one of Esri's.
  * Find GeoJSON boundary for your assigned country using something like this https://datahub.io/core/geo-countries#resource-countries
  * The ESRI ECMWF GEOGloWS Streamflow map service: https://www.arcgis.com/home/item.html?id=5c2e6d2137bb4d2187db387979db2f31
  https://livefeeds2.arcgis.com/arcgis/rest/services/GEOGLOWS/GlobalWaterModel_Medium/MapServer
* Include a plot using one of the plotting libraries discussed in the Web Visualization Course
  * Use one of the AJAX methods to query the ECMWF GEOGloWS Streamflow API for a river in your country and plot it
Bonus:
Show the plot in a pop-up/modal when you click on a river/select it from a select box