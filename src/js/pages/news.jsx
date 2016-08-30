var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment} = require("-components/segment");
var $ = require("jquery");

var NewsPage = React.createClass({

  render:function() {

    var RSS = "http://www.essex.ac.uk/news/newsfeed.xml";

    $.get(RSS, function (data) {
      $(data).find("entry").each(function () { // or "item" or whatever suits your feed
          var el = $(this);
          console.log(data);
          console.log("------------------------");
          console.log("title      : " + el.find("title").text());
          console.log("author     : " + el.find("author").text());
          console.log("description: " + el.find("description").text());
      });
    });

    return (
      <Container>
        <VBox>
          <BasicSegment>

          </BasicSegment>
        </VBox>
      </Container>
    );

  }

});

module.exports = NewsPage;
