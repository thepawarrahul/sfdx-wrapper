import sinon from 'sinon';
import proxyquire from 'proxyquire';


describe('orgList', () => {
  let execStub;

  beforeEach(() => {
    execStub = sinon.stub();
    process.argv = ['node', 'index.js', 'list'];
  });

  afterEach(() => {
    execStub.reset();
  });

  it('should call exec with the correct command', async () => {
    const orgList = proxyquire('./index', { 'child_process': { exec: execStub } });
    
    await orgList();
    sinon.assert.calledWith(execStub, 'sfdx force:org:list');
  });
});