abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

provider = new ethers.providers.JsonRpcProvider()
signer = provider.getSigner(0);
contract = new ethers.Contract('0x77d5f20995c845e77e3C6445796835cd5DCD32B8', abi, signer)

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();
  console.log(candidateName);

  contract.voteForCandidate(ethers.utils.formatBytes32String(candidateName)).then((f) => {
    let div_id = candidates[candidateName];
    contract.totalVotesFor(ethers.utils.formatBytes32String(candidateName)).then((f) => {
      $("#" + div_id).html(toString(f))
    }).catch((e) => console.log(e));
  });
}

$(document).ready(function() {
  
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
  let name = candidateNames[i];
  contract.totalVotesFor(ethers.utils.formatBytes32String(name)).then((f) => {
    $("#" + candidates[name]).html(toString(f))
  }).catch((e) => console.log(e));
 }
});