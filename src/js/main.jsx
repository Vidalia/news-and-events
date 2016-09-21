var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");

var NewsPage = require("./pages/news");
var EventsPage = require("./pages/events");
var WelcomePage = require("./pages/welcome");
var AddPage = require("./pages/addEvent");

var newStudent, buttonState, child, title, banner/*, addEvent, eventPage*/; //- addEvent functionality

//TODO: Create a loading screen that will pop up to cover the twig code. or at least check whether or not there issomething takign ages to load here causing the render to be delayed.

var Screen = React.createClass({

  //Setting the initial state of essential variables and running crucial functions needed for functionality.
  getInitialState: function() {
    newStudent = true;
    //eventPage = false; - addEvent functionality
    //addEvent = false; - addEvent functionality
    //Initialise the first menu option to be active and to be displayed by default.
    if (newStudent) {
      buttonState = ["active item","item","item"];
      child = <WelcomePage/>;
      title = "Welcome Week";
    } else {
      buttonState = ["active item","item"];
      child = <NewsPage/>;
      title = "News";
    }
    return {};
  },

  //Building menu based on student status (if they are a new student or not).
  menuOption: function(option, ev) {
    ev.preventDefault();
    if (newStudent) {
      if (option === "welcome") {
        child = <WelcomePage/>;
        title = "Welcome Week";
        //eventPage = false; - addEvent functionality
        //addEvent = false; - addEvent functionality
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[0] = "active item";
      } else if (option === "news") {
        child = <NewsPage/>;
        title = "University of Essex News";
        //eventPage = false; - addEvent functionality
        //addEvent = false; - addEvent functionality
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[1] = "active item";
      } else if (option === "events") {
        child = <EventsPage/>;
        //eventPage = true; - addEvent functionality
        //addEvent = false; - addEvent functionality
        title = "University of Essex Events";
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[2] = "active item";
      } else if (option === "add") {
        child = <AddPage/>;
        title = "Add Event";
        //eventPage = false; - addEvent functionality
        //addEvent = true; - addEvent functionality
      }
    //If not a student then setup and initialise all options but the welcome week.
    } else {
      if (option === "news") {
        child = <NewsPage/>;
        title = "University of Essex News";
        //eventPage = false; - addEvent functionality
        //addEvent = false; - addEvent functionality
        buttonState[0] = buttonState[1] = "item";
        buttonState[0] = "active item";
      } else if (option === "events") {
        child = <EventsPage/>;
        //eventPage = true; - addEvent functionality
        //addEvent = false; - addEvent functionality
        title = "University of Essex Events";
        buttonState[0] = buttonState[1] = "item";
        buttonState[1] = "active item";
      } else if (option === "add") {
        child = <AddPage/>;
        title = "Add Event";
        //eventPage = false; - addEvent functionality
        //addEvent = true; - addEvent functionality
      }
    }
    this.forceUpdate();
  },

  render:function() {
    var buttonMenu;

    //If the user is a new student then the menu options should also display the welcome week page.
    if (newStudent) {
      buttonMenu = <div id="menu">
          <div id="menuContent" className="ui primary menu">
            <a id="mainButton" className={buttonState[0]} onClick={this.menuOption.bind(this,"welcome")}>
              <i className="certificate icon"></i> Welcome Week
            </a>
            <a id="mainButton" className={buttonState[1]} onClick={this.menuOption.bind(this,"news")}>
              <i className="newspaper icon"></i> News
            </a>
            <a id="mainButton" className={buttonState[2]} onClick={this.menuOption.bind(this,"events")}>
              <i className="announcement icon"></i> Events
            </a>
          </div>
        </div>;
    } else {
      //If not a new student then do not display the welcome week menu option.
      buttonMenu = <div id="menu">
          <div id="menuContent" className="ui primary menu">
            <a id="altMainButton" className={buttonState[0]} onClick={this.menuOption.bind(this,"news")}>
              <i className="newspaper icon"></i> News
            </a>
            <a id="altMainButton" className={buttonState[1]} onClick={this.menuOption.bind(this,"events")}>
              <i className="announcement icon"></i> Events
            </a>
          </div>
        </div>;
    }

    //This code is for adding your own event
    // if (eventPage) {
    //   banner = <BannerHeader id="header" theme="alt" key="header" flex={0}>
    //     {title}
    //     <i className="plus square outline icon" onClick={this.menuOption.bind(this,"add")}></i>
    //   </BannerHeader>;
    // } else if (addEvent) {
    //   banner = <BannerHeader id="header" theme="alt" key="header" flex={0}>
    //     {title}
    //     <i className="remove circle icon" onClick={this.menuOption.bind(this,"events")}></i>
    //   </BannerHeader>;
    // } else {
    //   banner = <BannerHeader id="header" theme="alt" key="header" flex={0}>{title}</BannerHeader>;
    // }

    banner = <BannerHeader id="header" theme="alt" key="header" flex={0}>{title}</BannerHeader>;

    return (
      <Container>
        <VBox>
          {banner}
          <BasicSegment className="maxHeight">
            {child}
          </BasicSegment>
        </VBox>
        {buttonMenu}
      </Container>
    );
  }
});

React.render(<Screen/>,document.body);
