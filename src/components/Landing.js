function Landing() {
    return (
        <div className="container px-6 landing-main">
            <div className="landing-pub">
                <div>
                    <h2 className="landing-pub-header">Publications</h2>
                </div>
                <div className="landing-pub-pub">
                    <a className="landing-publication" href="#">
                        <div className="landing-publication-content">
                            <div className="landing-pub-icon">
                                <a href="https://drawtogether.substack.com" >
                                <img src="https://cdn.substack.com/image/fetch/w_196,h_196,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F37fe3a40-ce47-4c7c-a043-71a41b9003c7_256x256.png"
                                width="196" className="landing-custom" alt=""/>
                                </a>
                            </div>
                            <div className="landing-publication-text-area">
                                <div className="landing-publication-title">DrawTogether with WendyMac</div>
                                <div className="landing-publication-author">Launched a month ago</div>
                                <div className="landing-publication-description">The show that’s a class that’s a club - for
                                    kids! New shows, activities, projects, and special guests delivered to your inbox
                                    each week.
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="landing-categories">
                <h2 className="landing-cat-title">Categories</h2>
                <div className="landing-cat-cat">
                    <button className="cat-button active" type="button">Music</button>
                    <button className="cat-button" type="button">Culture</button>
                    <button className="cat-button" type="button">Politics</button>
                    <button className="cat-button" type="button">Technology</button>
                    <button className="cat-button" type="button">Business</button>
                    <button className="cat-button" type="button">Finance</button>
                </div>
            </div>
        </div>
    )
}

export default Landing;
