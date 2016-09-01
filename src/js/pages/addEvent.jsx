var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment} = require("-components/segment");
//var {Listview, Item} = require("-components/listview");
//var Page = require("-components/page");
//var {Grid,Row,Col} = require("-components/grid");
//var $ = require("jquery");

var AddPage = React.createClass({

  componentDidMount: function() {

  },


  render:function() {
    //var loading = !newsData;

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

module.exports = AddPage;
