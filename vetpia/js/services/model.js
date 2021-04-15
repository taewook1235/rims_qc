/**
 * Data models
 */
Apperyio.Entity = new Apperyio.EntityFactory({
    "doctor": {
        "type": "object",
        "properties": {
            "hospital": {
                "type": "string"
            },
            "department": {
                "type": "string"
            },
            "name": {
                "type": "string"
            }
        }
    },
    "String": {
        "type": "string"
    },
    "Boolean": {
        "type": "boolean"
    },
    "before": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "gauge": {
                "type": "string"
            },
            "species": {
                "type": "string"
            },
            "length": {
                "type": "string"
            },
            "num": {
                "type": "string"
            },
            "height": {
                "type": "string"
            },
            "weight": {
                "type": "string"
            },
            "gender": {
                "type": "string"
            },
            "age": {
                "type": "string"
            },
            "subspecies": {
                "type": "string"
            }
        }
    },
    "setting": {
        "type": "object",
        "properties": {
            "pitch": {
                "type": "string"
            },
            "slope": {
                "type": "string"
            },
            "difference": {
                "type": "string"
            },
            "lagging": {
                "type": "string"
            }
        }
    },
    "after": {
        "type": "object",
        "properties": {
            "count": {
                "type": "string"
            },
            "insLength": {
                "type": "string"
            },
            "pose": {
                "type": "string"
            },
            "insPosition": {
                "type": "string"
            },
            "insAngle": {
                "type": "string"
            },
            "trial": {
                "type": "string"
            }
        }
    },
    "Number": {
        "type": "number"
    }
});
Apperyio.getModel = Apperyio.Entity.get.bind(Apperyio.Entity);
/**
 * Data storage
 */
Apperyio.storage = {
    "doctorKey": new $a.LocalStorage("doctorKey", "doctor"),
    "befores": new $a.LocalStorage("befores", "before"),
    "settings": new $a.LocalStorage("settings", "setting"),
    "afters": new $a.LocalStorage("afters", "after")
};