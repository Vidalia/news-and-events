var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");
//var AekStorage = require("@ombiel/aek-lib/storage");

//var storage = new AekStorage("News");

var NewsPage = require("./pages/news");
var EventsPage = require("./pages/events");

var buttonState = ["active item","item","item"];
var child = <NewsPage/>;
var title = "News";

var Screen = React.createClass({

  componentDidMount: function() {
    
  },

  menuOption: function(option, ev) {
    ev.preventDefault();
    if (option == "news") {
      child = <NewsPage/>;
      title = "News";
      buttonState[0] = buttonState[1] = buttonState[2] = "item";
      buttonState[0] = "active item";
    } else if (option == "events") {
      child = <EventsPage/>;
      title = "Events";
      buttonState[0] = buttonState[1] = buttonState[2] = "item";
      buttonState[1] = "active item";
    }
    this.forceUpdate();
  },

  render:function() {

    return (
      <Container>
        <VBox>
          <BannerHeader theme="alt" key="header" flex={0}>{title}</BannerHeader>
          <BasicSegment>
            {child}
          </BasicSegment>

        </VBox>
        <div style={{position:"absolute", bottom:"0px", width:"100%", margin:"0", display:"block"}}>
            <div style={{width:"100%", margin:"0"}}  className="ui primary menu">
              <a style={{width:"33.3%"}} className={buttonState[0]} onClick={this.menuOption.bind(this,"news")}>
                <i className="info icon"></i> News
              </a>
              <a style={{width:"33.3%"}} className={buttonState[1]} onClick={this.menuOption.bind(this,"events")}>
                <i className="tasks icon"></i> Events
              </a>
              <a style={{width:"33.3%"}} className={buttonState[2]} onClick={this.menuOption.bind(this,"map")}>
                <i className="road icon"></i> Map
              </a>
            </div>
          </div>
      </Container>
    );

  }

});

React.render(<Screen/>,document.body);
