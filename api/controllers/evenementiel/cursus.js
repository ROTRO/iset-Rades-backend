const connexion = require('../../../db_connection');

module.exports.createCursus = (req, res) => {
    const data = req.body;
    connexion.query(
        "INSERT INTO cursus(annee, moyenne, credit, mention, session, note_pfe, id_domaine, id_etablissement, id_niveau, id_etudiant) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [data.annee, data.moyenne, data.credit, data.mention, data.session, data.note_pfe, data.id_domaine, data.id_etablissement, data.id_niveau, data.id_etudiant],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    message: err.sqlMessage,
                });
            }

            if (results.affectedRows > 0)
                res.status(200).json({
                    err: false,
                    results: results,
                })
            else
                res.status(404).json({
                    err: true,
                    results: [],
                    message: "echec lors du stockage",
                })
        }
    )
};

module.exports.getListCursus = (req, res) => {

    connexion.query("SELECT * FROM cursus,domaine,etablissement,etudiant,niveau WHERE cursus.id_domaine=domaine.id_domaine and cursus.id_etablissement=etablissement.id_etablissement and cursus.id_niveau=niveau.id_niveau and cursus.id_etudiant = etudiant.id_etudiant",
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    results: []
                });
            }

            if (results.length > 0)
                res.status(200).json({
                    err: false,
                    results: results,
                })
            else
                res.status(404).json({
                    err: false,
                    results: [],
                    message: "choix n'existe pas",
                })
        })
};

module.exports.getCursusById = (req, res) => {
    const id_cursus = req.params.id;
    connexion.query(
        "SELECT * FROM cursus,domaine,etablissement,etudiant,niveau WHERE cursus.id_domaine=domaine.id_domaine and cursus.id_etablissement=etablissement.id_etablissement and cursus.id_niveau=niveau.id_niveau and cursus.id_etudiant = etudiant.id_etudiant and cursus.id_etudiant =?",
        [id_cursus],
            (err, results) => {

            if (err) {
                res.status(500).json({
                    err:true,
                    results:[]
                });
            }
            
            if(results.length>0)
                res.status(200).json({
                    err:false,
                    results:results,
                })
            else
                res.status(404).json({
                    err:false,
                    results:[],
                    message:"choix n'existe pas",
                }) 
        })
};

module.exports.updateCursus = (req, res) => {
    const data = req.body;
    connexion.query(
        "UPDATE cursus SET annee=?,moyenne=?,credit=?,mention=?,session=?,note_pfe=?,id_domaine=?,id_etablissement=?,id_niveau=? WHERE id_cursus=?",
        [data.annee, data.moyenne, data.credit, data.mention, data.session, data.note_pfe, data.id_domaine, data.id_etablissement, data.id_niveau, data.id_cursus],
            (err, results) => {
                if (err) {
                    res.status(500).json({
                        err:true,
                        results:[]
                    });
                }

            if(results.affectedRows>0)
                res.status(200).json({
                    err:false,
                    results:results.affectedRows,
                })
            else
                res.status(404).json({
                    err:true,
                    results:[],
                    message:"echec lors du stockage",
                }) 
        })
};

module.exports.deleteCursus = (req, res) => {
    const id_cursus = req.params.id;
    connexion.query(
        "DELETE FROM cursus WHERE id_cursus=?",
        [id_cursus],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err:true,
                    results:[]
                });
            }

            if(results.affectedRows>0)
                res.status(200).json({
                    err:false,
                    results:results.affectedRows,
                })
            else
                res.status(404).json({
                    err:true,
                    results:[],
                    message:"echec lors de suppression",
                }) 
        })
};
