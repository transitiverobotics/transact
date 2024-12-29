

# transAct
#### An open-source robot fleet management dashboard
by <a href="https://transitiverobotics.com" >
 <img  src="https://transitiverobotics.com/img/logo.svg"  style="height: 20px; vertical-align: text-top;"> Transitive Robotics
 </a>



![Screenshot from 2024-11-10 09-26-08](https://github.com/user-attachments/assets/900ab2cf-dcec-495b-b4b9-a2b3f6e845c9)




TransAct is an example of the kinds of robot fleet management dashboards/cloud portals/mission control centers/robot operating centers you can build using Transitive. It serves three purposes:

1. demonstrate how Transitive, the open-source framework, can be used to build web-based robot management systems,

1. demonstrate how to integrate [Transitive Capabilities](https://transitiverobotics.com/caps/) into your own web dashboards, and

1. serving as a reference implementation that we invite you to fork and build on if you are just starting out building your own system.



We believe that robotics companies face a [make-vs-buy dilemma](https://transitiverobotics.com/blog/make-vs-buy/) and our mission is to solve this by offering a middle-ground: making it easy for them to build their own fleet management system that perfectly meets their needs.

## Fork
We encourage you to [fork this repository ](https://github.com/transitiverobotics/transact/fork) and use it as a foundation stone for your awesome robotics app!

## Clone
Download the app locally from your forked repo (please complete with your real company/app)

    git clone git@github.com:SUPERBOTS/ROBOTLORD].git

Or you can just clone from here if you're just taking a look

    git clone git@github.com:transitiverobotics/transact.git

## Setup
1. Go to transitiverobotics.com and create your account
1. Copy `sample.env` file into another file called `.env` in the same directory
1. Complete it with your own data
   - **VITE_TRANSITIVE_USER** is your transitive username
   - **JWT_SECRET** you can get it from https://portal.transitiverobotics.com/security
1. Run `npm install`

## Get some robots
Follow the [instructions](https://transitiverobotics.com/docs/guides/getting-started/ "Getting started") to get your robots on the transitive cloud.

If you just want to see it working quickly you can use our example Docker image, go to [fleet page](https://portal.transitiverobotics.com/ "Fleet page"), down to the end of the **Add devices** section and you'll find a command you can grab to run a local Docker robot. (transitive simulated robot coming soon!)

Don't forget to add some capabilities to them, you can do it from the [fleet page](https://portal.transitiverobotics.com/ "Fleet page")
## Run it
1. Run `npm run dev`
2. Navigate to http://localhost:3000/
3. Enjoy!

## Make it your own!
Code is yours!
A nice first step is to find and replace "SuperBots" in the entire project with your own company name

### ShadCn
This project uses [ShadCn](https://ui.shadcn.com/) project for components and [Tailwind CSS](https://tailwindcss.com/) for styling.
You have a lot of beautiful components to choose from in the [ShadCn](https://ui.shadcn.com/docs/components/accordion) collection, you can find instructions on how to use them there, but as an example, if you need a Slider component in your app you just need to:

    npx shadcn@latest add slider

Once it's installed (it just gets copied in the *client/components/ui* folder) you can use it like this:

    import { Slider } from "@/components/ui/slider"
    ...
    <div>
	    <Label  htmlFor="password"  className="text-xl"> Robot happiness </Label>
	    <Slider id="robot-happiness" defaultValue={[100]} max={100} step={1} />
    </div>

(Note the `className="text-xl"`, that's tailwind css)

-----

#### This is repository is work in (rapid) progress! Please check back soon again.

-----

#### Attribution

SuperBots Logo: <a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a>



