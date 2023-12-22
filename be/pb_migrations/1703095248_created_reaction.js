/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nvg11i33bbbfyfi",
    "created": "2023-12-20 18:00:48.797Z",
    "updated": "2023-12-20 18:00:48.797Z",
    "name": "reaction",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wkgcxjbq",
        "name": "dis_like",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "6abepsg6",
        "name": "like",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nvg11i33bbbfyfi");

  return dao.deleteCollection(collection);
})
