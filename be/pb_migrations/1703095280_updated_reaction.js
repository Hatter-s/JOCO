/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nvg11i33bbbfyfi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j8g9nsro",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nvg11i33bbbfyfi")

  // remove
  collection.schema.removeField("j8g9nsro")

  return dao.saveCollection(collection)
})
