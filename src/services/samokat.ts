import axios from "axios";
import base from "./airtable";

const saveStory = async (slug) => {
    const { data } = await axios.get(
        `https://stories.samokat.ru/static/predefined/${slug}/config.json`
    );

    data.map((slide, index) => {
        base("slide").create(
            [
                {
                    fields: {
                        story: data.slug,
                        order: index + 1,
                        type: slide.type,
                        url: slide.type === "fullscreen-image" ? `https://stories.samokat.ru/static/predefined/${slug}/${slide.data.image}` : slide.data.url,
                        "bg-color": slide.data.backgroundColor
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.getId());
                });
            }
        );
    });
}