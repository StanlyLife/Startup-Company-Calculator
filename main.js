let MyComponents;
let MyFeatures;

async function getFeatures() {
  await fetch("features.json")
    .then((x) => x.json())
    .then((requirements) => {
      MyFeatures = requirements;
      // CreateFeatureRequirements(requirements.Sharing_Functionality, "Sf");
      // CreateFeatureRequirements(requirements.Chat_System, "Chat System");
      // CreateFeatureRequirements(requirements.Live_Streaming, "Live Streaming");
      CreateFeatureRequirements(
        requirements.Video_Functionality,
        "Video Functionality"
      );
      CreateFeatureRequirements(requirements.Landing_Page, "Landing page");
      CreateFeatureRequirements(requirements.Help_System, "Help system");
      CreateFeatureRequirements(requirements.AD_Block_Obfuscator, "Adblocker");
    });
}

async function GetComponents() {
  await fetch("components.json")
    .then((x) => x.json())
    .then((components) => {
      MyComponents = components;
      LogComponents(components.Backend_Component, "UI Component");
      CreateElement(components.Backend_Module);
      GetRequirements(components.Backend_Module);
    });
}

async function LogComponents(compontent, compontentName) {}

function CreateElement(component) {
  let container = document.createElement("div");
  container.classList.add("element-container");

  let MainComponent = document.createElement("div");
  MainComponent.classList.add("main-component");
  MainComponent.innerText = component.name;

  container.appendChild(MainComponent);

  component.requirements.forEach((element) => {
    let RequiredComponent = document.createElement("div");
    RequiredComponent.innerText = `Required: ${element.amount} : ${element.name}`;
    container.appendChild(RequiredComponent);
  });

  document.querySelector("main").appendChild(container);
}

function GetRequirements(component) {
  const list = [];
  component.requirements.forEach((r) => {
    for (let i = 0; i < r.amount; i++) {
      list.push(r.name);
    }
  });
  return list;
}

function GetFeatureRequirements() {
  MyFeatures.Landing_Page.forEach((component) => {});
}

let requirementsList = [];
let requirementsAmount = [];

function ComponentRequirements(_component, amount) {
  /* parse from feature.component to components.component */
  component = MyComponents[_component.name];
  try {
    console.log(`trying to push ${component.name}`);
  } catch (error) {
    console.log(`Could not create variable ${_component.name}`);
  }
  for (var i = 0; i < amount; i++) {
    console.log(`push ${component.name}`);

    requirementsList.push(component.name);
  }
  /* Check if component has requirements */
  if (ComponentHasRequirements(component.requirements)) {
    component.requirements.forEach((requirement) => {
      if (amount > 1) {
        ComponentRequirements(requirement, requirement.amount * amount);
      } else {
        ComponentRequirements(requirement, requirement.amount);
      }
    });
  }
}

function ComponentHasRequirements(requirements) {
  if (requirements.length > 0) {
    return true;
  }
  return false;
}
let counts = {};
function CreateFeatureRequirements(feature, name) {
  requirementsList = [];
  feature.forEach((Requirements) => {
    for (let i = 0; i < Requirements.amount; i++) {
      console.log(`${name} Main comp: ${Requirements.name} @@@@`);
      // requirementsList.push(Requirements.name);
      ComponentRequirements(MyComponents[Requirements.name], 1);
    }
    requirementsList.sort();

    /* */
    /* */
  });
  counts = {};
  requirementsList.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  CreateFeatureHtml(name);
}

function CreateFeatureHtml(name) {
  const featureContainer = document.createElement("div");
  featureContainer.classList.add("feature");

  featureHeader = document.createElement("h1");
  featureHeader.innerText = name;
  featureContainer.appendChild(featureHeader);

  const componentContainer = document.createElement("div");

  var propValue;
  for (var propName in counts) {
    let componentWrapper = document.createElement("div");
    componentWrapper.classList.add("component-wrapper");
    /* add image */
    if (MyComponents[propName].url != undefined) {
      let componentImage = document.createElement("img");
      componentImage.src = `${MyComponents[propName].url}`;
      componentWrapper.appendChild(componentImage);
    }
    propValue = counts[propName];
    let component = document.createElement("p");
    let componentAmount = document.createElement("p");
    componentAmount.classList.add("amount");

    let newpropName = String(propName).replace(/_/g, " ");

    componentAmount.innerText = `${propValue}`;
    component.innerText = `${newpropName}`;
    componentWrapper.appendChild(componentAmount);
    componentWrapper.appendChild(component);
    componentContainer.appendChild(componentWrapper);
  }

  featureContainer.appendChild(componentContainer);
  document.querySelector("main").appendChild(featureContainer);
}

GetComponents();
getFeatures();
