import ListingItem from './ListingItem';

function TechListing() {
    return (
        <section className="sectionInfo">
            <h3>Developer Techs / Skills</h3>
            <div className="listing">
                <ListingItem
                    link={'https://nodejs.org/en/'}
                    imageName={"node.png"}
                    name={"Node.js"}
                />
                <ListingItem
                    link={"https://reactjs.org/"}
                    imageName={"react.svg"}
                    name={"React & React Native"}
                />
                <ListingItem
                    link={"https://expressjs.com/"}
                    imageName={"express.png"}
                    name={"Express"}
                />
                <ListingItem
                    link={"https://github.com/"}
                    imageName={"github1.png"}
                    name={"Github"}
                />
                <ListingItem
                    link={"https://gitlab.com/"}
                    imageName={"gitlab.svg"}
                    name={"GitLab"}
                />
                <ListingItem
                    link={"https://www.mongodb.com/"}
                    imageName={"mongoDB.svg"}
                    name={"MongoDB"}
                />
                <ListingItem
                    link={"https://www.docker.com/"}
                    imageName={"docker.svg"}
                    name={"Docker"}
                />
                <ListingItem
                    link={"https://www.linux.org/"}
                    imageName={"linux.png"}
                    name={"Linux"}
                />
                <ListingItem
                    link={"https://git-scm.com/"}
                    imageName={"git.png"}
                    name={"Git"}
                />
            </div>
        </section>
    );
}

export default TechListing;