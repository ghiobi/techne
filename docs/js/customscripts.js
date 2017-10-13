$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $(window).height();
    //console.log (h);
    if (h > 800) {
        $( "#mysidebar" ).attr("class", "nav affix");
    }
    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    //AnchorJS
    anchors.add('.post-content>h2');

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });
});

// needed for tree showcase with multiple levels of rows
$(function() {
  //dropdown
  var els = document.querySelectorAll("[aria-controls]");
  for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.addEventListener('click', function(e) {
          var targetId = this.getAttribute("aria-controls");
          var target = document.getElementById(targetId);
          //alert
          var isAlert = this.parentElement.getAttribute("role") === "alert";
          if (isAlert) {
              //remove or hide if we want some animation
              // target.setAttribute("aria-hidden", true);
              target.remove();
              return;
          }
          //dropdown
          var isDropdown = this.getAttribute("aria-haspopup") === "true";
          if (isDropdown) {
              //trigger
              var isExpanded = this.getAttribute("aria-expanded") === "true";
              this.setAttribute("aria-expanded", !isExpanded);
              //target
              var targetIsHidden = target.getAttribute("aria-hidden") == "true";
              target.setAttribute("aria-hidden", isExpanded);
              return;
          }
          //tree
          var isTree = target.getAttribute("role") === "tree";
          var isTreeItem = target.getAttribute("role") === "treeitem";
          function setPressed(el, bool) {
              el.setAttribute("aria-pressed", bool);
              if (bool) {
                  el.classList.add('is-pressed');
              } else {
                  el.classList.remove('is-pressed');
              }
          }
          function setExpanded(el, bool) {
              el.setAttribute("aria-expanded", bool);
              //get group
              var group = el.querySelector("[role=group]");
              group.setAttribute("aria-hidden", !bool);
              if (!bool) {
                  group.classList.add('is-hidden');
              } else {
                  group.classList.remove('is-hidden');
              }
          }
          var isPressed;
          //handle the primary trigger
          if(isTree || isTreeItem) {
              isPressed = this.getAttribute("aria-pressed") === "true";
              setPressed(this, !isPressed);
          }
          //toggle a single treeitem
          if(isTreeItem) {
              setExpanded(target, !isPressed);
          }
          //toggle all treeitems
          if(isTree) {
              //all triggers
              var controls = target.querySelectorAll("[aria-controls]");
              for (var i = 0; i < controls.length; i++) {
                  var control = controls[i];
                  setPressed(control, !isPressed);
                  targetId = control.getAttribute("aria-controls");
                  target = document.getElementById(targetId);
                  setExpanded(target, !isPressed);
              }
          }
      })
  }
})();
