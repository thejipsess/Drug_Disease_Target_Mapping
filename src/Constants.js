//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details
Constants = function() {};

Constants.prototype.SRC_CLS_MAPPINGS = {
  'http://www.conceptwiki.org': 'conceptWikiValue',
  'http://www.conceptwiki.org/': 'conceptWikiValue',
  'http://ops.conceptwiki.org': 'conceptWikiValue',
  'http://ops.conceptwiki.org/': 'conceptWikiValue',
  'http://data.kasabi.com/dataset/chembl-rdf': 'chemblValue',
  'http://rdf.ebi.ac.uk/resource/chembl/molecule' : 'chemblValue',
  'http://www.ebi.ac.uk/chembl' : 'chemblValue',
  'http://www4.wiwiss.fu-berlin.de/drugbank': 'drugbankValue',
  'http://linkedlifedata.com/resource/drugbank': 'drugbankValue',
  'http://www.openphacts.org/bio2rdf/drugbank' : 'drugbankValue',
  'http://www.chemspider.com': 'chemspiderValue',
  'http://www.chemspider.com/': 'chemspiderValue',
  'http://ops.rsc-us.org': 'chemspiderValue',
  'http://ops.rsc.org': 'chemspiderValue',
  'http://rdf.chemspider.com': 'chemspiderValue',
  'http://rdf.chemspider.com/': 'chemspiderValue',
  'http://ops.rsc-us.org' : 'chemspiderValue',
  'http://purl.uniprot.org' : 'uniprotValue',
  'http://purl.uniprot.org/' : 'uniprotValue'
};

Constants.prototype.IN_DATASET =  'inDataset';
Constants.prototype.ABOUT = '_about';
Constants.prototype.LABEL = 'label';
Constants.prototype.PREF_LABEL = 'prefLabel';
Constants.prototype.COMPOUND_PHARMACOLOGY_COUNT = 'compoundPharmacologyTotalResults';
Constants.prototype.TARGET_PHARMACOLOGY_COUNT = 'targetPharmacologyTotalResults';
Constants.prototype.ENZYME_FAMILY_COUNT = 'enzymePharmacologyTotalResults';
Constants.prototype.ON_ASSAY = 'hasAssay';
Constants.prototype.ON_TARGET = 'hasTarget';
Constants.prototype.EXACT_MATCH = 'exactMatch';
Constants.prototype.PRIMARY_TOPIC = 'primaryTopic';
Constants.prototype.RESULT = 'result';
Constants.prototype.ACTIVITY = 'activity';
Constants.prototype.FOR_MOLECULE = 'hasMolecule';
Constants.prototype.ASSAY_TARGET = 'target';
Constants.prototype.ITEMS = 'items';
Constants.prototype.PAGINATED_NEXT = 'next';
Constants.prototype.PAGINATED_PREVIOUS = 'prev';
Constants.prototype.PAGINATED_PAGE_SIZE = 'itemsPerPage';
Constants.prototype.PAGINATED_START_INDEX = 'startIndex';
Constants.prototype.TARGET_OF_ASSAY = 'targetOfAssay';
Constants.prototype.ASSAY_OF_ACTIVITY = 'assayOfActivity';
Constants.prototype.HAS_TARGET_COMPONENT = 'hasTargetComponent';
Constants.prototype.MOLFORM = 'molformula';
Constants.prototype.FULL_MWT = 'full_mwt';
Constants.prototype.INCHI = 'inchi';
Constants.prototype.INCHIKEY = 'inchikey';
Constants.prototype.RO5_VIOLATIONS = 'ro5_violations';
Constants.prototype.SMILES = 'smiles';
Constants.prototype.RELEVANCE = 'relevance';
Constants.prototype.PATHWAY_COUNT = 'pathway_count';
Constants.prototype.MOLWT = 'molweight';
Constants.prototype.EBILINK = 'http://www.ebi.ac.uk';


module.exports = Constants;;
