import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import Post from "../../components/Post.js";
import FormDataPost from "../../components/FormDataPost.js";

export default class NewBlogPost extends Component {
    state = {
        blogPost: {
            category: null,
            content: null,
            title: null,
            /* cover: null, */
            readTime: {
                value: null,
                unit: "minute"
            },
            author: {
                name: null,
                avatar: "Author Avatar"
            }
        },
        blogPostCover: null,
        email: { emailAddress: "lakkakula.saidev@gmail.com" }
    };

    ImageHandle(e) {
        const files = e.target.files[0];
        console.log(files);
        return files;
    }

    handleChange(e) {
        if (e.target.id === "value") {
            let stateValue = { ...this.state.blogPost };
            stateValue.readTime["value"] = e.target.value;
            this.setState({ blogPost: stateValue });
        } else if (e.target.id === "name") {
            let stateValue = { ...this.state.blogPost };
            stateValue.author["name"] = e.target.value;
            this.setState({ blogPost: stateValue });
        } else if (e.target.id === "avatar") {
            let stateValue = { ...this.state.blogPost };
            stateValue.author["avatar"] = e.target.value;
            this.setState({ blogPost: stateValue });
        } else {
            this.setState({ blogPost: { ...this.state.blogPost, [e.target.id]: e.target.value } });
        }
        /*  console.log(this.state.blogPost); */
    }

    async postData(e) {
        e.preventDefault();
        let Value = !Object.values(this.state.blogPost).some((element) => element === null);

        if (Value) {
            let response = await Post("blogPosts", this.state.blogPost);
            console.log("Data is posted, Cover is yet to be....");
            if (this.state.blogPostCover !== null) {
                response = await response.json();
                let formData = new FormData();
                formData.append("uploadCover", this.state.blogPostCover);
                let _id = response._id;
                const post_truthy = await FormDataPost(formData, _id, "blogPosts", "uploadCover");
                if (post_truthy) {
                    await Post("mail", this.state.email);
                    console.log("Email successfully sent...");
                }
            }
        }
    }

    render() {
        return (
            <Container className="new-blog-container">
                <Form className="mt-5" onSubmit={(e) => this.postData(e)}>
                    <Form.Group className="mt-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control id="title" onChange={(e) => this.handleChange(e)} size="lg" placeholder="Title" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control id="category" onChange={(e) => this.handleChange(e)} size="lg" as="select">
                            <option>Category1</option>
                            <option>Category2</option>
                            <option>Category3</option>
                            <option>Category4</option>
                            <option>Category5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Blog Content</Form.Label>
                        <Form.Control id="content" files={this.state.blogPostCover} onChange={(e) => this.handleChange(e)} as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Cover</Form.Label>
                        <Form.Control id="content" onChange={(e) => this.setState({ blogPostCover: this.ImageHandle(e) })} type="file" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control id="name" onChange={(e) => this.handleChange(e)} size="lg" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Author Avatar</Form.Label>
                        <Form.Control id="avatar" onChange={(e) => this.handleChange(e)} size="lg" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Read Time</Form.Label>
                        <Form.Control id="value" onChange={(e) => this.handleChange(e)} type="number" size="lg" />
                    </Form.Group>
                    <Form.Group className="d-flex mt-3 justify-content-end">
                        <Button type="reset" size="lg" variant="outline-dark">
                            Reset
                        </Button>
                        <Button type="submit" size="lg" variant="dark" style={{ marginLeft: "1em" }}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}
