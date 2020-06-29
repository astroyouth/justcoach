import React, { Component } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_config from "./aws-exports";
import AWS from "aws-sdk";
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createCoach, createPicture } from './graphql/mutations';
import awsExports from "./aws-exports";

Amplify.configure(aws_config);

var file = {}

class NewCoaches extends Component {
  constructor(props) {
    super(props);
    this.firstNameEl = React.createRef();
    this.secondNameEl = React.createRef();
    this.sportEl = React.createRef();
    this.introductionEl = React.createRef();
    this.coachingCertsEl = React.createRef();
    this.postcodeEl = React.createRef();
    this.state ={
      file: null
    }
  }


  addImageToDB = async (image) =>{
    console.log('add image to db')
    try{
      await API.graphql(graphqlOperation(createPicture, {imput:image}));
    } catch (error){
      console.log(error)
    }
  }

  onChange(e){
    file = e.target.files[0];
    console.log(file);

    Storage.put(file.name, file, {
      contentType: 'image/png'
    }).then((result) =>{
    this.setState({file: URL.createObjectURL(file)})
    console.log(result);

    const image = {
      name: file.name,
      file: {
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_user_files_s3_bucket_region,
        key: 'public/' + file.name
      }
    }
    this.addImageToDB(image);
    console.log("image added to DB")
  })
  .catch(err => console.log(err));
}

  submitHandler = event => {
    event.preventDefault();
    const firstName = this.firstNameEl.current.value;
    const secondName = this.secondNameEl.current.value;
    const sport = this.sportEl.current.value;
    const introduction = this.introductionEl.current.value;
    const coachingCerts = this.coachingCertsEl.current.value;
    const postcode = this.postcodeEl.current.value;

    // validate input here. const initialState = { firstName: '', secondName: '', sport: '' , introduction: '' , coachingCerts: '', postcode: ''  }
    if (firstName.trim().length === 0 || secondName.trim().length === 0) {
      return;
    }
    
    console.log(file)
    var key = 'public/' + file.name

    const coach = {
      firstName: firstName,
      secondName: secondName,
      sport: sport,
      coachingCerts: coachingCerts,
      postcode: postcode,
      introduction: introduction,
      imgURL: "https://justcoach7c738897de8645178b9ad4dc41bae6cd204437-dev.s3.eu-west-2.amazonaws.com/"+key
    }
    console.log(coach);
    const addCoach = API.graphql(graphqlOperation(createCoach, { input: coach }))

    this.props.history.push('/Gallery');
  }


  render() {
    return (
      <div className="container">
        <h2>New Coach Sign Register</h2>

        <form className="form-group" onSubmit={this.submitHandler}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input className="form-control" type="string" id="firstName" ref={this.firstNameEl} />
          </div>
          <div>
            <label htmlFor="secondName">Last Name</label>
            <input className="form-control" type="string" id="secondName" ref={this.secondNameEl} />
          </div>
          <div>
            <label htmlFor="sport">Sport</label>
            <input className="form-control" type="string" id="sport" ref={this.sportEl} />
          </div>
          <div>
            <label htmlFor="introduction">Introduce yourself</label>
            <input className="form-control" type="string" id="introduction" ref={this.introductionEl} />
          </div>
          <div>
            <label htmlFor="postcode">Postcode</label>
            <input className="form-control" type="string" id="postcode" ref={this.postcodeEl} />
          </div>
          <div>
            <label htmlFor="coachingCerts">Coaching level</label>
            <input className="form-control" type="string" id="coachingCerts" ref={this.coachingCertsEl} />
          </div>
          <div className="UploadImage">
            <div>
              <p> Please Upload an Image</p>
              <input type="file" onChange={(evt) => this.onChange(evt)}/>
            </div>
          </div>
          <div>
            <img src={this.state.file}/>
          </div>
          <button type="submit" className="btn btn-primary">Create Coach Profile</button>
        </form>


      </div>
    );
  }
}



export default withAuthenticator(NewCoaches);
