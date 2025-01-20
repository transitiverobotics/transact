

# transAct
#### An open-source robot fleet management dashboard
by <a href="https://transitiverobotics.com" >
 <img  src="https://transitiverobotics.com/img/logo.svg"  style="height: 20px; vertical-align: text-top;"> Transitive Robotics
 </a>



![Screenshot from 2024-11-10 09-26-08](https://github.com/user-attachments/assets/900ab2cf-dcec-495b-b4b9-a2b3f6e845c9)




TransAct is an example of the kinds of robot fleet management dashboards/cloud portals/mission control centers/robot operating centers you can build using Transitive. It serves three purposes:

1. demonstrate how [Transitive](https://github.com/transitiverobotics/transitive) can be used to build web-based robot management systems,

1. demonstrate how to integrate [Transitive Capabilities](https://transitiverobotics.com/caps/) into your own web dashboards, and

1. serve as a reference implementation that we invite you to fork and build on if you are just starting out building your own system.


We believe that robotics companies face a [make-vs-buy dilemma](https://transitiverobotics.com/blog/make-vs-buy/) and our mission is to solve this by offering a middle-ground: making it easy for them to build their own fleet management system that perfectly meets their needs.

## Setup

### Fork
We encourage you to [fork this repository ](https://github.com/transitiverobotics/transact/fork) and use it as a foundation stone for your awesome robotics app!

### Clone
After forking clone transAct locally (replace `SUPERBOTS` with your github org)

    git clone git@github.com:SUPERBOTS/transact.git

Or you can just clone from this repo directly if you're just taking a look

    git clone git@github.com:transitiverobotics/transact.git

### Configure

Your local transAct deployment will interface with a Transitive deployment to find robots and capabilities.

1. Go to https://portal.transitiverobotics.com and create an account.
1. In your local transAct clone, copy `sample.env` file to `.env` and edit it:
   - **VITE_TRANSITIVE_USER** is your Transitive username.
   - **JWT_SECRET** is the JWT secret from your Security page: https://portal.transitiverobotics.com/security.
1. Run `npm install` to install all dependencies.

### Run
1. Run `npm run dev` to start transAct locally.
2. Navigate to http://localhost:3000/.
3. Enjoy!.

At first you won't see any robots on your dashboards. This is because you don't yet have any robots attached to your Transitive account on transitiverobotics.com. We'll do this next.

## Get some robots
Follow the [instructions](https://transitiverobotics.com/docs/guides/getting-started/ "Getting started") to add robots to your Transitive account. If you just want to see it working quickly you can use our example Docker image. Go to [fleet page](https://portal.transitiverobotics.com/ "Fleet page"), down to the end of the **Add devices** section and you'll find a command you can grab to run a local Docker robot.

Finally add some capabilities to the devices you've added from the [fleet page](https://portal.transitiverobotics.com/ "Fleet page")

Once these robots show up in the Transitive Portal, they will also appear in your local transAct deployment.

## Make it your own!
The code is yours! A good first step is to find and replace "SuperBots" in the entire project with the name of your own company.

### UI components
This project uses [ShadCn](https://ui.shadcn.com/) project for UI components and [Tailwind CSS](https://tailwindcss.com/) for styling.
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

#### Attribution

SuperBots Logo: <a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a>



